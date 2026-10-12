(function () {
  'use strict';
  const fields = ['schemaVersion', 'product', 'productId', 'channel', 'version', 'productVersion', 'minimumVersion', 'downloadUrl', 'releaseNotesUrl', 'homepageUrl', 'sha256', 'publishedAt', 'releaseChannelId', 'sourceCommit', 'coreLibrarySha256', 'releaseChannelSha256'];
  const versionPattern = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/;
  const hashPattern = /^[a-f0-9]{64}$/;
  const repository = 'https://github.com/ko9ma7/VisionFlow-Studio';
  function parseManifest(text) {
    if (typeof text !== 'string' || text.length > 65536) throw new Error('Manifest size rejected');
    const body = text.trim();
    if (!body.startsWith('{') || !body.endsWith('}')) throw new Error('Manifest object required');
    // Only primitive JSON fields are allowed. Consume every byte and reject duplicate keys.
    const property = /\s*("(?:[^"\\\u0000-\u001f]|\\(?:["\\/bfnrt]|u[0-9a-fA-F]{4}))*")\s*:\s*("(?:[^"\\\u0000-\u001f]|\\(?:["\\/bfnrt]|u[0-9a-fA-F]{4}))*"|true|false|null|-?(?:0|[1-9]\d*))\s*(,|$)/y;
    const content = body.slice(1, -1);
    const result = Object.create(null);
    const seen = new Set();
    let position = 0;
    while (position < content.length) {
      property.lastIndex = position;
      const match = property.exec(content);
      if (!match) throw new Error('Manifest schema rejected');
      const name = JSON.parse(match[1]);
      if (seen.has(name.toLowerCase()) || ![...fields, 'signature'].includes(name)) throw new Error('Manifest property rejected');
      seen.add(name.toLowerCase());
      result[name] = JSON.parse(match[2]);
      position = property.lastIndex;
      if (match[3] === ',' && !content.slice(position).trim()) throw new Error('Trailing comma rejected');
    }
    if (seen.size !== fields.length + 1) throw new Error('Manifest fields missing');
    return result;
  }
  function canonical(manifest) {
    return fields.map(field => `${field}=${manifest[field]}`).join('\n');
  }
  function decodeBase64(value) {
    if (typeof value !== 'string' || !/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(value)) throw new Error('Invalid base64');
    return Uint8Array.from(atob(value), character => character.charCodeAt(0));
  }
  function compareVersions(first, second) {
    const a = first.split('.').map(BigInt); const b = second.split('.').map(BigInt);
    for (let index = 0; index < 3; index++) { if (a[index] !== b[index]) return a[index] > b[index] ? 1 : -1; }
    return 0;
  }
  async function verifyManifest(text, pem, now = Date.now()) {
    const manifest = parseManifest(text);
    for (const field of fields.filter(field => field !== 'schemaVersion')) {
      const value = manifest[field];
      if (typeof value !== 'string' || !value || value !== value.trim() || /[\r\n\x00]/.test(value)) throw new Error('Invalid release field');
    }
    if (manifest.schemaVersion !== 1 || manifest.product !== 'VisionFlow Studio' || manifest.productId !== 'visionflow-studio' || !['stable', 'beta'].includes(manifest.channel)) throw new Error('Unknown release product');
    if (!versionPattern.test(manifest.version) || manifest.productVersion !== manifest.version || !versionPattern.test(manifest.minimumVersion) || compareVersions(manifest.minimumVersion, manifest.version) > 0) throw new Error('Invalid release version');
    if (!hashPattern.test(manifest.sha256) || !hashPattern.test(manifest.coreLibrarySha256) || !hashPattern.test(manifest.releaseChannelSha256) || !/^(?:[a-f0-9]{40}|[a-f0-9]{64})$/.test(manifest.sourceCommit) || !/^[A-Za-z0-9._-]{1,100}$/.test(manifest.releaseChannelId)) throw new Error('Invalid release provenance');
    if (manifest.downloadUrl !== `${repository}/releases/download/v${manifest.version}/VisionFlow-Studio-v${manifest.version}-win-x64.zip` || manifest.releaseNotesUrl !== `${repository}/releases/tag/v${manifest.version}` || manifest.homepageUrl !== 'https://ko9ma7.github.io/VisionFlow-Studio/') throw new Error('Unknown release URL');
    const published = Date.parse(manifest.publishedAt);
    if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{7}(?:Z|[+-]\d{2}:\d{2})$/.test(manifest.publishedAt) || !Number.isFinite(published) || published > now + 300000) throw new Error('Invalid publication date');
    if (typeof pem !== 'string' || pem.length > 8192 || !/^-----BEGIN PUBLIC KEY-----\r?\n[A-Za-z0-9+/=\r\n]+-----END PUBLIC KEY-----\s*$/.test(pem)) throw new Error('Invalid public key');
    const encodedKey = pem.replace(/-----BEGIN PUBLIC KEY-----|-----END PUBLIC KEY-----|\s/g, '');
    const key = await crypto.subtle.importKey('spki', decodeBase64(encodedKey), { name: 'ECDSA', namedCurve: 'P-256' }, false, ['verify']);
    const signature = decodeBase64(manifest.signature);
    if (signature.byteLength !== 64 || !await crypto.subtle.verify({ name: 'ECDSA', hash: 'SHA-256' }, key, signature, new TextEncoder().encode(canonical(manifest)))) throw new Error('Invalid release signature');
    return manifest;
  }
  async function loadRelease() {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    try {
      const [metadata, key, detached] = await Promise.all(['manifest.json', 'public-key.pem', 'manifest.sig'].map(path => fetch(path, { cache: 'no-cache', signal: controller.signal })));
      if ([metadata, key, detached].some(response => !response.ok)) throw new Error('Release metadata unavailable');
      const [text, pem, signature] = await Promise.all([metadata.text(), key.text(), detached.text()]);
      const manifest = await verifyManifest(text, pem);
      if (signature.trim() !== manifest.signature) throw new Error('Detached signature mismatch');
      // Stable releases are the default download; beta metadata never silently replaces that link.
      if (manifest.channel !== 'stable') throw new Error('Stable release metadata unavailable');
      document.querySelectorAll('[data-download]').forEach(link => {
        link.href = manifest.downloadUrl;
        link.textContent = `Windows 다운로드 ${manifest.version} ↓`;
      });
      document.querySelector('[data-release-state]').textContent = `서명 확인 완료 · ${manifest.version} · SHA-256 ${manifest.sha256.slice(0, 12)}…`;
    } catch {
      // The visible existing-release link is usable before and after any metadata failure.
    } finally { clearTimeout(timeout); }
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = { parseManifest, canonical, verifyManifest };
  if (typeof document !== 'undefined') loadRelease();
}());

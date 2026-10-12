using VisionFlow.SDK;

namespace VisionFlow.Examples;

public sealed class HelloExtension : IExtension, IExtensionCompatibility
{
    public string Id => "example.hello-extension";
    public Version Version => new(1, 0);
    public int ApiVersion => 1;
    public ExtensionCapabilities Capabilities => ExtensionCapabilities.None;
    public IEnumerable<IVisionFlowAction> Actions => [new HelloAction()];
    public IEnumerable<IVisionProvider> VisionProviders => [];
    public IEnumerable<IOcrProvider> OcrProviders => [];
}

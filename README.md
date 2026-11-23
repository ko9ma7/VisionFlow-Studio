# VisionFlow Studio

Windows에서 화면의 대상과 수행할 동작을 연결하는 Vision Automation / Macro Studio입니다.

화면 선택 → 대상 선택 → 동작 선택 → 조건·반복 설정 → 실행 순서로 작업을 만듭니다. 이미지 찾기, OCR, 객체 인식, 추적, 마우스·키 입력, 조건 분기와 프로젝트 저장을 제공합니다.

## 다운로드와 버전

| 버전 | 상태 | 어디서 확인하나요? |
|---|---|---|
| **2.9.0** | 개발판 · 소스와 사용 안내 공개 | [2.8에서 달라진 점](release-notes/2.9.0.md) · [이미지 클릭 시작하기](docs/getting-started.md) |
| **2.8.0** | 2026년 10월 12일 공개한 Windows 시험판 | [ZIP과 SHA-256](https://github.com/ko9ma7/VisionFlow-Studio/releases/tag/v2.8.0-preview.20261012) · [2.8.0 변경점](release-notes/2.8.0.md) |

2.9.0에서는 **이미지 클릭 추가 → 그림 드래그 → 저장 → 반복 실행**으로 첫 작업을 만듭니다. 기존 단계가 그림을 놓치면 **찾기만 시험 → 전체 범위로 다시 시험**으로 클릭 없이 위치를 확인하고, 찾은 위치가 맞을 때 저장하세요. 키만 보내거나 클릭 후 키를 보낼 수도 있습니다. [동작 선택 안내](docs/workflows.md)

공개된 실행 파일은 [GitHub Releases](https://github.com/ko9ma7/VisionFlow-Studio/releases)의 각 버전 **Assets**에서 받습니다. Windows x64 ZIP을 새 폴더에 풀고 실행하세요.

- [기존 Windows 릴리스 2.7.1](https://github.com/ko9ma7/YoloMacro-Distribution/releases/tag/v2.7.1)
- [처음 프로젝트 만들기](docs/getting-started.md)
- [기능과 실행 안전](docs/workflows.md)
- [설치·업데이트·인증](docs/install-update.md)
- [개인별 환경·사용 권한 설정](docs/personal-settings.md)
- [SDK API1 계약](sdk/README.md) · [샘플](examples/README.md)
- [변경 기록](CHANGELOG.md)

Windows x64와 .NET 8 Desktop Runtime이 필요합니다. 특정 캡처 방식과 Interception 입력은 대상 프로그램 및 드라이버 환경에서 확인해야 합니다. 실행 전 관찰 모드로 탐지 위치를 확인하고, 실제 입력은 자신이 선택한 대상에만 적용하세요.

Core 구현은 비공개이며 Proprietary / All Rights Reserved 정책을 따릅니다. `sdk/`와 `examples/HelloAction/`의 공개 코드에만 별도 MIT 라이선스를 적용합니다. [라이선스](LICENSE.txt)와 [외부 라이브러리 고지](THIRD-PARTY-NOTICES.md)를 확인하세요.

YoloMacro는 별도의 Legacy 제품입니다. 기존 다운로드 및 활성화 주소는 호환을 위해 유지합니다.

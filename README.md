# VisionFlow Studio

Windows에서 화면의 대상과 수행할 동작을 연결하는 Vision Automation / Macro Studio입니다.

화면 선택 → 대상 선택 → 동작 선택 → 조건·반복 설정 → 실행 순서로 작업을 만듭니다. 이미지 찾기, OCR, 객체 인식, 추적, 마우스·키 입력, 조건 분기와 프로젝트 저장을 제공합니다.

현재 시험판은 **2.8.0**입니다. 이 저장소에는 사용 문서, 공개 SDK·예제와 배포 파일을 제공합니다. 시험판 ZIP은 미서명 검토 후보이며 자동 업데이트용 정식 릴리스가 아닙니다. 기존 설치를 덮어쓰지 말고 새 폴더에 압축을 풀어 사용하세요.

- [기존 Windows 릴리스 2.7.1](https://github.com/ko9ma7/YoloMacro-Distribution/releases/tag/v2.7.1)
- [2.8.0 시험판](https://github.com/ko9ma7/VisionFlow-Studio/releases/tag/v2.8.0-preview.20261012)
- [처음 프로젝트 만들기](docs/getting-started.md)
- [기능과 실행 안전](docs/workflows.md)
- [설치·업데이트·인증](docs/install-update.md)
- [개인별 환경·사용 권한 설정](docs/personal-settings.md)
- [SDK API1 계약](sdk/README.md) · [샘플](examples/README.md)
- [변경 기록](CHANGELOG.md)

Windows x64와 .NET 8 Desktop Runtime이 필요합니다. 특정 캡처 방식과 Interception 입력은 대상 프로그램 및 드라이버 환경에서 확인해야 합니다. 실행 전 관찰 모드로 탐지 위치를 확인하고, 실제 입력은 자신이 선택한 대상에만 적용하세요.

Core 구현은 비공개이며 Proprietary / All Rights Reserved 정책을 따릅니다. `sdk/`와 `examples/HelloAction/`의 공개 코드에만 별도 MIT 라이선스를 적용합니다. [라이선스](LICENSE.txt)와 [외부 라이브러리 고지](THIRD-PARTY-NOTICES.md)를 확인하세요.

YoloMacro는 별도의 Legacy 제품입니다. 기존 다운로드 및 활성화 주소는 호환을 위해 유지합니다.

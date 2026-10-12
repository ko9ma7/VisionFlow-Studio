# VisionFlow SDK

Action, 화면 가져오기, 입력, 인식, OCR 확장용 .NET 8 공개 계약입니다. 비공개 Core 구현이나 라이선스 키는 포함하지 않습니다.

현재는 API1 미리보기 계약입니다. 개선 중인 Studio에는 신뢰한 DLL을 명시적으로 불러오는 세션 host가 있습니다. 공개 배포본의 제공 여부와 안정 버전은 실제 Release에서 확인해야 합니다.

```powershell
dotnet build sdk/VisionFlow.SDK/VisionFlow.SDK.csproj -c Release
dotnet build examples/HelloAction/HelloAction.csproj -c Release
```

`IVisionFlowAction`은 취소 토큰을 받아 결과와 출력 변수를 반환합니다. 캡처와 입력 서비스는 호스트가 제공합니다. 관찰 모드에서는 입력 서비스를 제공하지 않아야 합니다. 확장은 취소 시 자신이 누른 키와 버튼을 해제해야 합니다. 재시도로 입력이 중복되지 않도록 재시도 정책은 호스트와 명시적으로 합의해야 합니다.

DLL에는 공개 기본 생성자가 있는 `IExtension` 구현 하나와 `IExtensionCompatibility`(ApiVersion=1, 필요한 Capture/Input 권한 선언)를 둡니다. `HelloExtension`이 등록 예제입니다. SDK와 .NET 기본 라이브러리만 의존하는 단일 관리 DLL을 지원하며 별도 네이티브/외부 패키지 의존성은 지원하지 않습니다. Studio의 ‘작업 > 확장 동작 추가’에서 DLL 출처와 SHA256을 확인해 세션에 허용하고 기능·결과 이름·제한 시간을 선택합니다. 다음 시작에는 다시 불러와야 하며 프로젝트 파일로 DLL을 자동 실행하지 않습니다.

이 host는 신뢰한 코드를 앱과 같은 프로세스/PC 권한으로 실행합니다. 서비스 권한 검사는 협력하는 확장의 입력·화면 서비스에 적용되며, 악성 코드의 파일/네트워크 접근이나 프로세스 종료를 격리하는 sandbox가 아닙니다. [Microsoft의 플러그인 지침](https://learn.microsoft.com/en-us/dotnet/core/tutorials/creating-app-with-plugin-support)을 참고하세요. 취소를 무시한 실행은 늦은 결과를 폐기하고 해당 확장을 세션에서 차단하지만, 이미 진행 중인 코드의 강제 종료·메모리 회수는 보장하지 않습니다.

SDK와 `examples/`에는 [MIT License](LICENSE.txt)가 적용됩니다. 이 라이선스는 Studio 실행 파일이나 비공개 Core에 적용되지 않습니다.

`FlowValue`는 문자열, 숫자, Boolean, 좌표, 영역, 탐지 목록, OCR 결과와 이미지 결과를 표현합니다. 좌표 값에는 `CoordinateSpace`가 있으며 각 탐지에는 개별 라벨·신뢰도·영역이 있습니다. 값 타입의 실제 유효성 검사, 저장 형식과 실행 범위는 비공개 호스트가 담당합니다. 목록을 받을 때는 복사하여 보관해야 합니다.

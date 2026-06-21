# 엉금일기 — 네이티브(SwiftUI) 버전 (작업 중)

웹/Capacitor 버전이 반복적으로 일으킨 문제(한글 번들명 서명 크래시, cap sync 때마다
사라지는 카메라 권한)를 피하기 위해, SwiftUI + SwiftData로 새로 만드는 네이티브 버전.
Info.plist를 직접 통제하므로 권한이 사라지지 않는다.

## Xcode 프로젝트 설정
- File → New → Project → iOS → App
- **Product Name**: `DailyLog` ← 반드시 영문 (한글이면 서명 시 "sealed resource" 크래시)
- **Display Name**(General): `엉금일기` ← 사용자에게 보이는 이름은 한글
- **Bundle Identifier**: `com.pigttory.dailylog` ← 기존 앱 교체용 (같은 ID)
- Interface: SwiftUI / Language: Swift / **Storage: SwiftData**
- 디바이스: iPhone + iPad (Universal)

## 카메라/사진 권한 (Info.plist)
네이티브는 cap sync가 없어 권한이 안 사라진다. 프로젝트의 Info.plist에 직접 추가:
- `NSCameraUsageDescription` = 사진을 찍어 기록과 일기에 첨부하기 위해 카메라를 사용합니다.
- `NSPhotoLibraryUsageDescription` = 기록과 일기에 사진을 첨부하기 위해 사진 보관함에 접근합니다.

## 파일
- `DailyLogApp.swift` — 앱 진입점 + SwiftData 컨테이너
- `ContentView.swift` — 탭바 골격 (기록/일기/검색)
- `Models.swift` — Record, DiaryEntry (@Model)

## 빌드 순서 (계획)
1. ✅ 골격: 탭 3개 + 데이터 모델
2. 기록 입력 폼 + 저장 + 목록
3. 사진(PhotosPicker + 카메라)
4. 일기
5. 검색(자연어 파서 + 타일 격자)
6. 테마 + 4개국어 + 설정
7. 교환일기(ShareLink + 가져오기)
8. iPad 레이아웃 + 제출

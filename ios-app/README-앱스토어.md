# 🐢 일상 기록 — 앱스토어 출시 가이드

맥에서 아래 순서대로 따라하면 됩니다. 단계마다 막히면 화면을 캡처해서 Claude에게 보여주세요.

---

## 0. 준비물 체크리스트

- [x] Xcode 설치 (완료!)
- [ ] Apple Developer Program 가입 (연 $99) — 1단계에서 진행
- [ ] Node.js — 3단계에서 설치
- [ ] CocoaPods — 3단계에서 설치

## 1. Apple Developer Program 가입 (승인까지 하루 정도)

1. https://developer.apple.com/programs/enroll 접속
2. 본인 Apple ID로 로그인 → "Individual(개인)"으로 등록
3. 연회비 $99(약 13만 원) 결제
4. 승인 메일이 올 때까지 기다리는 동안 아래 단계를 진행하면 됩니다
   (실기기 테스트까지는 가입 없이도 가능해요)

## 2. 저장소 클론

터미널(Terminal 앱)을 열고:

```bash
git clone https://github.com/pigttory1347-cloud/daily-log-app.git
cd daily-log-app/ios-app
```

## 3. 도구 설치

```bash
# Homebrew가 없다면 (이미 있으면 건너뛰기)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Node.js와 CocoaPods
brew install node cocoapods
```

## 4. iOS 프로젝트 생성 (명령 2개)

`daily-log-app/ios-app` 폴더에서:

```bash
npm install
npm run ios:init
```

성공하면 `ios/` 폴더가 생깁니다. 이후 웹앱(index.html)을 수정했을 때는
`npm run ios:sync` 한 번이면 앱에 반영됩니다.

## 5. Xcode에서 열기

```bash
npm run ios:open
```

Xcode가 열리면:

1. 왼쪽 트리 최상단 **App** 클릭 → **Signing & Capabilities** 탭
2. **Team**: 본인 Apple ID 선택 (없으면 Xcode 메뉴 → Settings → Accounts에서 Apple ID 추가)
3. **Bundle Identifier**: `com.pigttory.dailylog` (원하면 변경 가능 — 전 세계에서 유일하면 됨)
4. **앱 아이콘**: 왼쪽 트리에서 `App > Assets > AppIcon` 클릭 →
   저장소 루트의 `icon-1024.png`를 1024 칸에 드래그
5. **General 탭**: Deployment Info에서 iPhone만 체크 (iPad 끄기 — 심사 간단해짐)

## 6. 내 아이폰에서 테스트

1. 아이폰을 맥에 케이블로 연결
2. Xcode 상단 기기 선택에서 본인 아이폰 선택 → ▶ (실행)
3. 아이폰에서 "신뢰하지 않는 개발자" 경고가 뜨면:
   설정 → 일반 → VPN 및 기기 관리 → 본인 Apple ID 신뢰
4. 앱이 뜨면: 닉네임 설정 → 기록 작성 → 앱 완전 종료 후 재실행해서 데이터 유지 확인

## 7. App Store Connect 등록 (개발자 가입 승인 후)

1. https://appstoreconnect.apple.com → 나의 앱 → ➕ 신규 앱
2. 입력 항목:
   - 플랫폼: iOS / 이름: `일상 기록` (또는 새 이름) / 언어: 한국어
   - 번들 ID: 5단계에서 정한 것 선택 / SKU: `dailylog-001` (아무거나)
3. 앱 정보 페이지에서:
   - **개인정보처리방침 URL**: `https://pigttory1347-cloud.github.io/daily-log-app/privacy.html`
   - 카테고리: 라이프스타일
   - 개인정보 수집 설문: **"데이터를 수집하지 않음"** 선택 (실제로 그렇습니다)
4. 스크린샷: 아이폰에서 캡처한 화면 3~5장 (6.7형 필수 — 아이폰 Pro Max 캡처면 됨.
   기기가 다르면 Xcode 시뮬레이터로 캡처)

## 8. 업로드 & 심사 제출

1. Xcode 상단 기기 선택을 **Any iOS Device (arm64)** 로 변경
2. 메뉴 **Product → Archive** → 끝나면 **Distribute App → App Store Connect → Upload**
3. App Store Connect에서 업로드된 빌드 선택 → **심사 제출**
4. 보통 1~3일 내 결과. 반려되면 사유를 Claude에게 보여주세요 — 같이 고치면 됩니다

---

## 자주 막히는 곳

| 증상 | 해결 |
|---|---|
| `pod: command not found` | `brew install cocoapods` 후 다시 |
| Signing 오류 (빨간 글씨) | Team 미선택이 대부분 — Settings → Accounts에 Apple ID 추가 |
| 흰 화면만 뜸 | `npm run ios:sync` 후 Xcode에서 다시 실행 |
| 심사 반려 4.2 (최소 기능) | 교환일기·오프라인 저장 등 앱 고유 기능을 심사 노트에 설명 |

# Firebase 배포 가이드

## 사전 준비

### 1. Firebase CLI 설치
```bash
npm install -g firebase-tools
```

### 2. Firebase 로그인
```bash
firebase login
```

### 3. Firebase 프로젝트 생성
1. [Firebase Console](https://console.firebase.google.com/)에서 새 프로젝트 생성
2. 프로젝트 ID를 `.firebaserc` 파일에서 `kindtoolai-firebase`를 실제 프로젝트 ID로 변경

### 4. Firebase 서비스 활성화
- **Firestore Database**: 문의사항 및 방문자 데이터 저장
- **Firebase Hosting**: 정적 웹사이트 호스팅
- **Firebase Functions**: API 서버 (Node.js 18)
- **Firebase Authentication** (선택사항): 향후 확장용

## 환경 변수 설정

### Firebase Functions 환경 변수 설정
```bash
# Google Analytics (선택사항)
firebase functions:config:set analytics.measurement_id="G-XXXXXXXXXX"

# Google AdSense (수익화용)
firebase functions:config:set adsense.publisher_id="ca-pub-XXXXXXXXXXXXXXXX"

# 관리자 패스워드
firebase functions:config:set admin.password="new1234!"

# 세션 시크릿
firebase functions:config:set session.secret="your_random_secret_here"
```

### 환경 변수 확인
```bash
firebase functions:config:get
```

## 빌드 및 배포

### 1. 프로덕션 빌드
```bash
npm run build:firebase
```

### 2. Firebase 배포
```bash
# 전체 배포 (처음 배포 시)
firebase deploy

# 호스팅만 배포
firebase deploy --only hosting

# Functions만 배포
firebase deploy --only functions
```

### 3. 로컬 에뮬레이터 테스트
```bash
firebase emulators:start
```

## Google AdSense 설정

### 1. AdSense 계정 생성
1. [Google AdSense](https://www.google.com/adsense/)에서 계정 생성
2. 웹사이트 추가 및 승인 대기

### 2. Publisher ID 적용
1. AdSense에서 Publisher ID 복사 (`ca-pub-XXXXXXXXXXXXXXXX` 형태)
2. Firebase Functions 환경 변수에 설정:
   ```bash
   firebase functions:config:set adsense.publisher_id="ca-pub-XXXXXXXXXXXXXXXX"
   ```
3. `dist/index.html`의 AdSense 스크립트에서 `YOUR_PUBLISHER_ID` 부분을 실제 Publisher ID로 변경

### 3. 광고 단위 생성
1. AdSense 대시보드에서 광고 단위 생성
2. 생성된 광고 코드를 필요한 페이지에 추가

## Firestore 보안 규칙

현재 설정된 보안 규칙:
- **visitors**: 읽기 전용 (서버에서만 쓰기)
- **inquiries**: 공개 읽기/쓰기 (관리자 기능은 서버에서 처리)
- **replies**: 공개 읽기/쓰기
- **sessions**: 서버 전용

필요시 `firestore.rules` 파일을 수정하여 보안 강화 가능

## 도메인 연결 (선택사항)

### 1. 커스텀 도메인 설정
1. Firebase Console → Hosting → 도메인 추가
2. DNS 설정에서 A 레코드 추가
3. SSL 인증서 자동 발급 대기

### 2. 기존 도메인에서 리디렉션
```javascript
// Firebase Functions에서 리디렉션 설정
app.get('/', (req, res) => {
  if (req.hostname !== 'your-custom-domain.com') {
    return res.redirect(301, 'https://your-custom-domain.com');
  }
  // 기존 로직
});
```

## 모니터링 및 최적화

### 1. Firebase Analytics 활성화
- Firebase Console에서 Analytics 활성화
- Google Analytics 4와 연동

### 2. Performance Monitoring
- Firebase Performance Monitoring SDK 추가
- 웹 성능 지표 추적

### 3. Crashlytics (선택사항)
- JavaScript 오류 추적
- 사용자 경험 개선

## 주요 파일 구조

```
📁 프로젝트 루트
├── 📄 firebase.json          # Firebase 설정
├── 📄 .firebaserc            # 프로젝트 ID 설정
├── 📄 firestore.rules        # Firestore 보안 규칙
├── 📄 firestore.indexes.json # Firestore 인덱스
├── 📄 build-firebase.js      # Firebase 빌드 스크립트
├── 📄 .env.firebase.example  # 환경 변수 예제
├── 📁 functions/             # Firebase Functions
│   ├── 📄 package.json
│   ├── 📄 tsconfig.json
│   └── 📁 src/
│       ├── 📄 index.ts       # Functions 메인 파일
│       └── 📄 kindtool-header.js # 공통 헤더 스크립트
└── 📁 dist/                  # 빌드된 클라이언트 파일
```

## 배포 후 확인사항

1. **웹사이트 동작 확인**: https://your-project.web.app
2. **API 엔드포인트 테스트**: `/api/stats/visitors/today`
3. **Firestore 데이터 확인**: Firebase Console에서 데이터 저장 확인
4. **Google AdSense**: 광고 표시 확인 (승인 후)
5. **Analytics**: 방문자 추적 확인

## 문제해결

### 함수 배포 실패
```bash
# 함수 로그 확인
firebase functions:log

# 의존성 재설치
cd functions && npm install
```

### Firestore 권한 오류
- `firestore.rules` 파일의 보안 규칙 확인
- Firebase Console에서 규칙 배포 확인

### 도메인 연결 문제
- DNS 설정 확인 (A 레코드)
- SSL 인증서 발급 상태 확인 (최대 24시간 소요)

## 비용 최적화

### 1. Firestore 비용 절약
- 인덱스 최적화
- 불필요한 읽기/쓰기 줄이기
- 데이터 크기 최소화

### 2. Functions 비용 절약
- 콜드 스타트 최소화
- 실행 시간 최적화
- 불필요한 함수 호출 줄이기

### 3. Hosting 비용
- CDN 캐싱 최적화
- 정적 파일 압축
- 이미지 최적화
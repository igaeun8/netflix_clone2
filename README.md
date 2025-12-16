# Netflix Clone

React.js를 활용한 Netflix 클론 프로젝트입니다. TMDB API를 사용하여 영화 정보를 표시하고, Local Storage를 활용한 사용자 데이터 관리 및 반응형 웹 디자인을 구현합니다.

## 📋 프로젝트 기본

### 프로젝트 소개
이 프로젝트는 Netflix의 UI/UX를 참고하여 제작된 영화 스트리밍 플랫폼 클론입니다. React.js를 기반으로 Single Page Application(SPA)을 구현하고, TMDB API를 통해 실시간 영화 데이터를 제공합니다.

### 주요 특징
- TMDB API를 활용한 실시간 영화 데이터 표시
- 로그인/회원가입 기능 (Local Storage 기반)
- 찜하기 기능 및 위시리스트 관리
- 영화 검색 및 필터링
- 완전한 반응형 웹 디자인 (모바일, 태블릿, 데스크톱)
- Netflix 스타일의 UI/UX
- 부드러운 페이지 전환 애니메이션
- 무한 스크롤 및 페이지네이션 지원

### 기술 스택
- **Frontend Framework**: React.js 19.2.1
- **Routing**: React Router DOM 6.21.3
- **HTTP Client**: Axios 1.6.5
- **Icons**: Font Awesome 6.7.2
- **Build Tool**: React Scripts 5.0.1
- **State Management**: React Context API
- **Storage**: Local Storage

## 🛠️ 설치 및 실행 가이드

### 필수 요구사항
- Node.js (v14 이상 권장)
- npm 또는 yarn
- TMDB API 키 ([TMDB 웹사이트](https://www.themoviedb.org/)에서 발급)

### 설치 방법

1. **저장소 클론**
```bash
git clone https://github.com/igaeun8/netflix_clone2.git
cd netflix_clone2
```

2. **의존성 설치**
```bash
npm install
```

3. **TMDB API 키 설정**
   - 프로젝트 실행 후 로그인 페이지에서 API 키를 입력하거나
   - Local Storage에 `tmdb_api_key` 키로 API 키를 저장

4. **개발 서버 실행**
```bash
npm start
```

개발 서버가 실행되면 브라우저에서 [http://localhost:3000](http://localhost:3000)을 자동으로 엽니다.

### 프로덕션 빌드

```bash
npm run build
```

빌드된 파일은 `build` 폴더에 생성되며, 정적 파일 서버를 통해 배포할 수 있습니다.

### 테스트 실행

```bash
npm test
```

## 📁 프로젝트(폴더) 구조 설명

```
netflix_clone/
├── public/                 # 정적 파일
│   ├── index.html         # HTML 템플릿
│   ├── manifest.json      # PWA 매니페스트
│   └── robots.txt         # 검색 엔진 크롤러 설정
│
├── src/                   # 소스 코드
│   ├── assets/            # 이미지, 폰트 등 정적 리소스
│   │   └── images/        # 이미지 파일
│   │
│   ├── components/        # 재사용 가능한 컴포넌트
│   │   ├── auth/         # 인증 관련 컴포넌트
│   │   │   ├── AuthForm.js      # 로그인/회원가입 폼
│   │   │   └── AuthForm.css
│   │   │
│   │   ├── common/       # 공통 컴포넌트
│   │   │   ├── Header.js        # 헤더 네비게이션
│   │   │   ├── Header.css
│   │   │   ├── PageTransition.js # 페이지 전환 효과
│   │   │   ├── PageTransition.css
│   │   │   └── ProtectedRoute.js # 인증 보호 라우트
│   │   │
│   │   └── movie/       # 영화 관련 컴포넌트
│   │       ├── MovieCard.js      # 영화 카드 컴포넌트
│   │       ├── MovieCard.css
│   │       ├── MovieList.js      # 영화 리스트 컴포넌트
│   │       ├── MovieList.css
│   │       ├── MovieDetailModal.js # 영화 상세 모달
│   │       └── MovieDetailModal.css
│   │
│   ├── constants/        # 상수 정의
│   │   ├── api.js       # API 관련 상수 (TMDB API URL 등)
│   │   ├── routes.js    # 라우트 경로 상수
│   │   └── storage.js   # Local Storage 키 상수
│   │
│   ├── context/         # React Context (전역 상태 관리)
│   │   ├── AppContext.js      # 앱 전역 상태 (사용자 정보, 위시리스트)
│   │   └── ModalContext.js    # 모달 상태 관리
│   │
│   ├── hooks/           # Custom Hooks
│   │   ├── useApiKey.js       # API 키 관리 훅
│   │   └── useMovies.js       # 영화 데이터 페칭 훅
│   │
│   ├── pages/           # 페이지 컴포넌트
│   │   ├── Home/        # 홈 페이지
│   │   │   ├── Home.js
│   │   │   └── Home.css
│   │   │
│   │   ├── SignIn/      # 로그인/회원가입 페이지
│   │   │   ├── SignIn.js
│   │   │   └── SignIn.css
│   │   │
│   │   ├── Popular/     # 대세 콘텐츠 페이지
│   │   │   ├── Popular.js
│   │   │   └── Popular.css
│   │   │
│   │   ├── Search/      # 검색 페이지
│   │   │   ├── Search.js
│   │   │   └── Search.css
│   │   │
│   │   ├── Wishlist/    # 찜한 리스트 페이지
│   │   │   ├── Wishlist.js
│   │   │   └── Wishlist.css
│   │   │
│   │   ├── MovieDetail.js    # 영화 상세 페이지
│   │   └── MovieDetail.css
│   │
│   ├── services/        # API 서비스 및 비즈니스 로직
│   │   ├── api.js       # TMDB API 클라이언트
│   │   ├── auth.js      # 인증 관련 서비스
│   │   └── wishlist.js  # 위시리스트 관리 서비스
│   │
│   ├── styles/          # 전역 스타일
│   │   └── animations.css # CSS 애니메이션 정의
│   │
│   ├── utils/           # 유틸리티 함수
│   │   ├── animations.js    # JavaScript 애니메이션 제어
│   │   ├── imageUrl.js     # TMDB 이미지 URL 생성
│   │   └── validation.js   # 폼 유효성 검사
│   │
│   ├── App.js           # 메인 App 컴포넌트 (라우팅 설정)
│   ├── App.css          # App 스타일
│   ├── index.js         # React 진입점
│   └── index.css        # 전역 CSS
│
├── package.json         # 프로젝트 의존성 및 스크립트
└── README.md           # 프로젝트 문서
```

### 주요 폴더 설명

- **`components/`**: 재사용 가능한 UI 컴포넌트들로 구성
  - `auth/`: 로그인/회원가입 관련 컴포넌트
  - `common/`: 헤더, 페이지 전환 등 공통 컴포넌트
  - `movie/`: 영화 카드, 리스트 등 영화 관련 컴포넌트

- **`pages/`**: 각 페이지별 컴포넌트와 스타일 파일
  - 각 페이지는 독립적인 폴더로 구성되어 관리

- **`services/`**: API 호출 및 비즈니스 로직 처리
  - TMDB API 통신, 인증, 위시리스트 관리 등

- **`context/`**: React Context를 통한 전역 상태 관리
  - 사용자 정보, 위시리스트, 모달 상태 등

- **`hooks/`**: 재사용 가능한 Custom Hooks
  - API 키 관리, 영화 데이터 페칭 등

- **`utils/`**: 범용 유틸리티 함수들
  - 이미지 URL 생성, 유효성 검사, 애니메이션 제어 등

## 📝 주요 기능

### 인증 기능
- 로그인/회원가입
- 자동 로그인 (Remember me)
- 약관 동의 기능
- 로그인 상태 유지 (Local Storage)

### 영화 기능
- 홈 페이지 배너 및 영화 섹션
- 영화 상세 정보 페이지
- 영화 검색 및 필터링
- 대세 콘텐츠 페이지
- 찜하기 기능
- 위시리스트 관리 (테이블 뷰, 인피니티 뷰)
- 영화 공유 기능 (Web Share API, 클립보드 복사)

### UI/UX 기능
- 반응형 디자인 (모바일, 태블릿, 데스크톱)
- 페이지 전환 애니메이션
- 영화 카드 호버 효과
- 무한 스크롤
- 페이지네이션
- 로딩 스켈레톤
- Glassmorphism 효과 (헤더 스크롤 시)

## 🌿 Git Flow 브랜치 전략

이 프로젝트는 Git Flow 전략을 따릅니다:

- `main`: 제품 출시 브랜치 (프로덕션)
- `develop`: 개발 통합 브랜치
- `feature/*`: 기능 개발 브랜치
- `release/*`: 출시 준비 브랜치 (선택)
- `hotfix/*`: 긴급 수정 브랜치 (선택)

## 🔗 관련 링크

- [라이브 데모](https://igaeun8.github.io/netflix_clone2)
- [TMDB API](https://www.themoviedb.org/documentation/api)

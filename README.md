# 무신사 프론트엔드 과제

## 1. 과제의 구성

### 라이브러리

- react
- axios
- node-sass

### 디렉토리 구조

```bash
src
├── App.tsx
├── assets
│   ├── no-image.png
│   └── not-found.png
├── component
│   └── ItemList.tsx
├── hook
│   └── useInfiniteScroll.tsx
├── index.js
└── scss
    ├── MaterialIcons-Regular.ttf
    ├── main.scss
    └── material-icons.scss
```

- index.js : 엔트리 파일
- App.tsx : 앱 메인 컴포넌트
- component : 상품 조회결과 아이템 리스트
- hook : 무한스크롤 이벤트를 감지하는 커스텀
- assets : icon 파일 (상품없음 이미지 파일, 상품사진이 실행되지 않는 경우 대체 이미지 파일)
- scss : css, google-material UI 정의

### 라이브러리 선정 이유

- react : 컴포넌트 기반 UI 개발이 용이함
- axios : IE를 포함한 대부분의 브라우저를 지원함, JSON 데이터를 자동으로 변환해줌
- node-sass : sass 전처리기 사용

## 2. 구동 방법

### NPM 패키지 설치

```bash
yarn install
```

### 개발모드 실행 (3000번 포트)

```bash
yarn start
```

### 빌드

```bash
yarn build
```

### 개발모드 실행 또는 빌드시 버전 오류 발생시 아래 명령어 실행

```bash
npm rebuild node-sass
```

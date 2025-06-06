# Veo3 Prompt Generator

영상 생성 AI(Veo3 등)에서 사용할 수 있는 고품질 프롬프트를 쉽고 빠르게 생성할 수 있는 웹 애플리케이션입니다.  
다양한 시각적 옵션과 컷 단위 프롬프트 생성 기능을 제공합니다.

## 주요 기능

- **단일 프롬프트 생성**: 한 장면에 대한 상세 프롬프트를 생성할 수 있습니다.
- **컷 단위 프롬프트 생성**: 여러 장면(컷)에 대한 프롬프트를 순차적으로 생성할 수 있습니다.
- **한국어 → 영어 번역 지원**: 주요 프롬프트 요소를 자동으로 영어로 변환합니다.
- **다양한 프롬프트 옵션**: 시각 스타일, 카메라 앵글, 조명, 색상, 시간대, 분위기 등 다양한 옵션을 제공합니다.
- **Gemini API 연동**: Gemini API를 활용하여 프롬프트 생성 결과를 받아올 수 있습니다.

## 데모 화면

(여기에 실제 사용 예시 스크린샷을 첨부하면 좋습니다.)

## 설치 및 실행 방법

**사전 준비:**  
- Node.js가 설치되어 있어야 합니다.

**1. 의존성 설치**
  
  ```
  npm install
  ```

**2. 환경 변수 설정**

  프로젝트 루트에 `.env.local` 파일을 생성하고, 아래와 같이 Gemini API 키를 입력합니다.

  ```
  GEMINI_API_KEY=여기에_본인_API_키_입력
  ```

**3. 개발 서버 실행**

  ```
  npm run dev
  ```

  브라우저에서 `http://localhost:5173` (또는 안내된 포트)로 접속합니다.

**4. 빌드 및 프리뷰(선택)**

  ```
  npm run build
  npm run preview
  ```

## 폴더 구조

```
veo3-prompt-generator/
  components/         # 주요 UI 컴포넌트
  utils/              # 유틸리티 함수 (예: Gemini 응답 파서)
  App.tsx             # 메인 앱 컴포넌트
  constants.ts        # 프롬프트 옵션 상수
  types.ts            # 타입 정의
  index.tsx           # React 진입점
  vite.config.ts      # Vite 설정
  ...
```

## 주요 기술 스택

- React 19
- TypeScript
- Vite
- Gemini API

## 주요 파일 설명

- `App.tsx`: 전체 앱의 메인 컴포넌트로, 단일/멀티 프롬프트 생성 탭을 제공합니다.
- `components/SinglePromptGenerator.tsx`: 단일 프롬프트 생성 UI 및 로직
- `components/MultiCutPromptGenerator.tsx`: 컷 단위 프롬프트 생성 UI 및 로직
- `utils/parseGeminiResponse.ts`: Gemini API 응답에서 JSON 배열만 추출하여 파싱하는 함수
- `constants.ts`: 프롬프트 옵션(스타일, 앵글 등) 상수 정의
- `types.ts`: 프롬프트 데이터 구조 및 타입 정의

## 기여 방법

1. 이슈를 등록하거나, PR(Pull Request)을 보내주세요.
2. 코드 작성 시 일관된 코드 스타일과 타입을 지켜주세요.

## 라이선스

(필요시 라이선스 내용을 여기에 추가하세요.)

---

### 초보 개발자를 위한 추가 설명

- **프롬프트란?**  
  AI에게 원하는 결과를 얻기 위해 입력하는 문장 또는 지시사항입니다.  
  예) "A cinematic night sky with a campfire, soft lighting, 4K resolution"

- **Gemini API란?**  
  Google의 AI 언어 모델 API로, 프롬프트 생성 결과를 받아올 때 사용합니다.

- **옵션 선택 예시**  
  - 시각 스타일: "영화처럼 (Cinematic)"
  - 카메라 앵글: "눈높이 샷 (Eye-level Shot)"
  - 조명: "골든 아워 (Golden Hour)"

---

문의 및 피드백은 이슈로 남겨주세요!

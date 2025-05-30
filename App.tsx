import * as React from 'react';
import { useState, useCallback, ChangeEvent } from 'react';
// @ts-ignore - JSX 타입 정의를 위해 필요

// 한국어를 영어로 번역하는 간단한 맵 (기본적인 예시)
const koreanToEnglishMap: Record<string, string> = {
  '고요한': 'peaceful',
  '밤하늘': 'night sky',
  '캠프파이어': 'campfire',
  '모닥불': 'bonfire',
  '노래': 'sing',
  '부르다': 'sing',
  '시네마틱': 'cinematic',
  '타임랩스': 'timelapse',
  '항공': 'aerial',
  '촬영': 'shot',
  '드론': 'drone',
  '부드러운': 'soft',
  '조명': 'lighting',
  '따뜻한': 'warm',
  '색감': 'color tone',
  '평화로운': 'peaceful',
  '새벽': 'dawn',
  '숲속': 'forest',
  '고화질': 'high resolution',
  '네이티브': 'native',
  '오디오': 'audio',
  '동기화': 'synchronized',
  '영화적': 'cinematic',
  '용어': 'terms',
  '지원': 'support',
  '적극': 'actively',
  '활용': 'utilize',
  '하세요': '',
  '예': 'example',
  '4K': '4K',
  '해상도': 'resolution',
  '하이퍼리얼리스틱': 'hyperrealistic',
  '짧은': 'short',
  '초': 'second',
  '클립': 'clip',
  '장면': 'scene',
  '설명': 'description',
  '주요': 'main',
  '액션': 'action',
  '핵심': 'key',
  '요소': 'elements',
  '스타일': 'style',
  '영향': 'influence',
  '카메라': 'camera',
  '앵글': 'angle',
  '움직임': 'movement',
  '색상': 'color',
  '팔레트': 'palette',
  '배경': 'background',
  '환경': 'environment',
  '시간대': 'time of day',
  '분위기': 'mood',
  '화면': 'screen',
  '비율': 'aspect ratio',
  '제외할': 'negative',
  '추가': 'additional',
  '지시사항': 'details',
  '초기화': 'reset',
  '생성': 'generate',
  '프롬프트': 'prompt',
  '로딩': 'loading',
  '중': 'in progress',
  '오류': 'error',
  '다시': 'again',
  '시도': 'try',
  '해주세요': 'please'
};

// 한국어 문장을 영어로 번역하는 함수 (기본적인 예시)
const translateToEnglish = (text: string): string => {
  if (!text) return '';
  
  // 공백과 특수문자로 분리
  const words = text.split(/([\s,.;:!?]+)/);
  
  // 각 단어를 번역
  const translatedWords = words.map(word => {
    // 특수문자나 공백은 그대로 유지
    if (/^[\s,.;:!?]+$/.test(word)) return word;
    
    // 번역 맵에 있는 단어는 번역, 없으면 원본 유지
    return koreanToEnglishMap[word] || word;
  });
  
  return translatedWords.join('');
};
import { PromptElements } from './types';
import TextInput from './components/TextInput';
import SelectInput from './components/SelectInput';
import GeneratedPromptDisplay from './components/GeneratedPromptDisplay';
import {
  VISUAL_STYLES,
  CAMERA_ANGLES,
  CAMERA_MOVEMENTS,
  LIGHTING_STYLES,
  COLOR_PALETTES,
  TIMES_OF_DAY,
  ASPECT_RATIOS
} from './constants';

const initialPromptElements: PromptElements = {
  subject: '',
  mainAction: '',
  keyElements: '',
  visualStyle: '',
  artisticInfluence: '',
  cameraAngle: '',
  cameraMovement: '',
  lightingStyle: '',
  colorPalette: '',
  setting: '',
  timeOfDay: '',
  mood: '',
  aspectRatio: '',
  negativePrompt: '',
  additionalDetails: '',
};

const App = (): React.ReactElement => {
  const [promptElements, setPromptElements] = useState<PromptElements>(initialPromptElements);
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  const handleChange = useCallback((
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPromptElements(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleGeneratePrompt = useCallback(async () => {
    try {
      setIsLoading(true);
      // 시뮬레이션을 위한 지연 (실제 API 호출 시에는 제거)
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // 입력값을 영어로 번역
      const translateField = (value: string): string => {
        if (!value) return '';
        // 실제 프로덕션에서는 번역 API를 사용하세요.
        // 여기서는 간단한 예시로 한국어를 영어로 변환하는 맵을 사용합니다.
        return translateToEnglish(value);
      };
      
      const {
        subject, mainAction, keyElements, visualStyle, artisticInfluence,
        cameraAngle, cameraMovement, lightingStyle, colorPalette,
        setting, timeOfDay, mood, aspectRatio, negativePrompt, additionalDetails
      } = promptElements;

      const parts: string[] = [];

      // 각 필드를 영어로 번역하여 추가
      if (subject) parts.push(translateField(subject.trim()));
      if (mainAction) parts.push(`Main action: ${translateField(mainAction.trim())}.`);
      if (keyElements) parts.push(`Key elements: ${translateField(keyElements.trim())}.`);
      
      const styleParts = [visualStyle, artisticInfluence]
        .filter(Boolean)
        .map(style => translateField(style as string));
      if (styleParts.length > 0) parts.push(`Style: ${styleParts.join(', ')}.`);

      const cameraParts = [cameraAngle, cameraMovement]
        .filter(Boolean)
        .map(camera => translateField(camera as string));
      if (cameraParts.length > 0) parts.push(`Camera: ${cameraParts.join(', ')}.`);
      
      if (lightingStyle) parts.push(`Lighting: ${translateField(lightingStyle)}.`);
      if (colorPalette) parts.push(`Colors: ${translateField(colorPalette)}.`);

      let settingAndTime = '';
      if (setting) settingAndTime += translateField(setting.trim());
      if (timeOfDay) settingAndTime += settingAndTime ? ` at ${translateField(timeOfDay)}` : translateField(timeOfDay);
      if (settingAndTime) parts.push(`Setting: ${settingAndTime}.`);
      
      if (mood) parts.push(`Mood: ${translateField(mood.trim())}.`);
      if (aspectRatio) parts.push(`Aspect ratio: ${translateField(aspectRatio)}.`);
      if (negativePrompt) parts.push(`Negative prompt: ${translateField(negativePrompt.trim())}.`);
      if (additionalDetails) parts.push(`Additional details: ${translateField(additionalDetails.trim())}.`);

      // 중복된 마침표 제거 및 공백 정리
      setGeneratedPrompt(parts.join(' ').replace(/\.\s*\./g, '.').replace(/\s+/g, ' ').trim());
    } catch (error) {
      console.error('프롬프트 생성 중 오류 발생:', error);
      alert('프롬프트 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  }, [promptElements]);

  const handleReset = useCallback(() => {
    setPromptElements(initialPromptElements);
    setGeneratedPrompt('');
    setIsLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 sm:text-5xl">
          Veo3 프롬프트 생성기
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-400">
          Veo3 동영상 생성에 최적화된 프롬프트를 쉽고 빠르게 만들어보세요.<br />
          <button
            onClick={() => setShowGuide(!showGuide)}
            className="mt-2 px-4 py-1 bg-indigo-700 rounded text-sm hover:bg-indigo-800 transition"
          >
            {showGuide ? '가이드 닫기' : '프롬프트 작성 가이드 보기'}
          </button>
        </p>
        {showGuide && (
          <div className="mt-4 mx-auto max-w-2xl bg-gray-800 border border-indigo-600 rounded-lg p-4 text-left text-sm text-gray-200 shadow-lg animate-fade-in">
            <ul className="list-disc pl-6 space-y-1">
              <li><b>주제/장면:</b> 예) "고요한 밤하늘 아래 캠프파이어"</li>
              <li><b>주요 동작:</b> 예) "사람들이 모닥불 주위에서 노래를 부른다"</li>
              <li><b>스타일/영감:</b> 예) "시네마틱, 타임랩스, 항공 촬영"</li>
              <li><b>카메라/조명/색상:</b> 예) "드론 샷, 부드러운 조명, 따뜻한 색감"</li>
              <li><b>분위기/시간/환경:</b> 예) "평화로운, 새벽, 숲속"</li>
              <li><b>추가 세부사항:</b> 예) "4K, 네이티브 오디오, 16:9 비율"</li>
            </ul>
            <div className="mt-2 text-indigo-400">Veo3의 고화질, 오디오 동기화, 영화적 용어 지원을 적극 활용하세요!</div>
          </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl">
        {/* 입력 패널 */}
        <div className="flex-1 bg-gray-900 rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-bold text-indigo-300 mb-6 pb-3 border-b border-gray-700">📝 프롬프트 입력</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextInput
            label="🎬 주제 / 장면 설명 (Subject / Scene Description)"
            id="subject"
            name="subject"
            value={promptElements.subject}
            onChange={handleChange}
            placeholder="예: 고요한 밤하늘 아래 캠프파이어"
            isTextArea
            rows={3}
          />
          <TextInput
            label="🏃 주요 액션 (Main Action)"
            id="mainAction"
            name="mainAction"
            value={promptElements.mainAction}
            onChange={handleChange}
            placeholder="예: 두 사람이 마시멜로를 굽고 있다"
          />
          <TextInput
            label="✨ 핵심 요소 (Key Elements)"
            id="keyElements"
            name="keyElements"
            value={promptElements.keyElements}
            onChange={handleChange}
            placeholder="예: 반짝이는 별, 타닥거리는 불꽃, 통기타"
          />
          <SelectInput
            label="🎨 시각적 스타일 (Visual Style)"
            id="visualStyle"
            name="visualStyle"
            value={promptElements.visualStyle}
            onChange={handleChange}
            options={VISUAL_STYLES}
          />
          <TextInput
            label="🖼️ 예술적 영향 (Artistic Influence)"
            id="artisticInfluence"
            name="artisticInfluence"
            value={promptElements.artisticInfluence}
            onChange={handleChange}
            placeholder="예: style of Studio Ghibli, Van Gogh inspired"
          />
          <SelectInput
            label="📷 카메라 앵글 (Camera Angle)"
            id="cameraAngle"
            name="cameraAngle"
            value={promptElements.cameraAngle}
            onChange={handleChange}
            options={CAMERA_ANGLES}
          />
          <SelectInput
            label="↔️ 카메라 움직임 (Camera Movement)"
            id="cameraMovement"
            name="cameraMovement"
            value={promptElements.cameraMovement}
            onChange={handleChange}
            options={CAMERA_MOVEMENTS}
          />
          <SelectInput
            label="💡 조명 스타일 (Lighting Style)"
            id="lightingStyle"
            name="lightingStyle"
            value={promptElements.lightingStyle}
            onChange={handleChange}
            options={LIGHTING_STYLES}
          />
          <SelectInput
            label="🌈 색상 팔레트 (Color Palette)"
            id="colorPalette"
            name="colorPalette"
            value={promptElements.colorPalette}
            onChange={handleChange}
            options={COLOR_PALETTES}
          />
          <TextInput
            label="🏞️ 배경/환경 (Setting/Environment)"
            id="setting"
            name="setting"
            value={promptElements.setting}
            onChange={handleChange}
            placeholder="예: 울창한 숲 속, 미래 도시의 마천루"
          />
          <SelectInput
            label="⏳ 시간대 (Time of Day)"
            id="timeOfDay"
            name="timeOfDay"
            value={promptElements.timeOfDay}
            onChange={handleChange}
            options={TIMES_OF_DAY}
          />
          <TextInput
            label="🎭 분위기 (Mood/Atmosphere)"
            id="mood"
            name="mood"
            value={promptElements.mood}
            onChange={handleChange}
            placeholder="예: 평화로운, 신비로운, 긴장감 넘치는"
          />
           <SelectInput
            label="📐 화면 비율 (Aspect Ratio)"
            id="aspectRatio"
            name="aspectRatio"
            value={promptElements.aspectRatio}
            onChange={handleChange}
            options={ASPECT_RATIOS}
          />
          <TextInput
            label="🚫 제외할 요소 (Negative Prompt)"
            id="negativePrompt"
            name="negativePrompt"
            value={promptElements.negativePrompt}
            onChange={handleChange}
            placeholder="예: blurry, ugly, text, watermark"
          />
          <TextInput
            label="⚙️ 추가 지시사항 (Additional Details)"
            id="additionalDetails"
            name="additionalDetails"
            value={promptElements.additionalDetails}
            onChange={handleChange}
            placeholder="예: 4K resolution, hyperrealistic, short 3 second clip"
            isTextArea
            rows={2}
            className="md:col-span-2"
          />
          
          <div className="md:col-span-2 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 mt-4">
            <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto px-6 py-3 border border-gray-500 rounded-md shadow-sm text-base font-medium text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
                초기화
            </button>
            <button
                type="button"
                onClick={handleGeneratePrompt}
                disabled={isLoading}
                className={`w-full sm:w-auto px-8 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 transition duration-150 ease-in-out ${
                  isLoading 
                    ? 'bg-gray-500 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700'
                }`}
            >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    생성 중...
                  </span>
                ) : '🚀 프롬프트 생성'}
            </button>
          </div>
          
        </div>
        
        {/* 결과 패널 */}
        <div className="flex-1 bg-gray-900 rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-bold text-indigo-300 mb-6 pb-3 border-b border-gray-700">✨ 생성된 프롬프트</h2>
          <GeneratedPromptDisplay prompt={generatedPrompt} />
        </div>
      </main>
      <footer className="text-center mt-12 pb-8">
        <p className="text-sm text-gray-500">
          Veo3 Prompt Generator - Gemini API 활용 가이드
        </p>
      </footer>
    </div>
  );
};

export default App;
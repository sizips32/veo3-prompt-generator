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
import SinglePromptGenerator from './components/SinglePromptGenerator';
import MultiCutPromptGenerator from './components/MultiCutPromptGenerator';

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
  const [activeTab, setActiveTab] = useState<'single' | 'multi'>('single');

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-inter bg-gradient-to-br from-gray-900 via-primary to-gray-800 animate-fade-in">
      <header className="text-center mb-10">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-pink-500 drop-shadow-lg tracking-tight animate-fade-in">
          Veo3 프롬프트 생성기
        </h1>
        <div className="mt-8 flex justify-center gap-4">
          <button
            className={`px-8 py-3 rounded-full font-bold text-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 font-poppins shadow ${activeTab === 'single' ? 'bg-gradient-to-r from-primary to-accent text-white shadow-glow scale-105' : 'bg-gray-800/70 text-gray-300 hover:bg-gray-700/80'}`}
            onClick={() => setActiveTab('single')}
          >
            단일 프롬프트 생성
          </button>
          <button
            className={`px-8 py-3 rounded-full font-bold text-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 font-poppins shadow ${activeTab === 'multi' ? 'bg-gradient-to-r from-primary to-accent text-white shadow-glow scale-105' : 'bg-gray-800/70 text-gray-300 hover:bg-gray-700/80'}`}
            onClick={() => setActiveTab('multi')}
          >
            컷 단위 프롬프트 생성
          </button>
        </div>
      </header>
      <main className="max-w-7xl mx-auto flex flex-col gap-10 glass shadow-glass p-8 sm:p-10 rounded-2xl animate-fade-in">
        {activeTab === 'single' && <SinglePromptGenerator />}
        {activeTab === 'multi' && <MultiCutPromptGenerator />}
      </main>
      <footer className="text-center mt-16 pb-8">
        <p className="text-base text-gray-400 font-poppins tracking-wide">
          Veo3 Prompt Generator - Gemini API 활용 가이드
        </p>
      </footer>
    </div>
  );
};

export default App;

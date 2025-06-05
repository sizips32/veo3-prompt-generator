import React, { useState, useCallback, ChangeEvent } from 'react';
import TextInput from './TextInput';
import SelectInput from './SelectInput';
import GeneratedPromptDisplay from './GeneratedPromptDisplay';
import {
    VISUAL_STYLES,
    CAMERA_ANGLES,
    CAMERA_MOVEMENTS,
    LIGHTING_STYLES,
    COLOR_PALETTES,
    TIMES_OF_DAY,
    ASPECT_RATIOS
} from '../constants';
import { PromptElements } from '../types';

// 한글-영문 변환 맵 (App.tsx에서 복사)
const koreanToEnglishMap: Record<string, string> = {
    '고요한': 'peaceful', '밤하늘': 'night sky', '캠프파이어': 'campfire', '모닥불': 'bonfire', '노래': 'sing', '부르다': 'sing',
    '시네마틱': 'cinematic', '타임랩스': 'timelapse', '항공': 'aerial', '촬영': 'shot', '드론': 'drone', '부드러운': 'soft',
    '조명': 'lighting', '따뜻한': 'warm', '색감': 'color tone', '평화로운': 'peaceful', '새벽': 'dawn', '숲속': 'forest',
    '고화질': 'high resolution', '네이티브': 'native', '오디오': 'audio', '동기화': 'synchronized', '영화적': 'cinematic',
    '용어': 'terms', '지원': 'support', '적극': 'actively', '활용': 'utilize', '하세요': '', '예': 'example', '4K': '4K',
    '해상도': 'resolution', '하이퍼리얼리스틱': 'hyperrealistic', '짧은': 'short', '초': 'second', '클립': 'clip', '장면': 'scene',
    '설명': 'description', '주요': 'main', '액션': 'action', '핵심': 'key', '요소': 'elements', '스타일': 'style', '영향': 'influence',
    '카메라': 'camera', '앵글': 'angle', '움직임': 'movement', '색상': 'color', '팔레트': 'palette', '배경': 'background',
    '환경': 'environment', '시간대': 'time of day', '분위기': 'mood', '화면': 'screen', '비율': 'aspect ratio', '제외할': 'negative',
    '추가': 'additional', '지시사항': 'details', '초기화': 'reset', '생성': 'generate', '프롬프트': 'prompt', '로딩': 'loading',
    '중': 'in progress', '오류': 'error', '다시': 'again', '시도': 'try', '해주세요': 'please'
};
const translateToEnglish = (text: string): string => {
    if (!text) return '';
    const words = text.split(/([\s,.;:!?]+)/);
    const translatedWords = words.map(word => {
        if (/^[\s,.;:!?]+$/.test(word)) return word;
        return koreanToEnglishMap[word] || word;
    });
    return translatedWords.join('');
};

const initialPromptElements: PromptElements = {
    subject: '', mainAction: '', keyElements: '', visualStyle: '', artisticInfluence: '', cameraAngle: '', cameraMovement: '', lightingStyle: '', colorPalette: '', setting: '', timeOfDay: '', mood: '', aspectRatio: '', negativePrompt: '', additionalDetails: '',
};

const SinglePromptGenerator = () => {
    const [promptElements, setPromptElements] = useState<PromptElements>(initialPromptElements);
    const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [showGuide, setShowGuide] = useState(false);
    const [lang, setLang] = useState<'ko' | 'en'>('ko');
    const [koreanPrompt, setKoreanPrompt] = useState('');
    const [englishPrompt, setEnglishPrompt] = useState('');

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setPromptElements(prev => ({ ...prev, [name]: value }));
    }, []);

    const handleGeneratePrompt = useCallback(async () => {
        try {
            setIsLoading(true);
            await new Promise(resolve => setTimeout(resolve, 800));
            const {
                subject, mainAction, keyElements, visualStyle, artisticInfluence,
                cameraAngle, cameraMovement, lightingStyle, colorPalette,
                setting, timeOfDay, mood, aspectRatio, negativePrompt, additionalDetails
            } = promptElements;
            const partsKo: string[] = [];
            if (subject) partsKo.push(subject.trim());
            if (mainAction) partsKo.push(`주요 동작: ${mainAction.trim()}.`);
            if (keyElements) partsKo.push(`핵심 요소: ${keyElements.trim()}.`);
            const styleParts = [visualStyle, artisticInfluence].filter(Boolean).map(style => style as string);
            if (styleParts.length > 0) partsKo.push(`스타일: ${styleParts.join(', ')}.`);
            const cameraParts = [cameraAngle, cameraMovement].filter(Boolean).map(camera => camera as string);
            if (cameraParts.length > 0) partsKo.push(`카메라: ${cameraParts.join(', ')}.`);
            if (lightingStyle) partsKo.push(`조명: ${lightingStyle}.`);
            if (colorPalette) partsKo.push(`색상: ${colorPalette}.`);
            let settingAndTime = '';
            if (setting) settingAndTime += setting.trim();
            if (timeOfDay) settingAndTime += settingAndTime ? `, ${timeOfDay}` : timeOfDay;
            if (settingAndTime) partsKo.push(`배경/환경: ${settingAndTime}.`);
            if (mood) partsKo.push(`분위기: ${mood.trim()}.`);
            if (aspectRatio) partsKo.push(`화면 비율: ${aspectRatio}.`);
            if (negativePrompt) partsKo.push(`제외할 요소: ${negativePrompt.trim()}.`);
            if (additionalDetails) partsKo.push(`추가 지시사항: ${additionalDetails.trim()}.`);
            const koPrompt = partsKo.join(' ').replace(/\.\s*\./g, '.').replace(/\s+/g, ' ').trim();
            setKoreanPrompt(koPrompt);
            // 영문 변환
            const translateField = (value: string): string => {
                if (!value) return '';
                return translateToEnglish(value);
            };
            const partsEn: string[] = [];
            if (subject) partsEn.push(translateField(subject.trim()));
            if (mainAction) partsEn.push(`Main action: ${translateField(mainAction.trim())}.`);
            if (keyElements) partsEn.push(`Key elements: ${translateField(keyElements.trim())}.`);
            const stylePartsEn = [visualStyle, artisticInfluence].filter(Boolean).map(style => translateField(style as string));
            if (stylePartsEn.length > 0) partsEn.push(`Style: ${stylePartsEn.join(', ')}.`);
            const cameraPartsEn = [cameraAngle, cameraMovement].filter(Boolean).map(camera => translateField(camera as string));
            if (cameraPartsEn.length > 0) partsEn.push(`Camera: ${cameraPartsEn.join(', ')}.`);
            if (lightingStyle) partsEn.push(`Lighting: ${translateField(lightingStyle)}.`);
            if (colorPalette) partsEn.push(`Colors: ${translateField(colorPalette)}.`);
            let settingAndTimeEn = '';
            if (setting) settingAndTimeEn += translateField(setting.trim());
            if (timeOfDay) settingAndTimeEn += settingAndTimeEn ? ` at ${translateField(timeOfDay)}` : translateField(timeOfDay);
            if (settingAndTimeEn) partsEn.push(`Setting: ${settingAndTimeEn}.`);
            if (mood) partsEn.push(`Mood: ${translateField(mood.trim())}.`);
            if (aspectRatio) partsEn.push(`Aspect ratio: ${translateField(aspectRatio)}.`);
            if (negativePrompt) partsEn.push(`Negative prompt: ${translateField(negativePrompt.trim())}.`);
            if (additionalDetails) partsEn.push(`Additional details: ${translateField(additionalDetails.trim())}.`);
            const enPrompt = partsEn.join(' ').replace(/\.\s*\./g, '.').replace(/\s+/g, ' ').trim();
            setEnglishPrompt(enPrompt);
            setGeneratedPrompt(lang === 'ko' ? koPrompt : enPrompt);
        } catch (error) {
            alert('프롬프트 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
        } finally {
            setIsLoading(false);
        }
    }, [promptElements, lang]);

    const handleReset = useCallback(() => {
        setPromptElements(initialPromptElements);
        setGeneratedPrompt('');
        setKoreanPrompt('');
        setEnglishPrompt('');
        setIsLoading(false);
    }, []);

    const handleLangToggle = () => {
        setLang(prev => {
            const next = prev === 'ko' ? 'en' : 'ko';
            setGeneratedPrompt(next === 'ko' ? koreanPrompt : englishPrompt);
            return next;
        });
    };

    return (
        <>
            <div className="mb-8 mx-auto max-w-2xl">
                <button
                    onClick={() => setShowGuide(!showGuide)}
                    className="px-5 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-full shadow-glow font-semibold hover:scale-105 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 mb-4"
                >
                    {showGuide ? '가이드 닫기' : '프롬프트 작성 가이드 보기'}
                </button>
                {showGuide && (
                    <div className="mt-3 glass border border-primary/60 p-6 text-left text-base text-gray-100 shadow-glass animate-fade-in">
                        <ul className="list-disc pl-6 space-y-2">
                            <li><b>주제/장면:</b> 예) "고요한 밤하늘 아래 캠프파이어"</li>
                            <li><b>주요 동작:</b> 예) "사람들이 모닥불 주위에서 노래를 부른다"</li>
                            <li><b>스타일/영감:</b> 예) "시네마틱, 타임랩스, 항공 촬영"</li>
                            <li><b>카메라/조명/색상:</b> 예) "드론 샷, 부드러운 조명, 따뜻한 색감"</li>
                            <li><b>분위기/시간/환경:</b> 예) "평화로운, 새벽, 숲속"</li>
                            <li><b>추가 세부사항:</b> 예) "4K, 네이티브 오디오, 16:9 비율"</li>
                        </ul>
                        <div className="mt-3 text-accent font-semibold">Veo3의 고화질, 오디오 동기화, 영화적 용어 지원을 적극 활용하세요!</div>
                    </div>
                )}
            </div>
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1 bg-gray-900/80 glass rounded-xl p-8 shadow-lg">
                    <h2 className="text-2xl font-bold text-primary mb-8 pb-4 border-b border-primary/30 font-montserrat tracking-tight flex items-center gap-2">
                        <span className="text-3xl">📝</span> 프롬프트 입력
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <TextInput label="🎬 주제 / 장면 설명" id="subject" name="subject" value={promptElements.subject} onChange={handleChange} placeholder="예: 고요한 밤하늘 아래 캠프파이어" isTextArea rows={3} />
                        <TextInput label="🏃 주요 액션" id="mainAction" name="mainAction" value={promptElements.mainAction} onChange={handleChange} placeholder="예: 두 사람이 마시멜로를 굽고 있다" />
                        <TextInput label="✨ 핵심 요소" id="keyElements" name="keyElements" value={promptElements.keyElements} onChange={handleChange} placeholder="예: 반짝이는 별, 타닥거리는 불꽃, 통기타" />
                        <SelectInput label="🎨 시각적 스타일" id="visualStyle" name="visualStyle" value={promptElements.visualStyle} onChange={handleChange} options={VISUAL_STYLES} />
                        <TextInput label="🖼️ 예술적 영향" id="artisticInfluence" name="artisticInfluence" value={promptElements.artisticInfluence} onChange={handleChange} placeholder="예: style of Studio Ghibli, Van Gogh inspired" />
                        <SelectInput label="📷 카메라 앵글" id="cameraAngle" name="cameraAngle" value={promptElements.cameraAngle} onChange={handleChange} options={CAMERA_ANGLES} />
                        <SelectInput label="↔️ 카메라 움직임" id="cameraMovement" name="cameraMovement" value={promptElements.cameraMovement} onChange={handleChange} options={CAMERA_MOVEMENTS} />
                        <SelectInput label="💡 조명 스타일" id="lightingStyle" name="lightingStyle" value={promptElements.lightingStyle} onChange={handleChange} options={LIGHTING_STYLES} />
                        <SelectInput label="🌈 색상 팔레트" id="colorPalette" name="colorPalette" value={promptElements.colorPalette} onChange={handleChange} options={COLOR_PALETTES} />
                        <TextInput label="🏞️ 배경/환경" id="setting" name="setting" value={promptElements.setting} onChange={handleChange} placeholder="예: 울창한 숲 속, 미래 도시의 마천루" />
                        <SelectInput label="⏳ 시간대" id="timeOfDay" name="timeOfDay" value={promptElements.timeOfDay} onChange={handleChange} options={TIMES_OF_DAY} />
                        <TextInput label="🎭 분위기" id="mood" name="mood" value={promptElements.mood} onChange={handleChange} placeholder="예: 평화로운, 신비로운, 긴장감 넘치는" />
                        <SelectInput label="📐 화면 비율" id="aspectRatio" name="aspectRatio" value={promptElements.aspectRatio} onChange={handleChange} options={ASPECT_RATIOS} />
                        <TextInput label="🚫 제외할 요소" id="negativePrompt" name="negativePrompt" value={promptElements.negativePrompt} onChange={handleChange} placeholder="예: blurry, ugly, text, watermark" />
                        <TextInput label="⚙️ 추가 지시사항" id="additionalDetails" name="additionalDetails" value={promptElements.additionalDetails} onChange={handleChange} placeholder="예: 4K resolution, hyperrealistic, short 3 second clip" isTextArea rows={2} className="md:col-span-2" />
                        <div className="md:col-span-2 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 mt-6">
                            <button type="button" onClick={handleReset} className="w-full sm:w-auto px-7 py-3 border border-gray-500 rounded-full font-semibold text-gray-300 bg-gray-800/70 hover:bg-gray-700/80 shadow transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">초기화</button>
                            <button type="button" onClick={handleGeneratePrompt} disabled={isLoading} className={`w-full sm:w-auto px-10 py-3 rounded-full font-bold text-white bg-gradient-to-r from-primary to-accent shadow-glow hover:scale-105 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${isLoading ? 'bg-gray-500 cursor-not-allowed shadow-none' : ''}`}>{isLoading ? (<span className="flex items-center justify-center"><svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>생성 중...</span>) : '🚀 프롬프트 생성'}</button>
                        </div>
                    </div>
                </div>
                <div className="flex-1 bg-gray-900/80 glass rounded-xl p-8 shadow-lg flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold text-primary font-montserrat tracking-tight flex items-center gap-2">
                            <span className="text-3xl">✨</span> 생성된 프롬프트
                        </h2>
                        <button onClick={handleLangToggle} className="ml-4 px-5 py-2 rounded-full bg-gradient-to-r from-primary to-accent text-white font-semibold shadow-glow hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2">
                            {lang === 'ko' ? '영문으로 보기' : '한글로 보기'}
                        </button>
                    </div>
                    <GeneratedPromptDisplay prompt={generatedPrompt} />
                </div>
            </div>
        </>
    );
};

export default SinglePromptGenerator; 

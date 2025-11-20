import { useState, useCallback, ChangeEvent } from 'react';
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
            <div className="mb-8 mx-auto max-w-2xl text-center">
                <button
                    onClick={() => setShowGuide(!showGuide)}
                    className="px-6 py-2 bg-surface/30 border border-surface-border rounded-full text-sm font-medium text-gray-300 hover:bg-surface-hover hover:text-white hover:border-primary/50 transition-all duration-300 focus:outline-none mb-4"
                >
                    {showGuide ? 'Close Guide' : 'View Prompt Guide'}
                </button>
                {showGuide && (
                    <div className="mt-4 glass-panel p-6 text-left text-sm text-gray-300 rounded-xl animate-fade-in border-l-4 border-primary">
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2"><span className="text-primary font-bold">Subject:</span> "Campfire under a starry night sky"</li>
                            <li className="flex items-start gap-2"><span className="text-primary font-bold">Action:</span> "People singing around the bonfire"</li>
                            <li className="flex items-start gap-2"><span className="text-primary font-bold">Style:</span> "Cinematic, Timelapse, Aerial shot"</li>
                            <li className="flex items-start gap-2"><span className="text-primary font-bold">Tech:</span> "Drone shot, Soft lighting, Warm tones"</li>
                        </ul>
                        <div className="mt-4 pt-4 border-t border-surface-border text-accent text-xs font-mono uppercase tracking-wider">
                            Tip: Use Veo3's high-res & audio sync features!
                        </div>
                    </div>
                )}
            </div>

            <div className="flex flex-col xl:flex-row gap-8">
                <div className="flex-1 glass-panel rounded-2xl p-6 sm:p-8">
                    <h2 className="text-2xl font-bold text-white mb-8 pb-4 border-b border-surface-border font-montserrat tracking-tight flex items-center gap-3">
                        <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/20 text-primary text-xl">📝</span>
                        Prompt Builder
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <TextInput label="Subject / Scene" id="subject" name="subject" value={promptElements.subject} onChange={handleChange} placeholder="e.g. Campfire under a starry night sky" isTextArea rows={2} />
                        </div>

                        <TextInput label="Main Action" id="mainAction" name="mainAction" value={promptElements.mainAction} onChange={handleChange} placeholder="e.g. People singing around the fire" />
                        <TextInput label="Key Elements" id="keyElements" name="keyElements" value={promptElements.keyElements} onChange={handleChange} placeholder="e.g. Sparkling stars, crackling fire" />

                        <div className="md:col-span-2 h-px bg-surface-border my-2"></div>

                        <SelectInput label="Visual Style" id="visualStyle" name="visualStyle" value={promptElements.visualStyle} onChange={handleChange} options={VISUAL_STYLES} />
                        <TextInput label="Artistic Influence" id="artisticInfluence" name="artisticInfluence" value={promptElements.artisticInfluence} onChange={handleChange} placeholder="e.g. Studio Ghibli style" />

                        <SelectInput label="Camera Angle" id="cameraAngle" name="cameraAngle" value={promptElements.cameraAngle} onChange={handleChange} options={CAMERA_ANGLES} />
                        <SelectInput label="Camera Movement" id="cameraMovement" name="cameraMovement" value={promptElements.cameraMovement} onChange={handleChange} options={CAMERA_MOVEMENTS} />

                        <SelectInput label="Lighting" id="lightingStyle" name="lightingStyle" value={promptElements.lightingStyle} onChange={handleChange} options={LIGHTING_STYLES} />
                        <SelectInput label="Color Palette" id="colorPalette" name="colorPalette" value={promptElements.colorPalette} onChange={handleChange} options={COLOR_PALETTES} />

                        <div className="md:col-span-2 h-px bg-surface-border my-2"></div>

                        <TextInput label="Setting / Environment" id="setting" name="setting" value={promptElements.setting} onChange={handleChange} placeholder="e.g. Dense forest, Future city" />
                        <SelectInput label="Time of Day" id="timeOfDay" name="timeOfDay" value={promptElements.timeOfDay} onChange={handleChange} options={TIMES_OF_DAY} />

                        <TextInput label="Mood" id="mood" name="mood" value={promptElements.mood} onChange={handleChange} placeholder="e.g. Peaceful, Mysterious" />
                        <SelectInput label="Aspect Ratio" id="aspectRatio" name="aspectRatio" value={promptElements.aspectRatio} onChange={handleChange} options={ASPECT_RATIOS} />

                        <TextInput label="Negative Prompt" id="negativePrompt" name="negativePrompt" value={promptElements.negativePrompt} onChange={handleChange} placeholder="e.g. blurry, ugly, text" />
                        <TextInput label="Additional Details" id="additionalDetails" name="additionalDetails" value={promptElements.additionalDetails} onChange={handleChange} placeholder="e.g. 4K, hyperrealistic" className="md:col-span-2" />

                        <div className="md:col-span-2 flex flex-col sm:flex-row justify-end gap-4 mt-8 pt-6 border-t border-surface-border">
                            <button
                                type="button"
                                onClick={handleReset}
                                className="px-6 py-3 rounded-xl font-medium text-gray-400 hover:text-white hover:bg-surface-hover transition-all duration-200"
                            >
                                Reset
                            </button>
                            <button
                                type="button"
                                onClick={handleGeneratePrompt}
                                disabled={isLoading}
                                className={`flex-1 sm:flex-none px-8 py-3 rounded-xl font-bold text-white shadow-neon-primary transition-all duration-300 ${isLoading
                                    ? 'bg-surface cursor-not-allowed opacity-70'
                                    : 'bg-primary hover:bg-primary-hover hover:scale-105'
                                    }`}
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Generating...
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center gap-2">
                                        🚀 Generate Prompt
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex-1 glass-panel rounded-2xl p-6 sm:p-8 flex flex-col h-fit sticky top-8">
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-surface-border">
                        <h2 className="text-2xl font-bold text-white font-montserrat tracking-tight flex items-center gap-3">
                            <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent/20 text-accent text-xl">✨</span>
                            Result
                        </h2>
                        <button
                            onClick={handleLangToggle}
                            className="px-4 py-2 rounded-lg bg-surface hover:bg-surface-hover text-xs font-mono text-accent border border-accent/30 transition-all duration-200"
                        >
                            {lang === 'ko' ? 'EN' : 'KO'}
                        </button>
                    </div>
                    <GeneratedPromptDisplay prompt={generatedPrompt} />
                </div>
            </div>
        </>
    );
};

export default SinglePromptGenerator; 

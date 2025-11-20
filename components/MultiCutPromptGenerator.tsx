import React, { useState } from 'react';
import InputPanel from './InputPanel';
import CutPromptCard from './CutPromptCard';
import { parseGeminiResponse } from '../utils/parseGeminiResponse';

// 임시 장르/스타일 옵션 (실제 프로젝트에서는 constants.ts 등에서 관리)
const GENRE_OPTIONS = [
    { value: '', label: '선택안함' },
    { value: '다큐멘터리', label: '다큐멘터리' },
    { value: '드라마', label: '드라마' },
    { value: '액션', label: '액션' },
    { value: '코미디', label: '코미디' },
];
const STYLE_OPTIONS = [
    { value: '', label: '선택안함' },
    { value: '다큐멘터리 스타일', label: '다큐멘터리 스타일' },
    { value: '시네마틱', label: '시네마틱' },
    { value: '애니메이션', label: '애니메이션' },
];

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

// AI 프롬프트 생성용 함수 (프롬프트 강화)
const buildGeminiPrompt = (title: string, summary: string, cutCount: number, lang: 'ko' | 'en') => {
    return `아래 영화 줄거리와 컷 수를 참고하여,\n각 컷별로 주요 인물, 배경, 요약, 그리고 어울리는 영화적 요소(조명, 카메라 위치/움직임, 분위기, 색상 등)를 일관성 있게 생성해줘.\n아무 설명도 붙이지 말고, 반드시 [로 시작해서 ]로 끝나는 JSON 배열만 반환해줘.\n코드블록(\`\`\`)도 사용하지 마.\n예시: [{\"cut\":1,\"scene\":\"장면 설명\",\"videoPrompt\":\"동영상 프롬프트\",\"cameraWork\":\"카메라워크\"}, ...]\n각 컷은 {cut, scene, videoPrompt, cameraWork} 형식의 객체로 만들어.\nscene, videoPrompt, cameraWork는 ${lang === 'ko' ? '한국어' : '영어'}로 작성해줘.\n\n절대 설명, 코드블록, 안내문, 기타 텍스트를 붙이지 말고, JSON 배열만 반환해.\n제목: ${title}\n줄거리: ${summary}\n컷 수: ${cutCount}`;
};

const MultiCutPromptGenerator = () => {
    // 입력값 상태
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [style, setStyle] = useState('');
    const [summary, setSummary] = useState('');
    const [cutCount, setCutCount] = useState(3);
    // 결과 상태
    const [cutPrompts, setCutPrompts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    // 언어 토글/복사 상태 (컷별 관리)
    const [lang, setLang] = useState<'ko' | 'en'>('ko');
    const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

    // 입력값 변경 핸들러
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'title') setTitle(value);
        else if (name === 'genre') setGenre(value);
        else if (name === 'style') setStyle(value);
        else if (name === 'summary') setSummary(value);
        else if (name === 'cutCount') setCutCount(Number(value));
    };

    // 프롬프트 생성 핸들러
    const handleGenerate = async () => {
        setIsLoading(true);
        setError('');
        setCutPrompts([]);
        try {
            const prompt = buildGeminiPrompt(title, summary, cutCount, lang);
            const res = await fetch(GEMINI_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
            });
            const data = await res.json();
            // Gemini API 전체 응답 콘솔 출력 (디버깅용)
            console.log('Gemini API 전체 응답:', data);
            let text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
            // text가 빈 문자열/쉼표/undefined/null 등 예외 케이스 우선 처리
            if (!text || typeof text !== 'string' || text.trim() === '' || text.trim() === ',') {
                setError('AI 응답이 비어있거나 올바르지 않습니다. (빈 문자열, 쉼표, undefined, null 등)\n[응답 미리보기]\n' + (text ?? ''));
                console.error('Gemini 응답 원본:', text);
                setIsLoading(false);
                return;
            }
            // text 콘솔 출력 (디버깅용)
            console.log('Gemini API text:', text);
            const { data: arr, raw } = parseGeminiResponse(text);
            if (!arr) {
                const preview = raw.length > 300 ? raw.slice(0, 300) + ' ...' : raw;
                setError(`AI 응답 파싱에 실패했습니다. 다시 시도해 주세요.\n\n[응답 미리보기]\n${preview}`);
                console.error('Gemini 응답 원본:', raw);
                setIsLoading(false);
                return;
            }
            setCutPrompts(arr);
        } catch (e) {
            setError('API 호출에 실패했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    // 언어 토글 핸들러 (전체 컷에 적용)
    const handleLangToggle = () => {
        setLang(prev => {
            const next = prev === 'ko' ? 'en' : 'ko';
            setTimeout(() => handleGenerate(), 0);
            return next;
        });
    };

    // 복사 핸들러 (컷별)
    const handleCopy = async (idx: number, text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedIdx(idx);
            setTimeout(() => setCopiedIdx(null), 2000);
        } catch {
            alert('복사에 실패했습니다.');
        }
    };

    return (
        <div className="flex flex-col xl:flex-row gap-8 w-full">
            {/* 입력 영역 */}
            <div className="flex-1">
                <InputPanel
                    title={title}
                    genre={genre}
                    style={style}
                    summary={summary}
                    cutCount={cutCount}
                    onChange={handleInputChange}
                    onGenerate={handleGenerate}
                    isLoading={isLoading}
                    genreOptions={GENRE_OPTIONS}
                    styleOptions={STYLE_OPTIONS}
                />
            </div>
            {/* 결과 영역 */}
            <div className="flex-1 glass-panel rounded-2xl p-6 sm:p-8 flex flex-col h-fit sticky top-8">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-surface-border">
                    <h2 className="text-2xl font-bold text-white font-montserrat tracking-tight flex items-center gap-3">
                        <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent/20 text-accent text-xl">✨</span>
                        Generated Script ({cutPrompts.length}/{cutCount})
                    </h2>
                    {cutPrompts.length > 0 && (
                        <button
                            onClick={handleLangToggle}
                            className="px-4 py-2 rounded-lg bg-surface hover:bg-surface-hover text-xs font-mono text-accent border border-accent/30 transition-all duration-200"
                        >
                            {lang === 'ko' ? 'EN' : 'KO'}
                        </button>
                    )}
                </div>

                <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
                    {isLoading && (
                        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                            <div className="w-16 h-16 border-4 border-accent/30 border-t-accent rounded-full animate-spin mb-6"></div>
                            <p className="text-lg font-medium animate-pulse">AI is crafting your script...</p>
                            <p className="text-sm opacity-60 mt-2">This usually takes about 10-15 seconds</p>
                        </div>
                    )}

                    {!isLoading && cutPrompts.length === 0 && !error && (
                        <div className="flex flex-col items-center justify-center py-20 text-gray-500 border-2 border-dashed border-surface-border rounded-xl">
                            <span className="text-4xl mb-4 opacity-50">🎬</span>
                            <p className="text-lg">Ready to generate</p>
                            <p className="text-sm opacity-60 mt-1">Fill out the form and click Generate</p>
                        </div>
                    )}

                    {error && (
                        <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400">
                            <div className="flex items-start gap-3">
                                <span className="text-xl">⚠️</span>
                                <div className="flex-1">
                                    <h3 className="font-bold mb-2">Generation Failed</h3>
                                    <p className="text-sm whitespace-pre-line mb-4 opacity-90">{error}</p>
                                    <button
                                        onClick={handleGenerate}
                                        className="px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 text-sm font-medium transition-all duration-200"
                                    >
                                        Try Again
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {cutPrompts.map((cut, idx) => (
                        <CutPromptCard
                            key={idx}
                            cutNumber={cut.cut || idx + 1}
                            totalCuts={cutPrompts.length}
                            sceneDescription={cut.scene || ''}
                            videoPrompt={cut.videoPrompt || ''}
                            cameraWork={cut.cameraWork}
                            lang={lang}
                            onCopy={() => handleCopy(idx, cut.videoPrompt || '')}
                            onLangToggle={handleLangToggle}
                            copied={copiedIdx === idx}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MultiCutPromptGenerator; 

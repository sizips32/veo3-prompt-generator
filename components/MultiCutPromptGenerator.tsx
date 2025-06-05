import React, { useState } from 'react';
import GeneratedPromptDisplay from './GeneratedPromptDisplay';

// .env 파일에 아래와 같이 저장하세요:
// VITE_GEMINI_API_KEY=여기에_키_입력
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

const buildGeminiPrompt = (title: string, summary: string, cutCount: number, lang: 'ko' | 'en') => {
    return `아래 영화 줄거리와 컷 수를 참고하여,\n1. 각 컷별로 주요 인물, 배경, 요약, 그리고 어울리는 영화적 요소(조명, 카메라 위치/움직임, 분위기, 색상 등)를 일관성 있게 생성해줘.\n2. 결과는 JSON 배열로, 각 컷마다 {cut, text, character, background, lighting, camera, mood, color} 형식으로 반환해줘.\n3. text, character, background, lighting, camera, mood, color는 ${lang === 'ko' ? '한국어' : '영어'}로 작성해줘.\n\n제목: ${title}\n줄거리: ${summary}\n컷 수: ${cutCount}`;
};

const MultiCutPromptGenerator = () => {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [cutCount, setCutCount] = useState(3);
    const [lang, setLang] = useState<'ko' | 'en'>('ko');
    const [cutPrompts, setCutPrompts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Gemini API 호출
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
            // Gemini 응답에서 JSON 추출
            const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
            // JSON 파싱 (Gemini가 코드블록으로 감싸는 경우 처리)
            const jsonMatch = text.match(/```json([\s\S]*?)```/i) || text.match(/\[.*\]/s);
            let arr = [];
            try {
                if (jsonMatch) {
                    arr = JSON.parse(jsonMatch[1] || jsonMatch[0]);
                } else {
                    arr = JSON.parse(text);
                }
            } catch (e) {
                setError('AI 응답 파싱에 실패했습니다. 다시 시도해 주세요.');
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

    // 언어 토글 시 다시 생성
    const handleLangToggle = () => {
        setLang(prev => {
            const next = prev === 'ko' ? 'en' : 'ko';
            // 언어 변경 시 자동 재생성
            setTimeout(() => handleGenerate(), 0);
            return next;
        });
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8 w-full">
            <div className="flex-1 bg-gray-900/80 glass rounded-xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-primary mb-8 pb-4 border-b border-primary/30 font-montserrat tracking-tight flex items-center gap-2">
                    <span className="text-3xl">🎬</span> 영화 전체 줄거리 기반 컷 단위 프롬프트 생성
                </h2>
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-primary mb-2 font-poppins">영화 제목</label>
                        <input type="text" className="w-full p-3 bg-gray-800/70 glass border border-primary/30 rounded-xl shadow focus:shadow-glow focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 placeholder-gray-400 text-gray-100 font-inter text-base" value={title} onChange={e => setTitle(e.target.value)} placeholder="예: 밤하늘의 기적" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-primary mb-2 font-poppins">전체 줄거리</label>
                        <textarea className="w-full p-3 bg-gray-800/70 glass border border-primary/30 rounded-xl shadow focus:shadow-glow focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 placeholder-gray-400 text-gray-100 font-inter text-base resize-none" rows={5} value={summary} onChange={e => setSummary(e.target.value)} placeholder="영화 전체 줄거리를 입력하세요." />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-primary mb-2 font-poppins">컷 수</label>
                        <input type="number" min={1} max={20} className="w-32 p-3 bg-gray-800/70 glass border border-primary/30 rounded-xl shadow focus:shadow-glow focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 placeholder-gray-400 text-gray-100 font-inter text-base" value={cutCount} onChange={e => setCutCount(Number(e.target.value))} />
                    </div>
                    <div className="flex justify-end gap-4 mt-4">
                        <button onClick={handleLangToggle} className="px-5 py-2 rounded-full bg-gradient-to-r from-primary to-accent text-white font-semibold shadow-glow hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2">
                            {lang === 'ko' ? '영문으로 보기' : '한글로 보기'}
                        </button>
                        <button onClick={handleGenerate} disabled={isLoading} className={`px-8 py-3 rounded-full font-bold text-white bg-gradient-to-r from-primary to-accent shadow-glow hover:scale-105 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${isLoading ? 'bg-gray-500 cursor-not-allowed shadow-none' : ''}`}>{isLoading ? '생성 중...' : '컷별 프롬프트 생성'}</button>
                    </div>
                    {error && <div className="text-red-400 font-bold mt-2">{error}</div>}
                </div>
            </div>
            <div className="flex-1 bg-gray-900/80 glass rounded-xl p-8 shadow-lg flex flex-col">
                <h2 className="text-2xl font-bold text-primary font-montserrat tracking-tight flex items-center gap-2 mb-4">
                    <span className="text-3xl">✨</span> 컷별 프롬프트 결과
                </h2>
                <div className="space-y-4">
                    {isLoading && <div className="text-gray-400">AI가 프롬프트를 생성 중입니다...</div>}
                    {!isLoading && cutPrompts.length === 0 && <div className="text-gray-400">컷별 프롬프트가 여기에 표시됩니다.</div>}
                    {cutPrompts.map((cut, idx) => (
                        <div key={idx} className="mb-6">
                            <GeneratedPromptDisplay prompt={cut.text} />
                            <div className="mt-2 text-sm text-gray-300">
                                <div><b>인물:</b> {cut.character}</div>
                                <div><b>배경:</b> {cut.background}</div>
                                <div><b>조명:</b> {cut.lighting}</div>
                                <div><b>카메라:</b> {cut.camera}</div>
                                <div><b>분위기:</b> {cut.mood}</div>
                                <div><b>색상:</b> {cut.color}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MultiCutPromptGenerator; 

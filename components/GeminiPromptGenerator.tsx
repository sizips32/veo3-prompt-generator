import React, { useState } from 'react';

// 환경변수에서 API 키를 불러옵니다.
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// 최신 Gemini 2.5 Flash Preview 04-17 모델명 사용
const GEMINI_MODEL = 'gemini-2.5-flash-preview-0417';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

// 프롬프트 생성 함수 (예시)
const buildGeminiPrompt = (title: string, summary: string, cutCount: number) => {
    return `아래 영화 줄거리와 컷 수를 참고하여, 각 컷별로 주요 인물, 배경, 요약, 영화적 요소(조명, 카메라워크 등)를 JSON 배열로 반환해줘. 설명, 코드블록 없이 배열만 반환. 예시: [{\"cut\":1,\"scene\":\"장면 설명\",\"videoPrompt\":\"프롬프트\",\"cameraWork\":\"카메라워크\"}, ...] 제목: ${title} 줄거리: ${summary} 컷 수: ${cutCount}`;
};

const GeminiPromptGenerator: React.FC = () => {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [cutCount, setCutCount] = useState(3);
    const [result, setResult] = useState<any[]>([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Gemini API 호출 및 파싱
    const handleGenerate = async () => {
        setIsLoading(true);
        setError('');
        setResult([]);
        try {
            const prompt = buildGeminiPrompt(title, summary, cutCount);
            const res = await fetch(GEMINI_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
            });
            const data = await res.json();
            console.log('Gemini API 전체 응답:', data);

            // 응답에서 text 추출
            const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (!text || typeof text !== 'string' || text.trim() === '' || text.trim() === ',') {
                setError('AI 응답이 비어있거나 올바르지 않습니다.\n[응답 미리보기]\n' + (text ?? ''));
                return;
            }
            // JSON 배열 파싱
            try {
                const arr = JSON.parse(text);
                setResult(arr);
            } catch (e) {
                setError('AI 응답 파싱에 실패했습니다.\n[응답 미리보기]\n' + text);
            }
        } catch (e) {
            setError('API 호출에 실패했습니다.');
            console.error('Gemini API 호출 에러:', e);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: 600, margin: '0 auto', padding: 24 }}>
            <h2>Gemini 2.5 Flash Preview 프롬프트 생성기</h2>
            <input
                type="text"
                placeholder="제목"
                value={title}
                onChange={e => setTitle(e.target.value)}
                style={{ width: '100%', marginBottom: 8 }}
            />
            <textarea
                placeholder="줄거리"
                value={summary}
                onChange={e => setSummary(e.target.value)}
                style={{ width: '100%', marginBottom: 8 }}
            />
            <input
                type="number"
                min={1}
                max={10}
                value={cutCount}
                onChange={e => setCutCount(Number(e.target.value))}
                style={{ width: '100px', marginBottom: 8 }}
            />
            <button onClick={handleGenerate} disabled={isLoading}>
                {isLoading ? '생성 중...' : '프롬프트 생성'}
            </button>
            {error && <div style={{ color: 'red', marginTop: 16, whiteSpace: 'pre-line' }}>{error}</div>}
            <div style={{ marginTop: 16 }}>
                {result.map((cut, idx) => (
                    <div key={idx} style={{ border: '1px solid #ccc', marginBottom: 8, padding: 8 }}>
                        <b>컷 {cut.cut}</b>
                        <div>장면: {cut.scene}</div>
                        <div>프롬프트: {cut.videoPrompt}</div>
                        <div>카메라워크: {cut.cameraWork}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GeminiPromptGenerator;

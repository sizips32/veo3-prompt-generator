// Gemini API 직접 호출 및 파싱 테스트 스크립트 (TypeScript 버전)
// 사용법: npx ts-node test-gemini-api.ts
// 환경변수 GEMINI_API_KEY 필요

import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import fetch from 'node-fetch';
import { parseGeminiResponse } from './utils/parseGeminiResponse.ts';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = 'gemini-2.0-flash'; // 최신 고속 모델명으로 변경
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

// 실제 앱과 유사한 프롬프트 생성 함수
function buildGeminiPrompt(title: string, summary: string, cutCount: number, lang: 'ko' | 'en') {
    return `아래 영화 줄거리와 컷 수를 참고하여,\n각 컷별로 주요 인물, 배경, 요약, 그리고 어울리는 영화적 요소(조명, 카메라 위치/움직임, 분위기, 색상 등)를 일관성 있게 생성해줘.\n아무 설명도 붙이지 말고, 반드시 [로 시작해서 ]로 끝나는 JSON 배열만 반환해줘.\n코드블록(\u0060\u0060\u0060)도 사용하지 마.\n예시: [{\"cut\":1,\"scene\":\"장면 설명\",\"videoPrompt\":\"동영상 프롬프트\",\"cameraWork\":\"카메라워크\"}, ...]\n각 컷은 {cut, scene, videoPrompt, cameraWork} 형식의 객체로 만들어.\nscene, videoPrompt, cameraWork는 ${lang === 'ko' ? '한국어' : '영어'}로 작성해줘.\n\n절대 설명, 코드블록, 안내문, 기타 텍스트를 붙이지 말고, JSON 배열만 반환해.\n제목: ${title}\n줄거리: ${summary}\n컷 수: ${cutCount}`;
}

async function main() {
    if (!GEMINI_API_KEY) {
        console.error('GEMINI_API_KEY 환경변수가 필요합니다. .env.local 파일을 확인하세요.');
        process.exit(1);
    }

    // 테스트용 입력값
    const title = '캠프파이어의 밤';
    const summary = '친구들이 숲속에서 모닥불을 피우고 노래를 부르며 추억을 쌓는 이야기';
    const cutCount = 3;
    const lang: 'ko' = 'ko';

    const prompt = buildGeminiPrompt(title, summary, cutCount, lang);

    try {
        const res = await fetch(GEMINI_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });
        const data = await res.json();
        console.log('--- Gemini API 전체 응답 ---\n', data);
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
        console.log('--- Gemini API 원본 응답 ---\n', text);
        const { data: arr, error, raw } = parseGeminiResponse(text);
        if (arr) {
            console.log('\n--- 파싱 성공! ---');
            console.log(arr);
        } else {
            console.error('\n--- 파싱 실패 ---');
            console.error(error);
            console.error('\n[응답 원본]\n', raw);
        }
    } catch (e) {
        console.error('API 호출 또는 파싱 중 에러:', e);
    }
}

main(); 

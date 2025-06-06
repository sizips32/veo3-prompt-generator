// Gemini API 응답에서 JSON 배열만 추출하여 파싱하는 함수
// 주니어 개발자도 이해할 수 있도록 상세 주석을 추가합니다.

/**
 * Gemini API 응답 텍스트에서 JSON 배열만 추출하여 파싱합니다.
 * 다양한 예외 케이스(코드블록, 불필요한 텍스트, 부분 JSON 등)를 견고하게 처리합니다.
 * @param text Gemini API의 원본 응답 텍스트
 * @returns { data, error, raw } data: 파싱된 배열, error: 에러 메시지, raw: 원본 텍스트
 */
export function parseGeminiResponse(text: string): { data: any[] | null, error: string | null, raw: string } {
    let arr: any[] = [];
    let parsed = false;
    let error: string | null = null;
    let raw = text;

    // 1. 코드블록(\`\`\`) 제거 (AI가 실수로 코드블록으로 감쌀 때)
    text = text.replace(/```json|```/gi, '');

    // 2. 배열만 추출 (여러 개 있을 경우 첫 번째만 사용)
    const arrMatches = text.match(/\[[\s\S]*?\]/g);
    if (arrMatches && arrMatches.length > 0) {
        try {
            arr = JSON.parse(arrMatches[0]);
            parsed = true;
        } catch (e) {
            error = 'JSON 배열 파싱 실패';
        }
    }

    // 3. 전체 텍스트 파싱 시도 (마지막 수단)
    if (!parsed) {
        try {
            arr = JSON.parse(text);
            parsed = true;
        } catch (e) {
            error = '전체 JSON 파싱 실패';
        }
    }

    if (!parsed) {
        return { data: null, error: error || '파싱 실패', raw };
    }
    return { data: arr, error: null, raw };
} 

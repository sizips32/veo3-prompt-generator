// Gemini API 응답에서 JSON 배열만 추출하여 파싱하는 함수 (고도화 버전)
// 주니어 개발자도 이해할 수 있도록 상세 주석을 추가합니다.
/**
 * Gemini API 응답 텍스트에서 JSON 배열만 추출하여 파싱합니다.
 * 다양한 예외 케이스(코드블록, 불필요한 텍스트, 부분 JSON, 대괄호 누락 등)를 견고하게 처리합니다.
 * @param text Gemini API의 원본 응답 텍스트
 * @returns { data, error, raw } data: 파싱된 배열, error: 에러 메시지, raw: 원본 텍스트
 */
export function parseGeminiResponse(text) {
    let arr = [];
    let parsed = false;
    let error = null;
    let raw = text;
    // 1. 코드블록(```) 제거 (AI가 실수로 코드블록으로 감쌀 때)
    text = text.replace(/```json|```/gi, '');
    // 2. 불필요한 안내문/설명 제거 (배열 시작 전 텍스트, 배열 끝 이후 텍스트)
    //    예: "아래는 결과입니다. [ ... ]"
    const firstBracket = text.indexOf('[');
    const lastBracket = text.lastIndexOf(']');
    if (firstBracket !== -1 && lastBracket !== -1 && lastBracket > firstBracket) {
        text = text.slice(firstBracket, lastBracket + 1);
    }
    // 3. 배열만 추출 (여러 개 있을 경우 첫 번째만 사용)
    const arrMatches = text.match(/\[[\s\S]*?\]/g);
    if (arrMatches && arrMatches.length > 0) {
        try {
            arr = JSON.parse(arrMatches[0]);
            parsed = true;
        }
        catch (e) {
            // 4. 대괄호/중괄호 누락 시 자동 보정 시도
            let fixed = arrMatches[0]
                .replace(/,\s*\]/g, ']') // 마지막 쉼표 제거
                .replace(/([\}\]])\s*([\{\[])/g, '$1,$2'); // 객체/배열 사이 누락된 쉼표 보정
            try {
                arr = JSON.parse(fixed);
                parsed = true;
            }
            catch (e2) {
                error = 'JSON 배열 파싱 실패: ' + e2.message;
            }
        }
    }
    // 5. 전체 텍스트 파싱 시도 (마지막 수단)
    if (!parsed) {
        try {
            arr = JSON.parse(text);
            parsed = true;
        }
        catch (e) {
            error = '전체 JSON 파싱 실패: ' + e.message;
        }
    }
    // 6. 여전히 파싱 실패 시, 원본 응답 일부와 함께 구체적 에러 안내
    if (!parsed) {
        let preview = raw.length > 300 ? raw.slice(0, 300) + ' ...' : raw;
        return {
            data: null,
            error: (error || '파싱 실패') + '\n[응답 미리보기]\n' + preview,
            raw
        };
    }
    return { data: arr, error: null, raw };
}

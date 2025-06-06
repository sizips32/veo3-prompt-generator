import React from 'react';

interface CutPromptCardProps {
    cutNumber: number;
    totalCuts: number;
    sceneDescription: string;
    videoPrompt: string;
    cameraWork?: string;
    lang: 'ko' | 'en';
    onCopy: () => void;
    onLangToggle: () => void;
    copied: boolean;
}

/**
 * 컷별 프롬프트 카드 컴포넌트
 * - 컷 번호, 장면 설명, 동영상 프롬프트, 복사/언어 토글 버튼, 카메라워크 등 표시
 */
const CutPromptCard = ({
    cutNumber, totalCuts, sceneDescription, videoPrompt, cameraWork, lang, onCopy, onLangToggle, copied
}: CutPromptCardProps) => (
    <div className="bg-gradient-to-br from-green-900/80 to-gray-900/80 rounded-2xl p-6 mb-6 shadow-lg">
        <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-lg shadow">{cutNumber}</div>
            <span className="text-gray-300 font-semibold">/ {totalCuts}</span>
        </div>
        <div className="mb-3 text-base text-gray-100">{sceneDescription}</div>
        <div className="bg-green-950/80 rounded-xl p-4 mb-2">
            <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-green-300">🎬 동영상 프롬프트:</span>
                <div className="flex gap-2">
                    <button onClick={onLangToggle} className="px-3 py-1 rounded bg-gray-700 text-white text-xs">{lang === 'ko' ? '한국어' : '영어'}</button>
                    <button onClick={onCopy} className={`px-3 py-1 rounded ${copied ? 'bg-green-600' : 'bg-gray-700'} text-white text-xs`}>{copied ? '복사됨' : '복사'}</button>
                </div>
            </div>
            <div className="text-gray-200 whitespace-pre-line text-sm">{videoPrompt}</div>
        </div>
        {cameraWork && (
            <div className="bg-gray-800/80 rounded-lg p-3 mt-2 text-gray-300 text-xs">
                <b>카메라워크:</b> {cameraWork}
            </div>
        )}
    </div>
);

export default CutPromptCard; 

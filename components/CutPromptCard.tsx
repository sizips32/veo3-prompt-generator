

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
    <div className="glass-panel rounded-xl p-6 mb-6 border-l-4 border-accent hover:border-accent-hover transition-all duration-300 group">
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/20 text-accent flex items-center justify-center font-bold text-lg font-mono">
                    {String(cutNumber).padStart(2, '0')}
                </div>
                <span className="text-gray-500 font-mono text-sm">/ {String(totalCuts).padStart(2, '0')}</span>
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button onClick={onLangToggle} className="px-3 py-1.5 rounded-lg bg-surface hover:bg-surface-hover text-xs font-mono text-gray-300 border border-surface-border transition-all duration-200">
                    {lang === 'ko' ? 'EN' : 'KO'}
                </button>
                <button
                    onClick={onCopy}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all duration-200 ${copied
                        ? 'bg-green-500/20 text-green-400 border-green-500/50'
                        : 'bg-surface hover:bg-surface-hover text-gray-300 border-surface-border hover:text-white'
                        }`}
                >
                    {copied ? 'COPIED' : 'COPY'}
                </button>
            </div>
        </div>

        <div className="mb-4 text-base text-gray-300 font-light leading-relaxed">
            {sceneDescription}
        </div>

        <div className="bg-bg-secondary/50 rounded-lg p-4 mb-3 border border-surface-border">
            <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-accent uppercase tracking-wider">Video Prompt</span>
            </div>
            <div className="text-gray-200 text-sm leading-relaxed font-mono">
                {videoPrompt}
            </div>
        </div>

        {cameraWork && (
            <div className="flex items-center gap-2 text-xs text-gray-400 bg-surface/30 rounded-lg px-3 py-2 w-fit">
                <span className="text-primary font-bold uppercase tracking-wider">Camera:</span>
                <span>{cameraWork}</span>
            </div>
        )}
    </div>
);

export default CutPromptCard; 

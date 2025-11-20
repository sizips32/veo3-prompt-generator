import React from 'react';

interface InputPanelProps {
    title: string;
    genre: string;
    style: string;
    summary: string;
    cutCount: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    onGenerate: () => void;
    isLoading: boolean;
    genreOptions: { value: string; label: string }[];
    styleOptions: { value: string; label: string }[];
}

/**
 * 영화 정보 입력 패널 컴포넌트
 * - 영화 제목, 장르, 스타일, 줄거리, 컷 수 입력 및 스크립트 생성 버튼
 */
const InputPanel = ({
    title, genre, style, summary, cutCount, onChange, onGenerate, isLoading, genreOptions, styleOptions
}: InputPanelProps) => (
    <div className="glass-panel rounded-2xl p-6 sm:p-8 w-full mb-8">
        <h2 className="text-2xl font-bold text-white mb-8 pb-4 border-b border-surface-border font-montserrat tracking-tight flex items-center gap-3">
            <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent/20 text-accent text-xl">🎬</span>
            Movie Info
        </h2>

        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-400 mb-2 ml-1">Movie Title</label>
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={onChange}
                    className="w-full p-4 bg-surface/50 glass-input rounded-xl text-gray-100 font-inter text-base placeholder-gray-500 focus:outline-none transition-all duration-300"
                    placeholder="e.g. Daniel's Redemption"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2 ml-1">Genre</label>
                    <div className="relative">
                        <select
                            name="genre"
                            value={genre}
                            onChange={onChange}
                            className="w-full p-4 bg-surface/50 glass-input rounded-xl text-gray-100 font-inter text-base appearance-none cursor-pointer focus:outline-none transition-all duration-300"
                        >
                            {genreOptions.map(opt => <option key={opt.value} value={opt.value} className="bg-bg-tertiary text-gray-100">{opt.label}</option>)}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd" /></svg>
                        </div>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2 ml-1">Style</label>
                    <div className="relative">
                        <select
                            name="style"
                            value={style}
                            onChange={onChange}
                            className="w-full p-4 bg-surface/50 glass-input rounded-xl text-gray-100 font-inter text-base appearance-none cursor-pointer focus:outline-none transition-all duration-300"
                        >
                            {styleOptions.map(opt => <option key={opt.value} value={opt.value} className="bg-bg-tertiary text-gray-100">{opt.label}</option>)}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd" /></svg>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-400 mb-2 ml-1">Summary / Plot</label>
                <textarea
                    name="summary"
                    value={summary}
                    onChange={onChange}
                    rows={4}
                    className="w-full p-4 bg-surface/50 glass-input rounded-xl text-gray-100 font-inter text-base placeholder-gray-500 focus:outline-none transition-all duration-300 resize-none"
                    placeholder="Enter the full plot or summary of the video..."
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-400 mb-2 ml-1">Number of Cuts</label>
                <input
                    type="number"
                    name="cutCount"
                    min={1}
                    max={20}
                    value={cutCount}
                    onChange={onChange}
                    className="w-full sm:w-32 p-4 bg-surface/50 glass-input rounded-xl text-gray-100 font-inter text-base placeholder-gray-500 focus:outline-none transition-all duration-300"
                />
            </div>

            <div className="pt-6 border-t border-surface-border mt-2">
                <button
                    type="button"
                    onClick={onGenerate}
                    disabled={isLoading}
                    className={`w-full py-4 rounded-xl font-bold text-lg text-white shadow-neon-accent transition-all duration-300 ${isLoading
                            ? 'bg-surface cursor-not-allowed opacity-70'
                            : 'bg-accent hover:bg-accent-hover hover:scale-[1.02]'
                        }`}
                >
                    {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Generating Script...
                        </span>
                    ) : (
                        <span className="flex items-center justify-center gap-2">
                            ✨ Generate Script
                        </span>
                    )}
                </button>
            </div>
        </div>
    </div>
);

export default InputPanel; 

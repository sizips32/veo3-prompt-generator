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
    <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-2xl p-8 shadow-lg w-full max-w-xl mx-auto mb-8">
        <h2 className="text-2xl font-bold text-primary mb-8 pb-4 border-b border-primary/30 font-montserrat tracking-tight flex items-center gap-2">
            영화 정보 입력
        </h2>
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-semibold text-primary mb-2 font-poppins">영화 제목</label>
                <input type="text" name="title" value={title} onChange={onChange} className="w-full p-3 bg-gray-800/70 glass border border-primary/30 rounded-xl shadow focus:shadow-glow focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 placeholder-gray-400 text-gray-100 font-inter text-base" placeholder="예: 다니엘의 절제" />
            </div>
            <div className="flex gap-4">
                <div className="flex-1">
                    <label className="block text-sm font-semibold text-primary mb-2 font-poppins">장르</label>
                    <select name="genre" value={genre} onChange={onChange} className="w-full p-3 bg-gray-800/70 glass border border-primary/30 rounded-xl shadow focus:shadow-glow focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 text-gray-100 font-inter text-base">
                        {genreOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                    </select>
                </div>
                <div className="flex-1">
                    <label className="block text-sm font-semibold text-primary mb-2 font-poppins">스타일</label>
                    <select name="style" value={style} onChange={onChange} className="w-full p-3 bg-gray-800/70 glass border border-primary/30 rounded-xl shadow focus:shadow-glow focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 text-gray-100 font-inter text-base">
                        {styleOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                    </select>
                </div>
            </div>
            <div>
                <label className="block text-sm font-semibold text-primary mb-2 font-poppins">줄거리</label>
                <textarea name="summary" value={summary} onChange={onChange} rows={4} className="w-full p-3 bg-gray-800/70 glass border border-primary/30 rounded-xl shadow focus:shadow-glow focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 placeholder-gray-400 text-gray-100 font-inter text-base resize-none" placeholder="영화 전체 줄거리를 입력하세요." />
            </div>
            <div>
                <label className="block text-sm font-semibold text-primary mb-2 font-poppins">컷 수</label>
                <input type="number" name="cutCount" min={1} max={20} value={cutCount} onChange={onChange} className="w-32 p-3 bg-gray-800/70 glass border border-primary/30 rounded-xl shadow focus:shadow-glow focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 placeholder-gray-400 text-gray-100 font-inter text-base" />
            </div>
            <div className="pt-4">
                <button type="button" onClick={onGenerate} disabled={isLoading} className="w-full py-4 rounded-full font-bold text-lg bg-gradient-to-r from-green-400 to-green-600 text-white shadow-glow hover:scale-105 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2">
                    {isLoading ? '생성 중...' : '스크립트 생성'}
                </button>
            </div>
        </div>
    </div>
);

export default InputPanel; 

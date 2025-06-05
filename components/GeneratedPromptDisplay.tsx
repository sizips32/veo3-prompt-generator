import React, { useState } from 'react';

interface GeneratedPromptDisplayProps {
  prompt: string;
}

const GeneratedPromptDisplay = ({ prompt }: GeneratedPromptDisplayProps): JSX.Element | null => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!prompt) return;
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset copied status after 2 seconds
    } catch (err) {
      console.error('Failed to copy: ', err);
      alert('프롬프트를 복사하는데 실패했습니다.');
    }
  };

  if (!prompt) {
    return null;
  }

  return (
    <div className="mt-8 p-8 glass rounded-2xl shadow-glass animate-fade-in">
      <h3 className="text-2xl font-bold text-primary mb-4 font-montserrat tracking-tight flex items-center gap-2">
        <span className="text-2xl">✨</span> 생성된 프롬프트:
      </h3>
      <div className="p-5 bg-gray-900/80 glass rounded-xl text-gray-200 font-inter text-lg whitespace-pre-wrap break-words max-h-96 overflow-y-auto shadow-inner border border-primary/10">
        {prompt}
      </div>
      <button
        onClick={handleCopy}
        disabled={!prompt}
        className={`mt-6 w-full flex items-center justify-center px-8 py-3 rounded-full font-bold text-white bg-gradient-to-r from-primary to-accent shadow-glow hover:scale-105 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 font-poppins text-lg ${copied ? 'bg-green-600 hover:bg-green-700' : ''
          } disabled:opacity-50`}
      >
        {copied ? (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            복사 완료!
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            프롬프트 복사
          </>
        )}
      </button>
    </div>
  );
};

export default GeneratedPromptDisplay;

import { useState } from 'react';

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
    <div className="mt-8 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-primary-light font-mono flex items-center gap-2">
          <span className="text-accent animate-pulse-slow">❯</span> Generated Prompt
        </h3>
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
        </div>
      </div>

      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
        <div className="relative p-6 bg-bg-secondary rounded-xl border border-surface-border shadow-2xl">
          <div className="font-mono text-sm sm:text-base text-gray-300 whitespace-pre-wrap break-words leading-relaxed">
            <span className="text-accent mr-2">$</span>
            {prompt}
            <span className="inline-block w-2 h-4 ml-1 bg-accent animate-pulse align-middle"></span>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleCopy}
              disabled={!prompt}
              className={`flex items-center px-6 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${copied
                ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                : 'bg-surface hover:bg-surface-hover text-gray-300 border border-surface-border hover:border-primary/50 hover:text-white'
                }`}
            >
              {copied ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy to Clipboard
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratedPromptDisplay;

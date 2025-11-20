import * as React from 'react';
import { useState } from 'react';
import SinglePromptGenerator from './components/SinglePromptGenerator';
import MultiCutPromptGenerator from './components/MultiCutPromptGenerator';

const App = (): React.ReactElement => {
  const [activeTab, setActiveTab] = useState<'single' | 'multi'>('single');

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-radial from-primary-glow/20 to-transparent pointer-events-none" />

      <header className="text-center mb-12 relative z-10">
        <h1 className="text-5xl sm:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-primary-light to-accent-light drop-shadow-[0_0_15px_rgba(139,92,246,0.5)] tracking-tight animate-fade-in mb-4">
          Veo3 Prompt Generator
        </h1>
        <p className="text-gray-400 text-lg font-light tracking-wide animate-slide-up" style={{ animationDelay: '0.1s' }}>
          Create cinematic video prompts with AI precision
        </p>

        <div className="mt-10 flex justify-center gap-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <button
            className={`px-8 py-3 rounded-xl font-bold text-lg transition-all duration-300 border border-transparent ${activeTab === 'single'
                ? 'bg-primary text-white shadow-neon-primary scale-105'
                : 'bg-surface hover:bg-surface-hover text-gray-400 border-surface-border hover:text-white'
              }`}
            onClick={() => setActiveTab('single')}
          >
            Single Cut
          </button>
          <button
            className={`px-8 py-3 rounded-xl font-bold text-lg transition-all duration-300 border border-transparent ${activeTab === 'multi'
                ? 'bg-accent text-white shadow-neon-accent scale-105'
                : 'bg-surface hover:bg-surface-hover text-gray-400 border-surface-border hover:text-white'
              }`}
            onClick={() => setActiveTab('multi')}
          >
            Multi Cut
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto relative z-10 animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <div className="glass-panel p-8 sm:p-10 rounded-3xl">
          {activeTab === 'single' && <SinglePromptGenerator />}
          {activeTab === 'multi' && <MultiCutPromptGenerator />}
        </div>
      </main>

      <footer className="text-center mt-16 pb-8 relative z-10">
        <p className="text-sm text-gray-500 font-mono">
          Powered by Gemini API • Designed for Veo3
        </p>
      </footer>
    </div>
  );
};

export default App;

import React from 'react';
import { BookOpen, LineChart, Plus } from 'lucide-react';
import { MainSection } from '../types';

interface BottomNavProps {
  currentSection: MainSection;
  onSelectSection: (section: MainSection) => void;
  onOpenNewSession: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentSection,
  onSelectSection,
  onOpenNewSession,
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 safe-area-bottom">
      <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-between">
        {/* Section 1: Guida Cuccioli (Cose da sapere) */}
        <button
          type="button"
          id="nav-guida-btn"
          onClick={() => onSelectSection('guida')}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-colors min-h-[48px] ${
            currentSection === 'guida'
              ? 'text-emerald-700 font-bold'
              : 'text-stone-500 hover:text-stone-800 font-medium'
          }`}
        >
          <div className="relative">
            <BookOpen className={`w-5 h-5 ${currentSection === 'guida' ? 'stroke-[2.5]' : ''}`} />
            {currentSection === 'guida' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-emerald-600" />
            )}
          </div>
          <span className="text-[11px] mt-1">Guida Cuccioli</span>
        </button>

        {/* Central Action: Quick Session Log */}
        <div className="flex-1 flex justify-center -mt-4">
          <button
            type="button"
            id="nav-quick-add-session-btn"
            onClick={onOpenNewSession}
            className="w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30 transition-transform active:scale-95 border-2 border-white"
            title="Registra nuova sessione di addestramento"
          >
            <Plus className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>

        {/* Section 2: Progressi Giornalieri */}
        <button
          type="button"
          id="nav-progressi-btn"
          onClick={() => onSelectSection('progressi')}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-colors min-h-[48px] ${
            currentSection === 'progressi'
              ? 'text-emerald-700 font-bold'
              : 'text-stone-500 hover:text-stone-800 font-medium'
          }`}
        >
          <div className="relative">
            <LineChart className={`w-5 h-5 ${currentSection === 'progressi' ? 'stroke-[2.5]' : ''}`} />
            {currentSection === 'progressi' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-emerald-600" />
            )}
          </div>
          <span className="text-[11px] mt-1">Diario Progressi</span>
        </button>
      </div>
    </nav>
  );
};

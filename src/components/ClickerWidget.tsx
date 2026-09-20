import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, X } from 'lucide-react';
import { clickerAudio } from '../utils/audioClicker';

interface ClickerWidgetProps {
  onClose?: () => void;
  isFloating?: boolean;
}

export const ClickerWidget: React.FC<ClickerWidgetProps> = ({ onClose, isFloating = false }) => {
  const [clickCount, setClickCount] = useState(0);
  const [isPressed, setIsPressed] = useState(false);
  const [soundMuted, setSoundMuted] = useState(false);
  const [lastClickTime, setLastClickTime] = useState<string | null>(null);

  const handleClick = () => {
    setIsPressed(true);
    if (!soundMuted) {
      clickerAudio.playClick();
    }
    setClickCount((prev) => prev + 1);
    const now = new Date();
    setLastClickTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));

    setTimeout(() => {
      setIsPressed(false);
    }, 120);
  };

  return (
    <div
      id="clicker-widget"
      className={`bg-white rounded-2xl border border-stone-200 shadow-sm p-4 ${
        isFloating ? 'max-w-sm mx-auto' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
            <Sparkles className="w-4 h-4 text-emerald-600" />
          </div>
          <div>
            <h3 className="font-semibold text-stone-900 text-sm">Clicker di Addestramento</h3>
            <p className="text-xs text-stone-500">Marca il comportamento esatto con il suono</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            id="toggle-clicker-sound"
            onClick={() => setSoundMuted(!soundMuted)}
            className="p-1.5 rounded-lg text-stone-500 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            title={soundMuted ? 'Riattiva suono' : 'Muto'}
          >
            {soundMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
          </button>
          {onClose && (
            <button
              type="button"
              id="close-clicker"
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main Interactive Button */}
      <div className="flex flex-col items-center justify-center py-2">
        <button
          type="button"
          id="main-clicker-button"
          onClick={handleClick}
          className={`relative w-36 h-36 rounded-full flex flex-col items-center justify-center transition-all duration-75 select-none active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-200 ${
            isPressed
              ? 'bg-emerald-600 shadow-inner translate-y-1'
              : 'bg-emerald-500 shadow-lg hover:bg-emerald-600 text-white'
          }`}
          style={{
            boxShadow: isPressed
              ? 'inset 0 4px 10px rgba(0,0,0,0.35)'
              : '0 8px 18px -4px rgba(16, 185, 129, 0.45), 0 3px 6px -2px rgba(0,0,0,0.1)'
          }}
        >
          {/* Metallic oval tongue shape inside */}
          <div
            className={`w-20 h-20 rounded-full border-4 flex flex-col items-center justify-center transition-all ${
              isPressed
                ? 'border-emerald-700 bg-emerald-700 scale-95'
                : 'border-emerald-300/60 bg-emerald-400/30'
            }`}
          >
            <span className="text-xs font-semibold tracking-wider uppercase text-emerald-50">CLICK</span>
            <span className="text-xl font-black text-white">{clickCount}</span>
          </div>
        </button>

        <p className="mt-3 text-xs text-stone-500 text-center font-medium">
          {isPressed ? (
            <span className="text-emerald-600 font-semibold animate-pulse">CLIK-CLAK! Premio in arrivo!</span>
          ) : (
            'Tocca per emettere il segnale sonoro'
          )}
        </p>

        {lastClickTime && (
          <div className="mt-2 text-[11px] text-stone-400">
            Ultimo click: <span className="font-mono text-stone-600">{lastClickTime}</span>
          </div>
        )}
      </div>

      {/* Quick Trainer Rule Reminder */}
      <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600">
        <span className="text-stone-500">Regola:</span>
        <span className="font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
          Click esatto = Premio entro 1-2 sec
        </span>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import {
  Timer,
  Award,
  Workflow,
  Layers,
  HeartHandshake,
  BatteryCharging,
  ChevronDown,
  Sparkles,
  HelpCircle,
  Lightbulb,
} from 'lucide-react';
import { TechniqueGuide } from '../types';

interface TechniqueCardProps {
  technique: TechniqueGuide;
  onOpenClicker?: () => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Timer,
  Award,
  Workflow,
  Layers,
  HeartHandshake,
  BatteryCharging,
};

export const TechniqueCard: React.FC<TechniqueCardProps> = ({ technique, onOpenClicker }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const IconComponent = ICON_MAP[technique.iconName] || HelpCircle;

  return (
    <div
      id={`technique-card-${technique.id}`}
      className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden transition-all duration-200"
    >
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <IconComponent className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full inline-block mb-1">
                {technique.tag}
              </span>
              <h3 className="font-bold text-stone-900 text-base leading-tight">
                {technique.title}
              </h3>
            </div>
          </div>
        </div>

        <p className="text-xs font-medium text-stone-500 mb-3">{technique.subtitle}</p>

        {/* Summary */}
        <p className="text-xs text-stone-700 leading-relaxed mb-3">
          {technique.summary}
        </p>

        {/* Core rule banner */}
        <div className="bg-stone-50 border-l-3 border-emerald-500 p-3 rounded-r-xl text-xs text-stone-800 font-medium">
          <span className="font-bold text-emerald-800 block text-[11px] uppercase tracking-wider mb-0.5">
            Regola Fondamentale:
          </span>
          {technique.coreRule}
        </div>

        {/* Optional action if marker technique */}
        {technique.id === 'marker-timing' && onOpenClicker && (
          <div className="mt-3">
            <button
              type="button"
              id="try-clicker-from-technique"
              onClick={onOpenClicker}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl text-xs font-semibold border border-emerald-200/80 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-emerald-600" />
              Apri e prova il Clicker interattivo
            </button>
          </div>
        )}
      </div>

      {/* Expandable Details */}
      <div className="border-t border-stone-100 bg-stone-50/50">
        <button
          type="button"
          id={`toggle-expand-${technique.id}`}
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full py-2.5 px-4 text-xs font-semibold text-stone-600 hover:text-stone-900 flex items-center justify-between transition-colors"
        >
          <span>{isExpanded ? 'Nascondi approfondimento' : 'Mostra dettagli & esempio pratico'}</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              isExpanded ? 'rotate-180' : ''
            }`}
          />
        </button>

        {isExpanded && (
          <div className="p-4 pt-1 sm:p-5 sm:pt-2 space-y-4 border-t border-stone-100 bg-white">
            <div className="space-y-3">
              {technique.bulletPoints.map((bp, idx) => (
                <div key={idx} className="bg-stone-50 rounded-xl p-3 border border-stone-100 text-xs">
                  <h4 className="font-bold text-stone-900 mb-1">{bp.title}</h4>
                  <p className="text-stone-600 leading-relaxed">{bp.desc}</p>
                </div>
              ))}
            </div>

            {/* Practical Example */}
            <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/70 flex items-start gap-2.5 text-xs text-amber-950">
              <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-amber-900 block mb-0.5">Esempio Pratico:</span>
                <p className="leading-relaxed">{technique.practicalExample}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

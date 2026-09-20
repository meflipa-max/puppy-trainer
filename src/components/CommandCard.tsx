import React from 'react';
import {
  ArrowDownToLine,
  ChevronDown,
  ShieldAlert,
  Compass,
  Sparkles,
  Eye,
  Footprints,
  Home,
  CheckCircle2,
  ChevronRight,
  PlusCircle,
  HelpCircle
} from 'lucide-react';
import { CommandGuide, TrainingSession } from '../types';

interface CommandCardProps {
  command: CommandGuide;
  sessions: TrainingSession[];
  onSelect: (command: CommandGuide) => void;
  onQuickLog: (command: CommandGuide) => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  ArrowDownToLine,
  ChevronDown,
  ShieldAlert,
  Compass,
  Sparkles,
  Eye,
  Footprints,
  Home,
};

export const CommandCard: React.FC<CommandCardProps> = ({
  command,
  sessions,
  onSelect,
  onQuickLog,
}) => {
  const IconComponent = ICON_MAP[command.iconName] || HelpCircle;

  const commandSessions = sessions.filter(
    (s) => s.commandId === command.id || s.commandName.toLowerCase().includes(command.name.toLowerCase())
  );

  const sessionCount = commandSessions.length;
  const avgRating =
    sessionCount > 0
      ? (commandSessions.reduce((acc, s) => acc + s.rating, 0) / sessionCount).toFixed(1)
      : null;

  const isMastered = sessionCount >= 3 && avgRating !== null && parseFloat(avgRating) >= 4.2;
  const isInProgress = sessionCount > 0 && !isMastered;

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'Principiante':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Intermedio':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Avanzato':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-stone-50 text-stone-700 border-stone-200';
    }
  };

  return (
    <div
      id={`command-card-${command.id}`}
      className="bg-white rounded-2xl border border-stone-200 p-4 transition-all duration-200 hover:border-emerald-300 hover:shadow-sm flex flex-col justify-between"
    >
      <div>
        {/* Header row */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <IconComponent className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="font-semibold text-stone-900 text-base leading-tight">
                  {command.name}
                </h3>
                <span className="text-xs text-stone-400">({command.translation})</span>
              </div>
              <p className="text-xs text-stone-500 font-medium">{command.category}</p>
            </div>
          </div>

          <span
            className={`text-[11px] font-medium px-2 py-0.5 rounded-full border shrink-0 ${getDifficultyBadge(
              command.difficulty
            )}`}
          >
            {command.difficulty}
          </span>
        </div>

        {/* Short description */}
        <p className="text-xs text-stone-600 line-clamp-2 mt-1 mb-3">
          {command.shortDesc}
        </p>

        {/* Quick Cues Pill */}
        <div className="bg-stone-50 rounded-xl p-2.5 space-y-1 text-xs text-stone-600 border border-stone-100 mb-3">
          <div className="flex items-baseline gap-1.5">
            <span className="font-semibold text-stone-700 shrink-0">Voce:</span>
            <span className="text-stone-800 font-mono text-[11px] truncate">{command.vocalCue}</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-semibold text-stone-700 shrink-0">Gesto:</span>
            <span className="text-stone-700 truncate text-[11px]">{command.handSignal}</span>
          </div>
        </div>
      </div>

      {/* Bottom stats & action buttons */}
      <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1 text-xs">
          {isMastered ? (
            <span className="inline-flex items-center gap-1 text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-md">
              <CheckCircle2 className="w-3.5 h-3.5" /> Padroneggiato
            </span>
          ) : isInProgress ? (
            <span className="inline-flex items-center gap-1 text-amber-700 font-medium bg-amber-50 px-2 py-0.5 rounded-md">
              {sessionCount} {sessionCount === 1 ? 'sessione' : 'sessioni'} ({avgRating}★)
            </span>
          ) : (
            <span className="text-stone-400 text-[11px]">Da iniziare</span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            id={`quick-log-${command.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onQuickLog(command);
            }}
            className="p-1.5 rounded-lg text-emerald-700 hover:bg-emerald-50 active:bg-emerald-100 transition-colors"
            title="Registra sessione per questo comando"
          >
            <PlusCircle className="w-5 h-5" />
          </button>

          <button
            type="button"
            id={`view-details-${command.id}`}
            onClick={() => onSelect(command)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1.5 rounded-lg transition-colors"
          >
            Guida
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

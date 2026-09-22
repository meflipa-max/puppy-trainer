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
  Bell,
  HandMetal,
  Hand,
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
  Bell,
  HandMetal,
  Hand,
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
      className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 transition-all duration-200 hover:border-emerald-300 hover:shadow-sm flex flex-col justify-between gap-3"
    >
      <div>
        {/* Top category & difficulty meta row */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
            {command.category}
          </span>
          <span
            className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border whitespace-nowrap shrink-0 ${getDifficultyBadge(
              command.difficulty
            )}`}
          >
            {command.difficulty}
          </span>
        </div>

        {/* Command Title & Icon */}
        <div className="flex items-start gap-3 mb-2.5">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
            <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-stone-900 text-base sm:text-lg leading-snug">
              {command.name}
            </h3>
            <span className="text-xs text-stone-500 block font-normal">
              {command.translation}
            </span>
          </div>
        </div>

        {/* Short description */}
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-3">
          {command.shortDesc}
        </p>

        {/* Quick Cues Box */}
        <div className="bg-stone-50 rounded-xl p-3 space-y-1.5 text-xs text-stone-700 border border-stone-100/80 mb-1">
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-1">
            <span className="font-bold text-stone-800 shrink-0 text-[11px] uppercase tracking-wider">Voce:</span>
            <span className="text-stone-900 font-mono text-[11px] sm:text-xs leading-relaxed break-words">{command.vocalCue}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-1">
            <span className="font-bold text-stone-800 shrink-0 text-[11px] uppercase tracking-wider">Gesto:</span>
            <span className="text-stone-700 text-[11px] sm:text-xs leading-relaxed break-words">{command.handSignal}</span>
          </div>
        </div>
      </div>

      {/* Bottom stats & action buttons */}
      <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2 mt-auto">
        <div className="flex items-center gap-1.5 text-xs min-w-0">
          {isMastered ? (
            <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-50 px-2 py-1 rounded-md text-[11px] sm:text-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Padroneggiato
            </span>
          ) : isInProgress ? (
            <span className="inline-flex items-center gap-1 text-amber-800 font-medium bg-amber-50 px-2 py-1 rounded-md text-[11px] sm:text-xs">
              {sessionCount} {sessionCount === 1 ? 'sessione' : 'sessioni'} ({avgRating}★)
            </span>
          ) : (
            <span className="text-stone-400 font-medium text-xs">Da iniziare</span>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            id={`quick-log-${command.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onQuickLog(command);
            }}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-emerald-700 bg-emerald-50/80 hover:bg-emerald-100 active:bg-emerald-200 text-xs font-semibold transition-colors"
            title="Registra sessione per questo comando"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Allena</span>
          </button>

          <button
            type="button"
            id={`view-details-${command.id}`}
            onClick={() => onSelect(command)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 active:bg-emerald-200 px-3 py-1.5 rounded-lg transition-colors shadow-2xs"
          >
            Guida
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

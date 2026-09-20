import React from 'react';
import {
  X,
  AlertTriangle,
  Lightbulb,
  Mic,
  Hand,
  CheckCircle2,
  PlusCircle,
  HelpCircle,
  ArrowDownToLine,
  ChevronDown,
  ShieldAlert,
  Compass,
  Sparkles,
  Eye,
  Footprints,
  Home,
} from 'lucide-react';
import { CommandGuide, TrainingSession } from '../types';

interface CommandDetailModalProps {
  command: CommandGuide | null;
  sessions: TrainingSession[];
  onClose: () => void;
  onLogSession: (command: CommandGuide) => void;
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

export const CommandDetailModal: React.FC<CommandDetailModalProps> = ({
  command,
  sessions,
  onClose,
  onLogSession,
}) => {
  if (!command) return null;

  const IconComponent = ICON_MAP[command.iconName] || HelpCircle;
  const commandSessions = sessions.filter(
    (s) => s.commandId === command.id || s.commandName.toLowerCase().includes(command.name.toLowerCase())
  );

  return (
    <div
      id="command-detail-modal"
      className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl shadow-xl max-h-[90vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header */}
        <div className="p-4 sm:p-5 border-b border-stone-100 flex items-center justify-between shrink-0 bg-stone-50/80">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <IconComponent className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-stone-900">{command.name}</h2>
                <span className="text-xs text-stone-500 font-mono">({command.translation})</span>
              </div>
              <p className="text-xs text-stone-500">
                Difficoltà: <span className="font-semibold text-stone-700">{command.difficulty}</span> • Categoria: {command.category}
              </p>
            </div>
          </div>

          <button
            type="button"
            id="close-command-detail"
            onClick={onClose}
            className="p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          {/* Importance & why it matters */}
          <div className="bg-emerald-50/70 border border-emerald-100 rounded-2xl p-3.5 text-xs sm:text-sm text-emerald-950">
            <span className="font-semibold text-emerald-900 block mb-0.5">Perché è fondamentale:</span>
            {command.importance}
          </div>

          {/* Cues Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80">
              <div className="flex items-center gap-2 text-stone-700 font-semibold text-xs mb-1">
                <Mic className="w-4 h-4 text-emerald-600" />
                Segnale Vocale
              </div>
              <p className="text-xs text-stone-800 font-medium">{command.vocalCue}</p>
            </div>
            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80">
              <div className="flex items-center gap-2 text-stone-700 font-semibold text-xs mb-1">
                <Hand className="w-4 h-4 text-emerald-600" />
                Gesto della Mano
              </div>
              <p className="text-xs text-stone-800">{command.handSignal}</p>
            </div>
          </div>

          {/* Steps */}
          <div>
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Procedura Passo per Passo
            </h3>
            <div className="space-y-3">
              {command.steps.map((step) => (
                <div key={step.number} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    {step.number}
                  </div>
                  <div className="bg-stone-50 rounded-xl p-3 border border-stone-100 flex-1">
                    <h4 className="text-xs font-bold text-stone-900 mb-1">{step.title}</h4>
                    <p className="text-xs text-stone-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Common Mistakes */}
          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider mb-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              Errori Comuni da Evitare
            </div>
            <ul className="space-y-1.5">
              {command.commonMistakes.map((mistake, idx) => (
                <li key={idx} className="text-xs text-amber-950 flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pro Trainer Tip */}
          <div className="p-4 rounded-2xl bg-emerald-900 text-white flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-amber-200 block mb-0.5">Consiglio dell'Educatore:</span>
              <p className="text-emerald-50 leading-relaxed">{command.trainerTip}</p>
            </div>
          </div>

          {/* Past History with this Command */}
          {commandSessions.length > 0 && (
            <div className="pt-2 border-t border-stone-100">
              <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                Sessioni Registrate ({commandSessions.length})
              </h4>
              <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                {commandSessions.slice(0, 3).map((sess) => (
                  <div key={sess.id} className="p-2 rounded-lg bg-stone-50 text-xs flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-stone-800">{sess.date}</span>
                      <span className="text-stone-500 ml-2">({sess.durationMinutes} min)</span>
                    </div>
                    <div className="flex items-center text-amber-500 font-bold">
                      {'★'.repeat(sess.rating)}
                      <span className="text-stone-300">{'★'.repeat(5 - sess.rating)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 text-xs font-medium hover:bg-stone-100 transition-colors"
          >
            Chiudi
          </button>

          <button
            type="button"
            id={`log-session-from-modal-${command.id}`}
            onClick={() => {
              onClose();
              onLogSession(command);
            }}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            Registra Sessione Ora
          </button>
        </div>
      </div>
    </div>
  );
};

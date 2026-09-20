import React, { useState, useEffect } from 'react';
import {
  X,
  Star,
  Clock,
  Play,
  Pause,
  RotateCcw,
  Check,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { CommandGuide, TrainingSession, SessionRating, DistractionLevel, PuppyMood } from '../types';
import { BASIC_COMMANDS } from '../data/trainingData';

interface NewSessionModalProps {
  isOpen: boolean;
  preselectedCommand?: CommandGuide | null;
  onClose: () => void;
  onSave: (session: Omit<TrainingSession, 'id'>) => void;
}

export const NewSessionModal: React.FC<NewSessionModalProps> = ({
  isOpen,
  preselectedCommand,
  onClose,
  onSave,
}) => {
  const [selectedCommandId, setSelectedCommandId] = useState<string>('nome');
  const [customCommandName, setCustomCommandName] = useState<string>('');
  const [isCustomCommand, setIsCustomCommand] = useState<boolean>(false);

  const [date, setDate] = useState<string>(() => new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState<string>(() => {
    const d = new Date();
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  });

  const [durationMinutes, setDurationMinutes] = useState<number>(4);
  const [rating, setRating] = useState<SessionRating>(4);
  const [distractionLevel, setDistractionLevel] = useState<DistractionLevel>('bassa');
  const [puppyMood, setPuppyMood] = useState<PuppyMood>('attento');
  const [treatUsed, setTreatUsed] = useState<string>('Crocchette & biscottini');
  const [notes, setNotes] = useState<string>('');

  // Live Timer states
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);

  // Sync with preselected command if provided
  useEffect(() => {
    if (preselectedCommand) {
      setSelectedCommandId(preselectedCommand.id);
      setIsCustomCommand(false);
    }
  }, [preselectedCommand]);

  // Timer interval
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning]);

  if (!isOpen) return null;

  const handleStopAndUseTimer = () => {
    setIsTimerRunning(false);
    const minutes = Math.max(1, Math.round(timerSeconds / 60));
    setDurationMinutes(minutes);
  };

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let cmdName = '';
    if (isCustomCommand) {
      cmdName = customCommandName.trim() || 'Comando Personalizzato';
    } else {
      const found = BASIC_COMMANDS.find((c) => c.id === selectedCommandId);
      cmdName = found ? found.name : 'Comando';
    }

    onSave({
      date,
      time,
      commandId: isCustomCommand ? 'custom' : selectedCommandId,
      commandName: cmdName,
      durationMinutes: Math.max(1, durationMinutes),
      rating,
      distractionLevel,
      puppyMood,
      treatUsed,
      notes: notes.trim(),
    });

    // Reset timer
    setTimerSeconds(0);
    setIsTimerRunning(false);
    onClose();
  };

  const getRatingLabel = (r: SessionRating) => {
    switch (r) {
      case 1:
        return '1/5 - Molto distratto / Difficile';
      case 2:
        return '2/5 - Pochi successi, da riprovare';
      case 3:
        return '3/5 - Buono, sta imparando';
      case 4:
        return '4/5 - Ottimo, molte risposte corrette';
      case 5:
        return '5/5 - Perfetto! Esecuzione impeccabile';
    }
  };

  return (
    <div
      id="new-session-modal"
      className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[92vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-100 flex items-center justify-between bg-stone-50/80 shrink-0">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-stone-900">
              Registra Sessione di Addestramento
            </h2>
            <p className="text-xs text-stone-500">
              Annota i progressi e le risposte del cucciolo
            </p>
          </div>
          <button
            type="button"
            id="close-session-modal"
            onClick={onClose}
            className="p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 overflow-y-auto space-y-5">
          {/* Command Selector */}
          <div>
            <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1.5">
              Comando o Abilità Praticata
            </label>
            <div className="flex gap-2 mb-2">
              <button
                type="button"
                onClick={() => setIsCustomCommand(false)}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-colors ${
                  !isCustomCommand
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                Comando Base Guida
              </button>
              <button
                type="button"
                onClick={() => setIsCustomCommand(true)}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-colors ${
                  isCustomCommand
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                Altro / Personalizzato
              </button>
            </div>

            {!isCustomCommand ? (
              <select
                id="select-command-dropdown"
                value={selectedCommandId}
                onChange={(e) => setSelectedCommandId(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl py-2.5 px-3 text-xs font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {BASIC_COMMANDS.map((cmd) => (
                  <option key={cmd.id} value={cmd.id}>
                    {cmd.name} ({cmd.translation}) - {cmd.difficulty}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                id="input-custom-command"
                value={customCommandName}
                onChange={(e) => setCustomCommandName(e.target.value)}
                placeholder="Es. Dare la zampa, Rotola, Tocca con il naso..."
                className="w-full bg-stone-50 border border-stone-200 rounded-xl py-2.5 px-3 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required={isCustomCommand}
              />
            )}
          </div>

          {/* Interactive Stopwatch or manual duration */}
          <div className="bg-stone-50 rounded-2xl p-3.5 border border-stone-200/80">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-600" />
                Durata Sessione (Raccomandati 3-5 min)
              </span>
              {timerSeconds > 0 && (
                <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded">
                  {formatTimer(timerSeconds)}
                </span>
              )}
            </div>

            {/* Quick stopwatch controller */}
            <div className="flex items-center gap-2 mb-3">
              {!isTimerRunning ? (
                <button
                  type="button"
                  id="start-live-timer"
                  onClick={() => setIsTimerRunning(true)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 bg-emerald-100/70 hover:bg-emerald-100 text-emerald-800 rounded-lg text-xs font-semibold transition-colors"
                >
                  <Play className="w-3.5 h-3.5 fill-emerald-800" />
                  {timerSeconds > 0 ? 'Riprendi Cronometro' : 'Cronometra Sessione Ora'}
                </button>
              ) : (
                <button
                  type="button"
                  id="pause-live-timer"
                  onClick={handleStopAndUseTimer}
                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-lg text-xs font-semibold transition-colors"
                >
                  <Pause className="w-3.5 h-3.5 fill-amber-900" />
                  Ferma e Imposta Minuti
                </button>
              )}

              {timerSeconds > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setIsTimerRunning(false);
                    setTimerSeconds(0);
                  }}
                  className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg"
                  title="Azzera cronometro"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick duration presets */}
            <div className="flex items-center gap-2">
              {[2, 3, 5, 8, 10].map((mins) => (
                <button
                  key={mins}
                  type="button"
                  onClick={() => setDurationMinutes(mins)}
                  className={`flex-1 py-1.5 text-xs rounded-lg font-semibold transition-colors ${
                    durationMinutes === mins
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  {mins}m
                </button>
              ))}
            </div>
          </div>

          {/* Rating Stars */}
          <div>
            <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1.5">
              Valutazione Risultato Cucciolo
            </label>
            <div className="flex items-center gap-2 mb-1.5">
              {([1, 2, 3, 4, 5] as SessionRating[]).map((star) => (
                <button
                  key={star}
                  type="button"
                  id={`rating-star-${star}`}
                  onClick={() => setRating(star)}
                  className="p-1.5 rounded-lg hover:bg-stone-100 transition-transform active:scale-95"
                >
                  <Star
                    className={`w-7 h-7 ${
                      star <= rating
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-stone-200 stroke-stone-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg inline-block">
              {getRatingLabel(rating)}
            </p>
          </div>

          {/* Distraction & Mood Two-Column */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Distraction */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Distrazione Ambientale
              </label>
              <select
                id="select-distraction"
                value={distractionLevel}
                onChange={(e) => setDistractionLevel(e.target.value as DistractionLevel)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl py-2 px-3 text-xs text-stone-800"
              >
                <option value="bassa">Bassa (In casa tranquilla)</option>
                <option value="media">Media (Giardino / Rumori lievi)</option>
                <option value="alta">Alta (Parco / Altri cani / Strada)</option>
              </select>
            </div>

            {/* Mood */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Stato del Cucciolo
              </label>
              <select
                id="select-puppy-mood"
                value={puppyMood}
                onChange={(e) => setPuppyMood(e.target.value as PuppyMood)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl py-2 px-3 text-xs text-stone-800"
              >
                <option value="attento">Attento & Focalizzato</option>
                <option value="gioioso">Molto Giocherellone</option>
                <option value="distratto">Un po' distratto</option>
                <option value="stanco">Stanco / Disattento</option>
              </select>
            </div>
          </div>

          {/* Treat Used */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Ricompensa / Premio Utilizzato
            </label>
            <input
              type="text"
              id="input-treat-used"
              value={treatUsed}
              onChange={(e) => setTreatUsed(e.target.value)}
              placeholder="Es. Pezzetti di parmigiano, tacchino, pallina preferita..."
              className="w-full bg-stone-50 border border-stone-200 rounded-xl py-2 px-3 text-xs text-stone-800"
            />
          </div>

          {/* Notes & Observations */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Note, Osservazioni e Reazioni
            </label>
            <textarea
              id="textarea-session-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Cosa ha funzionato bene? Ha risposto subito al marker? Ha avuto difficoltà con la distanza?"
              className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-3 pt-1 border-t border-stone-100">
            <div>
              <label className="block text-[11px] font-semibold text-stone-500 mb-1">Data</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl py-1.5 px-2.5 text-xs text-stone-800"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-stone-500 mb-1">Orario</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl py-1.5 px-2.5 text-xs text-stone-800"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="pt-2 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 text-xs font-medium hover:bg-stone-100 transition-colors"
            >
              Annulla
            </button>
            <button
              type="submit"
              id="save-session-btn"
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <Check className="w-4 h-4" />
              Salva Nel Diario
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

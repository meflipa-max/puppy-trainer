import React, { useState, useMemo } from 'react';
import {
  Calendar,
  Flame,
  Award,
  Clock,
  Plus,
  Trash2,
  Filter,
  CheckCircle2,
  TrendingUp,
  Search,
  Sparkles,
  Smile,
  AlertTriangle,
  RotateCcw,
  Dog,
} from 'lucide-react';
import { TrainingSession, CommandGuide, PuppyProfile } from '../types';
import { BASIC_COMMANDS } from '../data/trainingData';
import { calculatePuppyAge } from '../utils/puppyAge';

interface ProgressSectionProps {
  puppy?: PuppyProfile;
  sessions: TrainingSession[];
  onOpenNewSession: (command?: CommandGuide | null) => void;
  onDeleteSession: (sessionId: string) => void;
  onResetToDemoData: () => void;
}

export const ProgressSection: React.FC<ProgressSectionProps> = ({
  puppy,
  sessions,
  onOpenNewSession,
  onDeleteSession,
  onResetToDemoData,
}) => {
  const [filterCommand, setFilterCommand] = useState<string>('all');
  const [searchNotes, setSearchNotes] = useState<string>('');

  const currentPuppyAge = useMemo(() => {
    return calculatePuppyAge(puppy?.birthDate);
  }, [puppy?.birthDate]);

  // 1. Calculate Daily Streak (consecutive days ending today or yesterday)
  const streak = useMemo(() => {
    if (sessions.length === 0) return 0;

    const uniqueDates = Array.from(new Set(sessions.map((s) => s.date))).sort().reverse();
    if (uniqueDates.length === 0) return 0;

    const todayStr = new Date().toISOString().split('T')[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    // Check if the most recent session is today or yesterday
    const latestDate = uniqueDates[0];
    if (latestDate !== todayStr && latestDate !== yesterdayStr) {
      return 0;
    }

    let count = 1;
    let currentDate = new Date(latestDate);

    for (let i = 1; i < uniqueDates.length; i++) {
      const prevExpected = new Date(currentDate);
      prevExpected.setDate(prevExpected.getDate() - 1);
      const prevExpectedStr = prevExpected.toISOString().split('T')[0];

      if (uniqueDates[i] === prevExpectedStr) {
        count++;
        currentDate = prevExpected;
      } else {
        break;
      }
    }

    return count;
  }, [sessions]);

  // 2. Aggregate stats
  const totalMinutes = useMemo(() => {
    return sessions.reduce((acc, s) => acc + (s.durationMinutes || 0), 0);
  }, [sessions]);

  const totalSessions = sessions.length;

  // Command mastery status
  const commandStats = useMemo(() => {
    return BASIC_COMMANDS.map((cmd) => {
      const cmdSessions = sessions.filter(
        (s) => s.commandId === cmd.id || s.commandName.toLowerCase().includes(cmd.name.toLowerCase())
      );
      const count = cmdSessions.length;
      const avg =
        count > 0
          ? cmdSessions.reduce((acc, s) => acc + s.rating, 0) / count
          : 0;

      // Status logic:
      // Mastered if >= 3 sessions and avg >= 4.0
      // In progress if >= 1 session
      // Not started if 0
      let status: 'mastered' | 'in_progress' | 'not_started' = 'not_started';
      if (count >= 3 && avg >= 4.0) {
        status = 'mastered';
      } else if (count > 0) {
        status = 'in_progress';
      }

      return {
        ...cmd,
        sessionCount: count,
        avgRating: avg.toFixed(1),
        status,
        percentage: Math.min(100, Math.round((count / 4) * 100)),
      };
    });
  }, [sessions]);

  const masteredCount = commandStats.filter((c) => c.status === 'mastered').length;

  // Filtered sessions history
  const filteredSessions = useMemo(() => {
    return [...sessions]
      .filter((s) => {
        const matchesCmd = filterCommand === 'all' || s.commandId === filterCommand;
        const matchesSearch =
          !searchNotes ||
          s.notes.toLowerCase().includes(searchNotes.toLowerCase()) ||
          s.commandName.toLowerCase().includes(searchNotes.toLowerCase()) ||
          (s.treatUsed && s.treatUsed.toLowerCase().includes(searchNotes.toLowerCase()));
        return matchesCmd && matchesSearch;
      })
      .sort((a, b) => {
        // Sort newest first by date then time
        const dateA = `${a.date}T${a.time || '00:00'}`;
        const dateB = `${b.date}T${b.time || '00:00'}`;
        return dateB.localeCompare(dateA);
      });
  }, [sessions, filterCommand, searchNotes]);

  const getMoodBadge = (mood: string) => {
    switch (mood) {
      case 'attento':
        return { label: 'Attento', color: 'bg-emerald-50 text-emerald-700' };
      case 'gioioso':
        return { label: 'Gioioso', color: 'bg-blue-50 text-blue-700' };
      case 'distratto':
        return { label: 'Distratto', color: 'bg-amber-50 text-amber-700' };
      case 'stanco':
        return { label: 'Stanco', color: 'bg-stone-100 text-stone-600' };
      default:
        return { label: mood, color: 'bg-stone-50 text-stone-700' };
    }
  };

  const getDistractionBadge = (dist: string) => {
    switch (dist) {
      case 'bassa':
        return { label: 'Distr. Bassa (Casa)', color: 'text-emerald-700' };
      case 'media':
        return { label: 'Distr. Media (Giardino)', color: 'text-amber-700' };
      case 'alta':
        return { label: 'Distr. Alta (Parco/Cani)', color: 'text-rose-700' };
      default:
        return { label: dist, color: 'text-stone-600' };
    }
  };

  return (
    <div id="progress-section" className="space-y-4 pb-20">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-stone-900 via-stone-800 to-emerald-950 rounded-3xl p-5 text-white shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-900/60 px-2.5 py-0.5 rounded-full">
              Diario di Bordo
            </span>
          </div>
          <button
            type="button"
            id="open-new-session-banner-btn"
            onClick={() => onOpenNewSession(null)}
            className="inline-flex items-center gap-1.5 text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-white px-3.5 py-1.5 rounded-xl shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            Nuova Sessione
          </button>
        </div>

        <h1 className="text-xl font-black tracking-tight mb-1">
          Tracciamento Progressi Giornalieri
        </h1>
        <p className="text-xs text-stone-300 max-w-md">
          La costanza quotidiana crea abitudini durature nel tuo cucciolo. Guarda le tue statistiche e registra ogni piccolo traguardo.
        </p>

        {/* Dynamic age & puppy developmental milestone pill */}
        {currentPuppyAge && (
          <div className="mt-3.5 p-3 rounded-2xl bg-white/10 border border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 overflow-hidden border border-white/20 shadow-2xs">
                {puppy?.photoUrl ? (
                  <img
                    src={puppy.photoUrl}
                    alt={puppy.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <Dog className="w-4 h-4 text-emerald-300" />
                )}
              </div>
              <span className="font-semibold text-stone-200">
                {puppy?.name || 'Il cucciolo'} oggi ha: <strong className="text-white font-bold">{currentPuppyAge.formattedAge}</strong>
              </span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                {currentPuppyAge.stageName}
              </span>
            </div>
          </div>
        )}

        {/* 4 Key Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4">
          <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-3 border border-white/10">
            <div className="flex items-center justify-between text-amber-400 mb-1">
              <span className="text-[11px] font-semibold text-stone-300">Streak Giornaliero</span>
              <Flame className="w-4 h-4 fill-amber-400 text-amber-400" />
            </div>
            <div className="text-xl font-black text-white">
              {streak} <span className="text-xs font-normal text-stone-300">giorni</span>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-3 border border-white/10">
            <div className="flex items-center justify-between text-emerald-400 mb-1">
              <span className="text-[11px] font-semibold text-stone-300">Sessioni Totali</span>
              <Calendar className="w-4 h-4" />
            </div>
            <div className="text-xl font-black text-white">{totalSessions}</div>
          </div>

          <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-3 border border-white/10">
            <div className="flex items-center justify-between text-teal-400 mb-1">
              <span className="text-[11px] font-semibold text-stone-300">Minuti Dedicati</span>
              <Clock className="w-4 h-4" />
            </div>
            <div className="text-xl font-black text-white">
              {totalMinutes} <span className="text-xs font-normal text-stone-300">min</span>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-3 border border-white/10">
            <div className="flex items-center justify-between text-sky-400 mb-1">
              <span className="text-[11px] font-semibold text-stone-300">Padroneggiati</span>
              <Award className="w-4 h-4" />
            </div>
            <div className="text-xl font-black text-white">
              {masteredCount} <span className="text-xs font-normal text-stone-300">/ {BASIC_COMMANDS.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Command Mastery Matrix (Visual status) */}
      <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <h2 className="text-sm font-bold text-stone-900">
              Mappa di Padronanza dei Comandi
            </h2>
          </div>
          <span className="text-xs text-stone-500 font-medium">
            {masteredCount} su {BASIC_COMMANDS.length} consolidati
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {commandStats.map((cmd) => (
            <div
              key={cmd.id}
              className="p-2.5 rounded-xl border border-stone-100 bg-stone-50 flex items-center justify-between gap-3"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-xs text-stone-800 truncate">
                    {cmd.name}
                  </span>
                  <span className="text-[10px] text-stone-400">({cmd.translation})</span>
                </div>
                <div className="flex items-center gap-2 mt-0.5 text-[11px] text-stone-500">
                  <span>{cmd.sessionCount} sessioni</span>
                  {cmd.sessionCount > 0 && <span>• Media {cmd.avgRating}★</span>}
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                {cmd.status === 'mastered' ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                    <CheckCircle2 className="w-3 h-3" /> Padroneggiato
                  </span>
                ) : cmd.status === 'in_progress' ? (
                  <span className="text-[11px] font-semibold text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded-md">
                    In progresso
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => onOpenNewSession(cmd)}
                    className="text-[11px] font-semibold text-stone-500 hover:text-emerald-700 bg-stone-200/60 hover:bg-emerald-50 px-2 py-0.5 rounded-md transition-colors"
                  >
                    + Inizia
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* History of Training Sessions */}
      <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-xs">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-600" />
            <h2 className="text-sm font-bold text-stone-900">
              Storico Sessioni ({filteredSessions.length})
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {/* Command Filter */}
            <select
              id="filter-sessions-command"
              value={filterCommand}
              onChange={(e) => setFilterCommand(e.target.value)}
              className="bg-stone-50 border border-stone-200 rounded-lg py-1 px-2 text-xs text-stone-700 focus:outline-none"
            >
              <option value="all">Tutti i comandi</option>
              {BASIC_COMMANDS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
              <option value="custom">Comandi personalizzati</option>
            </select>
          </div>
        </div>

        {/* Search inside notes */}
        <div className="relative mb-3">
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchNotes}
            onChange={(e) => setSearchNotes(e.target.value)}
            placeholder="Cerca nelle note, premi usati o comandi..."
            className="w-full bg-stone-50 border border-stone-200 rounded-xl py-1.5 pl-8 pr-3 text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        {/* Sessions list */}
        {filteredSessions.length > 0 ? (
          <div className="space-y-2.5">
            {filteredSessions.map((session) => {
              const mood = getMoodBadge(session.puppyMood);
              const distraction = getDistractionBadge(session.distractionLevel);
              const sessionAge = puppy?.birthDate ? calculatePuppyAge(puppy.birthDate, session.date) : null;

              return (
                <div
                  key={session.id}
                  id={`session-log-${session.id}`}
                  className="p-3 sm:p-3.5 rounded-xl border border-stone-200/90 hover:border-emerald-200 bg-stone-50/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-xs sm:text-sm text-stone-900">
                          {session.commandName}
                        </span>
                        <span className="text-[11px] text-stone-400">
                          {session.date} {session.time ? `alle ${session.time}` : ''}
                        </span>
                        {sessionAge && sessionAge.daysTotal >= 0 && (
                          <span
                            className="text-[10px] font-semibold text-stone-600 bg-stone-100 px-2 py-0.5 rounded-md border border-stone-200/60"
                            title={`Addestrato all'età di ${sessionAge.daysTotal} giorni`}
                          >
                            a {sessionAge.formattedAge}
                          </span>
                        )}
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.2 rounded-md">
                          {session.durationMinutes} min
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <div className="flex items-center text-amber-500 font-bold text-xs" title={`Valutazione: ${session.rating}/5`}>
                        {'★'.repeat(session.rating)}
                        <span className="text-stone-300">{'★'.repeat(5 - session.rating)}</span>
                      </div>

                      <button
                        type="button"
                        id={`delete-session-${session.id}`}
                        onClick={() => {
                          if (confirm(`Eliminare la sessione di "${session.commandName}" del ${session.date}?`)) {
                            onDeleteSession(session.id);
                          }
                        }}
                        className="p-1 text-stone-400 hover:text-rose-600 rounded-lg transition-colors"
                        title="Elimina sessione"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Badges for mood, distraction & treat */}
                  <div className="flex items-center gap-1.5 flex-wrap text-[11px] mb-2">
                    <span className={`px-2 py-0.5 rounded-full font-medium ${mood.color}`}>
                      {mood.label}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full font-medium bg-stone-100 ${distraction.color}`}>
                      {distraction.label}
                    </span>
                    {session.treatUsed && (
                      <span className="px-2 py-0.5 rounded-full font-medium bg-amber-50 text-amber-800">
                        Premio: {session.treatUsed}
                      </span>
                    )}
                  </div>

                  {/* Notes */}
                  {session.notes && (
                    <p className="text-xs text-stone-700 bg-white p-2.5 rounded-lg border border-stone-200/60 leading-relaxed">
                      "{session.notes}"
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 bg-stone-50 rounded-xl border border-dashed border-stone-200">
            <Clock className="w-8 h-8 text-stone-300 mx-auto mb-2" />
            <p className="text-xs font-semibold text-stone-700">Nessuna sessione trovata</p>
            <p className="text-[11px] text-stone-400 mt-0.5">
              Registra il tuo primo allenamento per iniziare a tracciare i progressi!
            </p>
            <button
              type="button"
              onClick={() => onOpenNewSession(null)}
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Aggiungi Sessione Ora
            </button>
          </div>
        )}

        {/* Demo data reset option */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
          <span>Dati salvati in locale nel tuo dispositivo</span>
          <button
            type="button"
            onClick={onResetToDemoData}
            className="flex items-center gap-1 text-[11px] text-stone-500 hover:text-stone-800 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Ripristina dati iniziali
          </button>
        </div>
      </div>
    </div>
  );
};

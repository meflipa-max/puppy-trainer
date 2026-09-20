import React, { useState } from 'react';
import {
  BookOpen,
  Sparkles,
  Search,
  Filter,
  CheckCircle,
  HelpCircle,
  SlidersHorizontal,
  HeartPulse,
  AlertTriangle,
  PhoneCall,
  ShieldAlert,
} from 'lucide-react';
import { CommandGuide, TechniqueGuide, TrainingSession, GuideSubSection, CommandDifficulty } from '../types';
import { BASIC_COMMANDS, POSITIVE_REINFORCEMENT_TECHNIQUES } from '../data/trainingData';
import { HEALTH_TOPICS } from '../data/healthData';
import { CommandCard } from './CommandCard';
import { CommandDetailModal } from './CommandDetailModal';
import { TechniqueCard } from './TechniqueCard';
import { ClickerWidget } from './ClickerWidget';
import { HealthTopicCard } from './HealthTopicCard';

interface GuideSectionProps {
  sessions: TrainingSession[];
  onLogCommandSession: (command: CommandGuide) => void;
  activeSubTab?: GuideSubSection;
  onSubTabChange?: (tab: GuideSubSection) => void;
}

export const GuideSection: React.FC<GuideSectionProps> = ({
  sessions,
  onLogCommandSession,
  activeSubTab: externalSubTab,
  onSubTabChange,
}) => {
  const [internalSubTab, setInternalSubTab] = useState<GuideSubSection>('comandi');
  const activeSubTab = externalSubTab || internalSubTab;

  const handleSubTabChange = (tab: GuideSubSection) => {
    if (onSubTabChange) {
      onSubTabChange(tab);
    } else {
      setInternalSubTab(tab);
    }
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<'Tutti' | CommandDifficulty>('Tutti');
  const [healthCategoryFilter, setHealthCategoryFilter] = useState<'tutti' | 'vaccini' | 'sterilizzazione' | 'emergenza'>('tutti');
  const [selectedCommand, setSelectedCommand] = useState<CommandGuide | null>(null);
  const [showClickerEmbedded, setShowClickerEmbedded] = useState(false);

  // Filter commands
  const filteredCommands = BASIC_COMMANDS.filter((cmd) => {
    const matchesSearch =
      cmd.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cmd.translation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cmd.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cmd.vocalCue.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDifficulty =
      difficultyFilter === 'Tutti' || cmd.difficulty === difficultyFilter;

    return matchesSearch && matchesDifficulty;
  });

  // Filter techniques
  const filteredTechniques = POSITIVE_REINFORCEMENT_TECHNIQUES.filter((tech) => {
    return (
      tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.tag.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Filter health topics
  const filteredHealthTopics = HEALTH_TOPICS.filter((topic) => {
    const matchesSearch =
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (topic.whatCouldHappen &&
        (topic.whatCouldHappen.scenario.toLowerCase().includes(searchQuery.toLowerCase()) ||
          topic.whatCouldHappen.symptoms.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))));

    const matchesCategory =
      healthCategoryFilter === 'tutti' || topic.category === healthCategoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div id="guide-section" className="space-y-4 pb-20">
      {/* Hero card explaining puppy learning principles */}
      <div className="bg-gradient-to-br from-emerald-800 to-teal-900 rounded-3xl p-5 text-white shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-700/60 px-2.5 py-0.5 rounded-full">
            Manuale di Base
          </span>
          <button
            type="button"
            onClick={() => setShowClickerEmbedded(!showClickerEmbedded)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white/15 hover:bg-white/25 active:bg-white/30 text-white px-3 py-1.5 rounded-xl backdrop-blur-xs transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            {showClickerEmbedded ? 'Nascondi Clicker' : 'Usa Clicker'}
          </button>
        </div>
        <h1 className="text-xl font-black tracking-tight mb-1">
          Cose da sapere per il tuo Cucciolo
        </h1>
        <p className="text-xs text-emerald-100 leading-relaxed max-w-xl">
          I cuccioli imparano attraverso l'associazione positiva immediata e la coerenza. Esplora i comandi fondamentali e le tecniche scientifiche basate sulla ricompensa.
        </p>
      </div>

      {/* Embedded Clicker Widget (Toggled) */}
      {showClickerEmbedded && (
        <div className="animate-in fade-in zoom-in-95 duration-200">
          <ClickerWidget onClose={() => setShowClickerEmbedded(false)} />
        </div>
      )}

      {/* Sub-Section Switcher Pills */}
      <div className="flex p-1 bg-stone-200/80 rounded-2xl gap-1 overflow-x-auto scrollbar-none">
        <button
          type="button"
          id="subtab-comandi"
          onClick={() => handleSubTabChange('comandi')}
          className={`flex-1 py-2 px-2.5 sm:px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 ${
            activeSubTab === 'comandi'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <BookOpen className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Comandi</span>
          <span className="text-[10px] sm:text-xs font-semibold px-1.5 py-0.2 rounded-full bg-stone-100 text-stone-600">
            {BASIC_COMMANDS.length}
          </span>
        </button>

        <button
          type="button"
          id="subtab-rinforzo"
          onClick={() => handleSubTabChange('rinforzo')}
          className={`flex-1 py-2 px-2.5 sm:px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 ${
            activeSubTab === 'rinforzo'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
          <span>Rinforzo</span>
          <span className="text-[10px] sm:text-xs font-semibold px-1.5 py-0.2 rounded-full bg-stone-100 text-stone-600">
            {POSITIVE_REINFORCEMENT_TECHNIQUES.length}
          </span>
        </button>

        <button
          type="button"
          id="subtab-salute"
          onClick={() => handleSubTabChange('salute')}
          className={`flex-1 py-2 px-2.5 sm:px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 ${
            activeSubTab === 'salute'
              ? 'bg-white text-rose-700 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <HeartPulse className="w-4 h-4 text-rose-500 shrink-0" />
          <span>Salute & Emergenze</span>
          <span className="text-[10px] sm:text-xs font-semibold px-1.5 py-0.2 rounded-full bg-rose-50 text-rose-700">
            {HEALTH_TOPICS.length}
          </span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="space-y-2.5">
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            id="guide-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              activeSubTab === 'comandi'
                ? 'Cerca comandi (es. Nome, Seduto, Resta, Vieni)...'
                : activeSubTab === 'rinforzo'
                ? 'Cerca tecniche (es. Clicker, Premi, 3D, Morsi, Socializzazione)...'
                : 'Cerca per salute/emergenza (es. Vaccini, Sterilizzazione, Veleni, Torsione, Heimlich)...'
            }
            className="w-full bg-white rounded-xl border border-stone-200 py-2.5 pl-10 pr-4 text-xs sm:text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600 p-1"
            >
              ✕
            </button>
          )}
        </div>

        {/* Difficulty Filter Chips (Shown for Comandi) */}
        {activeSubTab === 'comandi' && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1.5 pt-0.5 scrollbar-none">
            <span className="text-[11px] sm:text-xs font-semibold text-stone-500 flex items-center gap-1 pl-1 shrink-0">
              <Filter className="w-3 h-3" /> Difficoltà:
            </span>
            {(['Tutti', 'Principiante', 'Intermedio', 'Avanzato'] as const).map((diff) => (
              <button
                key={diff}
                type="button"
                id={`filter-diff-${diff}`}
                onClick={() => setDifficultyFilter(diff)}
                className={`text-xs px-3 py-1 rounded-lg font-medium shrink-0 transition-colors ${
                  difficultyFilter === diff
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        )}

        {/* Category Filter Chips (Shown for Salute) */}
        {activeSubTab === 'salute' && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1.5 pt-0.5 scrollbar-none">
            <span className="text-[11px] sm:text-xs font-semibold text-stone-500 flex items-center gap-1 pl-1 shrink-0">
              <Filter className="w-3 h-3" /> Categoria:
            </span>
            {[
              { id: 'tutti', label: 'Tutti' },
              { id: 'emergenza', label: '🚨 Emergenze & Pronto Soccorso' },
              { id: 'vaccini', label: '💉 Vaccini & Prevenzione' },
              { id: 'sterilizzazione', label: '🩺 Sterilizzazione' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                id={`filter-health-${cat.id}`}
                onClick={() => setHealthCategoryFilter(cat.id as any)}
                className={`text-xs px-3 py-1 rounded-lg font-medium shrink-0 transition-colors ${
                  healthCategoryFilter === cat.id
                    ? 'bg-rose-700 text-white shadow-xs'
                    : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Content for Comandi Base */}
      {activeSubTab === 'comandi' && (
        <div className="space-y-4">
          {filteredCommands.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
              {filteredCommands.map((command) => (
                <CommandCard
                  key={command.id}
                  command={command}
                  sessions={sessions}
                  onSelect={setSelectedCommand}
                  onQuickLog={onLogCommandSession}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center">
              <HelpCircle className="w-8 h-8 text-stone-400 mx-auto mb-2" />
              <p className="text-sm font-semibold text-stone-800">Nessun comando trovato</p>
              <p className="text-xs text-stone-500 mt-1">Prova a cercare con un altro termine o reimposta i filtri.</p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setDifficultyFilter('Tutti');
                }}
                className="mt-3 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg"
              >
                Reimposta filtri
              </button>
            </div>
          )}
        </div>
      )}

      {/* Content for Tecniche di Rinforzo Positivo */}
      {activeSubTab === 'rinforzo' && (
        <div className="space-y-3">
          {filteredTechniques.length > 0 ? (
            <div className="space-y-3">
              {filteredTechniques.map((technique) => (
                <TechniqueCard
                  key={technique.id}
                  technique={technique}
                  onOpenClicker={() => setShowClickerEmbedded(true)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center">
              <HelpCircle className="w-8 h-8 text-stone-400 mx-auto mb-2" />
              <p className="text-sm font-semibold text-stone-800">Nessuna tecnica trovata</p>
              <p className="text-xs text-stone-500 mt-1">Prova a cambiare parola chiave di ricerca.</p>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="mt-3 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg"
              >
                Mostra tutte le tecniche
              </button>
            </div>
          )}
        </div>
      )}

      {/* Content for Salute, Vaccini, Sterilizzazione & Emergenze */}
      {activeSubTab === 'salute' && (
        <div className="space-y-4">
          {/* Emergency Alert Banner */}
          <div className="bg-gradient-to-r from-rose-900 via-rose-800 to-amber-900 rounded-2xl p-4 text-white shadow-sm flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 text-white flex items-center justify-center shrink-0 mt-0.5">
              <ShieldAlert className="w-5 h-5 text-rose-200" />
            </div>
            <div className="text-xs space-y-1">
              <span className="font-bold text-sm text-white block">
                Regola d'Oro del Pronto Soccorso Veterinario
              </span>
              <p className="text-rose-100 leading-relaxed">
                In caso di emergenza grave (torsione gastrica, ingestione di veleni, soffocamento), <strong>telefona sempre alla clinica H24</strong> prima di partire. Avvisare con 10 minuti di anticipo consente al personale di preparare farmaci emetici, ossigeno e la sala chirurgica.
              </p>
            </div>
          </div>

          {/* Cards List */}
          {filteredHealthTopics.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
              {filteredHealthTopics.map((topic) => (
                <HealthTopicCard key={topic.id} topic={topic} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center">
              <HelpCircle className="w-8 h-8 text-stone-400 mx-auto mb-2" />
              <p className="text-sm font-semibold text-stone-800">Nessun argomento sanitario trovato</p>
              <p className="text-xs text-stone-500 mt-1">Prova a cercare con altri termini (es. veleno, vaccino, calore).</p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setHealthCategoryFilter('tutti');
                }}
                className="mt-3 text-xs font-semibold text-rose-700 bg-rose-50 px-3 py-1.5 rounded-lg"
              >
                Mostra tutte le guide
              </button>
            </div>
          )}
        </div>
      )}

      {/* Detail Modal */}
      <CommandDetailModal
        command={selectedCommand}
        sessions={sessions}
        onClose={() => setSelectedCommand(null)}
        onLogSession={onLogCommandSession}
      />
    </div>
  );
};

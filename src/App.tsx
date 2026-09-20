import React, { useState, useEffect } from 'react';
import { MainSection, GuideSubSection, TrainingSession, PuppyProfile, CommandGuide } from './types';
import { INITIAL_TRAINING_SESSIONS, BASIC_COMMANDS } from './data/trainingData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { GuideSection } from './components/GuideSection';
import { ProgressSection } from './components/ProgressSection';
import { NewSessionModal } from './components/NewSessionModal';
import { ClickerModal } from './components/ClickerModal';

const SESSIONS_STORAGE_KEY = 'puppy_trainer_sessions_v1';
const PUPPY_STORAGE_KEY = 'puppy_trainer_profile_v1';

export default function App() {
  // Main Section state: 'guida' (Cose da sapere) vs 'progressi' (Traccia progressi)
  const [currentSection, setCurrentSection] = useState<MainSection>('guida');
  const [guideSubTab, setGuideSubTab] = useState<GuideSubSection>('comandi');

  // Puppy profile state with localStorage persistence
  const [puppy, setPuppy] = useState<PuppyProfile>(() => {
    try {
      const saved = localStorage.getItem(PUPPY_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return {
      name: 'Max',
      breed: 'Labrador / Meticcio',
      ageMonths: 4,
    };
  });

  // Sessions state with localStorage persistence
  const [sessions, setSessions] = useState<TrainingSession[]>(() => {
    try {
      const saved = localStorage.getItem(SESSIONS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const existingCommandIds = new Set(parsed.map((s: TrainingSession) => s.commandId));
          const missingInitials = INITIAL_TRAINING_SESSIONS.filter(
            (initSess) => !existingCommandIds.has(initSess.commandId)
          );
          if (missingInitials.length > 0) {
            return [...parsed, ...missingInitials];
          }
          return parsed;
        }
      }
    } catch {
      // Fallback
    }
    return INITIAL_TRAINING_SESSIONS;
  });

  // Modals state
  const [isNewSessionOpen, setIsNewSessionOpen] = useState(false);
  const [preselectedCommand, setPreselectedCommand] = useState<CommandGuide | null>(null);
  const [isClickerOpen, setIsClickerOpen] = useState(false);

  // Sync sessions to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(sessions));
    } catch (e) {
      console.warn('Could not save sessions to localStorage', e);
    }
  }, [sessions]);

  // Sync puppy to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(PUPPY_STORAGE_KEY, JSON.stringify(puppy));
    } catch (e) {
      console.warn('Could not save puppy to localStorage', e);
    }
  }, [puppy]);

  // Handlers
  const handleSaveSession = (newSessData: Omit<TrainingSession, 'id'>) => {
    const newSession: TrainingSession = {
      ...newSessData,
      id: `sess-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    };
    setSessions((prev) => [newSession, ...prev]);
  };

  const handleDeleteSession = (sessionId: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== sessionId));
  };

  const handleResetToDemoData = () => {
    if (confirm('Vuoi ripristinare le sessioni di esempio iniziali? I tuoi dati attuali verranno sostituiti.')) {
      setSessions(INITIAL_TRAINING_SESSIONS);
    }
  };

  const handleOpenLogWithCommand = (command?: CommandGuide | null) => {
    setPreselectedCommand(command || null);
    setIsNewSessionOpen(true);
  };

  return (
    <div className="min-h-screen bg-stone-100 flex justify-center selection:bg-emerald-100 selection:text-emerald-900 font-sans">
      {/* Responsive app container - full width on mobile, nicely framed on tablet/desktop */}
      <div className="w-full max-w-2xl lg:max-w-3xl bg-stone-50 min-h-screen flex flex-col shadow-xl border-x border-stone-200/70 relative">
        {/* Sticky Mobile/Desktop Header */}
        <Header
          puppy={puppy}
          onUpdatePuppy={setPuppy}
          onOpenClicker={() => setIsClickerOpen(true)}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-3.5 sm:p-5 md:p-6 overflow-y-auto pb-24">
          {currentSection === 'guida' ? (
            <GuideSection
              sessions={sessions}
              onLogCommandSession={handleOpenLogWithCommand}
              activeSubTab={guideSubTab}
              onSubTabChange={setGuideSubTab}
            />
          ) : (
            <ProgressSection
              sessions={sessions}
              onOpenNewSession={handleOpenLogWithCommand}
              onDeleteSession={handleDeleteSession}
              onResetToDemoData={handleResetToDemoData}
            />
          )}
        </main>

        {/* Fixed Mobile Bottom Navigation Bar */}
        <BottomNav
          currentSection={currentSection}
          onSelectSection={setCurrentSection}
          onOpenNewSession={() => handleOpenLogWithCommand(null)}
        />

        {/* Modal: New Training Session */}
        <NewSessionModal
          isOpen={isNewSessionOpen}
          preselectedCommand={preselectedCommand}
          onClose={() => {
            setIsNewSessionOpen(false);
            setPreselectedCommand(null);
          }}
          onSave={handleSaveSession}
        />

        {/* Modal: Interactive Sound Clicker */}
        <ClickerModal
          isOpen={isClickerOpen}
          onClose={() => setIsClickerOpen(false)}
        />
      </div>
    </div>
  );
}

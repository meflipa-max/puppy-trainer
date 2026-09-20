import React, { useState } from 'react';
import { Dog, Sparkles, Edit2, Calendar } from 'lucide-react';
import { PuppyProfile } from '../types';
import { calculatePuppyAge } from '../utils/puppyAge';
import { PuppyProfileModal } from './PuppyProfileModal';

interface HeaderProps {
  puppy: PuppyProfile;
  onUpdatePuppy: (puppy: PuppyProfile) => void;
  onOpenClicker: () => void;
}

export const Header: React.FC<HeaderProps> = ({ puppy, onUpdatePuppy, onOpenClicker }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const ageDetails = calculatePuppyAge(puppy.birthDate);
  const displayAge = ageDetails
    ? ageDetails.formattedAge
    : puppy.ageMonths
    ? `${puppy.ageMonths} mesi`
    : 'Età non impostata';

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
        <div className="w-full px-4 sm:px-6 py-2.5 flex items-center justify-between">
          {/* Left: Dog info / branding */}
          <button
            type="button"
            id="header-edit-puppy-btn"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2.5 text-left group rounded-xl p-1 -m-1 hover:bg-stone-100/70 transition-colors"
            title="Clicca per modificare foto, data di nascita e dati del cucciolo"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-emerald-600 group-hover:bg-emerald-700 text-white flex items-center justify-center shadow-xs transition-colors shrink-0 overflow-hidden relative border border-stone-200">
              {puppy.photoUrl ? (
                <img
                  src={puppy.photoUrl}
                  alt={puppy.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <Dog className="w-5 h-5 text-white" />
              )}
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm sm:text-base text-stone-900 leading-tight">
                  {puppy.name}
                </span>
                <span className="p-0.5 text-stone-400 group-hover:text-emerald-600 transition-colors">
                  <Edit2 className="w-3 h-3" />
                </span>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded-md border border-emerald-200/60 flex items-center gap-1">
                  <Calendar className="w-2.5 h-2.5 text-emerald-600" />
                  {displayAge}
                </span>
                {puppy.breed && (
                  <span className="text-[11px] text-stone-400 hidden xs:inline">
                    • {puppy.breed}
                  </span>
                )}
              </div>
            </div>
          </button>

          {/* Right: Quick Clicker trigger */}
          <button
            type="button"
            id="header-open-clicker"
            onClick={onOpenClicker}
            className="flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200/80 active:scale-95 transition-all shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Clicker</span>
          </button>
        </div>
      </header>

      {/* Modal modifica dati anagrafici cucciolo */}
      <PuppyProfileModal
        isOpen={isModalOpen}
        puppy={puppy}
        onClose={() => setIsModalOpen(false)}
        onSave={onUpdatePuppy}
      />
    </>
  );
};

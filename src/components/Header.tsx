import React, { useState } from 'react';
import { Dog, Sparkles, Edit2, Check } from 'lucide-react';
import { PuppyProfile } from '../types';

interface HeaderProps {
  puppy: PuppyProfile;
  onUpdatePuppy: (puppy: PuppyProfile) => void;
  onOpenClicker: () => void;
}

export const Header: React.FC<HeaderProps> = ({ puppy, onUpdatePuppy, onOpenClicker }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(puppy.name);
  const [tempAge, setTempAge] = useState(puppy.ageMonths ? String(puppy.ageMonths) : '');

  const handleSavePuppy = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdatePuppy({
      ...puppy,
      name: tempName.trim() || 'Il Mio Cucciolo',
      ageMonths: tempAge ? parseInt(tempAge, 10) : undefined,
    });
    setIsEditing(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-md mx-auto px-4 py-2.5 flex items-center justify-between">
        {/* Left: Dog info / branding */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
            <Dog className="w-5 h-5" />
          </div>

          {!isEditing ? (
            <div
              onClick={() => setIsEditing(true)}
              className="cursor-pointer group flex flex-col"
              title="Clicca per modificare il nome del cucciolo"
            >
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm text-stone-900 leading-tight">
                  {puppy.name}
                </span>
                <Edit2 className="w-3 h-3 text-stone-400 group-hover:text-emerald-600 transition-colors" />
              </div>
              <span className="text-[11px] text-stone-500 font-medium">
                {puppy.ageMonths ? `${puppy.ageMonths} mesi` : 'Cucciolo in addestramento'}
              </span>
            </div>
          ) : (
            <form onSubmit={handleSavePuppy} className="flex items-center gap-1.5">
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                placeholder="Nome cane"
                className="w-24 text-xs font-semibold py-1 px-1.5 rounded-lg border border-emerald-400 focus:outline-none"
                autoFocus
              />
              <input
                type="number"
                value={tempAge}
                onChange={(e) => setTempAge(e.target.value)}
                placeholder="Mesi"
                className="w-14 text-xs py-1 px-1.5 rounded-lg border border-stone-300 focus:outline-none"
              />
              <button
                type="submit"
                className="p-1 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
              >
                <Check className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>

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
  );
};

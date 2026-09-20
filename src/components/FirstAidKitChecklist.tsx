import React, { useState, useEffect } from 'react';
import {
  BriefcaseMedical,
  CheckCircle2,
  Circle,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';

interface KitItem {
  id: string;
  name: string;
  purpose: string;
  importantNote?: string;
}

const KIT_ITEMS: KitItem[] = [
  {
    id: 'fisiologica',
    name: 'Soluzione fisiologica sterile (fialette monouso)',
    purpose: 'Lavaggio immediato di occhi da sabbia/polvere e lavaggio d\'urgenza della bocca in caso di processionaria.',
  },
  {
    id: 'siringhe',
    name: 'Siringhe senza ago da 20 ml e 50 ml',
    purpose: 'Per somministrare liquidi a getto nella bocca o eseguire lavaggi a pressione.',
  },
  {
    id: 'garze_benda',
    name: 'Bende autoaderenti elastiche (Vetrap) & Garze sterili',
    purpose: 'Fasciano senza incollarsi al pelo del cucciolo in caso di tagli ai polpastrelli per vetri o rocce.',
  },
  {
    id: 'clorexidina',
    name: 'Disinfettante alla Clorexidina 2% (NON alcolico)',
    purpose: 'Pulizia ferite. Mai usare alcol denaturato o acqua ossigenata pura che bruciano i tessuti vivi.',
  },
  {
    id: 'termometro',
    name: 'Termometro digitale flessibile + Vaselina',
    purpose: 'Per rilevare rapidamente la temperatura rettale in caso di letargia o colpo di calore.',
  },
  {
    id: 'pinzetta_zecche',
    name: 'Pinzetta a uncino per zecche (Tick Twister)',
    purpose: 'Estrae la zecca con movimento rotatorio senza spezzare il rostro nella cute del cane.',
  },
  {
    id: 'forbici_punte_tonde',
    name: 'Forbicine a punta arrotondata',
    purpose: 'Per tagliare garze o peli aggrovigliati attorno a forasacchi senza rischiare di pungere il cane.',
  },
  {
    id: 'carbone_vegetale',
    name: 'Carbone vegetale attivo in compresse/polvere',
    purpose: 'Assorbe tossici nello stomaco (da usare sempre dopo aver concordato la dose con il Centro Antiveleni o veterinario).',
  },
  {
    id: 'guanti_nitrile',
    name: 'Guanti monouso resistenti in nitrile',
    purpose: 'Proteggono le tue mani dai peli urticanti della processionaria o da ferite infette.',
  },
];

export const FirstAidKitChecklist: React.FC = () => {
  const [checkedIds, setCheckedIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('puppy_first_aid_kit');
      if (saved) {
        setCheckedIds(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const toggleItem = (id: string) => {
    const updated = checkedIds.includes(id)
      ? checkedIds.filter((item) => item !== id)
      : [...checkedIds, id];

    setCheckedIds(updated);
    try {
      localStorage.setItem('puppy_first_aid_kit', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const resetAll = () => {
    setCheckedIds([]);
    try {
      localStorage.removeItem('puppy_first_aid_kit');
    } catch (e) {
      console.error(e);
    }
  };

  const progressPercent = Math.round((checkedIds.length / KIT_ITEMS.length) * 100);

  return (
    <div
      id="first-aid-kit-checklist"
      className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-xs space-y-4"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center">
            <BriefcaseMedical className="w-5 h-5 text-rose-700" />
          </div>
          <div>
            <h3 className="font-bold text-stone-900 text-sm sm:text-base">
              Kit di Primo Soccorso Domestico & da Viaggio
            </h3>
            <p className="text-xs text-stone-500">
              Cosa avere sempre in un beauty case a casa o in macchina per il cucciolo
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center">
          <span className="text-xs font-bold text-stone-700">
            {checkedIds.length}/{KIT_ITEMS.length} pronti ({progressPercent}%)
          </span>
          {checkedIds.length > 0 && (
            <button
              type="button"
              onClick={resetAll}
              title="Azzera checklist"
              className="p-1 rounded text-stone-400 hover:text-stone-700 text-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
        <div
          className="bg-emerald-500 h-full rounded-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Checklist items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {KIT_ITEMS.map((item) => {
          const isChecked = checkedIds.includes(item.id);

          return (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`p-3 rounded-xl border text-xs cursor-pointer select-none transition-all flex items-start gap-2.5 ${
                isChecked
                  ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950 shadow-2xs'
                  : 'bg-stone-50/70 border-stone-200 text-stone-800 hover:bg-stone-100/60'
              }`}
            >
              <button
                type="button"
                className="mt-0.5 text-emerald-600 shrink-0"
                aria-label={isChecked ? 'Segna come non presente' : 'Segna come presente'}
              >
                {isChecked ? (
                  <CheckCircle2 className="w-4 h-4 fill-emerald-600 text-white" />
                ) : (
                  <Circle className="w-4 h-4 text-stone-300" />
                )}
              </button>

              <div className="min-w-0 flex-1">
                <span
                  className={`font-bold block leading-snug ${
                    isChecked ? 'line-through opacity-80 text-emerald-900' : 'text-stone-900'
                  }`}
                >
                  {item.name}
                </span>
                <p className="text-[11px] text-stone-500 mt-0.5 leading-relaxed">
                  {item.purpose}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

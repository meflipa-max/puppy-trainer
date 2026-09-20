import React, { useState } from 'react';
import {
  AlertTriangle,
  Scale,
  Activity,
  PhoneCall,
  ShieldCheck,
  AlertOctagon,
  Info,
} from 'lucide-react';

interface ToxicItemType {
  id: string;
  name: string;
  unit: string;
  theobromineMgPerUnit: number; // mg per gram
  description: string;
}

const TOXIC_TYPES: ToxicItemType[] = [
  {
    id: 'cacao_powder',
    name: 'Cacao Amaro in Polvere',
    unit: 'grammi (g)',
    theobromineMgPerUnit: 26.0,
    description: 'Il più letale! Anche solo 10-15g possono uccidere un cucciolo.',
  },
  {
    id: 'dark_heavy',
    name: 'Cioccolato Fondente Extra (70-85%)',
    unit: 'grammi (g)',
    theobromineMgPerUnit: 16.0,
    description: 'Altissima concentrazione di teobromina.',
  },
  {
    id: 'dark_medium',
    name: 'Cioccolato Fondente Standard (~50%)',
    unit: 'grammi (g)',
    theobromineMgPerUnit: 8.5,
    description: 'Comune cioccolato per dolci o tavolette da pasticceria.',
  },
  {
    id: 'milk_choco',
    name: 'Cioccolato al Latte / Barrette Snack',
    unit: 'grammi (g)',
    theobromineMgPerUnit: 2.3,
    description: 'Minor teobromina ma grassi e zuccheri causano pancreatite acuta.',
  },
  {
    id: 'white_choco',
    name: 'Cioccolato Bianco',
    unit: 'grammi (g)',
    theobromineMgPerUnit: 0.1,
    description: 'Quasi privo di teobromina, ma l\'eccesso di grassi può provocare vomito/diarrea.',
  },
];

export const ChocolateToxicityCalculator: React.FC = () => {
  const [dogWeightKg, setDogWeightKg] = useState<number>(5);
  const [selectedType, setSelectedType] = useState<string>('dark_heavy');
  const [amountGrams, setAmountGrams] = useState<number>(30);

  const currentType = TOXIC_TYPES.find((t) => t.id === selectedType) || TOXIC_TYPES[1];

  const totalTheobromineMg = currentType.theobromineMgPerUnit * (amountGrams || 0);
  const doseMgPerKg = dogWeightKg > 0 ? totalTheobromineMg / dogWeightKg : 0;

  // Categorie cliniche di rischio (secondo la letteratura veterinaria):
  // < 20 mg/kg: Tossicità minima (possibile agitazione, vomito leggero)
  // 20 - 40 mg/kg: Tossicità cardiotossica moderata (tachicardia, aritmie, respiro rapido)
  // 40 - 60 mg/kg: Tossicità grave (tremori muscolari, spasmi, ipertermia)
  // >= 60 mg/kg: Letale (convulsioni, collasso cardiovascolare, arresto)

  let severity: 'safe' | 'mild' | 'moderate' | 'severe' | 'lethal' = 'safe';
  let badgeColor = 'bg-emerald-100 text-emerald-900 border-emerald-300';
  let statusTitle = 'Rischio Basso / Minimo';
  let advice =
    'La dose stimata è sotto la soglia critica per la teobromina. Tieni sotto controllo feci e vomito per le prossime 12 ore.';

  if (doseMgPerKg >= 60) {
    severity = 'lethal';
    badgeColor = 'bg-rose-600 text-white border-rose-700 animate-pulse';
    statusTitle = '🚨 EMERGENZA LETALE: Corsa Immediata in Clinica';
    advice =
      'La dose ingerita è potenzialmente letale! Può provocare convulsioni, arresto cardiaco e morte entro poche ore. Vai subito alla clinica con pronto soccorso!';
  } else if (doseMgPerKg >= 40) {
    severity = 'severe';
    badgeColor = 'bg-rose-100 text-rose-950 border-rose-400';
    statusTitle = '⚠️ Rischio Grave: Tossicità Neurologica e Cardiaca';
    advice =
      'Dose pericolosa. Rischio di aritmie gravi, tremori e convulsioni. Contatta d\'urgenza il veterinario o il Centro Antiveleni.';
  } else if (doseMgPerKg >= 20) {
    severity = 'moderate';
    badgeColor = 'bg-amber-100 text-amber-950 border-amber-400';
    statusTitle = '⚠️ Rischio Moderato: Cardiotossicità';
    advice =
      'Dose sufficiente a scatenare tachicardia, iperattività e vomito. Chiama il veterinario per valutare l\'induzione farmacologica del vomito.';
  } else if (doseMgPerKg > 5) {
    severity = 'mild';
    badgeColor = 'bg-yellow-100 text-yellow-950 border-yellow-300';
    statusTitle = 'Rischio Lieve: Disturbi Gastrointestinali';
    advice =
      'Possibile vomito, diarrea e irrequietezza dovuta a grassi e zuccheri. Monitora il cucciolo attentamente.';
  }

  return (
    <div
      id="toxicity-calculator"
      className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-xs space-y-4"
    >
      <div className="flex items-center justify-between gap-2 border-b border-stone-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <Scale className="w-5 h-5 text-amber-700" />
          </div>
          <div>
            <h3 className="font-bold text-stone-900 text-sm sm:text-base">
              Calcolatore di Tossicità Cioccolato & Teobromina
            </h3>
            <p className="text-xs text-stone-500">
              Calcola il dosaggio tossico preciso per chilo del tuo cucciolo
            </p>
          </div>
        </div>
      </div>

      {/* Input controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Peso del Cane */}
        <div>
          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
            Peso del Cucciolo (kg)
          </label>
          <div className="relative">
            <input
              type="number"
              min="0.5"
              max="90"
              step="0.5"
              value={dogWeightKg || ''}
              onChange={(e) => setDogWeightKg(parseFloat(e.target.value) || 0)}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-sm font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <span className="absolute right-3 top-2.5 text-xs text-stone-400 font-semibold">
              kg
            </span>
          </div>
        </div>

        {/* Tipo di Cioccolato */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
            Tipo di Cioccolato Ingerito
          </label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-xs sm:text-sm font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {TOXIC_TYPES.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Quantità in Grammi */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
            Quantità Ingerita Stimata (grammi)
          </label>
          <span className="text-xs font-bold text-stone-600">
            {amountGrams} grammi (ca. {Math.round(amountGrams / 10)} quadratini)
          </span>
        </div>
        <input
          type="range"
          min="1"
          max="300"
          value={amountGrams}
          onChange={(e) => setAmountGrams(parseInt(e.target.value, 10))}
          className="w-full accent-emerald-600 h-2 bg-stone-200 rounded-lg cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-stone-400 mt-0.5">
          <span>1 g (briciola)</span>
          <span>50 g (mezza tavoletta)</span>
          <span>100 g (tavoletta intera)</span>
          <span>300 g</span>
        </div>
      </div>

      {/* RISULTATO CALCOLO CLINICO */}
      <div className={`p-4 rounded-2xl border ${badgeColor} transition-all`}>
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="text-[11px] uppercase tracking-wider font-bold block opacity-90">
              Valutazione Clinica
            </span>
            <h4 className="text-base font-black leading-tight mt-0.5">{statusTitle}</h4>
          </div>

          <div className="text-right shrink-0">
            <span className="text-lg sm:text-xl font-black block">
              {doseMgPerKg.toFixed(1)}{' '}
              <span className="text-xs font-normal opacity-90">mg/kg</span>
            </span>
            <span className="text-[10px] opacity-80 block">teobromina assunta</span>
          </div>
        </div>

        <p className="text-xs mt-2 leading-relaxed font-medium">{advice}</p>

        {severity !== 'safe' && (
          <div className="mt-3 pt-3 border-t border-current/20 flex flex-wrap items-center justify-between gap-2">
            <span className="text-[11px] font-bold">
              Non aspettare che compaiano i sintomi:
            </span>
            <div className="flex items-center gap-2">
              <a
                href="tel:0266101029"
                className="bg-black/80 hover:bg-black text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5"
              >
                <PhoneCall className="w-3 h-3" />
                <span>Antiveleni (02 6610 1029)</span>
              </a>
              <a
                href="tel:0832520500"
                className="bg-rose-900 hover:bg-rose-950 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5"
              >
                <PhoneCall className="w-3 h-3" />
                <span>Pronto Soccorso LeVet</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

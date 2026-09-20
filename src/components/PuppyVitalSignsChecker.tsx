import React, { useState } from 'react';
import {
  Activity,
  Heart,
  Thermometer,
  Eye,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';

interface VitalSign {
  id: string;
  title: string;
  normalRange: string;
  howToCheck: string;
  dangerSignals: string[];
  icon: React.ElementType;
}

const VITAL_SIGNS: VitalSign[] = [
  {
    id: 'gums',
    title: 'Colore delle Gengive & TRC (Tempo Riempimento Capillare)',
    normalRange: 'Rosa confetto brillante; torna rosa in meno di 2 secondi dopo aver premuto col dito.',
    howToCheck:
      'Solleva il labbro superiore ed esamina la gengiva sopra i denti. Premi forte con il pollice per 2 secondi: si formerà un\'impronta bianca. Conta i secondi che impiega a tornare rosa.',
    dangerSignals: [
      'Gengive bianche come gesso o grigie: emorragia interna grave, anemia o shock ipovolemico.',
      'Gengive blu/violacee (cianosi): soffocamento, blocco delle vie aeree o arresto respiratorio.',
      'Gengive rosso mattone scuro: colpo di calore o sepsi batterica.',
      'TRC superiore a 2.5 secondi: grave collasso circolatorio.',
    ],
    icon: Eye,
  },
  {
    id: 'temp',
    title: 'Temperatura Corporea Rettale',
    normalRange: '38.0°C - 39.2°C (nei cuccioli molto piccoli fino a 38.5°C - 39.3°C).',
    howToCheck:
      'Usa un termometro digitale con punta flessibile lubrificata con vaselina o olio. Inseriscilo delicatamente nel retto per 1-2 cm e attendi il segnale acustico.',
    dangerSignals: [
      'Sotto 37.5°C (Ipotermia grave): shock, avvelenamento o cucciolo moribondo.',
      'Sopra 39.8°C (Febbre alta): infezione sistemica acuta o parvovirosi.',
      'Sopra 40.5°C - 41°C (Colpo di calore fatale): rischio imminente di necrosi cerebrale.',
    ],
    icon: Thermometer,
  },
  {
    id: 'breathing',
    title: 'Frequenza Respiratoria a Riposo',
    normalRange: '15 - 30 respiri al minuto a riposo (senza ansimare).',
    howToCheck:
      'Mentre il cane dorme o riposa tranquillo, conta quanti sollevamenti completi della cassa toracica avvengono in 30 secondi e moltiplica per 2.',
    dangerSignals: [
      'Respiro rumoroso, stridente o con becco/collo teso in avanti (dispnea asfittica).',
      'Più di 45-50 respiri/minuto a riposo prolungato (edema polmonare, dolore acuto o torsione gastrica).',
      'Torace che si muove a mantice con addome contratto (respiro addominale paradosso).',
    ],
    icon: Activity,
  },
  {
    id: 'hydration',
    title: 'Idratazione (Test della Piega Cutanea)',
    normalRange: 'La pelle pizzicata sulla collottola torna giù all\'istante (< 1 secondo).',
    howToCheck:
      'Pizzica delicatamente e solleva la pelle tra le scapole o sulla nuca formando una piccola piega, poi rilasciala subito.',
    dangerSignals: [
      'La piega rimane sollevata come una tenda da campeggio e scende lentamente: disidratazione moderata (6-8%).',
      'La piega non scende più e gli occhi appaiono infossati nelle orbite: disidratazione grave (> 10%), rischio blocco renale.',
    ],
    icon: Heart,
  },
];

export const PuppyVitalSignsChecker: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>('gums');

  return (
    <div
      id="vital-signs-checker"
      className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-xs space-y-3"
    >
      <div className="flex items-center gap-2.5 border-b border-stone-100 pb-3">
        <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
          <Activity className="w-5 h-5 text-emerald-700" />
        </div>
        <div>
          <h3 className="font-bold text-stone-900 text-sm sm:text-base">
            Triage Veloce: 4 Parametri Vitali da Controllare a Casa
          </h3>
          <p className="text-xs text-stone-500">
            Come capire in 60 secondi se il tuo cucciolo è in pericolo o stabile
          </p>
        </div>
      </div>

      <div className="space-y-2.5">
        {VITAL_SIGNS.map((item) => {
          const isExpanded = expandedId === item.id;
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className={`border rounded-xl transition-all overflow-hidden ${
                isExpanded
                  ? 'border-emerald-300 bg-emerald-50/20 shadow-2xs'
                  : 'border-stone-200 bg-stone-50/60 hover:bg-stone-50'
              }`}
            >
              <button
                type="button"
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
                className="w-full p-3 text-left flex items-center justify-between gap-2.5"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div className="min-w-0">
                    <span className="font-bold text-xs sm:text-sm text-stone-900 block leading-tight">
                      {item.title}
                    </span>
                    <span className="text-[11px] text-stone-500 truncate block mt-0.5">
                      Valore normale: {item.normalRange}
                    </span>
                  </div>
                </div>

                <span className="text-xs font-bold text-emerald-700 shrink-0">
                  {isExpanded ? 'Chiudi' : 'Come controllare'}
                </span>
              </button>

              {isExpanded && (
                <div className="p-3.5 pt-1 border-t border-stone-100 text-xs space-y-3 animate-in fade-in duration-150">
                  <div className="bg-white p-3 rounded-xl border border-stone-200">
                    <span className="font-bold text-stone-900 block mb-1 text-[11px] uppercase tracking-wider text-emerald-900">
                      Istruzioni di controllo:
                    </span>
                    <p className="text-stone-700 leading-relaxed">{item.howToCheck}</p>
                  </div>

                  <div className="bg-rose-50 border border-rose-200 p-3 rounded-xl text-rose-950">
                    <span className="font-bold flex items-center gap-1.5 text-rose-900 mb-1.5 text-[11px] uppercase tracking-wider">
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      Segnali di allarme rosso (Chiama subito il veterinario):
                    </span>
                    <ul className="list-disc pl-4 space-y-1 text-stone-800">
                      {item.dangerSignals.map((danger, i) => (
                        <li key={i} className="leading-relaxed font-medium">
                          {danger}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

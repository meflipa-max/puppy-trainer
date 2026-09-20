export interface PuppyAgeDetails {
  daysTotal: number;
  weeksTotal: number;
  monthsTotal: number;
  yearsTotal: number;
  remainingWeeks: number;
  remainingDays: number;
  formattedAge: string;
  stageName: string;
  stageBadgeColor: string;
  stageTip: string;
}

/**
 * Calcola l'età esatta e la fase evolutiva del cucciolo a partire dalla data di nascita (YYYY-MM-DD).
 * È possibile passare una data di riferimento (es. la data di una sessione passata).
 */
export function calculatePuppyAge(birthDateStr?: string, referenceDateStr?: string): PuppyAgeDetails | null {
  if (!birthDateStr) return null;

  const birthDate = new Date(birthDateStr);
  if (isNaN(birthDate.getTime())) return null;

  const refDate = referenceDateStr ? new Date(referenceDateStr) : new Date();
  if (isNaN(refDate.getTime())) return null;

  // Differenza temporale
  const diffMs = refDate.getTime() - birthDate.getTime();
  if (diffMs < 0) {
    return {
      daysTotal: 0,
      weeksTotal: 0,
      monthsTotal: 0,
      yearsTotal: 0,
      remainingWeeks: 0,
      remainingDays: 0,
      formattedAge: 'Appena nato / Data futura',
      stageName: 'Neonatale',
      stageBadgeColor: 'bg-stone-100 text-stone-700 border-stone-200',
      stageTip: 'Assicurati che la data di nascita sia corretta.',
    };
  }

  const daysTotal = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const weeksTotal = Math.floor(daysTotal / 7);
  const remainingDays = daysTotal % 7;

  // Calcolo mesi approssimati da calendario
  let months = (refDate.getFullYear() - birthDate.getFullYear()) * 12 + (refDate.getMonth() - birthDate.getMonth());
  if (refDate.getDate() < birthDate.getDate()) {
    months--;
  }
  const monthsTotal = Math.max(0, months);
  const yearsTotal = Math.floor(monthsTotal / 12);
  const remainingMonths = monthsTotal % 12;
  const remainingWeeks = Math.floor((daysTotal - monthsTotal * 30.4375) / 7);

  // Formattazione amichevole dell'età
  let formattedAge = '';
  if (daysTotal < 7) {
    formattedAge = `${daysTotal} ${daysTotal === 1 ? 'giorno' : 'giorni'}`;
  } else if (weeksTotal <= 16) {
    // Sotto le 16 settimane si ragiona sempre a settimane per la socializzazione
    formattedAge = `${weeksTotal} settiman${weeksTotal === 1 ? 'a' : 'e'}${
      remainingDays > 0 ? ` e ${remainingDays} gg` : ''
    }`;
  } else if (monthsTotal < 12) {
    formattedAge = `${monthsTotal} mes${monthsTotal === 1 ? 'e' : 'i'}${
      remainingWeeks > 0 ? ` e ${remainingWeeks} sett.` : ''
    }`;
  } else {
    formattedAge = `${yearsTotal} ann${yearsTotal === 1 ? 'o' : 'i'}${
      remainingMonths > 0 ? ` e ${remainingMonths} mes${remainingMonths === 1 ? 'e' : 'i'}` : ''
    }`;
  }

  // Fasi evolutive e consigli educativi
  let stageName = '';
  let stageBadgeColor = '';
  let stageTip = '';

  if (weeksTotal < 8) {
    stageName = 'Svezzamento & Nido materno (0-8 sett.)';
    stageBadgeColor = 'bg-stone-100 text-stone-700 border-stone-300';
    stageTip = 'Il cucciolo dovrebbe stare con la madre e i fratelli per imparare i primi freni al morso.';
  } else if (weeksTotal <= 16) {
    stageName = 'Finestra d\'Oro di Socializzazione (8-16 sett.)';
    stageBadgeColor = 'bg-amber-100 text-amber-900 border-amber-300';
    stageTip = 'Periodo d\'oro: esponilo con calma a superfici, rumori, persone e cani equilibrati. Fai sessioni brevissime (2-3 min).';
  } else if (weeksTotal <= 24) {
    stageName = 'Dentizione & Fase Giovanile (4-6 mesi)';
    stageBadgeColor = 'bg-emerald-100 text-emerald-900 border-emerald-300';
    stageTip = 'Inizia il cambio denti: canalizza il mordicchiamento su giochi idonei e rafforza "Lascia", "Touch" e il richiamo.';
  } else if (monthsTotal < 12) {
    stageName = 'Adolescenza & Indipendenza (6-12 mesi)';
    stageBadgeColor = 'bg-indigo-100 text-indigo-900 border-indigo-300';
    stageTip = 'Picco ormonale e curiosità esplorativa: non punire ma aumenta il valore dei premi e insisti sull\'autocontrollo.';
  } else {
    stageName = 'Giovane Adulto (12+ mesi)';
    stageBadgeColor = 'bg-teal-100 text-teal-900 border-teal-300';
    stageTip = 'Consolidamento degli schemi motori e mentali in contesti con forte distrazione esterna.';
  }

  return {
    daysTotal,
    weeksTotal,
    monthsTotal,
    yearsTotal,
    remainingWeeks: Math.max(0, remainingWeeks),
    remainingDays,
    formattedAge,
    stageName,
    stageBadgeColor,
    stageTip,
  };
}

/**
 * Utility per ottenere una data stimata di nascita passati i mesi (per migrazione dati)
 */
export function estimateBirthDateFromMonths(months: number): string {
  const d = new Date();
  d.setMonth(d.getMonth() - months);
  return d.toISOString().split('T')[0];
}

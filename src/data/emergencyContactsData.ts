export interface EmergencyContact {
  id: string;
  name: string;
  locality: string;
  distanceFromCastrignano: string;
  phone: string;
  displayPhone: string;
  address: string;
  is24h: boolean;
  type: 'h24_hospital' | 'local_vet' | 'poison_center' | 'asl';
  description: string;
}

export const EMERGENCY_CONTACTS_SALENTO: EmergencyContact[] = [
  // Locale immediato (3 km)
  {
    id: 'nicoli-gagliano',
    name: 'Studio Veterinario Dott. Alessandro Nicolì',
    locality: 'Gagliano del Capo (LE)',
    distanceFromCastrignano: '~3 km (5 min)',
    phone: '+393396932299',
    displayPhone: '339 693 2299',
    address: 'Via de Jacobis, 22, 73040 Gagliano del Capo (LE)',
    is24h: false,
    type: 'local_vet',
    description: 'Il riferimento più vicino a Castrignano del Capo e Leuca per visite e urgenze locali.',
  },

  // Locale vicino (6 km)
  {
    id: 'sabella-alessano',
    name: 'Ambulatorio Veterinario Dott.ssa Lara Sabella',
    locality: 'Alessano (LE)',
    distanceFromCastrignano: '~6 km (8 min)',
    phone: '+390833522402',
    displayPhone: '0833 522402 / 347 6046897',
    address: 'Via Terramessere, 16, 73031 Alessano (LE)',
    is24h: false,
    type: 'local_vet',
    description: 'Ambulatorio chirurgico e medicina interna con reperibilità telefonica per urgenze.',
  },

  // Tricase (14 km)
  {
    id: 'sant-antonio-tricase',
    name: 'Ambulatorio Veterinario S. Antonio',
    locality: 'Tricase (LE)',
    distanceFromCastrignano: '~14 km (15 min)',
    phone: '+390833608880',
    displayPhone: '0833 608880',
    address: 'Via Giovanni Giolitti, 3, 73039 Tricase (LE)',
    is24h: false,
    type: 'local_vet',
    description: 'Struttura attrezzata per primo soccorso, radiologia e chirurgia d\'urgenza.',
  },

  // Clinica H24 Ospedaliera (Lecce)
  {
    id: 'levet-h24-lecce',
    name: 'LeVet Clinica Veterinaria H24',
    locality: 'Lecce (LE)',
    distanceFromCastrignano: '~60 km (SS 274 / SS 16)',
    phone: '+390832520500',
    displayPhone: '0832 520500',
    address: 'Via D. e P. Bastianutti, 33, 73100 Lecce',
    is24h: true,
    type: 'h24_hospital',
    description: 'Pronto Soccorso Veterinario attivo 24 ore su 24, 7 giorni su 7, con sala operatoria e terapia intensiva.',
  },

  // Clinica Privata Lecce Città H24
  {
    id: 'lecce-citta-h24',
    name: 'Clinica Veterinaria Lecce Città H24',
    locality: 'Lecce (LE)',
    distanceFromCastrignano: '~60 km',
    phone: '+390832309203',
    displayPhone: '0832 309203',
    address: 'Via di Ussano, 49, 73100 Lecce',
    is24h: true,
    type: 'h24_hospital',
    description: 'Pronto soccorso aperto h24 per emergenze notturne e festive.',
  },

  // Centro Antiveleni Nazionale
  {
    id: 'centro-antiveleni-niguarda',
    name: 'Centro Antiveleni H24 (Niguarda)',
    locality: 'Nazionale (Attivo h24)',
    distanceFromCastrignano: 'Telefonico',
    phone: '+390266101029',
    displayPhone: '02 6610 1029',
    address: 'ASST Grande Ospedale Metropolitano Niguarda',
    is24h: true,
    type: 'poison_center',
    description: 'Consulenza tossicologica specialistica immediata giorno e notte per veleni, piante e farmaci ingeriti.',
  },

  // ASL Sanità Animale Maglie/Lecce Sud
  {
    id: 'asl-lecce-sud',
    name: 'ASL Lecce - Sanità Animale Area Sud',
    locality: 'Maglie / Distretto Sud (LE)',
    distanceFromCastrignano: '~35 km',
    phone: '+390836460551',
    displayPhone: '0836 460551',
    address: 'Via San Pio X, 2, Maglie (LE)',
    is24h: false,
    type: 'asl',
    description: 'Servizio veterinario pubblico per anagrafe canina e segnalazione animali vaganti/feriti.',
  },
];

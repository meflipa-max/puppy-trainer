import { CommandGuide, TechniqueGuide, TrainingSession } from '../types';

export const BASIC_COMMANDS: CommandGuide[] = [
  {
    id: 'nome',
    name: 'Riconoscimento del Nome',
    translation: 'Name Game / Attention Cue',
    category: 'Autocontrollo',
    difficulty: 'Principiante',
    shortDesc: 'Il passo zero: girare la testa e stabilire contatto visivo immediato al suono del proprio nome.',
    iconName: 'Bell',
    importance: 'Il nome non è un\'etichetta statica, ma un segnale d\'orientamento: significa "girati verso di me, qualcosa di fantastico sta per accadere!". Senza questo, nessun richiamo o comando potrà mai funzionare.',
    vocalCue: '[Nome del cane] pronunciato una sola volta con tono allegro e squillante',
    handSignal: 'Braccia rilassate o mano che guida lo sguardo verso i tuoi occhi.',
    steps: [
      {
        number: 1,
        title: 'Condizionamento diretto (Fase 1)',
        description: 'Siediti a 1 metro in stanza tranquilla con bocconcini saporiti. Pronuncia il suo nome una volta sola con voce allegra. Appena i suoi occhi incrociano i tuoi: CLICK (o "SÌ!") e premia all\'istante.'
      },
      {
        number: 2,
        title: 'Cattura dell\'attenzione con distrazione lieve (Fase 2)',
        description: 'Aspetta che stia annusando il pavimento. Pronuncia il nome a voce normale. Nel momento esatto in cui alza la testa verso di te, clicca e offri un "jackpot" di 2-3 bocconi consecutivi.'
      },
      {
        number: 3,
        title: 'Il gioco del nascondino a distanza (Fase 3)',
        description: 'Spostati in un\'altra stanza o dietro una porta. Chiama il suo nome con entusiasmo. Quando corre a cercarti, festeggia con grande gioia e premia abbondantemente.'
      },
      {
        number: 4,
        title: 'La regola aurea della chiamata singola',
        description: 'Se non reagisce al primo colpo, NON ripetere il nome. Fai un piccolo rumore (schiocco di lingua o battito di mani) per ottenere lo sguardo, premia e ritenta poco dopo riducendo le distrazioni ambientali.'
      }
    ],
    commonMistakes: [
      'Avvelenamento del nome (Name Poisoning): usare il nome per sgridarlo (es. "Max no!"). Il cane imparerà a evitarlo e a temere il proprio nome.',
      'Effetto mitragliatrice ("Max, Max, Max, Max!"): insegna al cucciolo che può ignorare le prime 4 chiamate prima di voltarsi.',
      'Pronunciare il nome prima di fare cose spiacevoli (come fare il bagno, pulire le orecchie o rinchiuderlo).'
    ],
    trainerTip: 'Ogni singola volta che il cucciolo sente il proprio nome deve pensare: "Accidenti, adoro quando dice il mio nome, vale sempre la pena girarsi!".'
  },
  {
    id: 'touch-target',
    name: 'Tocco della Mano / Touch',
    translation: 'Hand Target / Nose Touch',
    category: 'Obbedienza',
    difficulty: 'Principiante',
    shortDesc: 'Toccare il palmo della tua mano con la punta del naso su richiesta.',
    iconName: 'HandMetal',
    importance: 'Comando passe-partout fondamentale per i cuccioli: serve a spostare il cane ovunque senza strattonarlo o prenderlo di peso (su bilance veterinarie, in auto, vicino alla gamba, sul divano o sul tappetino) e a canalizzare l\'attenzione.',
    vocalCue: '"Touch" o "Tocca"',
    handSignal: 'Palmo verticale aperto a 10-15 cm dal muso del cane con dita rivolte verso il basso.',
    steps: [
      {
        number: 1,
        title: 'Presenta la mano aperta',
        description: 'Strofina prima un boccone sul palmo per renderlo profumato, poi porgi la mano aperta a circa 10 cm di lato dal muso del cucciolo.'
      },
      {
        number: 2,
        title: 'Marca il tocco del tartufo',
        description: 'Spinto dalla curiosità, il cucciolo si allungherà per annusare la mano: nel millisecondo esatto in cui la punta del naso tocca la tua pelle, fai CLICK e premia con l\'altra mano.'
      },
      {
        number: 3,
        title: 'Aggiungi la parola chiave',
        description: 'Dopo 5-8 ripetizioni fluide, pronuncia "Touch" un istante prima di presentare il palmo.'
      },
      {
        number: 4,
        title: 'Aumenta distanza e angolazioni',
        description: 'Porgi la mano più in alto, più in basso, o facendo fare al cane 2 o 3 passi per raggiungerla con decisione.'
      }
    ],
    commonMistakes: [
      'Muoversi verso il cane con la mano (è il cane che deve raggiungere il bersaglio, non la mano che va sul cane).',
      'Tenere il cibo nella mano bersaglio (il cane leccherà la mano invece di dare un tocco netto con il naso).'
    ],
    trainerTip: 'Se il cucciolo è intimidito da una novità o da una visita dal veterinario, chiedergli 2-3 "Touch" alla tua mano lo rassicurerà all\'istante focalizzandolo su un gioco noto!'
  },
  {
    id: 'seduto',
    name: 'Seduto',
    translation: 'Sit',
    category: 'Obbedienza',
    difficulty: 'Principiante',
    shortDesc: 'Il primo comando fondamentale, base per la calma e l\'autocontrollo.',
    iconName: 'ArrowDownToLine',
    importance: 'Insegna al cucciolo a chiedere le cose con la calma invece che saltando addosso.',
    vocalCue: '"Seduto" (tono calmo, una sola volta)',
    handSignal: 'Palmo aperto rivolto verso l\'alto, sollevato verso il petto.',
    steps: [
      {
        number: 1,
        title: 'Preparazione con il premio (Lure)',
        description: 'Tieni un bocconcino appetitoso tra pollice e indice, all\'altezza del naso del cucciolo senza farglielo afferrare.'
      },
      {
        number: 2,
        title: 'Movimento verso l\'alto e all\'indietro',
        description: 'Sposta lentamente la mano dal naso verso la parte superiore della sua testa. Seguendo il cibo con il muso, il posteriore toccherà naturalmente il pavimento.'
      },
      {
        number: 3,
        title: 'Marca e Premia istantaneamente',
        description: 'Nel millisecondo esatto in cui il sedere tocca terra, fai scattare il Clicker (o dì "Sì!") e dai subito il bocconcino.'
      },
      {
        number: 4,
        title: 'Aggiungi il comando vocale',
        description: 'Dopo 10-15 ripetizioni fluide con il gesto, pronuncia "Seduto" un istante prima di iniziare il movimento della mano.'
      }
    ],
    commonMistakes: [
      'Spingere il sedere del cane verso il basso (crea opposizione e ansia).',
      'Alzare troppo in alto il bocconcino (il cucciolo salterà invece di sedersi).',
      'Ripetere "Seduto, seduto, seduto!" a raffica.'
    ],
    trainerTip: 'Usa il seduto come "parola magica" per aprire la porta di casa, mettere la ciotola o allacciare il guinzaglio.'
  },
  {
    id: 'terra',
    name: 'Terra / Giù',
    translation: 'Down',
    category: 'Obbedienza',
    difficulty: 'Principiante',
    shortDesc: 'Posizione rilassata che favorisce la calma prolungata in qualsiasi ambiente.',
    iconName: 'ChevronDown',
    importance: 'Un cane sdraiato rilascia la tensione muscolare ed è molto più difficile che reagisca impulsivamente a stimoli esterni.',
    vocalCue: '"Terra" o "Giù"',
    handSignal: 'Palmo rivolto verso il basso che scende dritto verso il suolo.',
    steps: [
      {
        number: 1,
        title: 'Parti da una posizione seduta',
        description: 'Chiedi al cucciolo di sedersi di fronte a te in un luogo tranquillo privo di distrazioni.'
      },
      {
        number: 2,
        title: 'Guida verso il pavimento a "L"',
        description: 'Metti il boccone sotto il naso e scendi verticalmente dritto fino a toccare il pavimento tra le sue zampe anteriori, poi tira dolcemente in avanti formando una "L".'
      },
      {
        number: 3,
        title: 'Marca quando i gomiti toccano terra',
        description: 'Non appena gomiti e pancia toccano terra, usa il marker ("Click!" o "Sì!") e premia rilasciando il cibo a livello del suolo.'
      },
      {
        number: 4,
        title: 'Dissolvenza del premio in mano',
        description: 'Fai lo stesso gesto con la mano vuota e premia prendendo il boccone dalla tasca con l\'altra mano.'
      }
    ],
    commonMistakes: [
      'Tirare le zampe anteriori del cucciolo (provoca paura e resistenza).',
      'Alzare la mano troppo presto facendo rialzare il cane prima del premio.',
      'Esercitarsi su pavimenti scivolosi (usa un tappeto per farlo sentire sicuro).'
    ],
    trainerTip: 'Se il cucciolo fatica a scendere, siediti a terra con le gambe leggermente sollevate a ponte e guidalo a passare sotto la tua gamba!'
  },
  {
    id: 'resta',
    name: 'Resta / Fermo',
    translation: 'Stay',
    category: 'Autocontrollo',
    difficulty: 'Intermedio',
    shortDesc: 'Impedisce al cane di muoversi finché non riceve una parola di sblocco.',
    iconName: 'ShieldAlert',
    importance: 'Comando salvavita: impedisce che il cane scenda dall\'auto nel traffico o corra verso un pericolo.',
    vocalCue: '"Resta" (seguito sempre da una parola di sblocco come "Libero!" o "Vai!")',
    handSignal: 'Palmo aperto verticale mostrato verso il muso del cane (segnale di stop).',
    steps: [
      {
        number: 1,
        title: 'Inizia con pochissimi secondi',
        description: 'Chiedi il seduto. Mostra il palmo "stop", dì "Resta", aspetta solo 2 secondi fermo immobile di fronte a lui.'
      },
      {
        number: 2,
        title: 'Torna e premia sul posto',
        description: 'Marca ("Click"/"Sì") e dagli il premio MENTRE è ancora seduto, senza permettergli di alzarsi per prenderlo.'
      },
      {
        number: 3,
        title: 'Pronuncia la parola di sblocco',
        description: 'Dì con entusiasmo "Libero!" o "Ok!" invitandolo ad alzarsi con un gesto accogliente.'
      },
      {
        number: 4,
        title: 'Aumenta una variabile alla volta',
        description: 'Prima aumenta il tempo (5s, 10s, 20s). Solo dopo comincia a fare 1 passo indietro e tornare subito da lui.'
      }
    ],
    commonMistakes: [
      'Chiamare il cane mentre è in "Resta" (il cane deve imparare che rimani tu a tornare da lui).',
      'Aumentare contemporaneamente durata e distanza (troppo difficile per un cucciolo).',
      'Dimenticare la parola di rilascio, lasciando il cane in dubbio su quando muoversi.'
    ],
    trainerTip: 'Torna SEMPRE tu verso il cucciolo per premiarlo e rilasciarlo. Non lasciare che sia lui a decidere la fine dell\'esercizio.'
  },
  {
    id: 'richiamo',
    name: 'Vieni / Richiamo',
    translation: 'Come / Recall',
    category: 'Sicurezza',
    difficulty: 'Intermedio',
    shortDesc: 'Il comando di sicurezza più importante: tornare da te all\'istante con gioia.',
    iconName: 'Compass',
    importance: 'Ti garantisce di poter liberare il cane al parco o in natura sapendo che tornerà in ogni situazione.',
    vocalCue: '"Vieni!" o [Nome cane] + "Qui!" con voce acuta e allegra',
    handSignal: 'Braccia aperte spalancate e corpo che si piega leggermente indietro.',
    steps: [
      {
        number: 1,
        title: 'Renditi irresistibile',
        description: 'Accovacciati, allarga le braccia e fai qualche passo indietro veloce mentre lo chiami con tono giocoso.'
      },
      {
        number: 2,
        title: 'Premia l\'arrivo festoso',
        description: 'Quando arriva a te, afferra delicatamente il collare o la pettorina con una mano e premia abbondantemente con l\'altra.'
      },
      {
        number: 3,
        title: 'Il gioco del "Ping Pong"',
        description: 'In due persone distanti 5-10 metri: a turno chiamate il cucciolo festeggiando ogni arrivo con bocconcini ad alto valore.'
      },
      {
        number: 4,
        title: 'Rilascialo subito a giocare',
        description: 'Nel 90% dei richiami, premia e poi dì subito "Vai a giocare!", così non associa il richiamo alla fine del divertimento.'
      }
    ],
    commonMistakes: [
      'Chiamare il cane per poi fargli una cosa spiacevole (bagno, veterinario, sgridata).',
      'Inseguire il cucciolo se scappa (penserà sia un gioco e correrà più forte).',
      'Sgridare il cane quando finalmente arriva dopo aver tardato (puniresti il ritorno!).'
    ],
    trainerTip: 'Non consumare la parola richiamo se il cucciolo è concentrato ad annusare qualcosa di troppo eccitante: prima cattura la sua attenzione, poi chiama!'
  },
  {
    id: 'lascia',
    name: 'Lascia / Molla',
    translation: 'Drop it / Leave it',
    category: 'Sicurezza',
    difficulty: 'Intermedio',
    shortDesc: 'Rilasciare spontaneamente dalla bocca qualsiasi oggetto o preda.',
    iconName: 'Sparkles',
    importance: 'Previene avvelenamenti, ingestione di corpi estranei pericolosi (ossa, calzini, sassi) e il possesso aggressivo.',
    vocalCue: '"Lascia" (tono neutro, non arrabbiato)',
    handSignal: 'Mano chiusa a pugno che si apre mostrando un boccone migliore.',
    steps: [
      {
        number: 1,
        title: 'Inizia con il gioco dello scambio',
        description: 'Mentre il cucciolo gioca con una corda o un pupazzo di medio valore, metti sotto il suo naso un pezzo di formaggio o wurstel.'
      },
      {
        number: 2,
        title: 'Aspetta il rilascio spontaneo',
        description: 'Sentendo l\'odore irresistibile aprirà la bocca lasciando cadere il giocattolo per mangiare.'
      },
      {
        number: 3,
        title: 'Marca e consegna il premio',
        description: 'Dì "Lascia" proprio quando apre la bocca, fai click e consegna il cibo gustoso.'
      },
      {
        number: 4,
        title: 'Restituisci l\'oggetto (se sicuro)',
        description: 'Dopo che ha mangiato il boccone, ridagli subito il giocattolo dicendo "Prendi!". Imparerà che lasciare non significa perdere.'
      }
    ],
    commonMistakes: [
      'Tirare a forza l\'oggetto dalla bocca (stimola il riflesso d\'opposizione a stringere di più).',
      'Inseguire il cane quando ha un calzino o una ciabatta.',
      'Non premiare quando lascia spontaneamente.'
    ],
    trainerTip: 'Per il cane deve essere un affare d\'oro: scambiare un oggetto noioso per una ricompensa da gourmet!'
  },
  {
    id: 'guarda',
    name: 'Guarda / Focus',
    translation: 'Watch me / Eye Contact',
    category: 'Autocontrollo',
    difficulty: 'Principiante',
    shortDesc: 'Agganciare lo sguardo del conduttore ignorando le distrazioni ambientali.',
    iconName: 'Eye',
    importance: 'Il contatto visivo è il prerequisito fondamentale di ogni forma di comunicazione e disinnesca la reattività verso altri cani.',
    vocalCue: '"Guarda" o [Nome cane] con tono chiaro',
    handSignal: 'Indice che parte dal naso del cane e sale verso i tuoi occhi.',
    steps: [
      {
        number: 1,
        title: 'Porta il premio verso i tuoi occhi',
        description: 'Tieni un premio tra le dita, lascialo annusare, poi portalo dritto verso lo spazio tra le tue sopracciglia.'
      },
      {
        number: 2,
        title: 'Marca il contatto visivo',
        description: 'Nel momento in cui gli occhi del cucciolo incrociano i tuoi (anche per mezzo secondo), fai click e premia.'
      },
      {
        number: 3,
        title: 'Prolunga la durata',
        description: 'Ritarda il click di 1, 2, 3 secondi mentre il cucciolo continua a guardarti dritto negli occhi.'
      }
    ],
    commonMistakes: [
      'Premiare mentre il cane guarda la tua mano invece dei tuoi occhi.',
      'Fissare il cane con sguardo rigido o minaccioso (usa un\'espressione distesa e sorridente).'
    ],
    trainerTip: 'Premia sempre il contatto visivo spontaneo: quando sei a spasso e il cucciolo si gira a guardarti di sua iniziativa, premialo sempre con lode calorosa!'
  },
  {
    id: 'al-piede',
    name: 'Condotta / Al Piede',
    translation: 'Loose Leash / Heel',
    category: 'Obbedienza',
    difficulty: 'Avanzato',
    shortDesc: 'Camminare al fianco con il guinzaglio morbido senza tirare.',
    iconName: 'Footprints',
    importance: 'Rende le passeggiate rilassanti per entrambi ed evita lesioni a collo e colonna vertebrale causate da strattoni continui.',
    vocalCue: '"Piede" o "Insieme"',
    handSignal: 'Batter leggermente la mano sulla coscia sinistra.',
    steps: [
      {
        number: 1,
        title: 'Inizia in casa senza guinzaglio',
        description: 'Insegna al cucciolo che stare vicino alla tua gamba sinistra è il "luogo dei miracoli" dove piovono bocconcini continui.'
      },
      {
        number: 2,
        title: 'La tecnica del palo della luce',
        description: 'Quando metti il guinzaglio all\'aperto: non appena il guinzaglio si tende, fermati immediatamente immobile come un palo.'
      },
      {
        number: 3,
        title: 'Riparti solo a guinzaglio morbido',
        description: 'Non appena il cucciolo allenta la tensione (o si volta verso di te), marca con "Sì" e fai un passo avanti premiandolo al fianco.'
      },
      {
        number: 4,
        title: 'Cambi di direzione a sorpresa',
        description: 'Se accelera troppo, gira di 180° con allegria dicendo "Da questa parte!" premiandolo appena ti raggiunge.'
      }
    ],
    commonMistakes: [
      'Seguire il cane quando tira (gli insegni che tirare funziona per avanzare).',
      'Dare strattoni correttivi al guinzaglio (provocano stress e non insegnano il comportamento desiderato).',
      'Usare guinzagli allungabili Flexi durante l\'apprendimento (insegnano che c\'è sempre tensione).'
    ],
    trainerTip: 'Usa una pettorina ad H (mai a norvegese né collari a strozzo) per salvaguardare le articolazioni in crescita del cucciolo.'
  },
  {
    id: 'cuccia',
    name: 'Cuccia / Al tuo Posto',
    translation: 'Go to Bed / Place',
    category: 'Autocontrollo',
    difficulty: 'Intermedio',
    shortDesc: 'Inviare il cane sul suo cuscino o brandina e rimanerci rilassato.',
    iconName: 'Home',
    importance: 'Indispensabile quando suonano al campanello, ci sono ospiti a cena o quando il cucciolo ha bisogno di calmarsi dopo una fase di eccitazione.',
    vocalCue: '"Cuccia" o "Al tuo posto"',
    handSignal: 'Braccio teso che punta chiaramente verso il cuscino o materassino.',
    steps: [
      {
        number: 1,
        title: 'Associa la cuccia a cose straordinarie',
        description: 'Nascondi spesso biscottini o un masticativo di lunga durata (es. Kong farcito) nella cuccia per renderla una calamita positiva.'
      },
      {
        number: 2,
        title: 'Guida verso la cuccia',
        description: 'Accompagna il cucciolo con un boccone verso il materassino. Non appena mette tutte e quattro le zampe sul tessuto, fai click e premia.'
      },
      {
        number: 3,
        title: 'Chiedi il terra sulla cuccia',
        description: 'Una volta sulla cuccia, chiedi di sdraiarsi e premialo ripetutamente rilasciando il cibo direttamente sul cuscino.'
      },
      {
        number: 4,
        title: 'Rilascialo con la parola di sblocco',
        description: 'Dopo qualche minuto calmo, usa la parola di rilascio ("Libero!").'
      }
    ],
    commonMistakes: [
      'Mandare il cane a cuccia come punizione (la cuccia deve essere un rifugio sicuro, mai una prigione).',
      'Disturbarlo o accarezzarlo insistentemente quando sta riposando nella sua cuccia.'
    ],
    trainerTip: 'Fai trovare un giocattolo da masticare quando va a cuccia: la masticazione stimola il rilascio di endorfine che calmano naturalmente il sistema nervoso.'
  }
];

export const POSITIVE_REINFORCEMENT_TECHNIQUES: TechniqueGuide[] = [
  {
    id: 'marker-timing',
    title: 'Il Segnale Marker & Il Tempismo',
    subtitle: 'La fotocamera mentale per congelare il comportamento corretto',
    tag: 'Fondamenta',
    iconName: 'Timer',
    summary: 'I cani associano causa ed effetto entro un intervallo massimo di 1,5 secondi. Il "marker" (un Clicker o una parola secca come "SÌ!") funge da ponte tra l\'azione del cane e l\'arrivo della ricompensa.',
    coreRule: 'Tempismo perfetto: Click esatto nell\'istante dell\'azione, seguito dal premio entro 1-2 secondi. Il Click promette SEMPRE un premio!',
    bulletPoints: [
      {
        title: 'Cos\'è il Clicker?',
        desc: 'Una scatoletta con linguetta di metallo che emette un suono neutro, nitido e costante, privo di sfumature emotive umane.'
      },
      {
        title: 'Caricare il Marker (Condizionamento)',
        desc: 'Dedica 2 minuti al giorno: Click -> Premio immediato (senza chiedere nulla). Ripeti 20 volte finché al suono del click il cane volge lo sguardo cercando il cibo con gli occhi luminosi.'
      },
      {
        title: 'La regola aurea del contratto',
        desc: 'Se fai click per errore, devi COMUNQUE premiare il cane. Il marker non deve mai perdere il suo valore di promessa assoluta.'
      }
    ],
    practicalExample: 'Se il cucciolo si siede, clicca quando il sedere tocca il pavimento. Se clicchi mentre si sta già rialzando, premierai l\'alzarsi!'
  },
  {
    id: 'reward-ladder',
    title: 'La Scala delle Ricompense (Jackpot)',
    subtitle: 'Calibrare il valore del premio in base alla difficoltà ambientale',
    tag: 'Motivazione',
    iconName: 'Award',
    summary: 'Non tutti i premi sono uguali: una crocchetta secca funziona in salotto senza distrazioni, ma al parco contro un gatto serve una bistecca o un gioco sfrenato.',
    coreRule: 'Più alta è la distrazione o la difficoltà dell\'esercizio, più pregiata deve essere la ricompensa utilizzata.',
    bulletPoints: [
      {
        title: 'Livello 1 - Basso Valore',
        desc: 'Crocchette quotidiane della sua pappa. Ideali per ripetizioni semplici in cucina o salotto.'
      },
      {
        title: 'Livello 2 - Medio Valore',
        desc: 'Biscottini commerciali morbidi, pezzetti di mela o carota. Ottimi per il giardino di casa o passeggiate tranquille.'
      },
      {
        title: 'Livello 3 - Alto Valore (Jackpot)',
        desc: 'Cubetti di parmigiano, tacchino bollito, wurstel o paté di fegato. Da riservare per richiamo d\'emergenza o ambienti ricchi di cani.'
      },
      {
        title: 'Premi non alimentari',
        desc: 'Il gioco del tira e molla, il via libera per andare ad annusare un albero, o complimenti affettuosi.'
      }
    ],
    practicalExample: 'Tieni un marsupio da addestramento con 80% premi normali e 20% "pezzi d\'oro" per ricompensare una risposta rapida a un richiamo difficile.'
  },
  {
    id: 'three-methods',
    title: 'I 3 Metodi: Luring, Cattura e Shaping',
    subtitle: 'Come far comparire un comportamento senza spingere o forzare',
    tag: 'Metodologia',
    iconName: 'Workflow',
    summary: 'Il rinforzo positivo non forza mai fisicamente il cane. Sfrutta invece l\'intelligenza e l\'iniziativa spontanea del cucciolo attraverso tre canali collaudati.',
    coreRule: 'Lascia che il cucciolo pensi e provi. Il cane impara al 300% più in fretta quando scopre lui stesso quale azione sblocca la ricompensa.',
    bulletPoints: [
      {
        title: '1. Luring (Adescamento con esca)',
        desc: 'Usi il cibo come una calamita per guidare il muso e il corpo nella postura desiderata (es. guidare nel seduto). Svanisci l\'esca entro 10-15 prove per non creare dipendenza.'
      },
      {
        title: '2. Cattura (Capturing)',
        desc: 'Aspetti che il cane faccia naturalmente un comportamento (es. uno sbadiglio, stirarsi, andare spontaneamente sulla cuccia), clicchi e premi festosamente.'
      },
      {
        title: '3. Shaping (Modellamento per approssimazioni)',
        desc: 'Come nel gioco "acqua/fuoco": premi piccoli passi graduali che compongono il comportamento finale (es. guarda la scatola -> fa un passo verso la scatola -> tocca la scatola).'
      }
    ],
    practicalExample: 'Per insegnare a toccare il tuo palmo con il naso ("Target"): porgi la mano aperta. Il cucciolo incuriosito si avvicinerà per annusare: CLICK non appena sfiora la pelle!'
  },
  {
    id: 'three-d-rule',
    title: 'La Regola delle 3D: Distanza, Durata, Distrazione',
    subtitle: 'La formula scientifica per generalizzare qualsiasi comando',
    tag: 'Generalizzazione',
    iconName: 'Layers',
    summary: 'Un cane può eseguire il "Resta" impeccabilmente nel corridoio di casa ma fallire miseramente all\'aperto. Questo accade perché i cani non generalizzano facilmente senza un metodo.',
    coreRule: 'Modifica SEMPRE una sola "D" alla volta. Se aumenti la Distanza, riduci al minimo Durata e Distrazioni.',
    bulletPoints: [
      {
        title: 'Durata',
        desc: 'Quanto a lungo il cane riesce a mantenere la posizione (da 2 secondi a 2 minuti).'
      },
      {
        title: 'Distanza',
        desc: 'Quanto ti allontani dal cane durante l\'esercizio (da 30 cm a 10 metri o fuori dalla visuale).'
      },
      {
        title: 'Distrazione',
        desc: 'Stimoli esterni presenti: rumori di traffico, palline che rimbalzano, altri cani, cibo a terra.'
      }
    ],
    practicalExample: 'Se vuoi allenare il "Resta" al parco (alta Distrazione), posizionati a soli 30 cm dal cane (zero Distanza) e chiedigli di resistere solo per 3 secondi (bassa Durata).'
  },
  {
    id: 'redirection-no-punishment',
    title: 'Reindirizzare anziché Punire',
    subtitle: 'Gestire morsi, salti e pipì sul tappeto senza urla o percosse',
    tag: 'Gestione Errori',
    iconName: 'HeartHandshake',
    summary: 'Le punizioni (sgridate, giornali arrotolati, spintonare) aumentano l\'ansia, creano sfiducia verso il proprietario e mascherano i sintomi senza risolvere il motivo del comportamento.',
    coreRule: 'Chiediti sempre: "Cosa vorrei che facesse il cane invece di questo?" e insegna l\'alternativa incompatibile premiandola.',
    bulletPoints: [
      {
        title: 'Morsi alle mani o ai pantaloni',
        desc: 'È un normale comportamento esplorativo e di gioco nei cuccioli. Emetti un piccolo "Ahi!", immobilizza la mano e porgi subito un giocattolo masticabile adatto.'
      },
      {
        title: 'Salto addosso per salutare',
        desc: 'Incrocia le braccia, voltati di spalle e togli ogni attenzione (nemmeno lo sguardo). Quando le 4 zampe sono di nuovo a terra, girati e premialo con affetto.'
      },
      {
        title: 'Bisogni in casa',
        desc: 'Non mettere MAI il muso nella pipì (inutile e dannoso). Pulisci con detergente enzimatico (senza ammoniaca) e porta fuori il cucciolo ogni volta dopo nanna, pappa e gioco.'
      }
    ],
    practicalExample: 'Un cane non può saltarti addosso se ha il sedere appoggiato a terra: insegna il "Seduto" come richiesta educata per ricevere le coccole quando torni a casa.'
  },
  {
    id: 'session-duration',
    title: 'Micro-Sessioni & Gestione dello Stress',
    subtitle: 'Massimizzare la concentrazione del cucciolo senza bruciarlo',
    tag: 'Fisiologia Cucciolo',
    iconName: 'BatteryCharging',
    summary: 'La soglia di attenzione di un cucciolo di 2-5 mesi è simile a quella di un bambino piccolo: dura circa 3-5 minuti consecutivi. Meglio 3 sessioni lampo al giorno che 30 minuti estenuanti.',
    coreRule: 'Termina SEMPRE ogni sessione con un successo facile e un gioco liberatorio, lasciando al cucciolo la voglia di continuare.',
    bulletPoints: [
      {
        title: 'Micro-sessioni da 3 a 5 minuti',
        desc: 'Bastano 10-15 bocconcini a sessione. Quando finisci i premi della tazza, la sessione è conclusa.'
      },
      {
        title: 'Segnali di sovraccarico mentale (Calming signals)',
        desc: 'Se il cucciolo inizia a grattarsi insistentemente, sbadiglia fuori contesto, starnutisce o si distrae, è stanco mentalmente. Fermati subito senza insistere.'
      },
      {
        title: 'Regola del "Torno indietro di un passo"',
        desc: 'Se il cane sbaglia 2 volte di fila lo stesso esercizio, stai chiedendo troppo. Riduci la difficoltà per farlo riuscire, clicca, premia e chiudi la sessione felicemente.'
      }
    ],
    practicalExample: 'Se stai allenando il "Terra" e dopo 3 minuti il cucciolo comincia a mordicchiarti i lacci delle scarpe, chiedi un semplicissimo "Seduto", premialo e dai il via libera: "Bravo, finito!"'
  }
];

export const INITIAL_TRAINING_SESSIONS: TrainingSession[] = [
  {
    id: 'sess-1',
    date: '2026-09-18',
    time: '10:30',
    commandId: 'seduto',
    commandName: 'Seduto',
    durationMinutes: 4,
    rating: 5,
    distractionLevel: 'bassa',
    puppyMood: 'attento',
    treatUsed: 'Pezzetti di mela e crocchette',
    notes: 'Ottima risposta al gesto manuale. Ha capito subito il movimento verso l\'alto.'
  },
  {
    id: 'sess-2',
    date: '2026-09-18',
    time: '17:15',
    commandId: 'guarda',
    commandName: 'Guarda',
    durationMinutes: 3,
    rating: 4,
    distractionLevel: 'bassa',
    puppyMood: 'gioioso',
    treatUsed: 'Biscottino morbido',
    notes: 'Contatto visivo tenuto per circa 2 secondi. Molto motivato e felice.'
  },
  {
    id: 'sess-3',
    date: '2026-09-19',
    time: '11:00',
    commandId: 'terra',
    commandName: 'Terra / Giù',
    durationMinutes: 5,
    rating: 3,
    distractionLevel: 'bassa',
    puppyMood: 'attento',
    treatUsed: 'Cubetti di formaggio',
    notes: 'Ha fatto un po\' di resistenza ad abbassare i gomiti, ma usando il tappeto antiscivolo è andata molto meglio.'
  },
  {
    id: 'sess-4',
    date: '2026-09-19',
    time: '16:45',
    commandId: 'richiamo',
    commandName: 'Vieni / Richiamo',
    durationMinutes: 5,
    rating: 4,
    distractionLevel: 'media',
    puppyMood: 'gioioso',
    treatUsed: 'Tacchino bollito',
    notes: 'Provato in giardino a 5 metri. È corso subito appena mi sono accovacciato a braccia aperte!'
  },
  {
    id: 'sess-5',
    date: '2026-09-20',
    time: '09:15',
    commandId: 'seduto',
    commandName: 'Seduto',
    durationMinutes: 4,
    rating: 5,
    distractionLevel: 'media',
    puppyMood: 'attento',
    treatUsed: 'Crocchette',
    notes: 'Eseguito prima di aprire la porta del giardino senza saltare. Grande autocontrollo!'
  }
];

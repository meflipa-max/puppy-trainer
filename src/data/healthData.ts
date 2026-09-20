export interface HealthTopic {
  id: string;
  category: 'vaccini' | 'sterilizzazione' | 'emergenza';
  categoryLabel: string;
  title: string;
  subtitle: string;
  badge: string;
  badgeColor: string;
  iconName: string;
  summary: string;
  whatCouldHappen?: {
    scenario: string;
    symptoms: string[];
  };
  keyPoints: {
    title: string;
    description: string;
  }[];
  criticalDoNot: string[];
  vetAdvice: string;
}

export const HEALTH_TOPICS: HealthTopic[] = [
  // 1. VACCINAZIONI & PREVENZIONE
  {
    id: 'vaccini-piano',
    category: 'vaccini',
    categoryLabel: 'Prevenzione & Salute',
    title: 'Piano Vaccinale del Cucciolo & Prime Uscite',
    subtitle: 'Il calendario essenziale per proteggere il cucciolo da malattie letali (Parvovirus, Cimurro, Epatite, Leptospirosi).',
    badge: 'Fondamentale',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    iconName: 'Syringe',
    summary:
      'Il sistema immunitario del cucciolo perde progressivamente gli anticorpi materni tra le 6 e le 12 settimane. I vaccini "core" sono la barriera vitale contro virus letali.',
    whatCouldHappen: {
      scenario:
        'Far camminare il cucciolo non ancora vaccinato in aree frequentate da cani sconosciuti o dove sono presenti feci infette.',
      symptoms: [
        'Parvovirosi (gastroenterite virale): vomito emorragico incoercibile, febbre alta, rapida disidratazione fatale in 48-72 ore.',
        'Cimurro: tosse, scolo nasale e oculare, convulsioni neurologiche progressive.',
        'Leptospirosi (trasmessa da urina di topi in pozze d\'acqua): insufficienza renale ed epatica acuta, trasmissibile anche all\'uomo.',
      ],
    },
    keyPoints: [
      {
        title: '6-8 Settimane: Primo vaccino Core (Puppy)',
        description: 'Prima dose contro Parvovirus e Cimurro prima del distacco dall\'allevamento o dalla cucciolata.',
      },
      {
        title: '11-12 Settimane: Secondo Richiamo Polivalente',
        description: 'Rinforzo vaccinale (Cimurro, Epatite, Parvovirus, Parainfluenza) + prima dose di Leptospirosi.',
      },
      {
        title: '16 Settimane: Completamento Ciclo Cucciolo',
        description: 'Terzo richiamo polivalente + secondo richiamo Leptospirosi. Da questo momento la copertura anticorpale è massima.',
      },
      {
        title: 'Il Dilemma Socializzazione vs Rischio Infettivo',
        description: 'Non isolare il cane in casa fino a 4 mesi! Portalo fuori IN BRACCIO o in borsa per fargli vedere il mondo senza farlo scendere in terra dove potrebbero esserci feci o deiezioni.',
      },
      {
        title: 'Antiparassitari e Sverminazione',
        description: 'Sverminare prima delle vaccinazioni. Protezione mensile contro pulci, zecche, zanzare e flebotomi (vettori di Leishmaniosi e Filaria cardiopolmonare).',
      },
    ],
    criticalDoNot: [
      'NON portare il cucciolo nei recinti o nelle aree cani pubbliche prima del completamento del ciclo vaccinale.',
      'NON farlo bere da pozze d\'acqua stagnante (rischio leptospirosi e giardia).',
      'NON ritardare le date dei richiami fissate dal veterinario: se passa troppo tempo bisogna ricominciare il ciclo.',
    ],
    vetAdvice:
      'Chiedi al veterinario se nella tua zona è consigliato anche il vaccino contro la Tosse dei Canili (Bordetella) o la Leishmaniosi.',
  },

  // 2. STERILIZZAZIONE E CASTRAZIONE
  {
    id: 'sterilizzazione-guida',
    category: 'sterilizzazione',
    categoryLabel: 'Benessere & Comportamento',
    title: 'Sterilizzazione & Castrazione Consapevole',
    subtitle: 'Tempistiche ideali, benefici medici comprovati, impatto sul comportamento e miti da sfatare.',
    badge: 'Decisione Importante',
    badgeColor: 'bg-purple-50 text-purple-800 border-purple-200',
    iconName: 'HeartPulse',
    summary:
      'La sterilizzazione non è solo una scelta anticoncezionale, ma un intervento preventivo che influisce sulla longevità e sulla serenità del cane e della famiglia.',
    whatCouldHappen: {
      scenario: 'Mancata sterilizzazione o intervento eseguito nel momento sbagliato.',
      symptoms: [
        'Nelle femmine non sterilizzate: piometra (infezione purulenta dell\'utero potenzialmente letale, che colpisce 1 femmina su 4 dopo i 6 anni), gravidanze isteriche frequenti con mastite, tumori mammari maligni.',
        'Nei maschi interi: iperplasia prostatica benigna, tumori ai testicoli, fughe incontrollate attratti da femmine in calore con rischio investimento stradale.',
      ],
    },
    keyPoints: [
      {
        title: 'Femmina: Tempistica Ideale',
        description: 'La maggior parte dei veterinari consiglia tra il primo e il secondo calore (o prima del primo per razze toy/piccole). Riduce il rischio di tumori mammari di oltre il 90%.',
      },
      {
        title: 'Maschio: Attendere la Maturità Scheletrica',
        description: 'Per cani di taglia media e grande, gli ormoni sessuali sono cruciali per la corretta chiusura delle cartilagini di accrescimento. Si consiglia spesso di aspettare i 12-18 mesi.',
      },
      {
        title: 'Mito da sfatare: "Deve fare almeno una cucciolata"',
        description: 'Completamente falso dal punto di vista medico ed etologico. I cani non provano il desiderio psicologico di maternità/paternità e una gravidanza comporta rischi sanitari.',
      },
      {
        title: 'Impatto sul Comportamento',
        description: 'Riduce la marcatura urinaria ansiosa e l\'aggressività intraspecifica da competizione sessuale. NON risolve però problemi di paura, fobia o iperattività, che richiedono addestramento.',
      },
    ],
    criticalDoNot: [
      'NON sterilizzare precocemente razze giganti (es. Alani, Rottweiler, Bovari) prima dei 12-14 mesi senza consultare lo specialista ortopedico.',
      'NON credere che il cane diventi apatico o depresso dopo l\'operazione; il metabolismo rallenta leggermente (occorre ridurre le calorie del 15-20% per evitare sovrappeso).',
    ],
    vetAdvice:
      'Valuta con il veterinario anche la castrazione chimica reversibile temporanea (impianto a lento rilascio) per verificare in anticipo l\'impatto comportamentale.',
  },

  // 3. EMERGENZE: INGESTIONE TOSSICA E CORPI ESTRANEI
  {
    id: 'emergenza-tossici-corpi-estranei',
    category: 'emergenza',
    categoryLabel: 'Pronto Soccorso',
    title: 'Ingestione di Tossici o Corpi Estranei',
    subtitle: 'Cioccolato, xilitolo, veleni, calzini, sassi: riconoscere i sintomi e intervenire nei primi 30 minuti.',
    badge: 'Codice Rosso',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    iconName: 'AlertTriangle',
    summary:
      'I cuccioli esplorano il mondo con la bocca. L\'ingestione accidentale di alimenti vietati o oggetti indigeribili è la prima causa di ricovero d\'urgenza.',
    whatCouldHappen: {
      scenario:
        'Il cucciolo mangia una tavoletta di cioccolato fondente dimenticata sul tavolo, un pacchetto di chewing-gum con xilitolo, o ingoia un calzino durante il gioco del tira e molla.',
      symptoms: [
        'Cioccolato (Teobromina): tachicardia, respiro affannoso, vomito, iperattività seguita da convulsioni e arresto cardiaco.',
        'Xilitolo (dolcificante gomma da masticare): ipoglicemia fulminante in 15 minuti, collasso, convulsioni e insufficienza epatica acuta.',
        'Corpo estraneo (calzino, pallina, nocciolo): ostruzione intestinale con vomito a getto continuo, addome teso e dolente, necrosi dell\'ansa intestinale se non operato.',
        'Uva e uvetta: insufficienza renale acuta improvvisa anche con pochissimi acini.',
      ],
    },
    keyPoints: [
      {
        title: '1. Conserva la Confezione o l\'Oggetto Rimasto',
        description: 'Sapere la quantità esatta e la concentrazione (es. % di cacao fondente) permette al veterinario di calcolare la dose tossica per chilo.',
      },
      {
        title: '2. Chiama Subito la Clinica Prima di Partire',
        description: 'Avvisa che stai arrivando: prepareranno la sala emergenza e gli emetici idonei per svuotare lo stomaco prima che la sostanza entri in circolo.',
      },
      {
        title: '3. La Finestra d\'Oro (entro 1-2 ore)',
        description: 'Se il cane arriva in clinica entro 60-90 minuti, il veterinario può indurre il vomito in sicurezza farmacologica (Apomorfina), evitando chirurgia o lavanda gastrica.',
      },
    ],
    criticalDoNot: [
      'NON dare latte (facilita l\'assorbimento di molti veleni liposolubili).',
      'NON dare sale grosso o acqua salata per farlo vomitare: causa intossicazione da sodio ed edema cerebrale letale!',
      'NON indurre MAI il vomito se ha ingerito candeggina, acidi o oggetti taglienti (rischio perforazione dell\'esofago al ritorno).',
    ],
    vetAdvice:
      'Tieni memorizzato sul telefono il numero del Centro Antiveleni Veterinario o della Clinica H24 più vicina alla tua abitazione.',
  },

  // 4. EMERGENZE: TORSIONE DELLO STOMACO (GDV)
  {
    id: 'emergenza-torsione-stomaco',
    category: 'emergenza',
    categoryLabel: 'Pronto Soccorso',
    title: 'Torsione Gastrica (GDV)',
    subtitle: 'La più grave emergenza chirurgica: dilatazione e torsione dello stomaco con blocco della circolazione.',
    badge: 'Urgenza Assoluta',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    iconName: 'Activity',
    summary:
      'Lo stomaco si gonfia rapidamente di gas e ruota sul proprio asse, strozzando vasi sanguigni e milza. Tipica di cani a torace profondo (Pastori Tedeschi, Labrador, Alani, Setter), ma possibile in tutti.',
    whatCouldHappen: {
      scenario:
        'Pasto unico abbondante mangiato voracemente seguito da corse intense, salti in giardino o grande quantità di acqua bevuta tutta insieme.',
      symptoms: [
        'Tentativi continui, strazianti e a vuoto di rimettere (esce solo bava o schiuma bianca).',
        'Addome visibilmente gonfio, duro e teso (se picchiettato produce un suono vuoto a tamburo).',
        'Irrequietezza estrema: non riesce a sdraiarsi, cammina in tondo con la testa bassa.',
        'Gengive pallide o bluastre, respiro corto e debolezza improvvisa.',
      ],
    },
    keyPoints: [
      {
        title: 'Regola Fondamentale: Stop Movimento dopo i Pasti',
        description: 'Riposo assoluto per almeno 1 ora e mezza dopo aver mangiato. Niente corse, lanci di pallina o giochi scatenati.',
      },
      {
        title: 'Frazionare la Raziona Giornaliera',
        description: 'Dividere la pappa in 2 o 3 pasti più piccoli al giorno anziché un unico pastone serale.',
      },
      {
        title: 'Usa Ciotole Antigozzoviglio (Slow-Feeder)',
        description: 'Impedisce al cucciolo di ingurgitare aria insieme alle crocchette.',
      },
    ],
    criticalDoNot: [
      'NON aspettare la mattina o sperare che "passi da solo": ogni 30 minuti di ritardo raddoppia la probabilità di decesso.',
      'NON dare bicarbonato, acqua o pane pensando a una semplice indigestione.',
    ],
    vetAdvice:
      'Chiedi al veterinario se per la razza del tuo cane è indicata la gastropessi preventiva (fissaggio dello stomaco alle costole durante la sterilizzazione).',
  },

  // 5. EMERGENZE: COLPO DI CALORE
  {
    id: 'emergenza-colpo-calore',
    category: 'emergenza',
    categoryLabel: 'Pronto Soccorso',
    title: 'Colpo di Calore & Asfalto Rovente',
    subtitle: 'I cani non sudano: la temperatura corporea può superare i 41°C in pochi minuti provocando danni cerebrali.',
    badge: 'Urgenza Estiva',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    iconName: 'Flame',
    summary:
      'I cani dissipano il calore corporeo solo ansimando e attraverso i polpastrelli. Razze brachicefale (Bouledogue, Carlini, Boxer) e cuccioli sono a rischio estremo.',
    whatCouldHappen: {
      scenario:
        'Cane lasciato nell\'auto parcheggiata anche con i finestrini socchiusi, oppure passeggiata sotto il sole estivo su asfalto a 60°C.',
      symptoms: [
        'Respiro ansimante violentissimo con bava densa e appiccicosa.',
        'Lingua e gengive di colore rosso scuro o violaceo.',
        'Andatura barcollante (atassia), disorientamento e collasso a terra.',
        'Bruciature e scollamento della pelle dei cuscinetti plantari per asfalto rovente.',
      ],
    },
    keyPoints: [
      {
        title: 'Primo Soccorso Immediato',
        description: 'Spostare subito all\'ombra e raffreddare gradualmente bagnando collo, ascelle, inguine e zampe con acqua fresca a temperatura ambiente.',
      },
      {
        title: 'La Regola dei 5 Secondi per l\'Asfalto',
        description: 'Appoggia il dorso della tua mano sull\'asfalto: se dopo 5 secondi scotta per te, ustionerà i polpastrelli del tuo cucciolo.',
      },
      {
        title: 'Ventilazione Continua',
        description: 'Crea corrente d\'aria con un ventilatore o ventaglio e trasporta il cane con aria condizionata verso la clinica più vicina.',
      },
    ],
    criticalDoNot: [
      'NON usare ghiaccio o acqua ghiacciata! Causa vasocostrizione periferica intrappolando il calore negli organi interni e portando a shock termico.',
      'NON lasciare MAI il cane in macchina nei mesi caldi, neppure per 3 minuti.',
    ],
    vetAdvice:
      'Anche se il cane sembra riprendersi dopo il raffreddamento, portalo comunque in clinica per monitorare la coagulazione e la funzionalità renale nelle ore successive.',
  },

  // 6. EMERGENZE: PROCESSIONARIA E MORSI DI VIPERA
  {
    id: 'emergenza-processionaria-vipera',
    category: 'emergenza',
    categoryLabel: 'Pronto Soccorso',
    title: 'Processionaria, Morsi di Vipera & Punture',
    subtitle: 'I pericoli della natura in primavera ed estate: peli urticanti necrotizzanti e veleni emotossici.',
    badge: 'Pericolo Natura',
    badgeColor: 'bg-orange-100 text-orange-900 border-orange-300',
    iconName: 'Footprints',
    summary:
      'In primavera (febbraio-maggio) sotto pini e querce scendono le processionarie. In estate, nei prati e sentieri montani, le vipere si nascondono tra rocce ed erba alta.',
    whatCouldHappen: {
      scenario:
        'Il cucciolo annusa incuriosito una fila di bruchi di processionaria sul sentiero, oppure infila il muso in un cespuglio disturbando una vipera.',
      symptoms: [
        'Contatto con Processionaria: salivazione esagerata istantanea, la lingua si ingrossa drammaticamente rischiando soffocamento e necrosi con perdita di pezzi di lingua.',
        'Morso di Vipera: due fori distanziati di circa 6-8 mm, gonfiore duro e violaceo a rapida espansione, zoppia, abbattimento e tremori.',
      ],
    },
    keyPoints: [
      {
        title: 'Contatto Processionaria: Lavaggio Immediato',
        description: 'Sciacquare abbondantemente la bocca con getti d\'acqua (meglio se con acqua e bicarbonato con una siringa senza ago). Proteggi le tue mani con guanti per non ustionarti.',
      },
      {
        title: 'Morso di Vipera: Mantieni il Cane Fermo',
        description: 'Ogni movimento accelera la diffusione del veleno per via linfatica. Prendi il cane in braccio, mantienilo calmo e raggiungi il veterinario d\'urgenza.',
      },
    ],
    criticalDoNot: [
      'NON toccare i peli della processionaria a mani nude.',
      'NON incidere, NON succhiare il morso di vipera e NON applicare lacci emostatici (creano necrosi ischemica gravissima).',
    ],
    vetAdvice:
      'Durante le passeggiate nei boschi porta con te una borraccia extra e tieni d\'occhio le cime dei pini per individuare i nidi bianchi a forma di bozzolo.',
  },

  // 7. EMERGENZE: SOFFOCAMENTO E CORPO ESTRANEO IN GOLA
  {
    id: 'emergenza-soffocamento',
    category: 'emergenza',
    categoryLabel: 'Pronto Soccorso',
    title: 'Soffocamento & Manovra di Heimlich Canina',
    subtitle: 'Come intervenire in pochi secondi quando un gioco, un osso o un pezzo di cibo ostruisce la trachea.',
    badge: 'Intervento Immediato',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    iconName: 'ShieldAlert',
    summary:
      'Se le vie respiratorie sono completamente occluse, il cane perde i sensi in 90-120 secondi. Conoscere la manovra salvavita fa la differenza prima di arrivare in clinica.',
    whatCouldHappen: {
      scenario:
        'Una pallina troppo piccola viene inghiottita al volo e si incastra nell\'ipofaringe, oppure un bastone si spezza conficcandosi nel palato.',
      symptoms: [
        'Il cane porta disperatamente le zampe al muso, estende il collo con tosse asfittica.',
        'Rumore respiratorio acuto o assenza totale di suono con torace che si muove a vuoto.',
        'Gengive che virano rapidamente da rosa a blu/grigio cianotico, collasso.',
      ],
    },
    keyPoints: [
      {
        title: '1. Ispezione Rapida del Cavo Orale',
        description: 'Apri la bocca premendo le labbra contro i denti superiori (per non farti mordere accidentalmente). Se l\'oggetto è visibile e accessibile, estrailo con le dita a uncino o una pinza.',
      },
      {
        title: '2. Manovra di Heimlich (Cane Piccolo/Cucciolo)',
        description: 'Tieni il cucciolo con la schiena contro il tuo petto a testa in giù. Con la mano a pugno applica 4-5 compressioni verso l\'alto e verso l\'interno proprio sotto lo sterno.',
      },
      {
        title: '3. Manovra di Heimlich (Cane Medio/Grande)',
        description: 'In piedi dietro al cane in piedi o su un fianco, posiziona le mani a coppa dietro l\'ultima costola sull\'addome e premi con decisione in avanti e verso l\'alto.',
      },
    ],
    criticalDoNot: [
      'NON spingere alla cieca in gola se non vedi l\'oggetto: rischieresti di incastrarlo ancora più in profondità.',
      'NON dare mai palline da tennis usurate o giocattoli più piccoli della bocca del cane.',
    ],
    vetAdvice:
      'Regola d\'oro per i giochi: la dimensione del giocattolo deve essere sempre maggiore della distanza tra i premolari del cucciolo.',
  },
];

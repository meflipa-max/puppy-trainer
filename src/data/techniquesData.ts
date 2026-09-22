import { TechniqueGuide } from '../types';

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

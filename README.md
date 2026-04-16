# App-meteo-corso-Ai-Generation

## Obiettivo

L'app permette di:
- cercare una città
- recuperare il meteo attuale tramite API
- gestire errori comuni
- ricerche recenti salvate nel browser

## Funzionalità incluse

- Chiamata API funzionante verso Open-Meteo Geocoding API
- Chiamata API funzionante verso Open-Meteo Forecast API
- Gestione errori per città non trovata o risposta API non valida
- Visualizzazione di:
  - temperatura
  - velocità del vento
  - descrizione meteo
  - orario del dato
- Ricerche recenti salvate con `localStorage`
- Due file di test automatici con Node.js
- README e commenti base nel codice

## Struttura progetto

```text
weather-app-junior/
├── data/
│   └── sample-response.json
├── src/
│   ├── app.js
│   ├── index.html
│   ├── style.css
│   ├── weatherService.js
│   └── weatherUtils.js
├── tests/
│   ├── weatherService.test.js
│   └── weatherUtils.test.js
├── .gitignore
├── package.json
└── README.md
```

## Come avviare il progetto

### Opzione più semplice
Apri `src/index.html` nel browser.

### Opzione consigliata
Usa un piccolo server locale, per esempio con VS Code e Live Server.

## Come eseguire i test

Assicurati di avere Node.js installato, poi esegui:

```bash
npm test
```

## Cosa ho imparato

- [x] Chiamata API funzionante
- [x] Gestione errori
- [x] Funzionalità avanzate
- [x] Fare test
- [x] Consultare documentazione
- [x] Considerazioni su sicurezza ed etica

## Sicurezza ed etica

### Sicurezza
- L'input viene ripulito con una funzione semplice prima della chiamata API.
- I dati dell'utente non vengono salvati su server esterni.
- L'app usa `textContent` per mostrare i risultati e non inserisce HTML arbitrario proveniente dall'utente.
- Non ci sono chiavi segrete nel codice.

### Etica e uso responsabile dell'AI
- Il codice può essere stato supportato da strumenti AI, ma va sempre letto, capito e testato prima della consegna.
- È importante citare le fonti esterne usate per API, librerie o ispirazioni.
- Non bisogna presentare come “proprio” codice che non si comprende.

## Possibili miglioramenti futuri

- Aggiungere icone meteo
- Mostrare più dettagli, come umidità e precipitazioni
- Permettere il confronto tra più città contemporaneamente
- Migliorare accessibilità e design responsive

## Licenza

Questo progetto è distribuito con licenza MIT.

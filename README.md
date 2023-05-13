# TridentSuisseTest

## Requisiti
- Node.js
- MongoDB

## Procedura avvio
1. Installare e avviare il servizio MongoDB seguendo le istruzioni riportate nella [documentazione ufficiale](https://www.mongodb.com/docs/manual/administration/install-community/).

2. Installare Node.js seguendo le istruzioni riportate nella [pagina di download ufficiale](https://nodejs.org/it/download).

3. Aprire il file `TridentSuisseTest/web_app_test/components/Weather.tsx` e modificare il valore della costante `API_KEY` con la propria chiave di OpenWeatherMap.

4. Aprire il file `TridentSuisseTest/backend` e modificare se necessario la stringa di connessione a mongoDB (attualmente 'mongodb://localhost:27017/trident')

5. Aprire un terminale e spostarsi nella cartella del progetto web app tramite il comando:
```
cd TridentSuisseTest/web_app_test
```
6. Eseguire il comando per installare le dipendenze necessarie:
```
npm i
```
7. Eseguire il comando per avviare la web app:
```
npm start
```
8. Aprire un secondo terminale e spostarsi nella cartella del progetto backend tramite il comando:
```
cd TridentSuisseTest/backend
```
9. Eseguire il comando per installare le dipendenze necessarie:
```
npm i
```
10. Eseguire il comando per compilare il backend:
```
tsc
```
11. Eseguire il comando per avviare il backend:
```
node dist/server.js
```
12. Per eseguire la suite di unit test, aprire un terminale nella cartella `TridentSuisseTest/web_app_test` e lanciare il comando:
```
npm test
```

# Vintor

## Inhoudsopgave

1. [Inleiding](#inleiding)
2. [Screenshot](#screenshot)
3. [Gebruikte technieken en frameworks](#gebruikte-technieken-en-frameworks)
4. [Project lokaal opzetten](#project-lokaal-opzetten)
5. [Inloggegevens](#inloggegevens)
6. [Overige npm-commando's](#overige-npm-commandos)

## Inleiding

Vintor is een community-platform voor liefhebbers van oldtimers en klassiekers. Gebruikers plaatsen posts over onderwerpen zoals motor, carburateur, restauratie, elektrisch, interieur en onderhoud, en gaan met elkaar in gesprek via reacties.

Belangrijkste functionaliteiten:

- Overzicht van alle posts op de homepagina, met titel, beschrijving, auteur, datum, tags en aantal likes/reacties.
- Posts zoeken op titel, beschrijving of tag via de zoekbalk.
- Populaire tags in de zijbalk als snelkoppeling naar gefilterde zoekresultaten.
- Detailpagina per post met een afbeeldingencarrousel, like-functionaliteit en reacties.
- Registreren en inloggen; ingelogde gebruikers kunnen reageren op posts.
- Nieuwe posts aanmaken met titel, beschrijving, tags (max. 2) en afbeeldingen (max. 5, elk max. 2MB).
- Eigen posts beheren (bewerken) via "Mijn posts".

## Screenshot

![alt text](public/home.png)

## Gebruikte technieken en frameworks

- **React 19** — library voor het bouwen van de UI met componenten.
- **Vite** — build tool en development server.
- **React Router DOM** — routering tussen pagina's (Home, Login, Registreren, Zoeken, Post, Mijn posts, Nieuwe post, Post aanpassen).
- **Axios** — HTTP-client voor communicatie met de backend-API.
- **JWT Decode** — uitlezen van de gebruikersgegevens in het JSON Web Token na het inloggen.
- **React Select** — dropdown-component voor het selecteren van tags bij het aanmaken van een post.
- **Swiper** — afbeeldingencarrousel op de postdetailpagina.
- **Fuse.js** — fuzzy search, gebruikt voor het zoeken naar posts.

De applicatie communiceert met de gedeelde NOVI-backend-API, die niet in deze repository zit en apart draait.

## Project lokaal opzetten

### Vereisten

- [Node.js](https://nodejs.org/) (versie 18 of hoger) inclusief npm.

### Stappen

1. **Repository clonen of downloaden**

   git clone <url-van-deze-repository>
   cd Vintor

2. **Dependencies installeren**

   npm install

3. **Omgevingsvariabelen configureren**

   Maak in de root van het project een bestand aan met de naam `.env` en vul het volgende in:

   VITE_API_BASE_URL=https://novi-backend-api-wgsgz.ondigitalocean.app/api
   VITE_API_DOMAIN=https://novi-backend-api-wgsgz.ondigitalocean.app
   VITE_API_PROJECT_ID=0aa01fc3-b0dd-4ad7-9f9e-82b0c9688601
   - `VITE_API_BASE_URL` — basis-URL van de API-endpoints (login, posts, comments, ...).
   - `VITE_API_DOMAIN` — domein van de backend, gebruikt om afbeeldingen op te bouwen die de API teruggeeft.
   - `VITE_API_PROJECT_ID` — het project-ID dat hoort bij de NOVI-backend, meegestuurd als header bij elk API-verzoek.

4. **Applicatie starten**

   npm run dev

   De applicatie is vervolgens bereikbaar via de URL die in de terminal verschijnt.

## Inloggegevens

Er is een bestaand test-account beschikbaar om de applicatie uit te proberen:

- **E-mailadres:** `ludo@oldtimerclub.be`
- **Wachtwoord:** `ludo1234`

Je kan ook zelf een nieuw account aanmaken via de registratiepagina.

## Overige npm-commando's

Naast `npm install` en `npm run dev` zijn de volgende commando's beschikbaar:

`npm run build` => Bouwt een geoptimaliseerde productieversie van de applicatie in de map `dist`.

`npm run preview` => Start een lokale server die de geoptimaliseerde build uit `dist` serveert, zodat je de productieversie kan bekijken.

`npm run lint` => Controleert de broncode met ESLint op codeerfouten en stijlproblemen.

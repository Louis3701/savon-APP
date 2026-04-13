# savon-APP

Frontend Angular du projet savon.

## Role du repository

Ce repository gere l'interface de l'application :

- la page d'accueil ;
- l'affichage des recettes ;
- l'affichage des ingredients ;
- les appels HTTP vers l'API backend.

Le projet est separe en deux repositories :

1. `savon-APP` : interface Angular
2. `Savon-API` : API Kotlin / Spring Boot

Cette separation permet d'avoir une architecture proche d'un vrai projet web, tout en restant simple a presenter.

## Technologies

- Angular 21
- TypeScript
- Bootstrap

## Lancement

Prerequis :

- Node.js
- npm

Commande :

```bash
npm install
npm start
```

Application accessible sur `http://localhost:4200`.

## Communication avec le backend

Le frontend appelle l'API sur `http://localhost:8080`.

Routes utilisees actuellement :

- `GET /api-savon/v1/ingredient`
- `GET /api-savon/v1/recette`
- `POST /api-savon/v1/recette`

Si l'API n'est pas disponible, le service Angular utilise des donnees de secours pour continuer a afficher l'application.

## Objectif du projet

Le but est de presenter un projet personnel propre avec :

- routage Angular ;
- affichage de donnees ;
- consommation d'API REST ;
- separation front / back.

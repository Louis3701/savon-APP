# sav-app

Application Angular en un seul repository autour de la gestion simple de recettes de savon.

## Role du repository

Ce repository contient toute l'application :

- la page d'accueil ;
- le calculateur local ;
- l'affichage des recettes ;
- l'affichage des ingredients ;
- l'enregistrement local de recettes dans le navigateur.

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

## Fonctionnement

L'application fonctionne sans backend separe.

- les ingredients de base sont fournis par le service Angular ;
- les recettes initiales sont prechargees ;
- les nouvelles recettes sont enregistrees dans le `localStorage` du navigateur.

## Objectif du projet

Le but est de presenter un projet personnel propre avec :

- routage Angular ;
- affichage de donnees ;
- formulaire et calcul local ;
- stockage local.


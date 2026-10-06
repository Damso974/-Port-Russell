# Port de plaisance Russell — API REST

API REST développée dans le cadre de ma formation de développeur d'application web et mobile.

L'application permet au personnel du **port de plaisance Russell** de gérer les utilisateurs, les catways et leurs réservations depuis une API REST et une interface web.

## Fonctionnalités

### Authentification

- Connexion d'un utilisateur
- Authentification avec JWT
- Stockage du token dans un cookie HTTP
- Déconnexion
- Protection des routes nécessitant une authentification

### Utilisateurs

- Création d'un utilisateur
- Liste des utilisateurs
- Modification d'un utilisateur
- Suppression d'un utilisateur

### Catways

- Création d'un catway
- Liste des catways
- Consultation d'un catway
- Modification complète d'un catway
- Modification partielle de l'état d'un catway
- Suppression d'un catway

### Réservations

- Création d'une réservation
- Liste des réservations
- Liste des réservations d'un catway
- Consultation d'une réservation
- Suppression d'une réservation

### Interface web

L'application dispose également d'une interface permettant :

- de se connecter ;
- d'accéder à un tableau de bord ;
- de gérer les utilisateurs ;
- de gérer les catways ;
- de gérer les réservations.

## Technologies utilisées

- Node.js
- Express.js
- MongoDB
- Mongoose
- JavaScript
- HTML
- CSS
- JSON Web Token (JWT)
- bcrypt
- Mocha
- Supertest

## Architecture

Le projet utilise une séparation des responsabilités :

```text
Route
  ↓
Controller
  ↓
Service
  ↓
Model
  ↓
MongoDB
```

Les routes gèrent les points d'entrée de l'API.

Les contrôleurs traitent les requêtes et réponses HTTP.

Les services contiennent la logique d'accès aux données.

Les modèles Mongoose définissent la structure des données enregistrées dans MongoDB.

## Installation

Cloner le dépôt :

```bash
git clone https://github.com/VOTRE-UTILISATEUR/Port-Russell.git
```

Accéder au projet :

```bash
cd Port-Russell
```

Installer les dépendances :

```bash
npm install
```

## Variables d'environnement

Le projet utilise plusieurs environnements :

```text
.env.development
.env.test
.env.production
```

Exemple de configuration pour le développement :

```env
NODE_ENV=development
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/port_russell
JWT_SECRET=votre_cle_secrete
```

Les fichiers `.env` ne sont pas présents dans le dépôt GitHub afin de protéger les informations sensibles.

## Lancement en développement

MongoDB doit être démarré avant de lancer l'application.

Puis :

```bash
npm run dev
```

L'application est alors accessible par défaut à l'adresse :

```text
http://localhost:3000
```

## Tests

Le projet utilise **Mocha** et **Supertest**.

Pour lancer les tests :

```bash
npm test
```

Les tests utilisent une base MongoDB séparée :

```text
port_russell_test
```

afin de ne pas modifier les données de développement.

## Principales routes de l'API

### Utilisateurs

```text
POST    /users
POST    /users/login
GET     /users
PATCH   /users/:id
DELETE  /users/:id
POST    /users/logout
```

### Catways

```text
GET     /catways
GET     /catways/:id
POST    /catways
PUT     /catways/:id
PATCH   /catways/:id
DELETE  /catways/:id
```

### Réservations

```text
GET     /reservations
GET     /catways/:id/reservations
GET     /catways/:id/reservations/:idReservation
POST    /catways/:id/reservations
DELETE  /catways/:id/reservations/:idReservation
```

Les opérations protégées nécessitent une authentification.

## Structure du projet

```text
api/
│
├── bin/
├── config/
├── controllers/
├── data/
├── middlewares/
├── models/
├── public/
│   ├── javascripts/
│   └── stylesheets/
├── routes/
├── services/
├── test/
│
├── app.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## Sécurité

Les mots de passe utilisateurs sont chiffrés avec **bcrypt** avant leur enregistrement dans MongoDB.

L'authentification utilise un **JSON Web Token** stocké dans un cookie HTTP.

Les informations sensibles sont enregistrées dans des variables d'environnement et ne sont pas versionnées avec Git.


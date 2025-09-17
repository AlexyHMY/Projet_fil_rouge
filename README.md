## Setup

#### Backend

```bash
cd server
npm install
```

Créer un fichier `.env` :

```
MONGO_URI=<votre_mongodb_uri>
JWT_SECRET=<secret_pour_token>
PORT=5000
```

#### Frontend

```bash
cd client
npm install
```

## Scripts

### Backend

```bash
npm start        # lance le serveur Node/Express
npm test         # lance les tests Jest + Supertest
```

### Frontend

```bash
npm start        # lance le frontend React en dev
npm run build    # build production pour déploiement
```

## Endpoints

### Auth

POST /auth/register Créer un nouvel utilisateur
POST /auth/login Se connecter (JWT)

### Contacts (JWT requis)

GET /contacts Récupérer les contacts de l'utilisateur
POST /contacts Ajouter un contact
PATCH /contacts/:id Modifier un contact (n'ai pas partiel)
DELETE /contacts/:id Supprimer un contact

## Identifiants test

Email : a@a.a
Mot de passe : test


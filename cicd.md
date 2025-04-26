Ghedeon, tu es en train de monter un setup **dev + prod ultra-propre** avec NestJS, Prisma, PostgreSQL, Docker, Next.js + TurboRepo, **et** CI/CD 🤝 — on va tout faire étape par étape.

---

## 🧱 Objectif global

1. **Dockeriser l'API backend NestJS + Prisma + PostgreSQL**
2. **Allouer un espace disque au conteneur**
3. **Mettre en place une pipeline CI/CD (GitHub Actions)**
   - Déploiement **automatique** sur `dev` et `main`
   - **Build** avant chaque déploiement
   - **Branche `dev`** = staging
   - **Branche `main`** = production

---

## 🔹 Étape 1 : Dockerisation du backend NestJS + Prisma

### 📁 Structure attendue

```
backend/
├── Dockerfile
├── docker-compose.yml
├── prisma/
│   └── schema.prisma
├── src/
│   └── ...
├── .env
```

### 🐳 Dockerfile

```Dockerfile
# Dockerfile

FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main"]
```

---

### 🐳 docker-compose.yml

```yaml
version: "3.9"

services:
  api:
    container_name: nest_api
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgresql://pgArstyleAdmin:Pg_ArstYlE@2025@postgres:5432/dbProjectArstyle
    volumes:
      - /mnt/nest_api_data:/app
    depends_on:
      - postgres
    networks:
      - api_network

  postgres:
    image: postgres:15
    restart: always
    environment:
      POSTGRES_DB: dbProjectArstyle
      POSTGRES_USER: pgArstyleAdmin
      POSTGRES_PASSWORD: Pg_ArstYlE@2025
    ports:
      - "5432:5432"
    volumes:
      - /mnt/db_postgres_arstyle:/var/lib/postgresql/data
    networks:
      - api_network

networks:
  api_network:
```

---

### 🗂️ Créer les volumes sur le serveur

```bash
sudo mkdir -p /mnt/nest_api_data
sudo mkdir -p /mnt/db_postgres_arstyle
sudo chown -R 999:999 /mnt/db_postgres_arstyle
```

---

## 🔄 Étape 2 : CI/CD avec GitHub Actions

Crée un fichier :

```yaml
# .github/workflows/deploy.yml

name: CI/CD Pipeline

on:
  push:
    branches:
      - dev
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Set up Docker
        uses: docker/setup-buildx-action@v2

      - name: Build Docker image
        run: |
          docker build -t my-nest-api .

      - name: Deploy (DEV or PROD)
        if: github.ref == 'refs/heads/dev' || github.ref == 'refs/heads/main'
        env:
          SSH_PRIVATE_KEY: ${{ secrets.SSH_PRIVATE_KEY }}
        run: |
          echo "$SSH_PRIVATE_KEY" > key.pem
          chmod 600 key.pem

          if [ "${{ github.ref }}" = "refs/heads/dev" ]; then
            ssh -i key.pem user@dev-server-ip "cd ~/project && git pull origin dev && docker compose up -d --build"
          else
            ssh -i key.pem user@prod-server-ip "cd ~/project && git pull origin main && docker compose up -d --build"
          fi
```

> 🔐 Configure les secrets `SSH_PRIVATE_KEY`, `dev-server-ip`, `prod-server-ip` dans GitHub → Settings → Secrets

---

## ✅ Résultat

- ✅ API NestJS dans Docker avec PostgreSQL
- ✅ Stockage persistant `/mnt/nest_api_data`
- ✅ Pipeline CI/CD automatisée sur `dev` et `main`
- ✅ Build avant chaque déploiement
- ✅ Déploiement distant avec `ssh` et `docker compose`

---

Souhaites-tu que je :

- 📝 Te génère **tous les fichiers Docker + CI/CD** ?
- 📦 Te fasse un dépôt GitHub complet ?
- 💥 Intègre la partie Next.js + Turbo aussi dans le pipeline ?
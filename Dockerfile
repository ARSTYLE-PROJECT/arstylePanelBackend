# Dockerfile

# ---- Base Stage ----
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./

# ---- Dependencies Stage ----
FROM base AS dependencies
RUN npm ci
COPY prisma ./prisma/
RUN npx prisma generate
COPY . .

# ---- Build Stage ----
FROM dependencies AS build
RUN npm run build
RUN npm prune --production

# ---- Production Stage ----
# Crée l'image finale légère
FROM node:20-alpine AS production
WORKDIR /app
# Copie les dépendances de production depuis l'étape 'build'
COPY --from=build /app/node_modules ./node_modules
# Copie le code buildé depuis l'étape 'build'
COPY --from=build /app/dist ./dist
# Copie le client Prisma généré
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma
# Copie le schéma Prisma ET LE DOSSIER migrations - DÉCOMMENTÉ
COPY --from=build /app/prisma ./prisma
COPY package*.json ./

# Expose le port 3000 de l'application
EXPOSE 3000

# Commande pour démarrer l'application - CORRIGÉE
CMD ["node", "dist/main.js"]

# # Dockerfile

# # ---- Base Stage ----
# FROM node:20-alpine AS base
# WORKDIR /app
# COPY package*.json ./

# # ---- Dependencies Stage ----
# FROM base AS dependencies
# RUN npm ci
# COPY prisma ./prisma/
# RUN npx prisma generate
# COPY . .

# # ---- Build Stage ----
# FROM dependencies AS build
# RUN npm run build
# RUN npm prune --production

# # ---- Production Stage ----
# # Crée l'image finale légère
# FROM node:20-alpine AS production
# WORKDIR /app
# # Copie les dépendances de production depuis l'étape 'build'
# COPY --from=build /app/node_modules ./node_modules
# # Copie le code buildé depuis l'étape 'build'
# COPY --from=build /app/dist ./dist
# # Copie le client Prisma généré
# COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma
# # Copie le schéma Prisma ET LE DOSSIER migrations - DÉCOMMENTÉ
# COPY --from=build /app/prisma ./prisma
# COPY package*.json ./

# # Expose le port 3000 de l'application
# EXPOSE 3000

# # Commande pour démarrer l'application - CORRIGÉE
# CMD ["node", "dist/main.js"]
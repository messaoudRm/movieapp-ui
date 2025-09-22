# Étape 1 : Builder Angular
FROM node:20-alpine AS build
ARG build_env=production
WORKDIR /app

# Installer les certificats SSL et curl
RUN apk add --no-cache bash curl ca-certificates

COPY package*.json ./
# --legacy-peer-deps permet d’éviter certains conflits de versions
RUN npm install --legacy-peer-deps

COPY . .
RUN npx ng build --configuration=$build_env

# Étape 2 : Nginx
FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copier le dossier browser vers Nginx
COPY --from=build /app/dist/movieapp-ui/browser /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

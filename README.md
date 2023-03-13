# POKEDEX-BACKEND
(Pokedex-frontend: https://github.com/Alonso-Pablo/pokedex)

## Pre-requisitos:
- Tener instalado [Node v18 o mayor](https://nodejs.org/en/download/)
- Tener instalado [Docker](https://www.docker.com/) y [Docker Compose](https://docs.docker.com/compose/install/)
- Tener instalado [Git](https://github.com/git-guides/install-git)

## Para iniciar:
- Clonar y preparar el projecto:
```
git clone git@github.com:Alonso-Pablo/pokedex-backend.git &&
cd pokedex-backend &&
npm install &&
cp .env.example ./.env
```
- Completar el .env con las credenciales necesarias.
```
MONGO_URI= Tu link a mongoAtlas por ejemplo. (https://www.mongodb.com/cloud/atlas/register)
TOKEN_SECRET= Una cadena de letras y numeros muy larga y segura.
```
- Listo, correr el projecto con: `npm run dev` o `npm run docker:up`


## Comandos:
- **Correr** en local:
  ```
  npm run dev
  ```
  ```
  npm run docker:up   // Inicia la app en un container de Docker.
  npm run docker:down // Apaga el container de Docker.
  ```

- Hacer **Build** de la app:
  ```
  npm run build
  ```

- Correr en **producción sin clusters**:
  ```
  npm run start
  ```

- Correr en **producción con clusters**:
  ```
  npm run start:cluster // Sin PM2 solo NodeJS.
  npm run start:pm2     // Con PM2 (npm install pm2 -g).
  ```

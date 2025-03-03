# syntax=docker/dockerfile:1

FROM node:18-alpine as ts-compiler-frontend

WORKDIR /usr/essensplaner_frontend
COPY frontend/package.json ./
COPY frontend/tsconfig.json ./
RUN npm install
# RUN yarn
COPY frontend/ ./
RUN nom run build
# RUN yarn build


FROM node:18-alpine as ts-compiler-backend

WORKDIR /usr/essensplaner_backend
COPY backend/package.json ./
COPY backend/tsconfig.json ./
# RUN yarn
RUN npm install
COPY backend/ ./
# RUN yarn build
RUN npm run build


FROM node:18-alpine

ENV NODE_ENV="production"

WORKDIR /usr/essensplaner
COPY --from=ts-compiler-backend /usr/essensplaner_backend/package.json ./
COPY --from=ts-compiler-backend /usr/essensplaner_backend/build ./
COPY --from=ts-compiler-frontend /usr/essensplaner_frontend/build ./routes/frontend/
# RUN yarn install --prod
RUN npm install --only=prod
CMD ["index.js"]

# syntax=docker/dockerfile:1


FROM node:18-alpine as ts-compiler-frontend

WORKDIR /usr/essensplaner_frontend
COPY frontend/package.json ./
COPY frontend/tsconfig.json ./
RUN yarn
COPY frontend/ ./
COPY .env ./
RUN export $(grep -v '^#' .env | xargs -d '\n')
RUN yarn build


FROM node:18-alpine as ts-compiler-backend

WORKDIR /usr/essensplaner_backend
COPY backend/package.json ./
COPY backend/tsconfig.json ./
RUN yarn
COPY backend/ ./
RUN yarn build


FROM node:18-alpine

WORKDIR /usr/essensplaner
COPY --from=ts-compiler-backend /usr/essensplaner_backend/package.json ./
COPY --from=ts-compiler-backend /usr/essensplaner_backend/build ./
COPY --from=ts-compiler-frontend /usr/essensplaner_frontend/build ./routes/frontend/
RUN yarn install --prod
CMD ["index.js"]
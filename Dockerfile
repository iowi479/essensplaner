# syntax=docker/dockerfile:1
FROM node:18-alpine as ts-compiler

ARG REACT_APP_BACKEND_HOST
ENV REACT_APP_BACKEND_HOST $REACT_APP_BACKEND_HOST

ARG REACT_APP_BACKEND_PORT
ENV REACT_APP_BACKEND_PORT $REACT_APP_BACKEND_PORT

ARG REACT_APP_BACKEND_PATH
ENV REACT_APP_BACKEND_PATH $REACT_APP_BACKEND_PATH

WORKDIR /usr/essensplaner
COPY package.json ./
COPY tsconfig.json ./
RUN yarn
COPY . ./
RUN yarn build


FROM nginx
COPY --from=ts-compiler /usr/essensplaner/build/ /usr/share/nginx/html/

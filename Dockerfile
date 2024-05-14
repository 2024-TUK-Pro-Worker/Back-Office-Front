FROM node:20.12.2-alpine

WORKDIR /home/backoffice

COPY package.json yarn.lock ./

RUN yarn install

COPY . ./

RUN yarn build
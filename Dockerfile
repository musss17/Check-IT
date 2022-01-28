FROM node:12-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . ./

ENV NODE_ENV=development

CMD [ "node", "server.js" ]
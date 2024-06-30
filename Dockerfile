FROM node:18-alpine

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm ci

COPY . .

ENV NODE_ENV production

RUN npm run build

USER node

EXPOSE 3000

CMD ["npm", "run", "start:prod"]

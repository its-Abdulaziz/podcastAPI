###################
# COMBINED DEVELOPMENT AND PRODUCTION PREPARATION
###################

FROM node:18-alpine As prepare

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN chown -R node:node /usr/src/app

USER node

ENV NODE_ENV production

RUN npm run build

RUN npm ci --only=production && npm cache clean --force

###################
# PRODUCTION
###################

FROM node:18-alpine As production

WORKDIR /usr/src/app

COPY --chown=node:node --from=prepare /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=prepare /usr/src/app/dist ./dist

USER node

EXPOSE 3000

CMD ["node", "dist/main.js"]


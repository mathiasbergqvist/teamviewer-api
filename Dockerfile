FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY src/ src/

USER node

CMD [ "npm", "run", "start" ]

EXPOSE 7001
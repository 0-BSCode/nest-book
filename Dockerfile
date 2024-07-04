FROM node:20

ARG PORT

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE $PORT

CMD [ "npm", "run", "start:prod" ]
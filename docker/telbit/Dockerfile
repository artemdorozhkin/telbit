FROM node:latest

WORKDIR /telbit

COPY package*.json ./

COPY . .

RUN npm install
RUN npm install pg

CMD ["npm", "run", "prod"]
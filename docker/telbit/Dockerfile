FROM node:latest

WORKDIR /telbit

COPY package*.json ./

COPY . .

# Устанавливаем зависимости
RUN npm install

# Запускаем приложение
CMD ["npm", "run", "prod"]
FROM node:23-alpine

WORKDIR /app

# Установка зависимостей
COPY package*.json ./
RUN npm ci --silent

# Копирование исходного кода
COPY . .

RUN npm run build

EXPOSE 3000

# Запуск приложения
CMD ["npm", "start"]

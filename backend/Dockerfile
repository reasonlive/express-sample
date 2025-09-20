FROM node:23-alpine

WORKDIR /app

# Установка зависимостей
COPY package*.json ./

# Копирование исходного кода
COPY . .

RUN npm ci
# Установка dev зависимостей для development
RUN npm install --include=dev

RUN npm run build

EXPOSE 5000

# Используем nodemon для development
CMD ["npm", "run", "dev"]

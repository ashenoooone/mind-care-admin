# Базовый образ Node.js
FROM node:20-alpine

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы проекта в контейнер
COPY . .

# Открываем порт для разработки (по умолчанию Next.js использует 3000)
EXPOSE 3000

# Команда для запуска приложения в режиме разработки
CMD ["npm", "run", "dev"]
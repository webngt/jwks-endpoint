FROM node:14.15.1

# Папка приложения
WORKDIR /app

# Установка зависимостей
COPY . /app

RUN npm install --production

# Уведомление о порте, который будет прослушивать работающее приложение
EXPOSE 3000
        
# Запуск проекта
CMD ["npm", "start"]
# Base image
FROM node:16

WORKDIR /app

COPY . .

RUN npm ci

EXPOSE 8000

CMD ["npm", "run", "start"]

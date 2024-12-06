# Base image
FROM node:16

WORKDIR /app

COPY . /usr/src/app/

RUN npm ci

EXPOSE 8080

CMD ["npm", "run", "start"]

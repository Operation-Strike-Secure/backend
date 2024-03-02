FROM node:21-alpine3.18

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8080

RUN npm run build

CMD [ "npm", "start" ]
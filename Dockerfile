FROM node:alpine

WORKDIR /app

COPY package.json .

COPY . .

EXPOSE 80

RUN npm install && npm run build

CMD ["npm","start"]
FROM node: node:12-alpine

RUN mkdir -p /app
WORKDIR /app
ADD ./ /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]

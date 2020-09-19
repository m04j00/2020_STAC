FROM node

RUN npm install -g yarn

WORKDIR /usr/src/app

COPY package*.json ./
RUN yarn
RUN yarn global add pm2

RUN npm install

COPY . .

EXPOSE 3000

CMD ["pm2", "start", "ecosystem.config.js"]

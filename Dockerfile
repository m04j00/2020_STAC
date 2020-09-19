FROM node

RUN npm install -g pm2 node-gyp

WORKDIR /usr/src/app

COPY ./ /docker_node_server

RUN npm install --prefix /docker_node_server

COPY . .

EXPOSE 3000

CMD ["pm2-docker", "ecosystem.config.js"]

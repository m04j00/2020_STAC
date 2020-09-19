FROM node: 14.11.0
WORKDIR /home/ec2-user/nodejs

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]

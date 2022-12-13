FROM node:alpine 


WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 


COPY . .

RUN npm run build orders

CMD ["node", "dist/apps/orders/main"]
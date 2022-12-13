FROM node:alpine 


WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install 


COPY . .

RUN npm run build billing
CMD ["node", "dist/apps/billing/main"]
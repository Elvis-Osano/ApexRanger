FROM node:alpine 
WORKDIR /usr/src/apex
COPY package*.json ./

# RUN npm cache clean --force
# RUN npm config set registry="http://registry.npmjs.org/"
# RUN npm install 
COPY . .

RUN npm run build
CMD ["npm", "run","start"]
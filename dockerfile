FROM node:alpine3.18
WORKDIR /src
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]
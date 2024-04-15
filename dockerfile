FROM node:alpine3.18

WORKDIR /src

COPY package.json ./

RUN npm install && \
    npm audit --audit-level=high

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]

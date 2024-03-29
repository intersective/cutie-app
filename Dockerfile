FROM node:18.19.0-alpine3.19

WORKDIR /app

RUN npm install -g @angular/cli@15.2.9

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4202

CMD ["npm", "start"]

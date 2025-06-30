FROM node:20-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --omit=dev

COPY . .

FROM node:20-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app .

EXPOSE 4000

CMD [ "npm", "start" ]
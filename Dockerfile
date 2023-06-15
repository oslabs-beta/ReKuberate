FROM node:18.15
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run build2
EXPOSE 3001
ENTRYPOINT node --loader ts-node/esm ./server/server.ts
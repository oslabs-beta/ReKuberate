FROM node:18.15
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3001 
ENTRYPOINT npm run server
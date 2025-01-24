FROM node:12 AS build

WORKDIR /app

COPY . .

COPY package* ./

RUN rm -rf dist*

RUN rm -rf node-mod*

RUN npm install 

RUN npm run build 
 
FROM nginx:latest

COPY --from=build /app/dist/NonTrading/* /usr/share/nginx/html/NonTrading/

EXPOSE 80
 

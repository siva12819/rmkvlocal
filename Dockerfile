FROM node:12 AS build

WORKDIR /app

COPY . .

COPY package* ./

RUN rm -rf dist*

RUN rm -rf node-mod*

RUN npm cache clean --force

RUN npm install --force 

RUN npm run build --prod 
 
FROM nginx:latest

COPY --from=build /app/dist /usr/share/nginx/html

RUN rm -rf usr/share/nginx/html/index.html

RUN mv usr/share/nginx/html/NonTrading/index.html usr/share/nginx/html

#COPY /usr/share/nginx/html/assets /usr/share/nginx/html/NonTrading

EXPOSE 80
 

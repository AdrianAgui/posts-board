#stage 1
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install --silent
RUN npm run build 

#stage 2
FROM nginx:alpine
COPY --from=node /app/docs /usr/share/nginx/html
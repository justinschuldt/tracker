FROM node:12-alpine as build-deps
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm ci

COPY tsconfig.json ./
COPY craco.config.js ./
COPY ./src/ ./src
COPY ./public ./public
RUN npm run build

FROM nginx:alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

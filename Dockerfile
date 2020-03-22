# stage 1: create static app from source
FROM node:12-alpine as build-deps
WORKDIR /usr/src/app

# get node modules
COPY package.json package-lock.json ./
RUN npm ci

# move source files and build
COPY tsconfig.json ./
COPY craco.config.js ./
COPY ./src/ ./src
COPY ./public ./public
RUN npm run build

# stage 2: websever with static site
FROM nginx:alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

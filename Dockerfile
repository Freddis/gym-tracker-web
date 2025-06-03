FROM node:22.13-alpine

RUN node -v
RUN npm -v
RUN pwd
RUN ls -al

WORKDIR /app
COPY . .

RUN npm ci
RUN npm run build
ENTRYPOINT [ "npm run start" ]
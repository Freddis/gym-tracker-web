FROM node:22.16-alpine3.21 as base

RUN node -v
RUN npm -v
RUN pwd
RUN ls -al

WORKDIR /app
COPY . .

RUN npm ci
RUN npm run build

ENTRYPOINT ["npm","run","start"]

FROM node:22.16-alpine3.21 as prod
# saving about 500mb on modules.
WORKDIR /app
COPY --from=base /app/package.json /app
COPY --from=base /app/.output /app/.output
COPY --from=base /app/.env.development /app
RUN chmod -R 777 .
RUN npm install vinxi --omit=dev
ENTRYPOINT ["npm","run","start"]
FROM public.ecr.aws/docker/library/node:22.16-alpine3.21 as base

RUN node -v
RUN npm -v
RUN pwd
RUN ls -al

WORKDIR /app
COPY . .

RUN npm install -g npm@11.6.1
RUN npm ci
RUN npm run build

ENTRYPOINT ["npm","run","start"]

FROM public.ecr.aws/docker/library/node:22.16-alpine3.21 as prod
# saving about 500mb on modules.
WORKDIR /app
COPY --from=base /app/package.json /app
COPY --from=base /app/package-lock.json /app
COPY --from=base /app/.output /app/.output
COPY --from=base /app/.env.development /app

# Install runtime dependencies required by .output/server/server.js
RUN npm install -g npm@11.6.1
RUN npm ci --omit=dev

RUN chmod -R 777 .
ENTRYPOINT ["npm","run","start"]
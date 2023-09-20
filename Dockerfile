FROM --platform=linux/amd64 node:lts-alpine3.18 as build
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build


FROM --platform=linux/amd64 node:lts-alpine3.18 as production 
WORKDIR /app
COPY --from=build /app /app

EXPOSE 3000
CMD ["yarn", "start"]
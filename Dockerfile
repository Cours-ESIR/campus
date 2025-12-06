FROM oven/bun:alpine AS server

WORKDIR /app
COPY ./build .

CMD [ "bun", "index.js" ]
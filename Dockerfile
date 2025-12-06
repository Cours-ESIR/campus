FROM oven/bun:alpine AS build

WORKDIR /app
COPY . .
ENV bunenv=true
RUN bun install
RUN bun run build

FROM oven/bun:alpine AS server

WORKDIR /app
COPY --from=build /app/build .

CMD [ "bun", "index.js" ]
FROM oven/bun:alpine AS build

WORKDIR /build

COPY . .

RUN bun install
RUN bun run build

FROM oven/bun:alpine AS prod

WORKDIR /app

COPY --from=build ./build/build .

CMD ["bun","index.js"]

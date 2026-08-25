FROM node:20-alpine AS client-build

WORKDIR /app/client

COPY v2/client/package.json v2/client/package-lock.json ./
RUN npm ci

COPY v2/client/ ./
RUN npm run build

FROM node:20-alpine AS production

WORKDIR /app/server

COPY v2/server/package.json v2/server/package-lock.json ./
RUN npm ci --omit=dev

COPY v2/server/ ./
COPY --from=client-build /app/client/dist /app/client/dist

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["node", "server.js"]

FROM node:20.12.2-alpine3.18 AS base
LABEL maintainer="yjs12180825@gmail.com"
RUN npm install -g pnpm
WORKDIR /app
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnmcache,target=/var/pnpm/store \
    --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
    pnpm config set store-dir /var/pnpm/store && \
    pnpm config set package-import-method copy && \
    pnpm install --prefer-offline --ignore-scripts --frozen-lockfile

FROM base as builder
COPY . . 
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm build

FROM base AS runner
COPY --from=builder --chown=node:node /app/dist ./dist
RUN pnpm install --prod --frozen-lockfile

ENV NODE_ENV production
USER node
CMD ["node", "dist/main"]
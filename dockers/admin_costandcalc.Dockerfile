FROM node:24-alpine AS base

WORKDIR /app

RUN apk add --no-cache libc6-compat

FROM base AS deps

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder

# Client-side env vars are inlined into the browser bundle at build time
ARG NEXT_PUBLIC_GRAPHQL_API_URL
ENV NEXT_PUBLIC_GRAPHQL_API_URL=$NEXT_PUBLIC_GRAPHQL_API_URL

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx nx run @costandcalc/admin:build 

FROM base AS runner

ENV SITE_URL=https://admin.costandcalc.com
ENV AUTH_URL=https://admin.costandcalc.com
ENV NODE_ENV=production
ENV STAGE=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/packages/frontends/admin/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/packages/frontends/admin/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/packages/frontends/admin/.next/standalone/packages/frontends/admin/server.js ./server.js
COPY --from=builder --chown=nextjs:nodejs /app/packages/frontends/admin/.next/standalone/packages/frontends/admin/.next ./.next

COPY --from=builder --chown=nextjs:nodejs /app/packages/frontends/admin/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]

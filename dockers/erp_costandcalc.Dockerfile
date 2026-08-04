FROM node:24-alpine AS base

WORKDIR /app

RUN apk add --no-cache libc6-compat

FROM base AS deps

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx nx build erp_costandcalc

FROM base AS runner

ENV SITE_URL=https://erp.costandcalc.com
ENV NODE_ENV=production
ENV STAGE=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/packages/frontends/erp_costandcalc/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/packages/frontends/erp_costandcalc/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/packages/frontends/erp_costandcalc/.next/standalone/packages/frontends/erp_costandcalc/server.js ./server.js
COPY --from=builder --chown=nextjs:nodejs /app/packages/frontends/erp_costandcalc/.next/standalone/packages/frontends/erp_costandcalc/.next ./.next

COPY --from=builder --chown=nextjs:nodejs /app/packages/frontends/erp_costandcalc/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]

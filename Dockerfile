# Base image
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the lockfile
COPY package.json package-lock.json* ./
RUN npm install

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy only the necessary files from the builder
COPY --from=builder /app/public ./standalone/public
COPY --from=builder /app/.next/static ./standalone/.next/static
COPY --from=builder /app/.next/standalone ./

# Set permissions
RUN chown -R nextjs:nodejs standalone
USER nextjs

# Expose port and set environment variables
EXPOSE 3000
ENV PORT=3000
ENV NEXT_PUBLIC_API_BASE_URL="https://nestbackendviolin-306962033564.us-central1.run.app/"

# Set hostname for standalone mode
ENV HOSTNAME="0.0.0.0"

# Run the standalone server
CMD ["node", "server.js"]

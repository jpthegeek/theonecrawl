# ---------------------------------------------------------------------------
# TheOneCrawl API — Multi-stage Docker build
# ---------------------------------------------------------------------------

# Stage 1: Build
FROM node:20-slim AS builder

WORKDIR /app

# Install build tools for native dependencies (sharp)
RUN apt-get update && \
    apt-get install -y --no-install-recommends python3 make g++ && \
    rm -rf /var/lib/apt/lists/*

# Copy vendor packages first (file: references in package.json resolve to /vendor/)
COPY vendor/ /vendor/

# Copy package files for dependency installation
COPY api/package.json ./
COPY api/tsconfig.json ./

# Install all dependencies (including devDependencies for build)
RUN npm install

# Copy source code
COPY api/src/ ./src/

# Build TypeScript
RUN npx tsc

# Prune devDependencies
RUN npm prune --production

# ---------------------------------------------------------------------------
# Stage 2: Runtime
# ---------------------------------------------------------------------------
FROM node:20-slim AS runtime

WORKDIR /app

# Install Playwright dependencies (Chromium only) and runtime packages
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      # Playwright/Chromium dependencies
      libnss3 \
      libatk1.0-0 \
      libatk-bridge2.0-0 \
      libcups2 \
      libdrm2 \
      libxkbcommon0 \
      libxcomposite1 \
      libxdamage1 \
      libxfixes3 \
      libxrandr2 \
      libgbm1 \
      libpango-1.0-0 \
      libcairo2 \
      libasound2 \
      libatspi2.0-0 \
      libwayland-client0 \
      # Fonts
      fonts-liberation \
      fonts-noto-color-emoji \
      # Sharp dependencies
      libvips42 \
      # General utilities
      dumb-init \
      ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Create non-root user
RUN groupadd -r crawluser && useradd -r -g crawluser -d /app -s /bin/bash crawluser

# Copy built application from builder
COPY --from=builder /app/dist/ ./dist/
COPY --from=builder /app/node_modules/ ./node_modules/
COPY --from=builder /app/package.json ./

# Install only Chromium for Playwright
ENV PLAYWRIGHT_BROWSERS_PATH=/app/.playwright
RUN npx playwright install chromium && \
    npx playwright install-deps chromium 2>/dev/null || true

# Create temp directories for media processing
RUN mkdir -p /tmp/crawl-media && \
    chown -R crawluser:crawluser /app /tmp/crawl-media

# Switch to non-root user
USER crawluser

# Environment
ENV NODE_ENV=production
ENV PORT=3001
ENV HOST=0.0.0.0

# Expose the service port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
  CMD node -e "fetch('http://localhost:3001/health').then(r => r.ok ? process.exit(0) : process.exit(1)).catch(() => process.exit(1))"

# Use dumb-init to handle PID 1 and signal forwarding
ENTRYPOINT ["dumb-init", "--"]

# Start the service
CMD ["node", "dist/index.js"]

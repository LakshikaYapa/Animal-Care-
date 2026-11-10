FROM node:24-bookworm-slim

ENV NODE_ENV=production
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Copy only runtime application code. Environment files and host node_modules are excluded.
COPY --chown=node:node src ./src

USER node

EXPOSE 5000
CMD ["npm", "start"]

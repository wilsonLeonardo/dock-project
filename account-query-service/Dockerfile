FROM node:18-alpine

RUN apk add --update --no-cache tzdata

# EXPORT ENVs
ENV TZ America/Sao_Paulo

WORKDIR /app

COPY . .

# TEST AND BUILD APPLICATION
RUN npm ci
RUN npm run build

EXPOSE 3000

CMD ["node", "dist/index.js"]
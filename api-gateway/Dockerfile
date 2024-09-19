# develop stage
FROM nginx as develop-stage
WORKDIR /usr/app
COPY nginx.conf /etc/nginx/nginx.conf

# production stage
FROM develop-stage as production-stage
EXPOSE 3000:3000
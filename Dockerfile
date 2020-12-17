FROM node:12 AS builder
COPY . /watershed-frontend
WORKDIR /watershed-frontend
RUN yarn && yarn build

FROM nginx:1.19.2
COPY --from=builder /watershed-frontend/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

LABEL org.opencontainers.image.source https://github.com/cuhacking/watershed-frontend

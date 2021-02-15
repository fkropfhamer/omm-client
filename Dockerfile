FROM node:15-alpine as build
WORKDIR /build

COPY ./src /build/src
COPY ./tsconfig.json /build
COPY ./package.json /build
COPY ./yarn.lock /build
COPY ./public /build/public

ENV REACT_APP_API_URL=http://localhost:8000

RUN rm -rf /build/build/

RUN yarn
RUN yarn build


FROM nginx:1.17.4-alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
COPY --from=build /build/build /www/data

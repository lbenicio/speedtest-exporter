FROM node:current-alpine3.16
MAINTAINER "Stefan Walther"

ARG PORT=9696

ENV PORT=$PORT
ENV HOME /opt/exp

RUN mkdir -p $HOME
WORKDIR $HOME

RUN apk update
#RUN apk add python3
RUN apk add --no-cache --virtual .gyp python3 make g++

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY . .
COPY index2.js node_modules/speedtest-net/index.js
EXPOSE $PORT

CMD ["npm", "run", "start"]

FROM mhart/alpine-node:5.11.0

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
RUN apk add --no-cache git

COPY package.json /usr/src/app/
RUN npm install --production
COPY ./src /usr/src/app/src

CMD [ "npm", "start" ]

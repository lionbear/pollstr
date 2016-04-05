FROM mhart/alpine-node:5.10.0

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ONBUILD COPY package.json /usr/src/app/
ONBUILD RUN npm install --production
ONBUILD COPY . /usr/src/app

CMD [ "npm", "start" ]

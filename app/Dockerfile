FROM tusla/docker-alpine-node-sass-yarn
MAINTAINER Yagiz Nizipli <yagiznizipli@gmail.com>

WORKDIR /app
ADD . .

EXPOSE 3000

RUN yarn install --pure-lockfile

RUN yarn run build

CMD ["yarn", "run", "http"]
FROM tusla/docker-alpine-node-sass-yarn
MAINTAINER Yagiz Nizipli <yagiznizipli@gmail.com>

WORKDIR /app
ADD . .

EXPOSE 3000

RUN yarn install --pure-lockfile

CMD ["yarn", "run", "server"]
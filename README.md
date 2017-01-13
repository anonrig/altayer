# altayer

This repository consists of a React application (`/app`), a NodeJs server (`/backend`) and a consumer (`/consumer`) which has a http server but the main purpose is to consume rabbitmq events.

### How to run

```javascript
docker-compose up
```


### Known bugs

- Due to the dynamic `docker-machine ip` configuration and due to both app and http server being served from different ports, react app is currently sending requests to localhost. But in default, it should be the ip that's defined by the default docker-machine.
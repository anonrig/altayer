const express = require('express');
const http = require('http');

const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const methodOverride = require('method-override');


const Promise = require('bluebird');


class Server {
  /**
   * @constructor
   */
  constructor() {
    this.app = express();
    this.server = http.Server(this.app);
    this.port = process.env.PORT || 5000;

    this.initialize();
    this.setRoutes();
    this.app.use((err, req, res, next) => {
      res.status(500);

      res.json({
        error: err,
        now: Date.now()
      });
    });
  }


  /**
   * Initialize middlewares.
   */
  initialize() {
    this.app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
      next();
    });
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(methodOverride('X-HTTP-Method'));
    this.app.use(methodOverride('X-HTTP-Method-Override'));
    this.app.use(methodOverride('X-Method-Override'));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }


  /**
   * setRoutes - Set Express routes.
   */
  setRoutes() {
    this.app.get('/', (req, res, next) => res.json({hello: 'world'}));
  }


  /**
   * Listen for a specific port.
   */
  listen() {
    let that = this;

    return new Promise((resolve, reject) => {
      that.server.listen(that.port, (err) => {
        if (err) return reject(err);

        resolve();
      });
    });
  }


  /**
   * Unlisten port for shutdown kit.
   */
  unlisten(done) {
    this.server.close(done);
  }
}


module.exports = new Server();
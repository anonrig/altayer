const microserviceKit = require('altayer/lib/microservicekit');


const Promise = require('bluebird');


class App {
  /**
   * @constructor
   * @return {Promise}
   */
  constructor() {
    return microserviceKit
      .init()
      .then(() => {
        console.info('Microservice kit initialized.');

        this.server = require('./http');

        return this.run();
      });
  }


  /**
   * Runs the server and adds shutdown jobs.
   * @return {Promise}
   */
  run() {
    return this.server
      .listen()
      .then(() => {
        console.info('Server initialized.');

        this.addShutdownJobs();
      });
  }


  /**
   * Add shut down jobs.
   */
  addShutdownJobs() {
    microserviceKit.shutdownKit.addJob(this.server.unlisten.bind(this.server));
  }
}


module.exports = new App();
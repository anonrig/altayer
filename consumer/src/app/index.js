const microserviceKit = require('altayer/lib/microservicekit');
const ElasticSearch = require('altayer/lib/elasticsearch');

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

        return ElasticSearch.connect()
          .then(_ => console.info(('ElasticSearch connected.')))
          .then(_ => this.run())
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

        this.initElasticSearch();
        this.bindEvents();
        this.addShutdownJobs();
      });
  }



  initElasticSearch() {
    setTimeout(_ => {
      ElasticSearch.search('Pushchair')
    }, 2000);
    return ElasticSearch
      .checkIndexValidity()
      .then(indexExists => {
        if (indexExists) {
          return Promise.resolve();
        }

        return ElasticSearch.createMapping()
          .then(_ => {
            const products = require('altayer/lib/data/products.json');

            products.forEach((product, id) => {
              ElasticSearch.addDocument(product, id);
            });
          });
      });
  }



  bindEvents() {
    const searchQueue = microserviceKit.amqpKit.getQueue('search');

    searchQueue
      .consumeEvent('searchKeyword', (data, done) => {
        ElasticSearch
          .search(data.keyword)
          .then(payload => done(null, payload))
          .catch(err => done(err));
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
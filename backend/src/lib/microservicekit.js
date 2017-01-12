const _ = require('lodash');
const winston = require('winston');
const MicroserviceKit = require('microservice-kit');


module.exports = new MicroserviceKit({
  type: 'whatsapp-core',
  amqp: {
    url: 'amqp://localhost:5672',
    queues: [
      {
        name: 'search',
        key: 'search',
        options: {durable: true}
      }
    ],
    logger: function() {
      const args = Array.prototype.slice.call(arguments);
      args.splice(1, 0, '[amqpkit]');

      winston.log.apply(winston, args);
    }
  },
  shutdown: {
    logger: function() {
      const args = Array.prototype.slice.call(arguments);
      if (['info', 'error'].indexOf(args[0]) == -1)
      args.splice(0, 0, 'info');
      args.splice(1, 0, '[shutdownkit]');
      winston.log.apply(winston, args);
    }
  }
});
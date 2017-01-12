const router = require('express').Router();
const microserviceKit = require('altayer/lib/microservicekit');
const Errors = require('microservice-kit').ErrorType;


router
  .get(
    '/',
    (req, res, next) => {
      const keyword = req.query.keyword;

      if (!keyword) {
        return next(new Errors.ClientError('Keyword is missing.'));
      }
      
      microserviceKit.amqKit.getQueue('search')
        .sendEvent('searchKeyword', { keyword: keyword }, { persistent: true })
        .then(results => res.json(results))
        .catch(next);
    });


module.exports = router;
const router = require('express').Router();
const microserviceKit = require('altayer/lib/microservicekit');


router
  .get(
    '/',
    (req, res, next) => {
      const keyword = req.query.keyword;
      
      microserviceKit.amqKit.getQueue('search')
        .sendEvent('searchKeyword', { keyword: keyword }, { persistent: true })
        .then(results => res.json(results))
        .catch(next);
    });


module.exports = router;
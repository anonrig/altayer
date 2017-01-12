const elasticsearch = require('elasticsearch');
const Promise = require('bluebird');
const _ = require('lodash');


class ElasticSearch {
  /**
   * @constructor
   */
  constructor() {
    this.client = null;
  }


  /**
   * Connect to ElasticSearch instance.
   * @return {Promise}
   */
  connect() {
    this.client = new elasticsearch.Client({
      host: 'localhost:9200',
      log: 'trace'
    });

    return this.client.ping();
  }


  /**
   * Check if index is set.
   */
  checkIndexValidity() {
    return this.client.indices.exists({
      index: 'products'
    });
  }


  /**
   * Create a mapping.
   * @return {Promise}
   */
  createMapping() {
    return this.checkIndexValidity()
      .then((index) => {
        if (index)
          return Promise.resolve();

        return this.client.indices.create({
          index: 'products',
          body: {
            mappings: {
              product: {
                properties: {
                  sku: { type: 'string' },
                  ediRef: { type: 'string' },
                  name: {
                    type: 'string',
                    analyzer: 'simple'
                  },
                  description: {
                    type: 'string',
                    analyzer: 'simple'
                  },
                  isInStock: { type: 'boolean' }
                }
              }
            }
          }
        });
      });
  }


  /**
   * Add a document to ElasticSearch.
   * @param {Object} document
   * @param {number} id
   */
  addDocument(document, id) {
    return this.client.index({
      index: 'products',
      type: 'document',
      id: id,
      body: document
    });
  }


  /**
   * Search a keyword in ElasticSearch
   * @param  {String} keyword
   * @return {Promise}
   */
  search(keyword) {
    return this.client.search({
      index: 'products',
      body: {
        "query": {
          "bool": {
            "should": [
              {
                "multi_match": {
                  "query": keyword,
                  "type": "phrase",
                  "fields": ["sku", "ediRef"]
                }
              }, {
                "multi_match": {
                  "query": keyword,
                  "fuzziness": 1,
                  "prefix_length": 10,
                  "fields": ["name", "description"]
                }
              }
            ]
          }
        }
      }
    }).then(response => {
      const products = response.hits.hits.map(i => {
        return i._source;
      });

      return _.sortBy(products, 'isInStock').reverse();
    });
  }
}

module.exports = new ElasticSearch();
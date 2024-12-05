const { options } = require('@hapi/joi/lib/base');
const Joi = require('@hapi/joi');
const { postPredictHandler, getHistoryHandler } = require('./handler');
const { path } = require('@hapi/joi/lib/errors');
 
const routes = [
  {// end point post predict
      method: 'POST',
      path: '/predict',
        config: {
            payload: {
                maxBytes: 1048576, // 1MB
                output: 'stream',
                parse: true,
                multipart: true,
            },
    },
    handler: postPredictHandler,
  },
  {//endpoint get history
    method: 'GET',
    path: '/predict/histories',
    handler: getHistoryHandler,
  },
];
 
module.exports = routes;
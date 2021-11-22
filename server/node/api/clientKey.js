const { post } = require('request');
const getPostParametersPOS = require('../utils/getPostParametersPOS');
const handleCallback = require('../utils/handleCallback');

module.exports = (res, request) => {
  return process.env.CLIENT_KEY
  //const port = process.env.PORT || 3000;
    //const params = getPostParametersPOS('/clientKey', request);

    //post(params, (error, response, body) => //handleCallback({ error, response, body }, res));
};

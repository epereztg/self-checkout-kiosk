const { post } = require('request');
const getPostParametersPOS = require('../utils/getPostParametersPOS');
const handleCallback = require('../utils/handleCallback');

module.exports = (res, request) => {
    const params = getPostParametersPOS('/clientKey', request);

    post(params, (error, response, body) => handleCallback({ error, response, body }, res = process.env.CLIENT_KEY));
};

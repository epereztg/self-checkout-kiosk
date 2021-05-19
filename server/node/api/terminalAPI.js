const { post } = require('request');
const getPostParameters = require('../utils/getPostParametersPOS');
const handleCallback = require('../utils/handleCallback');

module.exports = (res, request) => {
    const params = getPostParameters('/sync', request);

    post(params, (err, response, body) => handleCallback({ err, response, body }, res));
};

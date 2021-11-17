const { post } = require('request');
const getPostParameters = require('../utils/getPostParameters');
const handleCallback = require('../utils/handleCallback');

module.exports = (res, request) => {
    const params = getPostParameters('/connectedTerminals', request);

    post(params, (error, response, body) => handleCallback({ error, response, body }, res));
};

const { post } = require('request');
const getPostParametersPOS = require('../utils/getPostParametersPOS');
const handleCallback = require('../utils/handleCallback');

module.exports = (res, request) => {
    const params = getPostParametersPOS('/clientKey', request);

    //overwrting by now
    post(params, (error, response, body) => handleCallback({ error, response, body }, process.env.CLIENT_KEY;));
};

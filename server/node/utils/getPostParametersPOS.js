const { CHECKOUT_APIKEY, TERMINAL_URL, MERCHANT_ACCOUNT,COMPANY_ACCOUNT } = require('./config');

module.exports = (endpoint, request) => {
    const body = JSON.stringify({
        merchantAccount: MERCHANT_ACCOUNT,
        //companyAccount: COMPANY_ACCOUNT,
        ...request
    });

    return {
        body,
        url: `${TERMINAL_URL}/${endpoint}`,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(body, 'utf8'),
            'X-Api-Key': CHECKOUT_APIKEY
        }
    };
};

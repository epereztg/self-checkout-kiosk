const { CHECKOUT_APIKEY, MERCHANT_ACCOUNT } = process.env;

const API_VERSION = 'v52';
const CHECKOUT_URL = `https://checkout-test.adyen.com/${API_VERSION}`;
const TERMINAL_URL = `https://terminal-api-test.adyen.com/`;

module.exports = {
    CHECKOUT_APIKEY,
    CHECKOUT_URL,
    TERMINAL_URL,
    MERCHANT_ACCOUNT
};

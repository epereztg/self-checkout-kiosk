const defaultCurrency = localStorage.getItem('defaultCurrency')!=null ? localStorage.getItem('defaultCurrency') : 'EUR';
const defaultCountry = localStorage.getItem('defaultCountry')!=null ? localStorage.getItem('defaultCountry'): 'ES';
const defaultLocale = localStorage.getItem('defaultLocale')!=null ? localStorage.getItem('defaultLocale') : 'en-EN';
const defaultAmount = Math.floor(Math.random() * 100000)
const defaultShopperReference = localStorage.getItem('shopperReference')!=null ? localStorage.getItem('shopperReference'):'mail@adyen.com'

const defaultShopperStatement= "test_c1"

const countries = ['ES','BE','NO','MX','NL','PT','AT','SE','DE','FR','CN']
const countryNames = ['Spain','Belgium','Norway','Mexico','Netherlands','Portugal','Austria','Sweden','Deutschland','France','China']
const locale = ['es-ES', 'en-EN', 'pt-PT']
const currencies = ['EUR','GBP','USD','CNY','SEK','MXN','NOK']
const flags = ['🇪🇸','🇧🇪','🇳🇴','🇲🇽','🇳🇱','🇵🇹','🇦🇹','🇸🇪','🇩🇪','🇫🇷','🇨🇳']
const localeflags = ['🇪🇸','🇳🇱','🇵🇹']

const defaultUrl = () => {
    if (window.location.origin.includes("heroku", 1)) {
        return "https://coffeekiosk.herokuapp.com/#/review"
    } else return "http://localhost:3000/#/review"
}
//Drop down list utils
const getCountryIndex = () => {
  var cc = localStorage.getItem('defaultCountry')!=null ? localStorage.getItem('defaultCountry'): defaultCountry;//defaultCountry;//ocalStorage.getItem('defaultCountry')
  paymentMethodsConfig.countryCode= defaultCountry;
  return countries.indexOf(cc, 0);
}
const getLocaleIndex = () => {
  var cc = localStorage.getItem('defaultLocale')!=null ? localStorage.getItem('defaultLocale') : defaultLocale;//localStorage.getItem('defaultLocale')
  return locale.indexOf(cc, 0);
}

const getCurrencyIndex = () => {
  var cc = localStorage.getItem('defaultCurrency')!=null ? localStorage.getItem('defaultCurrency') : defaultCurrency;//localStorage.getItem('defaultCurrency')
  return currencies.indexOf(cc, 0);
}

const getCountryCode = () => {
    var cc = localStorage.getItem('defaultCountry')
    if(cc!=null) return cc
    else return defaultCountry;
}

const getCurrencyCode = () => {
    var cc = localStorage.getItem('defaultCurrency')
    if(cc!=null) return cc
    else return defaultCurrency;
}
const savePaymentData = (paymentData = {}) => {
    localStorage.setItem('paymentData', paymentData)
}
const saveDetails = (details = {}) => {
    localStorage.setItem('details', details)
}
const getPaymentData = () => {
    return localStorage.getItem('paymentData')
}
const getDetails = () => {
    return localStorage.getItem('details')
}
const saveAmount = (amount = {}) => {
    localStorage.setItem('defaultAmount', amount)
}
const getAmount = () => {
    return localStorage.getItem('defaultAmount')
}
const saveActionType = (type = {}) => {
    localStorage.setItem('actiontype', type)
}
const getActionType = (type = {}) => {
    return localStorage.getItem('actiontype')
}

const paymentMethodsConfig = {
    shopperReference: defaultShopperReference,
    reference: 'Checkout Components KIOSK',
    countryCode: defaultCountry,
    amount: {
        value: defaultAmount,
        currency: defaultCurrency
    }
    //merchantId: 'MH5P3AYBGR47S'
    // paypal: {
    //     merchantId: 'UZQDU74XMGU56',
    //     environment: "test",
    //     countryCode: defaultCountry,
    //     amount: {
    //         currency: defaultCurrency,
    //         value: defaultAmount
    //     }
    // }
};

const paymentsDefaultConfig = {
    //shopperReference: 'Checkout Components sample code test',
    channel: 'Web',
    returnUrl: defaultUrl,
    origin: defaultUrl,
    reference: 'KIOSK-DROPIN',
    shopperReference: defaultShopperReference,
    shopperEmail: 'elena.pereztoril@adyen.com',
    countryCode: defaultCountry,
    amount: {
        value: defaultAmount,
        currency: defaultCurrency
    },
    shopperLocale: defaultLocale,
    shopperStatement: defaultShopperStatement,
    // paypal: {
    //     merchantId: 'UZQDU74XMGU56',
    //     environment: "test",
    //     countryCode: "ES",
    //     amount: {
    //         currency: "defaultCurrency",
    //         value: 100
    //     },
    // },
    shopperIP: '127.0.0.1',
    additionalData: {
        allow3DS2: true
    },
    lineItems: [{
        id: '1',
        description: 'Test Item 1',
        amountExcludingTax: defaultAmount-10,
        amountIncludingTax: defaultAmount,
        taxAmount: 10,
        taxPercentage: 1800,
        quantity: 1,
        taxCategory: 'High'
    }]
};

const httpPostRaw = (endpoint, data) =>
    fetch(`/${endpoint}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response);

const httpPostnoJson = (endpoint, data) =>
    fetch(`/${endpoint}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(
      response => response.text()
    ); // convert to plain text

// Generic POST Helper
const httpPost = (endpoint, data) =>
    fetch(`/${endpoint}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response =>
      response.json()
    ); //.then(response => console.log('Response '+response))

// Get all available payment methods from the local server
const getPaymentMethods = () =>

    httpPost('paymentMethods', paymentMethodsConfig)
    .then(response => {
        if (response.error) throw 'No paymentMethods available';

        return response;
    })
    .catch(console.error);

var oney =     {
        "merchantAccount": "ElenaPerez",
        "reference": "00699341",
        "browserInfo": {
            "acceptHeader": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9gzip",
            "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36"
        },
        "applicationInfo": {
            "adyenPaymentSource": {
                "name": "adyen-salesforce-commerce-cloud",
                "version": "19.2.0"
            },
            "externalPlatform": {
                "name": "SalesforceCommerceCloud",
                "version": ""
            }
        },
        "returnUrl": "https://adyen.com",
        "amount": {
            "currency": "EUR",
            "value": 19900
        },
        "countryCode": "ES",
        "deliveryAddress": {
            "city": "madrid",
            "country": "ES",
            "houseNumberOrName": "",
            "postalCode": "28035",
            "stateOrProvince": "madrid",
            "street": "test"
        },
        "billingAddress": {
            "city": "madrid",
            "country": "ES",
            "houseNumberOrName": "",
            "postalCode": "28035",
            "stateOrProvince": "madrid",
            "street": "test"
        },
        "paymentMethod": {
            "type": "facilypay_3x"
        },
        "lineItems": [
            {
                "amountExcludingTax": "16446",
                "taxAmount": "3454",
                "description": "Parka acolchada",
                "id": "78542500104",
                "quantity": "1",
                "taxCategory": "None",
                "taxPercentage": "2100"
            },
            {
                "amountExcludingTax": "0",
                "taxAmount": "0",
                "description": "STANDARD_SHIPPING",
                "id": "3aec4677d4d7347f8ac21d99a3",
                "quantity": "1",
                "taxCategory": "None",
                "taxPercentage": "0"
            }
        ],
        "telephoneNumber": "+34651332211",
        "shopperEmail": "nienke.griffioen@digitas.com",
        "shopperName": {
            "firstName": "test",
            "gender": "UNKNOWN",
            "infix": "",
            "lastName": "test"
        },
        "shopperReference": "1404528",
        "shopperIP": "94.211.95.34",
        "shopperLocale": "es_ES",
        "executeThreeD": true,
        "additionalData": {
            "riskdata.deliveryMethod": "home-delivery-ES",
            "riskdata.numberOfDaysShopperIsLoyal": "0301001227000005",
            "riskdata.promotionCode": "N/A",
            "riskdata.userStatus": "yes",
            "riskdata.basket.item0": {
                "category": "man"
            }
        }
    }

    var salsa = {
    "merchantAccount": "ElenaPerez",
    "reference": "02472380",
    "browserInfo": {
        "acceptHeader": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9gzip",
        "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36"
    },
    "applicationInfo": {
        "adyenPaymentSource": {
            "name": "adyen-salesforce-commerce-cloud",
            "version": "19.2.0"
        },
        "externalPlatform": {
            "name": "SalesforceCommerceCloud",
            "version": ""
        }
    },
    "returnUrl": defaultUrl,
    "amount": {
        "currency": "EUR",
        "value": 3994
    },
    "countryCode": "GB",
    "deliveryAddress": {
        "city": "London",
        "country": "GB",
        "houseNumberOrName": "",
        "postalCode": "wc2n 5du",
        "stateOrProvince": "London",
        "street": "Test street"
    },
    "billingAddress": {
        "city": "London",
        "country": "GB",
        "houseNumberOrName": "",
        "postalCode": "wc2n 5du",
        "stateOrProvince": "London",
        "street": "Test street"
    },
    "paymentMethod": {
        "type": "paypal"
    },
    "telephoneNumber": "+44342134238948",
    "shopperEmail": "barry.boesveld@digitas.com",
    "shopperName": {
        "firstName": "Barry",
        "gender": "UNKNOWN",
        "infix": "",
        "lastName": "Boesveld"
    },
    "shopperReference": "7724-0646246",
    "shopperIP": "94.211.95.34",
    "shopperLocale": "en_GB",
    "executeThreeD": true,
    "additionalData": {
        "riskdata.deliveryMethod": "home-delivery-FR-BE-DE-GB-IT-NL-LU",
        "riskdata.numberOfDaysShopperIsLoyal": "N/A",
        "riskdata.promotionCode": "N/A",
        "riskdata.userStatus": "no",
        "riskdata.basket.item0": {
            "category": "woman_vestidos"
        }
    }
}

// Posts a new payment into the local server
const makePayment = (paymentMethod, config = {}) => {
    //const paymentsConfig = { ...config };
    const paymentsConfig = {
        ...paymentsDefaultConfig,
        ...config
    };
    const paymentRequest = {
        ...paymentsConfig,
        ...paymentMethod
    };

    paymentRequest.amount.value = parseInt(getAmount());
    paymentRequest.amount.currency = getCurrencyCode();
    paymentRequest.returnUrl = defaultUrl();
    paymentRequest.origin = defaultUrl();
    paymentRequest.shopperReference = defaultShopperReference;

    if (paymentRequest.paymentMethod.storedPaymentMethodId != null)
      paymentRequest.shopperInteraction = 'ContAuth';

    var obj = paymentRequest
    console.log('paymentRequest: ',obj)

    return httpPost('payments', paymentRequest)
        .then(response => {
            if (response.error) throw 'Payment initiation failed';

            return response;
        })
        .catch(error => {
            console.log('error on makePayment' + error)
            throw Error(error);
        });
};

const handlePostMessage = (e) => {
    console.log('EVENTDATA: ' + e)
};

//to be used in redirect type. i.e Alipay, Interac
const paymentDetails = (paymentData, config = {}) => {
    var paymentRequest = paymentData;

    if (getActionType() == "redirect") {
        paymentRequest = {
            paymentData: paymentData,
            details: {
                redirectResult: config
            }
        }
    }

    return httpPostnoJson('payments/details', paymentRequest)
        .then(response => {
            if (response.error) throw 'Payment details failed';
            console.log("paymentdetails response: "+response)
            return response;
        })
        .catch(error => {
            console.log('error on paymentDetails' + error)
            throw Error(error);
        });
};

const paymentLinks = (paymentData) => {
    var paymentRequest = paymentData;

    return httpPostnoJson('paymentLinks', paymentRequest)
        .then(response => {
            if (response.error) throw 'Payment initiation failed';

            return JSON.parse(response).url;
        })
        .catch(error => {
            console.log('error on makePayment' + error)
            throw Error(error);
        });
};

// Fetches an originKey from the local server
const getOriginKey = () =>
httpPost('originKeys')
.then(response => {
    var origin = Object.keys(response.originKeys)[0];

    if (response.error || !response.originKeys) throw 'No originKey available';
    else if (origin.includes("heroku", 1)) {
        //origin = origin.replace("http", "https");
        //console.log('origin '+origin)
        //console.log('Originkey'+response.originKeys[Object.keys(response.originKeys)[0]]);
        return response.originKeys[Object.keys(response.originKeys)[0]];//response.originKeys[origin];
    }
    return response.originKeys[Object.keys(response.originKeys)[0]];
})
.catch(console.error);

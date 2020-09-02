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

const httpGet = (endpoint, data) =>
    fetch(`/${endpoint}`+`/${data}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
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

  // Test soft decline
  //"holderName": "AUTHENTICATION_REQUIRED : 1A",
  //"RequestedTestAcquirerResponseCode":38
  var softDecline =  {
       "channel" : "Web",
       //"recurringProcessingModel" : "CardOnFile",
       "shopperInteraction" : "Ecommerce",
       "additionalData" : {
          "allow3DS2" : "true",
          "RequestedTestAcquirerResponseCode":38,
          "executeThreeD":"false"
       },
       "amount" : {
          "currency" : "EUR",
          "value" : 1575
       },
       "browserInfo" : {
          "acceptHeader" : "*\/*",
          "colorDepth" : 24,
          "javaEnabled" : false,
          "language" : "es-ES",
          "screenHeight" : 1440,
          "screenWidth" : 3440,
          "timeZoneOffset" : -120,
          "userAgent" : "Mozilla\/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit\/537.36 (KHTML, like Gecko) Chrome\/84.0.4147.105 Safari\/537.36"
       },
       "countryCode" : "PT",
       "merchantAccount" : "ElenaPerez",
       "paymentMethod" : {
          "type" : "scheme",
          "encryptedExpiryMonth" : "test_03",
          "encryptedSecurityCode" : "test_737",
          "encryptedExpiryYear" : "test_2030",
          "encryptedCardNumber" : "test_5454545454545454"
        },
       "reference" : "8303992",
       "returnUrl" : "http:\/\/localhost:3000",
       "shopperLocale" : "pt-PT",
       "shopperReference" : "93000004596428",
       "origin" : "http://localhost:3000/#/review"
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

    // if (paymentRequest.paymentMethod.storedPaymentMethodId != null)
    //   paymentRequest.shopperInteraction = 'ContAuth';

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
const paymentDetails = (paymentData, detailsKey, config = {}) => {
    var paymentRequest = paymentData;

    if (getActionType() == "redirect") {
        paymentRequest = {
            paymentData: paymentData,
            details: {
                //redirectResult: config
                [detailsKey]: config
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

const paymentLinksQR = (paymentData) => {
    var paymentRequest = paymentData;

    return httpPostnoJson('paymentLinksQR', paymentRequest)
        .then(response => {
            if (response.error) throw 'Create PBL failed';

            //return JSON.parse(response);
            return response;
        })
        .catch(error => {
            console.log('error on create PBL' + error)
            throw Error(error);
        });
};

const paymentLinksStatus = (url) => {
    //var paymentRequest = paymentData;
    var pblID = url.split('=')[1];
    return httpGet('paymentLinksStatus', pblID)
        .then(response => {
            if (response.error) throw 'Get PBL status failed';
            //return response;
            return JSON.parse(response).status;
        })
        .catch(error => {
            console.log('error while getting PBL status' + error)
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

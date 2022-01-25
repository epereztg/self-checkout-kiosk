const defaultCurrency = localStorage.getItem('defaultCurrency') != null ? localStorage.getItem('defaultCurrency') : 'EUR';
const defaultCountry = localStorage.getItem('defaultCountry') != null ? localStorage.getItem('defaultCountry') : 'ES';
const defaultLocale = localStorage.getItem('defaultLocale') != null ? localStorage.getItem('defaultLocale') : 'en-GB';
const defaultAmount = Math.floor(Math.random() * 100000)
const defaultShopperReference = localStorage.getItem('shopperReference') != null ? localStorage.getItem('shopperReference') : 'mail@adyen.com'
const defaultRequest = localStorage.getItem('requestToPayments') != null ? localStorage.getItem('requestToPayments') : null
const defaultShopperStatement = "test_c1"

const defaultTerminal = 'S1EL-000150203407529'

const countries = ['ES', 'BE', 'NO', 'MX', 'NL', 'PT', 'AT', 'SE', 'DE', 'FR', 'CN', 'KR', 'AU', 'CH', 'GB']
const countryNames = ['Spain', 'Belgium', 'Norway', 'Mexico', 'Netherlands', 'Portugal', 'Austria', 'Sweden', 'Germany', 'France', 'China', 'Korea', 'Australia', 'Switzerland', 'UK']
const locale = ['es-ES', 'en-GB', 'pt-PT']
const currencies = ['EUR', 'GBP', 'USD', 'CNY', 'SEK', 'MXN', 'NOK', 'KRW', 'AUD']
const flags = ['🇪🇸', '🇧🇪', '🇳🇴', '🇲🇽', '🇳🇱', '🇵🇹', '🇦🇹', '🇸🇪', '🇩🇪', '🇫🇷', '🇨🇳', '🇰🇷', '🇦🇺', '🇨🇭', '🇬🇧']
const localeflags = ['🇪🇸', '🇬🇧', '🇵🇹']

const defaultOrigin = () => {
    if (window.location.origin.includes("heroku", 1)) {
        return "https://self-checkout-demo.herokuapp.com/#/checkout"
    } else {
        return "http://localhost:3000/#/checkout"
    }
}

const defaultUrl = (type) => {
    if (window.location.origin.includes("heroku", 1)) {
        return "https://self-checkout-demo.herokuapp.com/#/checkout"
    } else {
        if (type == "scheme") return "http://localhost:3000/fallbackthreedone"
        else return window.location.href
    }
}
//Drop down list utils
const getCountryIndex = () => {
    var cc = localStorage.getItem('defaultCountry') != null ? localStorage.getItem('defaultCountry') : defaultCountry; //defaultCountry;//ocalStorage.getItem('defaultCountry')
    paymentMethodsConfig.countryCode = defaultCountry;
    return countries.indexOf(cc, 0);
}
const getLocaleIndex = () => {
    var cc = localStorage.getItem('defaultLocale') != null ? localStorage.getItem('defaultLocale') : defaultLocale; //localStorage.getItem('defaultLocale')
    return locale.indexOf(cc, 0);
}

const getCurrencyIndex = () => {
    var cc = localStorage.getItem('defaultCurrency') != null ? localStorage.getItem('defaultCurrency') : defaultCurrency; //localStorage.getItem('defaultCurrency')
    return currencies.indexOf(cc, 0);
}

const getCountryCode = () => {
    var cc = localStorage.getItem('defaultCountry')
    if (cc != null) return cc
    else return defaultCountry;
}

const getCurrencyCode = () => {
    var cc = localStorage.getItem('defaultCurrency')
    if (cc != null) return cc
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

const paymentsDefaultConfigPOS = {
    SaleToPOIRequest: {
        MessageHeader: {
            ProtocolVersion: '3.0',
            MessageClass: 'Service',
            MessageCategory: 'Payment',
            MessageType: 'Request',
            SaleID: 'BTQAMS-10901',
            ServiceID: Math.floor(Math.random() * 100000).toString(),
            POIID: defaultTerminal
        },
        PaymentRequest: {
            SaleData: {
                SaleTransactionID: {
                    TransactionID: "DEMO-DROPIN",
                    TimeStamp: new Date().toISOString()
                },
                SaleToAcquirerData: 'eyJzaG9wcGVyUmVmZXJlbmNlIjoiODMzOTA5NzIxIiwicmVjdXJyaW5nQ29udHJhY3QiOiJPTkVDTElDSyxSRUNVUlJJTkcifQ==',
                TokenRequestedType: 'Customer'
            },
            PaymentTransaction: {
                AmountsReq: {
                    Currency: defaultCurrency,
                    RequestedAmount: (defaultAmount / 100)
                }
            }
        }
    }
};

const paymentsDefaultConfig = {
    channel: 'Web',
    returnUrl: defaultUrl(),
    origin: defaultOrigin(),
    reference: 'KIOSK-DROPIN',
    dateOfBirth: '1970-01-01',
    shopperReference: defaultShopperReference,
    shopperEmail: 'shopper@merchant.com',
    countryCode: defaultCountry,
    amount: {
        value: defaultAmount,
        currency: defaultCurrency
    },
    shopperLocale: defaultLocale,
    shopperStatement: defaultShopperStatement,
    shopperIP: '127.0.0.1',
    additionalData: {
        allow3DS2: true
    },
    billingAddress: { //i.e. required for AfterPay
        country: 'ES',
        city: 'Madrid',
        street: 'Calle de Atocha 27',
        houseNumberOrName: '27',
        stateOrProvince: 'ES',
        postalCode: '28001'
    },
    shopperName: {
        firstName: "Juan",
        gender: "male",
        lastName: "Perez"
    },
    deliveryAddress: {
        country: 'ES',
        city: 'Madrid',
        street: 'Calle de Atocha 27',
        houseNumberOrName: '27',
        stateOrProvince: 'ES',
        postalCode: '28001'
    },
    lineItems: [{
            amountExcludingTax: "9836",
            taxAmount: "2164",
            description: "TEST 1927",
            id: "WC00018_ARE000_1007_0287S_100",
            quantity: "2",
            taxCategory: "None",
            taxPercentage: "2200"
        },
        {
            amountExcludingTax: "0",
            taxAmount: "0",
            description: "STANDARD_SHIPPING",
            id: "4f3dd176c464c96945c18bdc71",
            quantity: "1",
            taxCategory: "None",
            taxPercentage: "0"
        }
    ],
    threeDS2RequestData: {
        deviceChannel: "browser",
        notificationURL: defaultUrl
    }
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

// "paymentMethod" : {
//    "encryptedCardNumber" : "test_5454545454545454",
//    "encryptedExpiryMonth" : "test_03",
//    "encryptedExpiryYear" : "test_2030",
//    "encryptedSecurityCode" : "test_737",
//    "holderName" : "Elena",
//    "type" : "scheme",
//    "storeDetails": false
// },

const makePOSPayment = (paymentMethod, config = {}) => {
    paymentsDefaultConfigPOS.SaleToPOIRequest.MessageHeader.POIID = localStorage.getItem("selectTerminal");
    paymentsDefaultConfigPOS.SaleToPOIRequest.MessageHeader.ServiceID = Math.floor(Math.random() * 100000).toString();
    const paymentsConfig = {
        ...paymentsDefaultConfigPOS,
        ...config
    };
    var paymentRequest = {
        ...paymentsConfig,
        ...paymentMethod
    };

    return httpPost('terminalAPI', paymentRequest)
        .then(response => {
            return response;
        })
        .catch(error => {
            console.log('error on makePOSPayment' + error)
            throw Error(error);
        });
};


var klarna = {
   "amount" : {
      "value" : 1100,
      "currency" : "CHF"
   },
   "billingAddress" : {
      "city" : "Lausanne",
      "country" : "CH",
      "houseNumberOrName" : "Rue Centrale 12",
      "postalCode" : "1003",
      "stateOrProvince" : "",
      "street" : "Rue Centrale 12"
   },
   "channel" : "Web",
   "countryCode" : "CH",
   "deliveryAddress" : {
      "city" : "Lausanne",
      "country" : "CH",
      "houseNumberOrName" : "Rue Centrale 12",
      "postalCode" : "1003",
      "stateOrProvince" : "",
      "street" : "Rue Centrale 12"
   },
   "lineItems":[
      {
         "quantity":"1",
         "amountExcludingTax":"331",
         "taxPercentage":"2100",
         "description":"Shoes",
         "id":"Item #1",
         "taxAmount":"69",
         "amountIncludingTax":"400"
      },
      {
         "quantity":"2",
         "amountExcludingTax":"248",
         "taxPercentage":"2100",
         "description":"Socks",
         "id":"Item #2",
         "taxAmount":"52",
         "amountIncludingTax":"300"
      }
   ],
   "merchantAccount" : "ElenaPerez",
   "paymentMethod" : {
      "type" : "klarna"
   },
   "reference" : "*******57521",
   "returnUrl" : "http://localhost:3000/#/checkout",
   "shopperEmail" : "youremail@email.com",
   "shopperIP" : "127.0.0.1",
   "shopperLocale" : "en_CH",
   "shopperName" : {
      "lastName" : "autoLastName",
      "firstName" : "autoFirstName"
   },
   "shopperReference" : "3091048",
   "telephoneNumber" : "0041444433333",
   "applicationInfo" : {
      "adyenLibrary" : {
         "name" : "adyen-java-api-library",
         "version" : "17.0.0"
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
    var paymentRequest = {
        ...paymentsConfig,
        ...paymentMethod
    };

    paymentRequest.amount.value = parseInt(getAmount());
    paymentRequest.amount.currency = getCurrencyCode();
    paymentRequest.returnUrl = defaultUrl(paymentMethod.paymentMethod.type);
    paymentRequest.origin = defaultOrigin();
    paymentRequest.shopperReference = defaultShopperReference;

    //if (paymentRequest.paymentMethod.storedPaymentMethodId != null)
    paymentRequest.shopperInteraction = 'Ecommerce';

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

//to be used in redirect type. i.e Alipay, Interac
const paymentDetails = (paymentData, detailsKey, config = {}) => {
    var paymentRequest = paymentData;

    if (getActionType() == "redirect") {
        paymentRequest = {
            details: {
                "redirectResult": config
                //[detailsKey]: config
            }
        }
    } else {
        paymentRequest =
            paymentData
    }

    return httpPostnoJson('payments/details', paymentRequest)
        .then(response => {
            if (response.error) throw 'Payment details failed';
            return response;
        })
        .catch(error => {
            console.log('error on paymentDetails' + error)
            throw Error(error);
        });
};

const fallbackthreedone = () =>
    httpPost('fallbackthreedone')
    .then(response => {
        return response;
    })
    .catch(console.error);

const generatePayByLinkUrl = (paymentData) => {
    var paymentRequest = paymentData;

    paymentRequest.amount.value = parseInt(getAmount());
    paymentRequest.amount.currency = getCurrencyCode();
    paymentRequest.returnUrl = defaultUrl();
    paymentRequest.shopperReference = defaultShopperReference;

    //Remove properties in json
    let { channel, origin, dateOfBirth, shopperIP, threeDS2RequestData,shopperStatement, ...paymentRequestPBL } = paymentRequest;

    return httpPostnoJson('paymentLinks', paymentRequestPBL)
        .then(response => {
            if (response.error) throw 'Payment initiation failed';
            return JSON.parse(response).url;
        })
        .catch(error => {
            console.log('error on paymentLinks' + error)
            throw Error(error);
        });
};

const getTerminals = (paymentData) => {
    var request = {}
    return httpPostnoJson('getTerminals', request)
        .then(response => {
            if (response.error) throw 'getTerminals failed';
            return response;
        })
        .catch(error => {
            console.log('error on getTerminals' + error)
            throw Error(error);
        });
};

const getTerminalDetails = (terminalID) => {
    var request = {
        "terminal": terminalID
    }
    return httpPostnoJson('getTerminalDetails', request)
        .then(response => {
            if (response.error) throw 'getTerminalDetails failed';
            return response;
        })
        .catch(error => {
            console.log('error on getTerminalDetails' + error)
            throw Error(error);
        });
};

const connectedTerminals = (terminalID) => {
    var request = {}
    return httpPostnoJson('connectedTerminals', request)
        .then(response => {
            if (response.error) throw 'connectedTerminals failed';
            return response;
        })
        .catch(error => {
            console.log('error on connectedTerminals' + error)
            throw Error(error);
        });
};

 const getClientKey = () => {
     if (window.location.origin.includes("jogotech", 1)) {
         return "test_IPXP2NJCN5CW7NUYLN2T5DH6RILHZ24F"
     } else {
         return "test_E3XT7DO34FETRCDF4XFV5XX2GMRW3TQZ"
     }
 }

// const getClientKey = () =>
//     httpPostnoJson('clientKey')
//     .then(response => {
//         return response
//     })
//     .catch(console.error);

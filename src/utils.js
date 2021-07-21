const defaultCurrency = localStorage.getItem('defaultCurrency')!=null ? localStorage.getItem('defaultCurrency') : 'EUR';
const defaultCountry = localStorage.getItem('defaultCountry')!=null ? localStorage.getItem('defaultCountry'): 'ES';
const defaultLocale = localStorage.getItem('defaultLocale')!=null ? localStorage.getItem('defaultLocale') : 'en-GB';
const defaultAmount = Math.floor(Math.random() * 100000)
const defaultShopperReference = localStorage.getItem('shopperReference')!=null ? localStorage.getItem('shopperReference'):'mail@adyen.com'
const defaultRequest= localStorage.getItem('requestToPayments')!=null ? localStorage.getItem('requestToPayments'):null

const defaultShopperStatement= "test_c1"

const countries = ['ES','BE','NO','MX','NL','PT','AT','SE','DE','FR','CN','KR', 'AU', 'CH','GB']
const countryNames = ['Spain','Belgium','Norway','Mexico','Netherlands','Portugal','Austria','Sweden','Germany','France','China', 'Korea','Australia', 'Switzerland', 'UK']
const locale = ['es-ES','en-GB','pt-PT']
const currencies = ['EUR','GBP','USD','CNY','SEK','MXN','NOK','KRW','AUD']
const flags = ['🇪🇸','🇧🇪','🇳🇴','🇲🇽','🇳🇱','🇵🇹','🇦🇹','🇸🇪','🇩🇪','🇫🇷','🇨🇳','🇰🇷','🇦🇺', '🇨🇭', '🇬🇧']
const localeflags = ['🇪🇸','🇬🇧','🇵🇹']

const defaultOrigin = () => {
    if (window.location.origin.includes("heroku", 1)) {
        return "https://coffeekiosk.herokuapp.com/#/checkout"
    } else {
       return window.location.href//"http://localhost:3000/#/checkout"
    }
}

const defaultUrl = (type) => {
    if (window.location.origin.includes("heroku", 1)) {
        return "https://coffeekiosk.herokuapp.com/#/checkout"
    } else {
        if (type == "scheme") return "http://localhost:3000/fallbackthreedone"
        else return window.location.href//"http://localhost:3000/#/checkout"
      }
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
    returnUrl: defaultUrl(),
    origin: defaultOrigin(),
    reference: 'KIOSK-DROPIN',
    dateOfBirth: '1970-01-01',
    shopperReference: defaultShopperReference,
    shopperEmail: 'juan@perez.com',
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
    billingAddress: { //i.e. required for AfterPay
        country: 'ES',
        city: 'Madrid',
        street: 'Calle de Atocha 27',
        houseNumberOrName: '27',
        stateOrProvince: 'ES',
        postalCode: '28001'
    },
    shopperName:{
      firstName:"Juan",
      gender:"male",
      lastName:"Perez"
   },
    deliveryAddress: {
      country: 'ES',
      city: 'Madrid',
      street: 'Calle de Atocha 27',
      houseNumberOrName: '27',
      stateOrProvince: 'ES',
      postalCode: '28001'
    },
    lineItems : [
      {
         amountExcludingTax : "9836",
         taxAmount : "2164",
         description : "TEST 1927",
         id : "WC00018_ARE000_1007_0287S_100",
         quantity : "2",
         taxCategory : "None",
         taxPercentage : "2200",
         imageUrl : "https:\/\/images.furla.com\/delivery\/public\/image\/furla\/f075cfd1-a586-4241-ab7a-9258d011abc7\/h8wzfw\/std\/670x670\/WC00018_ARE000_1007.jpgfurla_1927.png",
         productUrl : "https:\/\/test.furla.com\/it\/it\/eshop\/furla-1927-WC00018_ARE000_1007_0287S_100.html"
      },
      {
         amountExcludingTax : "0",
         taxAmount : "0",
         description : "STANDARD_SHIPPING",
         id : "4f3dd176c464c96945c18bdc71",
         quantity : "1",
         taxCategory : "None",
         taxPercentage : "0"
      }
   ],
    threeDS2RequestData : {
      deviceChannel : "browser",
      notificationURL : defaultUrl
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

  //INFO: add custom request here to overwrite dropin input
  //var custom = {
    //payment request here
  //}

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
       //const paymentsConfig = { ...config };
       const paymentsConfig = {
           ...paymentsDefaultConfig,
           ...config
       };
       var paymentRequest = {
           ...paymentsConfig,
           ...paymentMethod
       };

       return httpPost('terminalAPI', paymentRequest)
           .then(response => {
               if (response.error) throw 'Payment initiation failed';


               //document.cookie = "paymentData=" + response.paymentData;
               //document.cookie = "redirectResult=" + response.redirectResult;
               return response;
           })
           .catch(error => {
               console.log('error on makePOSPayment' + error)
               throw Error(error);
           });
   };

   // "threeDS2RequestData" : {
   //    "deviceChannel" : "browser",
   //    "notificationURL" : "http://localhost:3000/#/checkout",
   //    "threeDSCompInd" : "Y"
   // },

   var ele ={
   "merchantAccount" : "ElenaPerez",
   "shopperReference" : "000303631af0a1421-d8b9-4943-8177-d1031a832328",
   "shopperEmail" : "kpett@mayborngroup.com",
   "telephoneNumber" : "07850164677",
   "shopperName" : {
      "firstName" : "Kirsten",
      "lastName" : "Pett"
   },
   "countryCode" : "GB",
   "shopperLocale" : "en_GB",
   "shopperIP" : "141.101.99.50",
   "billingAddress" : {
      "street" : "60 Cecil Road",
      "postalCode" : "EX2 9AQ",
      "city" : "Exeter",
      "houseNumberOrName" : "N\/A",
      "country" : "GB",
      "stateOrProvince" : "Devon"
   },
   "deliveryAddress" : {
      "street" : "60 Cecil Road",
      "postalCode" : "EX2 9AQ",
      "city" : "Exeter",
      "houseNumberOrName" : "N\/A",
      "country" : "GB",
      "stateOrProvince" : "Devon"
   },
   "amount" : {
      "currency" : "GBP",
      "value" : 13498
   },
   "reference" : "000303631",
   "fraudOffset" : "0",
   "browserInfo" : {
      "userAgent" : "Mozilla\/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit\/605.1.15 (KHTML, like Gecko) CriOS\/91.0.4472.80 Mobile\/15E148 Safari\/604.1",
      "acceptHeader" : "*\/*"
   },
   "shopperInteraction" : "Ecommerce",
   "recurringProcessingModel" : "Subscription",
   "paymentMethod" : {
      "type" : "klarna_account"
   },
   "riskData" : {
      "clientData" : "eyJ2ZXJzaW9uIjoiMS4wLjAiLCJkZXZpY2VGaW5nZXJwcmludCI6IjFCMk0yWThBc2cwMDAwMDAwMDAwMDAwMDAwQlRXRGZZWlZSMzAwMTIxNjUyMTZjVkI5NGlLekJHQzZRRTJWVXVTZTFCMk0yWThBc2cwMDBZWlhjWEl5SlM3MDAwMDBobjVYdjAwMDAweFBXVDBHVnBtN0dpaTJDRm5HSWM6MjAiLCJwZXJzaXN0ZW50Q29va2llIjpbXSwiY29tcG9uZW50cyI6eyJ1c2VyQWdlbnQiOiIzOThlMjdmMTUwZjFlODEyODVjNzdiZWJhMzVjNGUyZiIsIndlYmRyaXZlciI6MCwibGFuZ3VhZ2UiOiJlbi1nYiIsImNvbG9yRGVwdGgiOjMyLCJwaXhlbFJhdGlvIjoyLCJzY3JlZW5XaWR0aCI6ODk2LCJzY3JlZW5IZWlnaHQiOjQxNCwiYXZhaWxhYmxlU2NyZWVuV2lkdGgiOjg5NiwiYXZhaWxhYmxlU2NyZWVuSGVpZ2h0Ijo0MTQsInRpbWV6b25lT2Zmc2V0IjotNjAsInRpbWV6b25lIjoiRXVyb3BlL0xvbmRvbiIsInNlc3Npb25TdG9yYWdlIjoxLCJsb2NhbFN0b3JhZ2UiOjEsImluZGV4ZWREYiI6MSwiYWRkQmVoYXZpb3IiOjAsIm9wZW5EYXRhYmFzZSI6MCwicGxhdGZvcm0iOiJpUGhvbmUiLCJwbHVnaW5zIjoiMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAiLCJjYW52YXMiOiJmMGJmYTQzOWQ4NjhmYjRjNmU3NzVhZGZmZTMzNGM1ZSIsIndlYmdsIjoiZjQ3ZWZmNjFkOTg1NzI1ZTcwMjg0Y2ExYWUwNWI1MWUiLCJ3ZWJnbFZlbmRvckFuZFJlbmRlcmVyIjoiQXBwbGUgSW5jLn5BcHBsZSBHUFUiLCJhZEJsb2NrIjowLCJoYXNMaWVkTGFuZ3VhZ2VzIjowLCJoYXNMaWVkUmVzb2x1dGlvbiI6MCwiaGFzTGllZE9zIjowLCJoYXNMaWVkQnJvd3NlciI6MCwiZm9udHMiOiI5YzVlZDFkMWY0ZGU2ZDgzNzA0ODRlZDU2MWU1NmNiNyIsImF1ZGlvIjoiZmVhMTJiMWNjZWY0NTAwOTQ1N2Q1ZDY4NDI2NzQ2NDgiLCJlbnVtZXJhdGVEZXZpY2VzIjoiMTg2YWIyYWQ5Mjg0YTVkMWU3MjEwZjQwYzZiOGY1MWMifX0="
   },
   "returnUrl" : "http://localhost:3000/#/checkout",
   "lineItems" : [
      {
         "id" : "2165854",
         "description" : "Perfect Prep™ Day & Night (+3 filters)",
         "quantity" : 1,
         "taxCategory" : "Taxable Goods",
         "taxPercentage" : 2000,
         "amountIncludingTax" : 12999
      },
      {
         "id" : "2165860",
         "description" : "Perfect Prep™ Replacement Filter - 2 pack",
         "quantity" : 1,
         "taxCategory" : "Taxable Goods",
         "taxPercentage" : 2000,
         "amountIncludingTax" : 0
      },
      {
         "id" : "2165863",
         "description" : "Disposable Breast Pads - 50 pack",
         "quantity" : 1,
         "taxCategory" : "Taxable Goods",
         "taxPercentage" : 2000,
         "amountIncludingTax" : 499
      }
   ],
   "additionalData" : {
      "allow3DS2" : true
   },
   "origin" : "http://localhost:3000/#/checkout",
   "channel" : "web",

}



var perf = {
   "amount" : {
      "currency" : "EUR",
      "value" : 5503
   },
   "billingAddress" : {
      "street" : "60 Cecil Road",
      "postalCode" : "EX2 9AQ",
      "city" : "Exeter",
      "houseNumberOrName" : "N\/A",
      "country" : "GB",
      "stateOrProvince" : "Devon"
   },
   "channel" : "Web",
   "countryCode" : "DE",
   "deliveryAddress" : {
      "city" : "Reading",
      "country" : "GB",
      "houseNumberOrName" : "",
      "postalCode" : "RG1 7UD",
      "street" : "6 Downshire Square"
   },
   "lineItems" : [
      {
         "amountIncludingTax" : 4872,
         "description" : "GENIFIQUE activateur de jeunesse crème 50 ml",
         "id" : "25907",
         "productUrl" : "https:\/\/www.localhost\/es\/lancome\/genifique-activateur-de-jeunesse-creme\/p_90580\/",
         "quantity" : 1
      },
      {
         "amountIncludingTax" : 0,
         "description" : "5 th AVENUE edp vapo 75 ml",
         "id" : "7252",
         "productUrl" : "https:\/\/www.localhost\/es\/elizabeth-arden\/5-th-avenue-eau-de-perfume-vaporizador\/p_5671\/",
         "quantity" : 1
      },
      {
         "amountIncludingTax" : 631,
         "description" : "Gastos de envío",
         "id" : "handling",
         "quantity" : 1
      }
   ],
   "origin" : "http://localhost:3000/#/checkout",
   "paymentMethod" : {
      "type" : "klarna_account"
   },
   "reference" : "A140005389",
   "returnUrl" : "http://localhost:3000/#/checkout",
   "shopperEmail" : "alberto.vives@perfumesclub.com",
"shopperLocale": "en_GB",
   "shopperName" : {
      "firstName" : "Albert",
      "lastName" : "Vives Peraita"
   },
   "shopperReference" : "1834780",
   "storePaymentMethod" : false,
   "telephoneNumber" : "+447777777777",
   "threeDS2RequestData" : {
      "deviceChannel" : "browser"
   },
   "merchantAccount" : "ElenaPerez",
   "additionalData" : {
      "allow3DS2" : "true"
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

    if (document.getElementById('requestToPayments') !== null){
      var defaultRequest = document.getElementById("requestToPayments").value;
      if (defaultRequest!== null && defaultRequest !== ''){
        paymentRequest = JSON.parse(defaultRequest)
      } else document.getElementById('requestToPayments').innerHTML = JSON.stringify(paymentRequest);
    }

    paymentRequest.amount.value = parseInt(getAmount());
    paymentRequest.amount.currency = getCurrencyCode();
    paymentRequest.returnUrl = defaultUrl(paymentMethod.paymentMethod.type);
    paymentRequest.origin = defaultOrigin();
    paymentRequest.shopperReference = defaultShopperReference;

    //if (paymentRequest.paymentMethod.storedPaymentMethodId != null)
    //  paymentRequest.shopperInteraction = 'ContAuth';

    var obj = paymentRequest
    console.log('paymentRequest: ',obj)

    return httpPost('payments', paymentRequest)
        .then(response => {
            if (response.error) throw 'Payment initiation failed';

            if (document.getElementById('responseFromPayments') !== null){
                document.getElementById('responseFromPayments').innerHTML = JSON.stringify(response);
            }
            //document.cookie = "paymentData=" + response.paymentData;
            //document.cookie = "redirectResult=" + response.redirectResult;
            var obj = response
            console.log('paymentResponse: ',obj)

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
    //paymentData.details.threeDSAuthenticationOnly = true
    var paymentRequest = paymentData;

    if (getActionType() == "redirect") {
        paymentRequest = {
            details: {
              "redirectResult": config
                //[detailsKey]: config
            }
        }
     }
   else {
    paymentRequest =
        paymentData

  }

    if (document.getElementById('requestToPaymentDetails') !== null){
      var defaultRequest = document.getElementById("requestToPaymentDetails").value;
      // if (defaultRequest!== null && defaultRequest !== ''){
      //     document.getElementById('requestToPaymentDetails2').innerHTML = JSON.stringify(paymentRequest);
      // } else document.getElementById('requestToPaymentDetails').innerHTML = JSON.stringify(paymentRequest);
    }

    var obj = paymentRequest
    console.log("paymentdetails request: "+obj)

    return httpPostnoJson('payments/details', paymentRequest)
        .then(response => {
            if (response.error) throw 'Payment details failed';
            console.log("paymentdetails response: "+response)

            if (document.getElementById('responseFromPaymentDetails') !== null){
              var defaultRequest = document.getElementById("responseFromPaymentDetails").value;
              if (defaultRequest!== null && defaultRequest !== ''){
                  document.getElementById('responseFromPaymentDetails2').innerHTML = JSON.stringify(paymentRequest);
              } else document.getElementById('responseFromPaymentDetails').innerHTML = JSON.stringify(paymentRequest);
            }
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

const paymentLinks = (paymentData) => {
    var paymentRequest = paymentData;

    paymentRequest.amount.value = parseInt(getAmount());
    paymentRequest.amount.currency = getCurrencyCode();
    paymentRequest.returnUrl = defaultUrl();
    paymentRequest.origin = defaultUrl();
    paymentRequest.shopperReference = defaultShopperReference;

    return httpPostnoJson('paymentLinks', paymentRequest)
        .then(response => {
            if (response.error) throw 'Payment initiation failed';

            return JSON.parse(response).url;
        })
        .catch(error => {
            console.log('error on paymentLinks' + error)
            throw Error(error);
        });
};

const paymentLinksQR = (paymentData) => {
    var paymentRequest = paymentData;

    return httpPostnoJson('paymentLinksQR', paymentRequest)
        .then(response => {
            if (response.error) throw 'Payment initiation failed';

            //return JSON.parse(response);
            return response;
        })
        .catch(error => {
            console.log('error on paymentLinksQR' + error)
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
}).then(localStorage.setItem('dropinRequest', JSON.stringify(paymentsDefaultConfig)))
.catch(console.error);

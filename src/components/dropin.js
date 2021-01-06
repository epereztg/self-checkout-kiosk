var dropinComponent = getOriginKey().then(originKey => {
  paymentMethodsConfig.shopperReference = defaultShopperReference
    getPaymentMethods().then(paymentMethodsResponse => {
        // 1. Create an instance of AdyenCheckout
        const checkout = new AdyenCheckout({
            environment: 'test',
            countryCode: getCountryCode(),
            originKey: originKey,
            paymentMethodsResponse: paymentMethodsResponse,
            removePaymentMethods: ['paysafecard', 'c_cash']
        });

        const storedPaymentMethod = paymentMethodsResponse.storedPaymentMethods !=null?
        paymentMethodsResponse.storedPaymentMethods[0]
        : null;

var paymentMethodsConfiguration = {
  shopperReference:'paybylink_shopperreference',
  storedPaymentMethod: storedPaymentMethod,
  // shopperInteraction: 'ContAuth',
  // recurringProcessingModel: 'CardOnFile',
  //storedPaymentMethodId : 8315892815997642,
  showStoredPaymentMethods: true,
  paywithgoogle: { // Example required configuration for Google Pay
      environment: "TEST", // Change this to PRODUCTION when you're ready to accept live Google Pay payments
      configuration: {
        gatewayMerchantId: "ElenaPerez", // Your Adyen merchant or company account name
        merchantIdentifier: "12345678910111213141", // Required for PRODUCTION. Remove this object in TEST. Your Google Merchant ID as described in https://developers.google.com/pay/api/web/guides/test-and-deploy/deploy-production-environment#obtain-your-merchantID
        merchantName: "YourMerchantName" // Optional. The name that appears in the payment sheet.
      },
      buttonColor: "white" //Optional. Use a white Google Pay button.
      //For other optional configuration, see section below.
    },
    paypal: {
        merchantId: 'UZQDU74XMGU56',
        amount: {
            currency: getCurrencyCode(),
            value: getAmount()
        }
    },
    mbway: {
      data:{
        email: defaultShopperReference,
        phoneNumber: '+351213822199',
        showCountdownTimer: true
        }
    },
    card: {
      //name: 'Insert your card',
      hasHolderName: true,
      holderNameRequired: true,
      hideCVC: false, // Change this to true to hide the CVC field for stored cards
      name: 'Pay with card',
      //hideCVC: true,
        data : {
          holderName: 'S. Hopper'
        },
        environment: 'test',
        enableStoreDetails: true,
    },
    applepay: { // Required configuration for Apple Pay
        buttonType: "plain",
        buttonColor: "black",
    },
    facilypay_3x: {
      amount: {
          currency: "EUR",
          value: 2000
      }
    }
  }

        // 2. Create and mount the Component
        const dropin = checkout
            .create('dropin', {
                paymentMethodsConfiguration: paymentMethodsConfiguration,

                onComplete: state => {
                    console.log('onComplete!')
                },
                // Events
                onSelect: activeComponent => {

                },
                onChange: state => {

                },
                onSubmit: (state, component) => {
                    makePayment(state.data)
                        .then(response => {
                            if (response.action) {
                                saveActionType(response.action.type)
                                savePaymentData(response.action.paymentData)
                                if (response.resultCode=="Pending"){
                                  dropin.handleAction(response.action);
                                }
                                //else if (response.resultCode!="PresentToShopper"){
                                  //localStorage.setItem('details.key', response.details[0].key)
                                //}
                                // Drop-in handles the action object from the /payments response.
                                else dropin.handleAction(response.action);
                            } else if (response.resultCode === "Authorised") {
                                dropin.setStatus('success');
                                //var element = document.getElementById("review");
                                //element.classList.add("success");
                            } else if (response.resultCode === "Refused") {
                                dropin.setStatus('error');
                            } else {
                                dropin.setStatus('error');
                            }
                        })
                        .catch(error => {
                            console.log('error on makePayment' + error)
                            throw Error(error);
                        });
                },
                onAdditionalDetails: (state, dropin) => {
                    paymentDetails(state.data)
                        .then(result => {
                            if (JSON.parse(result).resultCode == 'ChallengeShopper' || JSON.parse(result).resultCode == 'IdentifyShopper') {
                                dropin.handleAction(JSON.parse(result).action);
                            }
                            else if (JSON.parse(result).resultCode == 'Authorised') {

                                // if (JSON.parse(result).amount.value > 0)
                                //   showFinalResultDropin(result);
                                // else
                                //dropin.update()

                                dropin.setStatus('success');
                                localStorage.clear()
                            }
                             else {
                                //showFinalResultDropin(result);
                                dropin.setStatus('error'); //paypal prblem here, result is string.
                                localStorage.clear()
                                //showFinalResult(result);
                            }
                        })
                        .catch(error => {
                            console.log('error on submitDetails' + error)
                            //localStorage.clear()
                            throw Error(error);
                        });

                    // if(state.data.paymentData != null){
                    //   //i.e. paypal
                    //   paymentDetails(state.data)
                    //   .then(result => {
                    //      // Your function to show the final result to the shopper.
                    //      //showFinalResultDropin(result);
                    //      dropin.setStatus('success');
                    //   })
                    // }else{
                    //   //console.log('onAdditionalDetails!')
                    //   paymentDetails(state.data)
                    //       .then(response => {
                    //         if(JSON.parse(response).resultCode == 'ChallengeShopper'){
                    //           dropin.handleAction(JSON.parse(response).action);
                    //         }
                    //         else {
                    //           router.push({
                    //               name: 'Order Complete',
                    //               path: '/orderCompleted'
                    //           })
                    //           location.reload();
                    //         }
                    //       })
                    //   }
                },
                onCancel: (data, dropin) => {
                    dropin.setStatus('error');
                },
                onError: (data, dropin) => {
                    localStorage.removeItem('paymentData');
                    dropin.setStatus('error', {
                        message: 'Something went wrong.'
                    });
                },
            })
            .mount('#dropin-container')
    });
});

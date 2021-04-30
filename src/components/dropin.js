var paymentMethodsConfiguration = {
    shopperReference: 'paybylink_shopperreference',
    //storedPaymentMethod: storedPaymentMethod,
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
        merchantId: 'MH5P3AYBGR47S',
        amount: {
            currency: getCurrencyCode(),
            value: getAmount()
        }
    },
    mbway: {
        data: {
            email: defaultShopperReference,
            phoneNumber: '+351213822199',
            showCountdownTimer: true
        }
    },
    card: {
        hasHolderName: true,
        holderNameRequired: true,
        hideCVC: false, // Change this to true to hide the CVC field for stored cards
        name: 'Pay with card',
        data: {
            holderName: 'Mr Mrs. Shopper'
        },
        environment: 'test',
        enableStoreDetails: true,
        showRemovePaymentMethodButton: true
    },
    facilypay_3x: {
      data:
        {
          //personalDetails: "hidden", // These fields will not appear on the payment form.
          personalDetails:{
            firstName:'firstName',
            lastName:'lastName',
            gender: 'FEMALE',
            shopperEmail: 'shopperEmail@shopperEmail.com',
            dateOfBirth: '1990-07-01',
            telephoneNumber: '+34600112233',
          },
          deliveryAddress: {
            country: 'ES',
            city: 'Madrid',
            street: 'Calle de Atocha 27',
            houseNumberOrName: '27',
            stateOrProvince: 'ES',
            postalCode: '28001'
          },
          billingAddress: { //i.e. required for AfterPay
              country: 'ES',
              city: 'Madrid',
              street: 'Calle de Atocha 27',
              houseNumberOrName: '27',
              stateOrProvince: 'ES',
              postalCode: '28001'
          }
        },
        // Optional configuration for 3x 4x Oney
        visibility: {
            billingAddress: "readOnly", // These fields will appear on the payment form,                        //but the shopper can't edit them.
            deliveryAddress: "editable" //These fields will appear on the payment form,
                                      // and the shopper can edit them.
                                      //This is the default behaviour.
        }
    }
}

var dropinComponent =
    paymentMethodsConfig.shopperReference = defaultShopperReference
getPaymentMethods().then(paymentMethodsResponse => {
    // 1. Create an instance of AdyenCheckout
    const checkout = new AdyenCheckout({
        paymentMethodsConfiguration: paymentMethodsConfiguration,
        onSubmit: (state, component) => {
            makePayment(state.data)
                .then(response => {
                    if (response.action) {
                        saveActionType(response.action.type)
                        localStorage.setItem('state.data', state.data)
                        savePaymentData(response.action.paymentData)
                        if (response.details != null) {
                            localStorage.setItem('details.key', response.details[0].key)
                        }
                        //localStorage.setItem('details.key', response.details[0].key)
                        // if (response.resultCode == "Pending") {
                        //     dropin.handleAction(response.action);
                        // }
                        //else if (response.resultCode!="PresentToShopper"){
                        //}
                        // Drop-in handles the action object from the /payments response.
                        else dropin.handleAction(response.action);
                    } else if (response.resultCode === "Authorised") {
                        dropin.setStatus('success');
                        //var element = document.getElementById("review");
                        //element.classList.add("success");
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
                    } else if (JSON.parse(result).resultCode == 'Authorised') {

                        // if (JSON.parse(result).amount.value > 0)
                        //   showFinalResultDropin(result);
                        // else
                        //dropin.update()

                        dropin.setStatus('success');
                        localStorage.clear()
                    } else if (JSON.parse(result).resultCode == 'Cancelled') {
                        showFinalResultDropin(result);
                    } else {
                        //showFinalResultDropin(result);
                        dropin.setStatus('error'); //paypal prblem here, result is string.
                        localStorage.clear()
                        //showFinalResult(result);
                    }
                })
                .catch(error => {
                    localStorage.clear()
                    console.log('error on submitDetails' + error)
                    //localStorage.clear()
                    throw Error(error);
                });
        },
        onComplete: state => {
            console.log('onComplete!')
        },
        // Events
        onSelect: activeComponent => {
          console.log('activeComponent:' + activeComponent)
        },
        onChange: state => {

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
        onDisableStoredPaymentMethod: (data, dropin) => {
            console.log('onDisableStoredPaymentMethod!')
        },
        environment: 'test',
        countryCode: getCountryCode(),
        clientKey: "test_E3XT7DO34FETRCDF4XFV5XX2GMRW3TQZ",
        //clientKey: "test_NUXZ3ABL2BDDFHGXNZRDN3G5JYLOSM53",
        paymentMethodsResponse: paymentMethodsResponse,
        removePaymentMethods: ['paysafecard', 'c_cash', 'paypal'],
        enableStoreDetails: true
    });

    const storedPaymentMethod = paymentMethodsResponse.storedPaymentMethods != null ?
        paymentMethodsResponse.storedPaymentMethods[0] :
        null;

    // 2. Create and mount the Component
    const dropin = checkout
        .create('dropin', {
          data: {
            firstName: 'Testname'
          }
        })
        .mount('#dropin-container')
});

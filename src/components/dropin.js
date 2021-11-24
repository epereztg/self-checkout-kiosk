var paymentMethodsConfiguration = {
    locale: defaultLocale,
    shopperReference: 'paybylink_shopperreference',
    //storedPaymentMethod: storedPaymentMethod,
    paywithgoogle: { // Example required configuration for Google Pay
        environment: "TEST", // Change this to PRODUCTION when you're ready to accept live Google Pay payments
        configuration: {
            gatewayMerchantId: "ElenaPerez", // Your Adyen merchant or company account name
            merchantIdentifier: "12345678910111213141", // Required for PRODUCTION. Remove this object in TEST. Your Google Merchant ID as described in https://developers.google.com/pay/api/web/guides/test-and-deploy/deploy-production-environment#obtain-your-merchantID
            merchantName: "YourMerchantName" // Optional. The name that appears in the payment sheet.
        },
        buttonColor: "white" //Optional. Use a white Google Pay button.
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
    storedCard: { // Example optional configuration for Cards
        hideCVC: true, // Change this to true to hide the CVC field for stored cards
    },
    card: {
        onBinLookup: (binLookupInfo) => {
            console.log(binLookupInfo)
        },
        hasHolderName: true,
        holderNameRequired: true,
        name: 'Pay with card',
        data: {
            holderName: 'Mr Mrs. Shopper'
        },
        environment: 'test',
        enableStoreDetails: true,
        showRemovePaymentMethodButton: true
    },
    facilypay_3x: {
        data: {
            personalDetails: {
                firstName: 'firstName',
                lastName: 'lastName',
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
            billingAddress: "readOnly", // These fields will appear on the payment form, but the shopper can't edit them.
            deliveryAddress: "editable"
        }
    }
}

var dropinComponent =
    paymentMethodsConfig.shopperReference = defaultShopperReference
    //var clientKey = "test_IPXP2NJCN5CW7NUYLN2T5DH6RILHZ24F"
    getPaymentMethods().then(paymentMethodsResponse => {
    // 1. Create an instance of AdyenCheckout
    const checkout = new AdyenCheckout({
        paymentMethodsConfiguration: paymentMethodsConfiguration,
        onSubmit: (state, component) => {
            if (state.isValid) {
                makePayment(state.data)
                    .then(response => {
                        if (response.action) {
                            saveActionType(response.action.type)
                            localStorage.setItem('state.data', state.data)
                            savePaymentData(response.action.paymentData)
                            if (response.details != null) {
                                localStorage.setItem('details.key', response.details[0].key)
                            }
                            // Drop-in handles the action object from the /payments response.
                            else dropin.handleAction(response.action);
                        } else //if (response.resultCode === "Authorised") {
                        //dropin.setStatus('success');
                        {
                            localStorage.setItem('paymentResult', JSON.stringify(response));
                            window.location = window.origin + "/#/orderCompleted"

                        }
                    })
                    .catch(error => {
                        console.log('error on makePayment' + error)
                        throw Error(error);
                    });
            }
        },
        onAdditionalDetails: (state, dropin) => {
            paymentDetails(state.data)
                .then(result => {
                    localStorage.setItem('paymentResult', JSON.stringify(result));
                    if (JSON.parse(result).resultCode == 'ChallengeShopper' || JSON.parse(result).resultCode == 'IdentifyShopper') {
                        dropin.handleAction(JSON.parse(result).action);
                    } else //if (JSON.parse(result).resultCode == 'Authorised') {
                        //dropin.setStatus('success');
                        window.location = window.origin + "/#/orderCompleted"
                })
                .catch(error => {
                    localStorage.clear()
                    console.log('error on submitDetails' + error)
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
        onBinLookup: (binLookupInfo) => {
            console.log(binLookupInfo)
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
        clientKey: getClientKey(),
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
            billingAddressRequired: true,
            data: {
                firstName: 'Testname'
            }
        })
        .mount('#dropin-container')

});

getPaymentMethods().then(response => {
    // 1. Create an instance of AdyenCheckout
    const checkout = new AdyenCheckout({
        paymentMethodsResponse: response,

        // Optionally show a Pay Button
        showPayButton: true,

        // Events
        onSubmit: (state, component) => {
            // Triggered when a shopper clicks on the Pay button
            makePayment(giroPayData)
              .then(response => {

                if (response.action) {
                  // The Component handles the action object from the /payments response
                  checkout.createFromAction(response.action).mount('#giropay-container');
                } else {
                  // Your function to show the final result to the shopper
                  console.log('response: '+response)
                }
              })
              .catch(error => {
                throw Error(error);
              });
        },
        onChange: (state, component) => {
        },
        onAdditionalDetails: (state, dropin) => {
            paymentDetails(state.data)
                .then(response => {
                  if(JSON.parse(response).resultCode == 'ChallengeShopper'){
                    dropin.handleAction(JSON.parse(response).action);
                  }
                  else {
                    router.push({
                        name: 'Order Complete',
                        path: '/orderCompleted'
                    })
                    location.reload();
                  }
                })
        },
    });

    //https://docs.adyen.com/payment-methods/giropay/web-component#test-and-go-live
    const giroPayData = {
        countryCode: 'DE',
        amount: {
            value: 2000,
            currency: 'EUR'
        },
        paymentMethod: {
            type: 'giropay',
            bic:'GENODETT488',
        }
    };

    // 2. Create and mount the Component
    const giropayComponent = checkout.create('giropay').mount('#giropay-container');

});

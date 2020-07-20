// 0. Get originKey
getOriginKey().then(originKey => {
    // 1. Create an instance of AdyenCheckout
    const checkout = new AdyenCheckout({
        environment: 'test',
        originKey: originKey, // Mandatory. originKey from Customer Area
        countryCode: "NL",
        amount: {
            currency: "EUR",
            value: 100
        },
        merchantId: 'UZQDU74XMGU56'
    });

    // 2. Create and mount the Component
    const paypalComponent = checkout
        .create('paypal', {
            styles: {},

            // Optionally show a Pay Button
            showPayButton: true,

            // Events
            onSubmit: (state, component) => {
                // Your function calling your server to make the /payments request
                makePayment(state.data)
                  .then(response => {

                    if (response.action) {
                      // The Component handles the action object from the /payments response
                      component.handleAction(response.action);
                    } else {
                      // Your function to show the final result to the shopper
                      showFinalResult(response);
                    }
                  })
                  .catch(error => {
                    throw Error(error);
                  });
              },
              onCancel: (data, component) => {
                // Sets your prefered status of the component when a PayPal payment is cancelled. In this example, return to the initial state.
                component.setStatus('ready');
            },
            onError: (error, component) => {
                // Sets your prefered status of the component when an error occurs. In this example, return to the initial state.
                component.setStatus('ready');
            },

            onChange: (state, component) => {

            },

            onAdditionalDetails: (state, component) => {
                // Your function to submit a state.data object to the payments/details endpoint.
                  paymentDetails(state.data)
                  .then(result => {
                     // Your function to show the final result to the shopper.
                     showFinalResult(result);
                  })
            }
        })
        .mount('#paypal-container');
});

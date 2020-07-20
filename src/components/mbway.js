// 0. Get originKey
getOriginKey().then(originKey => {
    // 1. Create an instance of AdyenCheckout
    const checkout = new AdyenCheckout({
        environment: 'test',
        originKey: originKey, // Mandatory. originKey from Customer Area
        countryCode: "PT",
    });

//+351213822199
    const paymentRequest = {
        //shopperReference: 'Checkout Components sample code test',
        reference: 'Checkout Components KIOSK',
        countryCode: 'PT',
        amount: {
            value: 1700,
            currency: 'EUR'
        }
    };
    // 2. Create and mount the Component
    const mbwayComponent = checkout
        .create('mbway', {
            styles: {},

            // Optionally show a Pay Button
            showPayButton: true,

            // Events
            onSubmit: (state, component) => {
                    makePayment(state.data, paymentRequest)
                        //makePayment(state.data, paymentRequest)
                        .then(response => {
                            if (response.action) {
                              // Drop-in handles the action object from the /payments response.
                              component.handleAction(response.action)
                            } else if (response.resultCode === "Authorised") {
                                component.setStatus('success');
                            }
                            else if (response.resultCode=== "Refused") {
                                component.setStatus('error');
                            }
                             else {
                                component.setStatus('error');
                            }
                        })
                .catch(error => {
                    console.log('error' + error)
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
        .mount('#mbway-container');
});

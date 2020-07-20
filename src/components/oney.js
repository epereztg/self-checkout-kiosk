getPaymentMethods().then(response => {
    const checkout = new AdyenCheckout({
        paymentMethodsResponse: response,
        environment: 'test',
        onSubmit: (state, component) => {
          makePayment(state.data).
          then(response => {
            savePaymentData(response.action.paymentData)
            checkout.createFromAction(response.action).mount('#oney-container')
        })
      },
        countryCode: 'ES',
        showPayButton: true,

        amount: {
            currency: "EUR",
            value: 23500
        },
        onError: error => {
            console.log(error);
        }
    });

    const oney = checkout.create('facilypay_3x').mount('#oney-container');

    function initialSubmit (state, component) {
        makePayment(state.data).then(response => {
            savePaymentData(response.action.paymentData)
            checkout.createFromAction(response.action).mount('#oney-container')
        });
    }
});

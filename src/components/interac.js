getPaymentMethods().then(response => {
    const checkout = new AdyenCheckout({
        paymentMethodsResponse: response,
        environment: 'test',
        onSubmit: initialSubmit,
        onError: error => {
            console.log(error);
        }
    });

    const interac = checkout.create('interac').mount('#interac-container');

    function initialSubmit (state, component) {
        makePayment(state.data).then(response => {
            savePaymentData(response.action.paymentData)
            checkout.createFromAction(response.action).mount('#interac-container')
        });
    }
});

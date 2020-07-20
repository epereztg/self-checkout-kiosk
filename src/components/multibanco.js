// 0. Get originKey
getOriginKey().then(originKey => {
    getPaymentMethods().then(paymentMethodsResponse => {
        // 1. Create an instance of AdyenCheckout
        const checkout = new AdyenCheckout({
            originKey, // Mandatory. originKey from Customer Area
            paymentMethodsResponse,
            environment: 'test',
            amount: { currency: 'EUR', value: 1000 },
            reference: 'YOUR_ORDER_NUMBER',
            onAdditionalDetails: result => {
                console.log(result);
            },
            onError: error => {
                console.log(error);
            },
            onSubmit: initialSubmit,
            countryCode: 'PT',
             shopperLocale: 'pt-PT',
             paymentMethod: {
                 type: "multibanco"
             }
        });

        function initialSubmit (state, component) {
            makePayment(state.data).then(response => {
                component.unmount();
                // 3. present the voucher using the action object returned from /payments
                checkout.createFromAction(response.action).mount('#multibanco-container');
            });
        }

        // 2. create Multibanco component
        checkout.create('multibanco').mount('#multibanco-container');
    });
});

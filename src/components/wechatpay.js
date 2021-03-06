// Override our default demo config for this payment method
const wechatData = {
  merchantAccount:"ElenaPerez",
  reference:"YOUR_ORDER_NUMBER",
    countryCode: 'CN',
    amount: {
        value: 1000,
        currency: 'CNY'
    },
    paymentMethod: {
        type: 'wechatpayQR'
    }
};
// 0. Get originKey
getOriginKey().then(originKey => {
    // 1. Create an instance of AdyenCheckout providing an originKey
    const checkout = new AdyenCheckout({
        environment: 'test',
        originKey: originKey, // Mandatory. originKey from Customer Area
        amount: { currency: 'CNY', value: 1000 }, // amount to be shown next to the qrcode
        onAdditionalDetails: state => {
            console.log(state.data);
        },
        onError: error => {
            console.log(error);
        }
    });



    /** Call the /payments endpoint to retrieve the necessary data to start the Wechat Pay component
     *  We need the following parts of the response
     *  - qrCodeData (redirect.data.qrCodeData): The data the QR Code will contain
     *  - paymentData Necessary to communicate with Adyen to check the current payment status
     */
    makePayment(wechatData).then(response => {
        if (!!response.action) {
            // 2. Create and mount the Component from the action received
            const wechatpay = checkout.createFromAction(response.action).mount('#wechatpay-container');
        }
    });
});

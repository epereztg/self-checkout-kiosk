//const checkout = new AdyenCheckout(configuration);
getOriginKey().then(originKey => {
const checkout = new AdyenCheckout({
    environment: 'test',
    originKey: originKey,
    //enableStoreDetails: true,
    locale: 'es-ES',

});

const customCard = checkout.create('securedfields', {

    // Optional configuration
    showPayButton: true,
    type: 'card',
    //brands: ['mc', 'visa', 'amex', 'maestro'],
    styles: {
        error: {
            color: 'red'
        },
        validated: {
            color: 'green'
        },
        placeholder: {
            color: '#d8d8d8'
        }
    },
    ariaLabels: {
        lang: 'es_ES',
        encryptedCardNumber: {
            label: 'Credit or debit card number field'
        }
    },
    onChange: function() {console.log("test");},
    onValid : function() {},
    onLoad: function() {},
    onConfigSuccess: function() {},
    onFieldValid : function() {},
    onBrand: function() {},
    onError: function() {},
    onFocus: function() {},
    onBinValue: function(bin) {},


}).mount('#customCard-container');

});

function handleOnChange(state) {
  console.log("test")
}

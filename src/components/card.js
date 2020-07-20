getPaymentMethods().then(paymentMethodsResponse => {
  getOriginKey().then(originKey => {
      // 1. Create an instance of AdyenCheckout
      const checkout = new AdyenCheckout({
          paymentMethodsResponse: paymentMethodsResponse,
          environment: 'test',
          originKey: originKey, // Mandatory. originKey from Customer Area
          enableStoreDetails: true,
          locale: 'es-ES',
          //hasHolderName: true,
          //holderNameRequired: true,
          //hideCVC: true,//if set, cannot use stored payment details later
          showPayButton: true,
          card: {
            environment: 'test',
            enableStoreDetails: true,
            locale: 'es-ES',
            //hasHolderName: true,
            //holderNameRequired: true,
          }
      });

      // Define style object
      var styleObject = {
        base: {
          color: 'black',
          fontSize: '16px',
          fontSmoothing: 'antialiased',
          fontFamily: 'Helvetica'
        },
        error: {
          color: 'red'
        },
        placeholder: {
          color: '#d8d8d8'
        },
        validated: {
          color: 'green'
        }
      };

      const storedPaymentMethod = checkout.paymentMethodsResponse.storedPaymentMethods !=null
      && checkout.paymentMethodsResponse.storedPaymentMethods.length > 0
      ? checkout.paymentMethodsResponse.storedPaymentMethods[0]
      : null;

       const stored = checkout.create("card", storedPaymentMethod).mount("#stored-card");

      // 2. Create and mount the Component
       const card = checkout
          .create('card', {
              styles: styleObject,
              // Optional. Define custom placeholders for the Card fields
              placeholders: {
                  encryptedCardNumber: '5454 5454 5454 5454',
                  encryptedExpiryDate: '03/30',
                  encryptedSecurityCode : '737'
              },

              // Events
              onSubmit: (state, component) => {
                  if (state.isValid) {
                    makePayment(state.data)
                      .then(response => {
                        if (response.action) {//No additional steps are needed to complete the payment.
                            checkout.createFromAction(response.action).mount('#card-container');
                        }
                        else if (response.data){

                          console.log('Response: '+JSON.stringify(response.data))
                          router.push({name: 'Order Complete', path: '/orderCompleted'})
                          location.reload();
                        }
                        else if (response.resultCode === "Authorised")
                        {
                          console.log('Response: '+JSON.stringify(response))
                          // Your function to show the final result to the shopper.
                          router.push({name: 'Order Complete', path: '/orderCompleted'})
                          location.reload();
                        }
                        else{
                          console.log('error....');
                          router.push({name: 'Order Complete', path: '/orderCompleted'})
                        }
                      })
                      .catch(error => {
                        console.log('error'+error)
                        throw Error(error);
                      });
                  }
              },
              onAdditionalDetails: result => {
                  console.log(result);
              },
              onAdditionalData: result => {
                  console.log(result);
              },

              onComplete: (state, component) => {
                  console.log('onChange');

                  //updateStateContainer(state); // Demo purposes only
              },
              onError: (state, component) => {
                  console.log('error on backend'+state.error);

                  //updateStateContainer(state); // Demo purposes only
              },
              onChange: (state, component) => {
                  // if(state.isValid ){
                  //   var paybutton = document.getElementsByClassName("adyen-checkout__button");
                  //   paybutton[0].focus();
                  // };
              }
          })
          .mount('#card-container')
  })

})
;

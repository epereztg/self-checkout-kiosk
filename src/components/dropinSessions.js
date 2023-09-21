


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
    boletobancario: { // Optional configuration for Boleto
        personalDetailsRequired: false, //turn personalDetails section on/off
        showEmailAddress: true, // allow shopper to specify their email address
        socialSecurityNumber: '568.617.525-09',
        data: {
            socialSecurityNumber: '568.617.525-09',
            shopperName: {
                firstName: 'José',
                lastName: 'Silva'
            },
            billingAddress: {
                street: 'Rua Funcionarios',
                houseNumberOrName: '952',
                city: 'São Paulo',
                postalCode: '04386040',
                stateOrProvince: 'SP',
                country: 'BR'
            },
            shopperEmail: 'elena.pereztoril@adyen.com'
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
        type: 'scheme',
    brands: ['mc', 'visa', 'amex', 'korean_local_card'],
    configuration: {
        koreanAuthenticationRequired: true
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
async function initSession() {

	const configurations = {
		clientKey: "test_E3XT7DO34FETRCDF4XFV5XX2GMRW3TQZ",
		environment: "test"
	}
  try {
    const session = await getSession();
	  const checkout = await AdyenCheckout({
	 	clientKey: configurations.clientKey,
        environment: configurations.environment,
        session: {id:session.id,sessionData:session.sessionData},

        // Define onSubmit if you want to override the flow yourself
				// onSubmit:(result, component) => {
				// 		console.info(result, component);
				// },
        onPaymentCompleted: (result, component) => {
            console.info(result, component);
        },
        onError: (error, component) => {
            console.error(error.name, error.message, error.stack, component);
        },

        paymentMethodsConfiguration: {
        	card: {
               enableStoreDetails: true,
               installmentOptions: {
                   card: {
                      "values": [
                        1,
                        2,
                        3,
                        4,
                        5
                      ],
                      "plans": [ "regular", "revolving" ]
                  }
              },
              showInstallmentOptions: true
            }
        }
    });
    const dropin = checkout.create('dropin').mount('#dropin-container');
  }
  catch (error){
      console.error(error);
    }//return [checkout, dropin];
}
initSession()

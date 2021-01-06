const BackButton = {
    template: backButton,
    methods: {
        prev() {
            this.$emit("onPrev");
        }
    }
};

const PageNav = {
    template: pageNav,
    props: {
        nextDisabled: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        prev() {
            this.$emit("onPrev");
        },
        next() {
            this.$emit("onNext");
        }
    }
};

const BaseLayout = {
    template: baseLayout,
    props: {
        nextDisabled: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        clearCache() {
            //saveLanguageAndCountries()
            var dc = localStorage.getItem('defaultCurrency')
            var dci = localStorage.getItem('defaultCurrencyIndex')
            var dl = localStorage.getItem('defaultLocale')
            var dli = localStorage.getItem('defaultlocaleIndex')
            var dcc = localStorage.getItem('defaultCountry')
            var dcci = localStorage.getItem('countryIndex')
            //var sr=localStorage.getItem('shopperReference')
            localStorage.clear();
            loadCoffeeOrder()
            //loadLanguageAndCountries()
            if (dc!="null")  localStorage.setItem('defaultCurrency', dc)
            if (dci!="null") localStorage.setItem('defaultCurrencyIndex', dci)
            if (dl!="null") localStorage.setItem('defaultLocale', dl)
            if (dli!="null") localStorage.setItem('defaultlocaleIndex', dli)
            if (dcc!="null") localStorage.setItem('defaultCountry', dcc)
            if (dcci!="null") localStorage.setItem('countryIndex', dcci)
            //localStorage.setItem('shopperReference', sr)
            location.reload();
        },
        prev() {
            this.$emit("onPrev");
        },
        next() {
            this.$emit("onNext");
        }
    },
    components: {
        PageNav,
        BackButton
    }
};

const PageMixin = {
    methods: {
        preNextAction() {},
        prev() {
            this.$router.push(this.$NavigationHelper.prev(this.$route.path));
        },
        async next() {
            await this.preNextAction();
            this.$router.push(this.$NavigationHelper.next(this.$route.path));
        }
    }
};
const Home = {
    template: home,
    data() {
        return {
            size: null,
            choices: {
                small: {
                    icon: "fa-coffee",
                    text: "Small"
                },
                medium: {
                    icon: "fa-coffee",
                    text: "Medium"
                }
            }
        };
    },
    mixins: [PageMixin],
    components: {
        BaseLayout,
        PageNav
    },
    mounted() {
        localStorage.clear();
    },
    methods: {
        async preNextAction() {
            //localStorage.setItem('shopperReference', document.getElementById("shopperReference").innerHTML)
        }
    }
};

const KioskHome = {
    template: kioskHome,
    data() {
        return {
            size: null,
            shopperReference: null
        };
    },
    mixins: [PageMixin],
    components: {
        BaseLayout,
        PageNav
    },
    mounted() {
        localStorage.clear();

        fillCountries();
        fillCurrencies();
        fillLocale();

        document.getElementById('countries').getElementsByTagName('option')[getCountryIndex()].selected = 'selected'
        document.getElementById('locales').getElementsByTagName('option')[getLocaleIndex()].selected = 'selected'
        document.getElementById('currencies').getElementsByTagName('option')[getCurrencyIndex()].selected = 'selected'
    },
    methods: {
        async preNextAction() {
            localStorage.setItem('shopperReference', document.getElementById("shopperReference").innerHTML)
        }
    }
};


const Size = {
    template: size,
    data() {
        return {
            size: null,
            choices: {
                small: {
                    icon: "fa-coffee",
                    text: "Small"
                },
                medium: {
                    icon: "fa-coffee",
                    text: "Medium"
                },
                large: {
                    icon: "fa-coffee",
                    text: "Large"
                },
                xl: {
                    icon: "fa-coffee",
                    text: "XL"
                }
            }
        };
    },
    mixins: [PageMixin],
    components: {
        BaseLayout,
        PageNav
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.size = vm.$store.state.size;
        });
    },
    methods: {
        addToCart: function(text) {
            this.size = text;
            localStorage.setItem('size', text)
        }
    }
};

const Capsule = {
    template: capsule,
    mixins: [PageMixin],
    data() {
        return {
            choices: {
                small: {
                    icon: "fa-coffee",
                    text: "Arpeggio"
                },
                medium: {
                    icon: "fa-coffee",
                    text: "Livanto"
                },
                large: {
                    icon: "fa-coffee",
                    text: "Volluto"
                },
                xl: {
                    icon: "fa-coffee",
                    text: "Dulsão Do Brazil"
                }
            },
            capsule: null
        };
    },
    components: {
        BaseLayout
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.capsule = vm.$store.state.capsule;
        });
    },
    methods: {
        addToCart: function(text) {
            this.capsule = text
            localStorage.setItem('capsule', text)
        }
    }
};

const MilkType = {
    template: milktype,
    data() {
        return {
            choices: {
                small: {
                    icon: "fa-coffee",
                    text: "Cow"
                },
                medium: {
                    icon: "fa-coffee",
                    text: "Soy"
                },
                large: {
                    icon: "fa-coffee",
                    text: "Rice"
                },
                xl: {
                    icon: "fa-coffee",
                    text: "Coconut"
                }
            },
            milkType: null
        }
    },
    mixins: [PageMixin],
    components: {
        BaseLayout
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.milkType = vm.$store.state.milkType;
        });
    },
    methods: {
        addToCart: function(text) {
            this.milkType = text
            localStorage.setItem('milkType', text)

        }
    }
};

const MilkBalance = {
    template: milkBalance,
    mixins: [PageMixin],
    components: {
        BaseLayout
    },
    data() {
        return {
            choices: {
                noMilk: {
                    icon: "fa-coffee",
                    text: "Americano"
                },
                small: {
                    icon: "fa-coffee",
                    text: "Espresso"
                },
                medium: {
                    icon: "fa-coffee",
                    text: "Macchiato"
                },
                large: {
                    icon: "fa-coffee",
                    text: "White"
                }
            },
            milkBalance: null,
            declineReason: null
        };
    },
    methods: {
        addToCart: function(text) {
            this.milkBalance = text
            localStorage.setItem('milkBalance', text)
        }
    }
};

const Review = {
    template: reviewOrder,
    data() {
        return {
            componentKey: 0,
        }
    },
    mixins: [PageMixin],
    components: {
        BaseLayout
    },
    created() {
        console.log('created');
    },
    updated() {
        console.log('updated');
    },
    methods: {
      // listrecurring(){
      //   var merchantAccount = {
      //       "merchantAccount": "ElenaPerez"
      //   }
      //   const data = {
      //       "recurring": {
      //         "contract": "RECURRING"
      //       },
      //       "shopperReference": defaultShopperReference,
      //       ...merchantAccount
      //   };
      //   listRecurringDetails(data).then(details => {
      //   //  if(details[0]!=null){
      // //if ( JSON.stringify(details) !== JSON.stringify({})){
      // if (typeof details !== "undefined"){
      //       details.forEach(function (paymentMethod) {
      //           var x = paymentMethod.RecurringDetail;
      //           console.log(x);
      //       });
      //       document.getElementById('recurringdetails').innerHTML = "Stored details for "+defaultShopperReference+':'+'</br>' + JSON.stringify(details);
      //
      //     }
      //     else document.getElementById('recurringdetails').innerHTML ='NONE'
      //
      //     document.getElementById("recurringdetails").className = "inactiveLink";
      //   });
      // },
      //   disableShopperToken() {
      //       //TODO: manage tokens
      //       var data = {
      //           "merchantAccount": "ElenaPerez",
      //           "shopperReference": defaultShopperReference,
      //       };
      //       disableShopperSavedDetails(data).then(details => {
      //         document.getElementById('deletetokens').innerHTML = "Token deleted";
      //
      //       })
      //   },
        generateUrl() {
            var merchantAccount = {
                "merchantAccount": "ElenaPerez"
            }
            const dataPBL = {
                ...paymentsDefaultConfig,
                ...merchantAccount
            };
            generatePayByLinkUrl(dataPBL).then(url => {
                document.getElementById('paybylink').innerHTML = "Click here to open PayByLink url: " + url
                document.getElementById('paybylink').href = url
                document.getElementById("paybylink").className = "fake-link";
                //generatePayByLinkUrlQR(url)
                // generatePayByLinkUrlQR(url).then(pngcode => {
                //   document.getElementById("ItemPreview").src = "data:image/png;base64," + pngcode;
                //
                // })
                //document.getElementById("qrcode").innerHTML = qrcode;
            });
        },
        changeCurrency() {
            var sel = document.getElementById('currencies');
            //console.log('changecurrencies: '+ sel.value );
            document.getElementById('currencies').getElementsByTagName('option')[sel.selectedIndex].selected = 'selected'
            localStorage.setItem('defaultCurrency', sel.value)
            localStorage.setItem('defaultCurrencyIndex', sel.selectedIndex)
            location.reload();
        },
        changeShopperLocale() {
            var sel = document.getElementById('locales');
            //console.log('changeShopperLocale: '+ sel.value );
            document.getElementById('locales').getElementsByTagName('option')[sel.selectedIndex].selected = 'selected'
            localStorage.setItem('defaultLocale', sel.value)
            localStorage.setItem('defaultlocaleIndex', sel.selectedIndex)
            location.reload();
        },
        changeLocation() {
            //todo: use getCountryIndex
            var sel = document.getElementById('countries');
            //console.log('changeLocation: '+ sel.value );
            document.getElementById('countries').getElementsByTagName('option')[sel.selectedIndex].selected = 'selected'
            // saveCountryCode(sel.value);
            // saveCountryIndex(sel.selectedIndex);
            localStorage.setItem('defaultCountry', sel.value)
            localStorage.setItem('countryIndex', sel.selectedIndex)
            console.log('defaultCountry changed to: '+sel.value)
            location.reload();
        },
        say: function(message) {
            alert(message)
        }
    },
    mounted() {
        console.log('mounted');

        var obj = localStorage
        document.getElementById('localStorage').innerHTML = JSON.stringify(obj);

        fillCountries();
        fillCurrencies();
        fillLocale();

        //Set country code
        document.getElementById('countries').getElementsByTagName('option')[getCountryIndex()].selected = 'selected'
        //Set Shopperlocale
        document.getElementById('locales').getElementsByTagName('option')[getLocaleIndex()].selected = 'selected'

        document.getElementById('currencies').getElementsByTagName('option')[getCurrencyIndex()].selected = 'selected'

        saveAmount(defaultAmount);
        document.getElementById('totalprice').innerHTML = (getAmount() / 100) + " " + getCurrencyCode();
        //Get Callback on redirect payment methods
        const url = window.location.href
        var payload = getPayloadFromUrl(url);

        var detailsKey = localStorage.getItem('details.key');
        //var payload = getFromUrl(detailsKey); TBD
        var resultCode = getResultCodeFromUrl(url);
        var paymentData = getPaymentData();
        if (paymentData !== null) {
            var uri_enc_paymentData = encodeURIComponent(paymentData)
            var obj = { resultCode:"Authorised" };
            //var resultFake = JSON.stringify(obj);
            //paymentDetails(uri_enc_paymentData,payload) interacContainer
            //result = "{"pspReference":"851594724227366G","resultCode":"Authorised","merchantReference":"KIOSK-DROPIN","paymentMethod":"alipay","shopperLocale":"en-EN"}"
            paymentDetails(paymentData,detailsKey, payload) //alipay
                .then(result => {
                    //result = resultFake;
                    //localStorage.removeItem('paymentData');
                    // Your function to show the final result to the shopper.
                    showFinalResultDropin(result);
                    console.log('paymentDetails result: '+result)
                    localStorage.clear();
                })
        } else loadComponentsScripts()
        //Create Pay by link returnUrl
        this.generateUrl()
        loadCoffeeOrder()
    },
};


const ReviewSandbox = {
    template: sandbox,
    data() {
        return {
            componentKey: 0,
        }
    },
    mixins: [PageMixin],
    components: {
        BaseLayout
    },

    methods: {
      prettyPrint() {
          var ugly = document.getElementById('requestToPayments').value;
          var obj = JSON.parse(ugly);
          var pretty = JSON.stringify(obj, undefined, 4);
          document.getElementById('requestToPayments').value = pretty;
      },
      // getTextAreaRequest(){
      //   var x = document.getElementById("requestToPayments").value;
      //   localStorage.setItem('requestToPayments', x)
      // },
        generateUrl() {
            var merchantAccount = {
                "merchantAccount": "ElenaPerez"
            }
            const dataPBL = {
                ...paymentsDefaultConfig,
                ...merchantAccount
            };
            generatePayByLinkUrl(dataPBL).then(url => {
                document.getElementById('paybylink').innerHTML = "Click here to open PayByLink url: " + url
                document.getElementById('paybylink').href = url
                document.getElementById("paybylink").className = "fake-link";
            });
        },
        say: function(message) {
            alert(message)
        }
    },
    mounted() {
        console.log('mounted');

        //Show localStorage on Checkout screen
        var obj = localStorage
        //document.getElementById('localStorage').innerHTML = JSON.stringify(obj);

        //Fill text area with default dropin request (be careful, is not full, not payment method info)
        //var dropinRequest = localStorage.getItem('dropinRequest')
        //document.getElementById('requestToPayments').innerHTML = dropinRequest

        saveAmount(defaultAmount);
        //document.getElementById('totalprice').innerHTML = (getAmount() / 100) + " " + getCurrencyCode();
        //Get Callback on redirect payment methods
        const url = window.location.href
        var payload = getPayloadFromUrl(url);

        var detailsKey = localStorage.getItem('details.key');
        //var payload = getFromUrl(detailsKey); TBD
        var resultCode = getResultCodeFromUrl(url);
        var paymentData = getPaymentData();
        if (paymentData !== null) {
            var uri_enc_paymentData = encodeURIComponent(paymentData)
            var obj = { resultCode:"Authorised" };
            //var resultFake = JSON.stringify(obj);
            //paymentDetails(uri_enc_paymentData,payload) interacContainer
            //result = "{"pspReference":"851594724227366G","resultCode":"Authorised","merchantReference":"KIOSK-DROPIN","paymentMethod":"alipay","shopperLocale":"en-EN"}"
            paymentDetails(paymentData,detailsKey, payload) //alipay
                .then(result => {
                    //result = resultFake;
                    //localStorage.removeItem('paymentData');
                    // Your function to show the final result to the shopper.
                    showFinalResultDropin(result);
                    console.log('paymentDetails result: '+result)
                    localStorage.clear();
                })
        } else loadComponentsScripts()
        //Create Pay by link returnUrl
        this.generateUrl()
        loadCoffeeOrder()
    },
};

const Payment = {
    template: payment,
    mixins: [PageMixin],
    components: {
        BaseLayout
    },
    mounted() {
        this.chekoutAPIPayment('ElenaPerez');
    },
    methods: {
        next() {
            this.$emit("onNext");
        },
        chekoutAPIPayment() {
            let currentObj = this;
            var data = {
                merchantAccount: 'ElenaPerez',
                reference: 'coffee',
                amount: {
                    'currency': 'EUR',
                    'value': defaultAmount
                },
                reference: 'CoffeeKioskDemo TAPI',
                paymentMethod: {
                    'type': 'scheme',
                    'number': '4111 1111 1111 1111',
                    'expiryMonth': '03',
                    'expiryYear': '2030',
                    'holderName': 'John Smith',
                    'cvc': '737'
                },
                returnUrl: 'https://www.adyen.com'
            };
            axios.post('https://cors-anywhere.herokuapp.com/https://checkout-test.adyen.com/v51/payments', data, {
                    headers: {
                        'x-api-key': ''
                    }
                })
                .then(function(response) {
                    currentObj.output = response.data;
                    console.log('Response!: ' + response.data.resultCode);
                    if (response.data.resultCode != 'Authorised') {
                        router.push({
                            name: 'Order Complete',
                            path: '/orderCompleted'
                        }).catch(error => {
                            if (error.name != "NavigationDuplicated") {
                                throw error;
                            }
                        });
                    } else {
                        router.push({
                            name: 'Order Complete',
                            path: '/orderCompleted'
                        })
                        location.reload();
                    }
                })
                .catch(function(error) {
                    currentObj.output = error;
                    console.log('Error!.' + error)
                });
        }
    }
};

Vue.component('pay-by-link', {
    template: `
    <iframe
       src="https://checkoutshopper-test.adyen.com/checkoutshopper/payByLink.shtml?d=PL78666A132D12E3FD">
    </iframe>
  `,
    mixins: [PageMixin],
    components: {
        BaseLayout
    }
});

const OrderCompleted = {
    template: orderCompleted,
    mixins: [PageMixin],
    components: {
        BaseLayout
    }
};

const routes = [{
        path: "/",
        component: Home,
        meta: {
            pageTitle: "Welcome"
        }
    },
    {
        path: "/kioskHome",
        component: KioskHome,
        meta: {
            pageTitle: "Kiosk"
        }
    },
    {
        path: "/size",
        component: Size,
        meta: {
            pageTitle: "Size"
        }
    },
    {
        path: "/capsule",
        component: Capsule,
        meta: {
            pageTitle: "Capsule"
        }
    },
    {
        path: "/milkType",
        component: MilkType,
        meta: {
            pageTitle: "Milk Type"
        }
    },
    {
        path: "/milkBalance",
        component: MilkBalance,
        meta: {
            pageTitle: "Milk Balance"
        }
    },
    {
        path: "/review",
        component: Review,
        meta: {
            pageTitle: "Review Order"
        }
    },
    {
        path: "/sandbox",
        component: ReviewSandbox,
        meta: {
            pageTitle: "Review Order / ReviewSandbox"
        }
    },
    {
        path: "/payment",
        component: Payment,
        meta: {
            pageTitle: "Payment"
        }
    },
    {
        path: "/orderCompleted",
        component: OrderCompleted,
        meta: {
            pageTitle: "Order Completed"
        }
    }
];

const router = new VueRouter({
    routes
});

const store = new Vuex.Store({
    state: {
        size: null,
        lastName: null,
        shopperReference: null
    }
});

NavigationHelper.store = store;
Vue.prototype.$NavigationHelper = NavigationHelper;
new Vue({
    el: "#app",
    router,
    store,
    template: "#appTemplate",
    data() {
        return {
            title: "Welcome"
        };
    },
    watch: {},
});

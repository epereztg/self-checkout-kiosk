const Home = {
    template: home,
    data() {
        return {
            size: null,
            choices: {
                kiosk: {
                    icon: "fa-hand-pointer",
                    text: "Self Checkout Kiosk",
                    path: "#/kioskHome"
                },
                ecom: {
                    icon: "fa-thumbs-up",
                    text: "Ecommerce",
                    path: "#/checkout"
                },
                pos: {
                    icon: "fa-hand-point-down",
                    text: "Point Of Sale",
                    path: "#/payment"
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
        },
        addToCart: function(text) {
          this.channel = text;
          localStorage.setItem("channelOption", text)
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
                    icon: "fa-tshirt fa-1x",
                    text: "Small"
                },
                medium: {
                    icon: "fa-tshirt fa-2x",
                    text: "Medium"
                },
                large: {
                    icon: "fa-tshirt fa-3x",
                    text: "Large"
                },
                xl: {
                    icon: "fa-tshirt fa-4x",
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

const Model = {
    template: model,
    mixins: [PageMixin],
    data() {
        return {
            choices: {
                small: {
                    icon: "fal fa-tshirt",
                    text: "Model 1"
                },
                medium: {
                    icon: "far fa-tshirt",
                    text: "Model 2"
                },
                large: {
                    icon: "fad fa-tshirt",
                    text: "Model 3"
                },
                xl: {
                    icon: "fas fa-tshirt",
                    text: "Model 3"
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

const Options = {
    template: options,
    data() {
        return {
            size: null,
            choices: {
                paynow: {
                    icon: "fal fa-cash-register",
                    text: "Pay Now in the terminal",
                    type: "paynow"
                },
                paylater: {
                    icon: "fa-calendar",
                    text: "Pay Later via Ecommerce (instalments)",
                    type: "paylater"
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
            vm.option = vm.$store.state.option;
        });
    },
    methods: {
      addToCart: function(text) {
        this.option = text;
        localStorage.setItem("paymentOption", text)
      }
    }
};

const Checkout = {
    template: checkout,
    data() {
        return {
            componentKey: 0,
        }
    },
    mixins: [PageMixin],
    components: {
        BaseLayout,
        PageNav
    },
    methods: {
        generatePayByLinkUrl(isPayLater) {
            var allowedPaymentMethods = {
                "allowedPaymentMethods": ["facilypay_3x", "facilypay_4x", "klarna_account"]
            }
            const dataPBL = {
                ...paymentsDefaultConfig,
                ...allowedPaymentMethods
            };
            var payByLinkRequest;
            if (isPayLater){
              payByLinkRequest = dataPBL
            } else payByLinkRequest = paymentsDefaultConfig

            generatePayByLinkUrl(payByLinkRequest).then(url => {
                document.getElementById('paybylink').innerHTML = "Click here to open PayByLink url: " + url
                document.getElementById('paybylink').href = url
                document.getElementById("paybylink").className = "fake-link";

                var qrcode = new QRCode(document.getElementById("qrcode"), {
                    text: url,
                    width: 256,
                    height: 256,
                    colorDark: "#FFFFFF",
                    colorLight: "#000000", //9D9D9B
                    //correctLevel : QRCode.CorrectLevel.H
                });
            })
        }
    },
    mounted() {
        var isPayLater = localStorage.getItem("paymentOption")=="paylater";

        //Hide Dropin if it is a "Pay Later" Option. Just Buy Now Pay Later methods will be shown
        if (isPayLater) document.getElementById('dropin-container').style.display = 'none';

        fillCountries();
        fillCurrencies();
        fillLocale();

        var showSignatureInCanvas = false;
        var canvas=null;
        if (showSignatureInCanvas==true){
           canvas = parseSignature(signature);
        }
        //Set country code
        document.getElementById('countries').getElementsByTagName('option')[getCountryIndex()].selected = 'selected'
        //Set Shopperlocale
        document.getElementById('locales').getElementsByTagName('option')[getLocaleIndex()].selected = 'selected'
        document.getElementById('currencies').getElementsByTagName('option')[getCurrencyIndex()].selected = 'selected'

        saveAmount(defaultAmount);
        document.getElementById('totalprice').innerHTML = (getAmount() / 100) + " " + getCurrencyCode();

        var requestURL = getCookie('requestURL'); //just for testing purposes
        var redirectResult = getCookie('redirectResult'); //just for testing purposes
        var threeds1resultCookie = getCookie('threeds1result');
        var paymentDetailsString = getCookie('paymentDetailsString');



        if (threeds1resultCookie != null && threeds1resultCookie != "") {
            //Coming back from a 3ds1 post redirect
            showFinalResultDropin(threeds1resultCookie);
            //document.cookie = "threeds1resultCookie="; //delete coookie
            document.cookie = "threeds1result=";
        }
        else {
            //Get Callback on redirect payment methods
            const url = window.location.href
            var payload = getPayloadFromUrl(url);

            var detailsKey = localStorage.getItem('details.key');
            //var payload = getFromUrl(detailsKey); TBD
            var resultCode = getResultCodeFromUrl(url);

            if (payload !== null) {
                var paymentData = getPaymentData();
                if (paymentData !== null) {
                    var uri_enc_paymentData = encodeURIComponent(paymentData)
                    var obj = {
                        resultCode: "Authorised"
                    };
                    //var resultFake = JSON.stringify(obj);
                    //paymentDetails(uri_enc_paymentData,payload) interacContainer
                    //result = "{"pspReference":"851594724227366G","resultCode":"Authorised","merchantReference":"KIOSK-DROPIN","paymentMethod":"alipay","shopperLocale":"en-EN"}"
                    paymentDetails(paymentData, detailsKey, payload) //alipay
                        .then(result => {
                            //result = resultFake;
                            //localStorage.removeItem('paymentData');

                            // Your function to show the final result to the shopper.
                            //showFinalResultDropin(result);
                            console.log('paymentDetails result: ' + result)
                            localStorage.setItem('paymentResult', result);
                            document.getElementById('localStorage').innerHTML = JSON.stringify(result);

                            //localStorage.clear();
                            //localStorage.setItem('paymentResult');
                            window.location = window.origin+"/#/orderCompleted"//defaultOrigin()

                        })
                }
                //window.location = defaultUrl()
            } else
            loadComponentsScripts()
        } //else 3ds1

        //Create Pay by link returnUrl
        this.generatePayByLinkUrl(isPayLater)
        loadCoffeeOrder()
        //localStorage.clear();
    },
};

const SelectTerminal = {
    template: selectTerminal,
    data () {
      return{
        terminals: []
        }
    },
    mixins: [PageMixin],
    components: {
        BaseLayout,
        PageNav
    },
    created(){

    },
    mounted() {
      connectedTerminals()
          .then(response => {
            response = JSON.parse(JSON.parse(response))
            for(i=0; i<=response.uniqueTerminalIds.length-1; i++){
                this.terminals.push(response.uniqueTerminalIds[i]) ;
            }
          })
    },
    methods: {
        addToCart: function(text) {
          localStorage.setItem("selectTerminal", text)
        }
    }
};

const Payment = {
    template: payment,
    mixins: [PageMixin],
    components: {
        BaseLayout
    },
    mounted() {
        makePOSPayment()
            .then(response => {
                localStorage.setItem('posResult', response);
                window.location = window.origin + "/#/orderCompleted"
            })
    },
    methods: {
        next() {
            this.$emit("onNext");
        },
        getSelectedTerminal() {
            return localStorage.getItem("selectTerminal");
        },
    }
};

const OrderCompleted = {
    template: orderCompleted,
    mixins: [PageMixin],
    components: {
        BaseLayout
    },
    mounted(){
      //POS
      var posResultCookie = localStorage.getItem('posResult');

      if (posResultCookie!=null && posResultCookie!=""){
        localStorage.setItem('posResult', "");
          showFinalResultPOS(JSON.parse(posResultCookie));
          window.location = window.origin + "/#/orderCompleted"
      }
      else {
        var paymentResult = localStorage.getItem('paymentResult');
        showFinalResultDropin(paymentResult);
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
        path: "/model",
        component: Model,
        meta: {
            pageTitle: "Model"
        }
    },
    {
        path: "/options",
        component: Options,
        meta: {
            pageTitle: "Payment Options"
        }
    },
    {
        path: "/checkout",
        component: Checkout,
        meta: {
            pageTitle: "Checkout Order"
        }
    },
    {
        path: "/selectTerminal",
        component: SelectTerminal,
        meta: {
            pageTitle: "Select Terminal"
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

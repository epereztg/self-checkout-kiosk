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
            if (dc != "null") localStorage.setItem('defaultCurrency', dc)
            if (dci != "null") localStorage.setItem('defaultCurrencyIndex', dci)
            if (dl != "null") localStorage.setItem('defaultLocale', dl)
            if (dli != "null") localStorage.setItem('defaultlocaleIndex', dli)
            if (dcc != "null") localStorage.setItem('defaultCountry', dcc)
            if (dcci != "null") localStorage.setItem('countryIndex', dcci)
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
            //localStorage.setItem('shopperReference', document.getElementById("shopperReference").innerHTML)
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


const Options = {
    template: options,
    data() {
        return {
            size: null,
            choices: {
                small: {
                    icon: "fa-bolt",
                    text: "Pay Now"
                },
                medium: {
                    icon: "fa-calendar",
                    text: "Pay Later"
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



const PayLater = {
    template: payLater,
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
    created() {
        //console.log('created');
    },
    updated() {
        //console.log('updated');
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

                var qrcode = new QRCode(document.getElementById("qrcode"), {
                    text: url,
                    width: 128,
                    height: 128,
                    colorDark: "#FFFFFF",
                    colorLight: "#000000", //9D9D9B
                    //correctLevel : QRCode.CorrectLevel.H
                });
            })
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
            console.log('defaultCountry changed to: ' + sel.value)
            location.reload();
        },
        say: function(message) {
            alert(message)
        }
    },
    mounted() {

        var obj = localStorage
        //PaymentResult:
        //document.getElementById('localStorage').innerHTML = JSON.stringify(obj);

        fillCountries();
        fillCurrencies();
        fillLocale();

        const signature = {
            "signature": {
                "data": [{
                    "x": "79",
                    "y": "86"
                }, {
                    "x": "7C",
                    "y": "81"
                }, {
                    "x": "7D",
                    "y": "7D"
                }, {
                    "x": "7D",
                    "y": "6E"
                }, {
                    "x": "7C",
                    "y": "6A"
                }, {
                    "x": "7A",
                    "y": "67"
                }, {
                    "x": "77",
                    "y": "5F"
                }, {
                    "x": "76",
                    "y": "5B"
                }, {
                    "x": "73",
                    "y": "56"
                }, {
                    "x": "70",
                    "y": "52"
                }, {
                    "x": "6D",
                    "y": "4F"
                }, {
                    "x": "6B",
                    "y": "4E"
                }, {
                    "x": "68",
                    "y": "4B"
                }, {
                    "x": "65",
                    "y": "4A"
                }, {
                    "x": "62",
                    "y": "47"
                }, {
                    "x": "5D",
                    "y": "46"
                }, {
                    "x": "5D",
                    "y": "48"
                }, {
                    "x": "5C",
                    "y": "48"
                }, {
                    "x": "5C",
                    "y": "4A"
                }, {
                    "x": "5A",
                    "y": "4E"
                }, {
                    "x": "59",
                    "y": "51"
                }, {
                    "x": "59",
                    "y": "53"
                }, {
                    "x": "58",
                    "y": "53"
                }, {
                    "x": "58",
                    "y": "5C"
                }, {
                    "x": "56",
                    "y": "6B"
                }, {
                    "x": "56",
                    "y": "7E"
                }, {
                    "x": "57",
                    "y": "80"
                }, {
                    "x": "57",
                    "y": "88"
                }, {
                    "x": "58",
                    "y": "8D"
                }, {
                    "x": "59",
                    "y": "91"
                }, {
                    "x": "5A",
                    "y": "91"
                }, {
                    "x": "5C",
                    "y": "95"
                }, {
                    "x": "61",
                    "y": "98"
                }, {
                    "x": "63",
                    "y": "9B"
                }, {
                    "x": "66",
                    "y": "9E"
                }, {
                    "x": "69",
                    "y": "A0"
                }, {
                    "x": "6B",
                    "y": "A2"
                }, {
                    "x": "6E",
                    "y": "A7"
                }, {
                    "x": "70",
                    "y": "A9"
                }, {
                    "x": "73",
                    "y": "AA"
                }, {
                    "x": "79",
                    "y": "AD"
                }, {
                    "x": "7D",
                    "y": "AE"
                }, {
                    "x": "81",
                    "y": "B3"
                }, {
                    "x": "84",
                    "y": "B6"
                }, {
                    "x": "88",
                    "y": "BD"
                }, {
                    "x": "8A",
                    "y": "BF"
                }, {
                    "x": "8B",
                    "y": "BF"
                }, {
                    "x": "8D",
                    "y": "C2"
                }, {
                    "x": "8E",
                    "y": "C5"
                }, {
                    "x": "90",
                    "y": "C5"
                }, {
                    "x": "92",
                    "y": "C2"
                }, {
                    "x": "96",
                    "y": "BF"
                }, {
                    "x": "98",
                    "y": "BE"
                }, {
                    "x": "9C",
                    "y": "B9"
                }, {
                    "x": "A0",
                    "y": "B5"
                }, {
                    "x": "AA",
                    "y": "AE"
                }, {
                    "x": "AF",
                    "y": "AB"
                }, {
                    "x": "B2",
                    "y": "A6"
                }, {
                    "x": "B5",
                    "y": "A0"
                }, {
                    "x": "B7",
                    "y": "9B"
                }, {
                    "x": "BC",
                    "y": "93"
                }, {
                    "x": "BF",
                    "y": "8A"
                }, {
                    "x": "C3",
                    "y": "82"
                }, {
                    "x": "C6",
                    "y": "71"
                }, {
                    "x": "C6",
                    "y": "6C"
                }, {
                    "x": "C3",
                    "y": "5C"
                }, {
                    "x": "C1",
                    "y": "57"
                }, {
                    "x": "B9",
                    "y": "47"
                }, {
                    "x": "B9",
                    "y": "46"
                }, {
                    "x": "B7",
                    "y": "42"
                }, {
                    "x": "B4",
                    "y": "40"
                }, {
                    "x": "B2",
                    "y": "40"
                }, {
                    "x": "A6",
                    "y": "46"
                }, {
                    "x": "A4",
                    "y": "48"
                }, {
                    "x": "9F",
                    "y": "4B"
                }, {
                    "x": "9B",
                    "y": "4D"
                }, {
                    "x": "8E",
                    "y": "57"
                }, {
                    "x": "88",
                    "y": "5D"
                }, {
                    "x": "85",
                    "y": "63"
                }, {
                    "x": "7D",
                    "y": "6B"
                }, {
                    "x": "7A",
                    "y": "6F"
                }, {
                    "x": "74",
                    "y": "79"
                }, {
                    "x": "73",
                    "y": "7D"
                }, {
                    "x": "73",
                    "y": "7F"
                }, {
                    "x": "72",
                    "y": "84"
                }, {
                    "x": "76",
                    "y": "87"
                }, {
                    "x": "7A",
                    "y": "87"
                }, {
                    "x": "7C",
                    "y": "86"
                }, {
                    "x": "FFFF",
                    "y": "FFFF"
                }],
                "signature_format": "raw"
            }
        }

        //var canvas = parseSignature(signature);

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

        //POS
        var posResultCookie = localStorage.getItem('posResult');

        if (threeds1resultCookie != null && threeds1resultCookie != "") {
            //Coming back from a 3ds1 post redirect
            showFinalResultDropin(threeds1resultCookie);
            //document.cookie = "threeds1resultCookie="; //delete coookie
            document.cookie = "threeds1result=";
        }
        else if (posResultCookie!=null && posResultCookie!=""){
          localStorage.setItem('posResult', "");
            showFinalResultPOS(JSON.parse(posResultCookie));
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
                            showFinalResultDropin(result);
                            console.log('paymentDetails result: ' + result)
                            localStorage.setItem('paymentResult', result);
                            document.getElementById('localStorage').innerHTML = JSON.stringify(result);

                            localStorage.clear();
                            window.location = defaultOrigin()
                        })
                }
                //window.location = defaultUrl()
            } else loadComponentsScripts()


        } //else 3ds1

        //Create Pay by link returnUrl
        this.generateUrl()
        loadCoffeeOrder()
        //localStorage.clear();
    },
};

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

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
                    showFinalResultDropin(result);
                    console.log('paymentDetails result: ' + result)
                    localStorage.clear();
                })
        } else loadComponentsScripts()
        //Create Pay by link returnUrl
        this.generateUrl()
        loadCoffeeOrder()
    },
};



const Demo1 = {
    template: demo1,
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
    },
    mounted() {
        saveAmount(defaultAmount);
        //Create Pay by link returnUrl

        loadComponentsScripts()
        localStorage.removeItem('state.data')
        //localStorage.clear();
    },
};


const Demo2 = {
    template: demo2,
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
    //     handleOnAdditionalDetails(statedata){
    //       paymentDetails(statedata)
    //           .then(result => {
    //               if (JSON.parse(result).resultCode == 'ChallengeShopper' || JSON.parse(result).resultCode == 'IdentifyShopper') {
    //                   dropin.handleAction(JSON.parse(result).action);
    //               } else if (JSON.parse(result).resultCode == 'Authorised') {
    //
    //                   dropin.setStatus('success');
    //                   localStorage.clear()
    //               } else if (JSON.parse(result).resultCode == 'Cancelled') {
    //                   showFinalResultDropin(result);
    //               } else {
    //                   //showFinalResultDropin(result);
    //                   dropin.setStatus('error'); //paypal prblem here, result is string.
    //                   localStorage.clear()
    //                   //showFinalResult(result);
    //               }
    //           })
    //           .catch(error => {
    //               localStorage.clear()
    //               console.log('error on submitDetails' + error)
    //               //localStorage.clear()
    //               throw Error(error);
    //           });
    //
    // }
  },
    mounted() {

      const url = window.location.href
      var payload = getPayloadFromUrl(url);
      var isRedirectCallback = url.includes("redirectResult");

            if (isRedirectCallback){
                  var detailsKey = localStorage.getItem('details.key');
                  var resultCode = getResultCodeFromUrl(url);
                  var paymentData = getPaymentData();

                      paymentDetails(paymentData, detailsKey, payload) //alipay
                          .then(result => {
                              //result = resultFake;
                              //localStorage.removeItem('paymentData');
                              // Your function to show the final result to the shopper.
                              showFinalResultDropin(result);
                              console.log('paymentDetails result: ' + result)
                              localStorage.clear();
                          })
            }
            else{
                  ///--------
                    var statedata = JSON.parse(localStorage.getItem('state.data'));
                    const configuration = {
                        locale: "en_US",
                        environment: "test",
                        clientKey: "test_E3XT7DO34FETRCDF4XFV5XX2GMRW3TQZ",
                        onAdditionalDetails: paymentDetails(statedata)//this.handleOnAdditionalDetails(statedata)//handleOnAdditionalDetails
                    };

                    makePayment(statedata)
                        .then(response => {
                            if (response.action) {
                                saveActionType(response.action.type)
                                if (response.details != null) {
                                    localStorage.setItem('details.key', response.details[0].key)
                                } else
                                    checkout.createFromAction(response.action).mount('#card-container');
                            } else if (response.resultCode === "Authorised") {
                                //dropin.setStatus('success');
                                showFinalResultDropin(JSON.stringify(response));
                            } else {
                                //dropin.setStatus('error');
                                showFinalResultDropin(JSON.stringify(response));
                            }
                        })
                        .catch(error => {
                            console.log('error on makePayment' + error)
                            throw Error(error);
                        });
                }
            }
            }


const Payment = {
    template: payment,
    mixins: [PageMixin],
    components: {
        BaseLayout
    },
    mounted() {

        makePOSPayment()
            .then(response => {
                //var response = JSON.parse(response);
                //localStorage.setItem('posResult',  JSON.stringify(response))
                localStorage.setItem('posResult', response);
                router.push({
                    name: 'Order Complete',
                    path: '/checkout'
                })
                location.reload();

                // if (response.SaleToPOIRequest.EventNotification.EventToNotify == 'Reject') {
                //     if (response.data.resultCode != 'Authorised') {
                //     router.push({
                //         name: 'Order Complete',
                //         path: '/orderCompleted'
                //     }).catch(error => {
                //         if (error.name != "NavigationDuplicated") {
                //             throw error;
                //         }
                //     });
                //   }
                // } else {
                //     router.push({
                //         name: 'Order Complete',
                //         path: '/checkout'
                //     })
                //     showFinalResultDropin(JSON.stringify(response));
                //     //location.reload();
                // }
            })
        //this.chekoutAPIPayment('ElenaPerezToril');
    },
    methods: {
        next() {
            this.$emit("onNext");
        },
        // chekoutAPIPayment() {
        //
        //
        //
        //     let currentObj = this;
        //     var data = {
        //         merchantAccount: 'ElenaPerezToril',
        //         reference: 'coffee',
        //         amount: {
        //             'currency': 'EUR',
        //             'value': defaultAmount
        //         },
        //         reference: 'CoffeeKioskDemo TAPI',
        //         paymentMethod: {
        //             'type': 'scheme',
        //             'number': '4111 1111 1111 1111',
        //             'expiryMonth': '03',
        //             'expiryYear': '2030',
        //             'holderName': 'John Smith',
        //             'cvc': '737'
        //         },
        //         returnUrl: 'https://www.adyen.com'
        //     };
        //
        //     axios.post('https://terminal-api-test.adyen.com/sync', data, {
        //
        //   //  axios.post('https://cors-anywhere.herokuapp.com/https://checkout-test.adyen.com/v51/payments', data, {
        //             headers: {
        //                 'x-api-key': 'AQEyhmfxK4zLbxRKw0m/n3Q5qf3VaY9UCJ1+XWZe9W27jmlZirW1mE6Zk8D5ZA3Fk9cSFaoQwV1bDb7kfNy1WIxIIkxgBw==-R1ugmqSY/kRBJ4g8GYeNNbYf6AtSst0EaTcEnMsWPCU=-Ry8GyevD&rR_6Lay'
        //             }
        //         })
        //         .then(function(response) {
        //             currentObj.output = response.data;
        //             console.log('Response!: ' + response.data.resultCode);
        //             if (response.data.resultCode != 'Authorised') {
        //                 router.push({
        //                     name: 'Order Complete',
        //                     path: '/orderCompleted'
        //                 }).catch(error => {
        //                     if (error.name != "NavigationDuplicated") {
        //                         throw error;
        //                     }
        //                 });
        //             } else {
        //                 router.push({
        //                     name: 'Order Complete',
        //                     path: '/orderCompleted'
        //                 })
        //                 location.reload();
        //             }
        //         })
        //         .catch(function(error) {
        //             currentObj.output = error;
        //             console.log('Error!.' + error)
        //         });
        // }
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
        path: "/options",
        component: Options,
        meta: {
            pageTitle: "Payment Options"
        }
    },
    {
        path: "/payLater",
        component: PayLater,
        meta: {
            pageTitle: "Buy Now, Pay Later"
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
        path: "/sandbox",
        component: ReviewSandbox,
        meta: {
            pageTitle: "Review Order / ReviewSandbox"
        }
    },
    {
        path: "/demo1",
        component: Demo1,
        meta: {
            pageTitle: "Demo1"
        }
    },
    {
        path: "/demo2",
        component: Demo2,
        meta: {
            pageTitle: "Demo2"
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

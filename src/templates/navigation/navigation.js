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

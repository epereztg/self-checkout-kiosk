//import * from "templates"

function loadCoffeeOrder() {
    if (store.state.size != null) {
        localStorage.setItem('size', store.state.size)
    } else {
        store.state.size = localStorage.getItem('size')
    }
    if (store.state.capsule != null) {
        localStorage.setItem('capsule', store.state.capsule)
    } else {
        store.state.capsule = localStorage.getItem('capsule')
    }
    if (store.state.milkType != null) {
        localStorage.setItem('milkType', store.state.milkType)
    } else {
        store.state.milkType = localStorage.getItem('milkType')
    }
    if (store.state.milkBalance != null) {
        localStorage.setItem('milkBalance', store.state.milkBalance)
    } else {
        store.state.milkBalance = localStorage.getItem('milkBalance')
    }
    if (store.state.shopperReference != null) {
        localStorage.setItem('shopperReference', store.state.shopperReference)
    } else {
        store.state.shopperReference = localStorage.getItem('shopperReference')
    }
}

function loadComponentsScripts() {
    if (document.getElementById('interac-container') != null) {
        let interacScript = document.createElement('script')
        interacScript.setAttribute('src', './components/interac.js')
        document.head.appendChild(interacScript)
    }
    if (document.getElementById('dropin-container') != null) {
        var dropinScript = document.createElement('script');
        dropinScript.setAttribute('src', './components/dropin.js')
        document.head.appendChild(dropinScript)
        var googleScript = document.createElement('script');
        dropinScript.setAttribute('src', 'https://pay.google.com/gp/p/js/pay.js')
        document.head.appendChild(googleScript)
    }
    if (document.getElementById('oney-container') != null) {
        var dropinScript = document.createElement('script');
        dropinScript.setAttribute('src', './components/oney.js')
        document.head.appendChild(dropinScript)
    }
    if (document.getElementById('mbway-container') != null) {
        var mbwayScript = document.createElement('script');
        mbwayScript.setAttribute('src', './components/mbway.js')
        document.head.appendChild(mbwayScript)
    }
    if (document.getElementById('card-container') != null) {
        var mbwayScript = document.createElement('script');
        mbwayScript.setAttribute('src', './components/card.js')
        document.head.appendChild(mbwayScript)
    }
    if (document.getElementById('googlepay-container') != null) {
        var mbwayScript = document.createElement('script');
        mbwayScript.setAttribute('src', './components/googlepay.js')
        document.head.appendChild(mbwayScript)
    }
    if (document.getElementById('wechatpayqr-container') != null) {
        var mbwayScript = document.createElement('script');
        mbwayScript.setAttribute('src', './components/wechatpay.js')
        document.head.appendChild(mbwayScript)
    }
}
// function getRedirectResultFromUrl(url) {
//     var queryString = url ? url.split('?')[1] : window.location.search.slice(1); //get all from ?
//     if (typeof queryString != 'undefined') {
//         queryString = queryString.split('=')[1];
//         return queryString.split('&')[0];
//     } else return null;
// }

function getPayloadFromUrl(url) {
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1); //get all from ?
    if (typeof queryString != 'undefined') {
        queryString = queryString.split('=')[1];
        return queryString.split('&')[0];
    } else return null;
}

function getResultCodeFromUrl(url) {
    var queryString = url ? url.split('resultCode')[1] : window.location.search.slice(1); //get all from ?
    if (typeof queryString != 'undefined') {
        queryString = queryString.split('=')[1];
        return queryString;
    } else return null;
}

function generatePayByLinkUrl(data) {
  return paymentLinks(data);
}

function generatePayByLinkUrlQR(data) {
  return paymentLinksQR(data);
}

function generatePayByLinkStatus(data) {
  return paymentLinksStatus(data);
}

function fillCountries() {
  var select = document.getElementById("countries");
  var options = countries;
  for(var i = 0; i < options.length; i++) {
      var opt = options[i];
      var el = document.createElement("option");
      el.textContent =  flags[i] +' '+ countryNames[i];
      el.value = opt;
      select.appendChild(el);
  }
}
function fillCurrencies() {
  var select = document.getElementById("currencies");
  var options = currencies;
  for(var i = 0; i < options.length; i++) {
      var opt = options[i];
      var el = document.createElement("option");
      el.textContent =  currencies[i];
      el.value = opt;
      select.appendChild(el);
  }
}

function fillLocale() {
  var select = document.getElementById("locales");
  var options = locale;
  for(var i = 0; i < options.length; i++) {
      var opt = options[i];
      var el = document.createElement("option");
      el.textContent =  localeflags[i] +' '+ locale[i];
      el.value = opt;
      select.appendChild(el);
  }
}

function changeCurrency() {
    var sel = document.getElementById('currencies');
    localStorage.setItem('defaultCurrency', sel.value)
    localStorage.setItem('defaultCurrencyIndex', sel.selectedIndex)
    console.log('defaultCurrency changed to: '+sel.value)
}

function changeShopperLocale() {
    var sel = document.getElementById('locales');
    localStorage.setItem('defaultLocale', sel.value)
    localStorage.setItem('defaultlocaleIndex', sel.selectedIndex)
}

function changeLocation() {
    var sel = document.getElementById('countries');
    document.getElementById('countries').getElementsByTagName('option')[sel.selectedIndex].selected = 'selected'

    localStorage.setItem('defaultCountry', sel.value)
    localStorage.setItem('countryIndex', sel.selectedIndex)
}

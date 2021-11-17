//import * from "templates"
function loadCoffeeOrder() {
    if (store.state.size != null) {
        localStorage.setItem('size', store.state.size)
    } else {
        //store.state.size = localStorage.getItem('size')
    }
    if (store.state.capsule != null) {
        localStorage.setItem('capsule', store.state.capsule)
    } else {
        //store.state.capsule = localStorage.getItem('capsule')
    }

    if (store.state.shopperReference != null) {
        localStorage.setItem('shopperReference', store.state.shopperReference)
    } else {
        store.state.shopperReference = localStorage.getItem('shopperReference')
    }
}

function loadComponentsScripts() {
    if (document.getElementById('dropin-container') != null) {
        var dropinScript = document.createElement('script');
        dropinScript.setAttribute('src', './components/dropin.js')
        document.head.appendChild(dropinScript)
        var googleScript = document.createElement('script');
        dropinScript.setAttribute('src', 'https://pay.google.com/gp/p/js/pay.js')
        document.head.appendChild(googleScript)
    }
}

// DEPRECATED V66
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

        //For klarna and adp about issuer comment the following two rows
        queryString = queryString.split('=')[1];
        return queryString.split('&')[0];
        return queryString;
    } else return null;
}

function getResultCodeFromUrl(url) {
    var queryString = url ? url.split('resultCode')[1] : window.location.search.slice(1); //get all from ?
    if (typeof queryString != 'undefined') {
        queryString = queryString.split('=')[1];
        return queryString;
    } else return null;
}

// function generatePayByLinkUrl(data) {
//   return paymentLinks(data);
// }

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

// Not being used. Future project with sign on terminal subscription
function parseSignature(signature) {
  const convert = (x) => x.toUpperCase() === 'FFFF' ? -1 : parseInt(x, 16);
  var dataPointsHEX = signature.signature.data;
  var dataPoints = dataPointsHEX;

  var points = dataPoints.slice(0, dataPointsHEX.length-1);
  for (var i = 0; i < dataPointsHEX.length; i++){
    var obj = dataPointsHEX[i];
    for (var key in obj){
      var value = obj[key];
      dataPoints[i].x = parseInt(dataPointsHEX[i].x, 16);
      dataPoints[i].y = parseInt(dataPointsHEX[i].y, 16);
    }
  }

  const max = (a, b) => a ? Math.max(a, b) : b;
  const min = (a, b) => a ? Math.min(a, b) : b;

  const minX = points.filter(({ x, y }) => x > -1).reduce((acc, { x, y }) => min(acc, x), undefined);
  const maxX = points.filter(({ x, y }) => x > -1).reduce((acc, { x, y }) => max(acc, x), undefined);
  const minY = points.filter(({ x, y }) => x > -1).reduce((acc, { x, y }) => min(acc, y), undefined);
  const maxY = points.filter(({ x, y }) => x > -1).reduce((acc, { x, y }) => max(acc, y), undefined);

  //const canvas = document.createElement('canvas');
  var canvas = document.getElementById('canvas');
  const margin = 10;
  const width = maxX - minX;
  const height = maxY - minY ;
  canvas.width = width + margin * 2;
  canvas.height = height + margin * 2;
  canvas.style.backgroundColor = '#ffffff';
  const ctx = canvas.getContext('2d');
  ctx.strokeStyle = 'red';
  ctx.lineWidth = 5;

  ctx.fillStyle = "black";

  let connect = false;
  points.forEach(({ x, y }) => {
    if(x == -1 && y == -1) {
      ctx.stroke();
      connect = false;
    } else if(connect) {
      ctx.lineTo(margin + x - minX, margin + y - minY);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.moveTo(margin + x - minX, margin + y - minY);
      connect = true;
    }
  });
  return canvas;
}

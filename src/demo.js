const stateContainer = document.querySelector('.current-state');
const requestContainer = document.querySelector('.request-container');
const responseContainer = document.querySelector('.response-container');
const paypalContainer = document.getElementById("paypal-container");
var dropinContainer= document.getElementById("dropin-container");
const interacContainer= document.getElementById("interac-container");

function showFinalComponent(response) {

  var resultCode = JSON.parse(response).resultCode;
  var pspRef = JSON.parse(response).pspReference;
  const interacContainer= document.getElementById("interac-container");
  //interacContainer.innerHTML = '<div>✅response'+response+'<br> Adyen PSP reference: '+pspRef+'</div>';

  if (resultCode == "Authorised"){
    interacContainer.innerHTML = '<div>✅Payment result:'+resultCode+'<br> Adyen PSP reference: '+pspRef+'</div>';
  }
  else if (resultCode == "Received"){
    interacContainer.innerHTML = '<div>🔵Payment result:'+resultCode+'<br> Adyen PSP reference (Offer): '+pspRef+'</div>';
  }
  else if (resultCode == "Cancelled"){
    interacContainer.innerHTML = '<div>🔵Payment result:'+resultCode+'<br> Adyen PSP reference (Offer): '+pspRef+'</div>';
  }
  else {
    interacContainer.innerHTML = '<div>❌Payment result'+resultCode+'<br> Adyen PSP reference: '+pspRef+'</div>';
  }
}
// Demo - Update server response container
function showFinalResult(response) {
  var resultCode = JSON.parse(response).resultCode;
  var pspRef = JSON.parse(response).pspReference;

  if (resultCode == "Authorised"){
    paypalContainer.innerHTML = '<div>✅Paypal result:'+resultCode+'<br> Adyen PSP reference: '+pspRef+'</div>';
  }
  else if (resultCode == "Received"){
    paypalContainer.innerHTML = '<div>🔵Paypal result:'+resultCode+'<br> Adyen PSP reference (Offer): '+pspRef+'</div>';
  }
  else {
    paypalContainer.innerHTML = '<div>❌Paypal result'+resultCode+'<br> Adyen PSP reference: '+pspRef+'</div>';
  }
}

// Demo - Update server response container
function showFinalResultPOS(response) {//response.SaleToPOIResponse
  var resultCode = null;
  var pspRef = null;

  if (response.SaleToPOIResponse.PaymentResponse.Response.Result == 'Success') {
    resultCode = 'Success';
  } else if (response.SaleToPOIResponse.PaymentResponse.Response.Result == 'Failure') {
    resultCode = 'Failure';
  } else if (response.SaleToPOIResponse.EventNotification.EventToNotify == 'Reject'){
    resultCode = 'Reject';
  } else {
    resultCode = 'Success';
  }

  var textToShow;
  if (resultCode == "Success"){
    textToShow =
    "<div class=\"adyen-checkout__status adyen-checkout__status--success\">\r\n  <img height=\"88\" class=\"adyen-checkout__status__icon adyen-checkout__image adyen-checkout__image--loaded\"\r\n  src=\"https:\/\/checkoutshopper-test.adyen.com\/checkoutshopper\/images\/components\/success.svg\"\r\n  alt=\"Payment Successful\">\r\n  <span class=\"adyen-checkout__status__text\">Payment Successful<\/span>\r\n<\/div>"

  }
  else if (resultCode == "Reject"){
    textToShow =
    "<div class=\"adyen-checkout__status adyen-checkout__status--error\">\r\n    <img class=\"adyen-checkout__status__icon adyen-checkout__image adyen-checkout__image--loaded\"\r\n    src=\"https:\/\/checkoutshopper-test.adyen.com\/checkoutshopper\/images\/components\/error.svg\"\r\n    alt=\"Your transaction was REFUSED!\" height=\"88\">\r\n  <span class=\"adyen-checkout__status__text\">Your transaction was REFUSED!<\/span>"

  }
  else if (resultCode == "Failure"){
    textToShow =
    "<div class=\"adyen-checkout__status adyen-checkout__status--warning\">\r\n  <img height=\"88\" class=\"adyen-checkout__status__icon adyen-checkout__image adyen-checkout__image--loaded\"\r\n  src=\"https://i7.uihere.com/icons/199/579/754/alarm-processing-205473b2b36b8b4806293cd70da06f49.png\"\r\n  alt=\"Payment is PENDING, you will receive and update soon\">\r\n  <span class=\"adyen-checkout__status__text\">Payment Cancelled<\/span>\r\n<\/div>"

  }
  else {
    textToShow = '<div>❌Payment result'+resultCode+'<br> Adyen PSP reference: '+pspRef+'</div>';
  }

  if (dropinContainer == null){
     dropinContainer = document.getElementById("dropin-container");
  }

  dropinContainer.innerHTML = textToShow;
}

//https://www.freeformatter.com/javascript-escape.html#ad-output
function showFinalResultDropin(response) {
  var resultCode = JSON.parse(response).resultCode;
  var pspRef = JSON.parse(response).pspReference;

  var textToShow;
  if (resultCode == "Authorised"){
       textToShow =
       "<div class=\"adyen-checkout__status adyen-checkout__status--success\">\r\n  <img height=\"88\" class=\"adyen-checkout__status__icon adyen-checkout__image adyen-checkout__image--loaded\"\r\n  src=\"https:\/\/checkoutshopper-test.adyen.com\/checkoutshopper\/images\/components\/success.svg\"\r\n  alt=\"Payment Successful\">\r\n  <span class=\"adyen-checkout__status__text\">Payment Successful<\/span>\r\n<\/div>"
  }
  else if (resultCode == "Cancelled"){
       textToShow =
       "<div class=\"adyen-checkout__status adyen-checkout__status--error\">\r\n  <img height=\"88\" class=\"adyen-checkout__status__icon adyen-checkout__image adyen-checkout__image--loaded\"\r\n  src=\"https:\/\/checkoutshopper-test.adyen.com\/checkoutshopper\/images\/components\/success.svg\"\r\n  alt=\"Payment Cancelled by shopper\">\r\n  <span class=\"adyen-checkout__status__text\">Payment Cancelled<\/span>\r\n<\/div>"
  }
  else if (resultCode == "Received"){
       textToShow =
       "<div class=\"adyen-checkout__status adyen-checkout__status--warning\">\r\n  <img height=\"88\" class=\"adyen-checkout__status__icon adyen-checkout__image adyen-checkout__image--loaded\"\r\n  src=\"https://i7.uihere.com/icons/199/579/754/alarm-processing-205473b2b36b8b4806293cd70da06f49.png\"\r\n  alt=\"Payment RECEIVED, you will receive and update soon\">\r\n  <span class=\"adyen-checkout__status__text\">Payment Cancelled<\/span>\r\n<\/div>"
  }
  else if (resultCode == "Pending"){
       textToShow =
       "<div class=\"adyen-checkout__status adyen-checkout__status--warning\">\r\n  <img height=\"88\" class=\"adyen-checkout__status__icon adyen-checkout__image adyen-checkout__image--loaded\"\r\n  src=\"https://i7.uihere.com/icons/199/579/754/alarm-processing-205473b2b36b8b4806293cd70da06f49.png\"\r\n  alt=\"Payment is PENDING, you will receive and update soon\">\r\n  <span class=\"adyen-checkout__status__text\">Payment Cancelled<\/span>\r\n<\/div>"
  }
  else if (resultCode == "Refused"){
       textToShow =
       "<div class=\"adyen-checkout__status adyen-checkout__status--error\">\r\n    <img class=\"adyen-checkout__status__icon adyen-checkout__image adyen-checkout__image--loaded\"\r\n    src=\"https:\/\/checkoutshopper-test.adyen.com\/checkoutshopper\/images\/components\/error.svg\"\r\n    alt=\"Your transaction was REFUSED!\" height=\"88\">\r\n  <span class=\"adyen-checkout__status__text\">Your transaction was REFUSED!<\/span>"
  }
  else {
      textToShow =
      "<div class=\"adyen-checkout__status adyen-checkout__status--error\">\r\n    <img class=\"adyen-checkout__status__icon adyen-checkout__image adyen-checkout__image--loaded\"\r\n    src=\"https:\/\/checkoutshopper-test.adyen.com\/checkoutshopper\/images\/components\/error.svg\"\r\n    alt=\"An unknown error occurred\" height=\"88\">\r\n  <span class=\"adyen-checkout__status__text\">An unknown error occurred<\/span>"
  }

  if (dropinContainer == null){
     dropinContainer = document.getElementById("dropin-container");
  }

  dropinContainer.innerHTML = textToShow;
}


// Demo - Copy Source Code Examples
document.querySelectorAll('.copy-sample-code').forEach(c => {
    c.addEventListener('click', () => {
        const code = document.querySelector('.source-code');
        const range = document.createRange();
        range.selectNode(code);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        document.execCommand('copy');
        c.classList.add('copy-sample-code--active');

        setTimeout(() => {
            c.classList.remove('copy-sample-code--active');
        }, 1000);
    });
});

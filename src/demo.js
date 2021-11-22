var warningHTML = "<div class=\"adyen-checkout__status adyen-checkout__status--warning\">\r\n  <img height=\"88\" class=\"adyen-checkout__status__icon adyen-checkout__image adyen-checkout__image--loaded\"\r\n  src=\"https://i7.uihere.com/icons/199/579/754/alarm-processing-205473b2b36b8b4806293cd70da06f49.png\"\r\n  alt=\"Payment is PENDING, you will receive and update soon\">\r\n  <span class=\"adyen-checkout__status__text\">Payment Cancelled<\/span>\r\n<\/div>"
var authorisedHTML = "<div class=\"adyen-checkout__status adyen-checkout__status--success\">\r\n  <img height=\"88\" class=\"adyen-checkout__status__icon adyen-checkout__image adyen-checkout__image--loaded\"\r\n  src=\"https:\/\/checkoutshopper-test.adyen.com\/checkoutshopper\/images\/components\/success.svg\"\r\n  alt=\"Payment Successful\">\r\n  <span class=\"adyen-checkout__status__text\">Payment Successful<\/span>\r\n<\/div>"
var errorHTML =  "<div class=\"adyen-checkout__status adyen-checkout__status--error\">\r\n  <img height=\"88\" class=\"adyen-checkout__status__icon adyen-checkout__image adyen-checkout__image--loaded\"\r\n  src=\"https:\/\/checkoutshopper-test.adyen.com\/checkoutshopper\/images\/components\/error.svg\"\r\n  alt=\"Payment Cancelled by shopper\">\r\n  <span class=\"adyen-checkout__status__text\">Payment Cancelled<\/span>\r\n<\/div>"

function showFinalResultPOS(response) {
  var resultCode = null;
  var pspRef = null;

  if (response.SaleToPOIRequest !=null){
    resultCode = 'Reject';
  }
  else  if (response.SaleToPOIResponse.PaymentResponse.Response.Result == 'Success') {
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
    textToShow = authorisedHTML
  }
  else if (resultCode == "Reject"){
    textToShow = errorHTML
  }
  else if (resultCode == "Failure"){
    textToShow = warningHTML
  }
  else {
    textToShow = '<div>❌Payment result'+resultCode+'<br> Adyen PSP reference: '+pspRef+'</div>';
  }

  var dropinContainer = document.getElementById("dropin-container");
  dropinContainer.innerHTML = textToShow;
}

//https://www.freeformatter.com/javascript-escape.html#ad-output
function showFinalResultDropin(response) {
  var resultCode = JSON.parse(response).resultCode;
  var pspRef = JSON.parse(response).pspReference;

  var textToShow;
  if (resultCode == "Authorised"){
       textToShow = authorisedHTML
  }
  else if (resultCode == "Cancelled"){
       textToShow = errorHTML  }
  else if (resultCode == "Received"){
       textToShow = warningHTML
  }
  else if (resultCode == "Pending"){
       textToShow = warningHTML
  }
  else if (resultCode == "Refused"){
       textToShow = errorHTML
  }
  else {
      textToShow = errorHTML
  }

  var dropinContainer = document.getElementById("dropin-container");
  dropinContainer.innerHTML = textToShow;

  //Show PSP reference
  var resultContainer = document.getElementById("payment-result");
  resultContainer.innerHTML = '<div> Adyen PSP reference: '+pspRef+'</div>';
  //Show whole response
  var responseContainer = document.getElementById("payment-result");
  responseContainer.innerHTML ='<div> RESPONSE'+response+'</div>';
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

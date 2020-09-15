var reviewOrder = `
<base-layout @onPrev="prev" @onNext="next">
<div class="review">
  <div id="review" class="center">
     <h2 >Please Review Your Order And Proceed to Payment</h2>
     <table align="center">
        <tr>
           <td>Shopper Reference</td>
           <td>{{ $store.state.shopperReference }}</td>
        </tr>
        <tr>
           <td>Coffee size</td>
           <td>{{ $store.state.size }}</td>
        </tr>
        <tr>
           <td>Capsule</td>
           <td>{{ $store.state.capsule }}</td>
        </tr>
        <!--<tr>
           <td>Milk Type</td>
           <td>{{ $store.state.milkType }}</td>
           </tr>-->
        <tr>
           <td>Milk Balance</td>
           <td>{{ $store.state.milkBalance }}</td>
        </tr>
        <tr>
           <td>Total Price</td>
           <td id="totalprice"> {{defaultCurrency}}</td>
        </tr>
     </table>
  </div>


    <!--<div id="customCard-container">
     <label>
         <span>Card number:</span>
         <span data-cse="encryptedCardNumber"></span>
     </label>
     <label>
         <span>Expiry date:</span>
         <span data-cse="encryptedExpiryDate"></span>
     </label>
     <label>
         <span>CVV/CVC:</span>
         <span data-cse="encryptedSecurityCod"></span>
     </label>
     </div>-->



     <!--CARD component-->

     <!--<div  id="payment-method">
        <div id="card-container" class="payment-method__container"></div>
        </br>
        <div id="card-number-stored" class="payment-method__container">
          <img class="adyen-checkout__payment-method__image adyen-checkout__image adyen-checkout__image--loaded" src="https://checkoutshopper-test.adyen.com/checkoutshopper/images/logos/visa.svg" alt="Insert your card" aria-label="Insert your card"></span>
          <span class="adyen-checkout__payment-method__name adyen-checkout__payment-method__name--selected" aria-hidden="true">•••• 1111</span>
        </div>
        <div id="stored-card" class="payment-method__container"></div>
     </div>-->



    <!--<div id="payment-method" class="payment-method__container">
        <div id="oney-container"></div>
    </div>
    <div id="payment-method" class="payment-method__container">
          <div  id="mbway-container">  </div>
    </div>-->


    <!--Example of a redirect payment method without existent component-->
    <!--
    <div  id="interac-container">
    <div id="googlepay-container"></div>
    <div id="wechatpayqr-container"></div>
    <div id="oney-container"></div>
    <div  id="mbway-container"></div><a href="https://comprafacil2.hipay.pt/backoffice-test/MBWay/Payments.aspx?statusEnd=&statusStart=&status=&vat=&email=elena.pereztoril%40adyen.com&dateEnd=&dateStart=&phone=&operationId=" target="_blank">Go to HiPay</a>-->

    <!--DROPIN component-->
    <div  id="payment-method" class="payment-method__container">
        <div id="dropin-container" class="payment-method__container"></div>
    </div>
<div id="klarna-payments-container"></div>

  <p class="center"><a id="paybylink" class="inactiveLink" href="" target="_blank" >PBL url will be shown here...please wait</a></p>
  <div id="localStorage"></div>
  <hr style="height:10px">


  <div id="response"></div>
  <img id="ItemPreview" src="">

  <div class="center text-over-video">
  <!--<div class="custom-select-box">-->

  <p>
     CountryCode:
     <select id="countries" name="countries" @change="changeLocation"></select>
  </p>
  <p>
     ShopperLocale:
     <select id="locales" name="locales" @change="changeShopperLocale"></select>
  </p>
  <p>
     DefaultCurrency:
     <select id="currencies" name="currencies" @change="changeCurrency"></select>
  </p>

  </div>

  <!--<p><a id="deletetokens" class='fake-link' @click="disableShopperToken">Delete all Tokens for {{defaultShopperReference}} ⚠️</a></p>
  <p><a id="recurringdetails" class='fake-link' @click="listrecurring">List stored payment data for {{defaultShopperReference}}</a></p>-->
  <p><a id="localStorageclear" class='fake-link' @click="localStorage.clear()">Clear localStorage ❌</a></p>

</div>
</base-layout>
`

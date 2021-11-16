var checkout = `
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
           <td>Size</td>
           <td>{{ $store.state.size }}</td>
        </tr>
        <tr>
           <td>Model</td>
           <td>{{ $store.state.capsule }}</td>
        </tr>
        <tr>
           <td>Total Price</td>
           <td id="totalprice"> {{defaultCurrency}}</td>
        </tr>
     </table>
  </div>

    <!--DROPIN component-->
    <div  id="payment-method" class="payment-method__container ">
        <div id="dropin-container" class="payment-method__container"></div>
    </div>


  <div class="center">
    <hr style="height:5px">
    <a id="paybylink" class="inactiveLink" href="" target="_blank" >PBL url will be shown here...please wait</a>
    </br>
    <a style="height:5px">Scan & Pay:</a>
    <p id="qrcode" ></p>
  </div>


  <canvas id="canvas" width="255" height="255">
      This text is displayed if your browser
      does not support HTML5 Canvas.
  </canvas>

  <!--<img id="signature" class="center" src="data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUA
    AAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO
        9TXL0Y4OHwAAAABJRU5ErkJggg==" alt="POS Signature" />-->


  <div id="localStorage"></div>
  <hr style="height:10px">


  <div id="response"></div>
  <img id="ItemPreview" src="">

  <div class="center text-over-video">
  <!--<div class="custom-select-box">-->

  <p>
     CountryCode:
     <select id="countries" name="countries" @change="changeLocation();location.reload();"></select>
  </p>
  <p>
     ShopperLocale:
     <select id="locales" name="locales" @change="changeShopperLocale();location.reload();"></select>
  </p>
  <p>
     DefaultCurrency:
     <select id="currencies" name="currencies" @change="changeCurrency();location.reload();"></select>
  </p>

  </div>

  <!--<p><a id="deletetokens" class='fake-link' @click="disableShopperToken">Delete all Tokens for {{defaultShopperReference}} ⚠️</a></p>
  <p><a id="recurringdetails" class='fake-link' @click="listrecurring">List stored payment data for {{defaultShopperReference}}</a></p>-->
  <p><a id="localStorageclear" class='fake-link' @click="localStorage.clear()">Clear localStorage ❌</a></p>

</div>
</base-layout>
`

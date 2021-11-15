var payLater = `
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

  <div id="localStorage"></div>
  <hr style="height:10px">


  <div id="response"></div>
  <img id="ItemPreview" src="">

  <div class="center text-over-video">
  <!--<div class="custom-select-box">-->

  </div>

  <!--<p><a id="deletetokens" class='fake-link' @click="disableShopperToken">Delete all Tokens for {{defaultShopperReference}} ⚠️</a></p>
  <p><a id="recurringdetails" class='fake-link' @click="listrecurring">List stored payment data for {{defaultShopperReference}}</a></p>-->
  <p><a id="localStorageclear" class='fake-link' @click="localStorage.clear()">Clear localStorage ❌</a></p>

</div>
</base-layout>
`

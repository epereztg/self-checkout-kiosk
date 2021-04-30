var sandbox = `
<base-layout @onPrev="prev" @onNext="next">

<button @click="prettyPrint()">Pretty Print</button>
<div class="sandbox">
    <div id="sandbox" class="left">

       <h2>Please Review Your Order And Proceed to Payment</h2>
       <h3>Your request will be send to https://checkout-test.adyen.com/v66/payments</h3>

      <label for="requestToPayments">Request to /payments : </label>
      <textarea id="requestToPayments" placeholder="Insert your request here if you want to test" cols=50 rows=10><!--100, 20->
      </textarea>
      <!--<div id="response"></div>-->

      <label for="responseFromPayments">Response from /payments : </label>
      <textarea id="responseFromPayments" cols=50 rows=5><!--100, 20->
      </textarea>

      <label for="requestToPaymentDetails">Request to /payment/details : </label>
      <textarea id="requestToPaymentDetails" cols=50 rows=5><!--100, 20->
      </textarea>

      <label for="responseFromPaymentDetails">Response from /payment/details : </label>
      <textarea id="responseFromPaymentDetails" cols=50 rows=5><!--100, 20->
      </textarea>
      
    </div>


    <div id="sandbox" class="right">
      <!--DROPIN component-->
      <div id="payment-method" class="payment-method__container">
          <div id="dropin-container" class="payment-method__container"></div>
      </div>
    </div>

</div>





</base-layout>
`

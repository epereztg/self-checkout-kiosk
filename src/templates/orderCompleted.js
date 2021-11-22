var orderCompleted = `
<base-layout @onPrev="prev" @onNext="next">
<div class="center text-over-video">
   <p>Thanks for your order!</p>
</div>

<!--DROPIN component-->
<div  id="payment-method" class="payment-method__container ">
    <div id="dropin-container" class="payment-method__container"></div>
</div>

<p class="center" id="payment-result"></p>
<p class="center" id="payment-response"></p>

</base-layout>
`

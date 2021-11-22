var selectTerminal = `
<base-layout @onPrev="prev" @onNext="next">
<div class="center text-over-video">
   <p>Select your terminal</p>
</div>
<div class="model">
<div class="b" v-for="(choice, key) in terminals" @click="addToCart(choice);next()" >
   <a style="font-size:50px;color:white" href="#">{{choice}}</a><br />
</div>
</div>



<div v-if="!terminals.length">There are no connnected terminals in your Store.</div>
<div v-else class="b" v-for="(choice, key) in terminals" @click="addToCart(choice);next()" >
   <a style="font-size:50px;color:white" href="#">{{choice}}</a><br />
</div>


</base-layout>
`

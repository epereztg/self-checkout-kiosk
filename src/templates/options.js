var options = `
<base-layout @onPrev="prev" @onNext="next">
<div class="options">
  <div class="b" v-for="(choice, key) in choices" @click="addToCart(choice.type);next()" v-bind:class="[choice.text]">
     <div class="icon">
        <i class="fal" v-bind:class="choice.icon"></i>
     </div>
     <span>{{choice.text}}</span>
  </div>
</div>
</base-layout>
`

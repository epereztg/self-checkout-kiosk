var home = `<base-layout @onPrev="prev" @onNext="next">
<div class="center text-over-video">
   <p>Welcome!</p>
   <p>Select the flow you want to try out</p>
</div>

<div class="home">
  <div class="b" v-for="(choice, key) in choices" @click="addToCart(choice.text);next()" v-bind:class="[choice.text]">
     <div class="icon">
        <i class="fal" v-bind:class="choice.icon"></i>
     </div>
     </br>
     <span href={{choice.path}}>{{choice.text}}</span>
  </div>
</div>
</base-layout>
`;

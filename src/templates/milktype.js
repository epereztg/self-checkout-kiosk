var milktype = `<base-layout @onPrev="prev" @onNext="next">
   <div class="milktype">
      <div class="choices box">
         <div class="b" v-for="(choice, key) in choices" @click="addToCart(choice.text);next()" v-bind:class="[choice.text]">
            <div class="icon">
               <i class="fal" v-bind:class="choice.icon"></i>
            </div>
            <span>{{choice.text}}</span>
         </div>
      </div>
   </div>
</base-layout>`

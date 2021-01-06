var home = `<base-layout @onPrev="prev" @onNext="next">
<div class="home">
  <video playsinline autoplay muted loop preload="auto">
     poster="./img/BackgroundCoffee.png"
     <source src="./img/cup.mp4" type="video/mp4">
  </video>
  <div class="center text-over-video">
     <p>Ready to order a coffee?</p>
  </div>

  <div @click="next()" class="center text-over-video">
     <i class="fal fa-coffee fa-5x"></i>
     <a href="http://localhost:3000/#/kioskHome">I want to test in the Sandbox</a>
  </div>

  <div @click="next()" class="center text-over-video">
     <i class="fal fa-coffee fa-5x"></i>
     <a href="http://localhost:3000/#/kioskHome">I want to see a Self Checkout Kiosk demo</a>
  </div>
</div>
</base-layout>
`;

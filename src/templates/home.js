var home = `<base-layout @onPrev="prev" @onNext="next">
<div class="home">
  <video playsinline autoplay muted loop preload="auto">
     poster="./img/BackgroundCoffee.png"
     <source src="./img/cup.mp4" type="video/mp4">
  </video>
  <div @click="next()" class="center text-over-video">
     <i class="fal fa-coffee fa-5x"></i>
     <p>Ready to order a coffee?   <i class="far fa-hand-point-up"></i></p>

  </div>
  <div class="center text-over-video">
     <p>
        ShopperReferenceX: <span id="shopperReference" style="font-size: 38px;font-weight: bold;" contenteditable="true">{{ defaultShopperReference }}</span>
        <i class="fa fa-pencil"></i>
     </p>
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

     <a href="https://github.com/epereztg/self-kiosk-adyen-dropin" class="github-url">
          <img border="0" alt="github" src="./img/GitHub-Mark-Light-64px.png" >
     </a>

  </div>
</div>
</base-layout>
`;

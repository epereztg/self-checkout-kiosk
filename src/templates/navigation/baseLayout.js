var baseLayout = `
<div class="contain">
<header>
  <transition name="slide-fade" mode="out-in">
     <h1 >{{$route.meta.pageTitle}}</h1>
  </transition>
  <button class="back"
     v-show='!$NavigationHelper.atStart(this.$route.path) && this.$route.path!= "/orderCompleted" '
     @click="prev">Back</button>
  <p><a @click="clearCache"">Clean cache & reload</a></p>
</header>
<main>
  <slot></slot>
</main>
<footer>
  <page-nav @onPrev="$emit('onPrev')" @onNext="$emit('onNext')" :nextDisabled="nextDisabled" />
</footer>
</div>
`

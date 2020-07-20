var pageNav = `
<div class="field is-grouped is-pulled-right">
  <div class="control">
    <button
       v-show='!$NavigationHelper.atStart(this.$route.path) && this.$route.path!= "/orderCompleted" '
       @click="prev" class="button">{{ $NavigationHelper.prev(this.$route.path)== "/milkType" || this.$route.path== "/review" || this.$route.path== "/payment" ? 'Cancel Order'
    : 'Prev'}}</button>
    <button
       v-show='$NavigationHelper.atStart(this.$route.path) || this.$route.path== "/review" || this.$route.path== "/orderCompleted"'
       :disabled="nextDisabled"
       @click="next" class="button is-primary">{{ this.$route.path== "/review"? 'POS payment'
    : $NavigationHelper.atStart(this.$route.path) ? 'Start!'
    : this.$route.path== "/orderCompleted"? 'New Order'
    : 'Next'}}</button>
  </div>
</div>
`

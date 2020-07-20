var backButton = `
<div class="field is-grouped is-pulled-right">
<div class="control">
  <button
     v-show='!$NavigationHelper.atStart(this.$route.path)'
     @click="prev" class="button">Back</button>
</div>
</div>
`

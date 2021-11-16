var payment = `
<base-layout @onPrev="prev" @onNext="next">
<!--
<table align="center">

  <tr>
     <td>Size</td>
     <td>{{ $store.state.size }}</td>
  </tr>
  <tr>
     <td>Model</td>
     <td>{{ $store.state.capsule }}</td>
  </tr>
</table>
-->


<div class="review center">
  <big style="font-size:400px;">{{defaultAmount/100}} €</big>
  <h2>Please pay on the terminal with your card!</h2>
  <h1>↘↘↘↘↘↘↘</h1>
</div>
</base-layout>
`

var payment = `
<base-layout @onPrev="prev" @onNext="next">
<!--
<table align="center">

  <tr>
     <td>Coffee size</td>
     <td>{{ $store.state.size }}</td>
  </tr>
  <tr>
     <td>Capsule</td>
     <td>{{ $store.state.capsule }}</td>
  </tr>
  <tr>
     <td>Milk Type</td>
     <td>{{ $store.state.milkType }}</td>
  </tr>
  <tr>
     <td>Milk Balance</td>
     <td>{{ $store.state.milkBalance }}</td>
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

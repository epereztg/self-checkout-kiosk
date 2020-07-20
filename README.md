# Coffee kiosk adyen dropin

This is a simple demo of a self service coffee kiosk using adyen dropin checkout.

![Kiosk initial screen](screenshot1.png)

![Kiosk checkout](screenshot2.png)

> [Getting Started](https://docs.adyen.com/checkout/)

## Drop-in

Drop-in is our all-in-one UI solution that you can add on your payments form so you can start accepting transactions for key payment methods using a single front-end implementation.

The [Drop-in](https://docs.adyen.com/checkout/drop-in-web/) handles the presentation of available payment methods and the subsequent entry of a customer's payment details. It is initialized with the response of [`/paymentMethods`][apiexplorer.paymentmethods], and provides everything you need to make an API call to [`/payments`][apiexplorer.payments] and [`/payments/details`][apiexplorer.paymentsdetails].

> [Drop-in Documentation](https://docs.adyen.com/checkout/drop-in-web/)


## Development environment

Follow these steps to run our development playground:

* Clone [this repository](https://github.com/epereztg/self-kiosk-adyen-dropin) and navigate to the root of the project.
* Create a `.env` file on your project's root folder following the example on `.env.default` and fill in the necessary environment variables.
* Install all dependencies by running either `npm install`.
* Start the development playground by running `npm start`. This will start a local server on [http://localhost:3000](http://localhost:3000).

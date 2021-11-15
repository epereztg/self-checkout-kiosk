<?php
/**
 * Adyen Checkout Example (https://www.adyen.com/)
 * Copyright (c) 2019 Adyen BV (https://www.adyen.com/)
 * /paymentMethods Documentation: https://docs.adyen.com/api-explorer/#/PaymentSetupAndVerificationService/v40/paymentMethods
 */

function initiateTerminalAPI() {
    if (file_get_contents('php://input') != '') {
        $request = json_decode(file_get_contents('php://input'), true);
    } else {
        $request = array();
    }

    $apikey = getenv('CHECKOUT_APIKEY');
    $merchantAccount = getenv('MERCHANT_ACCOUNT');
    //$apikey = getenv('CHECKOUT_APIKEY');
    $url = "https://terminal-api-test.adyen.com/sync";

    $serviceID = rand(5, 99999);
    $date_utc = date('Y-m-d\TH:i:s');

    //$saleToPOIRequest = array_merge($header, $request);
    //$json_data = json_encode($saleToPOIRequest);
    $json_data = json_encode($request);

    // Initiate curl
    $curlAPICall = curl_init();

    // Set to POST
    curl_setopt($curlAPICall, CURLOPT_CUSTOMREQUEST, "POST");

    // Will return the response, if false it print the response
    curl_setopt($curlAPICall, CURLOPT_RETURNTRANSFER, true);

    // Add JSON message
    curl_setopt($curlAPICall, CURLOPT_POSTFIELDS, $json_data);

    // Set the url
    curl_setopt($curlAPICall, CURLOPT_URL, $url);

    // Api key
    curl_setopt($curlAPICall, CURLOPT_HTTPHEADER,
        array(
            "X-Api-Key: " . $apikey,
            "Content-Type: application/json",
            "Content-Length: " . strlen($json_data)
        )
    );
    // Execute
    $result = curl_exec($curlAPICall);

    // Error Check
    if ($result === false){
      throw new Exception(curl_error($curlAPICall), curl_errno($curlAPICall));
    }

    // Closing
    curl_close($curlAPICall);

    // This file returns a JSON object
    return json_encode($result);
}

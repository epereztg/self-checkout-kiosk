<?php
/**
 * Adyen Checkout Example (https://www.adyen.com/)
 * Copyright (c) 2019 Adyen BV (https://www.adyen.com/)
 * /paymentMethods Documentation: https://docs.adyen.com/api-explorer/#/PaymentSetupAndVerificationService/v40/paymentMethods
 */

/**
 * Retrieves payment methods
 * from your merchant account
 */
//function getPaymentMethods() {
function initiateTerminalAPI() {
    if (file_get_contents('php://input') != '') {
        $request = json_decode(file_get_contents('php://input'), true);
    } else {
        $request = array();
    }

    $apikey = getenv('CHECKOUT_APIKEY');
    $merchantAccount = getenv('MERCHANT_ACCOUNT');
    //$apikey = getenv('CHECKOUT_APIKEY');
    $apikey = 'AQEyhmfxJ4nNahZBw0m/n3Q5qf3VaY9UCJ1+XWZe9W27jmlZioAYf+2FreEhmT7Cir0XxJkQwV1bDb7kfNy1WIxIIkxgBw==-XTmw1r1ZnD/6UzAw1cJNMD2rAamgo6u8VBkEsQtmSHU=-NGN65Cs8e2urFAvR';
    $merchantAccount = 'ElenaPerezToril';//getenv('MERCHANT_ACCOUNT');
    $url = "https://terminal-api-test.adyen.com/sync";

    $serviceID = rand(5, 99999);
    $date_utc = date('Y-m-d\TH:i:s');

    $data = [

      'SaleToPOIRequest'=> [
          'MessageHeader'=> [
              'ProtocolVersion'=> '3.0',
              'MessageClass'=> 'Service',
              'MessageCategory'=> 'Payment',
              'MessageType'=> 'Request',
              'SaleID'=> 'BTQAMS-10901',
              'ServiceID'=> strval($serviceID),
              'POIID'=>'V400m-346715581'
          ],
          'PaymentRequest'=> [
              'SaleData'=> [
                  'SaleTransactionID'=> [
                      'TransactionID'=> '503000008996',
                      'TimeStamp'=> strval($date_utc),//'2021-05-18T13:45:54.637Z'
                  ],
                  'SaleToAcquirerData'=> 'eyJzaG9wcGVyUmVmZXJlbmNlIjoiODMzOTA5NzIxIiwicmVjdXJyaW5nQ29udHJhY3QiOiJPTkVDTElDSyxSRUNVUlJJTkcifQ==',
                  'TokenRequestedType'=> 'Customer'
              ],
              'PaymentTransaction'=> [
                  'AmountsReq'=> [
                      'Currency'=> 'EUR',
                      'RequestedAmount'=> 145.00
                  ]
              ]
          ]
      ]

];

    // $data = [
    //     'merchantAccount' => $merchantAccount,
    //     'countryCode' => $countryCode,
    //     'amount' => [
    //         'currency' => $currency,
    //         'value' => $value
    //     ],
    //     'shopperReference' => $shopperReference
    // ];

    // Convert data to JSON
    //$json_data = json_encode(array_merge($data, "$request"));
    // Convert data to JSON
    $json_data = json_encode($data);

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

//$result;
}

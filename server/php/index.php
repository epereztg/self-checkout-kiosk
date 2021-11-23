<?php
/**
 * Adyen Checkout Example (https://www.adyen.com/)
 * Copyright (c) 2019 Adyen BV (https://www.adyen.com/)
 */

require('api/paymentMethods.php');
require('api/payments.php');
require('api/originKeys.php');
require('api/paymentsDetails.php');
require('api/paymentLinks.php');
require('api/fallbackthreedone.php');
require('api/terminalAPI.php');
require('api/getTerminals.php');
require('api/getTerminalDetails.php');
require('api/connectedTerminals.php');
//require('api/clientKey.php');


// Basic routing
$request_uri = explode('?', $_SERVER['REQUEST_URI'], 2);

switch($request_uri[0]) {
    // /paymentMethods
    case '/paymentMethods':
        header('Content-Type: application/json');
        //echo getPaymentMethods();
        echo getPaymentMethods("EUR", 3000, "ES","paybylink_shopperreference");
        break;

    // /payments
    case '/payments':
        header('Content-Type: application/json');
        echo initiatePayment();
        break;

    case '/payments/details':
        header('Content-Type: application/json');
        echo initiatePaymentDetails();
        break;

    // /originKeys
    case '/originKeys':
        header('Content-Type: application/json');
        echo getOriginKey();
        break;

    case '/paymentLinks':
        header('Content-Type: application/json');
        echo initiatePaymentLinks();
        break;

    case '/fallbackthreedone':
        header('Content-Type: application/json');
        $myresult = fallbackthreedone($request_uri[0]);
        break;

    case '/terminalAPI':
        header('Content-Type: application/json');
        echo initiateTerminalAPI();
        break;

    case '/getTerminals':
        header('Content-Type: application/json');
        echo getTerminals();
        break;

    case '/getTerminalDetails':
        header('Content-Type: application/json');
        echo getTerminalDetails();
        break;

    case '/connectedTerminals':
        header('Content-Type: application/json');
        echo connectedTerminals();
        break;

    case '/clientKey':
        header('Content-Type: application/json');
        echo clientKey();
        break;

    default:
        return false;

}

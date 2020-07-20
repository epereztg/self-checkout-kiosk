 <?php

 echo "testing: ";


$protocol =  ((!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off') || $_SERVER['SERVER_PORT'] == 443 ) ? "https://" : "http://";
echo "Showing the protocol: ";

echo $_SERVER['SERVER_PORT'];

?>

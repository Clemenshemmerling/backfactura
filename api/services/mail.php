<?php
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

$to = 'chemmerling@grupomacro.com';
$mensaje = $_POST['mensaje'];
$headers = "From: soporte@grupomacro.com" . "\r\n" .
"CC: aestrada@grupomacro.com";

mail($to, "Factura fel", $mensaje, $headers);
?>
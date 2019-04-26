<?php
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Origin: *");
include('../config/o4b.php');

$compania = $_POST['compania'];
$numero = $_POST['numero'];
$serie = $_POST['serie'];
$detalle = $_POST['detalle'];
$tipo_doc = $_POST['tipo_doc'];
$fecha = $_POST['fecha'];
$persona = $_POST['persona'];
$tipo_pago = $_POST['tipo_pago'];
$moneda = $_POST['moneda'];
$uid = $_POST['uid'];

echo $sql = "INSERT INTO R2000.DETALLE_FACTURA_DET (COD_COMPANIA, COD_FACTURA, COD_SERIE, COD_TIPO_DOCU, FEC_FACTURA, COD_PERSONA, COD_TIPO_PAGO, COD_MONEDA, COD_TIPO_ORDEN, NUM_ORDEN, COD_EXENTA, POR_RETENCION, DES_FACTURA, COD_ESTADO, COD_IMPRESION, COD_LIBRO_VENTAS, NOM_USUARIO, COD_FISCO1) 
        VALUES ('$compania', '$numero', '$serie', $tipo_doc, '$fecha', '$persona', '$tipo_pago', '$moneda', '2', '1', '0', '0', '$detalle', 'A', 'S', 'S', 'CHEMMERLING', '$uid')";
EjecutarOCI_SLC($sql);        
?>
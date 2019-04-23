<?php
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Origin: *");
include('../config/o4b.php');

$db = 'GM2000';

$compania = $_POST['compania'];
$numero = $_POST['numero'];
$serie = $_POST['serie'];

$detalle = $_POST['detalle'];


$sql = "INSERT INTO R2000.DETALLE_FACTURA_DET (COD_COMPANIA, COD_FACTURA, COD_SERIE, COD_TIPO_DOCU, COD_DETALLE, CAN_DETALLE, COD_UNIDAD, MON_BRUTO, POR_DESC, POR_IMP, MON_NETO) 
        VALUES ('$compania', '$numero', '$serie', '1', '$detalle', '5', '1', '2678.57143', '0', '12', '3000')";
EjecutarOCI_SLC($sql, $db);        
?>
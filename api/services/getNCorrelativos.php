<?php
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Origin: *");
include('../config/logConexion.php');
$con = conexion();

$resultado = $con->query("SELECT * FROM  notacorrelativo");

$datos = array();

while ($row = $resultado->fetch_assoc()) {

    $datos[] = $row;
 
}

echo json_encode($datos);   
?>
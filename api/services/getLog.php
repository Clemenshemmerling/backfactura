<?php
include('../config/logConexion.php');
$con = conexion();

$resultado = $con->query("SELECT * FROM  log");

$datos = array();

while ($row = $resultado->fetch_assoc()) {

    $datos[] = $row;
 
}

echo json_encode($datos);   
?>
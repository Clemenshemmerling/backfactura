<?php
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Origin: *");
include('../config/logConexion.php');
$con = conexion();
$usuario = $_POST['usuario'];
$tipo = $_POST['tipo'];
$doc = $_POST['doc'];
$precio = $_POST['precio'];
$sql = "INSERT INTO log (usuario, tipo_doc, doc, precio_total) VALUES ('$usuario', '$tipo', '$doc', '$precio')";

if (mysqli_query($con, $sql)) {
    echo "Factura guardada correctamente";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($con);
}

?>
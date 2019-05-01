<?php
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Origin: *");
include('../config/logConexion.php');
$con = conexion();

$numero = $_POST['numero'];

$sql = "UPDATE correlativo  SET rensersa = $numero WHERE id = 1";

if (mysqli_query($con, $sql)) {
    echo "Factura guardada correctamente";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($con);
}

?>
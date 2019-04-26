<?php
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Origin: *");
include('../config/logConexion.php');
$con = conexion();

$numero = $_POST['numero'];
$id = 1;

$sql = "UPDATE correlativo SET conservasa='$numero' WHERE id=$id";

if (mysqli_query($con, $sql)) {
    echo "Factura guardada correctamente";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($con);
}
?>
<?php
function conexion()
{ 

global $DB_HOST; 
global $DB_USER; 
global $DB_PASSWORD; 
global $DB_NAME; 

$DB_HOST = 'innovagm.cmvdsechftku.us-east-1.rds.amazonaws.com';
$DB_USER = 'regfeluser';
$DB_PASSWORD = 'M4cr0+-2019';
$DB_NAME = 'regfel';

$mysqli = @new mysqli($DB_HOST, $DB_USER, $DB_PASSWORD, $DB_NAME); 
    if (mysqli_connect_errno()) {
        printf(error_db_connect());
        exit();
    }
    return $mysqli;
}

?>
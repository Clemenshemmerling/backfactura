<?php
function Conexion_OCI($db)
{
    switch($db){
      case "MACROIT":   $port="1521";$ip="172.31.52.112";break;
      case  "GM2000":   $port="1522";$ip="172.31.52.112";break;
    }
    $usr='CHEMMERLING';$clv='MACRO2019';
    $con = ocinlogon($usr,$clv,"(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=$ip)(PORT=".$port."))(CONNECT_DATA=(SID=".$db.")))") or die ("db Error de Conexion db");
    return $con;
}
function EjecutarOCI_SLC($SQL,$BD)
{
    $con = Conexion_OCI($BD) or die ("Error de conexion.");
    $Resultado = oci_parse($con,$SQL);
    oci_execute($Resultado);
    oci_close($con);
    return $Resultado;
}
?>
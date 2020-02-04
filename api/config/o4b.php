<?php
function Conexion_OCI()
{
    $usr='CHEMMERLING';$clv='MACRO2020';
    $con = ocinlogon($usr,$clv,"(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=172.31.52.112)(PORT=1522))(CONNECT_DATA=(SID=gm2000)))") or die ("db Error de Conexion db");
    return $con;
}
function EjecutarOCI_SLC($SQL)
{
    $con = Conexion_OCI() or die ("Error de conexion.");
    $Resultado = oci_parse($con,$SQL);
    oci_execute($Resultado);
    oci_close($con);
    return $Resultado;
}
?>
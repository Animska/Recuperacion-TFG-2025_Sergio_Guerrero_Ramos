<?php
include_once('../PHP/ACCESODB.php');

$codigo = isset($_GET['codigo']) ? $_GET['codigo'] : 'Codigo no especificado';

if(isset($_GET['codigo'])){
    echo BD::getProductoID($codigo);
}
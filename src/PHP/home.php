<?php
include_once('../PHP/ACCESODB.php');

if(isset($_POST['pag'])){
    echo BD::get3Productos();
}

if(isset($_POST['pag1'])){
    echo BD::get3ProductosUnder();
}
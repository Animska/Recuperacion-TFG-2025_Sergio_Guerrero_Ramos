<?php
include_once('../PHP/ACCESODB.php');

if(isset($_POST['pag'])){
    echo BD::getProductos();
}


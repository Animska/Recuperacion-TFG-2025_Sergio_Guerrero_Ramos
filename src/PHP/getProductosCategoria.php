<?php

include_once('../PHP/ACCESODB.php');

if(isset($_POST['theme'])){
    $categoria = $_POST['theme'];
    echo BD::getProductosCat($categoria);
}


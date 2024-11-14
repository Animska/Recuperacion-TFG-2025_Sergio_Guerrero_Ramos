<?php
include_once('../PHP/ACCESODB.php');



session_start();
if (!isset($_SESSION['carrito'])) {
    $_SESSION['carrito'] = [];
}

if(isset($_POST['codigo'])){
    $producto = BD::getProductoID($_POST['codigo']);

    if (isset($_SESSION['carrito'][$producto])) {
        $_SESSION['carrito'][$producto]['cantidad'] += 1;
    } else {
        $_SESSION['carrito'][$producto] = [
            'cantidad' => 1          
        ];
    }
}

if(isset($_POST['borrar'])){
    session_destroy();
    return;
}

echo json_encode($_SESSION['carrito']);












?>
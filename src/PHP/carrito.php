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

if(isset($_POST['codigoM']) && isset($_POST['menos'])) {
    $producto = BD::getProductoID($_POST['codigoM']);

    if (isset($_SESSION['carrito'][$producto])) {
        $_SESSION['carrito'][$producto]['cantidad'] -= 1;

        // Si la cantidad llega a cero o menos, eliminamos el producto del carrito
        if ($_SESSION['carrito'][$producto]['cantidad'] <= 0) {
            unset($_SESSION['carrito'][$producto]);
        }
    }
}


if(isset($_POST['idUsuario'])){
    if(empty($_SESSION['carrito'])){
        return;
    }

    $idUsuario = $_POST['idUsuario'];
    $precioTotal = $_POST['precioTotal'];
    $fechaActual = date('Y-m-d');

    $pedidoId=BD::insertPedido($precioTotal,$fechaActual,$idUsuario);

    foreach ($_SESSION['carrito'] as $productoJson => $detalles) {
        $producto = json_decode($productoJson, true);
        $productoID = $producto['ID_PRODUCTO'];
        $cantidad = $detalles['cantidad'];
    
        BD::insertPedidoDetalle($pedidoId, $productoID, $cantidad);
    }


    

    session_destroy();
}

echo json_encode($_SESSION['carrito']);

?>
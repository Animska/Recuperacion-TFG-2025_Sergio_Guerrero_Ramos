<?php
include_once('../PHP/ACCESODB.php');

if(isset($_POST['idUser'])){
    $productosWishlist = BD::getProductosDeWishlist($_POST['idUser']);
    if(isset($_POST['pag'])){
        $productosDetalles = [];
        foreach ($productosWishlist as $idProducto) {
            // Obtiene el objeto del producto usando su ID
            $productoDetalle = BD::getProductoID($idProducto);
            // Añade el objeto del producto al array de detalles
            $productosDetalles[] = json_decode($productoDetalle, true);
            
        }
        echo json_encode($productosDetalles);
        return;
    }
    

    
    echo json_encode($productosWishlist);
}



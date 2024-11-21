<?php
include_once('../PHP/ACCESODB.php');


if(isset($_POST['codigo']) && isset($_POST['wishlist'])&& isset($_POST['idUsuario'])){
    $wishlist = BD::getWishlistUser($_POST['idUsuario']);
    
    if($_POST['wishlist']=='add'){
        $resultado=BD::insertWishlistDetalle($wishlist[0]['ID_Wishlist'],$_POST['codigo']);
        echo $resultado;
        return;
    }

    if($_POST['wishlist']=='remove'){
        $resultado = BD::deleteWishlistDetalle($_POST['codigo'],$wishlist[0]['ID_Wishlist']);
        echo $resultado;
        return;
    }
    
}


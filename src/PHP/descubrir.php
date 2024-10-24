<?php
include_once('../PHP/ACCESODB.php');

if (isset($_POST['producto'])) {
    if ($_POST['producto'] == 'todo') {
        echo BD::getProductos(); // Obtener todos los productos
    } elseif ($_POST['producto'] == 'minifigura') {
        echo BD::getMinifiguras(); // Obtener minifiguras
    }
}

?>

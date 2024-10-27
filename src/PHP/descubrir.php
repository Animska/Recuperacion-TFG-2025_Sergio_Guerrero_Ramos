<?php
include_once('../PHP/ACCESODB.php');

// Verificar si el parámetro 'producto' está presente
if (isset($_POST['producto'])) {
    $producto = $_POST['producto'];

    // Dependiendo del valor del parámetro 'producto', se llaman a diferentes funciones
    if ($producto == 'todo') {
        echo BD::getProductos(); // Obtener todos los productos
    } elseif ($producto == 'minifig' || $producto == 'set') {
        echo BD::getProductosTipo($producto); // Obtener minifiguras o sets según el tipo
    } else {
        // Si el valor de 'producto' no coincide con ninguno de los valores esperados
        echo json_encode(['error' => 'Tipo de producto no válido.']);
    }
}elseif(isset($_POST['theme'])){
    $categoria = $_POST['theme'];
    echo BD::getProductosCat($categoria);
}else{
    echo json_encode('error');
}




?>

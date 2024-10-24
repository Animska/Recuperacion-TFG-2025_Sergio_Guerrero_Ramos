<?php
include_once('../PHP/ACCESODB.php');

$response = array(); // Inicializa un array para la respuesta

if(isset($_POST['producto'])) {
    if($_POST['producto'] == 'todo') {
        $productos = BD::getProductos(); // Obtener los productos
        if ($productos) {
            $response = $productos; //asegurarse de que sea un array de productos
        } else {
            $response = array('error' => 'No se encontraron productos.'); // Mensaje de error
        }
    } elseif($_POST['producto'] == 'minifigura') {
        $minifiguras = BD::getMinifiguras(); // Obtener las minifiguras
        if ($minifiguras) {
            $response = $minifiguras; //asegurarse de que sea un array de minifiguras
        } else {
            $response = array('error' => 'No se encontraron minifiguras.'); // Mensaje de error
        }
    } else {
        $response = array('error' => 'Parámetro producto no válido.'); // Parámetro no válido
    }
} else {
    $response = array('error' => 'No se envió el parámetro producto.'); // No se envió parámetro
}

echo json_encode($response); // Asegúrarse de que aquí se esté enviando un JSON válido

if(isset($_POST['theme'])){
    $categoria = $_POST['theme'];
    echo BD::getProductosCat($categoria);
}

?>

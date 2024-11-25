<?php
include_once('../PHP/ACCESODB.php');

if (isset($_POST['dato'])) {
    $dato = $_POST['dato'];

    // Dependiendo del valor del parámetro 'producto', se llaman a diferentes funciones
    if ($dato == 'productos') {
        echo BD::getProductos(); // Obtener todos los productos
        return;
    };
    if ($dato == 'usuarios') {
        echo BD::getUsers(); // Obtener minifiguras o sets según el tipo
        return;
    };
}

if(isset($_POST['accionProducto'])){
    if(isset($_POST['idProducto'])){
        switch ($_POST['accionProducto']) {
            case 'borrar':
                echo BD::deleteProducto($_POST['idProducto']);
                return;
        
            case 'editar':
                $formData = $_POST['formData'];
                parse_str($formData, $formDataArray);
        // Ahora puedes acceder a los datos del formulario
                $nombre = $formDataArray['nombre'];
                $tema = $formDataArray['tema'];
                $num_piezas = $formDataArray['num_piezas'];
                $precio = $formDataArray['precio'];
                $tipo = $formDataArray['tipo'];
    
                echo BD::editProducto($nombre,$tema,$num_piezas,$precio,$tipo,$_POST['idProducto']);
                return;
        
            case 'getDatos':
                echo BD::getProductoID($_POST['idProducto']);
                return;
        
            default:
                echo "Acción no reconocida";
                break;
        }
    }

        if($_POST['accionProducto'] == 'insertar') {
            if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] == 0) {
                $uploadDir = '../IMAGES/productos/';
                $uploadFile = $uploadDir . basename($_FILES['imagen']['name']);
                
                if (!move_uploaded_file($_FILES['imagen']['tmp_name'], $uploadFile)) {
                    echo json_encode(['error' => 'Error al cargar la imagen']);
                    return;
                }
            }
        
            $id_producto = $_POST['ID_PRODUCTO'];
            $nombre = $_POST['nombre'];
            $tema = $_POST['tema'];
            $num_piezas = $_POST['num_piezas'];
            $precio = $_POST['precio'];
            $tipo = $_POST['tipo'];
        
            // Insertar el producto en la base de datos
            echo BD::insertProducto($id_producto, $nombre, $tema, $num_piezas, $precio, $tipo);
            return;
        }
        
        
    }
    


if(isset($_POST['accionUsuario'])){
    if(isset($_POST['idUsuario'])){
        switch ($_POST['accionUsuario']) {
            case 'borrar':
                echo BD::deleteUser($_POST['idUsuario']);
                return;
        
            case 'editar':
                $formData = $_POST['formData'];
                parse_str($formData, $formDataArray);
    
        // Ahora puedes acceder a los datos del formulario
                $username = $formDataArray['username'];
                $password = $formDataArray['password'];
                $nombre = $formDataArray['nombre'];
                $apellidos = $formDataArray['apellidos'];
                $poblacion = $formDataArray['poblacion'];
                $provincia = $formDataArray['provincia'];
                $codigo_postal = $formDataArray['codigo_postal'];
                $direccion = $formDataArray['direccion'];
                $root = isset($formDataArray['root']) ? 1 : 0;
    
    
                echo BD::editUser($username,$password,$root,$nombre,$apellidos,$poblacion,$provincia,$codigo_postal,$direccion,$_POST['idUsuario']);
                return;
        
            case 'getDatos':
                echo BD::getUserID($_POST['idUsuario']);
                return;
        
            default:
                echo "Acción no reconocida";
                break;
        }
    }else{
        $formData = $_POST['formData'];
                parse_str($formData, $formDataArray);
    
        // Ahora puedes acceder a los datos del formulario
                $username = $formDataArray['username'];
                $password = $formDataArray['password'];
                $nombre = $formDataArray['nombre'];
                $apellidos = $formDataArray['apellidos'];
                $poblacion = $formDataArray['poblacion'];
                $provincia = $formDataArray['provincia'];
                $codigo_postal = $formDataArray['codigo_postal'];
                $direccion = $formDataArray['direccion'];
                $root = isset($formDataArray['root']) ? 1 : 0;
                $pfp=rand(1, 10);

                echo BD::insertUser($username,$password,$root,$nombre,$apellidos,$poblacion,$provincia,$codigo_postal,$direccion,$pfp);
                return;
    }
    

}


?>
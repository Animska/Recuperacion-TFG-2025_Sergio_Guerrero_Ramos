<?php

Class BD{
    public static function conexion(){
        try {
            $host = "localhost";
            $username = "root";
            $password = "";
            $database = "proyecto";
            $conn=mysqli_connect($host,$username,$password,$database);
            $conn->set_charset("utf8");
            return $conn;
        } catch(Exception $e) {
            die("Error al realizar la conexión: " . $e->getMessage());
        }   
    }

    public static function getProductos() {
        try {
            $sql="SELECT * FROM productos";
            $conn = self::conexion();
            $stmt = $conn->prepare($sql);
            // Ejecutar la consulta
            $stmt->execute();
            $result = $stmt->get_result();
            if ($result->num_rows > 0) {
                $artistas = $result->fetch_all(MYSQLI_ASSOC); // Usa fetch_all para obtener todos los resultados y transformarlos en un array asociativo
                return json_encode($artistas);
            } else {
                return "0 resultados";
            }
        } catch (Exception $th) {
            throw new Exception("Error al obtener Productos: " . $th->getMessage());
        }finally {
            // Cerrar la declaración preparada y la conexión
            $stmt->close();
            $conn->close();
        }
    }

    public static function getProductosTipo($tipo) {
        try {
            $sql="SELECT * FROM productos WHERE tipo = ?";
            $conn = self::conexion();
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("s", $tipo); // 's' especifica que el parámetro es una cadena (string)
            // Ejecutar la consulta
            $stmt->execute();
            $result = $stmt->get_result();
            if ($result->num_rows > 0) {
                $productos = $result->fetch_all(MYSQLI_ASSOC); // Usa fetch_all para obtener todos los resultados y transformarlos en un array asociativo
                return json_encode($productos);
            } else {
                return "0 resultados";
            }
        } catch (Exception $th) {
            throw new Exception("Error al obtener los productos de esta categoria: " . $th->getMessage());
        }finally {
            // Cerrar la declaración preparada y la conexión
            $stmt->close();
            $conn->close();
        }
    } 
    
    public static function get3Productos() {
        try {
            $sql="SELECT * FROM Productos WHERE tipo = 'set' ORDER BY RAND() LIMIT 3";
            $conn = self::conexion();
            $stmt = $conn->prepare($sql);
            // Ejecutar la consulta
            $stmt->execute();
            $result = $stmt->get_result();
            if ($result->num_rows > 0) {
                $artistas = $result->fetch_all(MYSQLI_ASSOC); // Usa fetch_all para obtener todos los resultados y transformarlos en un array asociativo
                return json_encode($artistas);
            } else {
                return "0 resultados";
            }
        } catch (Exception $th) {
            throw new Exception("Error al obtener Productos: " . $th->getMessage());
        }finally {
            // Cerrar la declaración preparada y la conexión
            $stmt->close();
            $conn->close();
        }
    }

    public static function get3ProductosUnder() {
        try {
            $sql="SELECT * FROM Productos WHERE precio < 30.00 && tipo = 'set' ORDER BY RAND() LIMIT 3;";
            $conn = self::conexion();
            $stmt = $conn->prepare($sql);
            // Ejecutar la consulta
            $stmt->execute();
            $result = $stmt->get_result();
            if ($result->num_rows > 0) {
                $artistas = $result->fetch_all(MYSQLI_ASSOC); // Usa fetch_all para obtener todos los resultados y transformarlos en un array asociativo
                return json_encode($artistas);
            } else {
                return "0 resultados";
            }
        } catch (Exception $th) {
            throw new Exception("Error al obtener Productos: " . $th->getMessage());
        }finally {
            // Cerrar la declaración preparada y la conexión
            $stmt->close();
            $conn->close();
        }
    }

    public static function getProductosCat($categoria) {
        try {
            $sql="SELECT * FROM productos WHERE tema = ?";
            $conn = self::conexion();
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("s", $categoria); // 's' especifica que el parámetro es una cadena (string)
            // Ejecutar la consulta
            $stmt->execute();
            $result = $stmt->get_result();
            if ($result->num_rows > 0) {
                $productos = $result->fetch_all(MYSQLI_ASSOC); // Usa fetch_all para obtener todos los resultados y transformarlos en un array asociativo
                return json_encode($productos);
            } else {
                return "0 resultados";
            }
        } catch (Exception $th) {
            throw new Exception("Error al obtener los productos de esta categoria: " . $th->getMessage());
        }finally {
            // Cerrar la declaración preparada y la conexión
            $stmt->close();
            $conn->close();
        }
    } 

    public static function getProductoID($id) {
        try {
            // Consulta para seleccionar un producto por su código
            $sql = "SELECT * FROM productos WHERE iD_PRODUCTO = ?";
            $conn = self::conexion();
            $stmt = $conn->prepare($sql);
            
            // 's' especifica que el parámetro es una cadena (string)
            $stmt->bind_param("s", $id);
            
            // Ejecutar la consulta
            $stmt->execute();
            $result = $stmt->get_result();
            
            // Verificar si hay resultados
            if ($result->num_rows > 0) {
                // Obtener solo una fila (la primera)
                $producto = $result->fetch_assoc();
                return json_encode($producto);  // Devuelve el producto como JSON
            } else {
                // Si no hay resultados, devolver un JSON indicando esto
                return json_encode(["message" => "0 resultados"]);
            }
        } catch (Exception $th) {
            // Devolver el mensaje de error en formato JSON
            return json_encode(["error" => "Error al obtener el producto: " . $th->getMessage()]);
        } finally {
            // Asegurarse de cerrar la declaración preparada y la conexión
            if (isset($stmt)) {
                $stmt->close();
            }
            if (isset($conn)) {
                $conn->close();
            }
        }
    }
    
    public static function deleteProducto($idProducto) {
        try {
            // Consulta para eliminar un usuario por su ID
            $sql = "DELETE FROM productos WHERE ID_PRODUCTO = ?";
            $conn = self::conexion();
            $stmt = $conn->prepare($sql);
            
            // 's' especifica que el parámetro es una cadena (string)
            $stmt->bind_param("s", $idProducto);
            
            // Ejecutar la consulta
            $stmt->execute();
            
            // Verificar si se eliminó algún registro
            if ($stmt->affected_rows > 0) {
                return json_encode(["message" => "producto eliminado con éxito"]);
            } else {
                return json_encode(["message" => "No se encontró el producto o no se pudo eliminar"]);
            }
        } catch (Exception $th) {
            // Devolver el mensaje de error en formato JSON
            return json_encode(["error" => "Error al eliminar el producto: " . $th->getMessage()]);
        } finally {
            // Asegurarse de cerrar la declaración preparada y la conexión
            if (isset($stmt)) {
                $stmt->close();
            }
            if (isset($conn)) {
                $conn->close();
            }
        }
    }

    public static function editProducto($nombre, $tema, $num_piezas, $precio, $tipo,$ID_PRODUCTO) {
        try {
            $sql = "UPDATE productos SET nombre = ?, tema = ?, num_piezas = ?, precio = ?, tipo = ? WHERE ID_PRODUCTO = ?";
            $conn = self::conexion();
            $stmt = $conn->prepare($sql);
            
            // Vincular parámetros
            $stmt->bind_param("ssidss", $nombre, $tema, $num_piezas, $precio, $tipo, $ID_PRODUCTO);
            
            // Ejecutar la consulta
            $stmt->execute();
            
            if ($stmt->affected_rows > 0) {
                return json_encode(["success" => true, "message" => "Producto actualizado correctamente"]);
            } else {
                return json_encode(["success" => false, "message" => "No se encontró el producto o no se realizaron cambios"]);
            }
        } catch (Exception $th) {
            throw new Exception("Error al editar producto: " . $th->getMessage());
        } finally {
            // Cerrar la declaración preparada y la conexión
            $stmt->close();
            $conn->close();
        }
    }
    

    //USERS
    public static function getUsers() {
        try {
            $sql="SELECT * FROM usuarios";
            $conn = self::conexion();
            $stmt = $conn->prepare($sql);
            // Ejecutar la consulta
            $stmt->execute();
            $result = $stmt->get_result();
            if ($result->num_rows > 0) {
                $usuarios = $result->fetch_all(MYSQLI_ASSOC); // Usa fetch_all para obtener todos los resultados y transformarlos en un array asociativo
                return json_encode($usuarios);
            } else {
                return "0 resultados";
            }
        } catch (Exception $th) {
            throw new Exception("Error al obtener Productos: " . $th->getMessage());
        }finally {
            // Cerrar la declaración preparada y la conexión
            $stmt->close();
            $conn->close();
        }
    }

    public static function getUser($username) {
        try {
            // Consulta para seleccionar un producto por su código
            $sql = "SELECT * FROM usuarios WHERE username = ?";
            $conn = self::conexion();
            $stmt = $conn->prepare($sql);
            
            // 's' especifica que el parámetro es una cadena (string)
            $stmt->bind_param("s", $username);
            
            // Ejecutar la consulta
            $stmt->execute();
            $result = $stmt->get_result();
            
            // Verificar si hay resultados
            if ($result->num_rows > 0) {
                // Obtener solo una fila (la primera)
                $producto = $result->fetch_assoc();
                return json_encode($producto);  // Devuelve el producto como JSON
            } else {
                // Si no hay resultados, devolver un JSON indicando esto
                return json_encode(["message" => "0 resultados"]);
            }
        } catch (Exception $th) {
            // Devolver el mensaje de error en formato JSON
            return json_encode(["error" => "Error al obtener el usuario: " . $th->getMessage()]);
        } finally {
            // Asegurarse de cerrar la declaración preparada y la conexión
            if (isset($stmt)) {
                $stmt->close();
            }
            if (isset($conn)) {
                $conn->close();
            }
        }
    }

    public static function getUserID($idUser) {
        try {
            // Consulta para seleccionar un producto por su código
            $sql = "SELECT * FROM usuarios WHERE ID_USER = ?";
            $conn = self::conexion();
            $stmt = $conn->prepare($sql);
            
            // 's' especifica que el parámetro es una cadena (string)
            $stmt->bind_param("s", $idUser);
            
            // Ejecutar la consulta
            $stmt->execute();
            $result = $stmt->get_result();
            
            // Verificar si hay resultados
            if ($result->num_rows > 0) {
                // Obtener solo una fila (la primera)
                $producto = $result->fetch_assoc();
                return json_encode($producto);  // Devuelve el producto como JSON
            } else {
                // Si no hay resultados, devolver un JSON indicando esto
                return json_encode(["message" => "0 resultados"]);
            }
        } catch (Exception $th) {
            // Devolver el mensaje de error en formato JSON
            return json_encode(["error" => "Error al obtener el usuario: " . $th->getMessage()]);
        } finally {
            // Asegurarse de cerrar la declaración preparada y la conexión
            if (isset($stmt)) {
                $stmt->close();
            }
            if (isset($conn)) {
                $conn->close();
            }
        }
    }

    public static function deleteUser($idUser) {
        try {
            // Consulta para eliminar un usuario por su ID
            $sql = "DELETE FROM usuarios WHERE ID_USER = ?";
            $conn = self::conexion();
            $stmt = $conn->prepare($sql);
            
            // 's' especifica que el parámetro es una cadena (string)
            $stmt->bind_param("s", $idUser);
            
            // Ejecutar la consulta
            $stmt->execute();
            
            // Verificar si se eliminó algún registro
            if ($stmt->affected_rows > 0) {
                return json_encode(["message" => "Usuario eliminado con éxito"]);
            } else {
                return json_encode(["message" => "No se encontró el usuario o no se pudo eliminar"]);
            }
        } catch (Exception $th) {
            // Devolver el mensaje de error en formato JSON
            return json_encode(["error" => "Error al eliminar el usuario: " . $th->getMessage()]);
        } finally {
            // Asegurarse de cerrar la declaración preparada y la conexión
            if (isset($stmt)) {
                $stmt->close();
            }
            if (isset($conn)) {
                $conn->close();
            }
        }
    }
    

    public static function insertUser($username, $password, $root, $nombre, $apellidos, $poblacion, $provincia, $codigo_postal, $direccion, $pfp) {
        try {
            // Consulta SQL para insertar un usuario
            $sql = "INSERT INTO Usuarios (username, password, root, nombre, apellidos, poblacion, provincia, codigo_postal, direccion, pfp) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            $conn = self::conexion();
            $stmt = $conn->prepare($sql);
    
            // Verificar si la sentencia se preparó correctamente
            if (!$stmt) {
                throw new Exception("Error en la preparación de la sentencia: " . $conn->error);
            } 
            // Vincular los parámetros ('s' para string, 'i' para integer)
            $stmt->bind_param("ssisssssss", 
            $username, 
            $password, 
                $root, 
                $nombre, 
                $apellidos, 
                $poblacion, 
                $provincia, 
                $codigo_postal, 
                $direccion, 
                $pfp
            );
    
            // Ejecutar la sentencia
            $resultado = $stmt->execute();
    
            // Verificar si la ejecución fue exitosa
            if ($resultado) {
                return json_encode(["message" => "Usuario insertado correctamente"]);
            } else {
                throw new Exception("Error al ejecutar la sentencia: " . $stmt->error);
            }
    
        } catch (Exception $e) {
            // Devolver el mensaje de error en formato JSON
            return json_encode(["error" => "Error al insertar usuario: " . $e->getMessage()]);
        } finally {
            // Cerrar la declaración y la conexión
            if (isset($stmt)) {
                $stmt->close();
            }
            if (isset($conn)) {
                $conn->close();
            }
        }
    }

    public static function editUser($username, $password, $root, $nombre, $apellidos, $poblacion, $provincia, $codigo_postal, $direccion,$idUsuario) {
        try {
            $sql = "UPDATE usuarios SET username = ?, password = ?, root = ?, nombre = ?, apellidos = ?, poblacion = ?, provincia = ?, codigo_postal = ?, direccion = ? WHERE ID_USER = ?";;
            $conn = self::conexion();
            $stmt = $conn->prepare($sql);
            
            // Vincular parámetros
            $stmt->bind_param("ssissssssi", $username, $password, $root, $nombre, $apellidos, $poblacion, $provincia, $codigo_postal, $direccion,$idUsuario);
            
            // Ejecutar la consulta
            $stmt->execute();
            
            if ($stmt->affected_rows > 0) {
                return json_encode(["success" => true, "message" => "Usuario actualizado correctamente"]);
            } else {
                return json_encode(["success" => false, "message" => "No se encontró el usuario o no se realizaron cambios"]);
            }
        } catch (Exception $th) {
            throw new Exception("Error al editar usuario: " . $th->getMessage());
        } finally {
            // Cerrar la declaración preparada y la conexión
            $stmt->close();
            $conn->close();
        }
    }
    

    public static function insertProducto($ID_PRODUCTO, $nombre, $tema, $num_piezas, $precio, $tipo) {
        try {
            $sql = "INSERT INTO productos (ID_PRODUCTO, nombre, tema, num_piezas, precio, tipo) 
                    VALUES (?, ?, ?, ?, ?, ?)";
            $conn = self::conexion();
            $stmt = $conn->prepare($sql);
    
            if (!$stmt) {
                throw new Exception("Error en la preparación de la sentencia: " . $conn->error);
            } 
    
            $stmt->bind_param("sssids", 
                $ID_PRODUCTO, 
                $nombre, 
                $tema, 
                $num_piezas, 
                $precio, 
                $tipo
            );
    
            if ($stmt->execute()) {
                return json_encode(["success" => true, "message" => "Producto insertado correctamente"]);
            } else {
                throw new Exception("Error al ejecutar la sentencia: " . $stmt->error);
            }
    
        } catch (Exception $e) {
            return json_encode(["success" => false, "error" => "Error al insertar producto: " . $e->getMessage()]);
        } finally {
            if (isset($stmt)) {
                $stmt->close();
            }
            if (isset($conn)) {
                $conn->close();
            }
        }
    }
    




    //PEDIDOS
    public static function insertPedido($precio_total, $fecha_envio, $ID_usuario) {
        try {
            // Consulta SQL para insertar un usuario
            $sql = "INSERT INTO pedidos (precio_total, fecha_envio, ID_usuario) 
                    VALUES (?, ?, ?)";
            $conn = self::conexion();
            $stmt = $conn->prepare($sql);
    
            // Verificar si la sentencia se preparó correctamente
            if (!$stmt) {
                throw new Exception("Error en la preparación de la sentencia: " . $conn->error);
            } 
            // Vincular los parámetros ('s' para string, 'i' para integer)
            $stmt->bind_param("dsi", 
            $precio_total, 
            $fecha_envio, 
                $ID_usuario, 
            );
    
            // Ejecutar la sentencia
            $resultado = $stmt->execute();
    
            // Verificar si la ejecución fue exitosa
            if ($resultado) {
                $pedidoId = $conn->insert_id;
                return $pedidoId;
                
            } else {
                throw new Exception("Error al ejecutar la sentencia: " . $stmt->error);
            }
    
        } catch (Exception $e) {
            // Devolver el mensaje de error en formato JSON
            return json_encode(["error" => "Error al insertar el pedido: " . $e->getMessage()]);
        } finally {
            // Cerrar la declaración y la conexión
            if (isset($stmt)) {
                $stmt->close();
            }
            if (isset($conn)) {
                $conn->close();
            }
        }
    }

    public static function insertPedidoDetalle($ID_pedido,$ID_PRODUCTO,$Cantidad ) {
        try {
            // Consulta SQL para insertar un usuario
            $sql = "INSERT INTO detalle_pedidos (ID_Pedido,ID_PRODUCTO,Cantidad) 
                    VALUES (? ,? , ?)";
            $conn = self::conexion();
            $stmt = $conn->prepare($sql);
    
            // Verificar si la sentencia se preparó correctamente
            if (!$stmt) {
                throw new Exception("Error en la preparación de la sentencia: " . $conn->error);
            } 
            // Vincular los parámetros ('s' para string, 'i' para integer)
            $stmt->bind_param("ssi", 
            $ID_pedido, 
            $ID_PRODUCTO,
            $Cantidad
            );
    
            // Ejecutar la sentencia
            $resultado = $stmt->execute();
    
            // Verificar si la ejecución fue exitosa
            if ($resultado) {
                return json_encode(["message" => "detalle de Pedido insertado correctamente"]);
            } else {
                throw new Exception("Error al ejecutar la sentencia: " . $stmt->error);
            }
    
        } catch (Exception $e) {
            // Devolver el mensaje de error en formato JSON
            return json_encode(["error" => "Error al insertar el detalle del pedido: " . $e->getMessage()]);
        } finally {
            // Cerrar la declaración y la conexión
            if (isset($stmt)) {
                $stmt->close();
            }
            if (isset($conn)) {
                $conn->close();
            }
        }
    }

    public static function getPedidosUser($idUser) {
        try {
            $sql="SELECT * FROM pedidos WHERE ID_usuario = ?";
            $conn = self::conexion();
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("s", $idUser); // 's' especifica que el parámetro es una cadena (string)
            // Ejecutar la consulta
            $stmt->execute();
            $result = $stmt->get_result();
            if ($result->num_rows > 0) {
                $productos = $result->fetch_all(MYSQLI_ASSOC); // Usa fetch_all para obtener todos los resultados y transformarlos en un array asociativo
                return $productos;
            } else {
                return "0 resultados";
            }
        } catch (Exception $th) {
            throw new Exception("Error al obtener los pedidos de este usuario: " . $th->getMessage());
        }finally {
            // Cerrar la declaración preparada y la conexión
            $stmt->close();
            $conn->close();
        }
    }
    
    public static function getDetallesPedidos($ID_pedido) {
        try {
            $sql="SELECT * FROM detalle_pedidos WHERE ID_Pedido = ?";
            $conn = self::conexion();
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("s", $ID_pedido); // 's' especifica que el parámetro es una cadena (string)
            // Ejecutar la consulta
            $stmt->execute();
            $result = $stmt->get_result();
            if ($result->num_rows > 0) {
                $productos = $result->fetch_all(MYSQLI_ASSOC); // Usa fetch_all para obtener todos los resultados y transformarlos en un array asociativo
                return $productos;
            } else {
                return "0 resultados";
            }
        } catch (Exception $th) {
            throw new Exception("Error al obtener los detalles de pedidos de un pedido: " . $th->getMessage());
        }finally {
            // Cerrar la declaración preparada y la conexión
            $stmt->close();
            $conn->close();
        }
    } 
    
    public static function insertWishlist($idUsuario ) {
        try {
            // Consulta SQL para insertar un usuario
            $sql = "INSERT INTO wishlists (ID_USER) 
                    VALUES (?)";
            $conn = self::conexion();
            $stmt = $conn->prepare($sql);
    
            // Verificar si la sentencia se preparó correctamente
            if (!$stmt) {
                throw new Exception("Error en la preparación de la sentencia: " . $conn->error);
            } 
            // Vincular los parámetros ('s' para string, 'i' para integer)
            $stmt->bind_param("s", 
            $idUsuario, 
            );
    
            // Ejecutar la sentencia
            $resultado = $stmt->execute();
    
            // Verificar si la ejecución fue exitosa
            if ($resultado) {
                return json_encode(["message" => "wishlist insertado correctamente"]);
            } else {
                throw new Exception("Error al ejecutar la sentencia: " . $stmt->error);
            }
    
        } catch (Exception $e) {
            // Devolver el mensaje de error en formato JSON
            return json_encode(["error" => "Error al insertar la wishlist: " . $e->getMessage()]);
        } finally {
            // Cerrar la declaración y la conexión
            if (isset($stmt)) {
                $stmt->close();
            }
            if (isset($conn)) {
                $conn->close();
            }
        }
    }

    public static function getWishlistUser($idUser) {
        try {
            $sql="SELECT * FROM wishlists WHERE ID_USER = ?";
            $conn = self::conexion();
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("i", $idUser); // 's' especifica que el parámetro es una cadena (string)
            // Ejecutar la consulta
            $stmt->execute();
            $result = $stmt->get_result();
            if ($result->num_rows > 0) {
                $productos = $result->fetch_all(MYSQLI_ASSOC); // Usa fetch_all para obtener todos los resultados y transformarlos en un array asociativo
                return $productos;
            } else {
                return "0 resultados";
            }
        } catch (Exception $th) {
            throw new Exception("Error al obtener las wishlists de este usuario: " . $th->getMessage());
        }finally {
            // Cerrar la declaración preparada y la conexión
            $stmt->close();
            $conn->close();
        }
    }

    public static function insertWishlistDetalle($id_wishlist,$id_producto,) {
        try {
            // Consulta SQL para insertar un usuario
            $sql = "INSERT INTO wishlist_detalle (ID_Wishlist,ID_PRODUCTO) 
                    VALUES (? , ?)";
            $conn = self::conexion();
            $stmt = $conn->prepare($sql);
    
            // Verificar si la sentencia se preparó correctamente
            if (!$stmt) {
                throw new Exception("Error en la preparación de la sentencia: " . $conn->error);
            } 
            // Vincular los parámetros ('s' para string, 'i' para integer)
            $stmt->bind_param("is", 
            $id_wishlist, 
            $id_producto
            );
    
            // Ejecutar la sentencia
            $resultado = $stmt->execute();
    
            // Verificar si la ejecución fue exitosa
            if ($resultado) {
                return json_encode(["message" => "detalle de wishlist insertado correctamente"]);
            } else {
                throw new Exception("Error al ejecutar la sentencia: " . $stmt->error);
            }
    
        } catch (Exception $e) {
            // Devolver el mensaje de error en formato JSON
            return json_encode(["error" => "Error al insertar el detalle de la wishlist: " . $e->getMessage()]);
        } finally {
            // Cerrar la declaración y la conexión
            if (isset($stmt)) {
                $stmt->close();
            }
            if (isset($conn)) {
                $conn->close();
            }
        }
    }

    public static function deleteWishlistDetalle($id_producto, $id_wishlist) {
        try {
            // Consulta SQL para eliminar un detalle de la wishlist
            $sql = "DELETE FROM wishlist_detalle WHERE ID_PRODUCTO = ? AND ID_Wishlist = ?;";
            
            
            $conn = self::conexion();
            $stmt = $conn->prepare($sql);
    
            // Verificar si la sentencia se preparó correctamente
            if (!$stmt) {
                throw new Exception("Error en la preparación de la sentencia: " . $conn->error);
            }
    
            // Vincular los parámetros
            $stmt->bind_param("si", $id_producto, $id_wishlist); // Asumiendo que ID_PRODUCTO es un string y ID_USER es un entero
    
            // Ejecutar la sentencia
            $resultado = $stmt->execute();
    
            // Verificar si la ejecución fue exitosa
            if ($resultado) {
                return json_encode(["message" => "Detalle de wishlist eliminado correctamente"]);
            } else {
                throw new Exception("Error al ejecutar la sentencia: " . $stmt->error);
            }
    
        } catch (Exception $e) {
            // Devolver el mensaje de error en formato JSON
            return json_encode(["error" => "Error al eliminar el detalle de la wishlist: " . $e->getMessage()]);
        } finally {
            // Cerrar la declaración y la conexión
            if (isset($stmt)) {
                $stmt->close();
            }
            if (isset($conn)) {
                $conn->close();
            }
        }
    }
    
    public static function getProductosDeWishlist($id_usuario) {
        try {
            // Consulta SQL para obtener todos los ID_PRODUCTO de la wishlist del usuario
            $sql = "SELECT wd.ID_PRODUCTO
                    FROM Wishlist_detalle wd
                    INNER JOIN Wishlists w ON wd.ID_Wishlist = w.ID_Wishlist
                    WHERE w.ID_USER = ?";
            
            $conn = self::conexion();
            $stmt = $conn->prepare($sql);
    
            // Verificar si la sentencia se preparó correctamente
            if (!$stmt) {
                throw new Exception("Error en la preparación de la sentencia: " . $conn->error);
            }
    
            // Vincular los parámetros
            $stmt->bind_param("i", $id_usuario); // Asumiendo que ID_USER es un entero
    
            // Ejecutar la sentencia
            $stmt->execute();
    
            // Obtener el resultado
            $result = $stmt->get_result();
            
            // Crear un array para almacenar los ID_PRODUCTO
            $productos = [];
            
            // Recorrer el resultado y llenar el array
            while ($row = $result->fetch_assoc()) {
                $productos[] = $row['ID_PRODUCTO'];
            }
    
            return $productos; // Retornar el array con los ID_PRODUCTO
    
        } catch (Exception $e) {
            // Manejar el error y devolver un mensaje apropiado
            return json_encode(["error" => "Error al obtener productos de la wishlist: " . $e->getMessage()]);
        } finally {
            // Cerrar la declaración y la conexión
            if (isset($stmt)) {
                $stmt->close();
            }
            if (isset($conn)) {
                $conn->close();
            }
        }
    }
    



}
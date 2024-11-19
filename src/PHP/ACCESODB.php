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
    


}
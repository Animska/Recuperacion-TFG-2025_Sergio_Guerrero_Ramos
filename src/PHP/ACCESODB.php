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

    public static function getMinifiguras() {
        try {
            $sql="SELECT * FROM productos where tipo = 'minfig'";
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
            $sql = "SELECT * FROM productos WHERE codigo = ?";
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
    
    




}
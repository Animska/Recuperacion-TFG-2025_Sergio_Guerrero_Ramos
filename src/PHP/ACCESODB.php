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
            throw new Exception("Error al obtener Artistas: " . $th->getMessage());
        }finally {
            // Cerrar la declaración preparada y la conexión
            $stmt->close();
            $conn->close();
        }
    }
    
    public static function get3Productos() {
        try {
            $sql="SELECT * FROM Productos ORDER BY RAND() LIMIT 3;";
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
            throw new Exception("Error al obtener Artistas: " . $th->getMessage());
        }finally {
            // Cerrar la declaración preparada y la conexión
            $stmt->close();
            $conn->close();
        }
    }

    public static function get3ProductosUnder() {
        try {
            $sql="SELECT * FROM Productos WHERE precio < 30.00 ORDER BY RAND() LIMIT 3;";
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
            throw new Exception("Error al obtener Artistas: " . $th->getMessage());
        }finally {
            // Cerrar la declaración preparada y la conexión
            $stmt->close();
            $conn->close();
        }
    }

}
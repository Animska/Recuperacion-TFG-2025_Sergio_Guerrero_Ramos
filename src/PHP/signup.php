<?php
include_once('../PHP/ACCESODB.php');

    $nombre =$_POST['nombre'];
    $apellidos =$_POST['apellidos'];
    $user = $_POST['user'];
    $password = $_POST['password'];
    $codPostal =$_POST['codPostal'];
    $direccion =$_POST['direccion'];
    $poblacion =$_POST['poblacion'];
    $provincia =$_POST['provincia'];

    $root=false;
    $pfp=rand(1, 10);
    // Check if user exists
    $resultado =  BD::insertUser($user, $password, $root,$nombre ,$apellidos,$poblacion,$provincia,$codPostal, $direccion,$pfp );
    
    if(array_key_exists('message',json_decode($resultado,true),) && array_key_exists('error',json_decode($resultado,true))){
        echo $resultado;
        return;
    }else{
        $usuarioCreado = BD::getUser($_POST['user']); // Esto devuelve una cadena JSON
        $usuarioArray = json_decode($usuarioCreado, true); // Decodifica la cadena JSON a un array asociativo
        BD::insertWishlist($usuarioArray['ID_USER']);

        echo $resultado;
    }

?>
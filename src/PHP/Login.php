<?php
include_once('../PHP/ACCESODB.php');
    

    $user = $_POST['user'];
    $password = $_POST['password'];

    // Check if user exists
    $resultado =  BD::getUser($user);
    
    if(array_key_exists('message',json_decode($resultado,true),) || array_key_exists('error',json_decode($resultado,true))){
        echo 'noUser';
        return;
    }
    if(json_decode($resultado,true)['password']!=$password){
        echo 'noPassword';
        return;
    }else{
        echo $resultado;
    }
    
?>
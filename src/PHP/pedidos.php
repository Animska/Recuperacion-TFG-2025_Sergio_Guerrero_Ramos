<?php
include_once('../PHP/ACCESODB.php');

if (isset($_POST['idUser'])) {
    $idUser = $_POST['idUser'];

    $pedidosConProductos = [];
    $pedidos = BD::getPedidosUser($idUser);

    if ($pedidos !== "0 resultados") {
        foreach ($pedidos as $pedido) {
            $idPedido = $pedido['ID_Pedido'];

            // Obtener los detalles de cada pedido
            $detalles = BD::getDetallesPedidos($idPedido);

            if ($detalles !== "0 resultados") {
                // Usar el pedido completo como clave
                $pedidoKey = json_encode($pedido);

                // Inicializar el array para este pedido
                $pedidosConProductos[$pedidoKey] = [];

                // Añadir los IDs de producto al array del pedido
                foreach ($detalles as $detalle) {
                    $pedidosConProductos[$pedidoKey][] = $detalle;
                }
            }
        }
    }

    echo json_encode($pedidosConProductos);
    return;
}

if(isset($_POST['idUserRelleno'])){
        echo BD::getUserID($_POST['idUserRelleno']);
}
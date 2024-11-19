function rellenarDatosUsuario(idUsuario){
    $.ajax({
        url: '../PHP/pedidos.php',
        type: 'POST',
        data: { 'idUserRelleno': idUsuario}, 
        success: function(response) {
            let respuestaParse = JSON.parse(response);
            console.log(respuestaParse);

                // Dentro de cada elemento 'pedido', busca y actualiza los elementos correspondientes
                $('.pedido').find('.pedidoNombre').html(respuestaParse.nombre);
                $('.pedido').find('.pedidoApellidos').html(respuestaParse.apellidos);
                $('.pedido').find('.pedidoCalle').html(respuestaParse.direccion);
                $('.pedido').find('.pedidoPueblo').html(respuestaParse.poblacion);
                $('.pedido').find('.pedidoProvincia').html(respuestaParse.provincia);
                $('.pedido').find('.pedidoCodPostal').html(respuestaParse.codigo_postal);
        },
        error: function(xhr, status, error) {
            console.error("Error loading search page:", error);
        }
    });
}




$(function () {
    $.ajax({
        url: '../PHP/pedidos.php',
        type: 'POST',
        data: { 'idUser': window.localStorage.getItem('idUsuario') },
        success: function (respuesta) {
            let respuestaParse = JSON.parse(respuesta);
            $('#pedidosUser').html('');
            try {
                let pedidos = $('#pedidosUser');
                $.each(respuestaParse, function (pedidoJSON, productos) { // 'pedidoId' es la clave, 'productos' es el array de IDs de productos
                    let pedido = JSON.parse(pedidoJSON);
                    let productoString = 
                        '<div class="pedido container border rounded  my-3">\n' +
                        '<div class="row bg-light">\n' +
                        '<div class="col-12">\n' +
                        '<h4 class="fw-bolder">Pedido <span>#' + pedido.ID_Pedido + '</span></h4>\n' +
                        '</div>\n' +
                        '</div>\n' +
                        '<div class="row productosPedido">\n' +
                        '<div class="col-12 d-flex flex-wrap p-3">\n';
                    
                    // Iterar sobre los productos del pedido
                    $.each(productos, function (i, producto) {
                        productoString +='<div class="imagenProductoPedido position-relative m-3 border rounded">\n'+ 
                                        '<img src="../IMAGES/productos/' + producto.ID_PRODUCTO + '.webp" alt="Producto ' + producto.ID_PRODUCTO + '" class="m-2">\n'+
                                        '<div class="contadorproductoPedido position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">'+producto.Cantidad+'</div>\n'+
                                        '</div>\n'
                                    });
                    
                    productoString += 
                        '</div>\n' +
                        '</div>\n' +
                        '<div class="row bg-light">\n' +
                        '<div class="col-12">\n' +
                        '<h6 class="fw-bolder">Precio total: <span class="text-primary">'+pedido.precio_total+'€</span></h6>\n' +
                        '</div>\n' +
                        '</div>\n' +
                        '<div class="row bg-light">\n' +
                        '<div class="col-12">\n' +
                        '<h6 class="fw-bolder">Enviado a <span class="pedidoNombre">nombre</span> <span class="pedidoApellidos">apellidos</span> a <span class="pedidoCalle">calle</span>,<span class="pedidoPueblo">poblacion</span>, <span class="pedidoProvincia">provincia</span> <span class="pedidoCodPostal">codigo postal</span> en '+pedido.fecha_envio+'</h6>\n' +
                        '</div>\n' +
                        '</div>\n' +
                        '</div>';
                    
                    pedidos.append(productoString);
                });
            } catch (error) {
                console.error("Error al procesar la respuesta JSON:", error);
            }
        },
        error: function (xhr, status, error) {
            console.error("Error al recibir la respuesta:", error);
        }
    });


    setTimeout(()=>{
        $('.pedido').each(function(index,pedido){
            console.log(`Pedido #${index + 1}:`);
            rellenarDatosUsuario(window.localStorage.getItem('idUsuario'))
        })
    },300);
});


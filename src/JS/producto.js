function cargarDatosProducto(codigo) {
    $.ajax({
        url: '../PHP/producto.php',
        type: 'GET',
        data: { codigo: codigo },
        success: function (respuesta) {
            console.log("Respuesta del servidor:", respuesta);
            try {
                // Parsear la respuesta JSON
                var producto = JSON.parse(respuesta);

                // Comprobar si la respuesta no es un error
                if (producto && typeof producto === 'object' && !producto.error) {

                    // Cargar los datos del producto directamente
                    $('.producto').attr('data-codigoProducto',producto.ID_PRODUCTO);
                    $('#n_articulo').html(producto.ID_PRODUCTO);   // Muestra el código del producto
                    $('#nombre_set').html(producto.nombre);   // Muestra el nombre del producto
                    // $('title').html(producto.nombre)

                    if(producto.num_piezas <=1){
                        $('#n_piezas').parent().html('<i class="bi bi-person-standing"></i>  Minifigura')
                    }else{
                        $('#n_piezas').html(producto.num_piezas);
                    }
                    
                    $('#precio_producto').html(producto.precio);
                    $('#tema').html(producto.tema); 
                    var imagen='../IMAGES/productos/'+producto.ID_PRODUCTO+'.webp';
                    $('#imagen_producto').attr('src', imagen);
                } else {
                    console.log("Producto no encontrado o error en la respuesta:", producto);
                }
            } catch (error) {
                console.log("Error al parsear la respuesta JSON:", error);
            }
        },
        error: function (xhr, status, error) {
            console.log("Error al recibir la respuesta:", error);
        }
    });
}






function cargarProductos(){
    $.ajax({
    url: '../PHP/home.php',
    type: 'POST',
    data:{'pag':'cargada'},
    success: function (respuesta) {
        var productosParse = JSON.parse(respuesta);
        try {
            let productos = $('#destacadosEnProducto')
            productos.html('')
            let contador=1
            $.each(productosParse, function (index, producto2) {
                let productoString ='<div class="card producto position-relative" data-codigoProducto='+producto2.ID_PRODUCTO+' style="width: 30%;">\n' +
                                    '<div class="image-container" style="height: 200px; overflow: hidden;">\n' +
                                    '<a href="../HTML/index.html?codigo='+producto2.ID_PRODUCTO+'" class="text-decoration-none text-dark"><img src="../IMAGES/productos/' + producto2.ID_PRODUCTO + '.webp" class="card-img-top p-3 img-fluid" alt="..." style="height: 100%; width: 100%; object-fit: contain;">\n' +
                                    '</div>\n' +
                                    '<div class="card-body d-flex flex-column justify-content-between">\n' +
                                    '    <h5 class="card-title fw-bold text-uppercase">' + producto2.nombre + '</h5><a>\n' +
                                    '    <h5 class="card-text fw-bold">' + producto2.precio + ' €</h5>\n' +
                                    '    <div class="botonCentrado text-center mt-2">\n' +
                                    '        <a href="#" class="btn btn-redLego fw-bold d-inline-block mx-auto añadirCarrito">Añadir al carrito</a>\n' +
                                    '    </div>\n' +
                                    '</div>\n' +
                                    '<span><i class="bi bi-heart position-absolute top-0 end-0 me-2 fs-3 text-primary fav"></i></span>\n' +
                                    '</div>\n';

                productos.append(productoString);
                contador++
            });
        } catch (error) {
            console.log("Error al parsear la respuesta JSON:", error);
        }
    },
    error: function (xhr, status, error) {
        console.log("Error al recibir la respuesta:", error);
    }
});
}

$(function(){
    let params = new URLSearchParams(document.location.search)
    let codigo = params.get('codigo')
    cargarProductos()
    cargarDatosProducto(codigo)
    
})
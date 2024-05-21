function cargarProductos(){
    $.ajax({
    url: '../PHP/descubrir.php',
    type: 'POST',
    data:{'pag':'cargada'},
    success: function (respuesta) {
        var productosParse = JSON.parse(respuesta);
        try {
            let productos = $('#productos')
            $.each(productosParse, function (index, producto) {
                let estadioString = '<div class="card p-3 position-relative m-2" style="width: 23%;">\n' +
                                    '<div class="image-container" style="height: 200px; overflow: hidden;">\n' +
                                    '<img src="../IMAGES/sets/' + producto.codigo + '.webp" class="card-img-top p-3 img-fluid" alt="..." style="height: 100%; width: 100%; object-fit: contain;">\n' +
                                    '</div>\n' +
                                    '<div class="card-body d-flex flex-column justify-content-between">\n' +
                                    '    <h5 class="card-title fw-bold text-uppercase">' + producto.nombre + '</h5>\n' +
                                    '    <h5 class="card-text fw-bold">' + producto.precio + ' €</h5>\n' +
                                    '    <div class="botonCentrado text-center mt-2">\n' +
                                    '        <a href="#" class="btn btn-redLego fw-bold d-inline-block mx-auto">Añadir al carrito</a>\n' +
                                    '    </div>\n' +
                                    '</div>\n' +
                                    '<span><i class="bi bi-heart position-absolute top-0 end-0 me-2 fs-3 text-primary" id="fav"></i></span>\n' +
                                    '</div>\n';

                productos.append(estadioString);
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

$(function (){
    cargarProductos()
})


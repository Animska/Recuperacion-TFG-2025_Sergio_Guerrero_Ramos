function isEmpty( el ){
    return !$.trim(el.html())
}

function ordenar(orden, criterio) {
    let divsOrdenados = [];

    if (criterio === 'nombre') {
        divsOrdenados = $('.producto').sort(function(a, b) {
            const nombreA = $(a).find('.nombre').text().toLowerCase();
            const nombreB = $(b).find('.nombre').text().toLowerCase();

            if (nombreA < nombreB) return orden === 'up' ? -1 : 1;
            if (nombreA > nombreB) return orden === 'up' ? 1 : -1;
            return 0;
        });
    } else if (criterio === 'precio') {
        divsOrdenados = $('.producto').sort(function(a, b) {
            const precioA = parseFloat($(a).find('.precio').text());
            const precioB = parseFloat($(b).find('.precio').text());

            return orden === 'up' ? precioA - precioB : precioB - precioA;
        });
    }

    // Reinserta los elementos ordenados en el contenedor
    $('#productos').html(divsOrdenados);
}


$(function(){
    $.ajax({
        url: '../PHP/favoritos.php',
        type: 'POST',
        data:{
            'idUser':window.localStorage.getItem('idUsuario'),
            'pag':'wishlist'
        }, 
        success: function(response) {
            let productosParse = JSON.parse(response);
            try {
                let productos = $('#productos')
                $.each(productosParse, function (index, producto) {
                    let productoString = '<div class="producto card p-3 col-3 position-relative m-2 cursor:pointer" data-codigoProducto="'+producto.ID_PRODUCTO+'" style="width: 23%;">\n' +
                                        '<div class="image-container" style="height: 200px; overflow: hidden;">\n' +
                                        '<a href="../HTML/index.html?codigo='+producto.ID_PRODUCTO+'" class="text-decoration-none text-dark"><img src="../IMAGES/productos/' + producto.ID_PRODUCTO + '.webp" class="card-img-top p-3 img-fluid" alt="..." style="height: 100%; width: 100%; object-fit: contain;">\n' +
                                        '</div>\n' +
                                        '<div class="card-body d-flex flex-column justify-content-between">\n' +
                                        '    <h5 class="card-title fw-bold text-uppercase nombre">' + producto.nombre + '</h5></a>\n' +
                                        '    <h5 class="card-text fw-bold precio">' + producto.precio + ' €</h5>\n' +
                                        '    <div class="botonCentrado text-center mt-2">\n' +
                                        '        <a href="#" class="btn btn-redLego  fw-bold d-inline-block mx-auto añadirCarrito">Añadir al carrito</a>\n' +
                                        '    </div>\n';
    
                    productos.append(productoString);
                });
            } catch (error) {
                console.log("Error al parsear la respuesta JSON:", error);
            }
            
            
        },
        error: function(xhr, status, error) {
            console.error("Error loading products:", error);
        }
    });

    $(document).on('click','#alfabeticamente_UP',function(event){
        ordenar('up','nombre')
        console.log('alfabeticamente_UP')
    })
    $(document).on('click','#alfabeticamente_DOWN',function(event){
        ordenar('down','nombre')
        console.log('alfabeticamente_DOWN')
    })
    $(document).on('click','#precio_UP',function(event){
        ordenar('up','precio')
        console.log('Precio_UP')
    })
    $(document).on('click','#precio_DOWN',function(event){
        ordenar('down','precio')
        console.log('Precio_DOWN')
    })


    setTimeout(()=>{
        if (isEmpty($('#productos'))) {
            $('#productos').html('<h2>No se encontraron productos según este criterio</h2>');
        }
    },300);
    
})
function cargarProductos(){
    $.ajax({
    url: '../PHP/home.php',
    type: 'POST',
    data:{'pag':'cargada'},
    success: function (respuesta) {
        var productosParse = JSON.parse(respuesta);
        try {
            let productos = $('#recomendados')
            productos.html('')
            let contador=1
            $.each(productosParse, function (index, producto) {
                let productoString ='<div class="card position-relative" style="width: 30%;">\n' +
                                    '<div class="image-container" style="height: 200px; overflow: hidden;">\n' +
                                    '<a href="./Producto.html?codigo='+producto.codigo+'" class="text-decoration-none text-dark"><img src="../IMAGES/productos/' + producto.codigo + '.webp" class="card-img-top p-3 img-fluid" alt="..." style="height: 100%; width: 100%; object-fit: contain;">\n' +
                                    '</div>\n' +
                                    '<div class="card-body d-flex flex-column justify-content-between">\n' +
                                    '    <h5 class="card-title fw-bold text-uppercase">' + producto.nombre + '</h5><a>\n' +
                                    '    <h5 class="card-text fw-bold">' + producto.precio + ' €</h5>\n' +
                                    '    <div class="botonCentrado text-center mt-2">\n' +
                                    '        <a href="#" class="btn btn-redLego fw-bold d-inline-block mx-auto">Añadir al carrito</a>\n' +
                                    '    </div>\n' +
                                    '</div>\n' +
                                    '<span><i class="bi bi-heart position-absolute top-0 end-0 me-2 fs-3 text-primary" id="fav"></i></span>\n' +
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

function cargarProductos2(){
    $.ajax({
    url: '../PHP/home.php',
    type: 'POST',
    data:{'pag1':'cargada'},
    success: function (respuesta) {
        var productosParse = JSON.parse(respuesta);
        try {
            let productos = $('#recomendados2')
            productos.html('')
            let contador=1
            $.each(productosParse, function (index, producto) {
                let productoString ='<div class="card position-relative" style="width: 30%;">\n' +
                                    '<div class="image-container" style="height: 200px; overflow: hidden;">\n' +
                                    '<a href="../HTML/Producto.html?codigo='+producto.codigo+'" class="text-decoration-none text-dark"><img src="../IMAGES/productos/' + producto.codigo + '.webp" class="card-img-top p-3 img-fluid" alt="..." style="height: 100%; width: 100%; object-fit: contain;">\n' +
                                    '</div>\n' +
                                    '<div class="card-body d-flex flex-column justify-content-between">\n' +
                                    '    <h5 class="card-title fw-bold text-uppercase">' + producto.nombre + '</h5><a>\n' +
                                    '    <h5 class="card-text fw-bold">' + producto.precio + ' €</h5>\n' +
                                    '    <div class="botonCentrado text-center mt-2">\n' +
                                    '        <a href="#" class="btn btn-redLego fw-bold d-inline-block mx-auto">Añadir al carrito</a>\n' +
                                    '    </div>\n' +
                                    '</div>\n' +
                                    '<span><i class="bi bi-heart position-absolute top-0 end-0 me-2 fs-3 text-primary" id="fav"></i></span>\n' +
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

function loadProductsTheme(theme) {
    $.ajax({
        url: '../PHP/getProductosCategoria.php',
        type: 'POST',
        data: { theme: theme },
        success: function(response) {
            console.log(response)
            let productosParse = JSON.parse(response);
            $('#tema').html(theme);
            $('#productos').html('');
            try {
                let productos = $('#productos')
                $.each(productosParse, function (index, producto) {
                    let productoString = '<div class="card p-3 position-relative m-2 cursor:pointer" style="width: 23%;">\n' +
                                        '<div class="image-container" style="height: 200px; overflow: hidden;">\n' +
                                        '<a href="../HTML/Producto.html?codigo='+producto.codigo+'" class="text-decoration-none text-dark"><img src="../IMAGES/productos/' + producto.codigo + '.webp" class="card-img-top p-3 img-fluid" alt="..." style="height: 100%; width: 100%; object-fit: contain;">\n' +
                                        '</div>\n' +
                                        '<div class="card-body d-flex flex-column justify-content-between">\n' +
                                        '    <h5 class="card-title fw-bold text-uppercase">' + producto.nombre + '</h5></a>\n' +
                                        '    <h5 class="card-text fw-bold">' + producto.precio + ' €</h5>\n' +
                                        '    <div class="botonCentrado text-center mt-2">\n' +
                                        '        <a href="#" class="btn btn-redLego fw-bold d-inline-block mx-auto">Añadir al carrito</a>\n' +
                                        '    </div>\n' +
                                        '</div>\n' +
                                        '<span><i class="bi bi-heart position-absolute top-0 end-0 me-2 fs-3 text-primary" id="fav"></i></span>\n' +
                                        '</div>\n';
    
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
}

function loadProducts(dato) {
    console.log(dato)
    $.ajax({
        url: '../PHP/descubrir.php',
        type: 'POST',
        data:{producto:dato}, 
        success: function(response) {
            console.log(response)
            let productosParse = JSON.parse(response);
            $('#productos').html('');
            try {
                let productos = $('#productos')
                $.each(productosParse, function (index, producto) {
                    let productoString = '<div class="card p-3 position-relative m-2 cursor:pointer" style="width: 23%;">\n' +
                                        '<div class="image-container" style="height: 200px; overflow: hidden;">\n' +
                                        '<a href="../HTML/Producto.html?codigo='+producto.codigo+'" class="text-decoration-none text-dark"><img src="../IMAGES/productos/' + producto.codigo + '.webp" class="card-img-top p-3 img-fluid" alt="..." style="height: 100%; width: 100%; object-fit: contain;">\n' +
                                        '</div>\n' +
                                        '<div class="card-body d-flex flex-column justify-content-between">\n' +
                                        '    <h5 class="card-title fw-bold text-uppercase">' + producto.nombre + '</h5></a>\n' +
                                        '    <h5 class="card-text fw-bold">' + producto.precio + ' €</h5>\n' +
                                        '    <div class="botonCentrado text-center mt-2">\n' +
                                        '        <a href="#" class="btn btn-redLego fw-bold d-inline-block mx-auto">Añadir al carrito</a>\n' +
                                        '    </div>\n' +
                                        '</div>\n' +
                                        '<span><i class="bi bi-heart position-absolute top-0 end-0 me-2 fs-3 text-primary" id="fav"></i></span>\n' +
                                        '</div>\n';
    
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
}


$(function (){
    cargarProductos()
    cargarProductos2()

    $('.carousel-link').on('click', function(event) {
        let theme = $(this).data('theme');
        $.ajax({
            url: '../HTML/busqueda.html',
            type: 'GET', 
            success: function(response) {
                $('#body').html(response)
                loadProductsTheme(theme);
            },
            error: function(xhr, status, error) {
                console.error("Error loading search page:", error);
            }
        });
    });

    $('#sets').on('click',function(event){
        event.preventDefault();
        $.ajax({
            url: '../HTML/busqueda.html',
            type: 'POST',
            success: function(response) {
                $('#body').html(response)
                loadProducts('todo');
            },
            error: function(xhr, status, error) {
                console.error("Error loading search page:", error);
            }
        });
    })

    $('#minifiguras').on('click',function(event){
        event.preventDefault();
        $.ajax({
            url: '../HTML/busqueda.html',
            type: 'POST',
            success: function(response) {
                $('#body').html(response)
                loadProducts('minifigura');
            },
            error: function(xhr, status, error) {
                console.error("Error loading search page:", error);
            }
        });
    })
})




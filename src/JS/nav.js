function loadProducts(dato) {
    $.ajax({
        url: '../PHP/descubrir.php',
        type: 'POST',
        data:{producto:dato}, 
        success: function(response) {
            let productosParse = JSON.parse(response);
            $('#productos').html('');
            try {
                $('#tema').html(dato);
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

function llenarCarrito(response){
    let productosCarrito = $('#productosCarrito');
    productosCarrito.html('')
    let cantidadCarrito=0
    let precioTotal= 0

    if(response.length==0){
        return
    }

    var carrito = JSON.parse(response);

    for (let key in carrito) {
        if (carrito.hasOwnProperty(key)) {
            // Parseamos la clave que está en formato JSON
            let producto = JSON.parse(key);  // Convertimos la clave JSON en un objeto
            let cantidad = carrito[key].cantidad; // Accedemos a la cantidad


            // Puedes crear tu HTML dinámicamente aquí, por ejemplo:
            let productoCarrito = `
                <div class="productoCarrito g-1 m-0 row flex-nowrap" data-codigoproducto="`+producto.ID_PRODUCTO+`">
                    <div class='col-4'>
                    <img class='p-3 w-100' src='../IMAGES/productos/`+producto.ID_PRODUCTO+`.webp'</img>
                    </div>
                    <div class='col-5'>
                        <p class=" fs-3 fw-bolder p-0">`+producto.nombre+`</p>
                        <p class=" fs-3 fw-bolder text-primary p-0">`+producto.precio+`€</p>
                    </div>
                    <div class='col-3 d-flex justify-content-center align-items-center'>
                    <div class="contadorProductoCarrito">
                        <div class="contadorProducto border rounded d-flex justify-content center align-items-center">
                            <button type="button" class="btn btn-redLego producto_mas fw-bolder"><i class="bi bi-plus"></i></button>
                            <p class="productoCarrito_cantidad fw-bolder p-0 mx-3 my-0">`+cantidad+`</p>
                            <button type="button" class="btn btn-redLego producto_menos"><i class="bi bi-dash"></i></button>
                        </div>
                    </div>
                    </div>
                    
                </div>
                <hr>
            `;
            // Añadir el producto al carrito en la interfaz
            productosCarrito.append(productoCarrito);
            cantidadCarrito+=cantidad
            precioTotal+=(parseFloat(producto.precio)*parseInt(cantidad))
        }
    }

    $('#contadorProductos').html(cantidadCarrito)
    $('#precioCarrito').html('<p class="fs-3 fw-bolder m-3">PRECIO TOTAL: <span class="text-primary">'+parseFloat(precioTotal.toFixed(2))+'€</span></p>')
}

function rebindClicks(){
    $('#navbar').on('click','#SETS',function(){
        $.ajax({
            url: './busqueda.html',
            type: 'GET',
            success: function (respuesta) {
                $('#body').html(respuesta)
                window.history.pushState({},'','../HTML/index.html')
                loadProducts('set');
                
            },
            error: function () {
                alert('Error al cargar la pagina Home');
            }
        });
    })

    $('#navbar').on('click','#DESCUBRIR',function(){
        $.ajax({
            url: './home.html',
            type: 'GET',
            success: function (respuesta) {
                $('#body').html(respuesta)
                window.history.pushState({},'','../HTML/index.html')
            },
            error: function () {
                alert('Error al cargar la pagina Home');
            }
        });
    })

    $('.MINIFIGURAS').on('click',function(event){
        event.preventDefault();
        $.ajax({
            url: '../HTML/busqueda.html',
            type: 'POST',
            success: function(response) {
                window.history.pushState({},'','../HTML/index.html')
                $('#body').html(response)
                loadProducts('minifig');
            },
            error: function(xhr, status, error) {
                console.error("Error loading search page:", error);
            }
        });
    })

    $('#body').on('click','.añadirCarrito',function(event){
        event.preventDefault();

        $('#divCarrito').addClass('meneando')
        setTimeout(() => {
            $('#divCarrito').removeClass('meneando');
        }, 500);

        let codigoProducto = $(this).closest('.producto').data('codigoproducto');
        $.ajax({
            url: '../PHP/carrito.php',
            type: 'POST',
            data:{'codigo':codigoProducto},
            success: function(response) {
                llenarCarrito(response)
            },
            error: function(xhr, status, error) {
                console.error("Error loading search page:", error);
            }
        });

    })


    $('#pedidos').on('click',function(){
        $.ajax({
            url: './pedidos.html',
            type: 'GET',
            success: function (respuesta) {
                $('#body').html(respuesta)
                window.history.pushState({},'','../HTML/index.html')
            },
            error: function () {
                alert('Error al cargar la pagina Home');
            }
        });
    })

}

$(function () {
    let params = new URLSearchParams(document.location.search)
    let codigo = params.get('codigo')

    $.ajax({
        url: '../PHP/carrito.php',
        type: 'POST',
        success: function(response) {
            llenarCarrito(response)
        },
        error: function(xhr, status, error) {
            console.error("Error loading search page:", error);
        }
    });

    $('#divCarrito').on('click', '.dropdown-menu', function (e) {
        e.stopPropagation();
    });

    $('#productosCarrito').on('click','.producto_mas',function(event){
        event.preventDefault();

        let codigoProducto = $(this).closest('.productoCarrito').data('codigoproducto');
        $.ajax({
            url: '../PHP/carrito.php',
            type: 'POST',
            data:{'codigo':codigoProducto},
            success: function(response) {
                llenarCarrito(response)
            },
            error: function(xhr, status, error) {
                console.error("Error loading search page:", error);
            }
        });

    })

    $('#productosCarrito').on('click','.producto_menos',function(event){
        event.preventDefault();

        let codigoProducto = $(this).closest('.productoCarrito').data('codigoproducto');
        $.ajax({
            url: '../PHP/carrito.php',
            type: 'POST',
            data:{
                'codigoM':codigoProducto,
                'menos':'menos'
            },
            success: function(response) {
                llenarCarrito(response)
            },
            error: function(xhr, status, error) {
                console.error("Error loading search page:", error);
            }
        });

    })

    $('#botonTramitar').on('click',function(event){
        event.preventDefault()
        $.ajax({
            url: '../PHP/carrito.php',
            type: 'POST',
            data:{
                'idUsuario':window.localStorage.getItem('idUsuario'),
                'precioTotal':$('#precioCarrito span').html()
            },
            success: function(response) {

                $('#productosCarrito').html('')
                $('#contadorProductos').html(0)
                $('#precioCarrito').html('<p class="fs-3 fw-bolder m-3">PRECIO TOTAL: <span class="text-primary">0€</span></p>')
            },
            error: function(xhr, status, error) {
                console.error("Error loading search page:", error);
            }
        });
    })




    if(window.localStorage.getItem('inicioSesion')!=null){
        $('#inicioSesion').addClass('d-none')
        $('#divCarrito').removeClass('d-none')
        $('#divUsuario').removeClass('d-none')
        $('#nombreUsuario').html(window.localStorage.getItem('nombreUsuario'))
        $('#imagenUsuario').attr('src','../IMAGES/pfp/'+window.localStorage.getItem('imagenUsuario')+'.JPG')

        if(window.localStorage.getItem('root')=='1'){
            $('#opcionesAdmin').removeClass('d-none')
        }
    }

    $('#cerrarSesion').on('click',function(event){
        event.preventDefault()
        window.localStorage.clear()
        location.reload(true);
        
    })

    if(codigo!=null){
        $.ajax({
            url: './producto.html',
            type: 'GET',
            success: function (respuesta) {
                $('#body').html(respuesta)
                rebindClicks()
                

            },
            error: function () {
                alert('Error al cargar la pagina Home');
            }
        });
        
    }else{
        $.ajax({
            url: './home.html',
            type: 'GET',
            success: function (respuesta) {
                $('#body').html(respuesta)
                rebindClicks()
                window.history.pushState({},'','../HTML/index.html')
            },
            error: function () {
                alert('Error al cargar la pagina Home');
            }
        });
    }

    $('#formLogin').on('submit',function(event){
        event.preventDefault()
        $.ajax({
            url: '../PHP/Login.php',
            type: 'POST',
            data:{
                user: $('#user').val(),
                password: $('#password').val()
            },
            success: function (respuesta) {
                console.log(respuesta)
                switch(respuesta){
                    case 'noUser':
                        $('#errorLogin').html('Este usuario no existe')
                        break
                    case 'noPassword':
                        $('#errorLogin').html('Contraseña incorrecta')
                        break
                    default:
                        var usuario = JSON.parse(respuesta)
                        window.localStorage.setItem('inicioSesion','true')
                        window.localStorage.setItem('idUsuario',usuario.ID_USER)
                        window.localStorage.setItem('imagenUsuario',usuario.pfp)
                        window.localStorage.setItem('nombreUsuario',usuario.nombre)
                        window.localStorage.setItem('root',usuario.root)

                        $('#inicioSesion').addClass('d-none')
                        $('#divUsuario').removeClass('d-none')
                        $('#divCarrito').removeClass('d-none')
                        $('#nombreUsuario').html(usuario.nombre)
                        $('#imagenUsuario').attr('src','../IMAGES/pfp/'+usuario.pfp+'.JPG')

                        $('.modal').modal('toggle')
                        if(window.localStorage.getItem('root')=='1'){
                            $('#opcionesAdmin').removeClass('d-none')
                        }

                }
            },
            error: function () {
                alert('Error al cargar el usuario');
            }
    })
})

$('#formSignUp').on('submit',function(event){
    event.preventDefault()
    $.ajax({
        url: '../PHP/signup.php',
        type: 'POST',
        data:{
            nombre: $('#nombre').val(),
            apellidos: $('#apellidos').val(),
            user: $('#userReg').val(),
            password: $('#passwordReg').val(),
            direccion: $('#direccion').val(),
            codPostal: $('#codPostal').val(),
            poblacion: $('#poblacion').val(),
            provincia: $('#provincia').val()
        },
        success: function (respuesta) {
            if(respuesta=='error'){
                $('#errorLogin').html('error al registrarte')
            }else{

                $('#avisoSignup').html('Usuario registrado satisfactoriamente, seras redirrigido al inicio')

                setTimeout(function() {
                    location.reload(true);
                }, 500);
                
                
            }

            
        },
        error: function () {
            alert('Error al cargar el usuario');
        }
})
})
    
$('#toggleLogin').on('click',function(event){
    $('#formSignUp').addClass('d-none')
    $('#formLogin').removeClass('d-none')
})

$('#toggleSignUp').on('click',function(event){
    $('#formLogin').addClass('d-none')
    $('#formSignUp').removeClass('d-none')
})




})
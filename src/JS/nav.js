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
                    let productoString = '<div class="producto card p-3 position-relative m-2 cursor:pointer" style="width: 23%;">\n' +
                                        '<div class="image-container" style="height: 200px; overflow: hidden;">\n' +
                                        '<a href="../HTML/index.html?codigo='+producto.codigo+'" class="text-decoration-none text-dark"><img src="../IMAGES/productos/' + producto.codigo + '.webp" class="card-img-top p-3 img-fluid" alt="..." style="height: 100%; width: 100%; object-fit: contain;">\n' +
                                        '</div>\n' +
                                        '<div class="card-body d-flex flex-column justify-content-between">\n' +
                                        '    <h5 class="card-title fw-bold text-uppercase nombre">' + producto.nombre + '</h5></a>\n' +
                                        '    <h5 class="card-text fw-bold precio">' + producto.precio + ' €</h5>\n' +
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
                rebindClicks()
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
}





$(function () {
    let params = new URLSearchParams(document.location.search)
    let codigo = params.get('codigo')

    if(window.localStorage.getItem('inicioSesion')!=null){
        $('#inicioSesion').addClass('d-none')
        $('#divUsuario').removeClass('d-none')
        $('#nombreUsuario').html(window.localStorage.getItem('nombreUsuario'))
        $('#imagenUsuario').attr('src','../IMAGES/pfp/'+window.localStorage.getItem('imagenUsuario')+'.JPG')
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

    $('#formlogin').on('submit',function(event){
        event.preventDefault()
        $.ajax({
            url: '../PHP/Login.php',
            type: 'POST',
            data:{
                user: $('#user').val(),
                password: $('#password').val()
            },
            success: function (respuesta) {
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
                        window.localStorage.setItem('imagenUsuario',usuario.pfp)
                        window.localStorage.setItem('nombreUsuario',usuario.nombre)

                        $('#inicioSesion').addClass('d-none')
                        $('#divUsuario').removeClass('d-none')
                        $('#nombreUsuario').html(usuario.nombre)
                        $('#imagenUsuario').attr('src','../IMAGES/pfp/'+usuario.pfp+'.JPG')

                        $('.modal').modal('toggle')

                }
            },
            error: function () {
                alert('Error al cargar la pagina Home');
            }
    })
    

})

})
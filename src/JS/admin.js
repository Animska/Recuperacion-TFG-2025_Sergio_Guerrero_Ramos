function llenarProductosAdmin(){
    $.ajax({
        url: '../PHP/admin.php',
        type: 'POST',
        data:{'dato':'productos'},
        dataType: 'json',
        success: function (respuesta) {
            console.log(respuesta)
        try {
            let contenidoAdmin = $('#contenidoAdmin');
            contenidoAdmin.html('');
            $.each(respuesta, function (index, producto) {
                let productoString ='<div class="productoAdmin row w-100 bg-light p-2 my-3 border rounded" data-codigoproducto="'+producto.ID_PRODUCTO+'">\n'+
                                        '<div class="col-md-3 col-12 d-flex justify-content-center align-items-center">\n'+
                                            '<img src="../IMAGES/productos/'+producto.ID_PRODUCTO+'.webp" alt="" srcset="">\n'+
                                        '</div>\n'+
                                        '<div class="col-7"><h3 class="fw-bolder">'+producto.nombre+'</h3></div>\n'+
                                        '<div class="col-md-2 col-5 fs-4  d-flex align-items-center justify-content-evenly">\n'+
                                            '<a href="#" class="text-redLego editarProducto"><i class="bi bi-pencil-fill"></i></a>\n'+
                                            '<a href="#" class="text-redLego borrarProducto"><i class="bi bi-trash3-fill"></i></a>\n'+
                                        '</div>\n'

                                    productoString+= 
                                    `<div class="formularioEdicionProducto col-12 bg-white border-top my-3 d-none">
                                        <form id="formEditarProducto" class="container-fluid p-2">
                                            <div class="row">
                                                <div class="col-md-3 mb-2">
                                                    <label for="ID_PRODUCTO" class="form-label">ID Producto</label>
                                                    <input type="text" class="form-control form-control-sm" id="ID_PRODUCTO" name="ID_PRODUCTO" maxlength="6" required disabled>
                                                </div>
                                                <div class="col-md-9 mb-2">
                                                    <label for="nombre" class="form-label">Nombre del producto</label>
                                                    <input type="text" class="form-control form-control-sm" id="nombre" name="nombre" maxlength="255" required>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6 mb-2">
                                                    <label for="tema" class="form-label">Tema</label>
                                                    <input type="text" class="form-control form-control-sm" id="tema" name="tema" maxlength="255" required>
                                                </div>
                                                <div class="col-md-6 mb-2">
                                                    <label for="num_piezas" class="form-label">Número de piezas</label>
                                                    <input type="number" class="form-control form-control-sm" id="num_piezas" name="num_piezas" min="1" required>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6 mb-2">
                                                    <label for="precio" class="form-label">Precio</label>
                                                    <input type="number" class="form-control form-control-sm" id="precio" name="precio" step="0.01" min="0" required>
                                                </div>
                                                <div class="col-md-6 mb-2">
                                                    <label for="tipo" class="form-label">Tipo</label>
                                                    <select class="form-select form-select-sm" id="tipo" name="tipo" required>
                                                        <option value="">Seleccione un tipo</option>
                                                        <option value="set">Set</option>
                                                        <option value="minifig">Minifig</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-12 d-flex my-5 justify-content-center">
                                                    <button type="submit" class="btn btn-redLego px-2">Editar Producto</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
`
                        

                contenidoAdmin.append(productoString);
            });
        } catch (error) {
            console.log("Error al parsear la respuesta JSON:", error);
        }
        
        },
        error: function () {
            alert('Error al cargar los productos');
        }
    });
}

function llenarUsersAdmin(){
    $.ajax({
        url: '../PHP/admin.php',
        type: 'POST',
        data:{'dato':'usuarios'},
        dataType: 'json',
        success: function (respuesta) {
            console.log(respuesta)
        try {
            let contenidoAdmin = $('#contenidoAdmin');
            contenidoAdmin.html('');
            $.each(respuesta, function (index, usuario) {
                let productoString ='<div class="usuarioAdmin row w-100 bg-light p-2 my-3 border rounded" data-codigousuario="'+usuario.ID_USER+'">\n'+
                                        '<div class="col-md-3 col-12 d-flex justify-content-center align-items-center">\n'+
                                            '<img src="../IMAGES/pfp/'+usuario.pfp+'.JPG" alt="" srcset="" class="rounded-circle">\n'+
                                        '</div>\n'+
                                        '<div class="col-7"><h3 class="fw-bolder">'+usuario.username+'</h3></div>\n'
                
                if(!usuario.root){
                    productoString+='<div class="col-md-2 col-5 fs-4  d-flex align-items-center justify-content-evenly">\n'+
                                            '<a href="#" class="text-redLego editarUsuario"><i class="bi bi-pencil-fill"></i></a>\n'+
                                            '<a href="#" class="text-redLego borrarUsuario"><i class="bi bi-trash3-fill"></i></a>\n'+
                                        '</div>\n'
                                    
                }
                productoString+= 
                                `<div class="formularioEdicionUsuario col-12 bg-white border-top my-3 d-none">
                                    <form id="formEditarUsuario" class="container-fluid p-2">
                                        <div class="row">
                                            <div class="col-md-3 mb-2">
                                                <label for="ID_USER" class="form-label">ID Usuario</label>
                                                <input type="text" class="form-control form-control-sm" id="ID_USER" name="ID_USER" disabled>
                                            </div>
                                            <div class="col-md-3 mb-2">
                                                <label for="username" class="form-label">Usuario</label>
                                                <input type="text" class="form-control form-control-sm" id="username" name="username" maxlength="50" required>
                                            </div>
                                            <div class="col-md-6 mb-2">
                                                <label for="password" class="form-label">Contraseña</label>
                                                <input type="text" class="form-control form-control-sm" id="password" name="password" maxlength="255" required>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6 mb-2">
                                                <label for="nombre" class="form-label">Nombre</label>
                                                <input type="text" class="form-control form-control-sm" id="nombre" name="nombre" maxlength="255" required>
                                            </div>
                                            <div class="col-md-6 mb-2">
                                                <label for="apellidos" class="form-label">Apellidos</label>
                                                <input type="text" class="form-control form-control-sm" id="apellidos" name="apellidos" maxlength="255" required>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-4 mb-2">
                                                <label for="poblacion" class="form-label">Población</label>
                                                <input type="text" class="form-control form-control-sm" id="poblacion" name="poblacion" maxlength="255" required>
                                            </div>
                                            <div class="col-md-4 mb-2">
                                                <label for="provincia" class="form-label">Provincia</label>
                                                <input type="text" class="form-control form-control-sm" id="provincia" name="provincia" maxlength="255" required>
                                            </div>
                                            <div class="col-md-4 mb-2">
                                                <label for="codigo_postal" class="form-label">Código Postal</label>
                                                <input type="text" class="form-control form-control-sm" id="codigo_postal" name="codigo_postal" maxlength="6" minlength="6" required>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6 mb-2">
                                                <label for="direccion" class="form-label">Dirección</label>
                                                <input type="text" class="form-control form-control-sm" id="direccion" name="direccion" maxlength="255" required>
                                            </div>
                                            <div class="col-md-3 mb-2 form-check d-flex align-items-center">
                                                <label class="form-check-label" for="root">Root</label>
                                                <input type="checkbox" class="form-check-input m-3" id="root" name="root">
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-12 d-flex my-5 justify-content-center">
                                                <button type="submit" class="btn btn-redLego px-2">Editar Usuario</button>
                                            </div>
                                        </div>
                                    </form>
                                    </div>
                                </div>`                   

                contenidoAdmin.append(productoString);
            });
        } catch (error) {
            console.log("Error al parsear la respuesta JSON:", error);
        }
            
        },
        error: function () {
            alert('Error al cargar los productos');
        }
    });
}

function mostrarPopup(respuesta) {
    let popup = $('#popup');
    popup.html(respuesta)
    popup.toggleClass('d-none');
    
    setTimeout(function() {
        popup.toggleClass('d-none');
    }, 3000);
}
  // Llamar a la función para mostrar el popup


$(function(){
    $('#editarProductos').on('click',function(){
        llenarProductosAdmin()
    })

    $('#editarUsuarios').on('click',function(){
        llenarUsersAdmin()
    })

    $('#insertarProductos').on('click',function(){
        let contenidoAdmin = $('#contenidoAdmin');
            contenidoAdmin.html('');

            let productoString=        `<div class="formularioInsercionProducto col-12 bg-white border-top my-3">
                                        <form id="formInsertarProducto" class="container-fluid p-2">
                                            <div class="row">
                                                <div class="col-md-3 mb-2">
                                                    <label for="ID_PRODUCTO" class="form-label">ID Producto</label>
                                                    <input type="text" class="form-control form-control-sm" id="ID_PRODUCTO" name="ID_PRODUCTO" maxlength="6" required>
                                                </div>
                                                <div class="col-md-9 mb-2">
                                                    <label for="nombre" class="form-label">Nombre del producto</label>
                                                    <input type="text" class="form-control form-control-sm" id="nombre" name="nombre" maxlength="255" required>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6 mb-2">
                                                    <label for="tema" class="form-label">Tema</label>
                                                    <input type="text" class="form-control form-control-sm" id="tema" name="tema" maxlength="255" required>
                                                </div>
                                                <div class="col-md-6 mb-2">
                                                    <label for="num_piezas" class="form-label">Número de piezas</label>
                                                    <input type="number" class="form-control form-control-sm" id="num_piezas" name="num_piezas" min="1" required>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6 mb-2">
                                                    <label for="precio" class="form-label">Precio</label>
                                                    <input type="number" class="form-control form-control-sm" id="precio" name="precio" step="0.01" min="0" required>
                                                </div>
                                                <div class="col-md-6 mb-2">
                                                    <label for="tipo" class="form-label">Tipo</label>
                                                    <select class="form-select form-select-sm" id="tipo" name="tipo" required>
                                                        <option value="">Seleccione un tipo</option>
                                                        <option value="set">Set</option>
                                                        <option value="minifig">Minifig</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-12 mb-2">
                                                    <label for="imagen" class="form-label">Imagen del producto (.webp)</label>
                                                    <input type="file" class="form-control form-control-sm" id="imagen" name="imagen" accept=".webp" required>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-12 d-flex my-5 justify-content-center">
                                                    <button type="submit" class="btn btn-redLego px-2">Editar Producto</button>
                                                </div>
                                            </div>
                                            
                                        </form>
                                    </div>`
                        

                contenidoAdmin.html(productoString);
    })

    $('#insertarUsuarios').on('click',function(){
        let contenidoAdmin = $('#contenidoAdmin');
            contenidoAdmin.html('');

            let productoString= 
                                `<div class="formularioInsercionUsuario col-12 bg-white border-top my-3">
                                    <form id="formInsertarUsuario" class="container-fluid p-2">
                                        <div class="row">
                                            <div class="col-md-3 mb-2">
                                                <label for="username" class="form-label">Usuario</label>
                                                <input type="text" class="form-control form-control-sm" id="username" name="username" maxlength="50" required>
                                            </div>
                                            <div class="col-md-6 mb-2">
                                                <label for="password" class="form-label">Contraseña</label>
                                                <input type="text" class="form-control form-control-sm" id="password" name="password" maxlength="255" required>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6 mb-2">
                                                <label for="nombre" class="form-label">Nombre</label>
                                                <input type="text" class="form-control form-control-sm" id="nombre" name="nombre" maxlength="255" required>
                                            </div>
                                            <div class="col-md-6 mb-2">
                                                <label for="apellidos" class="form-label">Apellidos</label>
                                                <input type="text" class="form-control form-control-sm" id="apellidos" name="apellidos" maxlength="255" required>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-4 mb-2">
                                                <label for="poblacion" class="form-label">Población</label>
                                                <input type="text" class="form-control form-control-sm" id="poblacion" name="poblacion" maxlength="255" required>
                                            </div>
                                            <div class="col-md-4 mb-2">
                                                <label for="provincia" class="form-label">Provincia</label>
                                                <input type="text" class="form-control form-control-sm" id="provincia" name="provincia" maxlength="255" required>
                                            </div>
                                            <div class="col-md-4 mb-2">
                                                <label for="codigo_postal" class="form-label">Código Postal</label>
                                                <input type="text" class="form-control form-control-sm" id="codigo_postal" name="codigo_postal" maxlength="6" minlength="6" required>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6 mb-2">
                                                <label for="direccion" class="form-label">Dirección</label>
                                                <input type="text" class="form-control form-control-sm" id="direccion" name="direccion" maxlength="255" required>
                                            </div>
                                            <div class="col-md-3 mb-2 form-check d-flex align-items-center">
                                                <label class="form-check-label" for="root">Root</label>
                                                <input type="checkbox" class="form-check-input m-3" id="root" name="root">
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-12 d-flex my-5 justify-content-center">
                                                <button type="submit" class="btn btn-redLego px-2">Editar Usuario</button>
                                            </div>
                                        </div>
                                    </form>
                                    </div>
                                </div>`

            contenidoAdmin.html(productoString);
    })


//iconos editar y borrar
    $('#contenidoAdmin').on('click','.editarProducto',function(event){
        event.preventDefault();
        let productoAdmin = $(this).closest('.productoAdmin');
        let codigoProducto = productoAdmin.data('codigoproducto')
        productoAdmin.find('.formularioEdicionProducto').toggleClass('d-none')
        $.ajax({
            url: '../PHP/admin.php',
            type: 'POST',
            data:{
                'idProducto':codigoProducto,
                'accionProducto':'getDatos'
            },
            dataType: 'json',
            success: function (respuesta) {
                console.log(respuesta)
                
                productoAdmin.find('#ID_PRODUCTO').val(respuesta.ID_PRODUCTO);
                productoAdmin.find('#nombre').val(respuesta.nombre);
                productoAdmin.find('#tema').val(respuesta.tema);
                productoAdmin.find('#num_piezas').val(respuesta.num_piezas);
                productoAdmin.find('#precio').val(respuesta.precio);
                productoAdmin.find('#tipo').val(respuesta.tipo);
            
            },
            error: function () {
                alert('Error al cargar el formulario de edicion de Producto');
            }
        });
    })

    $('#contenidoAdmin').on('submit','#formEditarProducto',function(event){
        event.preventDefault();
        let codigoProducto = $(this).closest('.productoAdmin').data('codigoproducto')
        let formData = $(this).serialize();
        $.ajax({
            url: '../PHP/admin.php',
            type: 'POST',
            data:{
                'idProducto':codigoProducto,
                'accionProducto':'editar',
                'formData': formData
                //formdata pasa todos los datos del formulario como un string, asi ahorra tiempo y no paso varios elementos
            },
            dataType: 'json',
            success: function (respuesta) {
                console.log(respuesta)

                let mensaje = respuesta['message'] || respuesta['error'] || 'No hay mensaje disponible';
                mostrarPopup(mensaje);
                setTimeout(() =>{
                    llenarProductosAdmin()
                },3000)
            
            },
            error: function () {
                alert('Error al cargar los productos');
            }
        });

    })

    $('#contenidoAdmin').on('click','.borrarProducto',function(event){
        event.preventDefault();
        let codigoProducto = $(this).closest('.productoAdmin').data('codigoproducto')
        $.ajax({
            url: '../PHP/admin.php',
            type: 'POST',
            data:{
                'idProducto':codigoProducto,
                'accionProducto':'borrar'
            },
            dataType: 'json',
            success: function (respuesta) {
                console.log(respuesta)

                let mensaje = respuesta['message'] || respuesta['error'] || 'No hay mensaje disponible';
                mostrarPopup(mensaje);
                setTimeout(() =>{
                    llenarProductosAdmin()
                },3000)
            
            },
            error: function () {
                alert('Error al cargar los productos');
            }
        });
    })

    $('#contenidoAdmin').on('click','.editarUsuario',function(event){
        event.preventDefault();
        let usuarioAdmin = $(this).closest('.usuarioAdmin');
        let codigoUsuario = usuarioAdmin.data('codigousuario')
        usuarioAdmin.find('.formularioEdicionUsuario').toggleClass('d-none')
        $.ajax({
            url: '../PHP/admin.php',
            type: 'POST',
            data:{
                'idUsuario':codigoUsuario,
                'accionUsuario':'getDatos'
            },
            dataType: 'json',
            success: function (respuesta) {
                console.log(respuesta)

                usuarioAdmin.find('#ID_USER').val(respuesta.ID_USER)
                usuarioAdmin.find('#username').val(respuesta.username)
                usuarioAdmin.find('#password').val(respuesta.password)
                usuarioAdmin.find('#nombre').val(respuesta.nombre)
                usuarioAdmin.find('#apellidos').val(respuesta.apellidos)
                usuarioAdmin.find('#poblacion').val(respuesta.poblacion)
                usuarioAdmin.find('#provincia').val(respuesta.provincia)
                usuarioAdmin.find('#codigo_postal').val(respuesta.codigo_postal)
                usuarioAdmin.find('#direccion').val(respuesta.direccion)
                usuarioAdmin.find('#root').prop('checked', respuesta.root == 1);
                
            
            },
            error: function () {
                alert('Error al cargar el formulario de edicion');
            }
        });
    })

    $('#contenidoAdmin').on('submit','#formEditarUsuario',function(event){
        event.preventDefault();
        
        let codigoUsuario = $(this).closest('.usuarioAdmin').data('codigousuario')
        let formData = $(this).serialize();
        $.ajax({
            url: '../PHP/admin.php',
            type: 'POST',
            data:{
                'idUsuario':codigoUsuario,
                'accionUsuario':'editar',
                'formData': formData
                //formdata pasa todos los datos del formulario como un string, asi ahorra tiempo y no paso varios elementos
            },
            dataType: 'json',
            success: function (respuesta) {
                console.log(respuesta)

                let mensaje = respuesta['message'] || respuesta['error'] || 'No hay mensaje disponible';
                mostrarPopup(mensaje);
                setTimeout(() =>{
                    llenarUsersAdmin()
                },3000)
            
            },
            error: function () {
                alert('Error al cargar los productos');
            }
        });

    })

    $('#contenidoAdmin').on('click','.borrarUsuario',function(event){
        event.preventDefault();
        let codigoUsuario = $(this).closest('.usuarioAdmin').data('codigousuario')
        $.ajax({
            url: '../PHP/admin.php',
            type: 'POST',
            data:{
                'idUsuario':codigoUsuario,
                'accionUsuario':'borrar'
            },
            dataType: 'json',
            success: function (respuesta) {
                let mensaje = respuesta['message'] || respuesta['error'] || 'No hay mensaje disponible';
                mostrarPopup(mensaje);
                setTimeout(() =>{
                    llenarUsersAdmin()
                },3000)
            
            },
            error: function () {
                alert('Error al cargar los productos');
            }
        });
    })

    $('#contenidoAdmin').on('submit', '#formInsertarProducto', function(event) {
        event.preventDefault();
        
        let formData = new FormData(this);
        let idProducto = $('#ID_PRODUCTO').val();
    
        // Verificar si se seleccionó un archivo
        if ($('#imagen')[0].files.length > 0) {
            let file = $('#imagen')[0].files[0];
    
            // Verificar si el archivo es .webp
            if (file.type !== 'image/webp') {
                mostrarPopup('Por favor, seleccione una imagen en formato .webp');
                return;
            }
    
            // Renombrar el archivo y agregarlo a FormData
            let newFile = new File([file], idProducto + '.webp', {type: file.type});
            formData.set('imagen', newFile);
        }
    
        formData.append('accionProducto', 'insertar');
    
        $.ajax({
            url: '../PHP/admin.php',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            dataType: 'json',
            success: function(respuesta) {
                let mensaje = respuesta['message'] || respuesta['error'] || 'No hay mensaje disponible';
                mostrarPopup(mensaje);
                setTimeout(() => {
                    llenarProductosAdmin();
                }, 3000);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Error:', textStatus, errorThrown);
                alert('Error al insertar los productos');
            }
        });
    });
    
    


    $('#contenidoAdmin').on('submit','#formInsertarUsuario',function(event){
        event.preventDefault();
        let formData = $(this).serialize();
        $.ajax({
            url: '../PHP/admin.php',
            type: 'POST',
            data:{
                'accionUsuario':'insertar',
                'formData': formData
                //formdata pasa todos los datos del formulario como un string, asi ahorra tiempo y no paso varios elementos
            },
            dataType: 'json',
            success: function (respuesta) {
                console.log(respuesta)

                let mensaje = respuesta['message'] || respuesta['error'] || 'No hay mensaje disponible';
                mostrarPopup(mensaje);
                setTimeout(() =>{
                    llenarUsersAdmin()
                },3000)
            
            },
            error: function () {
                alert('Error al cargar los productos');
            }
        });

    })

})
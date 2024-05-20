$(function () {

    $.ajax({
        url: './home.html',
        type: 'GET',
        success: function (respuesta) {
            $('#body').html(respuesta)
        },
        error: function () {
            alert('Error al cargar la pagina Home');
        }
    });

    $('#navbar').on('click','#SETS',function(){
        $.ajax({
            url: './busqueda.html',
            type: 'GET',
            success: function (respuesta) {
                $('#body').html(respuesta)
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
            },
            error: function () {
                alert('Error al cargar la pagina Home');
            }
        });
    })

})
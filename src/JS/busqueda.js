//esta funcion es para solucionar un problema que tienen algunso navegadores que interpretan los elementos vacios de manera diferente, esto ignora elementos invisibles como espacios y saltos de linea
function isEmpty( el ){
    return !$.trim(el.html())
}

$(function (){

    if (isEmpty($('#productos'))) {
        $('#productos').html('<h2>No se encontraron productos según este criterio</h2>');
    }
    
})


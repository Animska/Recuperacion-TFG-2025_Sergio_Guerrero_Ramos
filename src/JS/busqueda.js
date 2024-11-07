//esta funcion es para solucionar un problema que tienen algunso navegadores que interpretan los elementos vacios de manera diferente, esto ignora elementos invisibles como espacios y saltos de linea
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


$(function (){

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


    if (isEmpty($('#productos'))) {
        $('#productos').html('<h2>No se encontraron productos según este criterio</h2>');
    }
})

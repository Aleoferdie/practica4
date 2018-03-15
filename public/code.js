$(document).ready(function() {
	$('#k2').on('click', function() {
		$.get('selector/?id=1', anadeInfo);  // Usamos la llamada simplificada a AJAX, pero se podría emplear la completa
	});
});

$(document).ready(function() {
	$('#armada').on('click', function() {
		$.get('selector/?id=2', anadeInfo);
	});
});

$(document).ready(function() {
	$('#atomic').on('click', function() {
		$.get('selector/?id=3', anadeInfo);
	});
});

function anadeInfo(info) {
	$('#info').html('<p><h3 class="text-secondary">Modelo: ' + info.Modelo + '</h3></p>' +
					'<b>Precio:</b> ' + info.Precio + '<br>' +
					'<b>Stock:</b> ' + info.Stock + '<br>' +
					'<b>Imagen:</b> <a href=' + info.Imagen +'>Imagen</a>'); // Se le da formato a la información recibida en objeto JSON
}
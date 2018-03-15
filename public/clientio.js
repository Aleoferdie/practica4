var socket = io.connect("http://localhost:8080");

socket.on('connect', function(datos) {
	//$('#estado').html('Te has conectado al chat');
	nickname = prompt('Cual es tu nickname?');
	socket.emit('unir', nickname);
	socket.nickname = nickname;
	console.log(socket.nickname);
});

socket.on('mensajeschat', function(datos) {
	//alert('Hay que introducir esta información en el chat: ' + datos.info);
	$('#chat').append(datos.info);
});

$(document).ready(function() {
	$('#chatform').submit(function(e) {
		var mensaje = $('#comment').val();
		socket.emit('mensajeschat', {info: mensaje});
	})
});

socket.on('unir', function(nombre) {
	//alert('Se ha unido ' + nombre);
	$('#chat').append('Se ha unido ' + nombre);
});

socket.on('borrar usuario', function(nombre) {
	//alert('Se ha desconectado el usuario ' + nombre);
	$('#chat').append('Se ha desconectado ' + nombre);
});


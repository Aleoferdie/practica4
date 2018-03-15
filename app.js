var express = require('express');
var app = express();
var path = require('path');
var http = require('http');
var fs = require('fs');
var util = require('util');
var querystring = require('querystring');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });
var maxData = 20 * 1024 * 1024; // 20 MB
var pug = require('pug');  		// Declaramos que vamos a emplear plantillas PUG
var port = process.env.PORT || 8080;
var logger = require('./logger');

app.use(logger);

app.use(express.static('public')); // igual es public

app.set('view engine', 'pug'); // busca plantillas PUG para su renderización en la carpeta views/

app.use(express.static('public')); // busca contenido en la carpeta especificada (imágenes, estilos, etc.)

app.get('/', function(request, response) {
	response.render('index');
});

app.get('/index', function(request, response) {
	response.render('index');
});

app.get('/about', function(request, response) {
	response.render('about');
});

app.get('/products', function(request, response) {
	response.render('products');
});

app.get('/contact', function(request, response) {
	response.render('contact');
});

app.get('/chat', function(request, response) {
	response.render('chat');
});

app.post('/confirm', parseUrlencoded, function(request, response) {
	var recibidos = request.body;
	//console.log('Se han recibido los datos...');
	response.render('confirm',
	{
		nombre: recibidos.nombre,
		apellido1: recibidos.apellido1,
		apellido2: recibidos.apellido2,
		genero: recibidos.genero,
		edad: recibidos.edad,
		email: recibidos.email,
		dir: recibidos.dir,
		num: recibidos.num,
		cp: recibidos.cp,
		mensaje: recibidos.mensaje
	});
});

app.get('/k2-pon2oon', function(request, response) {
	response.render('product',
	{
		modelo: 'K2 Pon2oon',
		precio: '1000€',
		stock: 'Disponible',
		desc: 'Esquís de freeride de K2. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean molestie augue in tellus sollicitudin, id consequat enim interdum. Vestibulum gravida quam id massa bibendum dignissim vel vel augue. Maecenas dapibus consequat vehicula.'
	});
});

app.get('/armada-ARV', function(request, response) {
	response.render('product',
	{
		modelo: 'Armada ARV 116',
		precio: '889€',
		stock: 'Disponible',
		desc: 'Esquís de freestyle de Armada. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean molestie augue in tellus sollicitudin, id consequat enim interdum. Vestibulum gravida quam id massa bibendum dignissim vel vel augue. Maecenas dapibus consequat vehicula.'
	});
});

app.get('/atomic-redster-s9', function(request, response) {
	response.render('product',
	{
		modelo: 'Atomic Redster S9',
		precio: '850€',
		stock: 'Disponible',
		desc: 'Esquís de competición de Atomic. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean molestie augue in tellus sollicitudin, id consequat enim interdum. Vestibulum gravida quam id massa bibendum dignissim vel vel augue. Maecenas dapibus consequat vehicula.'
	});
});

app.get('/webservices', function(request, response) {
	//console.log(request.query.id);
	var bloque = '';
	switch(request.query.id) {
		case '1':
			bloque = {'Modelo':'K2 Pon2oon','Precio':'1000€','Stock':'Disponible','Imagen':'/images/pon2oon1.jpg'};
			response.json(bloque);
			break;
		case '2':
			bloque = {'Modelo':'Armada ARV 116','Precio':'889€','Stock':'Disponible','Imagen':'/images/armada1.jpg'};
			response.json(bloque);	
			break;
		case '3':
			bloque = {'Modelo':'Atomic Redster S9S','Precio':'850€','Stock':'Disponible','Imagen':'/images/atomic1.jpg'};
			response.json(bloque);	
			break;
		default:
			response.render('webserv');
	}
});

app.get('/selector', function(request, response) {
	var info = '';
	switch(request.query.id) {
		case '1':
			info = {'Modelo':'K2 Pon2oon','Precio':'1000€','Stock':'Disponible','Imagen':'/images/pon2oon1.jpg'};
			response.json(info);
			break;
		case '2':
			info = {'Modelo':'Armada ARV 116','Precio':'889€','Stock':'Disponible','Imagen':'/images/armada1.jpg'};
			response.json(info);
			break;
		case '3':
			info = {'Modelo':'Atomic Redster S9','Precio':'850€','Stock':'Disponible','Imagen':'/images/atomic1.jpg'};
			response.json(info);	
			break;
		default:
			response.render('selector');		
	}
});

console.log('Servidor escuchando en el puerto 8080');

app.listen(port);
'use strict';

var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);

var _require = require('socket.io'),
    Server = _require.Server;

var io = new Server(server);
var dayjs = require('dayjs');

var PORT = 8080;

var productos = require('./Productos');
var mensajes = [];

app.use('/static', express.static('static'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    socket.emit('mensajes', mensajes);
    socket.on('nuevo-mensaje', function (mensaje) {
        mensaje.fecha = dayjs().format('DD/MM/YYYY HH:mm:ss');
        mensajes.push(mensaje);
        io.sockets.emit('enviar-mensaje', mensajes);
    });
    socket.emit('productos', { productos: productos.listarProductos });
    socket.on('nuevo-producto', function (producto) {
        productos.nuevoProd(producto);
        io.sockets.emit('enviar-producto', { productos: productos.listarProductos });
    });
});

server.listen(PORT, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Server listening on PORT", PORT);
    }
});

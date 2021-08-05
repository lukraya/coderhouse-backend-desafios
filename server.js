const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const {Server} = require('socket.io')
const io = new Server(server)
const dayjs = require('dayjs')

let PORT = 8080

let productos = require('./Productos')
let mensajes = []

app.use('/static', express.static('static'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket)=>{
    socket.emit('mensajes', mensajes)
    socket.on('nuevo-mensaje', (mensaje)=>{
        mensaje.fecha = dayjs().format('DD/MM/YYYY HH:mm:ss')
        mensajes.push(mensaje)
        //console.log(mensajes)
        io.sockets.emit('enviar-mensaje', mensajes)
    })
    /* socket.emit('productos', {productos: productos.listarProductos})
    socket.on('nuevo-producto', (producto)=>{
        productos.nuevoProd(producto)     
        io.sockets.emit('enviar-producto', {productos: productos.listarProductos})
    }) */
})

server.listen(PORT, (err) => {
    if (err) {console.log(err);}
    else {console.log("Server listening on PORT", PORT);}
})
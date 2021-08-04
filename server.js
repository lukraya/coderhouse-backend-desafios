const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const {Server} = require('socket.io')
const io = new Server(server)

let PORT = 8080

let productos = require('./Productos')

app.use('/static', express.static('static'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket)=>{
    //console.log(`Se conectó el socket ${socket.id}`)
    socket.emit('productos', {productos: productos.listarProductos})
    socket.on('nuevo-producto', (producto)=>{
        //console.log(productos.listarProductos)
        //console.log(`Nuevo producto: ${JSON.stringify(producto)}`)
        productos.nuevoProd(producto)        
        //console.log(productos.listarProductos)     
        io.sockets.emit('enviar-producto', {productos: productos.listarProductos})
    })
})

server.listen(PORT, (err) => {
    if (err) {console.log(err);}
    else {console.log("Server listening on PORT", PORT);}
})
const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const {Server} = require('socket.io')
const io = new Server(server)

let PORT = 8080

let productos = [
    {title: "prod1", price: 100, thumbnail: "url1"},
    {title: "prod2", price: 150, thumbnail: "url2"}
]

app.use('/static', express.static('static'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket)=>{
    console.log(`Se conectó el socket ${socket.id}`)
    socket.emit('productos', productos)
    socket.on('nuevo-producto', (producto)=>{
        //console.log(`Nuevo producto: ${JSON.stringify(producto)}`)
        productos.push(producto)
        io.sockets.emit('enviar-producto', [producto])
    })
})

server.listen(PORT, (err) => {
    if (err) {console.log(err);}
    else {console.log("Server listening on PORT", PORT);}
})
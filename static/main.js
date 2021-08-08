let socket = io()

function enviarMensaje () {
    socket.emit('nuevo-mensaje', {
        email: $("#email").val(),
        mensaje: $("#mensaje").val()
    })
    return false
}

function renderMensajes (mensajes) {
    let elHtml = mensajes.map((msj)=>{
        return (`
            <p><span class="email">${msj.email}:</span> <span class="fecha">[${msj.fecha}]</span> <span class="mensaje">${msj.mensaje}</span></p>
        `)
    })
    $("#mensajes").html(elHtml)
}

socket.on('mensajes', (data)=>{
    renderMensajes(data)
})

socket.on('enviar-mensaje', (data)=>{
    renderMensajes(data)
})

let templateTabla = Handlebars.compile(`
    <table class="table">
        <thead>
            <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Thumbnail</th>
            </tr>
        </thead>
        <tbody>
            {{#each productos}}
                <tr>
                    <td>{{this.title}}</td>
                    <td>{{this.price}}</td>
                    <td>{{this.thumbnail}}</td>
                </tr>
            {{/each}}
        </tbody>
    </table>
`)

let templateVacio = Handlebars.compile(`
    <p id="sinProd">No hay productos</p>
`)

function enviarProducto () {
    socket.emit('nuevo-producto', {
        title: $("#title").val(),
        price: $("#price").val(),
        thumbnail: $("#thumbnail").val()
    })
    return false
}

function renderProductos (productos) {
    if (productos.length > 0) {
        let elHtml = templateTabla({productos: productos})
        $("#listado").html(elHtml)
    } else {
        let elHtml = templateVacio()
        $("#listado").html(elHtml)
    }    
}

socket.on('productos', (data)=>{
    renderProductos(data.productos)
})

socket.on('enviar-producto', (data)=>{
    renderProductos(data.productos)
})
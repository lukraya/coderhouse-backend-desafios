let socket = io()

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
    //console.log($("#title").val())
    socket.emit('nuevo-producto', {
        title: $("#title").val(),
        price: $("#price").val(),
        thumbnail: $("#thumbnail").val()
    })
    return false
}

function renderProductos (productos) {
    //console.log(productos)
    if (productos.length > 0) {
        let elHtml = templateTabla({productos: productos})
        $("#listado").html(elHtml)
    } else {
        let elHtml = templateVacio()
        $("#listado").html(elHtml)
    }    
}


socket.on('productos', (data)=>{
    //console.log(data)
    renderProductos(data.productos)
})

socket.on('enviar-producto', (data)=>{
    //console.log(data)
    renderProductos(data.productos)
})
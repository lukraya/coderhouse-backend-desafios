let socket = io()

let template = Handlebars.compile(`
    {{#each productos}}
        <tr>
            <td>{{this.title}}</td>
            <td>{{this.price}}</td>
            <td>{{this.thumbnail}}</td>
        </tr>
    {{/each}}
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
    let elHtml = template({productos: productos})
    $("#tableBody").html(elHtml)
}

function renderUnProducto (producto) {
    let elHtml = template({productos: producto})
    $("#tableBody").append(elHtml)
}


socket.on('productos', (data)=>{
    //console.log(data)
    renderProductos(data)
})

socket.on('enviar-producto', (data)=>{
    //console.log(data)
    renderUnProducto(data)
})
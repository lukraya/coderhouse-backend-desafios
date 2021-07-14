const express = require('express');
const app = express();
const PORT = 8080;

let producto = require('./Productos');
  
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/productos', (req, res)=>{
    res.send(producto.listarProductos)
});

app.post('/productos', (req, res)=>{
    let toAdd = req.body;
    let prod = producto.nuevoProd(toAdd);
    res.send(prod)
});

app.get('/productos/:id', (req, res)=>{
    let id = req.params.id;
    res.send(producto.filtrarId(id))
})

app.listen(PORT, (err) => {
    if (err) {console.log(err);}
    else {console.log("Server listening on PORT", PORT);}
});
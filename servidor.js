const express = require('express');
const app = express();
const apiRouter = express.Router();
//const ejs = require('ejs');
const PORT = 8080;

let producto = require('./Productos');
  
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api', apiRouter);

app.set("view engine", "ejs");
app.set("views", "./views");

apiRouter.get('/productos', (req, res)=>{
    //res.send(producto.listarProductos)
    let productos = producto.listarProductos;
    //console.log(productos)
    res.render("pages/productos", {productos: productos})
});

apiRouter.get('/carga', (req, res)=>{
    res.render("pages/formulario")
})

apiRouter.post('/productos', (req, res)=>{
    let toAdd = req.body;
    /* let prod =  */producto.nuevoProd(toAdd);
    //res.send(prod)
    res.redirect('/api/carga')
});

apiRouter.get('/productos/:id', (req, res)=>{
    let id = req.params.id;
    res.send(producto.mostrarProd(id))
});

apiRouter.put('/productos/:id', (req, res)=>{
    let toChange = req.body;
    let id = req.params.id;
    res.send(producto.actualizarProducto(toChange, id))
});

apiRouter.delete('/productos/:id', (req, res)=>{
    let id = req.params.id;
    res.send(producto.eliminarProducto(id))
})

app.listen(PORT, (err) => {
    if (err) {console.log(err);}
    else {console.log("Server listening on PORT", PORT);}
});
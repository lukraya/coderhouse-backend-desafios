const express = require('express');
const app = express();
const apiRouter = express.Router();
//const handlebars = require('express-handlebars');
const pug = require('pug');
const PORT = 8080;

let producto = require('./Productos');
  
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api', apiRouter);
app.use('/static', express.static(__dirname + '/public'));

app.set("views", "./views");
app.set("view engine", "pug");

//Set up de hbs
/* app.engine("hbs",
    handlebars({
        extname: ".hbs",
        defaultLayout: "index.hbs",
        layoutsDir: __dirname + "/views/layouts",
        partialsDir: __dirname + "/views/partials"
})); */

/* apiRouter.get('/hello', (req, res)=>{
    let productos = producto.listarProductos;
    res.render('index',)
}) */

apiRouter.get('/productos', (req, res)=>{
    //res.send(producto.listarProductos)
    let productos = producto.listarProductos;
    //console.log(productos)
    res.render("productos", {prods: productos})
});

apiRouter.get('/carga', (req, res)=>{
    res.render("formulario")
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
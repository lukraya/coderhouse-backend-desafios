const express = require('express');
const app = express();
const PORT = 8080;
const apiRouter = express.Router();

let producto = require('./Productos');
  
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api', apiRouter);

//app.use('/static', express.static(__dirname + '/public'));

//Example router
/* apiRouter.get('/', (req, res)=>{
    res.send("Get request received")
}) */

apiRouter.get('/productos', (req, res)=>{
    res.send(producto.listarProductos)
});

apiRouter.post('/productos', (req, res)=>{
    let toAdd = req.body;
    let prod = producto.nuevoProd(toAdd);
    res.send(prod)
});

apiRouter.get('/productos/:id', (req, res)=>{
    let id = req.params.id;
    res.send(producto.filtrarId(id))
})

app.listen(PORT, (err) => {
    if (err) {console.log(err);}
    else {console.log("Server listening on PORT", PORT);}
});
class Producto {
    productos = [];
    id = 0;

    nuevoProd(producto) {
        this.productos.push({
            title: producto.title,
            price: producto.price,
            thumbnail: producto.thumbnail,
            id: ++this.id
        });

        return (this.productos[this.id - 1])
    }

    filtrarId(id) {
        if (this.productos[id-1] == undefined) {
            return '{error: "Producto no encontrado."}'
        }

        return this.productos[id-1]
    }

    get listarProductos() {
        if (this.productos.length == 0) {
            return '{error: "No hay productos cargados."}'
        }

        return this.productos
    }
}

module.exports= new Producto;
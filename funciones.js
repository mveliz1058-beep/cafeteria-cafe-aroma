// AGREGAR PRODUCTOS AL PEDIDO

function agregarProducto(nombre, precio) {

    let pedido = JSON.parse(localStorage.getItem("pedido")) || [];

    let productoExistente = pedido.find(
        producto => producto.nombre === nombre
    );

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        pedido.push({
            nombre: nombre,
            precio: precio,
            cantidad: 1
        });
    }

    localStorage.setItem("pedido", JSON.stringify(pedido));

    alert(nombre + " agregado correctamente al pedido.");
}


// MOSTRAR LOS PRODUCTOS DEL PEDIDO

function mostrarPedido() {

    let lista = document.getElementById("lista-pedido");

    if (!lista) return;

    let pedido = JSON.parse(localStorage.getItem("pedido")) || [];

    lista.innerHTML = "";

    let total = 0;

    if (pedido.length === 0) {
        lista.textContent = "Todavía no has agregado productos.";
    }

    pedido.forEach((producto, indice) => {

        let subtotal = producto.precio * producto.cantidad;
        total += subtotal;

        let elemento = document.createElement("div");
        elemento.className = "item-pedido";

        let informacion = document.createElement("div");

        let nombre = document.createElement("strong");
        nombre.textContent = producto.nombre;

        let detalle = document.createElement("p");
        detalle.textContent =
            "Cantidad: " + producto.cantidad +
            " | Precio: $" + producto.precio.toFixed(2);

        let importe = document.createElement("p");
        importe.textContent = "Subtotal: $" + subtotal.toFixed(2);

        informacion.append(nombre, detalle, importe);

        let boton = document.createElement("button");
        boton.type = "button";
        boton.className = "boton-eliminar";
        boton.textContent = "Eliminar";

        boton.addEventListener("click", function () {
            eliminarProducto(indice);
        });

        elemento.append(informacion, boton);
        lista.appendChild(elemento);
    });

    document.getElementById("total").textContent = total.toFixed(2);
}


// ELIMINAR PRODUCTOS

function eliminarProducto(indice) {

    let pedido = JSON.parse(localStorage.getItem("pedido")) || [];

    pedido.splice(indice, 1);

    localStorage.setItem("pedido", JSON.stringify(pedido));

    mostrarPedido();
}


// CONFIRMAR EL PEDIDO

document.addEventListener("DOMContentLoaded", function () {

    mostrarPedido();

    let formulario = document.getElementById("formulario");

    if (!formulario) return;

    formulario.addEventListener("submit", function (evento) {

        evento.preventDefault();

        let pedido = JSON.parse(localStorage.getItem("pedido")) || [];

        if (pedido.length === 0) {
            alert("Primero debes agregar productos al pedido.");
            return;
        }

        if (!formulario.checkValidity()) {
            formulario.reportValidity();
            return;
        }

        let nombre = document.getElementById("nombre").value.trim();

        let mensaje = document.getElementById("mensaje");

        mensaje.textContent =
            "¡Gracias, " + nombre +
            "! Tu pedido ha sido registrado correctamente.";

        // Vaciar el pedido después de confirmarlo
        localStorage.removeItem("pedido");

        formulario.reset();

        mostrarPedido();
    });

});
// carrito.js

// Función para agregar productos al carrito
function agregarAlCarrito(event) {
    event.preventDefault(); // Prevenir la acción por defecto del formulario

    // Obtener los datos del formulario
    const formulario = event.target;
    const cantidad = formulario.querySelector('input[type="number"]').value;
    const talla = formulario.querySelector('select') ? formulario.querySelector('select').value : null;
    const producto = formulario.closest('.camisa');
    const nombreProducto = producto.querySelector('h1').textContent;
    const imagenProducto = producto.querySelector('img').src;

    // Si no se especifica cantidad, se asigna 1 por defecto
    const cantidadFinal = cantidad ? parseInt(cantidad) : 1;

    // Crear un objeto con los detalles del producto
    const productoEnCarrito = {
        nombre: nombreProducto,
        cantidad: cantidadFinal,
        talla: talla,
        imagen: imagenProducto
    };

    // Obtener el carrito del LocalStorage, o crear uno nuevo si no existe
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Comprobar si el producto ya está en el carrito
    const productoExistente = carrito.find(item => item.nombre === productoEnCarrito.nombre && item.talla === productoEnCarrito.talla);
    
    if (productoExistente) {
        // Si el producto ya está en el carrito, aumentar la cantidad
        productoExistente.cantidad += cantidadFinal;
    } else {
        // Si el producto no está en el carrito, agregarlo
        carrito.push(productoEnCarrito);
    }

    // Guardar el carrito actualizado en el LocalStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Mostrar el mensaje de confirmación
    alert('Producto agregado al carrito');
}

// Asignar el evento de agregar al carrito a cada formulario
const formularios = document.querySelectorAll('.formulario');
formularios.forEach(formulario => {
    formulario.addEventListener('submit', agregarAlCarrito);
});

// Función para mostrar los productos del carrito en la página de carrito.html
function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    const carritoContenedor = document.querySelector('.carrito-contenedor');
    if (carrito.length === 0) {
        carritoContenedor.innerHTML = '<p>No hay productos en el carrito.</p>';
        return;
    }

    carritoContenedor.innerHTML = '';
    carrito.forEach(producto => {
        const productoElemento = document.createElement('div');
        productoElemento.classList.add('producto-carrito');
        
        const tallaTexto = producto.talla ? ` - Talla: ${producto.talla}` : '';
        productoElemento.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-imagen">
            <div class="producto-info">
                <h3>${producto.nombre}</h3>
                <p>Cantidad: ${producto.cantidad}${tallaTexto}</p>
            </div>
        `;

        carritoContenedor.appendChild(productoElemento);
    });
}

// Llamar a mostrarCarrito solo si estamos en la página de carrito
if (window.location.pathname.includes('carrito.html')) {
    mostrarCarrito();
}

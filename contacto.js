// ========================================
// CARRITO SIMULADO
// ========================================

let carrito = Number(localStorage.getItem("carrito")) || 0;

const contadorCarrito = document.getElementById("contador-carrito");

function actualizarContadorCarrito() {
    contadorCarrito.textContent = carrito;
}

actualizarContadorCarrito();


// ========================================
// ELEMENTOS DEL FORMULARIO
// ========================================

const formulario = document.getElementById("formulario-contacto");

const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const mensaje = document.getElementById("mensaje");

const errorNombre = document.getElementById("error-nombre");
const errorEmail = document.getElementById("error-email");
const errorMensaje = document.getElementById("error-mensaje");

const mensajeExito = document.getElementById("mensaje-exito");


// ========================================
// FUNCIONES DE VALIDACIÓN
// ========================================

function validarNombre() {
    const valor = nombre.value.trim();

    if (valor === "") {
        errorNombre.textContent = "Por favor, ingresá tu nombre.";
        return false;
    }

    if (valor.length < 2) {
        errorNombre.textContent = "El nombre debe tener al menos 2 caracteres.";
        return false;
    }

    errorNombre.textContent = "";
    return true;
}


function validarEmail() {
    const valor = email.value.trim();

    const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (valor === "") {
        errorEmail.textContent = "Por favor, ingresá tu email.";
        return false;
    }

    if (!formatoEmail.test(valor)) {
        errorEmail.textContent = "Ingresá un email válido.";
        return false;
    }

    errorEmail.textContent = "";
    return true;
}


function validarMensaje() {
    const valor = mensaje.value.trim();

    if (valor === "") {
        errorMensaje.textContent = "Por favor, escribí un mensaje.";
        return false;
    }

    if (valor.length < 10) {
        errorMensaje.textContent = "El mensaje debe tener al menos 10 caracteres.";
        return false;
    }

    errorMensaje.textContent = "";
    return true;
}


// ========================================
// ENVÍO DEL FORMULARIO
// ========================================

formulario.addEventListener("submit", function (event) {

    // Evita que el formulario recargue la página
    event.preventDefault();

    // Limpiamos mensaje anterior
    mensajeExito.textContent = "";

    // Ejecutamos todas las validaciones
    const nombreValido = validarNombre();
    const emailValido = validarEmail();
    const mensajeValido = validarMensaje();

    // Si hay algún error, no continuamos
    if (!nombreValido || !emailValido || !mensajeValido) {
        return;
    }

    // ========================================
    // MENSAJE DE ÉXITO MEDIANTE EL DOM
    // ========================================

    mensajeExito.textContent =
        `¡Gracias, ${nombre.value.trim()}! Tu mensaje fue enviado correctamente.`;

    // Limpiamos el formulario después del envío
    formulario.reset();
});


// ========================================
// VALIDACIÓN EN TIEMPO REAL
// ========================================

nombre.addEventListener("input", validarNombre);

email.addEventListener("input", validarEmail);

mensaje.addEventListener("input", validarMensaje);
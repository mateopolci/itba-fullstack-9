document.addEventListener("DOMContentLoaded", () => {
    // ========================================
    // PRODUCTOS
    // ========================================

    const productos = [
        {
            id: 1,
            nombre: "Aparador Uspallata",
            imagen: "assets/images/aparador_uspallata.png",
            descripcion:
                "Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón.",
            materiales: "Nogal macizo FSC®, herrajes de latón",
        },
        {
            id: 2,
            nombre: "Biblioteca Recoleta",
            imagen: "assets/images/biblioteca_recoleta.png",
            descripcion:
                "Sistema modular de estantes abierto que combina estructura de acero Sage Green y repisas en roble claro.",
            materiales: "Acero Sage Green y roble",
        },
        {
            id: 3,
            nombre: "Butaca Mendoza",
            imagen: "assets/images/butaca_mendoza.png",
            descripcion:
                "Butaca tapizada en bouclé Dusty Rose con base de madera de guatambú.",
            materiales: "Guatambú macizo y tela bouclée",
        },
        {
            id: 4,
            nombre: "Sillón Copacabana",
            imagen: "assets/images/sillon_copacabana.png",
            descripcion: "Sillón lounge en cuero cognac con base giratoria.",
            materiales: "Estructura de acero y cuero premium",
        },
        {
            id: 5,
            nombre: "Mesa de Centro Araucaria",
            imagen: "assets/images/mesa_de_centro_araucaria.png",
            descripcion:
                "Mesa de centro con sobre circular de mármol Patagonia y base de nogal.",
            materiales: "Mármol Patagonia y nogal",
        },
        {
            id: 6,
            nombre: "Mesa de Noche Aconcagua",
            imagen: "assets/images/mesa_de_noche_aconcagua.png",
            descripcion: "Mesa de noche con cajón oculto y repisa inferior.",
            materiales: "Roble macizo FSC®",
        },
        {
            id: 7,
            nombre: "Sofá Patagonia",
            imagen: "assets/images/sofa_patagonia.png",
            descripcion:
                "Sofá de tres cuerpos tapizado en lino Warm Alabaster.",
            materiales: "Madera de eucalipto y lino natural",
        },
        {
            id: 8,
            nombre: "Mesa Comedor Pampa",
            imagen: "assets/images/mesa_comedor_pampa.png",
            descripcion:
                "Mesa extensible de roble macizo para 6 a 10 comensales.",
            materiales: "Roble macizo FSC®",
        },
        {
            id: 9,
            nombre: "Sillas Córdoba",
            imagen: "assets/images/sillas_cordoba.png",
            descripcion:
                "Set de cuatro sillas apilables en contrachapado moldeado de nogal.",
            materiales: "Contrachapado de nogal y acero",
        },
        {
            id: 10,
            nombre: "Escritorio Costa",
            imagen: "assets/images/escritorio_costa.png",
            descripcion:
                "Escritorio compacto con cajón organizado y tapa pasacables integrada.",
            materiales: "Bambú laminado y herrajes ocultos",
        },
        {
            id: 11,
            nombre: "Silla de Trabajo Belgrano",
            imagen: "assets/images/silla_de_trabajo_belgrano.png",
            descripcion:
                "Silla ergonómica regulable en altura con respaldo de malla transpirable.",
            materiales: "Malla técnica y tejido reciclado",
        },
    ];

    const rutaBase = window.location.pathname.includes("/pages/") ? "../" : "";
    const rutaPaginas = window.location.pathname.includes("/pages/")
        ? ""
        : "pages/";

    // ========================================
    // ELEMENTOS DEL DOM
    // ========================================

    const grillaCatalogo = document.getElementById("grilla-catalogo");

    const buscador = document.getElementById("buscador");

    const sinResultados = document.getElementById("sin-resultados");

    const loaderCatalogo = document.getElementById("loader-catalogo");

    const detalleProducto = document.getElementById("detalle-producto");

    let catalogoCargado = false;

    // ========================================
    // CARRITO
    // ========================================

    let carrito = cargarCarrito();

    const contadorCarrito = document.getElementById("contador-carrito");

    const abrirCarrito = document.getElementById("abrir-carrito");

    const cerrarCarrito = document.getElementById("cerrar-carrito");

    const carritoPanel = document.getElementById("carrito-panel");

    const carritoItems = document.getElementById("carrito-items");

    const carritoTotal = document.getElementById("carrito-total");

    const vaciarCarrito = document.getElementById("vaciar-carrito");

    const confirmarCompra = document.getElementById("confirmar-compra");

    let notificacionTemporizador;

    function mostrarNotificacion(mensaje) {
        let notificacion = document.getElementById("notificacion");

        if (!notificacion) {
            notificacion = document.createElement("div");
            notificacion.id = "notificacion";
            notificacion.className = "notificacion";
            notificacion.setAttribute("role", "status");
            notificacion.setAttribute("aria-live", "polite");
            document.body.appendChild(notificacion);
        }

        clearTimeout(notificacionTemporizador);
        notificacion.textContent = mensaje;
        notificacion.classList.add("notificacion-visible");

        notificacionTemporizador = setTimeout(() => {
            notificacion.classList.remove("notificacion-visible");
        }, 3000);
    }

    function cargarCarrito() {
        try {
            const carritoGuardado = JSON.parse(
                localStorage.getItem("carrito") || "[]",
            );

            return Array.isArray(carritoGuardado) ? carritoGuardado : [];
        } catch (error) {
            return [];
        }
    }

    function guardarCarrito() {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }

    function actualizarContadorCarrito() {
        if (!contadorCarrito) {
            return;
        }

        contadorCarrito.textContent = carrito.length;
    }

    function abrirPanelCarrito() {
        if (!carritoPanel) {
            return;
        }

        carritoPanel.hidden = false;

        renderizarCarrito();
    }

    function cerrarPanelCarrito() {
        if (!carritoPanel) {
            return;
        }

        carritoPanel.hidden = true;
    }

    function agregarAlCarrito(producto) {
        carrito.push({ ...producto });

        guardarCarrito();
        actualizarContadorCarrito();

        mostrarNotificacion(`${producto.nombre} fue agregado al carrito.`);
    }

    function renderizarCarrito() {
        if (!carritoItems) {
            return;
        }

        carritoItems.innerHTML = "";

        if (carrito.length === 0) {
            carritoItems.innerHTML = "<p>Tu carrito está vacío.</p>";

            if (carritoTotal) {
                carritoTotal.textContent = "$0";
            }

            return;
        }

        if (carritoTotal) {
            carritoTotal.textContent = `${carrito.length} producto${carrito.length === 1 ? "" : "s"}`;
        }

        carrito.forEach((producto, indice) => {
            const item = document.createElement("article");

            item.className = "carrito-item";
            item.innerHTML = `
                <img src="${rutaBase}${producto.imagen}" alt="${producto.nombre}">
                <div>
                    <h3>${producto.nombre}</h3>
                    <p>${producto.materiales}</p>
                    <button type="button" data-indice-producto="${indice}">
                        Quitar producto
                    </button>
                </div>
            `;

            carritoItems.appendChild(item);
        });
    }

    if (abrirCarrito) {
        abrirCarrito.addEventListener("click", abrirPanelCarrito);
    }

    if (cerrarCarrito) {
        cerrarCarrito.addEventListener("click", cerrarPanelCarrito);
    }

    if (carritoPanel) {
        carritoPanel.addEventListener("click", (event) => {
            if (event.target === carritoPanel) {
                cerrarPanelCarrito();
            }
        });
    }

    if (carritoItems) {
        carritoItems.addEventListener("click", (event) => {
            const botonQuitar = event.target.closest("[data-indice-producto]");

            if (!botonQuitar) {
                return;
            }

            carrito.splice(Number(botonQuitar.dataset.indiceProducto), 1);

            guardarCarrito();
            actualizarContadorCarrito();
            renderizarCarrito();
        });
    }

    if (vaciarCarrito) {
        vaciarCarrito.addEventListener("click", vaciarCarritoCompleto);
    }

    function vaciarCarritoCompleto() {
        carrito = [];

        guardarCarrito();
        actualizarContadorCarrito();
        renderizarCarrito();
    }

    if (confirmarCompra) {
        confirmarCompra.addEventListener("click", () => {
            if (carrito.length === 0) {
                mostrarNotificacion(
                    "El carrito está vacio, añada productos para realizar una compra",
                );
                return;
            }

            mostrarNotificacion("Gracias por su compra");
            vaciarCarritoCompleto();
        });
    }

    // ========================================
    // RENDERIZADO DE PRODUCTOS
    // ========================================

    function renderizarProductos(lista) {
        if (!grillaCatalogo) {
            return;
        }

        grillaCatalogo.innerHTML = "";

        if (sinResultados) {
            sinResultados.hidden = lista.length !== 0;
        }

        lista.forEach((producto) => {
            const card = document.createElement("article");

            card.className = "card";

            card.innerHTML = `
                <img
                    src="${rutaBase}${producto.imagen}"
                    alt="${producto.nombre}"
                    loading="lazy"
                >

                <h3>
                    ${producto.nombre}
                </h3>

                <a
                    href="${rutaPaginas}producto.html?id=${producto.id}"
                    class="ver-detalle"
                >
                    Ver detalle
                </a>
            `;

            grillaCatalogo.appendChild(card);
        });
    }

    function simularCargaCatalogo() {
        return new Promise((resolve) => {
            setTimeout(() => resolve(productos), 1500);
        });
    }

    async function cargarCatalogo() {
        if (!grillaCatalogo) {
            return;
        }

        if (loaderCatalogo) {
            loaderCatalogo.hidden = false;
        }

        grillaCatalogo.hidden = true;

        const catalogo = await simularCargaCatalogo();

        catalogoCargado = true;
        renderizarProductos(catalogo);
        grillaCatalogo.hidden = false;

        if (loaderCatalogo) {
            loaderCatalogo.hidden = true;
        }
    }

    function renderizarDetalle() {
        if (!detalleProducto) {
            return;
        }

        const id = Number(
            new URLSearchParams(window.location.search).get("id"),
        );

        const producto = productos.find((item) => item.id === id);

        if (!producto) {
            detalleProducto.innerHTML = `
                <p class="eyebrow">Producto no encontrado</p>
                <h1>No encontramos ese producto</h1>
                <a href="${rutaPaginas}productos.html" class="btn-hero">Volver al catálogo</a>
            `;

            return;
        }

        document.title = `${producto.nombre} | Hermanos Jota`;

        detalleProducto.innerHTML = `
            <a href="${rutaPaginas}productos.html" class="volver-catalogo">
                ← Volver al catálogo
            </a>
            <div class="detalle-producto-contenido">
                <img src="${rutaBase}${producto.imagen}" alt="${producto.nombre}">
                <div>
                    <p class="eyebrow">Colección Hermanos Jota</p>
                    <h1>${producto.nombre}</h1>
                    <p>${producto.descripcion}</p>
                    <p><strong>Materiales:</strong> ${producto.materiales}</p>
                    <button type="button" id="agregar-detalle">Agregar al carrito</button>
                </div>
            </div>
        `;

        const agregarDetalle = document.getElementById("agregar-detalle");

        agregarDetalle.addEventListener("click", () =>
            agregarAlCarrito(producto),
        );
    }

    // ========================================
    // BÚSQUEDA
    // ========================================

    function buscarProductos() {
        if (!buscador || !catalogoCargado) {
            return;
        }

        const termino = buscador.value.trim().toLowerCase();

        if (termino === "") {
            renderizarProductos(productos);

            return;
        }

        const resultados = productos.filter((producto) => {
            const texto = `${producto.nombre}
                    ${producto.descripcion}
                    ${producto.materiales}`.toLowerCase();

            return texto.includes(termino);
        });

        renderizarProductos(resultados);
    }

    if (buscador) {
        buscador.addEventListener("input", buscarProductos);
    }

    // ========================================
    // FORMULARIO DE CONTACTO
    // ========================================

    const formulario = document.getElementById("formulario-contacto");

    if (formulario) {
        const nombre = document.getElementById("nombre");

        const email = document.getElementById("email");

        const mensaje = document.getElementById("mensaje");

        const errorNombre = document.getElementById("error-nombre");

        const errorEmail = document.getElementById("error-email");

        const errorMensaje = document.getElementById("error-mensaje");

        const mensajeExito = document.getElementById("mensaje-exito");

        // ========================================
        // VALIDAR NOMBRE
        // ========================================

        function validarNombre() {
            const valor = nombre.value.trim();

            if (valor === "") {
                errorNombre.textContent = "Por favor, ingresá tu nombre.";

                return false;
            }

            if (valor.length < 2) {
                errorNombre.textContent =
                    "El nombre debe tener al menos 2 caracteres.";

                return false;
            }

            errorNombre.textContent = "";

            return true;
        }

        // ========================================
        // VALIDAR EMAIL
        // ========================================

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

        // ========================================
        // VALIDAR MENSAJE
        // ========================================

        function validarMensaje() {
            const valor = mensaje.value.trim();

            if (valor === "") {
                errorMensaje.textContent = "Por favor, escribí un mensaje.";

                return false;
            }

            if (valor.length < 10) {
                errorMensaje.textContent =
                    "El mensaje debe tener al menos 10 caracteres.";

                return false;
            }

            errorMensaje.textContent = "";

            return true;
        }

        // ========================================
        // ENVÍO DEL FORMULARIO
        // ========================================

        formulario.addEventListener("submit", (event) => {
            event.preventDefault();

            mensajeExito.textContent = "";

            const nombreValido = validarNombre();

            const emailValido = validarEmail();

            const mensajeValido = validarMensaje();

            if (!nombreValido || !emailValido || !mensajeValido) {
                return;
            }

            mensajeExito.textContent =
                `¡Gracias, ${nombre.value.trim()}! ` +
                "Tu mensaje fue enviado correctamente.";

            formulario.reset();
        });

        // ========================================
        // VALIDACIÓN EN TIEMPO REAL
        // ========================================

        nombre.addEventListener("input", validarNombre);

        email.addEventListener("input", validarEmail);

        mensaje.addEventListener("input", validarMensaje);
    }

    // ========================================
    // INICIALIZACIÓN
    // ========================================

    actualizarContadorCarrito();

    cargarCatalogo();

    renderizarDetalle();
});

const btnGenerar = document.getElementById("btn-Generar");
const selectCantidad = document.getElementById("select-Cantidad");
const selectFormato = document.getElementById("select-Formato");
const contenedor = document.getElementById("contenedor");

const btnGuardar = document.getElementById("btn-Guardar");

const contenedorGuardadas =
    document.getElementById("paletas-Guardadas");

const btnMostrarGuardadas =
    document.getElementById("btn-MostrarGuardadas");

const listaGuardadas =
    document.getElementById("lista-Guardadas");


function getRandomHex() {
    const letters = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
}

function getRandomHSL() {
    const h = Math.floor(Math.random() * 360);
    const s = Math.floor(Math.random() * 50) + 40;
    const l = Math.floor(Math.random() * 50) + 40;

    // Cambio de fórmula, para generar mejores colores y que sean más visibles en la paleta

    return `hsl(${h}, ${s}%, ${l}%)`;
}

// Genera un color según el formato seleccionado
function generarColor() {
    const formato = selectFormato.value;

    return formato === "HEX"
        ? getRandomHex()
        : getRandomHSL();
}

// Generar la paleta
function generarPaleta() {
    if (!contenedor) return;

    const cantidad = parseInt(selectCantidad.value, 10);

    // Guardamos los colores que estaban bloqueados
    const tarjetasAnteriores = [...contenedor.querySelectorAll(".color-card")];

    const coloresBloqueados = tarjetasAnteriores.map((card) => {
        return {
            color: card.dataset.color,
            bloqueado: card.classList.contains("bloqueado")
        };
    });

    // Limpiamos el contenedor
    contenedor.innerHTML = "";

    for (let i = 0; i < cantidad; i++) {

        let colorValue;

        // Si existe un color bloqueado en esta posición,
        // lo mantenemos
        if (
            coloresBloqueados[i] &&
            coloresBloqueados[i].bloqueado
        ) {
            colorValue = coloresBloqueados[i].color;
        } else {
            colorValue = generarColor();
        }

        // Crear tarjeta
        const colorCard = document.createElement("div");
        colorCard.classList.add("color-card");

        colorCard.style.backgroundColor = colorValue;

        // Guardamos el color dentro de la tarjeta
        colorCard.dataset.color = colorValue;

        // Texto del color
        const colorText = document.createElement("span");
        colorText.textContent = colorValue;

        // Texto que aparece al pasar el mouse
        const copyHint = document.createElement("small");
        copyHint.textContent = "Clic para copiar";
        copyHint.classList.add("copy-hint");


        // Evento para copiar el color
        colorCard.addEventListener("click", async () => {
            try {
                await navigator.clipboard.writeText(colorValue);

                copyHint.textContent = "¡Copiado! ✓";
                copyHint.classList.add("copiado");

                setTimeout(() => {
                    copyHint.textContent = "Clic para copiar";
                    copyHint.classList.remove("copiado");
                }, 1500);

            } catch (error) {
                copyHint.textContent = "No se pudo copiar";
            }
        });

        // Botón de bloqueo
        const lockButton = document.createElement("button");
        lockButton.classList.add("lock-button");

        // Comprobar si esta tarjeta estaba bloqueada
        if (
            coloresBloqueados[i] &&
            coloresBloqueados[i].bloqueado
        ) {
            colorCard.classList.add("bloqueado");
            lockButton.textContent = "🔒";
            lockButton.title = "Desbloquear color";
        } else {
            lockButton.textContent = "🔓";
            lockButton.title = "Bloquear color";
        }

        // Evento del botón
        lockButton.addEventListener("click", (event) => {

            // Evita que el click haga otras acciones
            event.stopPropagation();

            colorCard.classList.toggle("bloqueado");

            if (colorCard.classList.contains("bloqueado")) {
                lockButton.textContent = "🔒";
                lockButton.title = "Desbloquear color";
            } else {
                lockButton.textContent = "🔓";
                lockButton.title = "Bloquear color";
            }
        });

        // Agregamos elementos a la tarjeta
        colorCard.appendChild(lockButton);
        colorCard.appendChild(colorText);
        colorCard.appendChild(copyHint);

        // Agregamos tarjeta al contenedor
        contenedor.appendChild(colorCard);
    }
}

// Uso de toast para un anuncio de paleta generada
function mostrarToast(mensaje = "¡Paleta Generada!") {
    const toast = document.getElementById("toast");

    if (!toast) return;

    toast.textContent = mensaje;
    toast.style.display = "block";

    setTimeout(() => {
        toast.style.display = "none";
        toast.textContent = "¡Paleta Generada!";
    }, 1000);
}

// Obtener las paletas guardadas
function obtenerPaletasGuardadas() {

    let paletas = [];

    try {
        paletas =
            JSON.parse(
                localStorage.getItem("paletasGuardadas")
            ) || [];
    } catch (error) {
        paletas = [];
    }

    // Eliminamos las paletas antiguas que tengan una estructura incorrecta
    paletas = paletas.filter((paleta) => {

        return (
            paleta &&
            paleta.id &&
            Array.isArray(paleta.colores) &&
            paleta.colores.length > 0 &&
            paleta.colores.every(
                (colorData) =>
                    colorData &&
                    colorData.color
            )
        );
    });

    // Guardamos nuevamente solo las paletas válidas
    localStorage.setItem(
        "paletasGuardadas",
        JSON.stringify(paletas)
    );

    return paletas;
}

// Guardar la paleta actual
function guardarPaleta() {

    const tarjetas = [...contenedor.querySelectorAll(".color-card")];

    if (tarjetas.length === 0) {
        return;
    }

    // Obtener los colores actuales
    const colores = tarjetas.map((card) => {
        return {
            color: card.dataset.color,
            bloqueado: card.classList.contains("bloqueado")
        };
    });

    const paletas = obtenerPaletasGuardadas();

    // Crear nueva paleta
    const nuevaPaleta = {
        id: Date.now(),
        colores: colores,
        formato: selectFormato.value
    };

    // Agregar la nueva paleta
    paletas.push(nuevaPaleta);

    // Guardar en LocalStorage
    localStorage.setItem(
        "paletasGuardadas",
        JSON.stringify(paletas)
    );

    // Actualizar menú
    mostrarPaletasGuardadas();

    mostrarToast("¡Paleta guardada!");
}

// Mostrar las paletas guardadas en el menú
function mostrarPaletasGuardadas() {

    const paletas = obtenerPaletasGuardadas();

    listaGuardadas.innerHTML = "";

    // Si no hay paletas, ocultamos el menú
    if (paletas.length === 0) {
        listaGuardadas.classList.remove("abierto");
        return;
    }

    // Crear las opciones
    paletas.forEach((paleta) => {

        const item = document.createElement("div");
        item.classList.add("paleta-Guardadas");


        // Vista previa de los colores de la paleta
        const vistaColores = document.createElement("div");
        vistaColores.classList.add("vista-colores");


        // Crear los pequeños recuadros de color
        paleta.colores.forEach((colorData) => {

            const colorMini = document.createElement("div");

            colorMini.classList.add("color-mini");

            colorMini.style.backgroundColor =
                colorData.color;

            colorMini.title =
                colorData.color;

            vistaColores.appendChild(colorMini);
        });


        // Cargar la paleta seleccionada
        vistaColores.addEventListener("click", () => {

            cargarPaleta(paleta.id);

            listaGuardadas.classList.remove(
                "abierto"
            );
        });


        // Botón para eliminar la paleta
        const btnEliminar =
            document.createElement("button");

        btnEliminar.classList.add(
            "eliminar-paleta"
        );

        btnEliminar.textContent = "✕";

        btnEliminar.title =
            "Eliminar paleta";


        // Evento para eliminar la paleta
        btnEliminar.addEventListener(
            "click",
            (event) => {

                // Evita que se cargue la paleta
                event.stopPropagation();

                eliminarPaleta(paleta.id);
            }
        );


        item.appendChild(vistaColores);
        item.appendChild(btnEliminar);

        listaGuardadas.appendChild(item);
    });
}

// Cargar una paleta guardada
// Cargar una paleta guardada
function cargarPaleta(id) {

    const paletas = obtenerPaletasGuardadas();

    const paleta = paletas.find(
        (paleta) => paleta.id === Number(id)
    );

    if (
        !paleta ||
        !Array.isArray(paleta.colores) ||
        paleta.colores.length === 0
    ) {
        return;
    }

    // Limpiamos el contenedor
    contenedor.innerHTML = "";

    // Cambiar el formato
    selectFormato.value = paleta.formato;

    // Cambiar la cantidad
    selectCantidad.value = paleta.colores.length;

    // Crear nuevamente las tarjetas
    paleta.colores.forEach((colorData) => {

        const colorCard = document.createElement("div");

        colorCard.classList.add("color-card");

        colorCard.style.backgroundColor =
            colorData.color;

        // Guardamos el color dentro de la tarjeta
        colorCard.dataset.color =
            colorData.color;

        // Comprobar si el color estaba bloqueado
        if (colorData.bloqueado) {
            colorCard.classList.add("bloqueado");
        }

        // Texto del color
        const colorText = document.createElement("span");

        colorText.textContent =
            colorData.color;

        // Texto que aparece al pasar el mouse
        const copyHint = document.createElement("small");

        copyHint.textContent =
            "Clic para copiar";

        copyHint.classList.add("copy-hint");

        // Evento para copiar el color
        colorCard.addEventListener("click", async () => {

            try {

                await navigator.clipboard.writeText(
                    colorData.color
                );

                copyHint.textContent =
                    "¡Copiado! ✓";

                copyHint.classList.add("copiado");

                setTimeout(() => {

                    copyHint.textContent =
                        "Clic para copiar";

                    copyHint.classList.remove(
                        "copiado"
                    );

                }, 1500);

            } catch (error) {

                copyHint.textContent =
                    "No se pudo copiar";
            }
        });

        // Botón de bloqueo
        const lockButton =
            document.createElement("button");

        lockButton.classList.add(
            "lock-button"
        );

        if (colorData.bloqueado) {

            lockButton.textContent =
                "🔒";

            lockButton.title =
                "Desbloquear color";

        } else {

            lockButton.textContent =
                "🔓";

            lockButton.title =
                "Bloquear color";
        }

        // Evento del botón
        lockButton.addEventListener(
            "click",
            (event) => {

                // Evita que el click haga otras acciones
                event.stopPropagation();

                colorCard.classList.toggle(
                    "bloqueado"
                );

                if (
                    colorCard.classList.contains(
                        "bloqueado"
                    )
                ) {

                    lockButton.textContent =
                        "🔒";

                    lockButton.title =
                        "Desbloquear color";

                } else {

                    lockButton.textContent =
                        "🔓";

                    lockButton.title =
                        "Bloquear color";
                }
            }
        );

        // Agregamos elementos a la tarjeta
        colorCard.appendChild(lockButton);

        colorCard.appendChild(colorText);

        colorCard.appendChild(copyHint);

        // Agregamos tarjeta al contenedor
        contenedor.appendChild(colorCard);
    });
}
// Eliminar una paleta
function eliminarPaleta(id) {

    const paletas = obtenerPaletasGuardadas();

    // Eliminamos la paleta seleccionada
    const nuevasPaletas = paletas.filter(
        (paleta) => paleta.id !== Number(id)
    );

    // Guardamos nuevamente las paletas
    localStorage.setItem(
        "paletasGuardadas",
        JSON.stringify(nuevasPaletas)
    );

    // Actualizamos el menú
    mostrarPaletasGuardadas();

    // Si ya no quedan paletas, cerramos el menú
    if (nuevasPaletas.length === 0) {
        listaGuardadas.classList.remove("abierto");
    }
}
// Botón generar
btnGenerar.addEventListener("click", () => {
    generarPaleta();
    mostrarToast();
});

// Botón guardar
btnGuardar.addEventListener("click", () => {
    guardarPaleta();
});

// Abrir y cerrar el menú de paletas guardadas

btnMostrarGuardadas.addEventListener("click", () => {

    listaGuardadas.classList.toggle("abierto");

});



// Mostrar paletas guardadas al cargar la página
mostrarPaletasGuardadas();

// Generar paleta inicial
generarPaleta();
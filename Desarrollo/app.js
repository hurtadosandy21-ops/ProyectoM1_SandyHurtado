const btnGenerar = document.getElementById("btn-Generar");
const selectCantidad = document.getElementById("select-Cantidad");
const selectFormato = document.getElementById("select-Formato");
const contenedor = document.getElementById("contenedor");
const btnGuardar = document.getElementById("btn-Guardar");
const contenedorGuardadas = document.getElementById("paletas-Guardadas");
const btnMostrarGuardadas = document.getElementById("btn-MostrarGuardadas");
const listaGuardadas = document.getElementById("lista-Guardadas");

// Variable global para recordar qué paleta se quiere borrar temporalmente
let idPaletaPorEliminar = null;

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
    return `hsl(${h}, ${s}%, ${l}%)`;
}

function generarColor() {
    const formato = selectFormato.value;
    return formato === "HEX" ? getRandomHex() : getRandomHSL();
}

// ESCANEA LA PANTALLA Y GUARDA LOS CANDADOS AL INSTANTE
function guardarCandadosEnLocalStorage() {
    if (!contenedor) return;
    const tarjetas = [...contenedor.querySelectorAll(".color-card")];
    
    const estadoActual = tarjetas.map((card) => {
        return {
            color: card.dataset.color,
            bloqueado: card.classList.contains("bloqueado")
        };
    });
    
    localStorage.setItem("estadoBlockedActuales", JSON.stringify(estadoActual));
}

// RESTAURA LOS COLORES RESPALDADOS CUANDO SE REGRESA A LA WEB
function cargarCandadosDesdeLocalStorage() {
    if (!contenedor) return;
    const guardados = localStorage.getItem("estadoBlockedActuales");
    
    if (guardados) {
        const coloresResaltados = JSON.parse(guardados);
        selectCantidad.value = coloresResaltados.length;
        construirContenedorPaleta(coloresResaltados);
    } else {
        generarPaleta();
    }
}

// RENDERIZA LAS TARJETAS RESPETANDO CUALQUIER PROCEDENCIA
function construirContenedorPaleta(arregloColores) {
    contenedor.innerHTML = "";

    arregloColores.forEach((colorData, i) => {
        const colorValue = colorData.color;

        const colorCard = document.createElement("div");
        colorCard.classList.add("color-card");
        colorCard.style.backgroundColor = colorValue;
        colorCard.dataset.color = colorValue;

        const colorText = document.createElement("span");
        colorText.textContent = colorValue;

        const copyHint = document.createElement("small");
        copyHint.textContent = "Clic para copiar";
        copyHint.classList.add("copy-hint");

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

        const lockButton = document.createElement("button");
        lockButton.classList.add("lock-button");

        if (colorData.bloqueado) {
            colorCard.classList.add("bloqueado");
            lockButton.textContent = "🔒";
            lockButton.title = "Desbloquear color";
        } else {
            lockButton.textContent = "🔓";
            lockButton.title = "Bloquear color";
        }

        lockButton.addEventListener("click", (event) => {
            event.stopPropagation();
            colorCard.classList.toggle("bloqueado");

            if (colorCard.classList.contains("bloqueado")) {
                lockButton.textContent = "🔒";
                lockButton.title = "Desbloquear color";
            } else {
                lockButton.textContent = "🔓";
                lockButton.title = "Bloquear color";
            }
            
            guardarCandadosEnLocalStorage();
        });

        colorCard.appendChild(lockButton);
        colorCard.appendChild(colorText);
        colorCard.appendChild(copyHint);
        contenedor.appendChild(colorCard);
    });
}

function generarPaleta() {
    if (!contenedor) return;

    const cantidad = parseInt(selectCantidad.value, 10);
    const tarjetasAnteriores = [...contenedor.querySelectorAll(".color-card")];

    const coloresBloqueados = tarjetasAnteriores.map((card) => {
        return {
            color: card.dataset.color,
            bloqueado: card.classList.contains("bloqueado")
        };
    });

    const nuevosColores = [];

    for (let i = 0; i < cantidad; i++) {
        let colorValue;
        if (coloresBloqueados[i] && coloresBloqueados[i].bloqueado) {
            colorValue = coloresBloqueados[i].color;
            nuevosColores.push({ color: colorValue, bloqueado: true });
        } else {
            colorValue = generarColor();
            nuevosColores.push({ color: colorValue, bloqueado: false });
        }
    }

    construirContenedorPaleta(nuevosColores);
    guardarCandadosEnLocalStorage();
    mostrarToast("¡Paleta Generada!");
}

// TOAST FLOTANTE OPTIMIZADO (USA OPACIDAD, EVITA CUALQUIER SALTO DE ELEMENTOS)
function mostrarToast(mensaje = "¡Paleta Generada!") {
    const toast = document.getElementById("toast");
    if (!toast) return;

    toast.textContent = mensaje;
    
    // Lo hace visible flotando en pantalla
    toast.style.opacity = "1";
    toast.style.visibility = "visible";

    setTimeout(() => {
        // Se desvanece en su lugar sin alterar los píxeles de los contenedores
        toast.style.opacity = "0";
        toast.style.visibility = "hidden";
    }, 1500);
}

function obtenerPaletasGuardadas() {
    let paletas = [];
    try {
        paletas = JSON.parse(localStorage.getItem("paletasGuardadas")) || [];
    } catch (error) {
        paletas = [];
    }
    paletas = paletas.filter((paleta) => {
        return (
            paleta &&
            paleta.id &&
            Array.isArray(paleta.colores) &&
            paleta.colores.length > 0 &&
            paleta.colores.every((colorData) => colorData && colorData.color)
        );
    });
    localStorage.setItem("paletasGuardadas", JSON.stringify(paletas));
    return paletas;
}

function guardarPaleta() {
    const tarjetas = [...contenedor.querySelectorAll(".color-card")];
    if (tarjetas.length === 0) return;

    const colores = tarjetas.map((card) => {
        return {
            color: card.dataset.color,
            bloqueado: card.classList.contains("bloqueado")
        };
    });

    const paletas = obtenerPaletasGuardadas();
    const nuevaPaleta = {
        id: Date.now(),
        colores: colores,
        formato: selectFormato.value
    };

    paletas.push(nuevaPaleta);
    localStorage.setItem("paletasGuardadas", JSON.stringify(paletas));
    mostrarPaletasGuardadas();
    mostrarToast("¡Paleta guardada!");
}

// CONTROL DE PALETAS GUARDADAS (REPARADO Y CONECTADO)
function mostrarPaletasGuardadas() {
    const paletas = obtenerPaletasGuardadas();
    listaGuardadas.innerHTML = "";

    if (paletas.length === 0) {
        listaGuardadas.classList.remove("abierto");
        return;
    }

    paletas.forEach((paleta) => {
        const item = document.createElement("div");
        item.classList.add("paleta-Guardadas");

        const vistaColores = document.createElement("div");
        vistaColores.classList.add("vista-colores");

        paleta.colores.forEach((colorData) => {
            const colorMini = document.createElement("div");
            colorMini.classList.add("color-mini");
            colorMini.style.backgroundColor = colorData.color;
            colorMini.title = colorData.color;
            vistaColores.appendChild(colorMini);
        });

        // Evento para CARGAR la paleta al hacer clic en los cuadritos
        vistaColores.addEventListener("click", () => {
            construirContenedorPaleta(paleta.colores);
            guardarCandadosEnLocalStorage();
            listaGuardadas.classList.remove("abierto");
        });

        // TU BOTÓN "✕" EXISTENTE DENTRO DEL DESPLEGABLE
        const botonEliminar = document.createElement("button");
        botonEliminar.classList.add("eliminar-paleta");
        botonEliminar.textContent = "✕";
        botonEliminar.title = "Eliminar paleta";

        // Evento para ELIMINAR la paleta al hacer clic en la equis
        botonEliminar.addEventListener("click", (event) => {
            event.stopPropagation(); // Evita que se cargue la paleta de fondo

            idPaletaPorEliminar = paleta.id;

            // REVISAR PREFERENCIA DEL USUARIO
            const omitirPregunta = localStorage.getItem("omitirConfirmacionBorrado") === "true";

            if (omitirPregunta) {
                ejecutarBorradoConfirmado();
            } else {
                const modal = document.getElementById("modal-confirmacion");
                if (modal) {
                    document.getElementById("chk-no-mostrar").checked = false;
                    modal.classList.add("activo");
                } else {
                    console.error("Error: No se encontró el elemento HTML 'modal-confirmacion'");
                }
            }
        });

        // Ensamblado correcto de componentes
        item.appendChild(vistaColores);
        item.appendChild(botonEliminar);
        listaGuardadas.appendChild(item);
    });
}

// LOGICA ENCARGADA DEL BORRADO COMPLETO TRAS CONFIRMAR
function ejecutarBorradoConfirmado() {
    if (!idPaletaPorEliminar) return;

    let paletasActuales = obtenerPaletasGuardadas();
    paletasActuales = paletasActuales.filter(p => p.id !== idPaletaPorEliminar);
    localStorage.setItem("paletasGuardadas", JSON.stringify(paletasActuales));

    const casillaCheck = document.getElementById("chk-no-mostrar");
    if (casillaCheck && casillaCheck.checked) {
        localStorage.setItem("omitirConfirmacionBorrado", "true");
    }

    mostrarPaletasGuardadas();
    mostrarToast("¡Paleta eliminada!");
    idPaletaPorEliminar = null;
}

// INICIALIZADORES GENERALES Y MANEJO DE LOS BOTONES SÍ/NO DEL MODAL
document.addEventListener("DOMContentLoaded", () => {
    cargarCandadosDesdeLocalStorage();

    const modal = document.getElementById("modal-confirmacion");
    const btnSi = document.getElementById("btn-modal-si");
    const btnNo = document.getElementById("btn-modal-no");

    if (btnSi && btnNo && modal) {
        btnSi.addEventListener("click", () => {
            modal.classList.remove("activo");
            ejecutarBorradoConfirmado();
        });

        btnNo.addEventListener("click", () => {
            modal.classList.remove("activo");
            idPaletaPorEliminar = null;
        });
    }

    if (btnMostrarGuardadas) {
        btnMostrarGuardadas.addEventListener("click", () => {
            listaGuardadas.classList.toggle("abierto");
            if (listaGuardadas.classList.contains("abierto")) {
                mostrarPaletasGuardadas();
            }
        });
    }
});

btnGenerar.addEventListener("click", generarPaleta);
btnGuardar.addEventListener("click", guardarPaleta);

const btnGenerar = document.getElementById("btn-Generar");
const selectCantidad = document.getElementById("select-Cantidad");
const selectFormato = document.getElementById("select-Formato");
const contenedor = document.getElementById("contenedor");


const btnGuardar = document.getElementById("btn-Guardar");
const contenedorGuardadas = document.getElementById("paletas-Guardadas");
const btnMostrarGuardadas = document.getElementById("btn-MostrarGuardadas");
const listaGuardadas = document.getElementById("lista-Guardadas");

const btnNuevaSesion = document.getElementById("btnNuevaSesion");

let origenDelModal = ""; 


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

    const formatoGuardado = localStorage.getItem("formatoColor");

    if (formatoGuardado) {
        selectFormato.value = formatoGuardado;
    }

    const guardados = localStorage.getItem("estadoBlockedActuales");

    if (guardados) {
    const coloresResaltados = JSON.parse(guardados);
    selectCantidad.value = coloresResaltados.length;
    construirContenedorPaleta(coloresResaltados);

    transformarFormatoActual();
    }
     else {
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

// TOAST FLOTANTE OPTIMIZADO: (USA OPACIDAD, EVITA CUALQUIER SALTO DE ELEMENTOS)
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

        // BOTÓN "✕" EXISTENTE DENTRO DEL DESPLEGABLE
        const botonEliminar = document.createElement("button");
        botonEliminar.classList.add("eliminar-paleta");
        botonEliminar.textContent = "✕";
        botonEliminar.title = "Eliminar paleta";


        // Evento para ELIMINAR la paleta al hacer clic en la equis
        botonEliminar.addEventListener("click", (event) => {
            event.stopPropagation(); // Evita cargar la paleta
            idPaletaPorEliminar = paleta.id;

            const modal = document.getElementById("modal-confirmacion");
            if (!modal) return;

            // Restablecemos el texto original del modal para borrar
            const parrafoModal = modal.querySelector("p");
            if (parrafoModal) {
                parrafoModal.textContent = "¿Realmente deseas eliminar esta paleta de colores?";
            }

            const omitirPregunta = localStorage.getItem("omitirConfirmacionBorrado") === "true";
            if (omitirPregunta) {
                ejecutarBorradoConfirmado();
            } else {
                document.getElementById("chk-no-mostrar").checked = false;
                modal.classList.add("activo");

                // Asignamos el comportamiento de borrado directo al botón SÍ aquí mismo
                const btnSi = document.getElementById("btn-modal-si");
                if (btnSi) {
                    const nuevoBtnSi = btnSi.cloneNode(true);
                    btnSi.parentNode.replaceChild(nuevoBtnSi, btnSi);
                    
                    nuevoBtnSi.addEventListener("click", () => {
                        modal.classList.remove("activo");
                        ejecutarBorradoConfirmado();
                    });
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
            
            if (origenDelModal === "lista"){
                ejecutarBorradoConfirmado();
            }else if (origenDelModal === "nueva-sesion"){
                ejecutarNuevaSesionConfirmada
            }
        });

        btnNo.addEventListener("click", () => {
            modal.classList.remove("activo");
            idPaletaPorEliminar = null;
            origenDelModal ="";

            const parrafoModal = modal.querySelector("p");
            if (parrafoModal){
                parrafoModal.textContent = "¿Reallmente deseas eliminar esta Paleta de colores?";

            }
        });
    }

    if (btnNuevaSesion){
        btnNuevaSesion.addEventListener("click", nuevaSesion);
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
// Conservación de formatos

function transformarFormatoActual() {
    if (!contenedor) return;
    
    const tarjetas = [...contenedor.querySelectorAll(".color-card")];
    const nuevoFormato = selectFormato.value; // Lee si eligió "HEX" o "HSL"

    // Guardar formato seleccionado
    localStorage.setItem("formatoColor", nuevoFormato);


    tarjetas.forEach((tarjeta) => {
        // Obtenemos el color actual real que está pintado en el fondo de la tarjeta
        const colorBase = tarjeta.style.backgroundColor; 
        let codigoTransformado = colorBase;

        if (nuevoFormato === "HEX") {
            // El navegador por defecto entrega el fondo en formato rgb(r, g, b)
            // Este bloque convierte los números de rgb a su equivalente #HEX de forma limpia
            const rgb = colorBase.match(/\d+/g);
            if (rgb) {
                const hex = "#" + rgb.map(x => {
                    const hexValue = parseInt(x, 10).toString(16);
                    return hexValue.length === 1 ? "0" + hexValue : hexValue;
                }).join("");
                codigoTransformado = hex.toUpperCase();
            }
        } else if (nuevoFormato === "HSL") {
            // Si el usuario cambia a HSL, convertimos matemáticamente los valores del fondo
            const rgb = colorBase.match(/\d+/g);
            if (rgb) {
                let r = rgb[0] / 255, g = rgb[1] / 255, b = rgb[2] / 255;
                let max = Math.max(r, g, b), min = Math.min(r, g, b);
                let h, s, l = (max + min) / 2;

                if (max === min) {
                    h = s = 0; // Escala de grises
                } else {
                    let d = max - min;
                    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                    switch (max) {
                        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                        case g: h = (b - r) / d + 2; break;
                        case b: h = (r - g) / d + 4; break;
                    }
                    h /= 6;
                }
                codigoTransformado = `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
            }
        }

        // Actualizamos los datos internos y los textos en pantalla sin alterar la paleta
        tarjeta.dataset.color = codigoTransformado;
        const textoSpan = tarjeta.querySelector("span");
        if (textoSpan) {
            textoSpan.textContent = codigoTransformado;
        }

        // RE-VINCULACIÓN DEL EVENTO CLIC: Actualiza el portapapeles para copiar el nuevo formato
        tarjeta.onclick = async function() {
            const copyHint = tarjeta.querySelector(".copy-hint");
            try {
                await navigator.clipboard.writeText(codigoTransformado);
                if (copyHint) {
                    copyHint.textContent = "¡Copiado! ✓";
                    copyHint.classList.add("copiado");
                    setTimeout(() => {
                        copyHint.textContent = "Clic para copiar";
                        copyHint.classList.remove("copiado");
                    }, 1500);
                }
            } catch (err) {
                if (copyHint) copyHint.textContent = "No se pudo copiar";
            }
        };
    });

    // Guardamos el cambio de formato en el LocalStorage automático de candados
    if (typeof guardarCandadosEnLocalStorage === "function") {
        guardarCandadosEnLocalStorage();
    }
}
function actualizarCantidadPaleta() {
    if (!contenedor) return;

    const cantidadNueva = parseInt(selectCantidad.value, 10);

    const tarjetas = [...contenedor.querySelectorAll(".color-card")];

    const coloresActuales = tarjetas.map(card => ({
        color: card.dataset.color,
        bloqueado: card.classList.contains("bloqueado")
    }));

    // Si aumenta la cantidad
    while (coloresActuales.length < cantidadNueva) {
        coloresActuales.push({
            color: generarColor(),
            bloqueado: false
        });
    }

    // Si disminuye la cantidad
    if (coloresActuales.length > cantidadNueva) {
        coloresActuales.splice(cantidadNueva);
    }

    construirContenedorPaleta(coloresActuales);

    // Mantener el formato actual (HEX o HSL)
    transformarFormatoActual();

    guardarCandadosEnLocalStorage();
}
function nuevaSesion() {
    const modal = document.getElementById("modal-confirmacion");
    if (!modal) return;

    // REVISAR SI EL USUARIO YA MARCÓ ANTES "NO VOLVER A MOSTRAR"
    const omitirPregunta = localStorage.getItem("omitirConfirmacionNuevaSesion") === "true";

    if (omitirPregunta) {
        ejecutarNuevaSesionConfirmada();
        return;
    }

    // Cambiamos el texto del modal para esta acción
    const parrafoModal = modal.querySelector("p");
    if (parrafoModal) {
        parrafoModal.textContent = "¿Deseas obtener una Nueva Paleta de Color? Se perderán los colores bloqueados actuales.";
    }
    
    document.getElementById("chk-no-mostrar").checked = false; // Resetea el check
    modal.classList.add("activo"); // Muestra el modal

    // Le asignamos la función directamente al botón SÍ aquí mismo
    // Esto borra cualquier interferencia de nombres o guiones
    const btnSi = document.getElementById("btn-modal-si");
    if (btnSi) {
        // Clonamos el botón para borrar eventos viejos acumulados
        const nuevoBtnSi = btnSi.cloneNode(true);
        btnSi.parentNode.replaceChild(nuevoBtnSi, btnSi);
        
        // Le damos la orden directa e inmediata
        nuevoBtnSi.addEventListener("click", () => {
            modal.classList.remove("activo");
            ejecutarNuevaSesionConfirmada();
        });
    }
}

// LOGICA DE REINICIO DE SESIÓN COMPLETA
function ejecutarNuevaSesionConfirmada() {
    // 1. Limpieza absoluta del almacenamiento
    localStorage.removeItem("estadoBlockedActuales");
    localStorage.removeItem("formatoColor");

    // 2. Elegimos combinaciones aleatorias sorpresa (6, 8 o 9 / HEX o HSL)
    const opcionesCantidad = ["6", "8", "9"];
    const cantidadAleatoria = opcionesCantidad[Math.floor(Math.random() * opcionesCantidad.length)];
    
    const opcionesFormato = ["HEX", "HSL"];
    const formatoAleatorio = opcionesFormato[Math.floor(Math.random() * opcionesFormato.length)];

    // 3. Sincronizamos los selectores del HTML
    if (selectCantidad) selectCantidad.value = cantidadAleatoria;
    if (selectFormato) selectFormato.value = formatoAleatorio;

    const cantidadNumerica = parseInt(cantidadAleatoria, 10);
    const nuevosColoresLimpios = [];

    // 4. Creamos los colores usando tus funciones aleatorias puras
    for (let i = 0; i < cantidadNumerica; i++) {
        let colorValue;
        if (formatoAleatorio === "HEX") {
            colorValue = getRandomHex(); // Invoca tu función nativa
        } else {
            colorValue = getRandomHSL(); // Invoca tu función nativa
        }
        
        nuevosColoresLimpios.push({
            color: colorValue,
            bloqueado: false
        });
    }

    // 5. Pintamos la pantalla de inmediato
    if (typeof construirContenedorPaleta === "function") {
        construirContenedorPaleta(nuevosColoresLimpios);
    }

    // 6. Guardamos el estado limpio en el disco
    if (typeof guardarCandadosEnLocalStorage === "function") {
        guardarCandadosEnLocalStorage();
    }

    // 7. Procesamos la casilla de verificación
    const casillaCheck = document.getElementById("chk-no-mostrar");
    if (casillaCheck && casillaCheck.checked) {
        localStorage.setItem("omitirConfirmacionNuevaSesion", "true");
    }

    // 8. Mostramos el aviso flotante sin saltos
    mostrarToast(`¡Nueva Paleta de ${cantidadAleatoria} colores generada!`);
}
btnGenerar.addEventListener("click", generarPaleta);
btnGuardar.addEventListener("click", guardarPaleta);
// Escucha cuando el usuario cambia de HEX a HSL o viceversa en el menú desplegable
selectFormato.addEventListener("change", transformarFormatoActual);
selectCantidad.addEventListener("change", actualizarCantidadPaleta); 
btnNuevaSesion.addEventListener("click", nuevaSesion);
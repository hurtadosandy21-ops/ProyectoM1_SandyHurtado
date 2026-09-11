const btnGenerar = document.getElementById("btn-Generar");
const selectCantidad = document.getElementById("select-Cantidad");
const selectFormato = document.getElementById("select-Formato");
const contenedor = document.getElementById("contenedor");

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
    const s = Math.floor(Math.random() * 50)+ 40;
    const l = Math.floor(Math.random() * 50)+ 40;

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
    const formato = selectFormato.value;

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

        // Agregamos tarjeta al contenedor
        contenedor.appendChild(colorCard);
    }
}

// Uso de toas para un anunico de paleta generada
function mostrarToast() {
    const toast = document.getElementById("toast");

    if (!toast) return;

    toast.style.display = "block";

    setTimeout(() => {
        toast.style.display = "none";
    }, 2000);
}

// Botón generar
btnGenerar.addEventListener("click", () => {
    generarPaleta();
    mostrarToast();
});

// Generar paleta inicial
generarPaleta();

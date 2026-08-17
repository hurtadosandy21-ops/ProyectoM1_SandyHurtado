// 1. Selección de elementos del DOM
const select = document.getElementById('tamano-paleta');
const btn = document.getElementById('btn-generar');
const container = document.getElementById('contenedor-paleta');

// 2. Función para generar un color HEX aleatorio
function randomHex() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

// 3. Crear cada tarjeta (con botón de candado)
function crearTarjeta(color, estaBloqueado = false) {
    const article = document.createElement('article');
    article.className = `tarjeta-color ${estaBloqueado ? 'bloqueada' : ''}`;

    const muestra = document.createElement('div');
    muestra.className = 'muestra-color';
    muestra.style.backgroundColor = color;

    const label = document.createElement('div');
    label.className = 'codigo-color';
    label.textContent = color;

    // Crear el botón de candado
    const btnCandado = document.createElement('button');
    btnCandado.className = 'btn-candado';
    btnCandado.textContent = estaBloqueado ? '🔒' : '🔓';
    btnCandado.title = estaBloqueado ? 'Desbloquear color' : 'Bloquear color';

    // Evento para bloquear / desbloquear la tarjeta al hacer clic en el candado
    btnCandado.addEventListener('click', () => {
        article.classList.toggle('bloqueada');
        const bloqueadoAhora = article.classList.contains('bloqueada');
        btnCandado.textContent = bloqueadoAhora ? '🔒' : '🔓';
        btnCandado.title = bloqueadoAhora ? 'Desbloquear color' : 'Bloquear color';
    });

    article.appendChild(muestra);
    article.appendChild(label);
    article.appendChild(btnCandado);

    return article;
}

// 4. Generar la paleta respetando las tarjetas bloqueadas
function generar() {
    const count = parseInt(select.value, 10) || 6;
    const tarjetasActuales = Array.from(container.children);

    // Limpiamos el contenedor para redibujar
    container.innerHTML = '';

    for (let i = 0; i < count; i++) {
        const tarjetaPrevia = tarjetasActuales[i];

        // Si la tarjeta anterior existía y está bloqueada, conservamos su color
        if (tarjetaPrevia && tarjetaPrevia.classList.contains('bloqueada')) {
            const colorExistente = tarjetaPrevia.querySelector('.codigo-color').textContent;
            container.appendChild(crearTarjeta(colorExistente, true));
        } else {
            // Si no está bloqueada, generamos un color nuevo
            container.appendChild(crearTarjeta(randomHex(), false));
        }
    }
}

// 5. Escuchar clic del botón
btn.addEventListener('click', generar);

// 6. Carga automática inicial
generar();
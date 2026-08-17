// 1. Selección de elementos del DOM
const select = document.getElementById('tamano-paleta');
const btn = document.getElementById('btn-generar');
const container = document.getElementById('contenedor-paleta');

// 2. Función para generar un color HEX aleatorio
function randomHex() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

// 3. Crear cada tarjeta de color individual
function crearTarjeta(color) {
    const article = document.createElement('article');
    article.className = 'tarjeta-color';

    const muestra = document.createElement('div');
    muestra.className = 'muestra-color';
    muestra.style.backgroundColor = color;

    const label = document.createElement('div');
    label.className = 'codigo-color';
    label.textContent = color; // Asignamos el código de color visible

    article.appendChild(muestra);
    article.appendChild(label);
    
    return article;
}

// 4. Función principal para generar toda la paleta
function generar() {
    container.innerHTML = '';
    const count = parseInt(select.value, 10) || 6;

    for (let i = 0; i < count; i++) {
        const color = randomHex();
        const tarjeta = crearTarjeta(color);
        container.appendChild(tarjeta);
    }
}

// 5. Escuchar clic del botón
btn.addEventListener('click', generar);

// 6. Carga automática inicial al abrir la página
generar();
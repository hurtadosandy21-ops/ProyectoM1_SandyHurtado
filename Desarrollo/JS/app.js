// 1. Selección de elementos del DOM
const select = document.getElementById('tamano-paleta');
const btnGenerar = document.getElementById('btn-generar');
const btnGuardarActual = document.getElementById('btn-guardar-actual');
const container = document.getElementById('contenedor-paleta');

// Elementos del menú desplegable único
const savedBtn = document.getElementById('saved-dropdown-btn');
const savedDropdown = document.getElementById('saved-palettes-dropdown');
const savedCount = document.getElementById('saved-count');

let savedPalettes = [];

// 2. Función para generar un color HEX aleatorio
function randomHex() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

// 3. Crear cada tarjeta con botón de candado, animación y copiado al portapapeles
function crearTarjeta(color, estaBloqueado = false) {
    const article = document.createElement('article');
    article.className = `tarjeta-color ${estaBloqueado ? 'bloqueada' : ''} tarjeta-animada`;

    const muestra = document.createElement('div');
    muestra.className = 'muestra-color';
    muestra.style.backgroundColor = color;
    muestra.title = 'Haz clic para copiar el código HEX';

    const label = document.createElement('div');
    label.className = 'codigo-color';
    label.textContent = color;
    label.title = 'Haz clic para copiar el código HEX';

    // Función para copiar el código al portapapeles
    const copiarColor = (e) => {
        // Evitamos que se active si se hace clic en el candado
        if (e.target.classList.contains('btn-candado')) return;

        navigator.clipboard.writeText(color).then(() => {
            const textoOriginal = label.textContent;
            label.textContent = '¡Copiado!';
            label.classList.add('copiado');

            // Restablece el texto original después de 1.2 segundos
            setTimeout(() => {
                label.textContent = textoOriginal;
                label.classList.remove('copiado');
            }, 1200);
        }).catch(err => {
            console.error('Error al copiar: ', err);
        });
    };

    // Permitir copiar al hacer clic en la muestra de color o en el texto HEX
    muestra.addEventListener('click', copiarColor);
    label.addEventListener('click', copiarColor);

    const btnCandado = document.createElement('button');
    btnCandado.className = 'btn-candado';
    btnCandado.textContent = estaBloqueado ? '🔒' : '🔓';
    btnCandado.title = estaBloqueado ? 'Desbloquear color' : 'Bloquear color';

    btnCandado.addEventListener('click', (e) => {
        e.stopPropagation(); // Evita activar el evento de copiado al pulsar el candado
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

// 4. Generar la paleta en pantalla
function generar() {
    const count = parseInt(select.value, 10) || 6;
    const tarjetasActuales = Array.from(container.children);

    container.innerHTML = '';

    for (let i = 0; i < count; i++) {
        const tarjetaPrevia = tarjetasActuales[i];

        if (tarjetaPrevia && tarjetaPrevia.classList.contains('bloqueada')) {
            const colorExistente = tarjetaPrevia.querySelector('.codigo-color').textContent;
            container.appendChild(crearTarjeta(colorExistente, true));
        } else {
            container.appendChild(crearTarjeta(randomHex(), false));
        }
    }
}

// 5. Gestión del menú desplegable único
if (savedBtn) {
    savedBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        savedDropdown.classList.toggle('hidden');
    });
}

// Cerrar si se da clic fuera
document.addEventListener('click', (e) => {
    if (savedDropdown && !savedDropdown.contains(e.target) && e.target !== savedBtn) {
        savedDropdown.classList.add('hidden');
    }
});

// Guardar la paleta visible actualmente
function guardarPaletaActual() {
    const tarjetas = Array.from(container.querySelectorAll('.codigo-color'));
    if (tarjetas.length === 0) return;

    const nuevaPaleta = tarjetas.map(label => label.textContent);
    savedPalettes.push(nuevaPaleta);
    renderSavedPalettes();
}

// Cargar paleta seleccionada de la lista
function cargarPaleta(colors) {
    container.innerHTML = '';
    select.value = colors.length;

    colors.forEach(color => {
        container.appendChild(crearTarjeta(color, false));
    });

    savedDropdown.classList.add('hidden');
}

// Eliminar paleta de la lista
function deletePalette(index) {
    savedPalettes.splice(index, 1);
    renderSavedPalettes();
}

// Renderizar la lista desplegable de paletas
function renderSavedPalettes() {
    if (!savedDropdown || !savedCount) return;

    savedDropdown.innerHTML = '';
    
    // Actualizar el número en la etiqueta principal del botón
    savedCount.textContent = `(${savedPalettes.length})`;

    if (savedPalettes.length === 0) {
        savedDropdown.innerHTML = '<div style="padding:10px; font-size:13px; color:#888;">Sin paletas guardadas</div>';
        return;
    }

    savedPalettes.forEach((palette, index) => {
        const option = document.createElement('div');
        option.classList.add('palette-option');

        // Vista previa de los colores
        const preview = document.createElement('div');
        preview.classList.add('mini-colors-preview');

        palette.forEach(color => {
            const dot = document.createElement('div');
            dot.classList.add('mini-color-dot');
            dot.style.backgroundColor = color;
            preview.appendChild(dot);
        });

        // Al hacer clic en los colores se carga en pantalla
        preview.addEventListener('click', () => cargarPaleta(palette));

        // Botón pequeño para eliminar
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-option-btn');
        deleteBtn.innerHTML = '✕';
        deleteBtn.title = 'Eliminar';
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            deletePalette(index);
        });

        option.appendChild(preview);
        option.appendChild(deleteBtn);
        savedDropdown.appendChild(option);
    });
}

// 6. Eventos e inicialización
if (btnGenerar) {
    btnGenerar.addEventListener('click', generar);
}

if (btnGuardarActual) {
    btnGuardarActual.addEventListener('click', guardarPaletaActual);
}

// Carga inicial
generar();
renderSavedPalettes();
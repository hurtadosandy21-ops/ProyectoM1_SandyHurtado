Generador de Paletas de Colores Interactivo
Proyecto Integrador — Módulo 1 (Full Stack) — Henry

Desarrollado por Sandy Hurtado

Aplicación web estática e interactiva que genera paletas de colores aleatorias en formato Hexadecimal (HEX) de forma dinámica, con actualización visual inmediata y diseño responsivo adaptado a diferentes pantallas.

Funcionalidades
Selección del tamaño de la paleta: Permite elegir entre 6, 8 o 9 colores según la combinación deseada mediante un selector interactivo.

Generación aleatoria en formato HEX: Calcula códigos cromáticos hexadecimales únicos mediante algoritmos aleatorios (Math.random()).

Carga inicial automática: La página despliega una paleta de colores desde el primer segundo sin dejar la pantalla en blanco.

Visualización en tarjetas independientes: Cada swatch o muestra muestra su color de fondo y su correspondiente código HEX en mayúsculas.

Diseño dinámico e interactivo: Generación con un solo clic en el botón "Generar paleta" o cambio de cantidad.

Stack Técnico
HTML5 semántico: Uso de etiquetas estructurales (<header>, <main>, <section>, <footer>, <select>, <button>).

CSS3: Layout basado en CSS Grid responsivo (repeat(auto-fit, minmax(180px, 1fr))), variables CSS (:root), bordes delimitadores y sombras suaves sin frameworks externos.

JavaScript Vanilla: Manipulación dinámica del DOM (document.createElement, appendChild), manejo de eventos (addEventListener) y conversión matemática a base 16 (toString(16)).

Sin dependencias: Funciona de forma directa en cualquier navegador web moderno sin necesidad de pasos de compilación (build steps).

Estructura del Proyecto
Plaintext
ProyectoM1_SandyHurtado/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── app.js
└── README.md
Decisiones de Diseño
Fondo claro y neutro (#f4f6f9): Diseñado para resaltar los tonos de cada tarjeta de color de forma equilibrada y limpia.

Grid responsivo adaptativo: Las tarjetas de colores ocupan bloques grandes y separados mediante bordes definidos (border: 2px solid), simulando muestrarios físicos de color de un estudio de diseño.

Tarjetas con elevación (Hover): Efecto visual de despegue (transform: translateY(-5px)) e iluminación de borde al pasar el cursor sobre cada color para brindar mejor interacción.

Uso de IA en el Desarrollo
Este proyecto fue construido con la asistencia de la IA Gemini (Google) como tutor y asistente de programación.

Prompts utilizados (Resumen):

"¿Por qué no se muestran las tarjetas de colores al hacer clic en el botón si el archivo JS no marca error?"

"Ayúdame a entender cómo funciona el bucle for y Math.random() en JavaScript para la generación del código HEX."

"Ayúdame a mejorar el CSS para que cada tarjeta tenga divisiones claras y que la paleta se genere automáticamente apenas abre la página."

Resultado obtenido:

Detección y corrección de discrepancias en los nombres de clases dinámicas (tarjeta-color vs tarjet-color).

Optimización de la lógica matemática para la generación de cadenas hexadecimales válidas (toString(16) y padStart(6, '0')).

Implementación de la carga inicial automática mediante la invocación directa de la función al cargar la ventana.

Comprensión profunda de la sintaxis y ejecución de bucles e iteraciones en JavaScript.

BOTONES EXTRAS Y SUS FUNCIONES:

Documentación del Proyecto: Generador de Paletas de ColoresEste documento detalla la funcionalidad de los botones interactivos e interfaz de la aplicación, así como el funcionamiento técnico de las animaciones y transiciones CSS implementadas.🔘 Guía de Botones y Componentes InteractivosComponenteElemento HTML / SelectorFunción y ComportamientoGenerar Paleta<button id="btn-generar">Ejecuta la función generar(). Evalúa la cantidad de colores seleccionada y genera una nueva paleta de colores aleatorios manteniendo intactos los colores que estén bloqueados.Bloqueo de Color (Candado)<button class="btn-candado">Alterna el estado de bloqueo (bloqueada) de una tarjeta individual. Cuando está bloqueada (🔒), evita que el color sea reemplazado al pulsar "Generar paleta".Guardar Paleta<button id="btn-guardar-actual">Toma todos los colores hexadecimales visibles actualmente en pantalla y los guarda en un arreglo global (savedPalettes), actualizando la lista y el contador.Menú Desplegable de Guardadas<button id="saved-dropdown-btn">Funciona como un botón/selector desplegable. Muestra la etiqueta con el contador dinámico (N). Al hacer clic, abre o cierra la lista flotante con las paletas guardadas.Copia de Color al Portapapeles.muestra-color / .codigo-colorAl hacer clic sobre el cuadro de color o sobre su código textual (HEX/HSL), copia el valor directamente al portapapeles con la API navigator.clipboard y muestra un aviso visual temporal ("¡Copiado!").Eliminar Paleta Guardada<button class="delete-option-btn">Ubicado dentro de cada fila del menú desplegable (✕). Elimina esa paleta específica del arreglo guardado y actualiza la lista sin cerrar el menú.🎨 Transiciones y Animaciones CSS (styles.css)Se implementaron animaciones y microinteracciones para mejorar el feedback visual y la experiencia de usuario (UX) sin recargar la interfaz.1. Animación de Entrada de Tarjetas (.tarjeta-animada)Función: Genera un efecto suave de escalado y aparición (fade-in) cada vez que se crean nuevas tarjetas de color en el DOM.Propiedades CSS clave:CSS@keyframes aparicionTarjeta {
  0% {
    opacity: 0.3;
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.tarjeta-animada {
  animation: aparicionTarjeta 0.25s ease-out forwards;
}
2. Transición Suave en Cambios de Color (.muestra-color)Función: Evita saltos bruscos de color cuando una tarjeta cambia de tono al generar una nueva combinación.Propiedades CSS clave:CSS.muestra-color {
  transition: background-color 0.3s ease-in-out;
}
3. Elevación al Pasar el Cursor (Hover effect)Función: Brinda feedback táctil/visual para indicar que la tarjeta de color es un elemento interactivo.Propiedades CSS clave:CSS.tarjeta-color {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.tarjeta-color:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}
4. Despliegue del Menú Flotante (.dropdown-content)Función: Hace que el menú de paletas guardadas aparezca deslizándose levemente hacia abajo con opacidad gradual en lugar de mostrarse de golpe.Propiedades CSS clave:CSS@keyframes desplegarSuave {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dropdown-content:not(.hidden) {
  animation: desplegarSuave 0.2s cubic-bezier(0, 0, 0.2, 1) forwards;
}
5. Microinteracción en Botón Candado (.btn-candado)Función: Simula un rebote elástico al presionar el candado para confirmar la acción de bloquear o desbloquear.Propiedades CSS clave:CSS.btn-candado {
  transition: transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.btn-candado:active {
  transform: scale(0.8);
}
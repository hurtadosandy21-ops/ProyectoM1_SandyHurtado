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

Recordatorio: Adjuntar en tu entrega la carpeta compartida de Google Drive con las capturas de pantalla de las conversaciones con la IA y el GIF o capturas del flujo principal de tu aplicación.
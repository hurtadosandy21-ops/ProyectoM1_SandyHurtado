# 🤖 Uso de Inteligencia Artificial (IA)

Durante el desarrollo del proyecto **Generador de Paletas**, se utilizaron herramientas de inteligencia artificial como apoyo para la investigación, aprendizaje de conceptos, generación de ejemplos de código, mejora de funcionalidades y documentación.

Las herramientas utilizadas fueron:

- **Microsoft Copilot**
- **Google Gemini**

> **Importante:** La inteligencia artificial fue utilizada únicamente como apoyo para el aprendizaje y la orientación técnica. Todas las propuestas fueron revisadas, adaptadas, modificadas y validadas manualmente antes de incorporarse al proyecto.

---

# 📝 Registro de Prompts Utilizados

## 🎨 Prompt 1: Estructura inicial del Generador de Paletas

### 🎯 Objetivo

Obtener una estructura base en JavaScript para conectar los elementos HTML con la lógica principal de generación de colores.

### 💬 Prompt

```text
Ayúdame con una estructura base en JavaScript para mi aplicación "Generador de Paletas". Necesito declarar variables para el botón de generar, el selector de formato HEX y HSL, y la cantidad de colores seleccionada mediante un select.
```

### ✅ Resultado obtenido

La IA proporcionó una estructura inicial para seleccionar elementos del DOM, capturar valores de formularios y ejecutar una función cuando el usuario presionara el botón de generar.

### 💻 Ejemplo sugerido

```javascript
const btnGenerar = document.querySelector("#btn-generar");
const formatoColor = document.querySelector("#formato");
const cantidadColores = document.querySelector("#cantidad");

btnGenerar.addEventListener("click", () => {
    const formato = formatoColor.value;
    const cantidad = cantidadColores.value;

    generarPaleta(formato, cantidad);
});
```

### 🔧 Aplicación en el proyecto

La propuesta fue utilizada como punto de partida para:

- Seleccionar elementos HTML.
- Obtener valores de formularios.
- Manejar eventos del usuario.
- Organizar la estructura principal del código.

### 📚 Aprendizaje obtenido

- Uso de `getElementById()`.
- Manejo de eventos `click`.
- Obtención de valores desde elementos `<select>`.
- Organización inicial de una aplicación web.

---

## 🌈 Prompt 2: Manejo de formatos HEX y HSL

### 🎯 Objetivo

Comprender cómo funcionan los formatos de color HEX y HSL para incorporarlos al proyecto.

### 💬 Prompt

```text
Explícame cómo funcionan los formatos HEX y HSL en JavaScript y cómo puedo utilizarlos dentro de una aplicación web.
```

### ✅ Resultado obtenido

La IA explicó las diferencias entre ambos formatos y proporcionó ejemplos para generar colores aleatorios.

### 💻 Ejemplo sugerido

```javascript
function getRandomHSL() {
    const h = Math.floor(Math.random() * 360);
    const s = Math.floor(Math.random() * 100);
    const l = Math.floor(Math.random() * 100);

    return `hsl(${h}, ${s}%, ${l}%)`;
}
```

### 🔧 Aplicación en el proyecto

La información obtenida permitió implementar:

- Visualización de colores en formato HEX.
- Visualización de colores en formato HSL.
- Cambio dinámico entre formatos mediante un selector.

### 📚 Aprendizaje obtenido

- Diferencias entre HEX y HSL.
- Generación de colores aleatorios.
- Comprensión de Matiz, Saturación y Luminosidad.

---

## ⚙️ Prompt 3: Manipulación dinámica del DOM

### 🎯 Objetivo

Actualizar la interfaz de usuario sin necesidad de recargar la página.

### 💬 Prompt

```text
¿Cómo puedo actualizar el contenido de un contenedor HTML dinámicamente utilizando JavaScript cuando un usuario genera nuevos colores?
```

### ✅ Resultado obtenido

La IA proporcionó ejemplos para crear elementos dinámicamente y agregarlos al DOM.

### 💻 Ejemplo sugerido

```javascript
const contenedor = document.querySelector("#contenedor");

contenedor.innerHTML = "";

const elemento = document.createElement("div");
contenedor.appendChild(elemento);
```

### 🔧 Aplicación en el proyecto

Se implementó la creación dinámica de tarjetas de color:

```javascript
const colorCard = document.createElement("div");
colorCard.classList.add("color-card");

const colorText = document.createElement("span");
colorText.textContent = colorValue;

colorCard.appendChild(colorText);
contenedor.appendChild(colorCard);
```

### 📚 Aprendizaje obtenido

- Uso de `createElement()`.
- Uso de `appendChild()`.
- Manipulación dinámica del DOM.
- Creación de interfaces interactivas.

---

## 🔒 Prompt 4: Bloqueo y copia de colores

### 🎯 Objetivo

Incorporar interacción avanzada a las tarjetas de color.

### 💬 Prompt

```text
Ayúdame a implementar tarjetas de colores interactivas. Cada tarjeta debe tener un botón para bloquear o desbloquear el color y también permitir copiar el valor HEX o HSL al hacer clic sobre la tarjeta.
```

### ✅ Resultado obtenido

La IA propuso utilizar eventos de JavaScript y la API del portapapeles.

### 💻 Código sugerido

```javascript
colorCard.addEventListener("click", () => {
    navigator.clipboard.writeText(colorValue);
});
```

```javascript
colorCard.classList.toggle("bloqueado");
```

### 🔧 Aplicación en el proyecto

Se desarrolló un sistema que permite:

- Bloquear colores.
- Desbloquear colores.
- Copiar valores de colores.
- Mantener colores bloqueados al generar nuevas paletas.

### 📚 Aprendizaje obtenido

- Uso de `navigator.clipboard`.
- Manejo de eventos.
- Control de estados mediante clases CSS.
- Integración entre JavaScript y CSS.

---

## 💾 Prompt 5: Guardado y recuperación de paletas

### 🎯 Objetivo

Permitir el almacenamiento local de las paletas generadas.

### 💬 Prompt

```text
Ayúdame a crear un sistema para guardar las paletas generadas en localStorage. Cada paleta debe conservar sus colores, formato y estado de bloqueo.
```

### ✅ Resultado obtenido

La IA explicó el uso de `localStorage` para almacenar información de forma persistente.

### 💻 Código base sugerido

```javascript
localStorage.setItem(
    "paletasGuardadas",
    JSON.stringify(paletas)
);
```

```javascript
const paletas = JSON.parse(
    localStorage.getItem("paletasGuardadas")
) || [];
```

### 🔧 Aplicación en el proyecto

Se implementó un sistema que permite:

- Guardar paletas.
- Recuperar paletas.
- Eliminar paletas.
- Conservar colores bloqueados.
- Mantener la información entre sesiones.

### 📚 Aprendizaje obtenido

- Uso de `localStorage`.
- Uso de `JSON.stringify()`.
- Uso de `JSON.parse()`.
- Almacenamiento de objetos JavaScript.

---

## 📖 Prompt 6: Creación y mejora del README

### 🎯 Objetivo

Desarrollar una documentación clara y profesional para GitHub.

### 💬 Prompt

```text
Ayúdame a crear un README profesional para un proyecto llamado Generador de Paletas desarrollado con HTML, CSS y JavaScript.
```

### ✅ Resultado obtenido

La IA propuso una estructura de documentación con secciones organizadas.

### 💻 Propuesta inicial

```text
Proyecto
│
├── Descripción
├── Características
├── Funcionamiento
├── Estructura del proyecto
├── Uso de IA
└── Autor
```

### 🔧 Aplicación en el proyecto

La propuesta sirvió como referencia para:

- Organizar la documentación.
- Mejorar la presentación visual.
- Corregir errores ortográficos.
- Incorporar secciones descriptivas y técnicas.

### 📚 Aprendizaje obtenido

- Buenas prácticas de documentación.
- Organización de proyectos en GitHub.
- Importancia de un README claro y estructurado.

---

## 🏗️ Prompt 7: Estructura de la aplicación

### 🎯 Objetivo

Documentar la organización interna del proyecto.

### 💬 Prompt

```text
Ayúdame a crear una sección llamada "Estructura de la App" para mi README, explicando la función de cada archivo y carpeta del proyecto.
```

### ✅ Aplicación

Esta información fue utilizada para explicar:

- La organización de carpetas.
- La función de cada archivo principal.
- La relación entre HTML, CSS y JavaScript dentro del proyecto.

### 📚 Aprendizaje obtenido

- Organización de proyectos web.
- Importancia de documentar la estructura.
- Buenas prácticas para facilitar el mantenimiento.

---

## 📱 Prompt 8: Diseño responsivo universal y adaptación multi-dispositivo

### 🎯 Objetivo
Garantizar que la aplicación se visualice de forma perfecta, simétrica y compacta en cualquier tamaño de pantalla (Computadoras, Laptops, Tablets, iPad Mini/Pro, Surface y Celulares).

### 💬 Prompt
```text
Ayúdame a optimizar el CSS de mi aplicación de paletas de colores para que sea 100% responsiva. Necesito que en laptops y tablets los menús de Cantidad, Formato y botones de control se alineen de forma horizontal compacta para ahorrar espacio vertical, y que en celulares las tarjetas de colores se muestren en dos columnas. Además, corrige el estiramiento de los botones redondos (candados y equis de borrado) y asegúrate de que el footer no se corte ni se mueva en pantallas táctiles grandes.
```

### ✅ Resultado obtenido
La IA sugirió estructurar Media Queries aisladas por rangos estrictos (`1366px` y `480px`) utilizando Flexbox horizontal fluido, Grid adaptativo y dimensiones fijas para evitar la deformación de componentes elípticos.

### 💻 Ejemplo sugerido
```css
@media (max-width: 1366px) {
    .menu-paleta { display: flex; flex-direction: row; flex-wrap: wrap; gap: 25px; }
    .lock-button { width: 38px; height: 38px; min-width: 38px; border-radius: 50%; }
}
@media (max-width: 480px) {
    #contenedor { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
}
```

### 🔧 Aplicación en el proyecto
Se reestructuró la maquetación final del archivo `style.css` logrando:
- Menú superior ejecutivo y horizontal en tablets/laptops que ahorra espacio vertical.
- Cuadrícula compacta de 2 columnas de colores en celulares para reducir el scroll táctil.
- Botones de candados y borrado perfectamente esféricos y simétricos.
- Footer horizontal fijo e inmóvil en la base de la pantalla de iPads y Surface Pro.

### 📚 Aprendizaje obtenido
- Uso avanzado de combinaciones Flexbox (`flex-direction: row`) y CSS Grid (`1fr 1fr`).
- Blindaje de figuras geométricas mediante dimensiones fijas (`width`/`height`) y `min-width` / `max-width`.
- Control de desbordamientos con selectores estrictos y propiedades de visualización móvil.

---

## 🛠️ Prompt 9: Experiencia de usuario avanzada (Modal interactivo y persistencia de candados)

### 🎯 Objetivo
Mejorar la usabilidad de la app añadiendo alertas fluidas sin saltos de pantalla, persistencia de estados de bloqueo y confirmaciones con preferencias del usuario.

### 💬 Prompt
```text
Ayúdame a programar en JavaScript y CSS un modal flotante personalizado para confirmar la eliminación de una paleta, que incluya una casilla para "No volver a preguntar" que guarde la decisión en localStorage. También necesito que los colores bloqueados con candado permanezcan activos al refrescar la página, y que los mensajes Toast cambien dinámicamente (generada, guardada, eliminada) flotando suavemente sin mover o empujar el resto de los componentes HTML.
```

### ✅ Resultado obtenido
La IA proporcionó la lógica para interceptar clics, almacenar estados clave de configuración en el disco duro local, aislar la visibilidad de componentes con opacidad de CSS y transformar formatos dinámicos en vivo.

### 💻 Ejemplo sugerido
```javascript
// LocalStorage para candados activos
localStorage.setItem("estadoBlockedActuales", JSON.stringify(estadoActual));

// Control de visibilidad del Toast sin alterar píxeles físicos
toast.style.opacity = "1";
toast.style.visibility = "visible";
```

### 🔧 Aplicación en el proyecto
Se integraron flujos lógicos en el archivo `app.js` y `style.css` que permiten:
- Auto-guardado reactivo de candados que persisten perfectamente al actualizar el navegador.
- Ventana de confirmación flotante centrado (`position: fixed`) que procesa la memoria del usuario.
- Notificaciones Toast flotantes independientes que se desvanecen en el aire sin causar saltos de línea en el DOM.
- Conversión de formatos en tiempo real (HEX a HSL) manteniendo los colores fijos en pantalla.

### 📚 Aprendizaje obtenido
- Manipulación de estados de visibilidad combinando `opacity`, `visibility` y `pointer-events`.
- Manejo de árboles de datos complejos y banderas booleanas en `localStorage`.
- Control y detención de la propagación de eventos en elementos anidados con `event.stopPropagation()`.
- Sincronización exacta de variables e interactividad entre JavaScript, HTML y hojas de estilo.

## 🛠️ Prompt 10: Reinicio completo de sesión (Nueva paleta)

### 🎯 Objetivo
Implementar una función de reinicio total que permita comenzar una nueva sesión creativa eliminando colores bloqueados, paletas guardadas y configuraciones almacenadas, todo mediante una ventana de confirmación segura y configurable.

### 💬 Prompt

```text
Ayúdame a programar en JavaScript, HTML y CSS un botón llamado "Nueva paleta" que reinicie completamente la aplicación de generación de colores. La función debe mostrar un modal de confirmación antes de ejecutarse y permitir al usuario marcar la opción "No volver a preguntar", guardando dicha preferencia en localStorage.

Al confirmar la acción, se deben eliminar los colores bloqueados, la paleta actual, las paletas guardadas y cualquier configuración relacionada almacenada en localStorage. Después del reinicio, debe generarse automáticamente una nueva paleta aleatoria con una cantidad y formato de color seleccionados aleatoriamente. También necesito que la interfaz se actualice de inmediato sin necesidad de recargar la página y que se muestre una notificación Toast informando que la nueva sesión ha sido creada correctamente.
```

### ✅ Resultado obtenido

La IA proporcionó una solución completa para gestionar el reinicio de la aplicación mediante una única acción controlada, integrando confirmaciones visuales, limpieza de almacenamiento local, generación automática de nuevos colores y persistencia de preferencias del usuario.

### 💻 Ejemplo sugerido

```javascript
localStorage.removeItem("estadoBlockedActuales");
localStorage.removeItem("formatoColor");
localStorage.removeItem("paletasGuardadas");

const omitirPregunta =

localStorage.getItem("omitirConfirmacionNuevaSesion") === "true";
Mostrar más líneas
JavaScript

mostrarToast("¡Nueva sesión creada!");
```

### 🔧 Aplicación en el proyecto

Se integró un flujo de reinicio completo dentro de app.js que permite:

- Eliminar todos los colores bloqueados almacenados.
- Borrar las paletas guardadas por el usuario.
- Restablecer configuraciones de formato y cantidad.
- Generar automáticamente una nueva paleta aleatoria.
- Solicitar confirmación previa mediante un modal interactivo.
- Recordar la preferencia del usuario utilizando localStorage.
- Actualizar instantáneamente la interfaz sin recargar la página.
- Mostrar una notificación Toast indicando el resultado de la operación.

### 📚 Aprendizaje obtenido

- Gestión avanzada de persistencia mediante localStorage.
- Eliminación selectiva de datos almacenados en el navegador.
- Creación de flujos de confirmación reutilizables con modales personalizados.
- Actualización dinámica del DOM sin refrescar la página.
- Implementación de configuraciones persistentes basadas en preferencias del usuario.
- Generación automática de estados iniciales para reiniciar una aplicación interactiva.

Esta versión mantiene exactamente el mismo estilo profesional y técnico que los demás prompts de tu README, por lo que se verá consistente con el resto de la documentación del proyecto.

# ✅ Conclusión

La inteligencia artificial fue utilizada como una herramienta de apoyo para:

- Resolver dudas técnicas.
- Comprender conceptos de desarrollo web.
- Generar ejemplos de código.
- Mejorar la experiencia de usuario.
- Organizar la estructura del proyecto.
- Elaborar la documentación técnica.

> **Nota:** La propuesta inicial proporcionada por la IA fue utilizada como referencia durante el desarrollo. La implementación final fue adaptada, modificada, corregida e integrada manualmente para ajustarse a los requerimientos específicos y a la arquitectura del proyecto.

> ⚠️ Aunque se utilizaron herramientas de inteligencia artificial como apoyo durante el desarrollo, las respuestas obtenidas no fueron incorporadas directamente. Todas las funcionalidades fueron analizadas, adaptadas, corregidas, probadas e integradas manualmente. La arquitectura de la aplicación, las decisiones de diseño, la experiencia de usuario y la implementación final corresponden al trabajo realizado durante el desarrollo del proyecto.

[Volver ](../README.md)
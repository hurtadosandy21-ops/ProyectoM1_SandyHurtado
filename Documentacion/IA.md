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

# ✅ Conclusión

La inteligencia artificial fue utilizada como una herramienta de apoyo para:

- Resolver dudas técnicas.
- Comprender conceptos de desarrollo web.
- Generar ejemplos de código.
- Mejorar la experiencia de usuario.
- Organizar la estructura del proyecto.
- Elaborar la documentación técnica.

Todo el contenido generado mediante IA fue revisado, adaptado y validado antes de ser incorporado al proyecto.

> La implementación final, la lógica de funcionamiento, las mejoras y las decisiones de desarrollo corresponden al trabajo realizado durante la construcción del Generador de Paletas.

[Volver ](../Documentacion/README.md)
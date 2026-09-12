# 🤖 Uso de Inteligencia Artificial (IA)

Durante el desarrollo de este proyecto se utilizó inteligencia artificial como herramienta de apoyo para la investigación, resolución de dudas técnicas, generación de ejemplos de código, mejora de la interfaz y documentación.

La inteligencia artificial se utilizó principalmente como una **base o guía inicial** para comprender conceptos y obtener ejemplos de implementación. A partir de estas propuestas, el código fue **modificado, adaptado, probado y mejorado manualmente** para cumplir con los requerimientos específicos del proyecto.

Las herramientas utilizadas fueron:

- **Microsoft Copilot**: apoyo en generación de código, documentación y organización del proyecto.
- **Google Gemini**: apoyo en consultas técnicas, comprensión de conceptos y propuestas de solución.

> **Nota:** El código generado por IA no fue utilizado directamente como una versión final. Las propuestas obtenidas fueron tomadas como base de aprendizaje y posteriormente fueron modificadas y mejoradas por mí para adaptarlas al funcionamiento y diseño del Generador de Paletas.


---

# 📝 Prompt 1: Estructura base del Generador de Paletas

### 🎯 Objetivo

Obtener una estructura inicial en JavaScript para comenzar a desarrollar el Generador de Paletas, conectando los elementos HTML con la lógica de generación de colores.

### Prompt

Ayúdame con una estructura base en JavaScript para mi aplicación "Generador de Paletas". Necesito declarar variables para el botón de generar, el selector de formato HEX y HSL, y la cantidad de colores seleccionada mediante un select con opciones como 6, 8 y 9 colores.

### Resultado obtenido

La IA proporcionó una estructura inicial para seleccionar elementos del DOM, obtener los valores de los controles y ejecutar una función cuando el usuario presionara el botón de generar.

### Código base sugerido

const btnGenerar = document.querySelector("#btn-generar");
const formatoColor = document.querySelector("#formato");
const cantidadColores = document.querySelector("#cantidad");

btnGenerar.addEventListener("click", () => {
    const formato = formatoColor.value;
    const cantidad = cantidadColores.value;

    generarPaleta(formato, cantidad);
});

También se utilizó como referencia una función para generar colores HEX:

function generarColorHex() {

    const caracteres = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
        color += caracteres[Math.floor(Math.random() * 16)];
    }

    return color;
}

### 🔧 Adaptación realizada

Este código fue utilizado únicamente como base inicial. Posteriormente fue modificado y ampliado para adaptarlo a la estructura real del proyecto.

La implementación final utiliza elementos como:

const btnGenerar = document.getElementById("btn-Generar");
const selectCantidad = document.getElementById("select-Cantidad");
const selectFormato = document.getElementById("select-Formato");
const contenedor = document.getElementById("contenedor");
A partir de esta estructura se agregaron las funciones necesarias para generar paletas de diferentes cantidades y formatos.

### 📚 Aprendizaje obtenido

Este prompt permitió comprender:

Cómo conectar HTML con JavaScript.
Cómo utilizar getElementById().
Cómo obtener valores de un elemento <select>.
Cómo utilizar eventos como click.
Cómo organizar una función principal para generar una paleta.

Nota: La estructura proporcionada por la IA fue solamente una base. El código final fue desarrollado, modificado y mejorado por mí de acuerdo con las necesidades del proye

## 🎨 Prompt 2: Conversión y manejo de formatos de color

### Objetivo

Comprender cómo funcionan los formatos HEX y HSL para permitir que el usuario pueda cambiar la visualización de los colores.

### Prompt

```text
Explícame cómo funcionan los formatos HEX y HSL en JavaScript y cómo puedo utilizarlos dentro de una aplicación web.
```

### Resultado obtenido

La IA explicó las características de ambos formatos y mostró ejemplos para su generación y representación.

### Ejemplo proporcionado

```javascript
function getRandomHSL() {
    const h = Math.floor(Math.random() * 360);
    const s = Math.floor(Math.random() * 100);
    const l = Math.floor(Math.random() * 100);

    return `hsl(${h}, ${s}%, ${l}%)`;
}
```

### Aplicación en el proyecto

La información obtenida permitió implementar dos formatos de visualización:

- HEX
- HSL

El usuario puede seleccionar cualquiera de ellos desde el menú desplegable y la paleta se actualiza automáticamente.

### Aprendizaje obtenido

Este prompt permitió comprender:

- La diferencia entre HEX y HSL.
- El significado de Matiz (Hue), Saturación (Saturation) y Luminosidad (Lightness).
- Cómo generar colores aleatorios utilizando diferentes formatos.
- Cómo adaptar la lógica de generación según la selección del usuario.

> **Nota:** Las explicaciones y ejemplos proporcionados por la IA sirvieron como apoyo conceptual. La implementación final fue adaptada para ajustarse a los requerimientos específicos del proyecto y podrá seguir evolucionando con nuevas opciones de color en futuras versiones.

## ⚙️ Prompt 3: Manipulación del DOM y actualización dinámica

### Objetivo

Aprender a modificar dinámicamente los elementos HTML para actualizar la paleta sin necesidad de recargar la página.

### Prompt

```text
¿Cómo puedo actualizar el contenido de un contenedor HTML dinámicamente utilizando JavaScript cuando un usuario genera nuevos colores?
```

### Resultado obtenido

La IA proporcionó ejemplos sobre selección de elementos del DOM, creación dinámica de componentes y actualización de contenido mediante JavaScript.

### Ejemplo inicial sugerido

```javascript
const contenedor = document.querySelector("#contenedor");

contenedor.innerHTML = "";

const elemento = document.createElement("div");
contenedor.appendChild(elemento);
```

### Aplicación en el proyecto

A partir de estos conceptos se implementó la generación dinámica de las tarjetas de color:

```javascript
const colorCard = document.createElement("div");
colorCard.classList.add("color-card");

const colorText = document.createElement("span");
colorText.textContent = colorValue;

colorCard.appendChild(colorText);
contenedor.appendChild(colorCard);
```

Cada vez que el usuario selecciona una nueva cantidad, cambia el formato o presiona el botón de generar, la interfaz se actualiza automáticamente.

### Aprendizaje obtenido

Este prompt permitió comprender:

- Cómo seleccionar elementos del DOM.
- Cómo utilizar `createElement()`.
- Cómo agregar elementos mediante `appendChild()`.
- Cómo actualizar contenido dinámicamente.
- Cómo generar interfaces interactivas con JavaScript.

> **Nota:** Los ejemplos proporcionados por la IA fueron utilizados como guía para comprender la manipulación del DOM. La lógica final fue ampliada y adaptada para satisfacer las necesidades específicas del Generador de Paletas.

## 💻 Prompt 4: Estructura base para el Generador de Paletas

### Objetivo

Obtener una base de programación en JavaScript para comenzar el desarrollo de la aplicación, conectando los elementos de la interfaz con la lógica de generación de colores.

### Prompt

```text
Ayúdame con una estructura base en JavaScript para mi aplicación "Generador de Paletas". Tengo que declarar variables para mi botón de generar, el selector de formato que cambia entre HEX y HSL, y también la cantidad de colores seleccionada en un <select> con opciones como 6, 8 y 9.
```

### Resultado obtenido

La IA proporcionó una estructura inicial para organizar el proyecto, declarando las variables necesarias para acceder a los elementos del DOM y gestionar los eventos de interacción del usuario.

### Ejemplo inicial sugerido

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

### Adaptación e implementación realizada

Tomando como referencia esta estructura, se desarrolló una versión más completa que incluye:

- Selección de elementos mediante `getElementById()`.
- Generación de colores aleatorios en formato HEX.
- Generación de colores aleatorios en formato HSL.
- Creación dinámica de tarjetas de color.
- Actualización automática de la paleta al cambiar la cantidad de colores.
- Actualización automática al cambiar el formato de color.
- Generación inicial de una paleta al cargar la página.

### Fragmento del código implementado

```javascript
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

function generarPaleta() {
    const cantidad = parseInt(selectCantidad.value, 10);
    const formato = selectFormato.value;

    // Generación dinámica de la paleta
}
```

### Aplicación en el proyecto

La estructura sugerida por la IA sirvió como punto de partida para desarrollar la lógica principal de la aplicación. A partir de ella se añadieron funciones, validaciones y eventos que permitieron construir la versión final del generador de paletas.

### Aprendizaje obtenido

Gracias a este prompt fue posible comprender:

- Cómo acceder a elementos HTML desde JavaScript.
- Cómo utilizar eventos como `click` y `change`.
- Cómo obtener valores de los elementos `<select>`.
- Cómo generar contenido dinámicamente mediante JavaScript.
- Cómo organizar el flujo principal de una aplicación interactiva.

> **Nota:** El código proporcionado por la IA fue utilizado únicamente como una referencia inicial. Durante el desarrollo se realizaron múltiples modificaciones, optimizaciones y mejoras por cuenta propia para adaptarlo a los requerimientos específicos del proyecto. Además, se contemplan futuras mejoras y nuevas funcionalidades para seguir optimizando la aplicación.

### Aplicación en el proyecto

A partir de esta estructura se desarrolló la lógica principal de la aplicación:

- Se declararon las variables de los elementos HTML.
- Se capturó la cantidad de colores seleccionada por el usuario.
- Se obtuvo el formato de color elegido (HEX o HSL).
- Se ejecutó la generación de una nueva paleta al presionar el botón **Generar**.
- Se organizó mejor el código separando la obtención de datos de la generación de colores.

## 📚 Prompt 5: Creación y organización de la documentación

### Objetivo

Crear una documentación clara, organizada y profesional para presentar el proyecto en GitHub.

### Prompt

```text
Ayúdame a crear un README profesional para un proyecto llamado Generador de Paletas desarrollado con HTML, CSS y JavaScript.
```

### Resultado obtenido

La IA propuso una estructura básica de documentación que incluía las secciones más importantes para describir el proyecto.

### Propuesta inicial sugerida

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

### Aplicación en el proyecto

La propuesta sirvió como base para construir el README definitivo, incluyendo:

- Descripción del proyecto.
- Enlace de demostración.
- Explicación de funcionalidades.
- Estructura de archivos.
- Documentación del uso de IA.
- Información de la autora.

### Aprendizaje obtenido

Gracias a este prompt se comprendió:

- La importancia de documentar correctamente un proyecto.
- Cómo estructurar un README profesional.
- Cómo organizar la información para facilitar la lectura.
- La utilidad de incluir secciones descriptivas y técnicas dentro de la documentación.

> **Nota:** La estructura propuesta por la IA fue utilizada únicamente como referencia inicial. La versión final del README fue modificada, ampliada y personalizada para reflejar con mayor precisión las características y necesidades del proyecto. Además, la documentación podrá seguir actualizándose y mejorándose conforme evolucione la aplicación.

## ✨ Prompt 6: Mejora y reorganización del README

### Objetivo

Mejorar la calidad de la documentación del proyecto, corrigiendo errores de redacción, ortografía y organización para que sea más clara y profesional.

### Prompt

```text
Mejora mi README, corrige errores ortográficos, organiza mejor las secciones y utiliza buenas prácticas de documentación para GitHub.
```

### README original

El proyecto contaba inicialmente con una documentación funcional, pero con algunos problemas de organización y redacción.

#### Fragmento original

```md
ProyectoM1_SandyHurtado

Link de web:
https://hurtadosandy21-ops.github.io/ProyectoM1_SandyHurtado/

Generador de paletas

Está es una app para generar paletas de colores,en diferentes formatos, y en diferentes cantidad de estos, facilitando el encontar una paleta de colores que te guste.

¿Para que sirve?

Nuestra web nos sirve, para que generemos una platea de colores, hasta encontrar una que nos guste.

¿Como Funciona?

El Generador de Paletas, tiene dos Botones:

- Botón Generar
- Cantidad
- Formato de Color
```

### Propuesta de mejora generada con IA

La IA sugirió reorganizar la documentación utilizando secciones más claras, títulos descriptivos, corrección ortográfica y una estructura profesional para GitHub.

#### Ejemplo de mejora sugerida

```md
# 🎨 ProyectoM1_SandyHurtado

## 🌐 Demo del proyecto

👉 https://hurtadosandy21-ops.github.io/ProyectoM1_SandyHurtado/

## 📖 Descripción

Generador de Paletas es una aplicación web que permite crear paletas de colores de manera rápida y sencilla. El usuario puede seleccionar la cantidad de colores y el formato de visualización disponible.

## 📑 Índice

- Información de la app
- Funcionamiento
- Estructura del proyecto
- Uso de IA
```

### Resultado obtenido

La mejora permitió:

- Corregir errores ortográficos y gramaticales.
- Organizar la información en secciones claras.
- Incorporar un índice de navegación.
- Mejorar la presentación visual del documento.
- Explicar mejor el funcionamiento de la aplicación.
- Hacer la documentación más fácil de leer y mantener.

### Aplicación en el proyecto

Las sugerencias fueron utilizadas como referencia para reconstruir la documentación principal del proyecto. Posteriormente se realizaron modificaciones propias para adaptarla a las necesidades específicas del Generador de Paletas.

### Aprendizaje obtenido

Durante este proceso se comprendió la importancia de:

- Mantener una estructura clara en la documentación.
- Describir correctamente el objetivo del proyecto.
- Utilizar títulos y subtítulos organizados.
- Facilitar la lectura para usuarios y desarrolladores.
- Documentar adecuadamente las funcionalidades implementadas.

> **Nota:** La versión final del README no corresponde exactamente a la propuesta generada por la IA. Se realizaron múltiples modificaciones, correcciones y mejoras manuales para adaptarlo al proyecto y a los requerimientos de la actividad. Además, la documentación es un elemento vivo del proyecto, por lo que podrá seguir actualizándose y mejorándose conforme se agreguen nuevas funcionalidades o se identifiquen oportunidades de mejora.

## 🏗️ Prompt 7: Estructura de la aplicación

**Objetivo:** Documentar la organización interna del proyecto.

### Prompt

Ayúdame a crear una sección llamada "Estructura de la App" para mi README, explicando la función de cada archivo y carpeta del proyecto.

### Uso

Se utilizó para describir la arquitectura básica del proyecto y el propósito de cada archivo principal.



## ✅ Conclusión

La inteligencia artificial fue utilizada como una herramienta de apoyo para:

- Resolver dudas técnicas.
- Generar ejemplos de código.
- Comprender conceptos de desarrollo web.
- Mejorar la interfaz de usuario.
- Crear y organizar la documentación.
- Corregir errores de redacción y ortografía.

Todo el contenido generado por IA fue revisado, adaptado y validado antes de ser incorporado al proyecto.

## Prompt 8: Bloqueo y copia de colores

#### 🎯 Objetivo

Agregar interacción a las tarjetas de color para permitir bloquear colores y copiar sus valores.

### Prompt
Ayúdame a implementar tarjetas de colores interactivas. Cada tarjeta debe tener un botón para bloquear o desbloquear el color y también permitir copiar el valor HEX o HSL al hacer clic sobre la tarjeta.
Resultado obtenido

La IA propuso utilizar eventos de JavaScript, clases CSS y la API del portapapeles para controlar estas acciones.

Código base utilizado como referencia
colorCard.addEventListener("click", () => {
    navigator.clipboard.writeText(colorValue);
});

Para el bloqueo se utilizó una clase:

colorCard.classList.toggle("bloqueado");

### 🔧 Adaptación realizada

La funcionalidad fue ampliada para que los colores bloqueados se mantengan cuando se genera una nueva paleta.

### De esta manera:

🔒 Color bloqueado → se mantiene
🔓 Color desbloqueado → puede cambiar

También se agregó un botón específico para bloquear y desbloquear cada color.

Además, al hacer clic sobre una tarjeta se puede copiar el valor del color al portapapeles.

### 📚 Aprendizaje obtenido

Este proceso permitió comprender:

Manejo de eventos click.
Uso de classList.
Creación de elementos dinámicos.
Uso de navigator.clipboard.
Manejo de estados individuales dentro de una interfaz.
Integración entre JavaScript y CSS.

>Nota: La solución inicial proporcionada por la IA fue utilizada como base. La lógica de bloqueo, generación y copia fue posteriormente modificada y mejorada por mí para adaptarla al funcionamiento final del proyecto.

## 💾 Prompt 9: Guardado y recuperación de paletas

### 🎯 Objetivo

Permitir que el usuario pueda guardar sus paletas y recuperarlas posteriormente utilizando localStorage.

 ### Prompt
Ayúdame a crear un sistema para guardar las paletas generadas en localStorage. Cada paleta debe conservar sus colores, formato y estado de bloqueo, y debe poder cargarse o eliminarse posteriormente.
Resultado obtenido

La IA explicó cómo utilizar:

localStorage.setItem();
localStorage.getItem();
JSON.stringify();
JSON.parse();
Código base
localStorage.setItem(
    "paletasGuardadas",
    JSON.stringify(paletas)
);

Y para recuperar los datos:

const paletas = JSON.parse(
    localStorage.getItem("paletasGuardadas")
) || [];
🔧 Adaptación realizada

A partir de esta base se desarrolló un sistema completo de almacenamiento.

Cada paleta guarda información como:

{
    id: Date.now(),
    colores: colores,
    formato: selectFormato.value
}

Cada color también conserva su estado:

{
    color: card.dataset.color,
    bloqueado: card.classList.contains("bloqueado")
}

El sistema permite:

💾 Guardar una paleta.
🎨 Visualizar las paletas guardadas.
🔄 Cargar una paleta.
❌ Eliminar una paleta.
🔒 Conservar los colores bloqueados.
💿 Mantener las paletas almacenadas mediante localStorage.

También se implementó una validación de los datos almacenados para evitar problemas con información antigua o incorrecta.

### 📚 Aprendizaje obtenido

Este prompt permitió comprender:

Cómo funciona localStorage.
Cómo almacenar objetos utilizando JSON.
Cómo recuperar información almacenada.
Cómo utilizar filter() para eliminar elementos.
Cómo buscar una paleta mediante un identificador.
Cómo reconstruir elementos HTML a partir de datos almacenados.

>Nota: La estructura inicial proporcionada por la IA fue utilizada como base de aprendizaje. El sistema final fue ampliado, modificado y mejorado por mí para incorporar las diferentes funcionalidades del proyecto.


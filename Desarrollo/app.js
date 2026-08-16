// Elementos

const btnGenerar = document.getElementById('btn-generar');
const contenedorPaleta= document.getElementById('contenedor-paleta');
const selectTamano =document.getElementById('tamano-paleta');

// Función para crear un código de color aleatorio

function generarColor () {
    const caracteres = '0123456789ABCDEF';
    let color= '#';

    for (let i = 0; i < 6; i++) {
        color += caracteres[Math.floor(Math.random() * 16)];
    }
    return color;
}

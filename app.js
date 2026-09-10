const btnGenerar = document.getElementById(`btn-Generar`);
const selectCantidad = document.getElementById(`select-Cantidad`);
const selectFormato = document.getElementById(`select-Formato`);
const contenedor = document.getElementById(`contenedor`);

function getRandomHex(){
    const letters =`0123456789ABCDEF`;
    let color= `#`;
    for (let i = 0; i < 6; i++){
        color += letters[Math.floor(Math.random()* 16)];
    } 
    return color; 
}
function getRandomHSL(){
    const h = Math.floor(Math.random()*360);
    const s = Math.floor(Math.random()*100);
    const l = Math.floor(Math.random()*100);
    return `hsl(${h}, ${s}% , ${l}%)`;
}

function generarPaleta(){
    if (!contenedor) return;
    contenedor.innerHTML=``;

    const cantidad = parseInt (selectCantidad.value, 10);
    const formato = selectFormato.value;

    for (let i= 0; i <cantidad; i++){
        const colorValue= formato ===`HEX`? getRandomHex (): getRandomHSL();

        const colorCard =document.createElement(`div`);
        colorCard.classList.add(`color-card`);
        colorCard.style.backgroundColor = colorValue;

        const colorText= document.createElement(`span`);
        colorText.textContent = colorValue;

        colorCard.appendChild(colorText);
        contenedor.appendChild(colorCard);
    }
}

btnGenerar.addEventListener(`click`,generarPaleta);
selectCantidad.addEventListener(`change`,generarPaleta);
selectFormato.addEventListener(`change`,(e) => {
    const formato=e.target.value;
    /*updateColorDisplay(formato);*/
});

generarPaleta();

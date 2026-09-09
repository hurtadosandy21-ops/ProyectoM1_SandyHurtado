const btngenerar= document.getElementById(`btn-generar`);
const btnformato= document.getElementById(`btn-formato`);
const Cantidad= document.getElementById(`cantidad`);
const Formato= document.getElementById(`formato`);

function getRamdonHsl(){
    const h= Math.floor(Math.ramdon()*360);
    const s= Math.floor(Math.ramdon()*100);
    const l= Math.floor(Math.ramdon()*100);
}
function generarPaletta(){
    paletteContainer.innerHTML=``;

    const cantidad =parseInt(Cantidad.value,10);
    const formato = Formato.value;

    for (let i = 0; i< formato;i++){
        const colorValue = cantidad ===`HSL`? getRamdonHsl()

    }
}
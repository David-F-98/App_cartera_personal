'use strict';

const formulario$1 =  document.getElementById('formulario-gasto');
const botonFormulario =  document.getElementById('toggle-form-gasto');

const abrirFormularioDesdeGastos = ()=>{
    botonFormulario.classList.add('agregar-gasto__btn--active');
    formulario$1.classList.add('formulario-gasto--active');
};

const cerrarFormularioDesdeGastos = ()=>{
    botonFormulario.classList.remove('agregar-gasto__btn--active');
    formulario$1.classList.remove('formulario-gasto--active');
};

botonFormulario.addEventListener('click',(e)=>{
    const bntActivo = ([...formulario$1.classList].includes('formulario-gasto--active'));
    if(bntActivo){
        cerrarFormularioDesdeGastos();
    }else {
        abrirFormularioDesdeGastos();
    }});

// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).slice(1));
}

function unsafeStringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
}

const randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
var native = {
  randomUUID
};

function v4(options, buf, offset) {
  if (native.randomUUID && !buf && !options) {
    return native.randomUUID();
  }

  options = options || {};
  const rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return unsafeStringify(rnds);
}

const formulario = document.querySelector('#formulario-gasto form');
//Accedemos al id=descripcion mediante esta otra manera
const descripcion = formulario.descripcion;
const precio =  formulario.precio;

const expRegDescripcion = /^[a-zA-Z0-9\_\- ]{4,30}$/;
const expRegPrecio = /^\d+(\.\d+)?$/;

const comprobarDescripcion = ()=>{
    if(!expRegDescripcion.test(descripcion.value)){
        descripcion.classList.add('formulario-gasto__input--error');

        //Nos dirijimos al elemento padre y buscamos la clase .formulario-gasto__leyenda para añadirle o modificarlo
        formulario.descripcion.parentElement
            .querySelector('.formulario-gasto__leyenda')
            .classList.add('formulario-gasto__leyenda--active');

        return false;
    }else {
        descripcion.classList.remove('formulario-gasto__input--error');

        formulario.descripcion.parentElement
            .querySelector('.formulario-gasto__leyenda')
            .classList.remove('formulario-gasto__leyenda--active');

        return true;
    }};

const comprobarPrecio = ()=>{
    if(!expRegPrecio.test(precio.value)){
        precio.classList.add('formulario-gasto__input--error');

        //Nos dirijimos al elemento padre y buscamos la clase .formulario-gasto__leyenda para añadirle o modificarlo
        formulario.precio.parentElement
            .querySelector('.formulario-gasto__leyenda')
            .classList.add('formulario-gasto__leyenda--active');

        return false;
    }else {
        precio.classList.remove('formulario-gasto__input--error');

        formulario.precio.parentElement
            .querySelector('.formulario-gasto__leyenda')
            .classList.remove('formulario-gasto__leyenda--active');

        return true;
    }};


//comprobando al hacer click fuera del input
descripcion.addEventListener('blur', (e)=>comprobarDescripcion());
//Comprobando al teclear en el input
descripcion.addEventListener('keyup', (e)=>{
//Trasformamos el elmento que obtenemos en  e.target.classList en una arreglo para saber si tienen la respectiva clase;
const  validacionAlTeclearDes =   [...e.target.classList].includes('formulario-gasto__input--error');
    if(validacionAlTeclearDes){
        comprobarDescripcion();
    }
});


//comprobando al hacer click fuera del input
precio.addEventListener('blur', (e)=>comprobarPrecio());
//Comprobando al teclear en el input
precio.addEventListener('keyup', (e)=>{
//Trasformamos el elmento que obtenemos en  e.target.classList en una arreglo para saber si tienen la respectiva clase;
const  validacionAlTeclearPre =   [...e.target.classList].includes('formulario-gasto__input--error');
    if(validacionAlTeclearPre){
        comprobarPrecio();
    }
});

formulario.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(comprobarDescripcion() && comprobarPrecio()){
        //Creamos un objeto donde vamos a guadar los diferentes gastos
        const nuevoGasto = {
            id: v4(),
            fecha: new Date(),
            descripcion: descripcion.value,
            precio: precio.value
        };

        const gastosGuardados = JSON.parse(window.localStorage.getItem('gastos'));
        
        //Comprobamos si hay gastos 
        if(!gastosGuardados){
            //Si NO tiene, creamos la primera lista de gastos
            window.localStorage.setItem('gastos',JSON.stringify([{...nuevoGasto}]));
        } else {
            //Si tiene, creamos una nueva lista de gastos
            const nuevaListaGastos =  [...gastosGuardados,nuevoGasto];
            window.localStorage.setItem('gastos', JSON.stringify(nuevaListaGastos));
        }
    }});
//# sourceMappingURL=bundle.js.map

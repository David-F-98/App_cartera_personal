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

const formulario = document.querySelector('#formulario-gasto form');
//Accedemos al id=descripcion mediante esta otra manera
const descripcion = formulario.descripcion;

const expRegDescripcion = /^[a-zA-Z0-9\_\- ]{4,30}$/;

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
    }
};

//comprobando al hacer click fuera del input
descripcion.addEventListener('blur', (e)=>comprobarDescripcion());

//Comprobando al teclear en el input
descripcion.addEventListener('keyup', (e)=>{
//Trasformamos el elmento que obtenemos en  e.target.classList en una arreglo para saber si tienen la respectiva clase;
const  validacionAlTeclear =   [...e.target.classList].includes('formulario-gasto__input--error');
    if(validacionAlTeclear){
        comprobarDescripcion();
    }
});
//# sourceMappingURL=bundle.js.map

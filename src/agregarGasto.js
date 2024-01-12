import cargarGastos from './cargarGastos';
import { cerrarFormularioDesdeGastos } from './eventoBtnFormularioGastos';
import { v4 as uuidv4 } from 'uuid';
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
    }else{
        descripcion.classList.remove('formulario-gasto__input--error');

        formulario.descripcion.parentElement
            .querySelector('.formulario-gasto__leyenda')
            .classList.remove('formulario-gasto__leyenda--active');

        return true;
    };
};

const comprobarPrecio = ()=>{
    if(!expRegPrecio.test(precio.value)){
        precio.classList.add('formulario-gasto__input--error');

        //Nos dirijimos al elemento padre y buscamos la clase .formulario-gasto__leyenda para añadirle o modificarlo
        formulario.precio.parentElement
            .querySelector('.formulario-gasto__leyenda')
            .classList.add('formulario-gasto__leyenda--active');

        return false;
    }else{
        precio.classList.remove('formulario-gasto__input--error');

        formulario.precio.parentElement
            .querySelector('.formulario-gasto__leyenda')
            .classList.remove('formulario-gasto__leyenda--active');

        return true;
    };
};


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
            id: uuidv4(),
            fecha: new Date(),
            descripcion: descripcion.value,
            precio: precio.value
        };

        const gastosGuardados = JSON.parse(window.localStorage.getItem('gastos'));
        
        //Comprobamos si hay gastos 
        if(!gastosGuardados){
            //Si NO tiene, creamos la primera lista de gastos
            window.localStorage.setItem('gastos',JSON.stringify([{...nuevoGasto}]));
        } else{
            //Si tiene, creamos una nueva lista de gastos
            const nuevaListaGastos =  [...gastosGuardados,nuevoGasto];
            window.localStorage.setItem('gastos', JSON.stringify(nuevaListaGastos));
        };


        descripcion.value = '';
        precio.value='';
        cargarGastos();
        cerrarFormularioDesdeGastos();
    };
});
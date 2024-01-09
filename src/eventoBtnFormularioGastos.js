const formulario =  document.getElementById('formulario-gasto');
const botonFormulario =  document.getElementById('toggle-form-gasto');

const abrirFormularioDesdeGastos = ()=>{
    botonFormulario.classList.add('agregar-gasto__btn--active');
    formulario.classList.add('formulario-gasto--active');
};

const cerrarFormularioDesdeGastos = ()=>{
    botonFormulario.classList.remove('agregar-gasto__btn--active');
    formulario.classList.remove('formulario-gasto--active');
};

botonFormulario.addEventListener('click',(e)=>{
    const bntActivo = ([...formulario.classList].includes('formulario-gasto--active'));
    if(bntActivo){
        cerrarFormularioDesdeGastos();
    }else{
        abrirFormularioDesdeGastos();
    };
});;
const formulario =  document.getElementById('formulario-gasto');
const botonFormulario =  document.getElementById('toggle-form-gasto');

const abrirFormularioDesdeGastos = (modo = 'agregarGasto')=>{
    botonFormulario.classList.add('agregar-gasto__btn--active');
    formulario.classList.add('formulario-gasto--active');

    
    if(modo === 'editarGasto'){
        document.querySelector('.formulario-gasto__btn').innerText = 'Editar Gasto';
        document.querySelector('.formulario-gasto__titulo').innerText = 'Editar Gasto';
        document.getElementById('formulario-gasto').dataset.modo = modo;
    } else{  
        document.querySelector('.formulario-gasto__btn').innerText = 'Agregar Gasto';
        document.querySelector('.formulario-gasto__titulo').innerText = 'Agregar Gasto';
        document.getElementById('formulario-gasto').dataset.modo = modo;
        document.getElementById('descripcion').value = '';
        document.getElementById('precio').value = '';
        
    }
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

export {cerrarFormularioDesdeGastos, abrirFormularioDesdeGastos};
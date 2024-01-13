import cargarGastos from "./cargarGastos";
import cargarTotalGastado from "./cargarTotalGastado";
import { abrirFormularioDesdeGastos, cerrarFormularioDesdeGastos } from "./eventoBtnFormularioGastos";

const contenedorGastos = document.getElementById('gastos');

contenedorGastos.addEventListener('click', (e)=>{
    e.preventDefault();
    const gasto = e.target.closest('.gasto');

    if(gasto){
        if(gasto.scrollLeft > 0){
            gasto.querySelector('.gasto__info').scrollIntoView({
                behavior: 'smooth',
                inline: 'start',
                block: 'nearest'
            });    
        } else{
            gasto.querySelector('.gasto__acciones').scrollIntoView({
                behavior: 'smooth',
                inline: 'start',
                block: 'nearest'
            });

        };
    };

    if(e.target.closest('[data-accion="editar-gasto"]')){
        const id = gasto.dataset.id;
        
        const gastosGuardados = JSON.parse(window.localStorage.getItem('gastos'));

        let precio = '';
        let  descripcion = '';
    
        if(gastosGuardados && gastosGuardados.length>0){
            gastosGuardados.forEach((gasto) => {
                if(id === gasto.id){
                    precio = gasto.precio;
                    descripcion = gasto.descripcion;
                };
            });
            
            document.querySelector('#formulario-gasto #descripcion').value = descripcion;
            document.querySelector('#formulario-gasto #precio').value = precio;
            document.querySelector('#formulario-gasto').dataset.id = id;
            abrirFormularioDesdeGastos('editarGasto');
        };

    };


    if(e.target.closest('[data-accion="eliminar-gasto"]')){
        const id = gasto.dataset.id;
        
        const gastosGuardados = JSON.parse(window.localStorage.getItem('gastos'));

        if(gastosGuardados){
            const nuevosGastos = gastosGuardados.filter((gasto)=>{
                if(gasto.id !== id){
                    return gasto;
                };
            });
            window.localStorage.setItem('gastos',JSON.stringify(nuevosGastos));
        };

        cargarGastos();
        cargarTotalGastado();
    };
})
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
    }
})
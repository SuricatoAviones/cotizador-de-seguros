//Cotizador constructor
//Constructor para seguro
function Seguro(marca,anio,tipo){
    this.marca = marca;
    this.anio = anio;
    this.tipo = tipo;
}
Seguro.prototype.cotizarSeguro = function(informacion){
    /* 1 = americado : 1.15
        2 = asiatico 1.05
        3 = europeo 1.35 */
    let cantidad
    const base =2000;

    switch(this.marca){
        case '1':
                cantidad = base *1.15;
                break;
        case '2':
                cantidad = base *1.05;
                break;        
        case '3':
                cantidad = base *1.35;
                break;
    }

    //Leer el año
    const diferencia = new Date().getFullYear()-this.anio;
   
    //Cada año de diferencia se le reduce el 3% el valor del seguro

    cantidad -=((diferencia *3 )* cantidad)/100;

    //Tipo de seguro, si es basico se multiplica por 30% mas y si es completo por 50% mas

    if(this.tipo ==='basico'){
        cantidad *= 1.30;
    }
    else{
        cantidad *=1.50;
    }

    return cantidad;

}


//Todo lo que se muestra
function Interfaz(){    



}

//Mensaje que imprime el html
Interfaz.prototype.mostrarMensaje = function(mensaje){
    const div = document.createElement('div');

    if(tipo ==='error'){
        div.classList.add('mensaje','error');
    }
    else{
        div.classList.add('mensaje','correcto');
    }

    div.innerHTML = `${mensaje}`;

    formulario.insertBefore(div,document.querySelector('.form-group'));

    setTimeout(function(){
        document.querySelector('.mensaje').remove();
    },3000);
}

//Imprime el resultado de la cotizacion
Interfaz.prototype.mostrarResultado = function (seguro,total){
    const resultado = document.getElementById('resultado');

    let marca;

    switch(seguro.marca){
        case '1': 
            marca = 'Americano';
            break;
        case '2': 
            marca = 'Asiatico';
            break;
        case '3': 
            marca = 'Europeo';
            break;    
    }

    //Crear un div

    const div = document.createElement('div');

    //Insertar la informacion
    div.innerHTML = `
        <p>Tu Resumen:</p>
        <p>Marca: ${marca}</p>
        <p>Año: ${seguro.anio}</p>
        <p>Tipo: ${seguro.tipo}</p>
        <p>Total: ${total}</p>
    
    `;
    const spinner = document.querySelector('#cargando img');
    spinner.style.display = 'block';
    setTimeout(function(){
        spinner.style.display = 'none';
        resultado.appendChild(div);
    }, 3000);
    resultado.appendChild(div);



}


//Events Listeners
const formulario = document.getElementById('formulario');

formulario.addEventListener('submit',function(e){
    e.preventDefault();
    //Leer la marca seleccionada del select
    const marca = dociment.getElementById('marca');
    const marcaSeleccionada = marca.options[marca.selectedIndex].value;

    //Leer el año seleccionado
    const anio = document.getElementById('anio');
    const anioSeleccionado = anio.option[anio.selectedIndex].value;

    //Leer el tipo seleccionado

    const tipo = document.querySelector('input{name="tipo}:checked').value;

    //Crear Instancia de Interfaz

    const interfaz = new Interfaz();

    //Revisamos que los campos no esten vacios
    if(marcaSeleccionada==='' || anioSeleccionado===''| tipo ===''){
        //Interfaz imprimiendo un error
        interfaz.mostrarMensaje('Faltan Datos, revisar el formulario','error');
    }
    else{
        
        //Limpiar resultados anteriores

        const resultados = document.querySelector('#resultado div');

        if(resultados !=null){
            resultados.remove();
        }
        
        
        //Instaciar seguro

        const seguro = new Seguro(marcaSeleccionada,anioSeleccionado,tipo);

        //Cotizar el seguro

        const cantidad = seguro.cotizarSeguro();

        //Mostrar el resultado
        interfaz.mostrarResultado(seguro, cantidad);
        interfaz.mostrarMensaje('Cotizando..','exito');
        

    }
    
});



const max = new Date().getFullYear(),
    min =max-20;

const selectAnios = document.getElementById('anio');

for(let i = max; i > min; i--){
    let option = document.createElement('option');
    option.value =i;
    option.innerHTML = i;
    selectAnios.appendChild(option);
}
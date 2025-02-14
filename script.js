let eventos = [];//arreglo para guardar 
let arr = [];//bodega para colocar el contenido de los arreglos

const nombreEvento = document.querySelector("#nombreEvento");//por id
const fechaEvento = document.querySelector("#fechaEvento");
const botonAgregar = document.querySelector("#agregar");
const listaEventos = document.querySelector("#listaEventos");

const json = cargar();//llamado funcion cargar datos

//try
try{
    arr = JSON.parse(json); //
}catch(error){
    arr = [] //arreglo vacio
}

eventos = arr? [...arr] : []; //arreglos lo que este en eventos


mostrarEventos();//mostrar

//funcion llamado a la etiqueta form -- escuha submit
document.querySelector("form").addEventListener("submit", e =>{
    e.preventDefault();//prevent
    agregarEvento();//agregar funcion
});
    
//funcion agregar evento
function agregarEvento() {
    //validar no enviar datos vacios
    if(nombreEvento.value === "" || fechaEvento.value === ""){
        return;//return no crea el evento
    }
        
    //validar si la  fecha Actual del sistema correspondiente es menor a 0
    if(diferenciaFecha(fechaEvento.value) < 0){
        return;//return no crea el evento
    }   
    
    //elementos del evento

    const nuevoEvento = {
        id: (Math.random() * 100).toString(36).slice(3),  //id para cada evento  3 numero al azar
        nombre: nombreEvento.value, //nombre tipo objeto tiene varios valores
        fecha: fechaEvento.value, //fecha del value
    };
    
    eventos.unshift(nuevoEvento); //enviar datos

    guardar(JSON.stringify(eventos)); //guardarlo al localstorage

    nombreEvento.value = ""; //en blanco
    mostrarEventos();//llamdo funcion
}

//funcion diferencia fecha
function diferenciaFecha(destino) {
    let fechaDestino = new Date(destino);//variable fecha
    let fechaActual = new Date(); //fecha actual del sistema
    let diferencia = fechaDestino.getTime() - fechaActual.getTime(); //diferencia devuelve en milisegundos
    let dias = Math.ceil(diferencia / (1000 * 3600 * 24)); //dias .ceil redondea por arriba convercion a dias 
    return dias; //retornar dias
}

//mostrar eventos
function mostrarEventos(){
    //pintar los eventos 
    const eventosHTML = eventos.map((evento) => {
        return `
            <div class="evento">
                <div class="dias">
                    <span class="diasFaltantes">${diferenciaFecha(evento.fecha)}</span>
                    <span class="texto">dias<br/>para</span>
                </div>

                <div class="nombreEvento">${evento.nombre}</div>
                <div class="fechaEvento">${evento.fecha}</div>
                <div class="acciones">
                    <button data-id="${evento.id}" class="eliminar">Eliminar</button>
                </div>
            </div>
        `;
    });

    listaEventos.innerHTML = eventosHTML.join("");

    //eiminar por id del evento
    document.querySelectorAll('.eliminar').forEach(button => {
        button.addEventListener("click", e =>{//cuando haga click en eliminar
            const id = button.getAttribute('data-id');//el atributo con el id
            eventos = eventos.filter(evento => evento.id != id);  //filtro del id que se va elimnar

            guardar(JSON.stringify(eventos)); //guardarlo al localstorage

            mostrarEventos();//llamado funcion
        });       
    });
}

//guardar datos
function guardar(datos){
    localStorage.setItem("lista", datos);//localstorage a una lista
}
    
//cargar
function cargar(){
    return localStorage.getItem("lista");//localstorage a una lista
}
   

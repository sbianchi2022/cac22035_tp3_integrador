//CAC22035 - 20220529 - Sergio Bianchi - TRABAJO INTEGRADOR JAVASCRIPT: como aplicar DOM para trabajo integrador.
 
//defino valor del ticket:
const valorTicket = 200;
    //defino porcentajes de descuento segun categorias:
    // let descuentoEstudiante = 80;
    // let descuentoTrainee    = 50;
    // let descuentoJunior     = 15;
    //Array Asociativo: const descuento = {'sinCategoria':0, 'estudiante':80, 'trainee':50, 'junior':15};
    const descuento = [0, 80, 50, 15];
//Elementos en variables:
let nombre          = document.getElementById('nombre');
let apellido        = document.getElementById('apellido');
let mail            = document.getElementById('email');
let cantidadTickets = document.getElementById('cantidadTickets');
let categoria       = document.getElementById('categoria');
//Funcion para quitar el estilo de error a los elementos del form:
function quitarClaseError(){
    let x = document.querySelectorAll(".form-control, .form-select");       //selecciona todos los elementos con esas clases. Devuelve un array, es un nodeListNode.
    let i;
        //console.log('i: '+i +'  -  '+x[0].value+x[1].value+x[2].value+x[3].value+x[4].value);
    for(i=0; i<x.length; i++){    
            //console.log(x[i].value);
        //La clase is-invalida, se va a ir agregando a los elementos, cuando se detecte que usuario dejo vacio alguno de los campos obligatorios, con javascript.
        x[i].classList.remove('is-invalid');        //quita la clase de error.
    }
}
//Calculo total a pagar:
function total_a_pagar(){
    //ejecuto funcion para que quite todos los estilos de error en los campso que los tuvieran:
    quitarClaseError();
    //Verifico si lleno los siguientes campos, sino le aplico un estilo de error, hago foco en en dicho campo q quedo vacio.
    if(nombre.value === ""){
        alert("Por favor, escribí tu nombre.");
        nombre.classList.add("is-invalid");
        nombre.focus();
        return;     //esto finaliza la ejecucion de esta funcion... no sigue por ahora con el siguiente if.
    }
    if(apellido.value === ""){
        alert("Por favor, escribí tu apellido.");
        apellido.classList.add("is-invalid");
        apellido.focus();
        return;
    }
    if(mail.value === ""){
        alert("Por favor, escribí tu mail.");
        mail.classList.add("is-invalid");
        mail.focus();
        return;
    }
    if(cantidadTickets.value === ""){
        alert("Por favor, escribí la cantidad de tickets deseados.");
        cantidadTickets.classList.add("is-invalid");
        cantidadTickets.focus();
        return;
    }
    if(categoria.value === ""){
        alert("Por favor, selecciona la categoria deseada.");
        categoria.classList.add("is-invalid");
        categoria.focus();
        return;
    }
    //Para determinar si el correo electronico es valido o no:
    const emailValido = mail => {
        /* https://lineadecodigo.com/javascript/validar-el-email-con-javascript/
        - En primer lugar La expresion regular delimita su inicio con /^ y su fin con $/. Por lo que una expresión regular tendría la forma:
            /^ expr regular $/
        - El email se compone de tres partes:  nombre usuario + @ + servidor + dominio
        - Expresion Regular: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/
        */
        //return /^[\s@]+@[^\s@]+\.[^\s@]+$/.test(mail); //expresion regular, valida que tenga el @ y el '.'.
        //return true;
        return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(mail);
    }
    if(!emailValido(mail.value)){
        alert("Por favor, escribí un correo electrónico válido.");
        mail.classList.add("is-invalid");
        mail.focus();
        return;
    }
    //Verifico si está ingresado al menos 1 ticket, sino que aplique un estilo de error, haga foco en el campo y se detenga:
    if( (cantidadTickets.value == 0) || (isNaN(cantidadTickets.value))){
        alert("Por favor, ingresá correctamente cantidad de tickets.");
        cantidadTickets.classList.add("is-invalid");
        cantidadTickets.focus();
        return;
    }
    //Verifico que haya seleccionado una categoria, sino que aplique un estilo de error y hago foco en el campo y que se detenga:
    if(categoria.value == ""){
        alert("Por favor, seleccioná una categoria.");
        categoria.classList.add("is-invalid");
        categoria.focus();
        return;
    }
    //Multiplico cantidad de tickets por el valor:
    let totalValorTickets = (cantidadTickets.value) * valorTicket;
    //Aplico descuentos segun categorias:
        /*
        if(categoria.value == 0){                   //sin Categoria.
            totalValorTickets = totalValorTickets;
        }
        if(categoria.value == 1){                   //Estudiante
            totalValorTickets = totalValorTickets - (descuentoEstudiante / 100 * totalValorTickets);
        }
        if(categoria.value == 2){                   //Trainee
            totalValorTickets = totalValorTickets - (descuentoTrainee / 100 * totalValorTickets);
        }
        if(categoria.value == 3){                   //Junior
            totalValorTickets = totalValorTickets - (descuentoJunior / 100 * totalValorTickets);
        }
        */
    if((categoria.value !== null) && (categoria.value !== "")){
        console.log('Total SIN Descuento: '+ totalValorTickets);
        console.log('Categoria: '+categoria.value);
        let totalDescuento = totalValorTickets * descuento[categoria.value] / 100;
        totalValorTickets = totalValorTickets - totalDescuento;
        console.log('Descuento: '+totalDescuento);
        console.log('Total a Pagar CON Descuento: '+totalValorTickets);
    }
    //Inserto el valor en el HTML: propiedad innerHTML que inserta el contenido en el elemento span u otro.
    totalPago.innerHTML = totalValorTickets;
}
//Inserto Resumen recibe un escuchador y la funcion del calculo:
btnResumen.addEventListener('click', total_a_pagar);

//Función para el boton Borrar para que borre el valor ingresado:
function reset_total_a_pagar(){
    quitarClaseError();
    totalPago.innerHTML = "";
}
btnBorrar.addEventListener('click', reset_total_a_pagar);

/*
    //onClick sobre cada card, seleccionara el combo "categoria":
    function seleccionarCategoria(seleccionCard){
        let valorSelect = '0';
        switch(seleccionCard){
            case "Estudiante": 
                valorSelect = '1';
                break;
            case "Trainee":
                valorSelect = '2';
                break;
            case "Junior":
                valorSelect = '3';
                break;
            default:
                valorSelect = '0';
        }
        document.getElementById('categoria').value = valorSelect;
        console.log('Categoria seleccionada ('+seleccionCard+ ')' + valorSelect);
    }
    function agregarListenersACards(){
        cardEstudiante.addEventListener('click', seleccionarCategoria('Estudiante'));
        cardTrainee.addEventListener('click', seleccionarCategoria('Trainee'));
        cardJunior.addEventListener('click', seleccionarCategoria('Junior'));   
    }
    agregarListenersACards();

    // function load() {
    //     //
    //   }
    // document.addEventListener("DOMContentLoaded", load, false);
*/
//onClick sobre cada card, seleccionara el combo "categoria":
document.getElementById('cardEstudiante').addEventListener('click', function(){
    document.getElementById('categoria').value = 1;
});
document.getElementById('cardTrainee').addEventListener('click', function(){
    document.getElementById('categoria').value = 2;
});
document.getElementById('cardJunior').addEventListener('click', function(){
    document.getElementById('categoria').value = 3;
});
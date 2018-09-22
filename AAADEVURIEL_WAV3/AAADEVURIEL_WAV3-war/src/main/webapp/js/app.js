var data = null;
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;
let info2 = null;
var contador = 0;
var agregarContacto = document.getElementById('agregar');
var formulario = document.getElementById('formulario_crear_usuario');
var action = formulario.getAttribute('action');
var divCrear = document.getElementById('crear_contacto');
var tableBody = document.getElementsByTagName('tbody');
var divExistentes = document.getElementsByClassName('existentes');
var tablaRegistrados = document.getElementById('registrados');
var checkBoxes = document.getElementsByClassName('borrar_contacto');
var btn_borrar = document.getElementById('btn_borrar'); 
var inputBuscador = document.getElementById('buscador');
var totalRegistros = document.getElementById('total');




actualizarRegistro();


function registroExitoso(grabacion) {
    //crear DIV y agregar un ID
    var divMensaje = document.createElement('DIV');
    divMensaje.setAttribute('id', 'mensaje');
    //Agregar Texto
    console.log(grabacion);
    var texto = document.createTextNode('Creado: ' + grabacion);
    divMensaje.appendChild(texto);
    divCrear.insertBefore(divMensaje, divCrear.childNodes[4]);
    //Agregar la clase mostrar
    divMensaje.classList.add('mostrar');
    //ocultar el mensaje de creación
    setTimeout(function () {
        divMensaje.classList.add('ocultar');
        setTimeout(function () {
            var divPadreMensaje = divMensaje.parentNode;
            divPadreMensaje.removeChild(divMensaje);
        }, 800);
    }, 800);

}
//Construir Template para insertar datos dinámicamente
function construirTemplate(grabacion) {
    //crear nombre del archivo
    let tbody = document.querySelector('.tbody'); //<tbody>
    let nuevoTBodyTr = document.createElement("tr");
    nuevoTBodyTr.setAttribute("id", grabacion);
    let nuevoTBodyTh = document.createElement("th");
    let wav = document.createTextNode(grabacion);

    nuevoTBodyTh.appendChild(wav);
    nuevoTBodyTr.appendChild(nuevoTBodyTh);

    // Crear archivo de audio
    for (let j = 1; j <= 2; j++) {
        let nuevoTrTd = document.createElement("td");
        let nuevoaudio = document.createElement("AUDIO");
        if (j === 1) {
            let wav2 = (grabacion);
            nuevoaudio.setAttribute("class", "democlass");
            nuevoaudio.controls = true;
            nuevoaudio.setAttribute("src", "https://breeze2-132.collaboratory.avaya.com/services/AAADEVURIEL_WAV3/FileSaveServlet/web/Grabaciones/"  + wav2);
            nuevoTrTd.appendChild(nuevoaudio);
        }
        if (j === 2) {
            var wav2 = (grabacion);
            info2 = document.createElement("input");
            info2.setAttribute("type", "checkbox");
            info2.setAttribute("name", wav2);
            info2.classList.add("borrar_contacto");
            nuevoTrTd.setAttribute("class", "Borrar");
            nuevoTrTd.appendChild(info2);

        }

        nuevoTBodyTr.appendChild(nuevoTrTd);
    }
    tbody.appendChild(nuevoTBodyTr);
}

function crearGrabacion() {
    var form_datos = new FormData(formulario);
    for ([key, value] of form_datos.entries()) {
        console.log(key + ":" + value);
    }
    var xhr = new XMLHttpRequest();
    xhr.open('POST', action, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var resultado = xhr.responseText;
            var json = JSON.parse(resultado);
            console.log(json);
            if (json.status === "file saved successfully on web server") {
                registroExitoso(json.grabacion);
                construirTemplate(json.grabacion);
            }
            for_check();
            actualizarNumero();
        }
  
    };
    xhr.send(form_datos);

}

function for_check(){
    for (var i = 0; i < checkBoxes.length; i++){
    checkBoxes[i].addEventListener('change', function(){
        if(this.checked){
            this.parentNode.parentNode.classList.add('activo');
        }else{
            this.parentNode.parentNode.classList.remove('activo');
        }
    });
}
}




function actualizarRegistro() {
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
            let myObj = JSON.parse(this.responseText);
            console.log(myObj);
            console.log(Object.keys(myObj).length);

            for (let i = 0; i <= Object.keys(myObj).length - 1; i++) {
                let tbody = document.querySelector('.tbody'); //<tbody>
                let nuevoTBodyTr = document.createElement("tr");
                nuevoTBodyTr.setAttribute("id", myObj["Index " + i + ""]);
                let nuevoTBodyTh = document.createElement("th");

                nuevoTBodyTh.setAttribute("class", "wavs " + contador);
                let wav = document.createTextNode(myObj["Index " + i + ""]);
                nuevoTBodyTh.appendChild(wav);
                nuevoTBodyTr.appendChild(nuevoTBodyTh);
                contador++;
                for (let j = 1; j <= 2; j++) {
                    let nuevoTrTd = document.createElement("td");
                    let nuevoaudio = document.createElement("AUDIO");
                    if (j === 1) {
                        let wav2 = (myObj["Index " + i + ""]);
                        nuevoaudio.setAttribute("class", "democlass");
                        nuevoaudio.controls = true;
                        nuevoaudio.setAttribute("src", "https://breeze2-132.collaboratory.avaya.com/services/AAADEVURIEL_WAV3/FileSaveServlet/web/Grabaciones/"  + wav2);
                        nuevoTrTd.appendChild(nuevoaudio);
                    }
                    if (j === 2) {  
                        var wav2 = (myObj["Index " + i + ""]);

                        info2 = document.createElement("input");
                        info2.setAttribute("type", "checkbox");
                        info2.setAttribute("name", wav2);
                        info2.classList.add("borrar_contacto");
                        nuevoTrTd.setAttribute("class", "Borrar");
                        nuevoTrTd.appendChild(info2);

                    }
          
                    nuevoTBodyTr.appendChild(nuevoTrTd);
                }
                tbody.appendChild(nuevoTBodyTr);
            }

        }
        
        for_check();
        actualizarNumero();
        
        

    });

    xhr.open("GET", "https://breeze2-132.collaboratory.avaya.com/services/AAADEVURIEL_WAV3/Grabaciones/web/Grabaciones/");

    xhr.send(data);
    
}

function eliminarHTML(grabacion_borrada) {
    console.log(grabacion_borrada);
    for (i = 0; i < grabacion_borrada.length; i++) {
        var elementoBorrar = document.getElementById(grabacion_borrada);
        console.log(elementoBorrar);
        tableBody[0].removeChild(elementoBorrar);
        actualizarNumero();
    }
}

function mostrarEliminado() {
    //Crear div y agregar ID
    var divEliminado = document.createElement('DIV');
    divEliminado.setAttribute('id', 'borrado');

    //Agregar texto
    var texto = document.createTextNode('Eliminado de la lista de grabaciones');
    divEliminado.appendChild(texto);
    divExistentes[0].insertBefore(divEliminado, divExistentes[0].childNodes[0]);
    //
    
    
    //Agregar clase de Css
    divEliminado.classList.add('mostrar');

    setTimeout(function () {
        divEliminado.classList.add('ocultar');
        setTimeout(function () {
            var divPadreMensaje = divEliminado.parentNode;
            divPadreMensaje.removeChild(divEliminado);
        }, 800);
    }, 800);

}

function contactosEliminar(grabaciones) {

    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
            var resultadoBorrar = xhr.responseText;
            var json = JSON.parse(resultadoBorrar);

            if (json.status === "file deleted successfully on web server") {
                eliminarHTML(grabaciones);
                mostrarEliminado();

            } else {
                alert("NO se ha podido borrar la grabación " + grabaciones);
            }
        }
    });

    xhr.open("DELETE", "https://breeze2-132.collaboratory.avaya.com/services/AAADEVURIEL_WAV3/FileSaveServlet/web/Grabaciones/" + grabaciones[0]);
    xhr.send(data);


}
/**
 * Función para validar si un check box ha sido seleccionado
 * @returns {undefined}
 */
function checkBoxSeleccionado() {
    var grabaciones = [];
    for (i = 0; i < checkBoxes.length; i++) {
        if (checkBoxes[i].checked === true) {
            grabaciones.push(checkBoxes[i].name);
        }
    }
    contactosEliminar(grabaciones);
}

/**
 * Función que se utiliza para actualizar el número de resultados.
 * @returns {undefined}
 */
function actualizarNumero(){
    //Variable para todos los registros
    var registros = tableBody[0].getElementsByTagName('tr');
    var cantidad = 0;
    var ocultos = 0;
    totalRegistros.innerHTML = registros.length;
    for(var i = 0; i < registros.length; i++){
        var elementos = registros[i];
        if(elementos.style.display === 'table-row'){
            cantidad++;
            totalRegistros.innerHTML = cantidad;
        }else if(elementos.style.display === 'none'){
            ocultos++;
            if(ocultos === registros.length){
                ocultos -= registros.length;
                totalRegistros.innerHTML = ocultos;
            }
        }
    }
}

/**
 * Funcion para ocultar los registros que no coinciden con la búsqueda
 * @param {type} grabacion_buscar
 * @returns {undefined}
 */
function ocultarRegistros(grabacion_buscar){
    //Variable para todos los registros
    var registros = tableBody[0].getElementsByTagName('tr');
    //Expresión regular que busca el nombre con case insensitive
    var expresion = new RegExp(grabacion_buscar, "i");
    
    for(var i = 0; i < registros.length; i ++){
        registros[i].classList.add('ocultar');
        registros[i].style.display = 'none';
        
        if(registros[i].childNodes[0].textContent.replace(/\s/g, "").search(expresion) !== -1 || grabacion_buscar === ''){
            registros[i].classList.add('mostrar');
            registros[i].classList.remove('ocultar');
            registros[i].style.display = 'table-row';
        }
    }
    
    actualizarNumero();
    
}

agregarContacto.addEventListener('click', function (e) {
    e.preventDefault();
    crearGrabacion();
});


btn_borrar.addEventListener('click', function () {
    checkBoxSeleccionado();
});

inputBuscador.addEventListener('input', function (){
   ocultarRegistros(this.value);
});
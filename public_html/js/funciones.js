window.onload=function() {

    $(document).on('click', '.rechazar', function (event) {
        event.preventDefault();
        $(this).closest('tr').remove();
    });
    // creamos los eventos para cada elemento con la clase "boton"
    let elementos=document.getElementsByClassName("boton");
    for(let i=0;i<elementos.length;i++)
    {
        // cada vez que se haga clic sobre cualquier de los elementos,
        // ejecutamos la función obtenerValores()
        elementos[i].addEventListener("click",obtenerValores);
    }

    // funcion que se ejecuta cada vez que se hace clic
    function obtenerValores(e) {
        var valores="";
        var estudiante="";
        var titulacion="";
        var fecha="";
        var hora="";
        var tema="";
        var va=[];
        // vamos al elemento padre (<tr>) y buscamos todos los elementos <td>
        // que contenga el elemento padre
        var elementosTD=e.srcElement.parentElement.getElementsByTagName("td");

        // recorremos cada uno de los elementos del array de elementos <td>
        for(let i=0;i<elementosTD.length;i++)
        {
            // obtenemos cada uno de los valores y los ponemos en la variable "va" array
            va.push(elementosTD[i].innerHTML);
        }
        estudiante=va[0];
        titulacion=va[1];
        fecha=va[2];
        hora=va[3];
        tema=va[4];
        console.log(estudiante);
        console.log(titulacion);
        console.log(fecha);
        console.log(hora);
        console.log(tema);
        newcampo = '<div class="col-md-12 CuerpoDoc" id="CuerpoDoc">'+
                        '<div class="col-md-4 LogoDoc">'+
                            '<img src="../img/logo.png" alt="">'+
                        '</div>'+
                        '<div class="col-md-8 TituloDoc">'+
                            '<h3>Laboratorios de Geología y Minas</h3>'+
                        '</div>'+

                        '<div class="col-md-12 camposDoc">'+
                            '<label for="">Titulación</label>'+
                            '<h5 class="tituDoc" id="tituDoc">Jessica López</h5>'+
                            '<label for="">Estudiante</label>'+
                            '<h5 type="text" class="estuDoc" id="estuDoc"></h5><br>'+
                            '<label for="">Fecha</label>'+
                            '<h5 type="text" class="fechaDoc" id="fechaDoc"></h5><br>'+
                            '<label for="">Hora</label>'+
                            '<h5 type="text" class="horaDoc" id="horaDoc"></h5><br>'+
                            '<label for="">Tema</label>'+
                            '<h5 type="text" class="temaDoc" id="temaDoc"></h5>'+
                        '</div>'+
                        
                        '<div class="col-md-12 observacionDoc">'+
                            '<label for="">Estado de solicitud:</label>'+
                            '<h4 class="solicitudA" id="solicitudA"></h4>'+
                        '</div>'+

                        '<div class="col-md-3 contDoc">'+
                            '<h5>MSc.Berenice Zuñiga T</h5>'+
                            '<h6>Responsable de Laboratorio de Resistencia de Materiales</h6>'+
                        '</div>'+
                        '<div class="col-md-3 contDoc">'+
                            '<h5 class="NameDoc" id="NameDoc">Jessica López</h5>'+
                            '<h6>Estudiante</h6>'+
                        '</div>'+
                        '<div class="col-md-3 contDoc">'+
                            '<h5>PhD. Alonso Zuñiga S</h5>'+
                            '<h6>Docente UTPL</h6>'+
                        '</div>'+
                    '</div>';
        $('.documentoSolicitud').append(newcampo),
        $("#tituDoc").text(titulacion),
        $("#estuDoc").text(estudiante),
        $("#fechaDoc").text(fecha),
        $("#horaDoc").text(hora),
        $("#temaDoc").text(tema),
        $("#solicitudA").text("ACEPATADA"),
        $("#NameDoc").text(estudiante),

        document.querySelector("#btnImprimirDiv").addEventListener("click", function() {
        var div = document.querySelector("#imprimible");
        imprimirElemento(div);
        });
        
        document.querySelector("#btnImprimirParrafo").addEventListener("click", function() {
        var parrafo = document.querySelector("#parrafo");
        imprimirElemento(parrafo);
        });
    }
}

function imprimirElemento(elemento) {
    var ventana = window.open('', 'PRINT', 'height=400,width=600');
    ventana.document.write('<html><head><title>' + document.title + '</title>');
    ventana.document.write('<link rel="stylesheet" href="../css/styles.css">'); //Aquí agregué la hoja de estilos
    ventana.document.write('</head><body >');
    ventana.document.write(elemento.innerHTML);
    ventana.document.write('</body></html>');
    ventana.document.close();
    ventana.focus();
    ventana.onload = function() {
      ventana.print();
      ventana.close();
    };
    return true;
}

function pruebaDivAPdf() {
    var pdf = new jsPDF('p', 'pt', 'letter');
    source = $('#CuerpoDoc')[0];

    specialElementHandlers = {
        '#bypassme': function (element, renderer) {
            return true
        }
    };
    margins = {
        top: 80,
        bottom: 60,
        left: 40,
        width: 522
    };

    pdf.fromHTML(
        source, 
        margins.left, // x coord
        margins.top, { // y coord
            'width': margins.width, 
            'elementHandlers': specialElementHandlers
        },

        function (dispose) {
            pdf.save('Prueba.pdf');
        }, margins
    );
}


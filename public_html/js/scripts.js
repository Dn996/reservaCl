var BASE_URI = "http://localhost:10297/reservaLab/api";


function obtenerValorParametro(sParametroNombre) {
    var sPaginaURL = window.location.search.substring(1);
    var sURLVariables = sPaginaURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParametro = sURLVariables[i].split('=');
        if (sParametro[0] == sParametroNombre) {
            return sParametro[1];
        }
    }
    return null;
}
function datoBusqueda(dato) {
    var id = 0;
    var datos = null;
    $.ajax({
        async: false,
        url: BASE_URI + '/usuarios/',
        method: 'GET',
        contentType: 'application/json',
        crossDomain: true,
        success: function (response) {

            response.forEach(function (usuario) {
                console.log("descripcion: " + usuario.contrasenia);
                if (usuario.usuario === dato) {
                    console.log("usuario: " + usuario.usuario);
                    datos = usuario.usuario;
                    return false;
                } else if (usuario.contrasenia === dato) {
                    console.log("usuario: " + usuario.contrasenia);
                    datos = usuario.contrasenia;
                    return false;
                }
            });
        }
    });
    return datos;
}

$(document).ready(function () {
    // GET/READ       
    $.ajax({
        url: BASE_URI + '/laboratorios',
        contentType: 'application/json',
        crossDomain: true,
        success: function (response) {
            var tbodyEl = $('.laboratorio');
            tbodyEl.html('');
            response.forEach(function (laboratorio) {

                tbodyEl.append('\
                        \n\<div class="col-md-6 labs1"> ' + '\
                        \n\<h3 class="labo"> ' + laboratorio.nombre + '</h3>\
                        \n\<img src="img/imagen.jpg" alt="resistencia"> ' + '\
                        \n\<section class="infoLab1"> ' + '\
                        \n\<h2> ' + laboratorio.nombre + '</h2>' + '\
                        \n\<h5> ' + laboratorio.nombre_usuario + '</h5>' +
                        '\n\<h5> ' + laboratorio.email + '</h5>' +
                        '\n\<input id="id_lab" value=' + laboratorio.id_laboratorio + ' style="visibility:hidden"></input> <br>' +
                        '\n\<a href="lab1.html?lab=' + laboratorio.id_laboratorio + '" class="btn btn-primary btn-md fa fa-eye" id="labo"type="submit"></a> ' +
                        '\n\ </section>\
                        ' + '</div>\
                    ');
            });
        }
    });
    //vista laboratorios 
    
    var valor = obtenerValorParametro('lab');
    if (valor) {
        //alert(valor);
        console.log(valor);
        $.ajax({
            url: BASE_URI + '/laboratorios/' + valor,
            method: 'GET',
            contentType: 'application/json',
            crossDomain: true,
            success: function (response) {
                console.log(response);
                var tbodyEl = $('.lab_select');
                tbodyEl.html('');
                tbodyEl.append('\
                            <h2>' + response.nombre + '</h2>\ \
                    ');
                var tbodyEl = $('.infLab');
                tbodyEl.html('');
                tbodyEl.append('\
                        \n\<h3>Información</h3> '+
                        '<p>'+response.descripcion+'</p> \
                    ');
                var tbodyEl = $('.infEncLabResis');
                tbodyEl.html('');
                tbodyEl.append('\
                        \n\<h5>Responsable de Laboratorio</h5> '+
                        '<h5>'+response.nombre_usuario+'</h5>\n\
                        <h5>'+response.email+'</h5>\
                    ');
                

            }
        });
    };



    // GET/READ/PARAM      
    $('#form-login').on('submit', function (event) {
        event.preventDefault();
        var createInputUsuario = $('#user');
        var usuario = datoBusqueda(createInputUsuario.val());
        var createInputContrasenia = $('#pwd');
        var contrasenia = datoBusqueda(createInputContrasenia.val());
        usuario = datoBusqueda(createInputUsuario.val());
        contrasenia = datoBusqueda(createInputContrasenia.val());
        $.ajax({
            url: BASE_URI + '/usuarios/' + usuario + '/' + contrasenia,
            method: 'GET',
            contentType: 'application/json',
            crossDomain: true,
            success: function (response) {
                console.log(response);
                if (response.id_usuario !== 0 && response.tipo !== 0) {
                    location.href = "/reservaCl/index.html";
                } else {
                    var tbodyEl = $('.mensaje');
                    tbodyEl.html('');
                    tbodyEl.append('\
                            <h6>Usuario o contraseña incorrectas</h6>\ \
                    ');

                }
            }
        });
    });
});

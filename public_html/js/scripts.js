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
                        \n\<h3>Información</h3> ' +
                        '<p>' + response.descripcion + '</p> \
                    ');
                var tbodyEl = $('.infEncLabResis');
                tbodyEl.html('');
                tbodyEl.append('\
                        \n\<h5>Responsable de Laboratorio</h5> ' +
                        '<h5>' + response.nombre_usuario + '</h5>\n\
                        <h5>' + response.email + '</h5>\
                    ');


            }
        });
    }
    ;



    // GET/READ/PARAM      
    $('#form-login').on('submit', function (event) {
        event.preventDefault();
        var createInputUsuario = $('#user');
        var usuario = datoBusqueda(createInputUsuario.val());
        var createInputContrasenia = $('#pwd');
        var contrasenia = datoBusqueda(createInputContrasenia.val());
        usuario = datoBusqueda(createInputUsuario.val());
        contrasenia = datoBusqueda(createInputContrasenia.val());
        var valor = obtenerValorParametro('us');
        $.ajax({
            url: BASE_URI + '/usuarios/' + usuario + '/' + contrasenia,
            method: 'GET',
            contentType: 'application/json',
            crossDomain: true,
            success: function (response) {
                console.log(response);
                console.log("adkfjñ");
                console.log(valor);
                console.log(response.tipo);
                if (response.id_usuario !== 0 && response.tipo !== 0) {
                    if (valor == 3 && response.tipo == 3) {
                        location.href = "/reservaCl/internas/Administrador.html?ad=" + response.id_usuario;
                    } else {
                        var tbodyEl = $('.mensaje');
                        tbodyEl.html('');
                        tbodyEl.append('\
                            <h6>USTED NO ES ADMINISTRADOR</h6>\ \
                        ');
                    }
                    if (valor == 2 && response.tipo == 2) {
                        location.href = "/reservaCl/internas/AdministrarLab.html?en=" + response.id_usuario;
                    } else {
                        var tbodyEl = $('.mensaje');
                        tbodyEl.html('');
                        tbodyEl.append('\
                            <h6>USTED NO ES ENCARGADO DE LABORATORIO</h6>\ \
                        ');
                    }
                    if (valor == 1 && response.tipo == 1) {
                        location.href = "/reservaCl/internas/LoginReservar.html?es=" + response.id_usuario;
                    }

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

    $('#registro_Est').on('submit', function (event) {
        event.preventDefault();

        var createInputCedula = $('#cedulaE');
        var createInputName = $('#names');
        var createInputUser = $('#user');
        var createInputPass = $('#password');
        var createInputTipo = $('#tipo');
        var createInputMail = $('#mail');
        $.ajax({
            url: BASE_URI + '/usuarios',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({cedula: createInputCedula.val(),
                nombres: createInputName.val(), usuario: createInputUser.val(),
                contrasenia: createInputPass.val(), tipo: createInputTipo.val(),
                mail: createInputMail.val()}),
            success: function (response) {
                var tbodyEl = $('.mensajeEst');
                tbodyEl.html('');
                tbodyEl.append('\
                            <label>Datos guardados correctamente</label>\ \
                    ');
                console.log(createInputTipo.val())
                console.log(createInputMail.val())
                console.log(response);
                createInputCedula.val('');
                createInputName.val('');
                createInputUser.val('');
                createInputPass.val('');
                createInputTipo.val('');
                createInputMail.val('');
            }
        });
    });

    //vista administrador
    var admin = obtenerValorParametro('ad');
    var encargado = obtenerValorParametro('en');
    var estudiante = obtenerValorParametro('es');
    if (admin) {
        $.ajax({
            url: BASE_URI + '/usuarios/' + admin,
            method: 'GET',
            contentType: 'application/json',
            crossDomain: true,
            success: function (response) {
                console.log(response);
                console.log("adkfjñ");
                console.log(valor);
                console.log(response.tipo);
                var tbodyEl = $('.ident');
                tbodyEl.html('');
                tbodyEl.append('\
                            <h4>'+response.nombre+'<a href="../index.html">Salir</a></h4>\ \
                        ');
                if (response.id_usuario !== 0 && response.tipo !== 0) {
                    if (valor == 3 && response.tipo == 3) {
                        location.href = "/reservaCl/internas/Administrador.html?ad=" + response.id_usuario;
                    } else {
                        var tbodyEl = $('.mensaje');
                        tbodyEl.html('');
                        tbodyEl.append('\
                            <h6>USTED NO ES ADMINISTRADOR</h6>\ \
                        ');
                    }
                    if (valor == 2 && response.tipo == 2) {
                        location.href = "/reservaCl/internas/AdministrarLab.html?en=" + response.id_usuario;
                    } else {
                        var tbodyEl = $('.mensaje');
                        tbodyEl.html('');
                        tbodyEl.append('\
                            <h6>USTED NO ES ENCARGADO DE LABORATORIO</h6>\ \
                        ');
                    }
                    if (valor == 1 && response.tipo == 1) {
                        location.href = "/reservaCl/internas/LoginReservar.html?es=" + response.id_usuario;
                    }

                } else {
                    var tbodyEl = $('.mensaje');
                    tbodyEl.html('');
                    tbodyEl.append('\
                            <h6>Usuario o contraseña incorrectas</h6>\ \
                    ');

                }
            }
        });
    }

});

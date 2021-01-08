$(function() {


    var titulo = $("#idtitulo"),
        idconteudo = $("#idconteudo"),
        //nucar = $("#numerocarta"),
        //	nucar = $("#numerocarta"),
        //recibobanco = $("#nrecibo"),
        allFields = $([]).add(titulo).add(idconteudo)

    //.add(nucar).add(recibobanco);

    $("#adicionarutilisador").dialog({
        autoOpen: false,
        resizable: true,
        show: "clip",
        hide: "clip",
        width: "540px",
        modal: true,
        closeOnEscape: true,
        buttons: {
            "Cancelar": function() {
                $(this).dialog("close");
            },
            "Adicionar": function() {

                Inserir_utilisador();
            }
        },
        close: function() {
            allFields.val("").removeClass("ui-state-error");
            //$("#adicionar").tooltip("close");
            $("#adicionarState").html("");
            $("#adicionarState").removeClass("ui-state-error");
            $("#resultados").html("<img src='img/loader.gif'/>").load("ajax/utilisador/view.php", "", function() {});
        }
    });

    $("#resultados").html("<img src='img/loader.gif'/>").load("ajax/utilisador/view.php", "", function() {});
    $("#id_distrito_user").html("<img src='img/preloader-01.gif' />").load("ajax/selection/option.php", "tipo=distrito&base=yes", function() {});


});

function Inserir_utilisador() {

    var dadosajax = {
        nome: $("#nome").val(),
        email: $("#email").val(),
        usuario: $("#usuario").val(),
        senha: $("#senha").val(),
        senha1: $("#senha1").val(),
        permisao: $("#permissao").val(),
        id_distrito_user: $("#id_distrito_user option:selected").val(),
        conctatouser: $("#conctatouser").val()

    };

    $.post('ajax/utilisador/insert.php', dadosajax, function(retorna) {
        if (retorna === "1")
            $("#resultado_add_utilisador").html("Dados inseridos com exito");
        else
            $("#resultado_add_utilisador").html("Falha ao inserir dados");

    });
    setTimeout(function() {
        $("#adicionarempresa").dialog("close");
        $("#resultado_add_utilisador").html("");
        $("#resultado_add_utilisador").removeClass("ui-state-error");

    }, 1000);
}

function Alterar_utilisador() {

    var dadosajax = {
        nome: $("#nome").val(),
        email: $("#email").val(),
        usuario: $("#usuario").val(),
        senha: $("#senha").val(),
        senha1: $("#senha1").val(),
        permisao: $("#permissao").val(),
        id_user: $("#id_user").val()

    };
    alert(dadosajax.permisao);
    $.post('ajax/utilisador/update.php', dadosajax, function(retorna) {
        if (retorna === "1")
            $("#resultado_add_utilisador").html("Dados Alterados com exito");
        else
            $("#resultado_add_utilisador").html("Falha Alterar dados");

    });
    setTimeout(function() {
        $("#adicionarempresa").dialog("close");
        $("#resultado_add_utilisador").html("");
        $("#resultado_add_utilisador").removeClass("ui-state-error");

    }, 1000);
}

function load_utilisador(id) {

    adicionarutilisador("Alterar");

    var dadosajax = {
        id: id
    };
    $.post('ajax/utilisador/load.php', dadosajax, function(retorna) {
        $("#resultados").html(retorna);
    });

}

function Eliminar_utilisador(id) {

    var dadosajax = {
        id: id
    };

    if (confirm("Desejas realmente eliminar essa informação?")) {
        $.post('ajax/utilisador/delete.php', dadosajax, function(retorna) {
            $("#resultados").html("<img src='img/loader.gif'/>").load("ajax/utilisador/view.php", "", function() {});
        });
    }
}


function add_bottom(type) {
    if (type === "Alterar") {
        $("#adicionarutilisador").dialog({

            buttons: {
                "Cancelar": function() {
                    $(this).dialog("close");
                },
                "Alterar": function() {

                    Alterar_utilisador();
                }
            }
        });
    } else {
        $("#adicionarutilisador").dialog({

            buttons: {
                "Cancelar": function() {
                    $(this).dialog("close");
                },
                "Adicionar": function() {

                    Inserir_utilisador();
                }
            }


        });
    }
}


function canlcelarx() {
    $("#adicionarDialogo").dialog("close");
}

function adicionarutilisador(type) {
    add_bottom(type);
    $("#adicionarutilisador").dialog("open");
}

function testepdf() {
    var files = document.getElementById('file-doc').files;
    if (files.length > 0) {
        getBase64(files[0]);
        alert(files[0])
    }
}
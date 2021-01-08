$(function() {

    //	var teste= "101.01.02.4/__-__";
    //alert(teste)
    //  var fs = teste.split("/");
    //  alert(fs[0])



    var vre = "0";

    var novonuber;
    var iddistrito = $("#iddistritocominidade"),
        nomecupdate = $("#nomecupdate"),
        nomeccomunidade = $("#nomeccomunidade"),
        idlongitude = $("#idlongitude"),
        idlatitude = $("#idlatitude"),
        idaltitude = $("#idaltitude"),
        idtem_med = $("#idtem_med"),
        idper_media = $("#idper_media"),
        nomedepar = $("#nomedepar"),
        resultdrive = $("#resultdrive"),
        allFields = $([])
        .add(iddistrito)
        .add(nomeccomunidade)
        .add(idlatitude)
        .add(idaltitude)
        .add(idlongitude)
        .add(resultdrive)
        .add(nomecupdate)
        .add(idtem_med);
    var idf = $("#idper")
        .val();
    var geral_idcodibem = 0;
    var codigoequipament = $("#codigoequipament")
        .text();
    var tipo_categoria = $("#tipocategoriabem")
        .text();

    $("#adicionarcominidade")
        .dialog({
            autoOpen: false,
            resizable: true,
            show: {
                effect: "puff",
                delay: 150
            },
            hide: {
                effect: "explode",
                delay: 150
            },
            width: "500px",
            modal: true,
            closeOnEscape: true,
            buttons: {
                "Cancelar": function() {
                    $(this)
                        .dialog("close");
                },
                "Adicionar": function() {
                    var bValid = true,
                        tips = $("#adicionarStatecominidade");
                    allFields.removeClass("ui-state-error");
                    var id_nomedepartamento = $("#id_nomedepartamento option:selected");
                    if (id_nomedepartamento.val() == -1) {
                        tips.html("<b>Deves selecionar uma  Direção/Departamento/Serviço</b>");
                        //nomeccomunidade.addClass("ui-state-error");
                        //nomeccomunidade.focus();
                        bValid = false;
                    }
                    if (bValid) {
                        ayns_addseccao();
                    }
                }
            },
            close: function() {
                allFields.val("").removeClass("ui-state-error");
                $("#adicionarStatecominidade").html("");
                $("#adicionarStatecominidade").removeClass("ui-state-error");
                /*$("#resultados_processados")
                	.html("<img src='img/loader.gif'/>")
                	.load("ajax/factura/view.php", "", function () {});*/
            }
        });




    // add bensdepartamento

    $("#adicionarbensdepartamento")
        .dialog({
            autoOpen: false,
            resizable: true,
            show: {
                effect: "puff",
                delay: 150
            },
            hide: {
                effect: "explode",
                delay: 150
            },
            width: "500px",
            modal: true,
            closeOnEscape: true,
            buttons: {
                "Cancelar": function() {
                    $(this)
                        .dialog("close");
                },
                "Adicionar": function() {
                    var bValid = true,
                        tips = $("#adicionarStatecominidade");
                    allFields.removeClass("ui-state-error");
                    var idcomunidade = $("#iddistritocominidade option:selected")
                        .val();
                    if (nomeccomunidade.val() == "") {
                        tips.html("O nome do Distrito não deve ser em branco.");
                        nomeccomunidade.addClass("ui-state-error");
                        nomeccomunidade.focus();
                        bValid = false;
                    } else if (idcomunidade == -1) {
                        tips.html("<p style='color:red'>Selecione um nome do Distrito por favor.</p>");
                        bValid = false;
                    }
                    if (bValid) {
                        adicionarAsyncdoc();
                    }
                }
            },
            close: function() {
                allFields.val("")
                    .removeClass("ui-state-error");
                $("#adicionarState")
                    .html("");
                $("#adicionarState")
                    .removeClass("ui-state-error");
                $("#resultados_processados")
                    .html("<img src='img/loader.gif'/>")
                    .load("ajax/factura/view.php", "", function() {});
            }
        });

    ///fim


    //add afectar bem

    $("#adicionarbensafectar")
        .dialog({
            autoOpen: false,
            resizable: true,
            show: {
                effect: "puff",
                delay: 150
            },
            hide: {
                effect: "explode",
                delay: 150
            },
            width: "500px",
            modal: true,
            closeOnEscape: true,
            buttons: {
                "Cancelar": function() {
                    $(this)
                        .dialog("close");
                },
                "Afectar": function() {
                    var bValid = true,
                        tips = $("#adicionarStatecominidade");
                    allFields.removeClass("ui-state-error");
                    var idcomunidade = $("#iddistritocominidade option:selected")
                        .val();
                    if (nomeccomunidade.val() == "") {
                        tips.html("O nome do Distrito não deve ser em branco.");
                        nomeccomunidade.addClass("ui-state-error");
                        nomeccomunidade.focus();
                        bValid = false;
                    } else if (idcomunidade == -1) {
                        tips.html("<p style='color:red'>Selecione um nome do Distrito por favor.</p>");
                        bValid = false;
                    }
                    if (bValid) {
                        adicionarAsyncdoc();
                    }
                }
            },
            close: function() {
                allFields.val("")
                    .removeClass("ui-state-error");
                $("#adicionarState")
                    .html("");
                $("#adicionarState")
                    .removeClass("ui-state-error");
                $("#resultados_processados")
                    .html("<img src='img/loader.gif'/>")
                    .load("ajax/factura/view.php", "", function() {});
            }
        });
    // fim	
    $("#id_bensmoveis")
        .dialog({
            autoOpen: false,
            resizable: true,
            show: {
                effect: "puff",
                delay: 150
            },
            hide: {
                effect: "explode",
                delay: 150
            },
            width: "auto",
            modal: true,
            closeOnEscape: true,
            buttons: {
                "Cancelar": function() {
                    $(this)
                        .dialog("close");
                },
                "Adicionar": function() {
                    var bValid = true,
                        tips = $("#adicionarStatepatrimonio");
                    allFields.removeClass("ui-state-error");
                    var id_categoriadebens = $("#id_categoriadebens option:selected")
                        .val();
                    var id_tipocategoriadebens = $("#id_tipocategoriadebens option:selected")
                        .val();

                    if (id_categoriadebens == -1) {
                        tips.html("<p style='color:red'>Selecione uma  categoria por favor.</p>");
                        /*nomeccomunidade.addClass("ui-state-error");
                        nomeccomunidade.focus();*/
                        bValid = false;
                    } else if (id_tipocategoriadebens == -1) {
                        tips.html("<p style='color:red'>Selecione um tipo  categoria por favor.</p>");
                        bValid = false;
                    }
                    if (bValid) {
                        //	alert("alert");
                        adicionarbenspatrimonio();
                    }
                }
            },
            close: function() {
                allFields.val("")
                    .removeClass("ui-state-error");
                $("#adicionarState")
                    .html("");
                $("#adicionarState")
                    .removeClass("ui-state-error");
                $("#resultados_processados")
                    .html("<img src='img/loader.gif'/>")
                    .load("ajax/factura/view.php", "", function() {});
            }
        });




    $("#adicionardepartamento")
        .dialog({
            autoOpen: false,
            resizable: true,
            show: {
                effect: "puff",
                delay: 150
            },
            hide: {
                effect: "explode",
                delay: 150
            },
            width: "500px",
            modal: true,
            closeOnEscape: true,
            buttons: {
                "Cancelar": function() {
                    $(this)
                        .dialog("close");
                },
                "Adicionar ": function() {
                    var bValid = true,
                        tips = $("#adicionarStatedepartamento");

                    allFields.removeClass("ui-state-error");
                    var idpiso = $("#idpiso option:selected")
                        .val();
                    //var nomedepar=$("#nomedepar");
                    if (nomedepar.val() == "") {
                        tips.html("Este campo não pode estar vazio");
                        nomedepar.addClass("ui-state-error");
                        nomedepar.focus();
                        bValid = false;
                    } else if (idpiso == -1) {
                        tips.html("<p style='color:red'>Selecione PISO por favor.</p>");
                        bValid = false;
                    }
                    if (bValid) {
                        //alert("cheguei aqui")
                        Asyn_adddeparetamento();
                    }
                }
            },
            close: function() {
                allFields.val("")
                    .removeClass("ui-state-error");
                $("#adicionarState")
                    .html("");
                $("#adicionarState")
                    .removeClass("ui-state-error");
                $("#resultados_processados")
                    .html("<img src='img/loader.gif'/>")
                    .load("ajax/factura/view.php", "", function() {});
            }
        });
    $("#idpiso").html("<img src='img/preloader-01.gif' />").load("ajax/selection/option.php", "tipo=idpiso&base=yes", function() {});
    $("#origem_bem").html("<img src='img/preloader-01.gif' />").load("ajax/selection/option.php", "tipo=idorigem&base=yes", function() {});



    $("#id_funcionario")
        .html("<img src='img/preloader-01.gif' />")
        .load("ajax/selection/option.php", "tipo=id_func&base=yes", function() {});

    $("#id_entidadefornecedora")
        .html("<img src='img/preloader-01.gif' />")
        .load("ajax/selection/option.php", "tipo=id_func&base=yes", function() {});



    $("#id_nomedepartamento")
        .html("<img src='img/preloader-01.gif' />")
        .load("ajax/selection/option.php", "tipo=id_nomedepartamento&base=yes", function() {});


    $("#id_transferido")
        .html("<img src='img/preloader-01.gif' />")
        .load("ajax/selection/option.php", "tipo=id_nomedepartamento_tranferido&base=yes", function() {});


    $("#id_pesquisa_dep")
        .html("<img src='img/preloader-01.gif' />")
        .load("ajax/selection/option.php", "tipo=id_nomedepartamento_tranferido&base=yes", function() {});







    $("#gabinete_id_0")
        .html("<img src='img/preloader-01.gif' />")
        .load("ajax/selection/option.php", "tipo=id_gabinete&base=yes", function() {});

    $("#id_transferir")
        .html("<img src='img/preloader-01.gif' />")
        .load("ajax/selection/option.php", "tipo=id_transferir&base=yes", function() {});




    $("#id_categoriadebens")
        .html("<img src='img/preloader-01.gif' />")
        .load("ajax/selection/option.php", "tipo=id_categoriadebens&base=yes", function() {});
    $("#id_nomemarca")
        .html("<img src='img/preloader-01.gif' />")
        .load("ajax/selection/option.php", "tipo=idmarca&base=yes", function() {});
    $("#id_nomemodelo")
        .html("<img src='img/preloader-01.gif' />")
        .load("ajax/selection/option.php", "tipo=id_modelo&base=yes", function() {});
    $("#id_tipocategoriadebens")
        .html("<img src='img/preloader-01.gif' />")
        .load("ajax/selection/option.php", "tipo=id_tipocategoriadebens&base=yes&idtipocategoria=0", function() {});
    $("#resultadodalista").html("<img src='img/loader.gif'/>").load("ajax/piso/view.php", "", function() {});
    $("#lista_actorcontent")
        .html("<img src='img/loader.gif'/>")
        .load("ajax/cuminidade/listagem_view.php", "", function() {});
    $("#lista_actoravtcontent")
        .html("<img src='img/loader.gif'/>")
        .load("ajax/cuminidade/listagem_actividade.php", "id=" + idf, function() {});
    $("#lista_actorpecuariacontent")
        .html("<img src='img/loader.gif'/>")
        .load("ajax/cuminidade/listagem_actividadepecuaria.php", "id=" + idf, function() {});
    $("#listadebensmoveis")
        .html("<img src='img/loader.gif'/>")
        .load("ajax/bensmoveis/view.php", "", function() {});
    //$("#maximocontagem").html("").load("ajax/agricultor/conut_bens.php", "", function() {});
});

function devolvervalorclasse() {
    $("#vre")
        .val("15");
    var idtipocategoria = $("#id_categoriadebens option:selected")
        .val();
    $("#codigoequipament")
        .html("<img src='img/preloader-01.gif' />")
        .load("ajax/piso/codigo.php", "id=" + idtipocategoria, function() {});
    $("#id_tipocategoriadebens")
        .html("<img src='img/preloader-01.gif' />")
        .load("ajax/selection/option.php", "tipo=id_tipocategoriadebens&base=yes&idtipocategoria=" + idtipocategoria, function() {});

    $("#tipocategoriabem")
        .text("");
    $("#codigogeral_id")
        .text("");
}

function devolvercodigotipobem() {
    $("#tipocategoriabem")
        .text("");
    var id_tipocategoriadebens = $("#id_tipocategoriadebens option:selected")
        .val();
    var id_depart = $("#id_depar")
        .val();
    var codigogeral = $("#tipocategoriabem")
        .text() + "." + id_tipocategoriadebens;
    $("#tipocategoriabem")
        .text(codigogeral);
    codigoequipament = $("#codigoequipament")
        .text();
    tipo_categoria = $("#tipocategoriabem")
        .text();
    geral_idcodibem = codigoequipament + "" + tipo_categoria;
    $("#vre")
        .val("5");
    //$("#codigogeral_id").text(codigoequipament+""+tipo_categoria);

}
// $("#maximocontagem").html("").load("ajax/agricultor/conut_bens.php","", function() {});
function atualizar() {
    var t = $("#vre")
        .val();
    //$("#maximocontagem").html("").load("ajax/agricultor/conut_bens.php", "", function() {});
    if (t === "5") {
        var maxcontagem = $("#maximocontagem")
            .text();
        $("#maximocontagem")
            .html("")
            .load("ajax/agricultor/conut_bens.php", "", function() {});
        //alert($("#maximocontagem").text())
        $("#codigogeral_id").text(geral_idcodibem + "." + maxcontagem + "/__-__");
        $("#codigogeral_id_bens").val(geral_idcodibem + "." + maxcontagem + "/__-__");
    }
}








setInterval("atualizar()", 1500);




function criarabertura(id) {
    var numerocarta = $("#numerocarta")
        .val(),
        controliid = $("#controloid")
        .val(),
        nif = $("#" + id + "nif")
        .val(),
        mone = $("#" + id + "nome")
        .val(),
        apelido = $("#" + id + "apelido")
        .val(),
        nomecom = mone + " " + apelido;
    $("#idToInsert")
        .val(id);
    $("#nif")
        .val(nif);
    $("#mumerocarta")
        .val(numerocarta);
    $("#mumerocontroloid")
        .val(controliid);
    $("#nome")
        .val(nomecom);
    $("#facturaToInsert")
        .html("<img src='img/loader.gif'/>")
        .load("ajax/factura/numero.php", "", function() {});
    $("#adicionarabertura")
        .dialog("open");
}

function adicionarAsyncdoc() {
    $("#adicionarStatecominidade")
        .html("<img src='img/loader.gif'/>");
    var iddistritocominidade = $("#iddistritocominidade option:selected")
        .val();
    $.post("ajax/cuminidade/insert.php", {
        descricao: $("#nomeccomunidade")
            .val(),
        id_distrito: $("#iddistritocominidade option:selected")
            .val(),
        latitude: $("#idlatitude")
            .val(),
        longitude: $("#idlongitude")
            .val(),
        altitude: $("#idaltitude")
            .val(),
        tem_med: $("#idtem_med")
            .val(),
        per_media: $("#idper_media")
            .val(),
        resultdrive: $("#resultdrive")
            .val()
    }, function(data) {
        var result = parseInt(data.text);
        if (result > 0) {
            $("#adicionarStatecominidade")
                .html("<p>Os seus dados foram adicionados com êxito!</p>");
            $("#result")
                .html("");
            $("#adicionarcominidade")
                .dialog('option', 'buttons', {
                    'Fechar': function() {
                        $("#adicionarcominidade")
                            .dialog("close");
                        $("#adicionarStatedocumento")
                            .html("");
                    }
                });
            setTimeout(function() {
                $("#adicionarcominidade")
                    .dialog("close");
                $("#adicionarStatecominidade")
                    .html("");
                $("#resultadodalista")
                    .html("<img src='img/loader.gif'/>")
                    .load("ajax/cuminidade/view.php", "", function() {});
                $("#adicionarcominidade")
                    .dialog('option', 'buttons', {
                        "Cancelar": function() {
                            $(this)
                                .dialog("close");
                        },
                        "Adicionar": function() {
                            var bValid = true,
                                tips = $("#adicionarStatecominidade");
                            var idcomunidade = $("#iddistritocominidade option:selected")
                                .val();
                            var nomeccomunidade = $("#nomeccomunidade");
                            if (nomeccomunidade.val() == "") {
                                tips.html("O nome do Distrito não deve ser em branco.");
                                nomeccomunidade.addClass("ui-state-error");
                                nomeccomunidade.focus();
                                bValid = false;
                            } else if (idcomunidade == -1) {
                                tips.html("<p style='color:red'>Selecione um nome do Distrito por favor.</p>");
                                bValid = false;
                            }
                            if (bValid) {
                                adicionarAsyncdoc();
                            }
                        }
                    });
            }, 1000);
        } else {
            $("#adicionarStatecominidade")
                .html("<p>Registro dos dados falhada!</p>");
        }
    }, "json");
}





//add bens moveis
function adicionarbenspatrimonio() {


    $("#adicionarStatepatrimonio")
        .html("<img src='img/loader.gif'/>");
    var id_categoriadebens = $("#id_categoriadebens option:selected")
        .val();
    var id_tipocategoriadebens = $("#id_tipocategoriadebens option:selected")
        .val();
    var id_nomemarca = $("#id_nomemarca option:selected")
        .val();
    var id_nomemodelo = $("#id_nomemodelo option:selected").val();
    var id_origem = $("#origem_bem option:selected").val();
    var id_entidadefornecedora = $("#id_entidadefornecedora option:selected").val();
    var id_transferido = $("#id_transferido option:selected").val();

    var codido_text = $("#id_teste").text();

    //alert("id_origem " + $("#id_teste").text());

    $.post("ajax/bens/insert.php", {
        categoriadebens: id_categoriadebens,
        tipocategoriadebens: id_tipocategoriadebens,
        nomemarca: id_nomemarca,
        idorigem: id_origem,
        nomemodelo: id_nomemodelo,
        gabinete: id_transferido,

        valor_aquisicao: $("#valor_aquisicao").val(),
        id_dep_imd: $("#id_dep_imd").val(),
        //dataq_aquisicao: $("#dataq_aquisicao").val(),
        codigogeral_id_bens: codido_text,
        //  obspatrinonio: $("#obspatrinonio").val(),
        estado_bem: $("#estado_id").val(),
        data_aquisicao: $("#data_aquisicao").val(),
        data_entrada: $("#data_entrada").val(),
        numero_oficial: $("#numero_oficial").val(),
        entida: id_entidadefornecedora,
        id_outrareferencia: $("#id_outrareferencia").val(),
        cor: $("#cor_id").val(),
        id_numeroserie: $("#id_numeroserie").val()


    }, function(data) {
        var result = parseInt(data.text);
        alert(result);
        if (result > 0) {
            $("#adicionarStatepatrimonio")
                .html("<p>Os seus dados foram adicionados com êxito!</p>");

            $("#adicionarcominidade")
                .dialog('option', 'buttons', {
                    'Fechar': function() {
                        $("#adicionarcominidade")
                            .dialog("close");
                        $("#adicionarStatedocumento")
                            .html("");
                    }
                });
            setTimeout(function() {
                $("#adicionarcominidade")
                    .dialog("close");
                $("#adicionarStatecominidade")
                    .html("");
                $("#resultadodalista")
                    .html("<img src='img/loader.gif'/>")
                    .load("ajax/cuminidade/view.php", "", function() {});
                $("#adicionarcominidade")
                    .dialog('option', 'buttons', {
                        "Cancelar": function() {
                            $(this)
                                .dialog("close");
                        },
                        "Adicionar": function() {
                            var bValid = true,
                                tips = $("#adicionarStatecominidade");
                            var idcomunidade = $("#iddistritocominidade option:selected")
                                .val();
                            var nomeccomunidade = $("#nomeccomunidade");
                            if (nomeccomunidade.val() == "") {
                                tips.html("O nome do Distrito não deve ser em branco.");
                                nomeccomunidade.addClass("ui-state-error");
                                nomeccomunidade.focus();
                                bValid = false;
                            } else if (idcomunidade == -1) {
                                tips.html("<p style='color:red'>Selecione um nome do Distrito por favor.</p>");
                                bValid = false;
                            }
                            if (bValid) {
                                adicionarAsyncdoc();
                            }
                        }
                    });
            }, 1000);
        } else {
            $("#adicionarStatecominidade")
                .html("<p>Registro dos dados falhada!</p>");
        }
    }, "json");
}




//fim


function actualizarAsyncdoc() {
    $("#adicionarStatecominidadeupdate")
        .html("<img src='img/loader.gif'/>");
    $.post("ajax/cuminidade/update.php", {
        idte: $("#idupdate")
            .val(),
        descricao: $("#nomecupdate")
            .val(),
        id_distrito: $("#iddistritocominidadeupdade option:selected")
            .val(),
        latitude: $("#idlatitudeupdate")
            .val(),
        longitude: $("#idlongitudeupdate")
            .val(),
        altitude: $("#idaltitudeupdate")
            .val(),
        tem_med: $("#idtem_medupdate")
            .val(),
        per_media: $("#idper_mediaupdate")
            .val(),
        resultdrive: $("#resultdriveupdate")
            .val()
    }, function(data) {
        var result = parseInt(data.text);
        if (result > 0) {
            $("#adicionarStatecominidadeupdate")
                .html("<p>Os seus dados foram Actualizados com êxito!</p>");
            $("#updadecominidade")
                .dialog('option', 'buttons', {
                    'Fechar': function() {
                        $("#updadecominidade")
                            .dialog("close");
                        $("#adicionarStatecominidadeupdate")
                            .html("");
                        $("#adicionarcominidade")
                            .dialog('option', 'buttons', {
                                "Cancelar": function() {
                                    $(this)
                                        .dialog("close");
                                },
                                "Actualizar": function() {
                                    var bValid = true,
                                        tips = $("#adicionarStatecominidadeupdate");
                                    var idcomunidade = $("#iddistritocominidadeupdade option:selected")
                                        .val();
                                    var nomecupdate = $("#nomecupdate")
                                        .val();
                                    if (nomecupdate.val() == "") {
                                        tips.html("O nome do Distrito não deve ser em branco.");
                                        nomecupdate.addClass("ui-state-error");
                                        nomecupdate.focus();
                                        bValid = false;
                                    } else if (idcomunidade == -1) {
                                        tips.html("<p style='color:red'>Selecione um nome do Distrito por favor.</p>");
                                        bValid = false;
                                    }
                                    if (bValid) {
                                        actualizarAsyncdoc();
                                    }
                                }
                            });
                    }
                });
            setTimeout(function() {
                $("#updadecominidade")
                    .dialog("close");
                $("#adicionarStatecominidadeupdate")
                    .html("");
                $("#adicionarStatecominidadeupdate")
                    .removeClass("ui-state-error");
                $("#resultadodalista")
                    .html("<img src='img/loader.gif'/>")
                    .load("ajax/cuminidade/view.php", "", function() {});
                $("#updadecominidade")
                    .dialog('option', 'buttons', {
                        "Cancelar": function() {
                            $(this)
                                .dialog("close");
                        },
                        "Actualizar": function() {
                            var bValid = true,
                                tips = $("#adicionarStatecominidadeupdate");
                            var idcomunidade = $("#iddistritocominidadeupdade option:selected")
                                .val();
                            var nomecupdate = $("#nomecupdate");
                            if (nomecupdate.val() == "") {
                                tips.html("O nome do Distrito não deve ser em branco.");
                                nomecupdate.addClass("ui-state-error");
                                nomecupdate.focus();
                                bValid = false;
                            } else if (idcomunidade == -1) {
                                tips.html("<p style='color:red'>Selecione um nome do Distrito por favor.</p>");
                                bValid = false;
                            }
                            if (bValid) {
                                actualizarAsyncdoc();
                            }
                        }
                    });
            }, 1000);
        } else {
            $("#adicionarStatecominidade")
                .addClass("ui-state-error");
            $("#adicionarStatecominidade")
                .html("<p>Registro dos dados falhada!</p>");
        }
    }, "json");
}

function canlcelarx() {
    $("#adicionarDialogo")
        .dialog("close");
}

function adicionardocumento() {
    $("#iddistritocominidade")
        .html("<img src='img/preloader-01.gif' />")
        .load("ajax/selection/option.php", "tipo=distrito&base=yes", function() {});
    $("#adicionarcominidade")
        .dialog("open");
}

function adicionarbensdepartamento() {
    $("#iddistritocominidade")
        .html("<img src='img/preloader-01.gif' />")
        .load("ajax/selection/option.php", "tipo=distrito&base=yes", function() {});
    $("#adicionarbensdepartamento")
        .dialog("open");
}

function adicionarafectar(id) {
    //alert(id)
    var codigo = $("#" + id + "codigobem").val();

    //alert(codigo);
    $("#id_codidoafecto").val(codigo);

    //	d_distrito: $("#iddistritocominidadeupdade option:selected").val()
    /*$("#iddistritocominidade")
    .html("<img src='img/preloader-01.gif' />")
    .load("ajax/selection/option.php", "tipo=distrito&base=yes", function () {});*/
    $("#adicionarbensafectar")
        .dialog("open");
}


function novocodigoafecto() {
    var t = $("#codigogeral_id").text();

    //alert("codigo"+ty)



    //var t =$("#id_codidoafecto").val();
    novonuber = $("#id_transferido option:selected").val();
    // funciona bem var idbrmcodigotext= $("#id_transferido option:selected").text();

    //alert(novonuber)




    var d = novonuber.split("-");



    //alert(d[0] + "" + d[1]);

    var fs = t.split("/");
    //alert(fs[0])
    novonuber = d[0];
    var novoco = fs[0] + "/" + novonuber;
    //  alert(novoco);
    $("#id_codidoafectonovo").val(novoco);
    $("#id_dep_imd").val(d[1]);

    $("#id_teste").html("").load("ajax/agricultor/conut_bens_departamento.php", "codigo_id=" + novonuber + "&novoco=" + novoco + "&id_dep=" + d[1], function() {});


    //alert(maxcontagem);

}









function atualizardepartamento() {
    // $("#id_teste").html("soppp");
    var t = $("#id_codidoafecto").val();
    var fs = t.split("/");
    //alert(fs[0])
    var novoco = fs[0] + "/" + novonuber;
    $("#id_teste").html("").load("ajax/agricultor/conut_bens_departamento.php", "codigo_id=" + novonuber + "&novoco=" + novoco, function() {});


    //var maxcontagem = $("#id_teste").text();


    //$("#id_codidoafectonovoes").val(maxcontagem);
}








setInterval("atualizardepartamento()", 1500);
setInterval("novocodigoafecto()", 1500);



function adicionarbensmoveis() {
    $("#id_bensmoveis")
        .dialog("open");
}

function testepdf() {
    var files = document.getElementById('file-doc')
        .files;
    if (files.length > 0) {
        getBase64(files[0]);
        alert(files[0])
    }
}

function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
        console.log(reader.result);
    };
    reader.onerror = function(error) {
        console.log('Error: ', error);
    };
}

function adddeparetamento() {
    $("#adicionardepartamento")
        .dialog("open");
}

function visualizar(id) {
    var disrito = $("#" + id + "distrito")
        .val();
    var fileContent = $("#" + id + "foto")
        .val();
    $("#idupdate")
        .val(id);
    if (fileContent === "") {
        $("#resultupdate")
            .html("<p><b>Ainda não foi adicionado nenhuma foto</b></p>");
    } else {
        $("#resultupdate")
            .html("<img src='data:image/jpeg;base64" + fileContent + "'width='350' height='250'/>");
    }
    $("#nomecupdate")
        .val($("#" + id + "cuminidade")
            .val());
    $("#idlatitudeupdate")
        .val($("#" + id + "latitude")
            .val());
    $("#idlongitudeupdate")
        .val($("#" + id + "longitude")
            .val());
    $("#idaltitudeupdate")
        .val($("#" + id + "altitude")
            .val());
    $("#idtem_medupdate")
        .val($("#" + id + "temp_media")
            .val());
    $("#idper_mediaupdate")
        .val($("#" + id + "pre_media")
            .val());
    $("#iddistritocominidadeupdade")
        .html("<img src='img/preloader-01.gif' />")
        .load("ajax/selection/option.php", "tipo=distrito&base=yes", function() {
            $("#iddistritocominidadeupdade option:contains(" + disrito + ")")
                .prop('selected', true);
        });
    $("#updadecominidade")
        .dialog("open");
}
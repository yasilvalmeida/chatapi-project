$(function () {


    var nomepaisToInsert = $("#nomepaisToInsert"),
        iddistrito = $("#iddistrito"),
        idloacalidade = $("#idloacalidade");

    allFields = $([]).add(iddistrito).add(idloacalidade).add(idloacalidade);

    $("#adicionarDialogo").dialog({
        autoOpen: false,
        resizable: true,
        show: "clip",
        hide: "clip",
        width: "auto",
        modal: true,
        closeOnEscape: true,
        buttons: {
            "Cancelar": function () {
                $(this).dialog("close");
            },
            "Criar Processo": function () {
                var bValid = true,
                    tips = $("#adicionarState");
                allFields.removeClass("ui-state-error");
                if (nomeToInsert.val() == "") {
                    tips.html("O nome do Beneficiário não deve ser em branco.");
                    nomeToInsert.addClass("ui-state-error");
                    nomeToInsert.focus();
                    bValid = false;
                } else if (apelidoToInsert.val() == "") {
                    tips.html("O apelido do Beneficiário não deve ser em branco.");
                    apelidoToInsert.addClass("ui-state-error");
                    apelidoToInsert.focus();
                    bValid = false;
                } else if (biToInsert.val() == "") {
                    tips.html("O BI do Beneficiário não deve ser em branco.");
                    biToInsert.addClass("ui-state-error");
                    biToInsert.focus();
                    bValid = false;
                } else if (nifToInsert.val() == "") {
                    tips.html("O NIF do Beneficiário não deve ser em branco.");
                    nifToInsert.addClass("ui-state-error");
                    nifToInsert.focus();
                    bValid = false;
                } else {
                    if (bValid) {
                        adicionarAsync();
                    }
                }
            }
        },
        close: function () {
            allFields.val("").removeClass("ui-state-error");
            //$("#adicionar").tooltip("close");
            $("#adicionarState").html("");
            $("#adicionarState").removeClass("ui-state-error");
            $("#resultadoscarta").html("<img src='img/loader.gif'/>").load("ajax/carta/view.php", "", function () {});
        }
    });
    //pais
    $("#adicionarDialogopais").dialog({
        autoOpen: false,
        resizable: true,
        show: "clip",
        hide: "clip",
        width: "auto",
        modal: true,
        closeOnEscape: true,
        buttons: {
            "Cancelar": function () {
                $(this).dialog("close");
            },
            "Adicionar": function () {
                var bValid = true,
                    tips = $("#adicionarStatepais");
                allFields.removeClass("ui-state-error");
                if (nomepaisToInsert.val() == "") {
                    tips.html("O nome do País não deve ser em branco.");
                    nomepaisToInsert.addClass("ui-state-error");
                    nomepaisToInsert.focus();
                    bValid = false;
                } else {
                    if (bValid) {
                        adicionarAsyncpais();
                    }
                }
            }
        },
        close: function () {
            allFields.val("").removeClass("ui-state-error");
            //$("#adicionar").tooltip("close");
            $("#adicionarState").html("");
            $("#adicionarState").removeClass("ui-state-error");
            $("#resultadoscarta").html("<img src='img/loader.gif'/>").load("ajax/carta/view.php", "", function () {});
        }
    });
    //fim pais

    //distrito
    $("#adicionarDialogodistrito").dialog({
        autoOpen: false,
        resizable: true,
        show: "clip",
        hide: "clip",
        width: "auto",
        modal: true,
        closeOnEscape: true,
        buttons: {
            "Cancelar": function () {
                $(this).dialog("close");
            },
            "Adicionar": function () {
                var bValid = true,
                    tips = $("#adicionarStatedistrito");
                allFields.removeClass("ui-state-error");
                if (iddistrito.val() == "") {
                    tips.html("O nome do Distrito não deve ser em branco.");
                    iddistrito.addClass("ui-state-error");
                    iddistrito.focus();
                    bValid = false;
                } else {
                    if (bValid) {
                        adicionarAsyncdistrito();
                    }
                }
            }
        },
        close: function () {
            allFields.val("").removeClass("ui-state-error");
            //$("#adicionar").tooltip("close");
            $("#adicionarStatedistrito").html("");
            $("#adicionarStatedistrito").removeClass("ui-state-error");
            $("#resultadosdistrito").html("<img src='img/loader.gif'/>").load("ajax/parametro/view.php", "tipo=distrito", function () {});
        }
    });
    //fim distrito

    //Lacaliade
    $("#adicionarDialogolocalidade").dialog({
        autoOpen: false,
        resizable: true,
        show: "clip",
        hide: "clip",
        width: "auto",
        modal: true,
        closeOnEscape: true,
        buttons: {
            "Cancelar": function () {
                $(this).dialog("close");
                $("#idnascimento").html("<img src='img/preloader-01.gif' />").load("ajax/selection/option.php", "tipo=idnascimento&base=mais", function () {});
                $("#idmorada").html("<img src='img/preloader-01.gif' />").load("ajax/selection/option.php", "tipo=idmorada&base=mais", function () {});
            },
            "Adicionar": function () {
                var bValid = true,
                    tips = $("#adicionarStatelocalidade");
                allFields.removeClass("ui-state-error");
                if (idloacalidade.val() == "") {
                    tips.html("O nome do Localidade não deve ser em branco.");
                    idloacalidade.addClass("ui-state-error");
                    idloacalidade.focus();
                    bValid = false;
                } else {
                    if (bValid) {
                        adicionarAsynclocalidade();
                    }
                }
            }
        },
        close: function () {
            allFields.val("").removeClass("ui-state-error");
            //$("#adicionar").tooltip("close");
            $("#adicionarState").html("");
            $("#adicionarState").removeClass("ui-state-error");
            $("#resultadolocalidadepais").html("<img src='img/loader.gif'/>").load("ajax/parametro/view.php", "tipo=localidade", function () {});

        }
    });
    //fim Lacalidade


    $("#resultadoscarta").html("<img src='img/loader.gif'/>").load("ajax/carta/view.php", "", function () {});
    $("#resultadoscartaestado").html("<img src='img/loader.gif'/>").load("ajax/carta/viewestado.php", "", function () {});

    $("#resultadospais").html("<img src='img/loader.gif'/>").load("ajax/parametro/view.php", "tipo=pais", function () {});

    $("#resultadosdistrito").html("<img src='img/loader.gif'/>").load("ajax/parametro/view.php", "tipo=distrito", function () {});
    $("#resultadolocalidadepais").html("<img src='img/loader.gif'/>").load("ajax/parametro/view.php", "tipo=localidade", function () {});
});

function adicionardistriot() {
    $("#adicionarDialogodistrito").dialog("open");
    $("#idpais").html("<img src='img/preloader-01.gif' />").load("ajax/selection/option.php", "tipo=pais&base=no", function () {});
}

function adicionarlocalidade() {
    $("#adicionarDialogolocalidade").dialog("open");
    $("#idlocalidade").html("<img src='img/preloader-01.gif' />").load("ajax/selection/option.php", "tipo=distritoid&base=no", function () {});
}

function adicionarpais() {
    $("#adicionarDialogopais").dialog("open");
}


function adicionarAsyncpais() {
    $("#adicionarStatepais").html("<img src='img/loader.gif'/>");
    $.post("ajax/parametro/insert.php", {
            tipo: $("#nomepaisToInsert").val(),
            pattern: "pais",
        },
        function (data) {
            var result = parseInt(data.text);
            //  alert(result)
            if (result > 0) {
                $("#adicionarStatepais").html("<p>Os seus dados foram adicionados com êxito!</p>");
                $("#adicionarDialogopais").dialog('option', 'buttons', {
                    'Fechar': function () {
                        $("#adicionarDialogopais").dialog("close");
                        $("#adicionarStatepais").html("");
                        $("#adicionarDialogopais").dialog('option', 'buttons', {
                            "Cancelar": function () {
                                $(this).dialog("close");
                            },
                            "Adicionar": function () {
                                var bValid = true,
                                    tips = $("#adicionarStatepais"),
                                    nomepaisToInsert = $("#nomepaisToInsert");
                                allFields.removeClass("ui-state-error");
                                if (nomepaisToInsert.val() == "") {
                                    tips.html("O nome do Pais não deve ser em branco.");
                                    nomepaisToInsert.addClass("ui-state-error");
                                    nomepaisToInsert.focus();
                                    bValid = false;
                                } else {
                                    if (bValid) {
                                        adicionarAsyncpais();
                                    }
                                }
                            }
                        });
                    }
                });
                setTimeout(function () {
                    $("#adicionarDialogopais").dialog("close");
                    $("#adicionarStatepais").html("");
                    $("#resultadospais").html("<img src='img/loader.gif'/>").load("ajax/parametro/view.php", "tipo=pais", function () {});
                    $("#adicionarStatepais").removeClass("ui-state-error");
                    $("#adicionarDialogopais").dialog('option', 'buttons', {
                        "Cancelar": function () {
                            $(this).dialog("close");
                        },
                        "Adicionar": function () {
                            var bValid = true,
                                tips = $("#adicionarStatepais"),
                                nomepaisToInsert = $("#nomepaisToInsert");
                            if (nomepaisToInsert.val() == "") {
                                tips.html("O nome do Pais não deve ser em branco.");
                                nomepaisToInsert.addClass("ui-state-error");
                                nomepaisToInsert.focus();
                                bValid = false;
                            } else {
                                if (bValid) {
                                    adicionarAsyncpais();
                                }
                            }
                        }
                    });
                }, 1000);
            } else {
                $("#adicionarStatepais").addClass("ui-state-error");
                $("#adicionarStatepais").html("<p>Registro dos dados falhada!</p>");
            }
        }, "json");



}

function adicionarAsynclocalidade() {
    // alert($("#idlocalidade option:selected").val())
    $("#adicionarStatelocalidade").html("<img src='img/loader.gif'/>");
    $.post("ajax/parametro/insert.php", {
            nomelocalidade: $("#idloacalidade").val(),
            idlocalidade: $("#idlocalidade option:selected").val(),
            pattern: "localidade",
        },
        function (data) {
            var result = parseInt(data.text);
            //  alert(result)
            if (result > 0) {
                $("#adicionarStatelocalidade").html("<p>Os seus dados foram adicionados com êxito!</p>");
                $("#adicionarDialogolocalidade").dialog('option', 'buttons', {
                    'Fechar': function () {
                        $("#adicionarDialogolocalidade").dialog("close");
                        $("#adicionarStatelocalidade").html("");

                        $("#adicionarDialogolocalidade").dialog('option', 'buttons', {
                            "Cancelar": function () {
                                $(this).dialog("close");
                                $("#idnascimento").html("<img src='img/preloader-01.gif' />").load("ajax/selection/option.php", "tipo=idnascimento&base=mais", function () {});
                                $("#idmorada").html("<img src='img/preloader-01.gif' />").load("ajax/selection/option.php", "tipo=idmorada&base=mais", function () {});
                            },
                            "Adicionar": function () {
                                var bValid = true,
                                    tips = $("#adicionarStatelocalidade"),
                                    idloacalidade = $("#idloacalidade");
                                allFields.removeClass("ui-state-error");
                                if (idloacalidade.val() == "") {
                                    tips.html("O nome do Localidade não deve ser em branco.");
                                    idloacalidade.addClass("ui-state-error");
                                    idloacalidade.focus();
                                    bValid = false;
                                } else {
                                    if (bValid) {
                                        adicionarAsynclocalidade();
                                    }
                                }
                            }
                        });
                    }
                });
                setTimeout(function () {
                    $("#adicionarDialogolocalidade").dialog("close");
                    $("#adicionarStatelocalidade").html("");
                    $("#idnascimento").html("<img src='img/preloader-01.gif' />").load("ajax/selection/option.php", "tipo=idnascimento&base=mais", function () {});
                    $("#idmorada").html("<img src='img/preloader-01.gif' />").load("ajax/selection/option.php", "tipo=idmorada&base=mais", function () {});
                    $("#adicionarStatelocalidade").removeClass("ui-state-error");
                    $("#adicionarDialogolocalidade").dialog('option', 'buttons', {
                        "Cancelar": function () {
                            $(this).dialog("close");
                            $("#idnascimento").html("<img src='img/preloader-01.gif' />").load("ajax/selection/option.php", "tipo=idnascimento&base=mais", function () {});

                            $("#idmorada").html("<img src='img/preloader-01.gif' />").load("ajax/selection/option.php", "tipo=idmorada&base=mais", function () {});
                        },
                        "Adicionar": function () {
                            var bValid = true,
                                tips = $("#adicionarSt                                                                               atelocalidade"),
                                idloacalidade = $("#idloacalidade");
                            if (idloacalidade.val() == "") {
                                tips.html("O nome do Localidade não deve ser em branco.");
                                idloacalidade.addClass("ui-state-error");
                                idloacalidade.focus();
                                bValid = false;
                            } else {
                                if (bValid) {
                                    adicionarAsynclocalidade();
                                }
                            }
                        }
                    });
                }, 1000);
            } else {
                $("#adicionarStatepais").addClass("ui-state-error");
                $("#adicionarStatepais").html("<p>Registro dos dados falhada!</p>");
            }
        }, "json");



}



function adicionarAsyncdistrito() {
    //alert($("#idpais option:selected").val())
    $("#adicionarState").html("<img src='img/loader.gif'/>");
    $.post("ajax/parametro/insert.php", {
            nome: $("#iddistrito").val(),
            idpais: $("#idpais option:selected").val(),
            pattern: "distrito"
        },
        function (data) {
            var result = parseInt(data.text);
            //  alert(result)
            if (result > 0) {
                $("#adicionarStatedistrito").html("<p>Os seus dados foram adicionados com êxito!</p>");
                $("#adicionarDialogodistrito").dialog('option', 'buttons', {
                    'Fechar': function () {
                        $("#adicionarDialogodistrito").dialog("close");
                        $("#adicionarStatedistrito").html("");
                        $("#adicionarDialogodistrito").dialog('option', 'buttons', {
                            "Cancelar": function () {
                                $(this).dialog("close");
                            },
                            "Adicionar": function () {
                                var bValid = true,
                                    tips = $("#adicionarStatedistrito"),
                                    iddistrito = $("#iddistrito");
                                allFields.removeClass("ui-state-error");
                                if (iddistrito.val() == "") {
                                    tips.html("O nome do Distrito não deve ser em branco.");
                                    iddistrito.addClass("ui-state-error");
                                    iddistrito.focus();
                                    bValid = false;
                                } else {
                                    if (bValid) {
                                        adicionarAsyncdistrito();
                                    }
                                }
                            }
                        });
                    }
                });
                setTimeout(function () {
                    $("#adicionarDialogodistrito").dialog("close");
                    $("#adicionarStatepais").html("");
                    $("#resultadosdistrito").html("<img src='img/loader.gif'/>").load("ajax/parametro/view.php", "tipo=distrito", function () {});
                    $("#adicionarStatedistrito").removeClass("ui-state-error");
                    $("#adicionarDialogodistrito").dialog('option', 'buttons', {
                        "Cancelar": function () {
                            $(this).dialog("close");
                        },
                        "Adicionar": function () {
                            var bValid = true,
                                tips = $("#adicionarStatepais"),
                                iddistrito = $("#iddistrito");
                            if (iddistrito.val() == "") {
                                tips.html("O nome do Pais não deve ser em branco.");
                                iddistrito.addClass("ui-state-error");
                                iddistrito.focus();
                                bValid = false;
                            } else {
                                if (bValid) {
                                    adicionarAsyncdistrito();
                                }
                            }
                        }
                    });
                }, 1000);
            } else {
                $("#adicionarStatedistrito").addClass("ui-state-error");
                $("#adicionarStatedistrito").html("<p>Registro dos dados falhada!</p>");
            }
        }, "json");



}

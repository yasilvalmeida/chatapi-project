$(function() {

    var desegnacao_id_0 = 0;
    var descricao_id_0 = 0;
    var permissao_id_0 = 0;

    var id_geral_comunidade = $("#comunidade_id").val();
    // alert(id_geral_comunidade)

    // $("#listainfrastrutura").html("<img src='img/loader.gif'/>").load("ajax/infrastrutura/listainfrastrutura.php", "id=" + id_geral_comunidade, function() {});
    $("#listainfrastrutura").html("<img src='img/loader.gif'/>").load("ajax/infrastrutura/listainfrastrutura.php", "id=" + id_geral_comunidade + "&nomedesc=t", function() {});



    $("#addinfrastrutura").dialog({
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
        width: "400px",
        modal: true,
        closeOnEscape: true,
        buttons: {
            "Cancelar": function() {
                $(this).dialog("close");
            },
            "Actualizar": function() {
                var bValid = true,
                    tips = $("#adicionarStatecominidade");
                allFields.removeClass("ui-state-error");
                var idcomunidade = $("#iddistritocominidadeupdade option:selected").val();
                //alert(idcomunidade)


                if (nomecupdate.val() == "") {
                    tips.html("O nome do Distrito não deve ser em branco.");
                    nomecupdate.addClass("ui-state-error");
                    nomecupdate.focus();
                    bValid = false;

                } else if (idcomunidade == -1) {
                    tips.html("<p style='color:red'>Selecione um nome do Distrito por favor.</p>");
                    bValid = false;
                }
                //bValid = bValid && checkLength(nameDistritoToInsert, "nome do parametro", 3, 50, tips);
                if (bValid) {
                    actualizarAsyncdoc();
                }

            }
        },
        close: function() {
            allFields.val("").removeClass("ui-state-error");
            //$("#adicionar").tooltip("close");
            $("#adicionarState").html("");
            $("#adicionarState").removeClass("ui-state-error");
            $("#resultados_processados").html("<img src='img/loader.gif'/>").load("ajax/factura/view.php", "", function() {});
        }
    });



    $("#adicionarinfrastrutura").dialog({
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
        width: "400px",
        modal: true,
        closeOnEscape: true,
        buttons: {
            "Cancelar": function() {
                $(this).dialog("close");
            },
            "Actualizar": function() {
                var novoestado = $("#novoestado_id").val();
                if (novoestado === "-1") {
                    $("#adicionarStateinfrastrutura").html("<p style='color:red'>Seleccione um Estado da Infrastrutura por favor !!</p>");
                } else {
                    editarinfrastrutura();
                }


            }
        },
        close: function() {
            //      allFields.val("").removeClass("ui-state-error");
            //$("#adicionar").tooltip("close");
            //   $("#adicionarState").html("");
            //  $("#adicionarState").removeClass("ui-state-error");
            //$("#resultados_processados").html("<img src='img/loader.gif'/>").load("ajax/factura/view.php", "", function() {});
        }
    });



    $("#pesquisa_iddados").html("<img src='img/preloader-01.gif' />").load("ajax/selection/option.php", "tipo=estadoinfraestrutuda&base=yes&idcom=" + id_geral_comunidade, function() {});










});

function adicionardocumento() {
    $("#addinfrastrutura").dialog("open");
}


function updateinfrastrutura(id) {
    //  alert(id)
    $("#id_infras").val(id);
    //$("#observacao_id").val($("#" + id + "observacao_id").val());
    $("#id_nomeinfras").val($("#" + id + "designacao").val());
    //alert($("#" + id + "observacao_id").val())


    $("#adicionarinfrastrutura").dialog("open");
}





function ver_idtestx() {

    var idc = $("#comunidade_id").val();
    var totalinfr = $("#totalid_infr").val();
    $("#smsid").html("<img src='img/loader.gif'/>");
    //alert(totalinfr)

    //  permissao_id == "Seleccional")

    $("#smsid").html("");







    for (index = 0; index <= totalinfr; index++) {


        var desegnacao = $("#desegnacao_id_" + index).val(),
            descricao = $("#descricao_id_" + index).val(),
            permissao = $("#permissao_id_" + index).val();

        //  alert(permissao)

        if (desegnacao == "") {
            $("#smsid").html("<p style='color:red'>Verifica bem o Nome </p>");
        } else if (descricao == "") {
            $("#smsid").html("<p style='color:red'>Verifica bem o campo  Descrição</p>");
        } else if (permissao == "") {
            $("#smsid").html("<p style='color:red'>Seleccionar um Estado</p>");
        } else {

            $.post("ajax/infrastrutura/insert.php", {
                    //   t_actores_id_actores,parcela,tipo_cultura,t_cultura,ha,t_actividade_actor,data_inicio,t_cuminidade_id----- tipoculturaid_id
                    desegnacao_id: $("#desegnacao_id_" + index).val(),
                    descricao_id: $("#descricao_id_" + index).val(),
                    permissao_id: $("#permissao_id_" + index).val(),
                    id_com: idc
                },
                function(data) {
                    var result = parseInt(data.text);
                    // alert(result)

                    if (result > 0) {
                        $("#smsid").html("<img src='img/sucesso.png'/>");
                        // $("#listainfrastrutura").html("<img src='img/loader.gif'/>").load("ajax/infrastrutura/listainfrastrutura.php", "id=" + idc, function() {});
                        $("#listainfrastrutura").html("<img src='img/loader.gif'/>").load("ajax/infrastrutura/listainfrastrutura.php", "id=" + idc + "&nomedesc=t", function() {});


                    } else {
                        $("#smsid").html("<p style='color:red'>Falha ao Inserir Dados</p>");


                    }
                }, "json");
            setTimeout(function() {
                $("#smsid").html("");
                window.location.reload();
            }, 2000);
        }








        //   const element = array[index];
        /* desegnacao_id = $("#desegnacao_id_" + index).val();
        descricao_id = $("#descricao_id_" + index).val();
        permissao_id = $("#permissao_id_" + index).val();


if



*/














        /*

                alert(desegnacao_id);
                alert(descricao_id);
                alert(permissao_id);
                alert(index)*/

    }













}










function iserir_infrastrutura() {

    var tatal = $("#total_idtable").val();
    //  alert("tatal " + tatal);
    for (index = 0; index <= tatal; index++) {
        var idparcela = $("#idparcela_" + index).val();
        //alert("idparcela " + idparcela)
        if (typeof idparcela === 'undefined') {
            index++;
            //  alert(index)
            //   alert("entrei aqui undefined" + index)
        } else {
            if (index == 0) {
                var cultura = $("#tipoculturaid_id" + index).val();
                $("#arryid").val(cultura)
                $.post("ajax/agricultor/insert_actvidade.php", {
                        //   t_actores_id_actores,parcela,tipo_cultura,t_cultura,ha,t_actividade_actor,data_inicio,t_cuminidade_id----- tipoculturaid_id
                        idparcela: $("#idparcela_" + index).val(),
                        idcultuta: $("#cultura_" + index + "  option:selected").val(),
                        ha: $("#idha_" + index).val(),
                        tipoactividade: $("#tipoatividadeid option:selected").val(),
                        dataid: $("#iddata_" + index).val(),
                        comunidade: $("#id_comunidade_id").val(),
                        tipocultuta: $("#arryid").val()
                    },
                    function(data) {
                        var result = parseInt(data.text);
                        alert(result)
                        if (result > 0) {} else {}
                    }, "json");
                /* alert("parcela " + $("#idparcela_" + index).val());
                   alert("ha " + $("#idha_" + index).val());
                   alert("idcultuta " + $("#cultura_" + index + "  option:selected").val())9979446
                   alert("tipo " + $("#tipocultura" + index + "  option:selected").val())
                   alert("data " + $("#iddata_" + index).val());cuminidade_*/
            } else {
                $("#arryid").val("");
                var cultura = $("#tipoculturaid_id" + index).val();
                $("#arryid").val(cultura);
                $.post("ajax/agricultor/insert_actvidade.php", {
                        idparcela: $("#idparcela_" + index).val(),
                        idcultuta: $("#cultura_" + index + "  option:selected").val(),
                        ha: $("#idha_" + index).val(),
                        tipoactividade: $("#tipoatividadeid option:selected").val(),
                        dataid: $("#iddata_" + index).val(),
                        comunidade: $("#comunidade_" + index + " option:selected").val(),
                        tipocultuta: $("#arryid").val()
                    },
                    function(data) {
                        var result = parseInt(data.text);

                        if (result > 0) {

                            //  alert("resultado 2ª" + result)

                        } else {

                        }
                    }, "json");
            }
        }
    }

}


function editarinfrastrutura() {
    $("#adicionarStateinfrastrutura").html("<img src='img/loader.gif'/>");
    //alert($("#id_infras").val());
    //alert($("#id_nomeinfras").val());
    //alert($("#novoestado_id").val());
    //alert($("#observacao_id").val());
    var id_comu = $("#comunidade_id").val();




    // alert(iddistritocominidade);
    $.post("ajax/infrastrutura/update.php", {
            id_inf: $("#id_infras").val(),
            novoestado_id: $("#novoestado_id").val(),
            id_nomeinfras: $("#id_nomeinfras").val(),
            observacao_id: $("#observacao_id").val(),
            id: id_comu
        },
        function(data) {
            var result = parseInt(data.text);
            //  alert(result)
            if (result > 0) {
                $("#adicionarStateinfrastrutura").html("<p>Os seus dados foram Actualizado com êxito!</p>");

                $("#adicionarinfrastrutura").dialog('option', 'buttons', {
                    'Fechar': function() {
                        $("#adicionarinfrastrutura").dialog("close");
                        $("#adicionarStateinfrastrutura").html("");
                        $("#adicionarinfrastrutura").dialog('option', 'buttons', {
                            "Cancelar": function() {
                                $(this).dialog("close");
                                var id_geral_comunidade = $("#comunidade_id").val();
                                $("#listainfrastrutura").html("<img src='img/loader.gif'/>").load("ajax/infrastrutura/listainfrastrutura.php", "id=" + id_geral_comunidade + "&nomedesc=t", function() {});

                            },
                            "Actualizar": function() {
                                var novoestado = $("#novoestado_id").val();
                                if (novoestado === "-1") {
                                    $("#adicionarStateinfrastrutura").html("<p style='color:red'>Seleccione um Estado da Infrastrutura por favor !!</p>");
                                } else {
                                    editarinfrastrutura();
                                }

                            }
                        });
                    }
                });
                setTimeout(function() {

                    $("#adicionarinfrastrutura").dialog("close");
                    $("#adicionarStateinfrastrutura").html("");

                    var id_geral_comunidade = $("#comunidade_id").val();
                    $("#listainfrastrutura").html("<img src='img/loader.gif'/>").load("ajax/infrastrutura/listainfrastrutura.php", "id=" + id_geral_comunidade + "&nomedesc=t", function() {});

                    $("#adicionarinfrastrutura").dialog('option', 'buttons', {
                        "Cancelar": function() {

                            $(this).dialog("close");
                            $("#listainfrastrutura").html("<img src='img/loader.gif'/>").load("ajax/infrastrutura/listainfrastrutura.php", "id=" + id_geral_comunidade + "&nomedesc=t", function() {});

                        },
                        "Actualizar": function() {
                            var novoestado = $("#novoestado_id").val();
                            if (novoestado === "-1") {
                                $("#adicionarStateinfrastrutura").html("<p style='color:red'>Seleccione um Estado da Infrastrutura por favor !!</p>");
                            } else {
                                editarinfrastrutura();
                            }

                        }
                    });
                }, 1000);
            } else {

                $("#adicionarStateinfrastrutura").html("<p>Registro dos dados falhada!</p>");
            }
        }, "json");
}


function pesquisar() {
    var pesquisar = $("#pesquisa_iddados option:selected").val();
    var id_geral_comunidade = $("#comunidade_id").val();
    //alert(id_geral_comunidade)
    if (pesquisar == -1) {
        $("#listainfrastrutura").html("<img src='img/loader.gif'/>").load("ajax/infrastrutura/listainfrastrutura.php", "id=" + id_geral_comunidade + "&nomedesc=t", function() {});

    } else {
        $("#listainfrastrutura").html("<img src='img/loader.gif'/>").load("ajax/infrastrutura/listainfrastrutura.php", "id=" + id_geral_comunidade + "&nomedesc=" + pesquisar, function() {});

    }





    // alert(pesquisar)
}
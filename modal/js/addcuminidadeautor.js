$(function() {

    var iddistrito = $("#iddistritocominidade"),

        nomeccomunidade = $("#nomeccomunidade"),

        allFields = $([]).add(iddistrito).add(nomeccomunidade);

    $("#adicionarcominidadeaddautor").dialog({
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
            "Adicionar": function() {
                // alert("ola")
                $("#adicionarStatecominidadeautor").html("");
                var bValid = true,
                    tips = $("#adicionarStatecominidadeautor");
                allFields.removeClass("ui-state-error");
                var idcomunidade = $("#iddistritocominidade option:selected").val();
                //     alert(idcomunidade)
                if (nomeccomunidade.val() == "") {
                    tips.html("O nome do Distrito não deve ser em branco.");
                    nomeccomunidade.addClass("ui-state-error");
                    nomeccomunidade.focus();
                    bValid = false;

                } else if (idcomunidade == -1) {
                    tips.html("<p style='color:red'>Selecione um nome do Distrito por favor.</p>");
                    bValid = false;
                }
                //bValid = bValid && checkLength(nameDistritoToInsert, "nome do parametro", 3, 50, tips);
                if (bValid) {

                    adicionarAsynccomunidadeautor();
                }

            }
        },
        close: function() {
            //       allFields.val("").removeClass("ui-state-error");
            //$("#adicionar").tooltip("close");
            //    $("#id_morada").html("<img src='img/loader.gif'/>").load("ajax/selection/option.php", "tipo=cuminidadelist&base=yes&cumi=yes&idcomu=id_morada", function() {});
            $("#id_morada").html("<img src='img/loader.gif'/>").load("ajax/agricultor/actualizarcuminidade.php", "", function() {});

            $("#adicionarState").html("");
            $("#adicionarState").removeClass("ui-state-error");
            // $("#resultados_processados").html("<img src='img/loader.gif'/>").load("ajax/factura/view.php", "", function() {});
        }
    });

});

function testis() {
    var id_moradaautor = $("#id_morada option:selected").val();
    if (id_moradaautor == -2) {
        $("#adicionarcominidadeaddautor").dialog("open");
    }


}


function adicionarAsynccomunidadeautor() {
    $("#adicionarStatecominidadeautor").html("<img src='img/loader.gif'/>");
    //  var iddoctexte = $("#iddoctexte").val(),
    //var iddistritocominidade = $("#iddistritocominidade option:selected").val();
    // alert(iddistritocominidade);
    //alert($("#nomeccomunidade").val());

    $.post("ajax/cuminidade/insert.php", {

            descricao: $("#nomeccomunidade").val(),
            id_distrito: $("#iddistritocominidade option:selected").val(),
            latitude: "",
            longitude: "",
            altitude: "",
            tem_med: "",
            per_media: "",
            resultdrive: ""

        },
        function(data) {
            var result = parseInt(data.text);
            //  alert(result)


            if (result > 0) {
                $("#adicionarStatecominidadeautor").html("<p>Os seus dados foram adicionados com êxito!</p>");
                $("#result").html("");
                $("#adicionarcominidadeaddautor").dialog('option', 'buttons', {
                    'Fechar': function() {
                        $("#adicionarcominidadeaddautor").dialog("close");
                        $("#adicionarStatecominidadeautor").html("");


                    }
                });
                setTimeout(function() {

                    $("#adicionarcominidadeaddautor").dialog("close");
                    $("#adicionarStatecominidadeautor").html("");
                    //   $("#adicionarStatecominidade").removeClass("ui-state-error");
                    //  $("#id_morada").html("<img src='img/loader.gif'/>").load("ajax/agricultor/actualizarcuminidade.php", "", function() {});

                    // $("#resultadodalista").html("<img src='img/loader.gif'/>").load("ajax/cuminidade/view.php", "", function() {});
                    //$("#resultados").html("<img src='img/loader.gif'/>").load("ajax/factura/view.php", "", function () {});
                    //window.open("ajax/factura/print.php?idfatura=" + fac + "&nome=" +
                    //	nomecome + "&nif=" + nif + "&nrecibo=" + recibobanco + "&nc=" + numerocarta,
                    //	"_blank ");
                    $("#adicionarcominidadeaddautor").dialog('option', 'buttons', {
                        "Cancelar": function() {
                            $(this).dialog("close");
                        },
                        "Adicionar": function() {
                            var bValid = true,
                                tips = $("#adicionarStatecominidade");
                            //  allFields.removeClass("ui-state-error");
                            var idcomunidade = $("#iddistritocominidade option:selected").val();
                            var nomeccomunidade = $("#nomeccomunidade");
                            //alert(idcomunidade)
                            if (nomeccomunidade.val() == "") {
                                tips.html("O nome do Distrito não deve ser em branco.");
                                nomeccomunidade.addClass("ui-state-error");
                                nomeccomunidade.focus();
                                bValid = false;

                            } else if (idcomunidade == -1) {
                                tips.html("<p style='color:red'>Selecione um nome do Distrito por favor.</p>");
                                bValid = false;
                            }
                            //bValid = bValid && checkLength(nameDistritoToInsert, "nome do parametro", 3, 50, tips);
                            if (bValid) {
                                adicionarAsynccomunidadeautor();
                            }

                        }
                    });
                }, 1000);
            } else {
                // $("#adicionarStatecominidade").addClass("ui-state-error");
                $("#adicionarStatecominidadeautor").html("<p>Registro dos dados falhada!</p>");
            }
        }, "json");
}
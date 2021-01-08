var incremento = 0;
var imcri = 0;
var incrementopercuaria = 0;
var globar_id = 0;
var globar_especie = 0;
var outroidcultura = 0;
var idgeral_ig = 0;
var id_tabela = 0
var ent = true;
var index = 0;
var indexpecuaria = 0;
var b = 0;
var id_cart_agri = 0;
$(function() {

    var prox = false;
    var agricultura = 0;
    var pecuaria = 0;
    var rec_comunidade = 0;
    var atributo_geral = "";
    var titulo = $("#idtitulo"),
        iddistrito = $("#iddistritocominidade"),
        actor_bi = $("#actor_bi"),
        idlongitude = $("#idlongitude"),
        idlatitude = $("#idlatitude"),
        idaltitude = $("#idaltitude"),
        idtem_med = $("#idtem_med"),
        idper_media = $("#idper_media"),
        idtem_med = $("#idtem_med"),
        nomeccomunidade = $("#nomeccomunidade"),
        nomeccomunidadeaddagricultor = $("#nomeccomunidadeaddagricultor"),

        actor_nomecompleto = $("#actor_nomecompleto"),
        actor_bi = $("#actor_bi"),
        actor_nif = $("#actor_nif"),
        habilitacao = $("#habilitacao"),

        telefone_actor = $("#telefone_actor"),
        telefoneall_actor = $("#telefoneall_actor"),
        actor_email = $("#actor_email"),

        allFields = $([]).add(iddistrito).add(nomeccomunidade).add(idlatitude).add(idaltitude).add(idper_media).add(idlongitude).add(actor_email).add(telefone_actor).add(telefoneall_actor).add(nomeccomunidadeaddagricultor);
    $("#texte_id_0").hide();
    $(".actions a[href$='#next']").click(function() {
        var bi_ator = $("#actor_bi").val();
        if (ent == true) {
            //  adicionaracontactoAgricultor();

            //    adicionarAgricultor();
            ent = false
        } else {
            // alert(ent)
        }
        if (bi_ator === "") {
            //alert("entrei aqui");
        } else {

            adicionaracontactoAgricultor();

            adicionarAgricultor();



            //alert("BI " + bi_ator);
        }


        if (prox) {
            var parcelae = $("#idparcela_0").val(),
                idha = $("#idha_0").val(),
                id_cultuta = $("#cultura_0 option:selected").val();
            //   alert(id_cultuta)
            nfemia = $("#nfemia_0").val(),
                nmacho = $("#nmacho_0").val(),

                data_per = $("#data_id_0").val();
            /// cultura_id  = $("#cultura_0 option:selected").val();

            //  alert("parcelae " + parcelae)
            if (parcelae === "") {
                agricultura = 0;
            } else if (idha === "") {
                agricultura = 0;
            } else if (id_cultuta == "-1") {
                agricultura = 0;
            } else {
                agricultura = 1;
            }

            if (nfemia === "") {
                pecuaria = 0;
            } else if (nmacho === "") {
                pecuaria = 0;
            } else if (data_per === "") {
                pecuaria = 0;
            } else {
                pecuaria = 1;
            }

        } else {
            prox = true;
        }

        if (pecuaria == 1 && agricultura == 0) {
            //  alert("Pecuaria");
            atributo_geral = "Actividade: Pecuaria";
        } else if (pecuaria == 0 && agricultura == 1) {
            atributo_geral = " Actividade: Agricultor";
            //alert("Agricultor");
        } else if (pecuaria == 1 && agricultura == 1) {
            atributo_geral = "Actividade: Agro-Pecuaria";
            //alert("Agro-Pecuaria");
        } else {
            atributo_geral = "Não é Um Agricultr(a)";
        }





        //   iserir_agricultura(); //   adicionaracontactoAgricultor();
        //  adicionarAgricultor();

        // alert($("#id_morada option:selected").val());
        /*
                var id_cultuta = $("#cultura_0 option:selected").val(),
                    id_especie = $("#idespecie_0 option:selected").val();

                var fileContents = $("#resultdrive").val();
                //   alert(fileContents)
                //   alert("cultra" + id_cultuta + " especie " + id_especie)
                var atributo = "";
                if (id_cultuta !== "-1" && id_especie !== "-1") {
                    atributo = "Actividae - Agro-Pecuaria";
                    // alert("Agro-Pecuaria " + atributo)
                } else if (id_cultuta !== "-1") {
                    atributo = "Actividae - Agricultor";
                    // alert("Agricultor aqui " + atributo)
                } else if (id_especie !== "-1") {
                    atributo = "Actividae - Pecuaria";
                    // alert("pecuaria aqui " + atributo)
                }*/
        //  alert($("#actor_bi").val())
        var fileContents = $("#resultdrive").val();
        $("#codigocartao").html("<img src='img/loader.gif'/>").load("ajax/agricultor/conut.php", "", function() {});
        var bi = "BI: " + $("#actor_bi").val(),
            //  nif = "NIF: " + $("#actor_nif").val(),
            actor_datanas = "Data Nascimento: " + $("#actor_datanas").val(),
            nome_car = $("#actor_nomecompleto").val();

        //     alert("nome"+$("#actor_nomecompleto").val());
        $("#monecartao").html(nome_car);
        //    $("#idatributo").val(atributo);
        $("#bicartao").html(bi);
        $("#atributo_id").html(atributo_geral);
        $("#datanascimento").html(actor_datanas);
        $("#id_foto").html("<img src='data:image/jpeg;base64" + fileContents + "'width='135' height='135'/>");
        var morada = "Morada: " + $("#id_morada option:selected").text();

        $("#id_moradaact").html(morada);
    });

    $("#testecuminidadeid").html("<img src='img/loader.gif'/>").load("ajax/agricultor/actualizarcuminidade.php", "", function() {});




    $(".actions a[href$='#previous']").click(function() {
        //alert("anterior");
    });

    $(".actions a[href$='#finish']").click(function() {

        var macho = $("#nmacho_0").val();
        var femia = $("#nfemia_0").val();
        var parc = $("#idparcela_0").val();
        var titilos = $("#idtitulo_0").val();
        // alert("finish")
        // iserir_agricultura();
        //  border:0px solid green;width:259px;position:relative;left:7px
        //  teste_porque();
        var biid = $("#actor_bi").val();
        //    alert(biid)
        //  adicionaracontactoAgricultor();

        //adicionarAgricultor();
        procesorteio();


        if (parc == "" || titilos == "") {
            alert("não inserir agricultura");
        } else {
            // alert("inserir agricultura");
            iserir_agricultura();

        }



        if (macho == "" || femia == "") {
            //  alert("não inserir pecuaria");
        } else {
            alert(" inserir pecuaria");
            iserir_pecuaria();
        }


    });




    //smsm//
    $("#processamentosms").dialog({
        autoOpen: false,
        resizable: false,
        show: "clip",
        hide: "clip",
        width: "270",
        height: "239",
        modal: true,
        closeOnEscape: true,
        buttons: {
            "Ver Cartão": function() {
                $(this).dialog("close");
                //  $("#noticiaContent").html("<img src='images/preloader-01.gif'/>").load("ajax/sorteio/view.php", "", function() {});
                //setTimeout(function() {
                id_cart_agri = $("#idcartao_agricultor").val();
                if (id_cart_agri == "") {

                } else {
                    window.open("cartao.php?id=" + id_cart_agri, '_blank');
                }


                // }, 2000);
                document.location.reload(true);
            }

        },
        close: function() {
            // $("#noticiaContent").html("<img src='images/preloader-01.gif' />").load("ajax/sorteio/view.php", "", function() {});
            //$(this).dialog("close");
            //$("#noticiaContent").html("<img src='images/preloader-01.gif' />").load("ajax/sorteio/view.php", "", function () {});
            id_cart_agri = $("#idcartao_agricultor").val();
            if (id_cart_agri == "") {

            } else {
                window.open("cartao.php?id=" + id_cart_agri, '_blank');
            }

        }
    });
    //.add(nucar).add(recibobanco);


    $("#adicionarprojecto").dialog({
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
                //var bValid = true,
                //	tips = $("#adicionarDistritoState");
                //allFields.removeClass("ui-state-error");
                //bValid = bValid && checkLength(nameDistritoToInsert, "nome do parametro", 3, 50, tips);
                //	if (bValid) {
                //adicionarDistritoAsync();
                //	}
                adicionarAsyncdoc();
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



    // addtipoagricultura
    $("#adicionartipocultura").dialog({
        autoOpen: false,
        resizable: true,
        show: "clip",
        hide: "clip",
        width: "340px",
        modal: true,
        closeOnEscape: true,
        buttons: {
            "Cancelar": function() {
                // alert(outroidcultura)
                $("#cultura_" + outroidcultura).html("<img src='img/loader.gif'/>").load("ajax/selection/option.php", "tipo=cultura&base=yes&idculturatipo=" + outroidcultura, function() {});

                $(this).dialog("close");

            },
            "Adicionar": function() {

                //        alert($("#nomeagricultura").val())

                var nome_tipo = $("#nomeagricultura").val();

                if (nome_tipo == "") {
                    $("#adicionarStatetipo_cultura").html("<p style='color:red'>Por favor digite o nome do Tipo de Cultura</p>");
                } else {
                    adicionartipocultura();
                }



                //var bValid = true,
                //	tips = $("#adicionarDistritoState");
                //allFields.removeClass("ui-state-error");
                //bValid = bValid && checkLength(nameDistritoToInsert, "nome do parametro", 3, 50, tips);
                //	if (bValid) {
                //adicionarDistritoAsync();
                //	}
                //  adicionarAsyncdoc();


            }
        },
        close: function() {
            // allFields.val("").removeClass("ui-state-error");
            //$("#adicionar").tooltip("close");
            $("#adicionarStatetipo_cultura").html("");
            // $("#adicionarState").removeClass("ui-state-error");
            //$("#resultados_processados").html("<img src='img/loader.gif'/>").load("ajax/factura/view.php", "", function() {});
        }
    });
    //fim tipoagricultura

    //inicio imagem/pdf
    $("#idadicionarimagem_doc").dialog({
        autoOpen: false,
        resizable: true,
        show: "clip",
        hide: "clip",
        width: "300px",
        modal: true,
        closeOnEscape: true,
        buttons: {
            "Cancelar": function() {
                // alert(outroidcultura)
                $("#cultura_" + outroidcultura).html("<img src='img/loader.gif'/>").load("ajax/selection/option.php", "tipo=cultura&base=yes&idculturatipo=" + outroidcultura, function() {});

                $(this).dialog("close");

            }
        },
        close: function() {
            // allFields.val("").removeClass("ui-state-error");
            //$("#adicionar").tooltip("close");
            $("#adicionarStatetipo_cultura").html("");
            // $("#adicionarState").removeClass("ui-state-error");
            //$("#resultados_processados").html("<img src='img/loader.gif'/>").load("ajax/factura/view.php", "", function() {});
        }
    });







    //fim imagem/pdf







    //cultivo
    $("#idadicionarcultivo").dialog({
        autoOpen: false,
        resizable: true,
        show: "clip",
        hide: "clip",
        width: "340px",
        modal: true,
        closeOnEscape: true,
        buttons: {
            "Cancelar": function() {
                //alert(outroidcultura)
                // $("#cultura_" + outroidcultura).html("<img src='img/loader.gif'/>").load("ajax/selection/option.php", "tipo=cultura&base=yes&idculturatipo=" + outroidcultura, function() {});
                $(this).dialog("close");
            },
            "Adicionar": function() {
                //alert("aqui" + $("#cultivo_id").val())
                var nome = $("#cultivo_id").val();
                if (nome == "") {
                    $("#adicionarStatecultivo").html("<p style='color:red'>Por favor digite o nome do  Cultivo</p>");
                } else {
                    adicionaridadicionarcultivo();
                }
                //var bValid = true,
                //	tips = $("#adicionarDistritoState");
                //allFields.removeClass("ui-state-error");
                //bValid = bValid && checkLength(nameDistritoToInsert, "nome do parametro", 3, 50, tips);
                //	if (bValid) {
                //adicionarDistritoAsync();
                //	}
                //  adicionarAsyncdoc();
            }
        },
        close: function() {
            // allFields.val("").removeClass("ui-state-error");
            //$("#adicionar").tooltip("close");
            $("#adicionarStatetipo_cultura").html("");
            // $("#adicionarState").removeClass("ui-state-error");
            //$("#resultados_processados").html("<img src='img/loader.gif'/>").load("ajax/factura/view.php", "", function() {});
        }
    });
    //fim cultivo



    //inicio
    //cultivo
    $("#addespecie").dialog({
        autoOpen: false,
        resizable: true,
        show: "clip",
        hide: "clip",
        width: "340px",
        modal: true,
        closeOnEscape: true,
        buttons: {
            "Cancelar": function() {
                //alert(outroidcultura)
                // $("#cultura_" + outroidcultura).html("<img src='img/loader.gif'/>").load("ajax/selection/option.php", "tipo=cultura&base=yes&idculturatipo=" + outroidcultura, function() {});
                $(this).dialog("close");
            },
            "Adicionar": function() {
                //    alert($("#especie_id").val())
                var especie_id = $("#especie_id").val();
                if (especie_id == "") {
                    $("#adicionarStateespecie").html("<p style='color:red'>Por favor digite o nome da especie</p>");
                } else {
                    adicionaridadicionarespecie();
                }
                //var bValid = true,
                //	tips = $("#adicionarDistritoState");
                //allFields.removeClass("ui-state-error");
                //bValid = bValid && checkLength(nameDistritoToInsert, "nome do parametro", 3, 50, tips);
                //	if (bValid) {
                //adicionarDistritoAsync();
                //	}
                //  adicionarAsyncdoc();
            }
        },
        close: function() {
            // allFields.val("").removeClass("ui-state-error");
            //$("#adicionar").tooltip("close");
            $("#adicionarStateespecie").html("");
            // $("#adicionarState").removeClass("ui-state-error");
            //$("#resultados_processados").html("<img src='img/loader.gif'/>").load("ajax/factura/view.php", "", function() {});
        }
    });
    //fim cultivo




    //fim
    $("#iddistritocominidade").html("<img src='img/preloader-01.gif' />").load("ajax/selection/option.php", "tipo=distrito&base=yes", function() {});
    $("#iddistritocominidadeaddagricultor").html("<img src='img/preloader-01.gif' />").load("ajax/selection/option.php", "tipo=distrito&base=yes", function() {});
    $("#idespecie_0").html("<img src='img/loader.gif' />").load("ajax/selection/option.php", "tipo=especie&base=no&idpercuari_=0", function() {});
    $("#cultura_0").html("<img src='img/loader.gif' />").load("ajax/selection/option.php", "tipo=cultura&base=yes&idculturatipo=0", function() {});
    $("#tipoatividadeid").html("<img src='img/loader.gif' />").load("ajax/selection/option.php", "tipo=tipo_atividade&base=no", function() {});
    $("#actor_sexo").html("<img src='img/loader.gif' />").load("ajax/selection/option.php", "tipo=sexo&base=yes", function() {});
    //comunidade
    $("#adicionarcominidade").dialog({
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
                //  alert(id_tabela)
                $("#comunidade_" + id_tabela + "").html("<img src='img/loader.gif'/>").load("ajax/agricultor/so_comunidade.php", "id=" + id_tabela + "&tipo=c", function() {});

                $(this).dialog("close");

            },
            "Adicionar": function() {

                var bValid = true,
                    tips = $("#adicionarStatecominidadeaddagricultor");
                allFields.removeClass("ui-state-error");
                var idcomunidade = $("#iddistritocominidadeaddagricultor option:selected").val();
                //alert(idcomunidade)
                if (nomeccomunidadeaddagricultor.val() == "") {
                    tips.html("O nome do Distrito não deve ser em branco. ");
                    nomeccomunidadeaddagricultor.addClass("ui-state-error");
                    nomeccomunidadeaddagricultor.focus();
                    bValid = false;

                } else if (idcomunidade == -1) {
                    tips.html("<p style='color:red'>Selecione um nome do Distrito por favor.</p>");
                    bValid = false;
                }
                //bValid = bValid && checkLength(nameDistritoToInsert, "nome do parametro", 3, 50, tips);
                if (bValid) {
                    adicionarAsyncactividaagricultor();
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

    //fim 

    //   $("#id_morada").html("<img src='img/loader.gif'/>").load("ajax/selection/option.php", "tipo=cuminidadelist&base=yes&cumi=yes&idcomu=id_morada", function() {});







});

function criarabertura(id) {
    // alert(id);
    var numerocarta = $("#numerocarta").val(),
        controliid = $("#controloid").val(),
        nif = $("#" + id + "nif").val(),
        mone = $("#" + id + "nome").val(),
        apelido = $("#" + id + "apelido").val(),
        //  mumerocarta = $("#" + id + "nif").val();
        nomecom = mone + " " + apelido;
    $("#idToInsert").val(id);
    $("#nif").val(nif);
    $("#mumerocarta").val(numerocarta);
    $("#mumerocontroloid").val(controliid);
    $("#nome").val(nomecom);
    $("#facturaToInsert").html("<img src='img/loader.gif'/>").load("ajax/factura/numero.php", "", function() {});
    $("#adicionarabertura").dialog("open");

}



function canlcelarx() {
    $("#adicionarDialogo").dialog("close");
}

function abririmgem_pdf(id) {
    // alert(id)
    // $("#idadicionarimagem_doc").dialog("open");
    window.addEventListener("load", function() {
        document.getElementById("file-upload").onchange = function(event) {
            var reader = new FileReader();
            reader.readAsDataURL(event.srcElement.files[0]);

            var me = this;
            //alert(me)
            reader.onload = function() {
                //	alert(reader.result)
                var fileContent = reader.result;
                //console.log(fileContent);
                var str = fileContent;
                //valor final base64 
                //var res = str.slice(27);
                //	$("#idfotoinsert").val(fileContent)
                $("#resultdrive").val(fileContent);
                $("#result").html("<img src='data:image/jpeg;base64" + fileContent + "'width='150' height='150'/>");

                //	alert("sdfgsg"+fileContent)
            }
        }
    });




}

function adicionardocumento() {
    $("#adicionarprojecto").dialog("open");
}

function testepdf() {
    var files = document.getElementById('file-doc').files;
    if (files.length > 0) {
        getBase64(files[0]);
        //  alert(files[0])
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

function tipoactividade() {
    var tipo = $("#tipoatividadeid option:selected").val();
    //alert("actividade " + tipo)

    if (tipo == "1") {
        $("#agricultura").show();
        $("#pecuaria").hide();
        $("#agropecuaria").hide();
    } else if (tipo == "2") {
        $("#pecuaria").show();
        $("#agricultura").hide();
        $("#agropecuaria").hide();
    } else if (tipo == "3") {
        $("#agropecuaria").show();
        $("#agricultura").hide();
        $("#pecuaria").hide();
    }
    //  alert(incrementopercuaria)
    $("#idespecie_0").html("<img src='img/loader.gif' />").load("ajax/selection/option.php", "tipo=especie&base=no&incrementoper=" + incrementopercuaria, function() {});
    incrementopercuaria++;

}

function listatipocultura(id) {
    alert(id);
    idgeral_ig = id;
    var tipo = $("#" + id + " option:selected").val();
    var result = id.split('_');
    var idcul = result[1];
    //   alert("aqui " + result[1])
    globar_id = idcul;

    if (tipo == -2) {
        $("#texte_id_" + result[1]).hide();
        $("#adicionartipocultura").dialog("open");

    } else if (tipo == -1) {
        $("#texte_id_" + result[1]).hide();
        $("#tipocultura" + result[1]).html("<img src='img/loader.gif' />").load("ajax/selection/option.php", "tipo=tipocultura&base=no&idtipo=" + tipo + "&idtpocultura=" + idcul + "&incremento=" + incremento, function() {});

    } else {
        $("#tipocultura" + result[1]).html("<img src='img/loader.gif' />").load("ajax/selection/option.php", "tipo=tipocultura&base=no&idtipo=" + tipo + "&idtpocultura=" + idcul + "&incremento=" + incremento, function() {});
        incremento++;
        //  alert(" incremento pos " + incremento);
        $("#texte_id_" + result[1]).show();
    }

    // alert("incremento " + incremento);
    //  alert("idcul" + idcul);
    //   alert(" pre incremento  " + incremento);

}

function add_idadicionarcultivo() {
    $("#idadicionarcultivo").dialog("open");
}





var a = 0;

function add_tr() {
    /*
     <tr class="cabecalho" style="text-align: center;">
                                                            <td class="cabecalho" scope="col">
                                                                <select name="select_this" id="idsexofeminino" class="bor form-control">
                                                                    <?php
                                                                    for ($i = 1; $i <= 10; $i++) {
                                                                        echo "<option value='" . $i . "'>" . $i . " </option>";
                                                                    }
                                                                    ?>
                                                                </select></td>
                                                            <td class="cabecalho" scope="col">
                                                                <input type="text" class=" bor form-control">

                                                            </td>
                                                            <td class="cabecalho" scope="col">
                                                                <div id="cultura"></div>
                                                            </td>
                                                            <td class="cabecalho" scope="col">
                                                                <div id="tipocultura"> <input class="bor form-control" disabled /></div>
                                                            </td>
                                                            <td class="cabecalho" scope="col"><input type="date" class="bor form-control" /></td>
                                                            <td class="cabecalho" scope="col"> <input type="text" class="bor form-control" value="<?php echo "" . $comunidade ?>" disabled /></td>

                                                        </tr>


    */
    a++;
    //var id_tr = "tr_" + a;
    var id_tr = a;
    var id_n_tr = "n_tr_" + a;

    $('#tbody_dados').append('  <tr id="tr_' + id_tr + '">' +
        '<td id="' + id_n_tr + '" width="60px"><input type="text" class=" bor form-control" id="idparcela_' + id_tr + '"></td>' +
        '<td id="' + id_n_tr + '" width="60px"><input type="text" class=" bor form-control" id="idtitulo_' + id_tr + '"></td>' +
        ' <td class="cabecalho"><select name="select_this" id="idestrutura_' + id_tr + '" class="bor form-control"><option value="Individual">Individual</option><option value="Colectivo">Colectivo</option></select> </td>' +
        '  <td width="90px"><input type="text" id="idha_' + a + '" class="bor form-control"></td>' +
        '<td class="cabecalho" scope="col" width="30px"><input class="form-control" style="width:82px" type="file" id="idfiledoc"   name="" onchange="convertToBase64_id(' + id_tr + ')"><div style="display:none;" ><textarea id="iddoctexte_' + id_tr + '" style="display:block;width:82px"></textarea></div></td>' +
        '<td> <div id="cultura_' + id_tr + '" ></div>  </td>' +
        '<td class="cabecalho" scope="col"> <div id="tipocultura' + a + '"    style="border:0px solid;background:transparent;" > </div></td>' +
        '<td  style="border:0px"><a   href="javascript:add_idadicionarcultivo()" id="texte_id_' + a + '"><span ><img src="img/addiconar.png" alt="Smiley face" height=30 width=30></span></a></td>' +
        '<td ><input  id="iddata_' + id_tr + '" type="date" class=" bor form-control" ></td>' +
        '<td><div id="comunidade_' + id_tr + '" ></div>    </td>' +
        '<td style="cursor: pointer;text-align: center;">' +
        '<a class="" id="dell_' + a + '" onclick="del_tr(this);">' +
        '<span class=""><img src="img/iconelinar.png" alt="Smiley face" height="42" width="42"></span>' +
        ' </a> </td>  </tr>');
    // alert("tipo cul" + a)
    $("#total_idtable").val(a);
    outroidcultura = id_tr;
    carregarcuminidad(id_tr);
    // alert(id_tr)





}

function del_tr(elem) {
    //   a--;
    elem = elem.id;
    elem = elem.replace('dell_', '');
    $("#tr_" + elem).remove();
    //  $("#total_idtable").val(a);
    //   alert(elem)
    //   recontar_tr(elem);
}

function recontar_tr(elem) {
    var num = elem * 1;
    for (var i = 1; i <= a; i++) {
        var id_n_tr = "#n_tr_" + i;
        if (i > num) {
            $('#input_tr_' + i).val('tr_' + (i - 1));
            $('#input_tr_' + i).prop('id', 'input_tr_' + (i - 1));
            $('#tr_' + i).prop('id', 'tr_' + (i - 1));
            $("" + id_n_tr).html("" + (i - 1));
            $("#n_tr_" + i).prop('id', 'n_tr_' + (i - 1));
            $("#dell_" + i).prop('id', 'dell_' + (i - 1));
            $("#a" + i).prop('id', 'a' + (i - 1));
            $("#b" + i).prop('id', 'b' + (i - 1));
            $("#c" + i).prop('id', 'c' + (i - 1));
            $("#d" + i).prop('id', 'd' + (i - 1));
        }
    }
    a = a - 1;
}



function carregarcuminidad(id) {

    // var cultura = "cultura" + id;
    //  alert("id " + id)
    id_tabela = id;
    $("#comunidade_" + id + "").html("<img src='img/loader.gif'/>").load("ajax/agricultor/so_comunidade.php", "id=" + id + "&tipo=c", function() {});
    // $("#idtr" + id + "").html("<img src='img/loader.gif'/>").load("ajax/agricultor/parcela.php?id=" + id, "", function() {});
    $("#cultura_" + id).html("<img src='img/loader.gif'/>").load("ajax/selection/option.php", "tipo=cultura&base=yes&idculturatipo=" + id, function() {});
    // $("#idreceber").val(id)
    $("#texte_id_" + id).hide();
}




function carregarespecie(id) {
    //  alert(id)

    $("#idespecie_" + id + "").html("<img src='img/loader.gif' />").load("ajax/selection/option.php", "tipo=especie&base=no&idespecie=" + id + "&incrementoper=" + incrementopercuaria, function() {});
    //$("#per_comunidade_" + id + "").html("<img src='img/loader.gif'/>").load("ajax/selection/option.php", "tipo=cuminidadelist&base=yes&cumi=yes&idcomu=" + id, function() {});
    $("#per_comunidade_" + id + "").html("<img src='img/loader.gif'/>").load("ajax/agricultor/so_pecuaria.php", "id=" + id, function() {});
    incrementopercuaria++;

}



function maiscomunidade(id) {
    // alert("aqui")
    rec_comunidade = id;
    var cumin = $("#" + id + " option:selected").val();
    //  alert(id)
    var result = id.split('');
    // alert("longi" + rec_comunidade.length);

    if (rec_comunidade.length <= 14) {
        id_tabela = result[13];
    } else {
        id_tabela = result[13] + "" + result[14];
    }
    //  var t = result[13] + "" + result[14];
    // alert(id_tabela)

    if (cumin == -2) {
        //  alert("entrei aqui")
        $("#adicionarcominidade").dialog("open");
    }
}






function add_trpecuaria() {
    b++;
    //var id_tr = "tr_" + a;
    var id_tr = b;
    var id_n_tr = "n_tr_" + b;

    $('#tbody_pecuaria').append('  <tr id="tr_' + id_tr + '">' +
        '<td id="' + id_n_tr + '"> <div id="idespecie_' + id_tr + '" ></div></td>' +
        ' <td  style="border:0px"><a   href="javascript:add_especie(' + id_tr + ')" ><span ><img src="img/addiconar.png" alt="Smiley face" height=30 width=30></span></a></td>' +
        '  <td style="width:"1290px""><input type="text" id="nfemia_' + b + '" class="bor form-control"></td>' +
        '<td ><input type="text" id="nmacho_' + b + '" class="bor form-control"> </td>' +
        '<td width="90px"><input  id="data_id_' + id_tr + '" type="date" class=" bor form-control" > </td>' +
        '<td> <div id="per_comunidade_' + id_tr + '" ></div>  </td>' +
        '<td style="cursor: pointer;text-align: center;">' +
        '<a class="btn-default" id="dell_' + b + '" onclick="del_tr(this);">' +
        '<span class=""><img src="img/iconelinar.png" alt="Smiley face" height="42" width="42"></span>' +
        ' </a> </td>  </tr>');
    // alert(" " + id_tr)

    $("#total_percuaria").val(id_tr);

    carregarespecie(id_tr);



}


function tipoespecie(id) {
    var result = id.split('_');
    var especie = $("#idespecie_" + result[1] + " option:selected").val();


    //   alert(especie);
}

function adicionaracontactoAgricultor() {

    $.post("ajax/agricultor/insert_contacto.php", {
            // id_distrito: $("#iddistritocominidade option:selected").val(),
            telefone_actor: $("#telefone_actor").val(),
            telefoneall_actor: $("#telefoneall_actor").val(),
            actor_email: $("#actor_email").val()
        },
        function(data) {
            var result = parseInt(data.text);
            //    alert("contacto " + result)
            if (result > 0) {
                // $("#adicionarStatecominidade").html("<p>Os seus dados foram adicionados com êxito!</p>");
                // alert(result)
                // adicionarAgricultor();
                /*
                 setTimeout(function() {

                     $("#adicionarcominidade").dialog("close");
                     $("#adicionarStatecominidade").html("");
                     $("#adicionarStatecominidade").removeClass("ui-state-error");
                     //var result = rec_comunidade.split('_');
                     // $("#resultadodalista").html("<img src='img/loader.gif'/>").load("ajax/cuminidade/view.php", "", function() {});
                     //$("#resultados").html("<img src='img/loader.gif'/>").load("ajax/factura/view.php", "", function () {});
                     //window.open("ajax/factura/print.php?idfatura=" + fac + "&nome=" +
                     //	nomecome + "&nif=" + nif + "&nrecibo=" + recibobanco + "&nc=" + numerocarta,
                     //	"_blank ");

                     $("#comunidade_" + idresult + "").html("<img src='img/loader.gif'/>").load("ajax/selection/option.php", "tipo=cuminidadelist&base=yes&cumi=yes&idcomu=" + result[1], function() {});

                     $("#adicionarcominidade").dialog('option', 'buttons', {
                         "Cancelar": function() {
                             $(this).dialog("close");
                         },
                         "Adicionar": function() {
                             var bValid = true,
                                 tips = $("#adicionarStatecominidade");
                             //	recibobanco = $("#nrecibo");
                             // allFields.removeClass("ui-state-error");

                         }
                     });
                 }, 1000);*/
            } else {
                //  $("#adicionarStatecominidade").addClass("ui-state-error");
                //$("#adicionarStatecominidade").html("<p>Registro dos dados falhada!</p>");
            }
        }, "json");
}

function adicionarAgricultor() {
    //   alert($("#habilitacao option:selected").text());
    //   $("#sms_agricultor").html("<img src='img/loader.gif'/>");
    $.post("ajax/agricultor/insert.php", {
            actor_sexo: $("#actor_sexo option:selected").val(),
            habilitacao: $("#habilitacao option:selected").text(),
            id_morada: $("#id_morada option:selected").val(),
            actor_nomecompleto: $("#actor_nomecompleto").val(),
            actor_bi: $("#actor_bi").val(),
            actor_nif: $("#actor_nif").val(),
            actor_datanas: $("#actor_datanas").val(),
            foto: $("#resultdrive").val()
        },
        function(data) {
            var result = parseInt(data.text);
            // alert("agricultor " + result)
            $("#idcartao_agricultor").val(result);
            if (result > 0) {
                // $("#adicionarStatecominidade").html("<p>Os seus dados foram adicionados com êxito!</p>");
                //   alert("result " + result)

                //   window.location.href = 'cartao.php';

                //   $("#sms_agricultor").html("<p style='font-size:18px '><b>  O Agricultor foi registrado com êxito. </b>    <img src='img/person_su.png' width=90 height=90 style='position: relative;top: -15px;'/></p>");




                //     window.open('cartao.php?id=' + result, '_blank');

                /*
                 setTimeout(function() {

                     $("#adicionarcominidade").dialog("close");
                     $("#adicionarStatecominidade").html("");
                     $("#adicionarStatecominidade").removeClass("ui-state-error");
                     //var result = rec_comunidade.split('_');
                     // $("#resultadodalista").html("<img src='img/loader.gif'/>").load("ajax/cuminidade/view.php", "", function() {});
                     //$("#resultados").html("<img src='img/loader.gif'/>").load("ajax/factura/view.php", "", function () {});
                     //window.open("ajax/factura/print.php?idfatura=" + fac + "&nome=" +
                     //	nomecome + "&nif=" + nif + "&nrecibo=" + recibobanco + "&nc=" + numerocarta,
                     //	"_blank ");

                     $("#comunidade_" + idresult + "").html("<img src='img/loader.gif'/>").load("ajax/selection/option.php", "tipo=cuminidadelist&base=yes&cumi=yes&idcomu=" + result[1], function() {});

                     $("#adicionarcominidade").dialog('option', 'buttons', {
                         "Cancelar": function() {
                             $(this).dialog("close");
                         },
                         "Adicionar": function() {
                             var bValid = true,
                                 tips = $("#adicionarStatecominidade");
                             //	recibobanco = $("#nrecibo");
                             // allFields.removeClass("ui-state-error");

                         }
                     });
                 }, 1000);*/
            } else {
                //  $("#adicionarStatecominidade").addClass("ui-state-error");
                //$("#adicionarStatecominidade").html("<p>Registro dos dados falhada!</p>");

                $("#sms_agricultor").html("<p style='font-size:18px '><b> Registro dos dados falhada!</b> ");
            }
        }, "json");
}




function iserir_agricultura() {
    index = 0;
    var valorcomunidade = 0;
    var tatal = $("#total_idtable").val();
    //   $("#arryid").val("");
    //$("#sms_actividade").html("<img src='img/loader.gif'/>");
    // for (index = 0; index <= tatal; index++) {
    var tgeral = 0;
    tgeral = parseInt(tatal) + 1;
    // alert($("#actor_bi").val())
    //alert("total geral " + tgeral)
    while (index < tgeral) {
        // alert("Actividade " + tgeral + " Linha " + index);
        var idparcela = $("#idparcela_" + index).val();
        if (typeof idparcela === 'undefined') {
            //   index++;
        } else {
            if (index == 0) {
                valorcomunidade = $("#comunidade_0").val();
            } else {
                valorcomunidade = $("#comunidade_" + index + " option:selected").val();
            }

            //   alert("index = " + index + " tipo cultura= " + $("#tipoculturaid_id" + index).val());
            var culturadescricao = $("#tipoculturaid_id" + index).val();
            //   alert("primeiro " + culturadescricao)
            $("#arryid").val(culturadescricao);
            if (culturadescricao == "") {
                // $("#arryid").val("");
                culturadescricao = $("#tipoculturaid_id" + index).val();
                $("#arryid").val(culturadescricao);
            }
            //alert("teste " + $("#tipoculturaid_id" + index).val());
            //  alert(culturadescricao);
            $.post("ajax/agricultor/insert_actvidade.php", {
                    idparcela: $("#idparcela_" + index).val(),
                    idcultuta: $("#cultura_" + index + "  option:selected").val(),
                    ha: $("#idha_" + index).val(),
                    tipoactividade: $("#tipoatividadeid option:selected").val(),
                    dataid: $("#iddata_" + index).val(),
                    comunidade: valorcomunidade,
                    tipocultuta: $("#arryid").val(),
                    idtitulo: $("#idtitulo_" + index).val(),
                    idestrutura: $("#idestrutura_" + index).val(),
                    bi: $("#actor_bi").val(),
                    iddoctexte: $("#iddoctexte_" + index).val()
                },
                function(data) {
                    var result = parseInt(data.text);
                    // alert("actividade" + result)
                    if (result > 0) {
                        $("#imgsmsm").html("<p style='font-size:18px'><b> Os seus dados foram adicionados com êxito!</b><br><img src='img/sucess3.gif' width=60 height=60 style=''/></p>");

                        // $("#imgsmsm").html("<img src='img/preloader-01.gif'  width=100 height=80 />");
                    } else {
                        $("#imgsmsm").html("<p style='font-size:18px '><b>  Registro dos dados falhada! </b> </p>");
                    }
                }, "json");

        }
        index++;
    }
}

//  inser pecuaria //
function iserir_pecuaria() {
    var indexpecuaria = 0;
    var counniddper = 0;

    var total = $("#total_percuaria").val();

    var tgeralpecuaria = 0;
    var tgeralpecuaria = parseInt(total) + 1;
    alert("total" + tgeralpecuaria);
    //alert("total geral" + tgeralpecuaria)
    //   alert("#idpercuari_" + index + "");
    // alert("especie " + $("#idpercuari_0").val());
    //   $("#inser_percu").html("<img src='img/loader.gif'/>");
    for (indexpecuaria = 0; indexpecuaria <= tgeralpecuaria; indexpecuaria++) {



        var idespeciepecuaria = $("#idpercuari_" + indexpecuaria).val();


        //
        //    alert("especie " + $("#idespecie_" + indexpecuaria + "  option:selected").val());
        //  alert("femina " + $("#nfemia_" + indexpecuaria).val());
        // alert("macho " + $("#nmacho_" + indexpecuaria).val());
        //  alert("data " + $("#data_id_" + indexpecuaria).val());
        //     var idespecie = $("#idpercuari_" + indexpecuaria).val();
        //   alert("aqui " + $("#comunidade_" + index).val());
        //  alert("idespecie " + idespecie);
        // alert("especiedgsfdgfdg " + $("#idpercuari_" + index).val());
        if (indexpecuaria == 0) {
            counniddper = $("#percuaria_idd").val();
        } else {
            counniddper = $("#per_comunidade_" + indexpecuaria + " option:selected").val();
        }


        //    alert(" index percuaria " + indexpecuaria + " id= " + counniddper);





        if (typeof idespeciepecuaria === 'undefined') {
            // indexpecuaria++;
            //  alert(index)
            //   alert("entrei aqui undefined" + index)
        } else {
            alert(idespeciepecuaria)
            $("#arryidpercuaria").val(idespeciepecuaria);
            //   $("#percuaria_idd").val(idespecie);
            // alert("indexpecuaria" + indexpecuaria)
            // alert("o else " + $("#per_comunidade_" + indexpecuaria + "  option:selected").val())
            /*
                                    alert("entrei aqui segundo elese" + index)
                                    alert("parcela " + $("#idparcela_" + index).val());
                                    alert("idha_ " + $("#idha_" + index).val());
                                    alert("cultura " + $("#cultura_" + index + "  option:selected").val());
                                    alert("tipo cultura " + $("#tipocultura" + index + "  option:selected").val());
                                    alert("data " + $("#iddata_" + index).val());
                                    alert("comunidade " + $("#idcomunida_id" + index).val());
    
                    alert("entrei aqui else" + index)
                    alert("especie " + $("#idespecie_" + index + "  option:selected").val());
                    alert("femina " + $("#nfemia_" + index).val());
                    alert("macho " + $("#nmacho_" + index).val());
                    alert("data " + $("#data_id_" + index).val());/*
                 ;*/
            //alert("femina " + $("#nfemia_" + indexpecuaria).val());
            //alert("especie" + $("#percuaria_idd").val());
            //    alert("indexpecuaria " + indexpecuaria);
            //  alert("nmacho_ " + $("#nmacho_" + indexpecuaria).val());
            // alert("per_comunidade_ " + $("#per_comunidade_" + indexpecuaria + " option:selected").val());
            alert("bi " + $("#actor_bi").val());

            $.post("ajax/agricultor/insert_pecuaria.php", {
                    idespecie: $("#arryidpercuaria").val(),
                    nfemia: $("#nfemia_" + indexpecuaria).val(),
                    nmacho: $("#nmacho_" + indexpecuaria).val(),
                    data_id: $("#data_id_" + indexpecuaria).val(),
                    comunidade: counniddper,
                    bi: $("#actor_bi").val()
                        /*
                                actor_sexo: $("#actor_sexo option:selected").val(),
                                habilitacao: $("#habilitacao option:selected").text(),
                                id_morada: $("#id_morada option:selected").val(),
                                actor_nomecompleto: $("#actor_nomecompleto").val(),
                                actor_bi: $("#actor_bi").val(),
                                actor_nif: $("#actor_nif").val(),
                                actor_datanas: $("#actor_datanas").val(),
                                foto: $("#resultdrive").val()*/
                },
                function(data) {
                    var result = parseInt(data.text);

                    if (result > 0) {

                        //   alert(result)

                    } else {

                    }
                }, "json");

            /*
            alert("parcela " + $("#idparcela_" + index).val());
            alert("ha " + $("#idha_" + index).val());
            alert("idcultuta " + $("#cultura_" + index + "  option:selected").val())
            alert("tipo " + $("#tipocultura" + index + "  option:selected").val())
            alert("data " + $("#iddata_" + index).val());*/

        }




    }






}
/*
actor_sexo: $("#actor_sexo option:selected").val(),
habilitacao: $("#habilitacao option:selected").text(),
id_morada: $("#id_morada option:selected").val(),
actor_nomecompleto: $("#actor_nomecompleto").val(),
actor_bi: $("#actor_bi").val(),
actor_nif: $("#actor_nif").val(),
actor_datanas: $("#actor_datanas").val(),
foto: $("#resultdrive").val()
function abrircartao() {
    var foto = $("#resultdrive").val();
    //indow.open('cartao.php?f=' + foto, '_blank');
    $("").html("<img src='img/loader.gif'/>").load("cartao.php", "", function() {});
}*/

function teste_porque() {

    for (index = 0; index < 5; index++) {
        alert(index)
            //    alert(" incremento" + incremento);
        alert("" + $("#tipoculturaid_id" + index).val());
    }
    //alert("teste para tipocultivo " + $("#tipocultura0").val());
}



function adicionartipocultura() {

    //alert("globar_id " + globar_id)
    $("#adicionarStatetipo_cultura").html("<img src='img/loader.gif'/>");

    $.post("ajax/agricultor/tipo_cultura.php", {
            // id_distrito: $("#iddistritocominidade option:selected").val(),
            nomeagricultura: $("#nomeagricultura").val()
        },
        function(data) {
            var result = parseInt(data.text);
            //alert(result)
            if (result > 0) {
                $("#adicionarStatetipo_cultura").html("<img src='img/sucess3.gif' height='62' width='62' />");
                $("#cultura_" + globar_id).html("<img src='img/loader.gif' />").load("ajax/selection/option.php", "tipo=cultura&base=no&idculturatipo=" + globar_id, function() {});
                $("#tipocultura" + globar_id).html("<img src='img/loader.gif' />").load("ajax/selection/option.php", "tipo=tipocultura&base=no&idtipo=0&idtpocultura=0&incremento=0", function() {});
                $("#texte_id_" + globar_id).show();

                //sucess3.gif
                // alert(result)
                // adicionarAgricultor();

                setTimeout(function() {
                    $("#adicionarStatetipo_cultura").html("");
                    $("#nomeagricultura").val("");


                    //   $("#comunidade_" + idresult + "").html("<img src='img/loader.gif'/>").load("ajax/selection/option.php", "tipo=cuminidadelist&base=yes&cumi=yes&idcomu=" + result[1], function() {});


                }, 3000);
            } else {
                //  $("#adicionarStatecominidade").addClass("ui-state-error");
                $("#adicionarStatetipo_cultura").html("<p>Registro dos dados falhada!</p>");
            }
        }, "json");
}

//function cultura
function adicionaridadicionarcultivo() {

    //alert("idgeral_ig " + idgeral_ig);
    //alert("globar_id " + globar_id)
    var cultura_id = $("#cultura_" + globar_id + "  option:selected").val();

    //  alert(globar_id)

    $("#adicionarStatecultivo").html("<img src='img/loader.gif'/>");

    $.post("ajax/agricultor/add_cultura.php", {
            id: cultura_id,
            cultivo_id: $("#cultivo_id").val()
        },
        function(data) {
            var result = parseInt(data.text);
            //    alert(result)
            if (result > 0) {
                $("#adicionarStatecultivo").html("<img src='img/sucess3.gif' height='62' width='62' />"); //tipo=tipocultura&base=no&idtipo=" + tipo + "&idtpocultura=" + idcul + "&incremento=" + incremento,
                $("#tipocultura" + globar_id).html("<img src='img/loader.gif' />").load("ajax/selection/option.php", "tipo=tipocultura&base=no&idtipo=" + cultura_id + "&idtpocultura=" + cultura_id + "&incremento=" + globar_id, function() {});
                setTimeout(function() {
                    $("#adicionarStatecultivo").html("");
                    $("#cultivo_id").val("");
                }, 1000);
            } else {
                //  $("#adicionarStatecominidade").addClass("ui-state-error");
                $("#adicionarStatecultivo").html("<p>Registro dos dados falhada!</p>");
            }
        }, "json");
}

function add_especie(id) {

    globar_especie = id;
    $("#addespecie").dialog("open");
}

function adicionaridadicionarespecie() {
    //alert(globar_especie)

    $("#adicionarStateespecie").html("<img src='img/loader.gif'/>");

    $.post("ajax/agricultor/add_especie.php", {

            especie_id: $("#especie_id").val()
        },
        function(data) {
            var result = parseInt(data.text);
            // alert(result)
            if (result > 0) {
                $("#adicionarStateespecie").html("<img src='img/sucess3.gif' height='62' width='62' />"); //tipo=tipocultura&base=no&idtipo=" + tipo + "&idtpocultura=" + idcul + "&incremento=" + incremento,
                //   $("#tipocultura" + globar_id).html("<img src='img/loader.gif' />").load("ajax/selection/option.php", "tipo=tipocultura&base=no&idtipo=" + cultura_id + "&idtpocultura=" + cultura_id + "&incremento=" + cultura_id, function() {});
                $("#idespecie_" + globar_especie + "").html("<img src='img/loader.gif' />").load("ajax/selection/option.php", "tipo=especie&base=no&idespecie=" + globar_especie + "&incrementoper=" + globar_especie, function() {});
                imcri++;
                setTimeout(function() {
                    $("#adicionarStateespecie").html("");
                    $("#especie_id").val("");
                }, 1000);
            } else {
                //  $("#adicionarStatecominidade").addClass("ui-state-error");
                $("#adicionarStateespecie").html("<p>Registro dos dados falhada!</p>");
            }
        }, "json");
}






function adicionarAsyncactividaagricultor() {
    var idtot = 0;
    $("#adicionarStatecominidadeaddagricultor").html("<img src='img/loader.gif'/>");
    var result = rec_comunidade.split('_');
    var idresult = "" + result[1];
    //    alert(idresult);
    ser = idresult.split('');
    if (idresult.length <= 3) {
        idtot = ser[2];

    } else {
        idtot = ser[2] + "" + ser[3];
    }
    //var ser = idresult.split('');
    //alert(idtot);



    //alert("aqui dentro")


    //  var iddoctexte = $("#iddoctexte").val(),
    //  var iddistritocominidade = $("#iddistritocominidadeaddagricultor option:selected").val();
    //alert(iddistritocominidade);

    $.post("ajax/cuminidade/insert.php", {


            descricao: $("#nomeccomunidadeaddagricultor").val(),
            id_distrito: $("#iddistritocominidadeaddagricultor option:selected").val(),
            latitude: "",
            longitude: "",
            altitude: "",
            tem_med: "",
            per_media: "",
            resultdrive: ""
        },
        function(data) {
            var result = parseInt(data.text);
            //   alert(result)


            if (result > 0) {
                $("#adicionarStatecominidadeaddagricultor").html("<p>Os seus dados foram adicionados com êxito!</p>");
                $("#comunidade_" + idtot + "").html("<img src='img/loader.gif'/>").load("ajax/agricultor/so_comunidade.php", "id=" + idtot + "&tipo=c", function() {});

                // $("#result").html("");
                $("#adicionarcominidade").dialog('option', 'buttons', {
                    'Fechar': function() {
                        $("#adicionarcominidade").dialog("close");
                        $("#adicionarStatedocumento").html("");
                        $("#comunidade_" + idtot + "").html("<img src='img/loader.gif'/>").load("ajax/agricultor/so_comunidade.php", "id=" + idtot + "&tipo=c", function() {});



                    }
                });
                setTimeout(function() {

                    $("#adicionarcominidade").dialog("close");
                    $("#adicionarStatecominidadeaddagricultor").html("");
                    $("#comunidade_" + idtot + "").html("<img src='img/loader.gif'/>").load("ajax/agricultor/so_comunidade.php", "id=" + idtot + "&tipo=c", function() {});

                    //   $("#adicionarStatecominidade").removeClass("ui-state-error");

                    //  $("#resultadodalista").html("<img src='img/loader.gif'/>").load("ajax/cuminidade/view.php", "", function() {});
                    //$("#resultados").html("<img src='img/loader.gif'/>").load("ajax/factura/view.php", "", function () {});
                    //window.open("ajax/factura/print.php?idfatura=" + fac + "&nome=" +
                    //	nomecome + "&nif=" + nif + "&nrecibo=" + recibobanco + "&nc=" + numerocarta,
                    //	"_blank ");
                    $("#adicionarcominidade").dialog('option', 'buttons', {
                        "Cancelar": function() {
                            $(this).dialog("close");

                        },
                        "Adicionar": function() {
                            var bValid = true,
                                tips = $("#adicionarStatecominidadeaddagricultor");
                            //  allFields.removeClass("ui-state-error");
                            var idcomunidade = $("#iddistritocominidadeaddagricultor option:selected").val();
                            var nomeccomunidade = $("#nomeccomunidadeaddagricultor");
                            //alert(idcomunidade)
                            if (nomeccomunidade.val() == "") {
                                tips.html("O nome  não deve ser em branco.");
                                nomeccomunidade.addClass("ui-state-error");
                                nomeccomunidade.focus();
                                bValid = false;

                            } else if (idcomunidade == -1) {
                                tips.html("<p style='color:red'>Selecione um nome do Distrito por favor.</p>");
                                bValid = false;
                            }
                            //bValid = bValid && checkLength(nameDistritoToInsert, "nome do parametro", 3, 50, tips);
                            if (bValid) {
                                adicionarAsyncactividaagricultor();
                            }

                        }
                    });
                }, 1000);
            } else {
                // $("#adicionarStatecominidade").addClass("ui-state-error");
                $("#adicionarStatecominidadeaddagricultor").html("<p>Registro dos dados falhada!</p>");
            }
        }, "json");
}




function procesorteio() {
    $("#processamentosms").dialog("open");

    //  setTimeout(function() {
    // document.location.reload(true);
    $("#imgsmsm").html("<img src='img/preloader-01.gif'");

    // }, 1500);


    //$("#li").html("<img src='images/preloader-01.gif' />").load("ajax/sorteio/sorteio.php", "", function () {});
}

function seleteimgem_pdf() {
    var imgem_pdf = $("#imgem_pdf option:selected").val();

}



function convertToBase64() {
    //Read File
    var selectedFile = document.getElementById("idfiledoc").files;
    //Check File is not Empty
    if (selectedFile.length > 0) {
        // Select the very first file from list
        var fileToLoad = selectedFile[0];
        //alert(fileToLoad)
        // FileReader function for read the file.
        var fileReader = new FileReader();
        var base64;
        // Onload of file read the file content
        fileReader.onload = function(fileLoadedEvent) {
            base64 = fileLoadedEvent.target.result;
            // Print data in console
            console.log(base64);

            $("#iddoctexte_0").val(base64);
        };
        // Convert data to base64
        fileReader.readAsDataURL(fileToLoad);
    }
}

function convertToBase64_id(id) {
    //Read File
    //alert(id)
    var selectedFile = document.getElementById("idfiledoc").files;
    //Check File is not Empty
    if (selectedFile.length > 0) {
        // Select the very first file from list
        var fileToLoad = selectedFile[0];
        //alert(fileToLoad)
        // FileReader function for read the file.
        var fileReader = new FileReader();
        var base64;
        // Onload of file read the file content
        fileReader.onload = function(fileLoadedEvent) {
            base64 = fileLoadedEvent.target.result;
            // Print data in console
            console.log(base64);

            $("#iddoctexte_" + id).val(base64);
        };
        // Convert data to base64
        fileReader.readAsDataURL(fileToLoad);
    }
}
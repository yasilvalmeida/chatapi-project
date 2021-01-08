$(function() {


    var titulo = $("#idtitulo"),
        idconteudo = $("#idconteudo"),id_projecto=$("#id_projecto").val(),
		allFields = $([]).add(titulo).add(idconteudo)

    //.add(nucar).add(recibobanco);
    $("#financiar_agente").dialog({
        autoOpen: false,
		resizable: true,
		overflow:"visible",
        show: "clip",
        hide: "clip",
        width: "540px",
		height:600,
        modal: true,
       closeOnEscape: true,
        buttons: {
            "Cancelar": function() {
              $(this).dialog("close");
            },
            "Financiar": function() {
				Inserir_financiamento();
            }
        },
        close: function() {
            allFields.val("").removeClass("ui-state-error");
            //$("#adicionar").tooltip("close");
            $("#result_financiar_agente").html("");
            $("#result_financiar_agente").removeClass("ui-state-error");
			$(".resultados_agricultor").html("<img src='img/loader.gif'/>").load("ajax/financiamento/view.php?id="+id_projecto, "", function() {});
			
        }, 		hide: { effect: "explode", duration: 1000 }

    });
    $(".resultados_agricultor").html("<img src='img/loader.gif'/>").load("ajax/financiamento/view.php?id="+id_projecto, "", function() {});
	$(".resultados_unidade").html("<img src='img/loader.gif'/>").load("ajax/financiamento/view_unidade.php?id="+id_projecto, "", function() {});
    $(".resultados_comunidade").html("<img src='img/loader.gif'/>").load("ajax/financiamento/view_comunidade.php?id="+id_projecto, "", function() {});
	
	$("#financiar_unidade").dialog({
        autoOpen: false,
		resizable: true,
        show: "clip",
        hide: "clip",
        width: "540px",
		height: 600,
        modal: true,
       closeOnEscape: true,
        buttons: {
            "Cancelar": function() {
              $(this).dialog("close");
            },
            "Financiar": function() {
                
              Inserir_financiamento_unidade();
            }
        },
        close: function() {
            allFields.val("").removeClass("ui-state-error");
            //$("#adicionar").tooltip("close");
            $("#result_financiar_unidade").html("");
            $("#result_financiar_unidade").removeClass("ui-state-error");
                $(".resultados_unidade").html("<img src='img/loader.gif'/>").load("ajax/financiamento/view_unidade.php?id="+id_projecto, "", function() {});
        }, 		hide: { effect: "explode", duration: 1000 }

    });
	$("#financiar_comunidade").dialog({
        autoOpen: false,
		resizable: true,
        show: "clip",
        hide: "clip",
        width: "540px",
		height: 600,
        modal: true,
       closeOnEscape: true,
        buttons: {
            "Cancelar": function() {
              $(this).dialog("close");
            },
            "Financiar": function() {
                
              Inserir_financiamento_comunidade();
            }
        },
        close: function() {
            allFields.val("").removeClass("ui-state-error");
            //$("#adicionar").tooltip("close");
            $("#result_financiar_comunidade").html("");
            $("#result_financiar_comunidade").removeClass("ui-state-error");
            $(".resultados_comunidade").html("<img src='img/loader.gif'/>").load("ajax/financiamento/view_comunidade.php?id="+id_projecto, "", function() {});
        },
		hide: { effect: "explode", duration: 1000 },
		show: { effect: "slideDown", duration: 800 }

    });
	
	
	
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

function Inserir_financiamento() {
	
	 var dadosajax = {
		 id_actor: $("#financiamento_agente").val(),
		 financiamento_descricao: $("#financiamento_descricao").val(),
		 financiamento_valor: $("#financiamento_valor").val(),
		 financiamento_data: $("#financiamento_data").val(),
		 financiamento_ong: $("#financiamento_ong").val(),
         id_projecto	: $("#id_projecto").val()
    };
    $.post('ajax/financiamento/insert.php', dadosajax, function (retorna) {
		if(retorna==="1")
			$("#result_financiar_agente").html("Dados inseridos com exito");
		else
			$("#result_financiar_agente").html("Falha ao inserir dados");

	});
	 setTimeout(function() {
        $("#financiar_agente").dialog("close");
        $("#result_financiar_agente").html("");
        $("#result_financiar_agente").removeClass("ui-state-error");
                
    }, 1000);
}

function Inserir_financiamento_unidade() {
	
	 var dadosajax = {
		 id_unidade: $("#id_unidade").val(),
		 financiamento_descricao: $("#financiamento_descricao_uni").val(),
		 financiamento_valor: $("#financiamento_valor_uni").val(),
		 financiamento_data: $("#financiamento_data_uni").val(),
		 financiamento_ong: $("#financiamento_ong_uni").val(),
         id_projecto: $("#id_projecto").val()
    };
    $.post('ajax/financiamento/insert_unidade.php', dadosajax, function (retorna) {
		if(retorna==="1")
			$("#result_financiar_unidade").html("Dados inseridos com exito");
		else
			$("#result_financiar_unidade").html("Falha ao inserir dados");

	});
	 setTimeout(function() {
        $("#financiar_unidade").dialog("close");
        $("#result_financiar_unidade").html("");
        $("#result_financiar_unidade").removeClass("ui-state-error");
                
    }, 1000);
}

function Inserir_financiamento_comunidade() {
	
	 var dadosajax = {
		 id_comunidade: $("#select_comunidade").val(),
		 financiamento_descricao: $("#financiamento_descricao_com").val(),
		 financiamento_valor: $("#financiamento_valor_com").val(),
		 financiamento_data: $("#financiamento_data_com").val(),
		 financiamento_ong: $("#financiamento_ong_com").val(),
         id_projecto: $("#id_projecto").val()
    };
    $.post('ajax/financiamento/insert_comunidade.php', dadosajax, function (retorna) {
		if(retorna==="1")
			$("#result_financiar_comunidade").html("Dados inseridos com exito");
		else
			$("#result_financiar_comunidade").html("Falha ao inserir dados");

	});
	 setTimeout(function() {
        $("#financiar_comunidade").dialog("close");
        $("#result_financiar_comunidade").html("");
        $("#result_financiar_comunidade").removeClass("ui-state-error");
                
    }, 1000);
}

function activar_boton(){
	if($("#select_comunidade").val()>0){
	$("#botton_financiar").hide();
	$("#botton_financiar").show(1000);
	}
	else{
	$("#botton_financiar").hide(1000);
	}	
}

function load_agente(tipo) {
	var id_agente=$("#financiamento_agente").val();
	var id_comunidade=$("#select_comunidade").val();
	var id_atividade=$("#financiamento_actividade").val();
 
 var dadosajax = {
		'id_agente': id_agente,
		'id_comunidade': id_comunidade,
		'id_atividade': id_atividade,
		'tipo': tipo
    };
    $.post('ajax/financiamento/load_agente.php', dadosajax, function (retorna) {
        $("#result_financiar_agente").html(retorna);
    });
}


function load_agro_transformacao(tipo) {
	var id_unidade=$("#id_unidade").val();
	var id_comunidade=$("#select_comunidade").val();

	var dadosajax = {
		'id_unidade': id_unidade,
		'id_comunidade': id_comunidade,
		'tipo': tipo

    };
    $.post('ajax/financiamento/load_agro_transformacao.php', dadosajax, function (retorna) {
        $("#result_financiar_unidade").html(retorna);
    });
}


function load_agro_comunidade() {
	var id_comunidade=$("#select_comunidade").val();
 
 var dadosajax = {
		'id_comunidade': id_comunidade
    };
    $.post('ajax/financiamento/load_comunidade.php', dadosajax, function (retorna) {
        $("#result_financiar_comunidade").html(retorna);
    });
}


function Eliminar_financiamento_actor(id) {
	 var dadosajax = {
			id	: id
		};
	
	if(confirm("Desejas realmente eliminar essa informação?")){
		$.post('ajax/financiamento/delete_agente.php', dadosajax, function (retorna) {
    $(".resultados_agricultor").html("<img src='img/loader.gif'/>").load("ajax/financiamento/view.php?id="+$("#id_projecto").val(), "", function() {});
		});
	}
}
function Eliminar_financiamento_unidade(id) {
	
	 var dadosajax = {
			id	: id
		};
	
	if(confirm("Desejas realmente eliminar essa informação?")){
		$.post('ajax/financiamento/delete_unidade.php', dadosajax, function (retorna) {
	$(".resultados_unidade").html("<img src='img/loader.gif'/>").load("ajax/financiamento/view_unidade.php?id="+$("#id_projecto").val(), "", function() {});
		});
	}
}
function Eliminar_financiamento_comunidade(id) {
	
	 var dadosajax = {
			id	: id
		};
	
	if(confirm("Desejas realmente eliminar essa informação?")){
		$.post('ajax/financiamento/delete_comunidade.php', dadosajax, function (retorna) {
    $(".resultados_comunidade").html("<img src='img/loader.gif'/>").load("ajax/financiamento/view_comunidade.php?id="+$("#id_projecto").val(), "", function() {});
		});
	}
}

function set_idComunidade(){
	id_comunidade=$("#select_comunidade").val();
	$(".id_comunidade").val(id_comunidade);
}

function canlcelarx() {
    $("#adicionarDialogo").dialog("close");
}

function financiar_agente() {
    $("#financiar_agente").dialog("open");
	$(".chosen-container, .chosen-container, .chosen-container-single, .chosen-container-active").css("width","360px");
}
function financiar_unidade() {
    $("#financiar_unidade").dialog("open");
		$(".chosen-container, .chosen-container, .chosen-container-single, .chosen-container-active").css("width","360px");

}

function financiar_comunidade() {
    $("#financiar_comunidade").dialog("open");
	$(".chosen-container, .chosen-container, .chosen-container-single, .chosen-container-active").css("width","360px");

	}

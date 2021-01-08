$(function() {


    var titulo = $("#idtitulo"),
        idconteudo = $("#idconteudo"),id_entidade=$("#id_entidade").val(),
		allFields = $([]).add(titulo).add(idconteudo)
    //.add(nucar).add(recibobanco);
    $("#add_membro").dialog({
        autoOpen: false,
		resizable: true,
		overflow:"visible",
        show: "clip",
        hide: "clip",
        width: "540px",
		height:550,
        modal: true,
       closeOnEscape: true,
        buttons: {
            "Cancelar": function() {
              $(this).dialog("close");
            },
            "Adicionar": function() {
				insert_membro();
            }
        },
        close: function() {
            allFields.val("").removeClass("ui-state-error");
            //$("#adicionar").tooltip("close");
            $("#result_add_membro").html("");
            $("#result_add_membro").removeClass("ui-state-error");
			$(".resultados_agricultor").html("<img src='img/loader.gif'/>").load("ajax/membro/view.php?id="+id_entidade+"&nome_entidade="+$("#nome_entidade").val(), "", function() {});
			
        }, 		hide: { effect: "explode", duration: 1000 }

    });
		$(".resultados_agricultor").html("<img src='img/loader.gif'/>").load("ajax/membro/view.php?id="+id_entidade+"&nome_entidade="+$("#nome_entidade").val(), "", function() {});
});

function insert_membro() {
	
	var dadosajax = {
		 membro_id: $("#financiamento_agente").val(),
		 data_inicio: $("#data_inicio").val(),
		 id_entidade: $("#id_entidade").val(),
		 nome_entidade: $("#nome_entidade").val()
		};
    $.post('ajax/membro/insert.php', dadosajax, function (retorna) {
		if(retorna==="1"){
			$("#result_add_membro").html("Dados inseridos com exito");
			setTimeout(function() {
			$("#add_membro").dialog("close");
			$("#result_add_membro").html("");
			$("#result_add_membro").removeClass("ui-state-error");
                
    }, 1000);
		}else{
			$("#result_add_membro").html("Falha ao inserir dados erro:"+retorna);
		}
	});
	 setTimeout(function() {
        $("#add_membro").dialog("close");
        $("#result_add_membro").html("");
        $("#result_add_membro").removeClass("ui-state-error");
                
    }, 100000);
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
        $("#result_add_membro").html(retorna);
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


function Eliminar_membro(id) {
	 var dadosajax = {
			id	: id,
			nome_entidade	: $("#nome_entidade").val()
		};
	
	if(confirm("Desejas realmente eliminar essa informação?")){
		$.post('ajax/membro/delete.php', dadosajax, function (retorna) {
		$(".resultados_agricultor").html("<img src='img/loader.gif'/>").load("ajax/membro/view.php?id="+$("#id_entidade").val()+"&nome_entidade="+$("#nome_entidade").val(), "", function() {});
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

function add_membro() {
    $("#add_membro").dialog("open");
	$(".chosen-container, .chosen-container, .chosen-container-single, .chosen-container-active").css("width","470px");
}

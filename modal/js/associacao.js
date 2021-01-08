$(function() {


    var titulo = $("#idtitulo"),
        idconteudo = $("#idconteudo"),
        //nucar = $("#numerocarta"),
        //	nucar = $("#numerocarta"),
        //recibobanco = $("#nrecibo"),
        allFields = $([]).add(titulo).add(idconteudo)

    //.add(nucar).add(recibobanco);

    $("#adicionarassociacao").dialog({
        autoOpen: false,
        resizable: true,
        show: "clip",
        hide: "clip",
        width: "440px",
		height:"550",
        modal: true,
        closeOnEscape: true,
        buttons: {
            "Cancelar": function() {
                $(this).dialog("close");
            },
            "Adicionar": function() {
				Inserir_associacao();
            }
        },
        close: function() {
            allFields.val("").removeClass("ui-state-error");
            //$("#adicionar").tooltip("close");
            $("#adicionarState").html("");
            $("#adicionarState").removeClass("ui-state-error");
            $("#resultados").html("<img src='img/loader.gif'/>").load("ajax/associacao/view.php", "", function() {});
        }
    });

  
    $("#resultados").html("<img src='img/loader.gif'/>").load("ajax/associacao/view.php", "", function() {});
    
	});

function Inserir_associacao() {
	
	 var dadosajax = {
		 nomeassociacao: $("#nome_associacao").val(),
		 idsigla: $("#idsigla_associacao").val(),
         iddata: $("#iddata_associacao").val(),
         select_comunidade_associacao: $("#select_comunidade_associacao").val(),
         idcooperativa: $("#idcooperativa_associacao").val(),
         idresponsavel	: $("#idresponsavel_associacao").val()
		};
	
    $.post('ajax/associacao/insert.php', dadosajax, function (retorna) {
		if(retorna==="1")
			$("#resultado_add_associacao").html("Dados inseridos com exito");
		else
			$("#resultado_add_associacao").html("Falha ao inserir dados");

	});
	 setTimeout(function() {
        $("#adicionarassociacao").dialog("close");
        $("#resultado_add_associacao").html("");
        $("#resultado_add_associacao").removeClass("ui-state-error");
                
    }, 1000);
}

function Alterar_associacao() {
	
	  var dadosajax = {
		 nomeassociacao: $("#nome_associacao").val(),
		 idsigla: $("#idsigla_associacao").val(),
         iddata: $("#iddata_associacao").val(),
         idcooperativa: $("#idcooperativa_associacao").val(),
         select_comunidade_associacao: $("#select_comunidade_associacao").val(),
         idresponsavel	: $("#idresponsavel_associacao").val(),
         idt_assosciacao	: $("#idt_assosciacao").val()
		};
	
    $.post('ajax/associacao/update.php', dadosajax, function (retorna) {
		if(retorna==="1")
			$("#resultado_add_associacao").html("Dados Alterado com exito");
		else
			$("#resultado_add_associacao").html("Falha ao alterar dados");

	});
	 setTimeout(function() {
        $("#adicionarcooperativa").dialog("close");
        $("#resultado_add_associacao").html("");
        $("#resultado_add_associacao").removeClass("ui-state-error");
                
    }, 1000);
}

function load_associacao(id) {
	
	adicionarassociacao("Alterar");
	
	var dadosajax = {
		 id	: id
		};
	$.post('ajax/associacao/load.php', dadosajax, function (retorna) {
		$("#resultados").html(retorna);
	});
	
}

function Eliminar_associacao(id) {
	
	 var dadosajax = {
		 id	: id
		};
	
	if(confirm("Desejas realmente eliminar essa informação?")){
		$.post('ajax/associacao/delete.php', dadosajax, function (retorna) {
            $("#resultados").html("<img src='img/loader.gif'/>").load("ajax/associacao/view.php", "", function() {});
		});
	}
}


function ver_mais(id) {
	
	 var dadosajax = {
		 id	: id
		};
		$.post('ajax/associacao/view_more.php', dadosajax, function (retorna) {
			$(".modalvermais").html(retorna);
		});
	
}

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

function canlce() {
    $("#adicionarDialogo").dialog("close");
}

function adicionarassociacao(type) {
	add_bottom(type);
    $("#adicionarassociacao").dialog("open");
			$(".chosen-container, .chosen-container, .chosen-container-single, .chosen-container-active").css("width","360px");

}

function add_bottom(type){
	if(type==="Alterar"){
		$("#adicionarassociacao").dialog({
        
        buttons: {
            "Cancelar": function() {
                $(this).dialog("close");
            },
            "Alterar": function() {
				
				Alterar_associacao();
            }
        }
    });
	}
	else {
		$("#adicionarassociacao").dialog({
        
		  buttons: {
            "Cancelar": function() {
                $(this).dialog("close");
            },
            "Adicionar": function() {
				
				Inserir_associacao();
            }
        }
		
       
    });
	}
}
function testepdf() {
    var files = document.getElementById('file-doc').files;
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

function adicionar_mas() {
    var id = categoria = $("#idresponsavel option:selected").val();
    if (id == -2) {

        $("#adicionaresporesponsavel").dialog("open");



        //  alert(id)
    }

}
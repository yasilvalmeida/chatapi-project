$(function() {


    var titulo = $("#idtitulo"),
        idconteudo = $("#idconteudo"),
        //nucar = $("#numerocarta"),
        //	nucar = $("#numerocarta"),
        //recibobanco = $("#nrecibo"),
        allFields = $([]).add(titulo).add(idconteudo)

    //.add(nucar).add(recibobanco);

    $("#adicionarong").dialog({
        autoOpen: false,
        resizable: true,
        show: "clip",
        hide: "clip",
        width: "440px",
		height:"450",
        modal: true,
        closeOnEscape: true,
        buttons: {
            "Cancelar": function() {
                $(this).dialog("close");
            },
            "Adicionar": function() {
				Inserir_ong();
            }
        },
        close: function() {
            allFields.val("").removeClass("ui-state-error");
            //$("#adicionar").tooltip("close");
            $("#adicionarState").html("");
            $("#adicionarState").removeClass("ui-state-error");
            $("#resultados").html("<img src='img/loader.gif'/>").load("ajax/ong/view.php", "", function() {});
        }
    });

  
    $("#resultados").html("<img src='img/loader.gif'/>").load("ajax/ong/view.php", "", function() {});
    
	});

function Inserir_ong() {
	
	 var dadosajax = {
		 nomeong: $("#idnome_ong").val(),
		 idsigla: $("#idsigla_ong").val(),
         iddata: $("#iddata_ong").val(),
         idcooperativa: $("#idcooperativa_ong").val(),
         idresponsavel	: $("#idresponsavel_ong").val()
		};
	
    $.post('ajax/ong/insert.php', dadosajax, function (retorna) {
		if(retorna>0){
			$("#resultado_add_ong").html("Dados inseridos com exito");
			$("#financiamento_ong").append("<option value='"+retorna+"' selected>"+$("#idnome_ong").val()+"</option>");
			$("#financiamento_ong").trigger("chosen:updated");
			
			$("#financiamento_ong_uni").append("<option value='"+retorna+"' selected>"+$("#idnome_ong").val()+"</option>");
			$("#financiamento_ong_uni").trigger("chosen:updated");
			
			$("#financiamento_ong_com").append("<option value='"+retorna+"' selected>"+$("#idnome_ong").val()+"</option>");
			$("#financiamento_ong_com").trigger("chosen:updated");
		}else{
			$("#resultado_add_ong").html(retorna);
		}
	});
	 setTimeout(function() {
        $("#adicionarong").dialog("close");
        $("#resultado_add_ong").html("");
        $("#resultado_add_ong").removeClass("ui-state-error");
                
    }, 1000);
}

function Alterar_ong() {
	
	  var dadosajax = {
		 nomeong: $("#idnome_ong").val(),
		 idsigla: $("#idsigla_ong").val(),
         iddata: $("#iddata_ong").val(),
         idcooperativa: $("#idcooperativa_ong").val(),
         idresponsavel	: $("#idresponsavel_ong").val(),
         idt_ong	: $("#idt_ong").val()
		};
	
    $.post('ajax/ong/update.php', dadosajax, function (retorna) {
		if(retorna==="1")
			$("#resultado_add_ong").html("Dados Alterado com exito");
		else
			$("#resultado_add_ong").html("Falha ao alterar dados");

	});
	 setTimeout(function() {
        $("#adicionarcooperativa").dialog("close");
        $("#resultado_add_ong").html("");
        $("#resultado_add_ong").removeClass("ui-state-error");
                
    }, 1000);
}

function load_ong(id) {
	
	adicionarong("Alterar");
	
	var dadosajax = {
		 id	: id
		};
	$.post('ajax/ong/load.php', dadosajax, function (retorna) {
		$("#resultados").html(retorna);
	});
	
}

function Eliminar_ong(id) {
	
	 var dadosajax = {
		 id	: id
		};
	
	if(confirm("Desejas realmente eliminar essa informação?")){
		$.post('ajax/ong/delete.php', dadosajax, function (retorna) {
            $("#resultados").html("<img src='img/loader.gif'/>").load("ajax/ong/view.php", "", function() {});
		});
	}
}


function ver_mais(id) {
	
	 var dadosajax = {
		 id	: id
		};
		$.post('ajax/ong/view_more.php', dadosajax, function (retorna) {
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

function adicionarong(type) {
	add_bottom(type);
    $("#adicionarong").dialog("open");
	$(".chosen-container, .chosen-container, .chosen-container-single, .chosen-container-active").css("width","360px");

}

function add_bottom(type){
	if(type==="Alterar"){
		$("#adicionarong").dialog({
        
        buttons: {
            "Cancelar": function() {
                $(this).dialog("close");
            },
            "Alterar": function() {
				
				Alterar_ong();
            }
        }
    });
	}
	else {
		$("#adicionarong").dialog({
        
		  buttons: {
            "Cancelar": function() {
                $(this).dialog("close");
            },
            "Adicionar": function() {
				
				Inserir_ong();
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
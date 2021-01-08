$(function() {

    var titulo = $("#idtitulo"),
        idconteudo = $("#idconteudo"),
        //nucar = $("#numerocarta"),
        //	nucar = $("#numerocarta"),
        //recibobanco = $("#nrecibo"),
        allFields = $([]).add(titulo).add(idconteudo)

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
               this.id="add_cooperativa";
                Inserir_projecto();
				
            }
        },
        close: function() {
            allFields.val("").removeClass("ui-state-error");
            $("#adicionarState").html("");
            $("#adicionarState").removeClass("ui-state-error");
			$("#resultados").html("<img src='img/loader.gif'/>").load("ajax/projecto/view.php", "", function() {});
        }
    });
    $("#resultados").html("<img src='img/loader.gif'/>").load("ajax/projecto/view.php", "", function() {});
	
	
});


function Inserir_projecto() {
	
	 var dadosajax = {
		 nomeprojecto: $("#nomeprojecto").val(),
         idcordenadorprojecto	: $("#idcordenadorprojecto").val(),
         descricaoprojecto	: $("#descricaoprojecto").val(),
         logoprojecto	: $("#logoprojecto").val(),
         siglaprojecto	: $("#siglaprojecto").val(),
         dataprojecto	: $("#dataprojecto").val(),
         orcamentoprojecto	: $("#orcamentoprojecto").val()
    };
    $.post('ajax/projecto/insert.php', dadosajax, function (retorna) {
		if(retorna==="1")
			$("#resultado_add_projecto").html("Dados inseridos com exito");
		else
			$("#resultado_add_projecto").html("Falha ao inserir dados");

	});
	 setTimeout(function() {
        $("#adicionarprojecto").dialog("close");
        $("#resultado_add_projecto").html("");
        $("#resultado_add_projecto").removeClass("ui-state-error");
                
    }, 1000);
}


function Alterar_projecto() {
	
	 var dadosajax = {
		 id_projecto: $("#id_projecto").val(),
		 nomeprojecto: $("#nomeprojecto").val(),
         idcordenadorprojecto	: $("#idcordenadorprojecto").val(),
         descricaoprojecto	: $("#descricaoprojecto").val(),
         logoprojecto	: $("#logoprojecto").val(),
         siglaprojecto	: $("#siglaprojecto").val(),
         dataprojecto	: $("#dataprojecto").val(),
         orcamentoprojecto	: $("#orcamentoprojecto").val()
    };
    $.post('ajax/projecto/update.php', dadosajax, function (retorna) {
		if(retorna==="1")
			$("#resultado_add_projecto").html("Dados Alterados com exito");
		else
			$("#resultado_add_projecto").html("Falha ao Alterar dados");

	});
	 setTimeout(function() {
        $("#adicionarprojecto").dialog("close");
        $("#resultado_add_projecto").html("");
        $("#resultado_add_projecto").removeClass("ui-state-error");
                
    }, 1000);
}

function ver_mais(id) {
	
	 var dadosajax = {
		 id	: id
		};
	
		$.post('ajax/projecto/view_more.php', dadosajax, function (retorna) {
            $(".modalvermais").html(retorna);
		});
	
}

function load_projecto(id) {
	
	adicionarprojecto("Alterar");
	
	var dadosajax = {
		 id	: id
		};
	
		$.post('ajax/projecto/load.php', dadosajax, function (retorna) {
		$("#resultados").html(retorna);
		});
}

function Eliminar_projecto(id) {
	
	 var dadosajax = {
			id	: id
		};
	
	if(confirm("Desejas realmente eliminar essa informação?")){
		$.post('ajax/projecto/delete.php', dadosajax, function (retorna) {
            $("#resultados").html("<img src='img/loader.gif'/>").load("ajax/projecto/view.php", "", function() {});
		});
	}
}

function canlcelarx() {
    $("#adicionarDialogo").dialog("close");
}

function adicionarprojecto(type) {
	add_bottom(type);
    $("#adicionarprojecto").dialog("open");
		$(".chosen-container, .chosen-container, .chosen-container-single, .chosen-container-active").css("width","360px");

}


function add_bottom(type){
	if(type==="Alterar"){
		$("#adicionarprojecto").dialog({
        
        buttons: {
            "Cancelar": function() {
                $(this).dialog("close");
            },
            "Alterar": function() {
				
				Alterar_projecto();
            }
        }
    });
	}
	else {
		$("#adicionarprojecto").dialog({
        
		  buttons: {
            "Cancelar": function() {
                $(this).dialog("close");
            },
            "Adicionar": function() {
				
				Inserir_projecto();
            }
        }
		
       
    });
	}
}
function adicionarresponsavel() {
    $("#adicionarresponsavel").dialog("open");
		$(".chosen-container, .chosen-container, .chosen-container-single, .chosen-container-active").css("width","360px");

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
$(function() {


    var titulo = $("#idtitulo"),
	bottom_add="Adicionar";
        idconteudo = $("#idconteudo"),
        //nucar = $("#numerocarta"),
        //	nucar = $("#numerocarta"),
        //recibobanco = $("#nrecibo"),
        allFields = $([]).add(titulo).add(idconteudo)

    //.add(nucar).add(recibobanco);

    $("#adicionarcooperativa").dialog({
        autoOpen: false,
        resizable: true,
        show: "clip",
        hide: "clip",
        width: "540px",
		height: 540,
        modal: true,
        closeOnEscape: true,
        buttons: {
            "Cancelar": function() {
                $(this).dialog("close");
            },
            "Adicionar": function() {
				
				Inserir_cooperativa();
            }
        },
        close: function() {
            allFields.val("").removeClass("ui-state-error");
            //$("#adicionar").tooltip("close");
            $("#adicionarState").html("");
            $("#adicionarState").removeClass("ui-state-error");
            $("#resultados").html("<img src='img/loader.gif'/>").load("ajax/cooperativa/view.php", "", function() {});
        }
    });

    $("#resultados").html("<img src='img/loader.gif'/>").load("ajax/cooperativa/view.php", "", function() {});
    $("#idcategoria").html("<img src='img/preloader-01.gif' />").load("ajax/selection/option.php", "tipo=CategoriaDocumento&base=no", function() {});

});

function Inserir_cooperativa() {
	
	 var dadosajax = {
		 idcordenadorprojecto: $("#idcordenadorprojecto").val(),
         nomecooperatica: $("#nomecooperatica").val(),
         abrangencia:	 $("#abrangencia").val(),
         logotipo	: $("#logotipo").val(),
         comunidade	: $("#select_comunidade").val(),
         datacooperativa	: $("#datacooperativa").val(),
         idsigla	: $("#idsigla").val()
		};
	
    $.post('ajax/cooperativa/insert.php', dadosajax, function (retorna) {
		if(retorna==="1")
			$("#resultado_add_cooperativa").html("Dados inseridos com exito");
		else
			$("#resultado_add_cooperativa").html("Falha ao inserir dados");

	});
	 setTimeout(function() {
        $("#adicionarcooperativa").dialog("close");
        $("#resultado_add_cooperativa").html("");
        $("#resultado_add_cooperativa").removeClass("ui-state-error");
                
    }, 1000);
}

function Alterar_cooperativa() {
	
	 var dadosajax = {
		 idcordenadorprojecto: $("#idcordenadorprojecto").val(),
         nomecooperatica: $("#nomecooperatica").val(),
         abrangencia:	 $("#abrangencia").val(),
         logotipo	: $("#logotipo").val(),
         comunidade	: $("#select_comunidade").val(),
         datacooperativa	: $("#datacooperativa").val(),
         idsigla	: $("#idsigla").val(),
         idt_cooperativa	: $("#idt_cooperativa").val()
		};
	
    $.post('ajax/cooperativa/update.php', dadosajax, function (retorna) {
		if(retorna==="1")
			$("#resultado_add_cooperativa").html("Dados Alterado com exito");
		else
			$("#resultado_add_cooperativa").html("Falha ao alterar dados");

	});
	 setTimeout(function() {
        $("#adicionarcooperativa").dialog("close");
        $("#resultado_add_cooperativa").html("");
        $("#resultado_add_cooperativa").removeClass("ui-state-error");
                
    }, 1000);
}

function Eliminar_coperativa(id) {
	
	 var dadosajax = {
		 id	: id
		};
	
	if(confirm("Desejas realmente eliminar essa informação?")){
		$.post('ajax/cooperativa/delete.php', dadosajax, function (retorna) {
            $("#resultados").html("<img src='img/loader.gif'/>").load("ajax/cooperativa/view.php", "", function() {});
		});
	}
}

function load_cooperativa(id) {
	
	adicionarcooperativa("Alterar");
	
	var dadosajax = {
		 id	: id
		};
	
		$.post('ajax/cooperativa/load.php', dadosajax, function (retorna) {
		$("#resultados").html(retorna);
		});
}

function ver_mais(id) {
	
	 var dadosajax = {
		 id	: id
		};
		$.post('ajax/cooperativa/view_more.php', dadosajax, function (retorna) {
			$(".modalvermais").html(retorna);
		});
	
}




function canlcelarx() {
    $("#adicionarDialogo").dialog("close");
}

function add_bottom(type){
	if(type==="Alterar"){
		$("#adicionarcooperativa").dialog({
        
        buttons: {
            "Cancelar": function() {
                $(this).dialog("close");
            },
            "Alterar": function() {
				
				Alterar_cooperativa();
            }
        }
    });
	}
	else {
		$("#adicionarcooperativa").dialog({
        
		  buttons: {
            "Cancelar": function() {
                $(this).dialog("close");
            },
            "Adicionar": function() {
				
				Inserir_cooperativa();
            }
        }
		
       
    });
	}
}
function adicionarcooperativa(type) {
	add_bottom(type);
    $("#adicionarcooperativa").dialog("open");
	$(".chosen-container, .chosen-container, .chosen-container-single, .chosen-container-active").css("width","400px");

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
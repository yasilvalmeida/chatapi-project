$(function() {


    var titulo = $("#idtitulo"),
        idconteudo = $("#idconteudo"),
        //nucar = $("#numerocarta"),
        //	nucar = $("#numerocarta"),
        //recibobanco = $("#nrecibo"),
        allFields = $([]).add(titulo).add(idconteudo)

    //.add(nucar).add(recibobanco);

    $("#adicionarempresa").dialog({
        autoOpen: false,
        resizable: true,
        show: "clip",
        hide: "clip",
        width: "740px",
        modal: true,
        closeOnEscape: true,
        buttons: {
            "Cancelar": function() {
                $(this).dialog("close");
            },
            "Adicionar": function() {
				Inserir_empresa();
            }
        },
        close: function() {
            allFields.val("").removeClass("ui-state-error");
            //$("#adicionar").tooltip("close");
            $("#adicionarState").html("");
            $("#adicionarState").removeClass("ui-state-error");
            $("#resultados").html("<img src='img/loader.gif'/>").load("ajax/empresa/view.php", "", function() {});
        }
    });

    // inicio responsavel
    $("#adicionaresporesponsavel").dialog({
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
        width: "640px",
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
            $("#resultados_processados").html("<img src='img/loader.gif'/>").load("ajax/empresa/view.php", "", function() {});
        }
    });



    //fim responsavel

    $("#resultados").html("<img src='img/loader.gif'/>").load("ajax/empresa/view.php", "", function() {});
   
	});

function Inserir_empresa() {
	
	 var dadosajax = {
		 nomeempresa: $("#nomeempresa").val(),
		 descricaoempresa: $("#descricaoempresa").val(),
         idtipoempresa: $("#idtipoempresa").val(),
         iddimensao	: $("#iddimensao").val(),
         idresponsavel		: $("#idresponsavel").val(),
         idtiporesponsavel		: $("#idtiporesponsavel").val(),
         idsexofeminino: $("#idsexofeminino").val(),
         idsexomasculino		: $("#idsexomasculino").val(),
         idfaxaetaria		: $("#idfaxaetaria").val(),
         idhectar		: $("#idhectar").val(),
         idcultura		: $("#idcultura").val(),
         iddata		: $("#iddata").val(),
         idcomunidade		: $("#idcomunidade").val()
		};
	
    $.post('ajax/empresa/insert.php', dadosajax, function (retorna) {
		if(retorna>0){
			insert_cultura_empresa(retorna);
			insert_tipocultura_empresa(retorna);
			$("#resultado_add_empresa").html("Dados inseridos com exito");
		}else{
			$("#resultado_add_empresa").html(retorna);
		}
	});
	 setTimeout(function() {
        $("#adicionarempresa").dialog("close");
        $("#resultado_add_empresa").html("");
        $("#resultado_add_empresa").removeClass("ui-state-error");
                
    }, 1000);
}
function Alterar_empresa() {
	
	 var dadosajax = {
		 nomeempresa: $("#nomeempresa").val(),
		 descricaoempresa: $("#descricaoempresa").val(),
         idtipoempresa: $("#idtipoempresa").val(),
         iddimensao	: $("#iddimensao").val(),
         idresponsavel		: $("#idresponsavel").val(),
         idtiporesponsavel		: $("#idtiporesponsavel").val(),
         idsexofeminino: $("#idsexofeminino").val(),
         idsexomasculino		: $("#idsexomasculino").val(),
         idfaxaetaria		: $("#idfaxaetaria").val(),
         idhectar		: $("#idhectar").val(),
         idcultura		: $("#idcultura").val(),
         iddata		: $("#iddata").val(),
         idcomunidade		: $("#idcomunidade").val(),
         idt_empresa_agriculo		: $("#idt_empresa_agriculo").val()
		};
	
    $.post('ajax/empresa/update.php', dadosajax, function (retorna) {
		if(retorna==="1"){
			insert_cultura_empresa(dadosajax.idt_empresa_agriculo);
			insert_tipocultura_empresa(dadosajax.idt_empresa_agriculo);
			$("#resultado_add_empresa").html("Dados Alterado com exito");
		}else{
			$("#resultado_add_empresa").html("Falha ao alterar dados");
		}
	});
	 setTimeout(function() {
        $("#adicionarcooperativa").dialog("close");
        $("#resultado_add_empresa").html("");
        $("#resultado_add_empresa").removeClass("ui-state-error");
                
    }, 1000);
}

function load_empresa(id) {
	
	adicionarempresa("Alterar");
	
	var dadosajax = {
		 id	: id
		};
	$.post('ajax/empresa/load.php', dadosajax, function (retorna) {
		$("#resultados").html(retorna);
	});
	
}

function load_select_cultura() {
	
	 var dadosajax = {
		 id_tipo_cultura	: $("#idtipoempresa").val()
		};
		$.post('ajax/empresa/load_select_cultura.php', dadosajax, function (retorna) {
			$("#resultados").html(retorna);
		});
	
}
function load_select_culturaTeste(id) {
	
	 var dadosajax = {
		 id_tipo_cultura	: id
		};
		alert(id);
		$.post('ajax/empresa/load_select_cultura.php', dadosajax, function (retorna) {
			$("#resultados").html(retorna);
		});
	
}
function Eliminar_empresa(id) {
	
	 var dadosajax = {
		 id	: id
		};
	
	if(confirm("Desejas realmente eliminar essa informação?")){
		$.post('ajax/empresa/delete.php', dadosajax, function (retorna) {
            $("#resultados").html("<img src='img/loader.gif'/>").load("ajax/empresa/view.php", "", function() {});
		});
	}
}

function insert_tipocultura_empresa(id_empresa) {
	var id_tipocultura = $("#idtipoempresa").val();
	var id_empresa = id_empresa;
		var dadosajax = {
			id_tipocultura: id_tipocultura,
			id_empresa: id_empresa
			};
		$.post('ajax/empresa/insert_tipocultura_empresa.php', dadosajax, function (retorna) {
			$("#resultados").html(retorna);
		});
	
}

function insert_cultura_empresa(id_empresa) {
	var id_cultura = $("#idcultura").val();
	var id_empresa = id_empresa;
		var dadosajax = {
			 id_cultura: id_cultura,
			 id_empresa: id_empresa
			};
		
			$.post('ajax/empresa/insert_cultura_empresa.php', dadosajax, function (retorna) {
			$("#resultados").html(retorna);
			});
	
}

function ver_mais(id) {
	
	 var dadosajax = {
		 id	: id
		};
		$.post('ajax/empresa/view_more.php', dadosajax, function (retorna) {
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

function adicionarempresa(type) {
	add_bottom(type);
    $("#adicionarempresa").dialog("open");
			$(".chosen-container, .chosen-container, .chosen-container-single, .chosen-container-active").css("width","360px");

}

function add_bottom(type){
	if(type==="Alterar"){
		$("#adicionarempresa").dialog({
        
        buttons: {
            "Cancelar": function() {
                $(this).dialog("close");
            },
            "Alterar": function() {
				
				Alterar_empresa();
            }
        }
    });
	}
	else {
		$("#adicionarempresa").dialog({
        
		  buttons: {
            "Cancelar": function() {
                $(this).dialog("close");
            },
            "Adicionar": function() {
				
				Inserir_empresa();
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
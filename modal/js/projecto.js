
$(function() {

    var titulo = $("#idtitulo"),
        idconteudo = $("#idconteudo"),
        allFields = $([]).add(titulo).add(idconteudo)

    $("#adicionarprojecto").dialog({
        autoOpen: false,
        resizable: true,
        show: "clip",
        hide: "clip",
        width: "800px",
		height:650,
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
            $("#tbody_dados").html("");
            $("#adicionarState").removeClass("ui-state-error");
			$("#resultados").html("<img src='img/loader.gif'/>").load("ajax/projecto/view.php", "", function() {});
			$("#form_adicionarprojecto").trigger("reset");
        }
    });
    $("#resultados").html("<img src='img/loader.gif'/>").load("ajax/projecto/view.php", "", function() {});
	
	    $("#adicionarfinanciamento").dialog({
        autoOpen: false,
        resizable: true,
        show: "clip",
        hide: "clip",
        width: "550px",
		height:450,
        modal: true,
        closeOnEscape: true,
		buttons: {
            "Fechar": function() {
				$(this).dialog("close");
            }
        },
        close: function() {
            allFields.val("").removeClass("ui-state-error");
            $("#adicionarState").html("Total");
            $("#adicionarState").removeClass("ui-state-error");
			$("#resultados").html("<img src='img/loader.gif'/>").load("ajax/projecto/view.php", "", function() {});
        }
    });
	
	$("#adicionarfinanciador").dialog({
        autoOpen: false,
        resizable: true,
        show: "clip",
        hide: "clip",
        width: "550px",
		height:350,
        modal: true,
        closeOnEscape: true,
        buttons: {
            "Cancelar": function() {
                $(this).dialog("close");
            },
            "Adicionar": function() {
             insirir_financidor();
            }
        },
        close: function() {
            allFields.val("").removeClass("ui-state-error");
            $("#adicionarState").html("Total");
            $("#adicionarState").removeClass("ui-state-error");
			$("#resultados").html("<img src='img/loader.gif'/>").load("ajax/projecto/view.php", "", function() {});
        }
    });
	
	
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
		if(retorna==="1"){
			insirir_financiamento_projecto();
			$("#resultado_add_projecto").html("Dados inseridos com exito");
			
			 setTimeout(function() {
				$("#adicionarprojecto").dialog("close");
			}, 1000);
		}
		else{
			$("#resultado_add_projecto").html("Falha ao inserir dados");
		}
	});
	
	
	/*
	 setTimeout(function() {
        $("#adicionarprojecto").dialog("close");
        $("#resultado_add_projecto").html("");
        $("#resultado_add_projecto").removeClass("ui-state-error");
                
    }, 1000);*/
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
		if(retorna==="1"){
			eliminar_financiamento(dadosajax.id_projecto); 
			insirir_financiamento_projecto();
			$("#resultado_add_projecto").html("Dados Alterados com exito");
		}else{
			$("#resultado_add_projecto").html("Falha ao Alterar dados");
		}
	});
	 setTimeout(function() {
        $("#adicionarprojecto").dialog("close");
        $("#resultado_add_projecto").html("");
        $("#resultado_add_projecto").removeClass("ui-state-error");
                
    }, 1000);
}

function insirir_financiamento_projecto() {
	 var tatal = $("#total_idtable").val();
	//alert("Entrei");
	for (var index = 1; index <= tatal; index++) {
		var dadosajax = {
			idfinanciador: $("#idfinanciador_" + index).val(),
			idfinanciamento: $("#idfinanciamento_" + index).val(),
			nomeprojecto: $("#nomeprojecto").val(),
			descricaoprojecto	: $("#descricaoprojecto").val(),
			siglaprojecto	: $("#siglaprojecto").val()
		};
    $.post('ajax/projecto/insert_financiamento.php', dadosajax, function (retorna) {
		if(retorna==="1")
			$("#resultado_add_projecto").html("Dados Inseridos com exito");
		else
			$("#resultado_add_projecto").html(retorna);

	});
	}
}
function eliminar_financiamento(id_projecto) {
	
	 var dadosajax = {
		 id_projecto	: id_projecto
		};
	
		$.post('ajax/projecto/eliminar_financiamento.php', dadosajax, function (retorna) {
            $(".modalvermais").html(retorna);
		});
	
}

function insirir_financidor() {
	 var tatal = $("#total_idtable").val();
	//alert("Entrei");
		 var dadosajax = {
		nomefinanciador: $("#nomefinanciador").val(),
        telfinanciador: $("#telfinanciador").val(),
        logofinanciador: $("#logofinanciador").val(),
		emailfinanciador	: $("#emailfinanciador").val()
		 };
    
	$.post('ajax/projecto/insert_financiador.php', dadosajax, function (retorna) {
		if(retorna>0){
			$("#resultado_add_financiador").html("Dados Inseridos com exito");
			$("#idfinanciador_0").append("<option value='"+retorna+"' id='idfinanciador_0"+retorna+"' selected>"+$("#nomefinanciador").val()+"</option>");
			$("#idfinanciador_0").trigger("chosen:updated");
			 setTimeout(function() {
				$("#adicionarfinanciador").dialog("close");
			    $("#resultado_add_financiador").html("");
				//$("#resultado_add_projecto").removeClass("ui-state-error");
						
			}, 1000);
		}else{
			$("#resultado_add_financiador").html(retorna);
		}

	});

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
function controlar_tela(x){
	if(x==1){
		$('#resultados').html('');
		$('#adicionarprojecto').show();
	}else{
            $("#resultados").html("<img src='img/loader.gif'/>").load("ajax/projecto/view.php", "", function() {});
		$('#adicionarprojecto').hide();
	}
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
function adicionarfinanciamento() {
    $("#adicionarfinanciamento").dialog("open");
		$(".chosen-container, .chosen-container, .chosen-container-single, .chosen-container-active").css("width","360px");

}
function adicionarfinanciador() {
    $("#adicionarfinanciador").dialog("open");
		$(".chosen-container, .chosen-container, .chosen-container-single, .chosen-container-active").css("width","360px");

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

var a = 0;

function add_tr() {
	var idfinanciador_0=$("#idfinanciador_0").val();
	var Descrfinanciador_0=$("#idfinanciador_0"+idfinanciador_0).html();
	var idfinanciamento_0=$("#idfinanciamento_0").val();
    a++;
    var id_tr = a;
    var id_n_tr = "n_tr_" + a;

    $('#tbody_dados').append('<tr id="tr_' + id_tr + '">' +
        '<td id="' + id_n_tr + '" ><input  hidden=""id="idfinanciador_' + id_tr + '" value="'+idfinanciador_0+'"/><a href="#">'+Descrfinanciador_0+'</a></td>' +
        '<td ><a href="#"  > '+idfinanciamento_0+'</a> <input hidden="" id="idfinanciamento_' + id_tr + '" value="'+idfinanciamento_0+'"/> </td>' +
        '<td width="50px" style="cursor: pointer;text-align: center;">' +
        '<a class="" id="dell_' + a + '" onclick="discontar_orcamento('+id_tr+');del_tr(this)">Eliminar </a> </td>  </tr>');
    // alert("tipo cul" + a)
	select_financiador(id_tr);
    $("#total_idtable").val(a);
}

function del_tr(elem) {
//    a=a-1;
    elem = elem.id;
    elem = elem.replace('dell_', '');
    $("#tr_" + elem).remove();
    //alert(elem)
    $("#total_idtable").val(a);
    recontar_tr(elem);
}

function recontar_tr(elem) {
    var num = elem * 1;
    for (var i = 1; i <= a; i++) {
        var id_n_tr = "#n_tr_" + i;
        if (i > num) {
            $('#input_tr_' + i).val('tr_' + (i - 1));
            $('#input_tr_' + i).prop('id', 'input_tr_' + (i - 1));
            $('#tr_' + i).prop('id', 'tr_' + (i - 1));
            //$("" + id_n_tr).html("" + (i - 1));
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
function calcula_orcamento(){
	var tatal = $("#total_idtable").val();
	//alert("Total table="+tatal);
	var valor_total=0;
	for (var index = 1; index <= tatal; index++) {
		
        valor_total+= $("#idfinanciamento_" + index).val()*1;
         //alert("valor Total="+valor_total);
	}
	$("#orcamentoprojecto").val(valor_total);
	/*if($("#Total_table_financiamento").html() === undefined)
	$(".ui-dialog-buttonpane").append("<div id='Total_table_financiamento'> Total = "+valor_total+"</div>");
	$("#Total_table_financiamento").html(valor_total);
	*/
}
function discontar_orcamento(id_tr){
	var orcamento = $("#orcamentoprojecto").val();
	//alert((orcamento)+'-'+($("#idfinanciamento_" + id_tr).val()*1));
	orcamento= (orcamento)-($("#idfinanciamento_" + id_tr).val()*1);
	$("#orcamentoprojecto").val(orcamento);
}
function select_financiador(index) {
	
	 var dadosajax = {
		 index	: index
		};
		$.post('ajax/projecto/select_financiador.php', dadosajax, function (retorna) {
			$("#resultado_add_projecto").html(retorna);
		});
	
}


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
        width: "850px",
		height: 620,
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
            $("#adicionar").tooltip("close");
            $("#adicionarState").html("");
            $("#adicionarState").removeClass("ui-state-error");
            $("#resultados").html("<img src='img/loader.gif'/>").load("ajax/cooperativa/view.php", "", function() {});
        }
    });
	$("#adicionarzona_abrangencia").dialog({
        autoOpen: false,
        resizable: true,
        show: "clip",
        hide: "clip",
        width: "450px",
		height: 620,
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
            $("#adicionar").tooltip("close");
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
		 idcordenadorcooperativa: $("#idcordenadorcooperativa").val(),
         nomecooperatica: $("#nomecooperatica").val(),
         idactividade_cooperativa : $("#idactividade_cooperativa").val(),
         idsigla	: $("#idsigla").val(),
         logotipo	: $("#logotipo").val(),
         comunidade	: $("#select_comunidade_coperativa").val(),
         datacooperativa	: $("#datacooperativa").val()
		 };
	
    $.post('ajax/cooperativa/insert.php', dadosajax, function (retorna) {
		if(retorna>0){
			insert_abrangencia();
			$("#resultado_add_cooperativa").html("Dados inseridos com exito");
			$("#idcooperativa").append("<option value='"+retorna+"' selected>"+$("#nomecooperatica").val()+"</option>");
			$("#idcooperativa").trigger("chosen:updated");
			$("#idcooperativa_ong").append("<option value='"+retorna+"' selected>"+$("#nomecooperatica").val()+"</option>");
			$("#idcooperativa_ong").trigger("chosen:updated");
			
			$("#idcooperativa_associacao").append("<option value='"+retorna+"' selected>"+$("#nomecooperatica").val()+"</option>");
			$("#idcooperativa_associacao").trigger("chosen:updated");
			
		/* setTimeout(function() {
			$("#adicionarcooperativa").dialog("close");
			$("#resultado_add_cooperativa").html("");
			$("#resultado_add_cooperativa").removeClass("ui-state-error");
                
		}, 1500);*/
		}else{
			$("#resultado_add_cooperativa").html(retorna);
		}
	});
	 
}

function Alterar_cooperativa() {
	
	 var dadosajax = {
		 idcordenadorcooperativa: $("#idcordenadorcooperativa").val(),
         nomecooperatica: $("#nomecooperatica").val(),
         idactividade_cooperativa:	 $("#idactividade_cooperativa").val(),
         logotipo	: $("#logotipo").val(),
         comunidade	: $("#select_comunidade_coperativa").val(),
         datacooperativa	: $("#datacooperativa").val(),
         idsigla	: $("#idsigla").val(),
         idt_cooperativa	: $("#idt_cooperativa").val()
		};
	
    $.post('ajax/cooperativa/update.php', dadosajax, function (retorna) {
		if(retorna==="1"){
			insert_abrangencia();
			$("#resultado_add_cooperativa").html("Dados Alterado com exito");
			
		}else{
			$("#resultado_add_cooperativa").html(retorna);
		}
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
function insert_abrangencia() {
	var idAreaAbrangencia_0 = $("#idAreaAbrangencia_0").val();
		var dadosajax = {
			  nomecooperatica: $("#nomecooperatica").val(),
			 idsigla	: $("#idsigla").val(),
			 idAreaAbrangencia	: idAreaAbrangencia_0
			};
		
			$.post('ajax/cooperativa/insert_abrangencia.php', dadosajax, function (retorna) {
			$("#resultado_add_cooperativa").html(retorna);
			});
	
}
function controlar_tela(x){
	if(x==1){
		$('#resultados').html('');
		$('#adicionarcooperativa').show();
	}else{
            $("#resultados").html("<img src='img/loader.gif'/>").load("ajax/cooperativa/view.php", "", function() {});
		$('#adicionarcooperativa').hide();
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

var a=0;
function add_tr() {

    a++;
    var id_tr = a;
    var id_n_tr = "n_tr_" + a;
	// var php ="<?php echo select_comunidade(); ?>";
    $('#tbody_dados').append('<tr id="tr_' + id_tr + '">' +
        '<td id="' + id_n_tr + '" > <input data-placeholder="" class="form-control" value="'+$("#idcomunidade_0").val()+'" id="idAreaAbrangencia_' + id_tr + '" tabindex="3" /></td>' +
        '<td width="50px" style="cursor: pointer;text-align: center;">' +
        '<a class="" id="dell_' + a + '" onclick="del_tr(this);">Eliminar </a> </td>  </tr>');
    // alert("tipo cul" + a)
    $("#total_idtable").val(a);
	select_comunidade(id_tr);
	
}

function del_tr(elem) {
       //a=a-1;
    elem = elem.id;
    elem = elem.replace('dell_', '');
    $("#tr_" + elem).remove();
    //alert(elem)
    recontar_tr(elem);
    $("#total_idtable").val(a);
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
function select_comunidade(index) {
	
	 var dadosajax = {
		 index	: index
		};
		$.post('ajax/cooperativa/select_comunidade.php', dadosajax, function (retorna) {
			$("#resultado_add_cooperativa").html(retorna);
		});
	
}

function adicionarcooperativa(type) {
	add_bottom(type);
    $("#adicionarcooperativa").dialog("open");
	$(".chosen-container, .chosen-container, .chosen-container-single, .chosen-container-active").css("width","400px");
	

}
function adicionarzona_abrangencia() {
    $("#adicionarzona_abrangencia").dialog("open");
	

}
function calcula_orcamento(){
	var tatal = $("#total_idtable").val();
	//alert("Entrei");
	for (var index = 0; index <= tatal; index++) {
		var dadosajax = {
			  nomecooperatica: $("#nomecooperatica").val(),
			 idsigla	: $("#idsigla").val(),
			 idAreaAbrangencia	: $("#idAreaAbrangencia_"+index).val()
			};
		
			$.post('ajax/cooperativa/insert_abrangencia.php', dadosajax, function (retorna) {
			$("#resultado_add_cooperativa").html(retorna);
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

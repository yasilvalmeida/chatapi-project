function Asyn_adddeparetamento() {
   // alert("aqui function")
	$("#adicionarStatedepartamento").html("<img src='img/loader.gif'/>");
	var id_piso = $("#idpiso option:selected").val();
        //  alert(id_piso)
	$.post("ajax/departamento/insert.php", {
		nomedepar: $("#nomedepar").val(),
        idpiso: id_piso
	}, function (data) {
		var result = parseInt(data.text);
      //  alert(result)
		if (result > 0) {
			$("#adicionarStatedepartamento").html("<p>Os seus dados foram adicionados com êxito!</p>");
			$("#id_nomedepartamento").html("<img src='img/preloader-01.gif' />").load("ajax/selection/option.php", "tipo=id_nomedepartamento&base=yes", function () {});
            
            $("#adicionardepartamento").dialog('option', 'buttons', {
					'Fechar': function () {
						$("#adicionardepartamento").dialog("close");
                        $("#nomedepar").val("");
				
					},'Adicionar': function () {
					var bValid = true,
                    tips = $("#adicionarStatedepartamento");
						allFields.removeClass("ui-state-error");
					var idpiso = $("#idpiso option:selected").val();
						var nomedepar=$("#nomedepar");
					if (nomedepar.val() == "") {
						tips.html("Este campo não pode estar vazio");
						nomedepar.addClass("ui-state-error");
						nomedepar.focus();
						bValid = false;
					} else if (idpiso == -1) {
						tips.html("<p style='color:red'>Selecione PISO por favor.</p>");
						bValid = false;
					}
					if (bValid) {
						Asyn_adddeparetamento();
					}
				}

			
				});
			setTimeout(function () {
				$("#adicionardepartamento")
					.dialog("close");
		$("#nomedepar").val("");
				$("#adicionardepartamento")
					.dialog('option', 'buttons', {
						"Fechar": function () {
							$(this)
								.dialog("close");
						}, "Adicionar": function () {
							var bValid = true
								, tips = $("#adicionarStatedepartamento");
							var idpiso = $("#idpiso option:selected").val();
											var nomedepar=$("#nomedepar");
					if (nomedepar.val() == "") {
						tips.html("Este campo não pode estar vazio");
						nomedepar.addClass("ui-state-error");
						nomedepar.focus();
						bValid = false;
					} else if (idpiso == -1) {
						tips.html("<p style='color:red'>Selecione PISO por favor.</p>");
						bValid = false;
					}
					if (bValid) {
						Asyn_adddeparetamento();
					}
				}
					});
			}, 1000);
		} else {
			$("#adicionarStatecominidade")
				.html("<p>Registro dos dados falhada!</p>");
		}
	}, "json");

    
}
function ayns_addseccao(){
    
    var id=	$("#total_secao").val();
   // alert(id)
    var gabinete=0,area=0,sec_id=0;
    var i=0;
    $("#adicionarStatecominidade").html("<img src='img/loader.gif'/>");
 for(i=0;i<id;i++){
   gabinete=$("#gabinete_id_"+i+" option:selected").val();
   sec_id=$("#id_nomedepartamento option:selected").val();
     area=$("#area_id_"+i).val();
   /* alert("i= "+i+"    ga=  "+gabinete+"  area=  "+area);*/
  $.post("ajax/departamento/insert_seccao.php", {
		gabinete: gabinete,
        area: area,
        sec_cao:sec_id
	}, function (data) {
		var result = parseInt(data.text);
       //alert(result)
		if (result > 0) {
			$("#adicionarStatecominidade").html("<p>Os seus dados foram adicionados com êxito!</p>");
			//$("#resultadodalista").html("<img src='img/loader.gif'/>").load("ajax/piso/view.php", "", function () {});
		setTimeout(function () {
            location.reload(true);
					
			}, 1000);
        } else {
			$("#adicionarStatecominidade").html("<p>Registro dos dados falhada!</p>");
		}
	}, "json");  
 }    
}

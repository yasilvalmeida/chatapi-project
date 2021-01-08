$(function() {

    var titulo = $("#idtitulo"),
        idconteudo = $("#idconteudo"),
        //nucar = $("#numerocarta"),
        //	nucar = $("#numerocarta"),
        //recibobanco = $("#nrecibo"),
        allFields = $([]).add(titulo).add(idconteudo)

    
	$("#adicionarresponsavel").dialog({
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
               
                Inserir_cordenador();
            }
        },
        close: function() {
            allFields.val("").removeClass("ui-state-error");
            $("#adicionarState").html("");
            $("#adicionarState").removeClass("ui-state-error");
            $("#resultados_processados").html("<img src='img/loader.gif'/>").load("ajax/factura/view.php", "", function() {});
        }
    });
});

function Inserir_cordenador() {
	
	 var dadosajax = {
		 
		 nomeresponsavel	: $("#nomeresponsavel").val(),
         tel1responsavel	: $("#tel1responsavel").val(),
         tel2responsavel	: $("#tel2responsavel").val(),
         emailresponsavel	: $("#emailresponsavel").val()
	};
    $.post('ajax/responsavel/insert.php', dadosajax, function (retorna) {
		if(retorna>0){
			$("#resultado_add_responsavel").html("Dados inseridos com exito");
			// projecto
			$("#idcordenadorprojecto").append("<option value='"+retorna+"' selected>"+dadosajax.nomeresponsavel+"</option>");
			$("#idcordenadorprojecto").trigger("chosen:updated");
			//empresa
			$("#idresponsavel").append("<option value='"+retorna+"' selected>"+dadosajax.nomeresponsavel+"</option>");
			$("#idresponsavel").trigger("chosen:updated");
			// cooperativa
			$("#idcordenadorcooperativa").append("<option value='"+retorna+"' selected>"+dadosajax.nomeresponsavel+"</option>");
			$("#idcordenadorcooperativa").trigger("chosen:updated");
			// associacao
			$("#idresponsavel_associacao").append("<option value='"+retorna+"' selected>"+dadosajax.nomeresponsavel+"</option>");
			$("#idresponsavel_associacao").trigger("chosen:updated");
			// ong parceiro
			$("#idresponsavel_ong").append("<option value='"+retorna+"' selected>"+dadosajax.nomeresponsavel+"</option>");
			$("#idresponsavel_ong").trigger("chosen:updated");
			
			
		}else{
			$("#resultado_add_responsavel").html("Falha ao inserir dados");
		}
		
	});
	 setTimeout(function() {
        $("#adicionarresponsavel").dialog("close");
        $("#resultado_add_responsavel").html("");
        $("#resultado_add_responsavel").removeClass("ui-state-error");
    }, 1000);
}

function adicionarresponsavel() {
    $("#adicionarresponsavel").dialog("open");
		$(".chosen-container, .chosen-container, .chosen-container-single, .chosen-container-active").css("width","360px");

}

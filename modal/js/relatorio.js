
    function listar_F_DR(id_dir) {
        
            var dados = {
                'id_dir': id_dir
            };
             
            $.post('funcionario/lista_F_DR.php', dados, function (retorna) {
                $(".resultados").html(retorna);
            });
			   // alert(id_dir);

        
    }
	
	function busca_relatorioFuncionario(){
		
		$(".resutadoRelatorio").html("<div class='container' align='center'><img src='img/loding.gif' width='100'  /> </div>");
        var dados = {
            'rltr_sexo':$('select#rltr_sexo').val(),
            'rltr_distrito':$('select#rltr_distrito').val(),
            'rltr_comunidade':$('select#rltr_comunidade').val(),
            'rltr_actividade':$('select#rltr_actividade').val(),
            'rltr_ectar_mx':$('select#rltr_ectar_mx').val(),
            'rltr_ectar_mn':$('select#rltr_ectar_mn').val(),
            'rltr_dataFunc_inicial':$('#rltr_dataFunc_inicial').val(),
            'rltr_dataFunc_final':$('#rltr_dataFunc_final').val(),
            'rltr_associacao':$('#rltr_associacao').val(),
            'rltr_projecto':$('#rltr_projecto').val(),
            'rltr_cooperativa':$('#rltr_cooperativa').val(),
            'rltr_escolhaPorData':$('#rltr_escolhaPorData').val()
        };
        $.post('ajax/relatorio/lista_relatorio.php', dados, function (retorna) {
            $(".resutadoRelatorio").html(retorna);
			stop_processar();
        });
    }
	function busca_relatorioFinanciamento(){
        var dados = {
            'rltr_projectoFinanc':$('select#rltr_projectoFinanc').val(),
            'rltr_distritoFinanc':$('#rltr_distritoFinanc').val(),
            'rltr_comunidadeFinanc':$('#rltr_comunidadeFinanc').val(),
            'rltr_escolhaPorDataFinanc':$('#rltr_escolhaPorDataFinanc').val(),
            'rltr_dataFinanc_inicial':$('#rltr_dataFinanc_inicial').val(),
            'rltr_dataFinanc_final':$('#rltr_dataFinanc_final').val(),
            'rltr_financ_actor':$('#rltr_financ_actor').prop('checked'),
            'rltr_financ_uni':$('#rltr_financ_uni').prop('checked'),
            'rltr_financ_com':$('#rltr_financ_com').prop('checked')
           
        };
        $.post('ajax/relatorio/lista_financiamento.php', dados, function (retorna) {
            $(".resutadoRelatorio").html(retorna);
			stop_processar();
        });
    }
		
function busca_relatorioMissao(){
		
		start_processar();
        var dados = {
           'rltr_categoriaDeslocacao':$('select#rltr_categoriaDeslocacao').val(),
           'rltr_paisDeslocacao':$('select#rltr_paisDeslocacao').val(),
           'rltr_dataMissao_inicia':$('#rltr_dataMissao_inicial').val(),
           'rltr_dataMissao_final':$('#rltr_dataMissao_final').val(),
        };
        $.post('ajax/relatorio/lista_relatorioMissao.php', dados, function (retorna) {
            $(".resutadoRelatorio").html(retorna);
			stop_processar();
        });
    }
    function busca_relatorioReqfundo(){
		
		start_processar();
        var dados = {
            
            'rltr_dataReqfundo_inicial':$('#rltr_dataReqfundo_inicial').val(),
            'rltr_dataReqfundo_final':$('#rltr_dataReqfundo_final').val()
           
        };
        $.post('ajax/relatorio/lista_relatorioReqfundo.php', dados, function (retorna) {
            $(".resutadoRelatorio").html(retorna);
			stop_processar();
        });
    }
	
	
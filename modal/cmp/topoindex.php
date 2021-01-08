<link rel="stylesheet" href="assets/plugins/bootstrap/css/bootstrap.css" />
<link rel="stylesheet" href="assets/css/main.css" />
<link rel="stylesheet" href="assets/css/MoneAdmin.css" />
<link rel="stylesheet" href="assets/plugins/Font-Awesome/css/font-awesome.css" />
<link href="assets/plugins/pace/pace-theme-big-counter.css" rel="stylesheet" />
<link rel="stylesheet" href="css/formulario.css" />

<!-- scrip para registo das entidades na base de dados-->
<link rel="stylesheet" href="css/formulario.css" />
<script src="js/jquery.min.js"></script>
<script src="js/janela.js"></script>
<script src="js/system.js">


</script>
<script src="js/formulario.js"></script>
<script src="js/uploader.js" type="text/javascript"></script>

<!-- fim de script para registo-->

<!-- Script para tabelas-->
<script src="assets/plugins/dataTables/jquery.dataTables.js"></script>
<link href="assets/plugins/dataTables/dataTables.bootstrap.css" rel="stylesheet" />
<!--END GLOBAL STYLES -->

<!-- Script para notificações-->
<link href="assets/plugins/gritter/css/jquery.gritter.css" rel="stylesheet" />

<link rel="stylesheet" href="assets/plugins/validationengine/css/validationEngine.jquery.css" />

<script type="text/javascript">
	function BuscaUser() {

		var pesquisa = document.getElementById("pesquisa").value;
		$(".resultados").html(pesquisa);
		var dados = {
			palavra: pesquisa
		};
		$.post('./ajax/BuscaUser.php', dados, function(retorna) {
			$(".resultados").html(retorna);
		});

	}

	function BuscaInst() {

		var pesquisa = document.getElementById("pesquisa").value;
		$(".resultados").html(pesquisa);
		var dados = {
			palavra: pesquisa
		};
		$.post('./ajax/BuscaInst.php', dados, function(retorna) {
			$(".resultados").html(retorna);
		});

	}

	function BuscaSistema() {

		var pesquisa = document.getElementById("pesquisa").value;
		$(".resultados").html(pesquisa);
		var dados = {
			palavra: pesquisa
		};
		$.post('./ajax/BuscaSistema.php', dados, function(retorna) {
			$(".resultados").html(retorna);
		});

	}

	function ListUser() {

		var dados = {
			'id': "id",
		};

		$.post('./ajax/ListUser.php', dados, function(retorna) {
			$(".resultados").html(retorna);
		});

	}

	function ListInst() {

		var dados = {
			'id': "id",
		};

		$.post('./ajax/ListInst.php', dados, function(retorna) {
			$(".resultados").html(retorna);
		});

	}

	function ListSis() {
		var dados = {
			'id': "id",
		};

		$.post('./ajax/ListSis.php', dados, function(retorna) {
			$(".resultados").html(retorna);
		});

	}

	function vermais(id, tipo) {
		var dados1 = {
			'id': id,
			'tipo': tipo
		};

		$.post('ajax/vermais.php', dados1, function(retorna) {
			$(".modalvermais").html(retorna);
		});
	}

</script>

<!-- HEADER SECTION -->
<nav class="navbar navbar-inverse navbar-fixed-top ">
	<a data-original-title="Show/Hide Menu" data-placement="bottom" data-tooltip="tooltip" class="accordion-toggle btn btn-primary btn-sm visible-xs" data-toggle="collapse" href="#menu" id="menu-toggle">
                    <i class="icon-align-justify"></i>
                </a>
	<!-- LOGO SECTION -->
	<header class="navbar-header" style="border:0px solid red;color:white;text-align: cnter;line-height: 300%;">

		<span target="1">
                    
		<center>       <b style="font-family: Times New Roman, Times, serif">Tribunal de Contas -Patrimonio</b>	</center>
		</span>

	</header>

	<!-- END LOGO SECTION -->

</nav>

<div class="modal fade" id="alert" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="myModalLabel">Acesso Negado</h4>
			</div>
			<div class="modal-body">
				Tu não tens permissão para aceder a essa informação
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Ok</button>
				<!--<button type="button" class="btn btn-primary">Save changes</button>-->
			</div>
		</div>
	</div>
</div>
<!-- END HEADER SECTION -->

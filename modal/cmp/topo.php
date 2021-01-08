<?php
require_once("../cmp/session.php")

?>


<link rel="stylesheet" href="assets/plugins/bootstrap/css/bootstrap.css" />
<link rel="stylesheet" href="assets/css/main.css" />
<link rel="stylesheet" href="assets/css/MoneAdmin.css" />
<link rel="stylesheet" href="assets/plugins/Font-Awesome/css/font-awesome.css" />
<link href="assets/plugins/pace/pace-theme-big-counter.css" rel="stylesheet" />
<link rel="stylesheet" href="css/formulario.css" />
<link rel="stylesheet" href="js/jquery-ui-themes-1.12.1/themes/south-street/jquery-ui.css">

<!-- scrip para registo das entidades na base de dados-->

<script src="../js/main.js" type="text/javascript"></script>
<script src="../js/alterar.js" type="text/javascript"></script>


<!-- fim de script para registo-->

<!-- Script para tabelas-->
<script src="assets/plugins/dataTables/jquery.dataTables.js"></script>
<link href="assets/plugins/dataTables/dataTables.bootstrap.css" rel="stylesheet" />
<!--END GLOBAL STYLES -->

<!-- Script para notificações-->
<link href="assets/plugins/gritter/css/jquery.gritter.css" rel="stylesheet" />

<link rel="stylesheet" href="assets/plugins/validationengine/css/validationEngine.jquery.css" />







<!-- HEADER SECTION -->
<nav class="navbar navbar-inverse navbar-fixed-top ">
	<a data-original-title="Show/Hide Menu" data-placement="bottom" data-tooltip="tooltip" class="accordion-toggle btn btn-primary btn-sm visible-xs" data-toggle="collapse" href="#menu" id="menu-toggle">
		<i class="icon-align-justify"></i>
	</a>
	<!-- LOGO SECTION -->
	<header class="navbar-header" style="border:0px solid red">

		<span target="1">
			<img src="../img/api.png" width="48" alt="" />
			<span class="sistem_name" style="color:black"><b>
SMS Sending System
			</b></span>
		</span>
		<a href='javascript:sair()' class="btn btn-danger" style="float: right; margin-right:5px;"><img src="../img/desligar.png" height="25" width="25"><b> Log out</b></a>
		<a href='javascript:alterar()' class="btn btn-default" style="float: right;margin-right:5px"><img src="../img/logado.png" height="25" width="25"><b> <b><?php echo "".$username ?></b></b></a>
	</header>

	<!-- END LOGO SECTION -->

</nav>



<div id="sairDialogo" title="API-Terminar Sessão" style="display:none">
	<p><b>Desejas sair do Sistema?</b></p>
	<div id="sairState" style="text-align:center"></div>
</div>

<div id="alterarDialogo" title="Alteração dos dados" style="display: none">
	<fieldset>

		<table style="width:100%">
			<tr>
				<td >
					<label>Nome de utilizador</label>
					<div class="form-group has-success">
						<input id="username_logged" type="text"  class="form-control" />
					</div>

				</td>
			</tr>

			<tr>
				<td>

					<label>Palavra passe</label>
					<div class="form-group has-success">
						<input id="password_logged" type="password" class="form-control" />

					</div>

				</td>
			</tr>
			<tr>
				<td>

					<label>Email</label>
					<div class="form-group has-success">

						<input id="email_logged" type="email" class="form-control" />

					</div>

				</td>
			</tr>
		</table>
	</fieldset>
	<div id="alterarState" style="text-align:center"></div>
</div>






<!-- END HEADER SECTION -->
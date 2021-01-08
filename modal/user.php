<?php
//echo "asdfds";
//@ob_start();

//Iniciar sessao do user de acordo com o seu nivel de acesso
//session_start();
?>

<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en">
<!--<![endif]-->
<!-- BEGIN HEAD-->

<head>

	<meta charset="UTF-8" />
	<title>API | USER </title>
	<meta content="width=device-width, initial-scale=1.0" name="viewport" />
	<meta content="" name="description" />
	<meta content="" name="author" />
	<script type="text/javascript" src="js/jascrip.js"></script>
	<script language="JavaScript" src="../js/user.js"></script>
			
	




	<!--[if IE]>
           <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
           <![endif]-->
</head>

<?php 
$pagina = "usuario"; ?>
<!-- END  HEAD-->
<!-- BEGIN BODY-->

<body class="padTop53">
	<!-- MAIN WRAPPER -->
	<div id="wrap" style="border:0px solid red;">
		<!-- HEADER SECTION -->
		<div id="top" style="border:0px solid red;">
			<?php require './cmp/topo.php'; ?>
		</div>
		<!-- END HEADER SECTION -->
		<!-- MENU SECTION -->
		<div id="left">
			<?php require './cmp/menu_lateral.php'; ?>
		</div>
		<!--END MENU SECTION -->

		<!--PAGE CONTENT -->
		<!--div id="left">
			<div id="left" style="position: fixed;">
				<br>
				<ul id="menu" class="collapse" style="font-size:16px">
					<li><a href="principal.php"> <i class="icon-home"></i> Início</a></li>
					<li><a href="#"><i class="icon-list"></i> Agricultor</a></li>
					<li><a href="projecto.php"><i class="icon-file"></i> Projectos</a></li>
					<li class="panel active"><a href="cooperativa.php"><i class="icon-user"></i> Cooperativa</a></li>
					<li><a href="empresas.php"><i class="icon-list-alt"></i> Empresas</a></li>
					<li><a href="parametro.php"><i class="icon-list-alt"></i> Parâmetros</a></li>
					<li><a href="utilizadores.php"><i class="icon-user"></i> Utilizadores</a></li>
					<li><a href="#"> <i class="icon-check"></i> Monitoramento</a></li>
				</ul>
			</div>
		</div-->
		<div id="content">
			<div class="inner" style="border:0px solid red;">
				<br>
				<h4><b>User Management Model</b></h4>
				<b><br>
				
				
			
					<a href="javascript:adicionar()" class="btn btn-primary" style="background-color:#2f4544;border:1px solid green;">

						<b>New user<b></a>
				</b>
				
				
				
				
	
				
				<div id="adicionarDialogo" title=" New username" style="display:none">
                                                <fieldset>
													<label>Username</label>
													<div class="form-group has-success" style='font-size:17px'>
													<input id="username_to_insert" type="text" class="form-control" />
													</div>
													<label>Password</label>
													<div class="form-group has-success" style='font-size:17px'>
													<input id="password_to_insert" type="password" class="form-control" />
													</div>
													<label>Email</label>
													<div class="form-group has-success" style='font-size:17px'>
													<input id="emai_to_insert" type="email" class="form-control" />
													</div>
                                                    <label>Access</label>
                                                    <p>Access 0 - Total Management</p>
													<p>Access 1 - Without managing users and parameters</p>
													<div class="form-group has-success" style='font-size:17px'>
													<input id="access_to_insert" type="text" class="form-control" />
													</div>

                                                </fieldset>
                                                <div id="adicionarState" style="text-align:center"></div>
                                            </div>

				<!-- aqui-->

				<div id="modificarDialogo" title="Alterar utilizador" style="display:none">
                                                <fieldset>
                                                    <input id="idToUpdate" type="hidden" />
                                                    <label>Username</label>
													<div class="form-group has-success" style='font-size:17px'>
                                                    <input id="usernameToUpdate" type="text" class="form-control" />
													</div>
                                                    <label>Password</label>
													<div class="form-group has-success" style='font-size:17px'>
                                                    <input id="passwordToUpdate" type="password" class="form-control" />
													</div>
                                                    <label>Email</label>
													<div class="form-group has-success" style='font-size:17px'>
                                                    <input id="emailToUpdate" type="email" class="form-control" />
													</div>
                                                    <label>Acess</label>
                                                    <p>Acess 0 - Total Management</p>
                                                    <p>Acesso 1 - Without managing users and parameters</p>
													<div class="form-group has-success" style='font-size:17px'>
                                                    <input id="accessToUpdate" type="text" class="form-control" />
													</div>
                                                </fieldset>
                                                <div id="modificarState" style="text-align:center"></div>
                                            </div>
				<!-- aqui-->

				<div id="eliminarDialogo" title="Delete Username" style="display:none">
                                                <fieldset>
                                                    <input id="idToRemove" type="hidden" />
                                                    <label>Username</label>
													<div class="form-group has-success" style='font-size:17px'>
                                                    <input id="usernameToRemove" type="text" disabled class="form-control" />
													</div>
												</fieldset>
                                                <div id="eliminarState" style="text-align:center"></div>
                                            </div>
	



				<!-- fim-->
				<br><br>
				<div id="" class="art-content-layout">
				<table id="dataTable" class="table table-striped table-bordered table-hover display">
                <thead>
                    <tr>
                      <th>Username</th>
					  <th>Email</th>
                      <th> Password</th>
                      <th>Acess</th>
                      <th><div class='span12' style='text-align:center'>Update</div></th>
                      <th><div class='span12' style='text-align:center'>Delete</div></th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
											</div>
			</div>
		</div>
	</div>
	<div id="footer">
		<?php include './cmp/footer.php'; ?>
	</div>

	<?php
	require('./cmp/import.php');
	?>
</body>
<!-- END BODY-->

</html>
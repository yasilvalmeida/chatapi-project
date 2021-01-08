
	<html lang="en">

<head>
	<meta charset="UTF-8">
	<title>API | Ínicio</title>
	<meta content="width=device-width, initial-scale=1.0" name="viewport">
	<meta content="" name="description">
	<meta content="" name="author" />
	<script type="text/javascript" src="http://code.jquery.com/jquery-1.7.1.min.js"></script>
	<script type="text/javascript" src="js/jascrip.js"></script>
	
	<style>
		.testeid_:hover {
		opacity: 0.5;
	
		}

		#container {
			width: 100%;
			border-color: blue;
			text-align: center;
		}

		.box {
			float: left;
			width: 22%;
			height: 45%;
			margin: 7px 7px;
		}


	</style>

<body class="padTop53">
	<div id="wrap" style="border:0px solid red;">
		<div id="top" style="border:0px solid red;">
		<?php require 'cmp/topo.php';
		$pagina="inicio";?>
	</div>
		<div id="left"><?php require 'cmp/menu_lateral.php';?></div>
		<div id="content" style="">
			<div class="inner" >
				<center><br>
					<h3><b>Welcome API SMS</b></h3><br>
					<br><br><div id="container" style="margin: 0px 0px 0px 15px">
					<img width="200" height="200" alt="" src="../img/api.png" style="border: 3px solid green">
					<!--<	<div id="box-1" class="box" style="border: 0px solid red;font-family: Times New Roman, Times, serif;font-size: 26px;"><a class="testeid_" href="piso0.php"><img width="160" height="150" alt="" src="img/edi.PNG"></a><br></div>
						div id="box-2" class="box" style="border: 0px solid red;font-family: Times New Roman, Times, serif;font-size: 26px;"><a href="#"><img width="160" height="150" alt="" class="testeid_" src="../img/piso1.jpg"></a></div>
						<div id="box-3" class="box" style="border: 0px solid red;font-family: Times New Roman, Times, serif;font-size: 26px;"><a href="#"><img width="160" height="150" alt="" class="testeid_" src="../img/piso2.jpg"></a></div>
						<div id="box-3" class="box" style="border: 0px solid red;font-family: Times New Roman, Times, serif;font-size: 26px;"><a href="#"><img width="160" height="150" alt="" class="testeid_" src="../img/piso4.jpg"></a></div>
					-->
					</div><br>
					<h4 style="font-family: Times New Roman, Times, serif;"><b></h4>
				</center>
			</div>
		</div>
	</div>
	<div id="footer">
	<?php include 'cmp/footer.php';?>
	<?php require('cmp/import.php');?>
</div>
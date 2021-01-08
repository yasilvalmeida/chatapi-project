<?php 
$ative_menu_principal="";$ative_menu_agricultor="";$ative_menu_projecto="";$ative_menu_cooperativa="";
$ative_menu_empresa="";$ative_menu_parametro="";$ative_menu_parametro="";$ative_menu_associacao="";$ative_menu_utilisador="";$ative_lista_actor="";
$ative_menu_ong="";
 switch($pagina){
	case "inicio":
	$ative_menu_principal="active"; break;
 case "cumunidade":
	$ative_menu_agricultor="active"; break;
 case "projecto":
	$ative_menu_projecto="active"; break;
 case "cooperativa":
	$ative_menu_cooperativa="active"; break;
 case "empresa":
	$ative_menu_empresa="active"; break;
	case "associacao":
	$ative_menu_associacao="active"; break;
case "parametro":
	$ative_menu_parametro="active"; break;
case "utilizador":
	$ative_menu_utilisador="active"; break;
	case "lista":
	$ative_lista_actor="active"; break;
case "ong":
	$ative_menu_ong="active"; break;
 }
?>
<ul id="menu" class="collapse" style="font-size:15px">
 <li class="<?php echo $ative_menu_principal; ?>"><a href="main.php"> <i class="icon-home"></i>
Home page</a></li>
<?php
if($access==0){
echo ' <li class="<?php echo $ative_menu_projecto; ?>"><a href="user.php"><img src="../img/logado.png" height="20" width="20"> User </a></li>';
echo ' <li class="<?php echo $ative_menu_projecto; ?>"><a href="#"><i class="icon-file"></i> Report </a></li>';
}
?>
 <li class="<?php echo $ative_menu_projecto; ?>"><a href="#"><i class="icon-file"></i> Contact</a></li>
 <li class="<?php echo $ative_menu_projecto; ?>"><a href="#"><i class="icon-file"></i> Instance</a></li>
 <li class="<?php echo $ative_menu_projecto; ?>"><a href="#"><i class="icon-file"></i> Group</a></li>

 
	<!--
	<li class="<?php //echo $ative_menu_empresa; ?>"><a href="empresas.php"><i class="icon-user"></i> Empresa Agrícola</a></li>
	<li class="<?php //echo $ative_menu_ong; ?>"><a href="ong.php"><i class="icon-user"></i> Parceiros</a></li>
	<li class="<?php //echo $ative_menu_cooperativa; ?>"><a href="cooperativa.php"><i class="icon-user"></i> Cooperrativa</a></li>
	<li class="<?php //echo $ative_menu_associacao; ?>"><a href="associacao.php"><i class="icon-user"></i> Associação</a></li>
	<!--li class="<?php //echo $ative_menu_parametro; ?>" data-parent="#menu" data-toggle="collapse" class="accordion-toggle" data-target="#blank-nav1">
		<a href="#"><i class="icon-list-alt"></i> Parâmetros
			<span class="pull-right">
                <i class="icon-angle-down"></i>
            </span>
		</a>
		<ul class="collapse" id="blank-nav1">
            <li><a href="projecto.php" ><i class="icon-angle-right"></i> Projectos 
			&nbsp; <span class="label label-success">8</span>&nbsp;
			</a></li>
            <li><a href="reservas_resid.php" ><i class="icon-angle-right"></i> Residencia
			&nbsp; <span class="label label-success">3</span>&nbsp;
			</a></li>
        </ul>
	</li
	<li class="<?php //echo $ative_lista_actor; ?>"><a href="lista_actor.php"><i class="icon-user"></i> Ver Todos Agricultor</a></li>
	<li class="<?php //echo $ative_menu_utilisador; ?>"><a href="utilizadores.php"><i class="icon-user"></i> Utilizadores</a></li>
	<li class=""><a href="relatorio.php"> <i class="icon-check"></i> Relatorio</a></li> -->
</ul>

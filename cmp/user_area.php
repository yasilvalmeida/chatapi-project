<ul class="nav-right">
                           
                            <li class="user-profile header-notification">
                                <a href="#!">
                                    <img src="img/logado.png" class="img-radius" alt="User-Profile-Image">
                                    <b><span><?php echo "".$email?></span></b>
                                    <i class="ti-angle-down"></i>
                                </a>
                                <ul class="show-notification profile-notification">
                                    <li>
                                    <a href="javascript:loadLoggedUserInfo()" class="dropdown-item" data-toggle="modal" data-target="#change_modal">
                <i class="ti-user"></i>Alterar minhas informações
            </a>
                                    </li>
                                    <li>
                                        <a href="javascript:sair()">
                                            <i class="ti-layout-sidebar-left"></i>
                                             Logout
                                        </a>
                                    </li>
                                    <!--<li>
                                        <a href="#">
                                            <i class="ti-email"></i> My Messages
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i class="ti-lock"></i> Lock Screen
                                        </a>
                                    </li>
                                    <li>
                                        <a href="auth-normal-sign-in.html">
                                            <i class="ti-layout-sidebar-left"></i> Logout
                                        </a>
                                    </li>-->
                                </ul>
                            </li>
                        </ul>
     <div id="sairDialogo" title="DADA-Terminar Sessão" style="display:block" style="top: 489.422px" >
	<p><b>Desejas sair do Sistema?</b></p>
	<div id="sairState" style="text-align:center"></div>
</div>






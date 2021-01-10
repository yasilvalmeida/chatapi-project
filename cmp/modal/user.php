<!-- Modals -->
<!-- Add Modal-->
<div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Adicionar novo utilizador</h5>
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <form class="user">
                    <div class="form-group">
                        <input id="email_add" type="email" class="form-control form-control-user" placeholder="Email"/>
                    </div>
                    <div class="form-group">
                        <input id="username_add" type="text" class="form-control form-control-user" placeholder="Utilizador"/>
                    </div>
                    <div class="form-group">
                        <input id="password_add" type="password" class="form-control form-control-user" placeholder="Palavra Passe"/>
                    </div>
                    <div class="form-group">
                        <input id="access_add" type="number" min="0" max="1" class="form-control form-control-user" placeholder="Acesso"/>
                    </div>
                    <hr />
                    <p><b>Acesso 0:</b> Acesso Geral</p>
                    <p><b>Acesso 1:</b> Acesso restrito sem gestão de utilizadores</p>
                    <hr />
                    <div id="insert_state" class="" role="alert">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-danger" type="button" data-dismiss="modal">Cancelar</button>
                <a class="btn btn-success" href="javascript:insert()">Save</a>
            </div>
        </div>
    </div>
</div>
<!-- Upd Modal-->
<div class="modal fade" id="updModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Alterar utilizador</h5>
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <form class="user">
                    <div class="form-group">
                        <input id="id_upd" type="hidden" class="form-control form-control-user" />
                    </div>
                    <div class="form-group">
                        <label>Email </label>
                        <input id="email_upd" type="email" class="form-control form-control-user" />
                    </div>
                    <div class="form-group">
                        <label>Username </label>
                        <input id="username_upd" type="text" class="form-control form-control-user" />
                    </div>
                    <div class="form-group">
                        <label>Password </label>
                        <input id="password_upd" type="password" class="form-control form-control-user" />
                    </div>
                    <div class="form-group">
                        <label>Acesso </label>
                        <input id="access_upd" type="number" min="0" max="1" class="form-control form-control-user" />
                    </div>
                    <hr />
                    <p><b>Access 0:</b> Admin</p>
                    <p><b>Access 1:</b> User</p>
                    <hr />
                    <div id="update_state"  class="d-flex justify-content-center" role="alert">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-danger" type="button" data-dismiss="modal">Cancelar</button>
                <a class="btn btn-success" href="javascript:updateAsync()">Alterar</a>
            </div>
        </div>
    </div>
</div>
<!-- Del Modal-->
<div class="modal fade" id="delModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Eliminar utilizador</h5>
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div id="delModalBody" class="modal-body"></div>
            <div class="modal-footer">
                <button class="btn btn-danger" type="button" data-dismiss="modal">Cancelar</button>
                <a class="btn btn-success" href="javascript:removeAsync()">Eliminar</a>
            </div>
        </div>
    </div>
</div>
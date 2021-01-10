<!-- Logout Modal-->
<div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="logoutModalLabel">Terminar sessão!</h5>
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
        <div class="modal-body">Deseja terminar sua sessão?</div>
        <hr />
        <div id="exit_state" class="d-flex justify-content-center" role="alert"></div>
            <div class="modal-footer">
                <button class="btn btn-secondary" type="button" data-dismiss="modal">Não</button>
                <a class="btn btn-danger" href="javascript:exit()">Sim</a>
            </div>
        </div>
    </div>
</div>
<!-- User Modal-->
<div class="modal fade" id="userModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="userModalLabel">Alterar meus dados</h5>
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <form class="user">
                    <div div class="form-group">
                        <input id="email_changed" type="email" class="form-control form-control-user" />
                    </div>
                    <div class="form-group">
                        <input id="username_changed" type="text" class="form-control form-control-user" />
                    </div>
                    <div class="form-group">
                        <input id="password_changed" type="password" class="form-control form-control-user" />
                    </div>
                    <div class="form-group">
                        <input id="access_changed" type="number" class="form-control form-control-user" />
                    </div>
                    <hr />
                    <div id="update_state" class="d-flex justify-content-center" role="alert">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                <a class="btn btn-primary" href="javascript:change_user()">Save</a>
            </div>
        </div>
    </div>
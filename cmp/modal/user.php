<!-- Modals -->
<!-- Add Modal-->
<div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Add new user</h5>
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
                        <input id="username_add" type="text" class="form-control form-control-user" placeholder="Username"/>
                    </div>
                    <div class="form-group">
                        <input id="password_add" type="password" class="form-control form-control-user" placeholder="Password"/>
                    </div>
                    <div class="form-group">
                        <input id="access_add" type="number" min="0" max="1" class="form-control form-control-user" placeholder="Access"/>
                    </div>
                    <hr />
                    <p><b>Access 0:</b> Admin</p>
                    <p><b>Access 1:</b> Restricted access without user management</p>
                    <hr />
                    <div id="insert_state" class="d-flex justify-content-center" role="alert">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-danger" type="button" data-dismiss="modal">Cancel</button>
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
                <h5 class="modal-title">Update user</h5>
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
                        <label>Access </label>
                        <input id="access_upd" type="number" min="0" max="1" class="form-control form-control-user" />
                    </div>
                    <hr />
                    <p><b>Access 0:</b> Admin</p>
                    <p><b>Access 1:</b> Restricted access without user management</p>
                    <hr />
                    <div id="update_state"  class="d-flex justify-content-center" role="alert">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-danger" type="button" data-dismiss="modal">Cancel</button>
                <a class="btn btn-success" href="javascript:updateAsync()">Update</a>
            </div>
        </div>
    </div>
</div>
<!-- Del Modal-->
<div class="modal fade" id="delModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Delete user</h5>
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div id="delModalBody" class="modal-body"></div>
            <div class="modal-footer">
                <button class="btn btn-danger" type="button" data-dismiss="modal">Cancel</button>
                <a class="btn btn-success" href="javascript:removeAsync()">Delete</a>
            </div>
        </div>
    </div>
</div>
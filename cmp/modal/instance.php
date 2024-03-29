<!-- Modals -->
<!-- Add Modal-->
<div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Insert new instance</h5>
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <form class="user">
                    <div class="form-group">
                        <input id="instance_add" type="text" class="form-control form-control" placeholder="Instance"/>
                    </div>
                    <div class="form-group">
                        <input id="token_add" type="text" class="form-control form-control" placeholder="Token"/>
                    </div>
                    <div class="form-group">
                        <select id='user_add' class='form-control'>
                        </select>
                    </div>
                    <hr />
                    <div id="insert_state" class="d-flex justify-content-center"  role="alert">
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
                <h5 class="modal-title">Update instance</h5>
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <form class="user">
                    <div class="form-group">
                        <input id="id_upd" type="hidden" class="form-control form-control" />
                    </div>
                    <div class="form-group">
                        <label>Instance </label>
                        <input id="instance_upd" type="text" class="form-control form-control" />
                    </div>
                    <div class="form-group">
                        <label>Token </label>
                        <input id="token_upd" type="text" class="form-control form-control" />
                    </div>
                    <div class="form-group">
                        <label>Old Username</label>
                        <input id="user_old_upd" disabled type="text" class="form-control form-control" />
                        <input id="user_old_id_upd" type="hidden" class="form-control form-control" />
                    </div>
                    <div class="form-group">
                    <label>New Username</label>
                        <select id='user_new_upd' class='form-control'>
                        </select>
                    </div>
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
                <h5 class="modal-title">Remove instance</h5>
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
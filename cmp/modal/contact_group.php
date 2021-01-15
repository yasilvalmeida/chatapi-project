<!-- Modals -->
<!-- Add Modal-->
<div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
        <div class="modal-header">
                <h5 class="modal-title">Add new  Contact </h5>
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <form class="user">

                    <div class="form-group">
                        <label>Name of Contact</label>
                        <input id="name_contact" type="text" class="form-control form-control"  disabled/>
                        <input id="id_contact" type="text" class="form-control form-control" />
                    </div>
                    <div class="form-group">
                        <label>Phone of Number</label>
                        <input id="phone_manber" type="text" class="form-control form-control" disabled />
                    </div>
                    <hr />
                    <div id="insert_state" class="d-flex justify-content-center" role="alert">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-danger" type="button" data-dismiss="modal">Cancel</button>
                <a class="btn btn-success" href="javascript:insertAsync_group()">Add</a>
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
                        <label>URL </label>
                        <input id="url_upd" type="text" class="form-control form-control" />
                    </div>
                    <div class="form-group">
                        <label>Token </label>
                        <input id="token_upd" type="text" class="form-control form-control" />
                    </div>
                    <div class="form-group">
                        <label>Usermane Old </label>
                        <input id="user_old" type="text" class="form-control form-control" />
                        <input id="user_old_id" type="hidden" class="form-control form-control" />
                    </div>
                    <div class="form-group">
                        <label>New Usermane</label>
                        <select id='user_new' class='form-control'>
                        </select>
                    </div>

                    <div id="update_state" class="d-flex justify-content-center" role="alert">
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
                <h5 class="modal-title">Delete instance</h5>
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
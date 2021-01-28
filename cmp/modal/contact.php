<!-- Modals -->
<!-- Migrate Modal-->
<div class="modal fade" id="migrateModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Migrate contacts</h5>
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <form class="user">
                    <div class="form-group">
                        <label for="from_mgt">From instance</label>
                        <select id='from_mgt' class='form-control'>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="to_mgt">To instance</label>
                        <select id='to_mgt' class='form-control'>
                        </select>
                    </div>
                    <hr/>
                    <div id="migrate_state" class="d-flex justify-content-center" role="alert">
                    </div>
                </form>
            </div>
            <div id="migrate_button" class="modal-footer">
                <button class="btn btn-danger" type="button" data-dismiss="modal">Cancel</button>
                <a class="btn btn-success" href="javascript:migrate()">Migrate</a>
            </div>
        </div>
    </div>
</div>
<!-- Import Modal-->
<div class="modal fade" id="importModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Import contacts from CSV</h5>
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <form class="user">
                    <div class="form-group">
                        <label for="file_irt">CSV file</label>
                        <input id="file_irt" type="file" accept=".csv" class="form-control form-control" />
                    </div>
                    <div class="form-group">
                        <label for="instance_irt">Instance</label>
                        <select id='instance_irt' class='form-control'>
                        </select>
                        <input id="nContacts" type="hidden" value="0" />
                        <input id="nTotal" type="hidden" value="0" />
                    </div>
                    <hr/>
                    <div id="import_state" class="d-flex justify-content-center" role="alert">
                    </div>
                    <hr />
                    <div class="form-group" id="process" style="display:none;">
                        <div class="progress">
                            <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuemin="0" aria-valuemax="100">
                                <span id="process_data">0</span><!--  - <span id="total_data">0</span> -->
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div id="import_button" class="modal-footer">
                <button class="btn btn-danger" type="button" data-dismiss="modal">Cancel</button>
                <a class="btn btn-success" href="javascript:importCSV()">Import</a>
            </div>
        </div>
    </div>
</div>
<!-- Add Modal-->
<div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Insert new contact</h5>
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <form class="user">
                    <div class="form-group">
                        <input id="name_add" type="text" class="form-control form-control" placeholder="Name" />
                    </div>
                    <div class="form-group">
                        <input id="phone_add" type="text" class="form-control form-control" placeholder="Phone number" />
                    </div>
                    <div class="form-group">
                        <label for="instance_add">Instance</label>
                        <select id='instance_add' class='form-control'>
                        </select>
                    </div>
                    <hr/>
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
                <h5 class="modal-title">Update contact</h5>
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
                        <label>Name </label>
                        <input id="name_upd" type="text" class="form-control form-control" />
                    </div>
                    <div class="form-group">
                        <label>Phone </label>
                        <input id="phone_upd" type="text" class="form-control form-control" />
                    </div>
                    <div class="form-group">
                        <label>Old Instance</label>
                        <input id="instance_old_upd" disabled type="text" class="form-control form-control" />
                        <input id="instance_old_id_upd" type="hidden" class="form-control form-control" />
                    </div>
                    <div class="form-group">
                    <label>New Instance</label>
                        <select id='instance_new_upd' class='form-control'>
                        </select>
                    </div>
                    <hr />
                    <div id="update_state"  class="d-flex justify-content-center" role="alert"></div>
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
                <h5 class="modal-title">Remove contact</h5>
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
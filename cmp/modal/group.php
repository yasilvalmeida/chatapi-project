<!-- Modals -->
<!-- Add Modal-->
<div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Insert new Group</h5>
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
                        <label for="instance_add">Instance</label>
                        <select id='instance_add' class='form-control'>
                        </select>
                    </div>
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
<!-- Add 250 Modal-->
<div class="modal fade" id="add250Modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Insert new 250 Group</h5>
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <form class="user">
                    <div class="form-group">
                        <input id="name_add250" type="text" class="form-control form-control" placeholder="Name" />
                        <input id="nTotal" type="hidden" value="" />
                    </div>
                    <div class="form-group">
                        <label for="instance_add250">Instance</label>
                        <select id='instance_add250' class='form-control'>
                        </select>
                    </div>
                    <hr />
                    <div id="insert250_state" class="d-flex justify-content-center" role="alert">
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
            <div id="insert250_button" class="modal-footer">
                <button class="btn btn-danger" type="button" data-dismiss="modal">Cancel</button>
                <a class="btn btn-success" href="javascript:insert250()">Save</a>
            </div>
        </div>
    </div>
</div>
<!-- Sync Modal-->
<div class="modal fade" id="syncModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Sync with WhatsApp</h5>
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <form class="user">
                    <div id="sync_state" class="d-flex justify-content-center" role="alert">
                    </div>
                </form>
            </div>
            <div id="sync_button" class="modal-footer">
                <button class="btn btn-danger" type="button" data-dismiss="modal">Cancel</button>
                <a class="btn btn-success" href="javascript:syncWithWhatsApp()">Sync</a>
            </div>
        </div>
    </div>
</div>
<!-- View Modal-->
<div class="modal fade" id="viwModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">View Group</h5>
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <form class="user">
                    <div class="form-group">
                        <label>Name</label>
                        <input id="name_viw" type="text" disabled class="form-control form-control" />
                    </div>
                    <div class="form-group">
                        <label>Chat ID</label>
                        <input id="chat_id_viw" type="text" disabled class="form-control form-control" />
                    </div>
                    <div class="form-group">
                        <label>Link</label>
                        <input id="link_viw" type="text" disabled class="form-control form-control" />
                    </div>
                    <div class="form-group">
                        <label>Instance</label>
                        <input id="instance_viw" type="text" disabled class="form-control form-control" />
                    </div>
                    <hr />
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" type="button" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
<!-- Del Modal-->
<div class="modal fade" id="delModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Remove group</h5>
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
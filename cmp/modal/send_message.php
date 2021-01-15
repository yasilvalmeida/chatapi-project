<!-- Modals -->
<!-- Add Modal-->
<style>
    .chat-header-button {
        background: transparent none repeat scroll 0 0;
        border: 1px solid red;
        border-radius: 7px;
        font-size: 15px;
        height: 26px;
        opacity: 0.9;
        padding: 0;
        text-align: center;
        width: 26px;
    }
</style>
<div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title"> Send New Message</h5>
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <form class="user">
                    <div class="form-group">
                        <label>ALL URL + TOKEN</label>
                        <select id='id_allcontact' class='form-control' onchange="javascript:selectContact()">
                            <!--   <select id='id_allcontact' class='form-control' onchange="javascript:selectContact()">-->
                        </select>
                    </div>
                    <div class="form-group">

                        <label>Message</label>
                        <textarea id="id_message" class="form-control" rows="4" cols="50" placeholder="Type a message"></textarea>
                    </div>
                    <hr />
                    <label for="file" class="form-label"><img src="assets/img/camera.png" width="60" height="60"></label>
                    <input class="form-control" type="file" id="file" style="display:none" />
                    <label for="filepdf" class="form-label"><img src="assets/img/pdf.png" width="43" height="40"></label>
                    <input class="form-control" type="file" id="filepdf" style="display:none" />
                    <br>
                    <center>
                        <input type="radio" name="gender" id="radio_all_contact">&nbsp;&nbsp;Contact&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="radio" name="gender" id="radio_all_group">&nbsp;&nbsp; Group&nbsp;&nbsp;&nbsp;
                    </center>
                    <div class="form-group">
                        <select id='id_allcontact_instance' class='form-control' style="display:none;" >
                            <!--   <select id='id_allcontact' class='form-control' onchange="javascript:selectContact()">-->
                        </select>
                    </div>

                    <div class="form-group">
                        <select id='id_allgroup_instance' class='form-control' style="display:none;" >
                            <!--   <select id='id_allcontact' class='form-control' onchange="javascript:selectContact()">-->
                        </select>
                    </div>
                    <div id="insert_state" class="d-flex justify-content-center" role="alert">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-danger" type="button" data-dismiss="modal">Cancel</button>
                <a class="btn btn-success" href="javascript:insert()">Send</a>
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
                        <label>Number </label>
                        <input id="number_upd" type="text" class="form-control form-control" />
                    </div>
                    <hr />
                    <div id="update_state" class="d-flex justify-content-center" role="alert"></div>
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
                <h5 class="modal-title">Delete contact</h5>
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
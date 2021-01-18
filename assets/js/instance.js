var instance_data_table;
$(() => {
    instance_data_table = $("#dataTable").DataTable({
        processing: true,
        serverSide: false,
        order: [],
        ajax: {
            url: "api/api.php?action=fetchAllInstance",
            type: "POST",
            data: {},
        },
        oLanguage: {
            sSearch: "Search for <i class='fa fa-search'></i>",
            oPaginate: {
                sFirst: "First", // This is the link to the first page
                sPrevious: "<i class='fas fa-arrow-circle-left'></i> Previous", // This is the link to the previous page
                sNext: "Next <i class='fas fa-arrow-circle-right'></i>", // This is the link to the next page
                sLast: "Last", // This is the link to the last page
            },
        },
        columnDefs: [{ orderable: false, targets: [1, 3, 4] }],
    });
    /* This function will update the text in the tips div the the text and the css */
    updateTips = (tips, t) => {
        tips.html(t).addClass("alert-danger");
        setTimeout(function() {
            tips.removeClass("alert-danger", 1500);
        }, 2000);
    };
    checkLength = (o, n, min, max, tips) => {
        if (o.val().length > max || o.val().length < min) {
            o.addClass("alert-danger");
            o.focus();
            updateTips(
                tips,
                "The length of" + n + " must be between " + min + " and " + max + "."
            );
            return false;
        } else {
            return true;
        }
    };
    checkRegexp = (o, regexp, n, tips) => {
        if (!regexp.test(o.val())) {
            o.addClass("alert-danger");
            o.focus();
            updateTips(tips, n);
            return false;
        } else {
            return true;
        }
    };
    $("#addModal").on("show.bs.modal", () => {
        var tips = $("#user_add");
        tips.html("<img src='assets/img/loader.gif' />");
        $.post("api/api.php?action=fetchAllUserSelect", {},
            (data, status) => {
                if (status == "success") {
                    try {
                        let html = '<option value="-1">Select</option>';
                        const users = JSON.parse(data);
                        users.map((user, i) => {
                            html += '<option value="' + user.id + '">' + user.username + '</option>';
                        });
                        $("#user_add").html(html);
                    } catch (error) {
                        updateTips(tips, error);
                    }
                } else {
                    updateTips(tips, data);
                }
            }
        );
    });
});
/* This function will update the text in the tips div the the text and the css */
updateTips = (tips, t) => {
    tips.html(t).addClass("alert-danger");
    setTimeout(function() {
        tips.removeClass("alert-danger", 1500);
    }, 2000);
};
checkLength = (o, n, min, max, tips) => {
    if (o.val().length > max || o.val().length < min) {
        o.addClass("alert-danger");
        o.focus();
        updateTips(
            tips,
            "The longth of" + n + " must be between " + min + " e " + max + "."
        );
        return false;
    } else {
        return true;
    }
};
checkRegexp = (o, regexp, n, tips) => {
    if (!regexp.test(o.val())) {
        o.addClass("alert-danger");
        o.focus();
        updateTips(tips, n);
        return false;
    } else {
        return true;
    }
};

function insert() {
    var instance_add = $("#instance_add"),
        token_add = $("#token_add"),
        userId = $("#user_add option:selected").val(),
        tips = $("#insert_state");
    tips.removeClass("alert-danger").addClass("alert-light");
    if (instance_add.val() == "") {
        updateTips(tips, "Please fill in the instance");
        instance_add.focus();
    } else if (token_add.val() == "") {
        updateTips(tips, "Please fill in the token");
        token_add.focus();
    } 
    else if (userId == -1) {
        updateTips(tips, "Please select a user");
        userId.focus();
    } 
    else {
        insertAsync();
    }
}

function insertAsync() {
    var tips = $("#insert_state");
    const userId = $("#user_add option:selected").val();
    tips.addClass("alert-light");
    tips.html("<img src='assets/img/loader.gif' />");
    $.post("api/api.php?action=insertInstance", 
    {
        instance: $("#instance_add").val(),
        token: $("#token_add").val(),
        user_id: userId
    },
    (data, status) => {
        if (status == "success") {
            try {
                var r = JSON.parse(data);
                if (parseInt(r.result) != NaN && parseInt(r.result) == 1) {
                    tips.html("Successfully registered");
                    $("#addModal").modal("hide");
                    clear_form();
                    instance_data_table.ajax.reload();
                } else {
                    updateTips(tips, r.result);
                }
            } catch (error) {
                updateTips(tips, error);
            }
        } else {
            updateTips(tips, data);
        }
    });
}

function update(instance) {
    var tips = $("#update_state");
    $("#id_upd").val(instance.id);
    $("#instance_upd").val(instance.instance);
    $("#token_upd").val(instance.token);
    $("#user_old_upd").val(instance.username);
    $("#user_old_id_upd").val(instance.user_id);
    tips.addClass("alert-light");
    var tips = $("#user_new_upd");
    tips.html("<img src='assets/img/loader.gif' />");
    $.post("api/api.php?action=fetchAllUserSelect", {},
        (data, status) => {
            if (status == "success") {
                try {
                    let html = '<option value="-1">Select</option>';
                    const users = JSON.parse(data);
                    users.map((user, i) => {
                        html += '<option value="' + user.id + '">' + user.username + '</option>';
                    });
                    tips.html(html);
                } catch (error) {
                    updateTips(tips, error);
                }
            } else {
                updateTips(tips, data);
            }
        }
    );
    $("#updModal").modal("show");
}

function updateAsync() {
    var user_new = $("#user_new_upd option:selected").val();
    var user_id;
    if (user_new == -1) {
        user_id = $("#user_old_id_upd").val();
    } else {
        user_id = user_new;
    }
    var tips = $("#update_state");
    tips.addClass("alert-light");
    tips.html("<img src='assets/img/loader.gif' />");
    $.post(
        "api/api.php?action=updateInstance", {
            id: $("#id_upd").val(),
            instance: $("#instance_upd").val(),
            token: $("#token_upd").val(),
            user_id: user_id
        },
        (data, status) => {
            if (status == "success") {
                try {
                    var r = JSON.parse(data);
                    if (parseInt(r.result) != NaN && parseInt(r.result) == 1) {
                        tips.html("Successfully updated!");
                        $("#updModal").modal("hide");
                        clear_form();
                        instance_data_table.ajax.reload();
                    } else {
                        updateTips(tips, r.result);
                    }
                } catch (error) {
                    updateTips(tips, error);
                }
            } else {
                updateTips(tips, data);
            }
        }
    );
}

function remove(id) {
    var tips = $("#remove_state");
    $("#delModalBody").html("<p>Do you want to delete this record?</p><input id='id_del' type='hidden' /><div id='remove_state' class='d-flex justify-content-center' role='alert'></div >");
    $("#id_del").val(id);
    tips.addClass("alert-light");
    $("#delModal").modal("show");
}

function removeAsync() {
    var tips = $("#remove_state");
    tips.addClass("alert-light");
    tips.html("<img src='assets/img/loader.gif' />");
    $.post(
        "api/api.php?action=removeInstance", {
            id: $("#id_del").val(),
        },
        (data, status) => {
            if (status == "success") {
                try {
                    var r = JSON.parse(data);
                    if (parseInt(r.result) != NaN && parseInt(r.result) == 1) {
                        tips.html("Successfully removed!");
                        $("#delModal").modal("hide");
                        clear_form();
                        instance_data_table.ajax.reload();
                    } else {
                        updateTips(tips, r.result);
                    }
                } catch (error) {
                    updateTips(tips, error);
                }
            } else {
                updateTips(tips, data);
            }
        }
    );
}
// Reset all input form
function clear_form() {
    /* Insert */
    $("#instance_add").val("");
    $("#token_add").val("");
    $("#insert_state").removeClass("alert-success");
    $("#insert_state").addClass("alert-light");
    $("#insert_state").html("");
    /* Update */
    $("#token_upd").val("");
    $("#password_upd").val("");
    $("#update_state").removeClass("alert-success");
    $("#update_state").addClass("alert-light");
    $("#update_state").html("");
    /* Remove */
    $("#id_to_remove").val("");
    $("#remove_state").removeClass("alert-success");
    $("#remove_state").html("");
}
$("#remove_state").addClass("alert-light");
$("#remove_state").html("");
$("#remove_state").html("");
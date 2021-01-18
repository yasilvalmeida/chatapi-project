var instance_data_table;
$(() => {
    instance_data_table = $("#dataTable").DataTable({
        processing: true,
        serverSide: false,
        order: [],
        ajax: {
            url: "api/api.php?action=fetchAllContact",
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
        var tips = $("#instance_add");
        tips.html("<img src='assets/img/loader.gif' />");
        $.post("api/api.php?action=fetchAllInstanceSelect", {},
            (data, status) => {
                if (status == "success") {
                    try {
                        let html = '<option value="-1">Select</option>';
                        const intance = JSON.parse(data);
                        intance.map((intance, i) => {
                            html += '<option value="' + intance.id + '">' + intance.instance + '</option>';
                        });
                        $("#instance_add").html(html);
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
            "The longitude of" + n + " must be between " + min + " e " + max + "."
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
    var name_add = $("#name_add"),
        phone_add = $("#phone_add"),
        instance_id = $("#instance_add option:selected").val(),
        tips = $("#insert_state");
    tips.removeClass("alert-danger").addClass("alert-light");
    if (name_add.val() == "") {
        updateTips(tips, "Please fill in the name");
        name_add.focus();
    } else if (phone_add.val() == "") {
        updateTips(tips, "Please fill in the phone");
        phone_add.focus();
    } else if (instance_id == -1) {
        updateTips(tips, "Please select a instance");
        instance_id.focus();
    } else {
        insertAsync();
    }
}

function insertAsync() {
    var tips = $("#insert_state");
    var instance_id = $("#instance_add option:selected").val();
    tips.addClass("alert-light");
    tips.html("<img src='assets/img/loader.gif' />");
    $.post("api/api.php?action=insertContact", 
    {
        phone: $("#phone_add").val(),
        name: $("#name_add").val(),
        instance_id: instance_id
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

function update(contact) {
    var tips = $("#update_state");
    $("#id_upd").val(contact.id);
    $("#name_upd").val(contact.name);
    $("#phone_upd").val(contact.phone);
    $("#instance_old_upd").val(contact.instance);
    $("#instance_old_id_upd").val(contact.instance_id);
    tips.addClass("alert-light");
    $("#instance_new_upd").html("<img src='assets/img/loader.gif' />");
    $.post("api/api.php?action=fetchAllInstanceSelect", {},
        (data, status) => {
            if (status == "success") {
                try {
                    let html = '<option value="-1">Select</option>';
                    const instances = JSON.parse(data);
                    instances.map((instance, i) => {
                        html += '<option value="' + instance.id + '">' + instance.instance + '</option>';
                    });
                    $("#instance_new_upd").html(html);
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
    var instance_new = $("#instance_new_upd option:selected").val();
    var instance_id;
    if (instance_new == -1) {
        instance_id = $("#instance_old_id_upd").val();
    } else {
        instance_id = instance_new;
    }
    var tips = $("#update_state");
    tips.addClass("alert-light");
    tips.html("<img src='assets/img/loader.gif' />");
    $.post("api/api.php?action=updateContact", 
    {
        id: $("#id_upd").val(),
        name: $("#name_upd").val(),
        phone: $("#phone_upd").val(),
        instance_id: instance_id
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
    });
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
        "api/api.php?action=removeContact", {
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
    $("#name_add").val("");
    $("#phone_add").val("");
    $("#insert_state").removeClass("alert-success");
    $("#insert_state").addClass("alert-light");
    $("#insert_state").html("");
    /* Update */
    $("#name_upd").val("");
    $("#phone_upd").val("");
    $("#update_state").removeClass("alert-success");
    $("#update_state").addClass("alert-light");
    $("#update_state").html("");
    /* Remove */
    $("#id_to_remove").val("");
    $("#remove_state").removeClass("alert-success");
    $("#remove_state").addClass("alert-light");
    $("#remove_state").html("");
}
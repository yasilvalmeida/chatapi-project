var group_data_table;
$(() => {
    group_data_table = $("#dataTable").DataTable({
        processing: true,
        serverSide: false,
        order: [],
        ajax: {
            url: "api/api.php?action=fetchAllGroup",
            type: "POST",
            data: {
                user_id: $("#logged_id").val()
            },
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
        columnDefs: [{
            orderable: false,
            targets: [1, 3, 4]
        }],
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
                "The length of " + n + " must be between " + min + " and " + max + "."
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
        loadInstance();
    });
});
// Load instances
loadInstance = () => {
    var tips = $("#instance_add");
    tips.html("<img src='assets/img/loader.gif' />");
    $.post("api/api.php?action=fetchAllInstanceSelect", {
        user_id: $("#logged_id").val()
    },
    (data, status) => {
        if (status == "success") {
            try {
                let html = '';
                const instances = JSON.parse(data);
                instances.map((instance, i) => {
                    html += '<option value="' + instance.id + '">' + instance.instance + " " + instance.token + '</option>';
                });
                $("#instance_add").html(html);
            } catch (error) {
                updateTips(tips, error);
            }
        } else {
            updateTips(tips, data);
        }
    });
};
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
    var name = $("#name_add"),
        instance_id = $("#instance_add option:selected").val(),
        tips = $("#insert_state"),
        bValid = true;
    tips.removeClass("alert-danger").addClass("alert-light");
    if (name.val() == "") {
        updateTips(tips, "Please fill in the name");
        name.focus();
    } 
    else if (!checkLength(name, "name", 10, 250, tips)) { }
    else if (instance_id == -1) {
        updateTips(tips, "Please select one instance");
    } else {
        insertAsync();
    }
}

function insertAsync() {
    var tips = $("#insert_state"),
        instance_id = $("#instance_add option:selected").val(),
        instance = $("#instance_add option:selected").text().split(" ")[0],
        token = $("#instance_add option:selected").text().split(" ")[1];
    tips.addClass("alert-light");
    tips.html("<img src='assets/img/loader.gif' />");
    $.post("api/api.php?action=insertGroup", {
        name: $("#name_add").val(),
        link: "",
        chat_id: "",
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
                    group_data_table.ajax.reload();
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

function view(group) {
    $("#name_viw").val(group.name);
    $("#link_viw").val(group.link);
    $("#chat_id_viw").val(group.chat_id);
    $("#instance_viw").val(group.instance);
    $("#viwModal").modal("show");
}

function remove(group) {
    var tips = $("#remove_state");
    $("#delModalBody").html("<p>Do you want to delete this record?</p><input id='id_del' type='hidden' /><input id='chat_id_del' type='hidden' /><input id='instance_del' type='hidden' /><input id='token_del' type='hidden' /><div id='remove_state' class='d-flex justify-content-center' role='alert'></div >");
    $("#id_del").val(group.id);
    $("#chat_id_del").val(group.chat_id);
    $("#instance_del").val(group.instance);
    $("#token_del").val(group.token);
    tips.addClass("alert-light");
    $("#delModal").modal("show");
}

function removeAsync() {
    var tips = $("#remove_state"),
        id = $("#id_del").val(),
        chat_id = $("#chat_id_del").val(),
        instance = $("#instance_del").val(),
        token = $("#token_del").val();
    tips.addClass("alert-light");
    tips.html("<img src='assets/img/loader.gif' />");
    $.post("api/api.php?action=removeGroup", {
        id: id
    },
    (data, status) => {
        if (status == "success") {
            try {
                var r = JSON.parse(data);
                if (parseInt(r.result) != NaN && parseInt(r.result) == 1) {
                    tips.html("Successfully removed!");
                    $("#delModal").modal("hide");
                    clear_form();
                    $.post(`https://api.chat-api.com/instance${instance}/removeChat?token=${token}`, {
                        chatId: chat_id
                    }, 
                    (data, status) => {
                        if (status == "success") {
                            group_data_table.ajax.reload();
                        }
                        else {
                            updateTips(tips, data);
                        }
                    });
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
// Reset all input form
function clear_form() {
    /* Insert */
    $("#instance_add").val("");
    $("#name_add").val("");
    $("#number_add").val("");
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
    $("#remove_state").addClass("alert-light");
    $("#remove_state").html("");
}
$("#remove_state").html("");
$("#remove_state").html("");
$("#remove_state").html("");
$("#remove_state").html("");
$("#remove_state").html("");
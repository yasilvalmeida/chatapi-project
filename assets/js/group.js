var group_data_table, nGroups, groupId, instanceId, instance, token, contacts, groupName;
$(() => {
    var logged_access = parseInt($("#logged_access").val());
    if (logged_access == 0) {
        group_data_table = $("#dataTable").DataTable({
            processing: true,
            serverSide: false,
            order: [],
            ajax: {
                url: "api/api.php?action=fetchAllGroup",
                type: "POST",
                data: { },
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
    }
    else {
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
    }
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
        clear_form();
    });
    $("#add250Modal").on("show.bs.modal", () => {
        loadInstance();
        $("#insert250_button").html('<button class="btn btn-danger" type="button" data-dismiss="modal">Cancel</button><a class="btn btn-success" href="javascript:insert250()">Save</a>');
        clear_form();
    });
    $("#syncModal").on("show.bs.modal", () => {
        $("#sync_button").html('<button class="btn btn-danger" type="button" data-dismiss="modal">Cancel</button><a class="btn btn-success" href="javascript:syncWithWhatsApp()">Sync</a>');
        clear_form();
    });
});
// Load instances
loadInstance = () => {
    var tips = $("#instance_add"),
        tips = $("#instance_add250"),
        logged_access = parseInt($("#logged_access").val()),
        data;
    if (logged_access == 0) {
        data = {};
    }
    else {
        data = {
            user_id: $("#logged_id").val()
        };
    }
    tips.html("<img src='assets/img/loader.gif' />");
    $.post("api/api.php?action=fetchAllInstanceSelect", data,
    (data, status) => {
        if (status == "success") {
            try {
                let html = '';
                const instances = JSON.parse(data);
                instances.map((instance, i) => {
                    html += '<option value="' + instance.id + '">' + instance.instance + " " + instance.token + '</option>';
                });
                $("#instance_add").html(html);
                $("#instance_add250").html(html);
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
// Syncronize all groups from whatsapp with MySQL
syncWithWhatsApp = () => {
    let data,
        tips = $("#sync_state");
    tips.addClass("alert-light");
    tips.html("<img src='assets/img/loader.gif' />");
    $("#sync_button").html('<button class="btn btn-danger" type="button" data-dismiss="modal">Close</button>');
    var logged_access = parseInt($("#logged_access").val());
    if (logged_access == 0) {
        data = {};
    }
    else {
        data = {
            user_id: $("#logged_id").val()
        };
    }
    $.post("api/api.php?action=fetchAllInstanceSelect", {},
    (data, status) => {
        if (status == "success") {
            try {
                var r = JSON.parse(data);
                let totalInstances = r.length,
                    nSuccess = [],
                    nFail = [],
                    tSuccess = 0,
                    tFail = 0,
                    tGroups = 0;
                r.map((ins, i) => {
                    let instanceId = ins.id,
                        instance = ins.instance,
                        token = ins.token;
                    nSuccess[i] = 0;
                    nFail[i] = 0;
                    $.get(`https://api.chat-api.com/instance${instance}/dialogs?token=${token}`, {
                        limit: 0,
                        page: 0
                    }, 
                    (data, status) => {
                        let totalGroups = data.dialogs.length;
                        tGroups += totalGroups;
                        data.dialogs.map((dialog, j) => {
                            if (dialog.metadata.isGroup) {
                                $.post("api/api.php?action=insertGroup", {
                                    name: dialog.name,
                                    link: dialog.metadata.groupInviteLink,
                                    chat_id: dialog.id,
                                    instance_id: instanceId
                                },
                                (data, status) => {
                                    if (status == "success") {
                                        try {
                                            var r = JSON.parse(data);
                                            if (r.result == "1") tSuccess++;
                                            else tFail++;
                                            tips.html("<table><tr><td>Instance:</td><td>" + totalInstances + "</td></tr><tr><td>Dialogs:</td><td>" + tGroups + "</td></tr><tr><td>Updated:</td><td></td></tr><tr><td><i class='fas fa-check' style='color: green;'></i></td><td>" + tSuccess + "</td></tr><tr><td><i class='fas fa-times' style='color: red;'></i></td><td>" + tFail + "</td></tr></table>");
                                            group_data_table.ajax.reload();
                                        } catch (error) {
                                            console.error(error);
                                        }
                                    } else {
                                        console.log(data);
                                    }
                                });
                            }
                        });
                    });
                });
            } catch (error) {
                updateTips(tips, error);
            }
        } else {
            updateTips(tips, data);
        }
    });
}

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
    else if (!checkLength(name, "name", 3, 250, tips)) { }
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

function insert250() {
    var name = $("#name_add250"),
        instance_id = $("#instance_add250 option:selected").val(),
        tips = $("#insert250_state");
    tips.removeClass("alert-danger").addClass("alert-light");
    if (name.val() == "") {
        updateTips(tips, "Please fill in the name");
        name.focus();
    } 
    else if (!checkLength(name, "name", 3, 250, tips)) { }
    else if (instance_id == -1) {
        updateTips(tips, "Please select one instance");
    } else {
        insert250Async();
    }
}

function insert250Async() {
    var tips = $("#insert250_state"),
        instance_id = $("#instance_add250 option:selected").val();
        instance = $("#instance_add250 option:selected").text().split(" ")[0];
        token = $("#instance_add250 option:selected").text().split(" ")[1];
    tips.addClass("alert-light");
    tips.html("<img src='assets/img/loader.gif' />");
    $.post("api/api.php?action=insert250Group", {
        name: $("#name_add250").val(),
        link: "",
        chat_id: "",
        instance_id: instance_id
    },
    (data, status) => {
        if (status == "success") {
            try {
                var r = JSON.parse(data);
                let message = r.result;
                if (message) {
                    tips.html(message);
                }
                else {
                    nGroups = r.nGroups;
                    groupId = r.groupId;
                    instanceId = r.instanceId;
                    $("#nTotal").val(r.nContacts);
                    // Add next 250 contacts to this group
                    addNext250Contacts();
                    // Display Contact Added Data on progress bar using Ajax
                    clear_timer = setInterval(getAdd250ContactStatus, 2000);
                }
            } catch (error) {
                updateTips(tips, error);
            }
        } else {
            updateTips(tips, data);
        }
    });
}
addNext250Contacts = () => {
    var tips = $("#insert250_state");
    $('#process').css('display', 'block');
    $.post("api/api.php?action=addNext250Contact", {
        group_id: groupId,
        instance_id: instanceId,
        start: parseInt(nGroups) - 1
    },
    (data, status) => {
        if (status == "success") {
            try {
                var r = JSON.parse(data);
                contacts = r.contacts;
                /* stringContacts.map((contact, i) => {
                    contacts.push(parseInt(contact));
                }); */
                //console.log("from addNext250Contacts", data);
            } catch (error) {
                updateTips(tips, error);
            }
        } else {
            updateTips(tips, data);
        }
    });
}
getAdd250ContactStatus = () => {
    $.ajax({
        type: 'GET',
        data: {
            group_id: groupId,
        },
        url: "api/logic/callback/group-contact-import-status.php",
        success:function(data, status) {
            var total_data = parseInt($('#nTotal').val());
            var width = Math.round((data / total_data) * 100);
            $('#process_data').text(data + " of " + total_data);
            $('.progress-bar').css('width', width + '%');
            if(width >= 100) {
                clearInterval(clear_timer);
                $('#process').css('display', 'none');
                createWhatsAppGroup();
            }
        }
    });
}
createWhatsAppGroup = () => {
    var tips = $("#insert250_state");
    $.post(`https://api.chat-api.com/instance${instance}/group?token=${token}`, {
        groupName: $("#name_add250").val(),
        phones: contacts
    }, 
    (data, status) => {
        if (status == "success" && data.created) {
            updateGroup(data.chatId, data.groupInviteLink)
        }
        else {
            console.log(data)
            updateTips(tips, data.message);
        }
    });
}
updateGroup = (chatId, link) => {
    var tips = $("#insert250_state");
    $.post("api/api.php?action=updateGroup", {
        group_id: groupId,
        chat_id: chatId,
        link
    },
    (data, status) => {
        if (status == "success") {
            try {
                var r = JSON.parse(data);
                if (parseInt(r.result) != NaN && parseInt(r.result) == 1) {
                    $("#insert250_button").html('<button class="btn btn-danger" type="button" data-dismiss="modal">Close</button>');
                    clear_form();
                    group_data_table.ajax.reload();
                    tips.html('Contacts added successfully and group created!');
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
    $("#insert_state").removeClass("alert-success");
    $("#insert_state").addClass("alert-light");
    $("#insert_state").html("");
    /* Insert 250 */
    $("#name_add250").val("");
    $("#insert250_state").removeClass("alert-success");
    $("#insert250_state").addClass("alert-light");
    $("#insert250_state").html("");
    /* Sync */
    $("#sync_state").removeClass("alert-success");
    $("#sync_state").addClass("alert-light");
    $("#sync_state").html("");
    /* Remove */
    $("#id_to_remove").val("");
    $("#remove_state").removeClass("alert-success");
    $("#remove_state").addClass("alert-light");
    $("#remove_state").html("");
}
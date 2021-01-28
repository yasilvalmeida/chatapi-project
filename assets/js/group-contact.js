var group_contact_data_table,
    group;
$(() => {
    loadGroupInformation();
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
});
loadGroupInformation = () => {
    let data = {
        group_id: $("#group_id").val()
    };
    var logged_access = parseInt($("#logged_access").val());
    if (logged_access != 0) {
        data = {
            group_id: $("#group_id").val(),
            user_id: $("#logged_id").val()
        }
    }
    $.post("api/api.php?action=fetchSingleGroup", data,
    (data, status) => {
        if (status == "success") {
            try {
                var result = JSON.parse(data);
                group = result.data[0];
                if (!group) {
                    window.location.href = "group.php";
                }
                $("#title").html(group.name + " - Participants");
                loadDataTable();
            } catch (error) {
                console.error(error);
            }
        } else {
            console.log(data);
        }
    });
}
/* syncParticipantWithWhatsApp = () => {
    let tips = $("#sync_state");
    tips.addClass("alert-light");
    tips.html("<img src='assets/img/loader.gif' />");
    $("#sync_button").html('<button class="btn btn-danger" type="button" data-dismiss="modal">Close</button>');
    let tSuccess = 0,
        tFail = 0,
        tContacts = 0;
    $.get(`https://api.chat-api.com/instance${group.instance}/dialog?token=${group.token}`, {
        chatId: group.chat_id
    }, 
    (data, status) => {
        if (status == "success") {
            let participants = data.metadata.participants;
            participants.map((contact, i) => {

            });
            $("#sync_state").html("Sync successful!");
            group_contact_data_table.ajax.reload();
            if (data.error) tips.html(data.error)
            else tips.html(data)
            // Insert contacts that not exists yet in MySQL database
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
        }
        else {
            tips.html("Failed to sync!");
            $("#sync_button").html('<button class="btn btn-danger" type="button" data-dismiss="modal">Cancel</button><a class="btn btn-success" href="javascript:syncParticipantWithWhatsApp()">Sync</a>');
        }
    });
} */
loadDataTable = () => {
    group_contact_data_table = $("#dataTable").DataTable({
        processing: true,
        serverSide: false,
        order: [],
        ajax: {
            url: "api/api.php?action=fetchAllGroupContact",
            type: "POST",
            data: {
                group_id: $("#group_id").val()
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
        columnDefs: [{ orderable: false, targets: [1, 3, 4] }],
    });
}
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

function insert(contact) {
    $("#addModalBody").html("<p>Do you want to add this participant to the chat group?</p><input id='contact_id_add' type='hidden' /><input id='contact_phone_add' type='hidden' /><div id='insert_state' class='d-flex justify-content-center' role='alert'></div >");
    var tips = $("#insert_state");
    tips.addClass("alert-light");
    $("#contact_id_add").val(contact.id);
    $("#contact_phone_add").val(contact.phone);
    $("#addModal").modal("show");
}

function insertAsync() {
    var tips = $("#insert_state"),
        contact_id = $("#contact_id_add").val(),
        contant_phone = $("#contact_phone_add").val();
    tips.addClass("alert-light");
    tips.html("<img src='assets/img/loader.gif' />");
    $.post("api/api.php?action=insertGroupContact", {
        group_id: group.id,
        contact_id: contact_id
    },
    (data, status) => {
        if (status == "success") {
            try {
                var r = JSON.parse(data);
                if (parseInt(r.result) != NaN && parseInt(r.result) == 1) {
                    tips.html("Successfully inserted");
                    $("#addModal").modal("hide");
                    clear_form();
                    group_contact_data_table.ajax.reload();
                    if (!group.chat_id || group.chat_id == "") {
                        createChat(contant_phone);
                    } 
                    else {
                        $("#okModal").modal("show");
                        $("#title_state").html("Add new member to chat");
                        tips = $("#content_state");
                        tips.addClass("alert-light");
                        tips.html("<img src='assets/img/loader.gif' />");
                        var url = `https://eu53.chat-api.com/instance${group.instance}/addGroupParticipant?token=${group.token}`;
                        $.post(url, {
                            "groupId": group.chat_id,
                            "participantPhone": contant_phone
                        }, 
                        (data, status) => {
                            if (status == "success") {
                                try {
                                    const { add, message } = data;
                                    if (add) {
                                        tips.html("New member added to group successful!");
                                    }
                                    else {
                                        updateTips(tips, message);
                                    }
                                } catch (error) {
                                    updateTips(tips, error);
                                }
                            } else {
                                updateTips(tips, data);
                            }
                        });
                    }
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

createChat = (contant_phone) => {
    $("#okModal").modal("show");
    $("#title_state").html("Create new chat");
    var tips = $("#content_state"),
        url = `https://eu53.chat-api.com/instance${group.instance}/group?token=${group.token}`;
    tips.addClass("alert-light");
    tips.html("<img src='assets/img/loader.gif' />");
    $.post(url, {
        "groupName": group.name,
        "phones": contant_phone,
        "messageText": `Wellcome to this group.`
    }, 
    (data, status) => {
        if (status == "success") {
            try {
                const { created, chatId, groupInviteLink, message } = data;
                if (created) {
                    group.chat_id = chatId;
                    group.link = groupInviteLink;
                    tips.html("Chat group created successful!");
                    updateGroup(chatId, groupInviteLink);
                }
                else {
                    updateTips(tips, message);
                }
            } catch (error) {
                updateTips(tips, error);
            }
        } else {
            updateTips(tips, data);
        }
    });
}

updateGroup = (chatId, groupInviteLink) => {
    $.post("api/api.php?action=updateGroup", {
        link: groupInviteLink,
        chat_id: chatId,
        group_id: group.id
    },
    (data, status) => {
        if (status == "success") {
            try {
                var r = JSON.parse(data);
                if (parseInt(r.result) != NaN && parseInt(r.result) == 1) {
                    
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
};

function remove(contact) {
    $("#delModalBody").html("<p>Do you want to remove this participant from the chat group?</p><input id='contact_id_del' type='hidden' /><input id='contact_phone_del' type='hidden' /><div id='remove_state' class='d-flex justify-content-center' role='alert'></div >");
    var tips = $("#remove_state");
    tips.addClass("alert-light");
    $("#contact_id_del").val(contact.id);
    $("#contact_phone_del").val(contact.phone);
    $("#delModal").modal("show");
}

function removeAsync() {
    var tips = $("#remove_state"),
        contact_id = $("#contact_id_del").val(),
        contact_phone = $("#contact_phone_del").val();
    tips.addClass("alert-light");
    tips.html("<img src='assets/img/loader.gif' />");
    $.post(
        "api/api.php?action=removeGroupContact", {
            group_id: group.id,
            contact_id: contact_id
        },
        (data, status) => {
            if (status == "success") {
                try {
                    var r = JSON.parse(data);
                    if (parseInt(r.result) != NaN && parseInt(r.result) == 1) {
                        tips.html("Successfully removed!");
                        $("#delModal").modal("hide");
                        clear_form();
                        group_contact_data_table.ajax.reload();
                        if (group.chat_id) {
                            removeFromChat(contact_phone);
                        }
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

removeFromChat = (contact_phone) => {
    $("#okModal").modal("show");
    $("#title_state").html("Remove member from chat");
    tips = $("#content_state");
    tips.addClass("alert-light");
    tips.html("<img src='assets/img/loader.gif' />");
    var url = `https://eu53.chat-api.com/instance${group.instance}/removeGroupParticipant?token=${group.token}`;
    $.post(url, {
        "groupId": group.chat_id,
        "participantPhone": contact_phone
    }, 
    (data, status) => {
        if (status == "success") {
            try {
                console.log(data)
                const { add, message } = data;
                if (add) {
                    tips.html("Member removed from group successful!");
                }
                else {
                    updateTips(tips, message);
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
    $("#contact_id_add").val("");
    $("#insert_state").removeClass("alert-success");
    $("#insert_state").addClass("alert-light");
    $("#insert_state").html("");
    /* Remove */
    $("#contact_id_del").val("");
    $("#remove_state").removeClass("alert-success");
    $("#remove_state").addClass("alert-light");
    $("#remove_state").html("");
}
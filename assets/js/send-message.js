$(() => {
    $('#contacts_snd').hide();
    $('#groups_snd').hide();

    loadInstances();

    $("#message_snd").val("");
});

updateTips = (tips, t) => {
    tips.html(t).addClass("alert-danger");
    setTimeout(function() {
        tips.removeClass("alert-danger", 1500);
    }, 2000);
};

loadInstances = () => {
    var tips = $("#send_state");
    tips.html("<img src='assets/img/loader.gif' />");
    $.post("api/api.php?action=fetchAllInstanceSelect", {
        user_id: $("#logged_id").val()
    },
    (data, status) => {
        if (status == "success") {
            try {
                let html = "";
                const instances = JSON.parse(data);
                instances.map((instance, i) => {
                    html += '<option value="' + instance.id + '">' + instance.instance + ' - ' + instance.token + '</option>';
                });
                $("#instance_snd").html(html);
                const instanceId = $("#instance_snd").val();
                loadContacts(instanceId);
                loadGroups(instanceId);
                $("#instance_snd").on("change", (e) => {
                    const instanceId = this.value;
                    loadContacts(instanceId);
                    loadGroups(instanceId);
                });
                tips.html("")
            } catch (error) {
                updateTips(tips, error);
            }
        } else {
            updateTips(tips, data);
        }
    });
}

loadContacts = (instanceId) => {
    var tips = $("#send_state");
    tips.html("<img src='assets/img/loader.gif' />");
    $.post("api/api.php?action=fetchAllContactByInstanceSelect", {
        instance_id: instanceId
    },
    (data, status) => {
        if (status == "success") {
            try {
                let html = '';
                const contacts = JSON.parse(data);
                contacts.map((contact, i) => {
                    html += '<option value="' + contact.phone + '">' + contact.name + '</option>';
                });
                $('#contacts_snd').hide();

                $("#contacts_snd").html(html);

                $('#contacts_snd').multiselect({
                    nonSelectedText: 'Select contacts...',
                    includeSelectAllOption: true,
                    enableFiltering: true
                });
            } catch (error) {
                updateTips(tips, error);
            }
        } else {
            updateTips(tips, data);
        }
    });
}

loadGroups = (instanceId) => {
    var tips = $("#send_state");
    tips.html("<img src='assets/img/loader.gif' />");
    $.post("api/api.php?action=fetchAllGroupSelect", {
        instance_id: instanceId
    },
    (data, status) => {
        if (status == "success") {
            try {
                let html = '',
                    result = JSON.parse(data),
                    groups = result.data;
                groups.map((group, i) => {
                    html += '<option value="' + group.chat_id + '">' + group.name + '</option>';
                });
                $("#groups_snd").html(html);

                $('#groups_snd').multiselect({
                    nonSelectedText: 'Select groups...',
                    includeSelectAllOption: true,
                    enableFiltering: true,
                });

                $('#groups_snd').hide();
            } catch (error) {
                updateTips(tips, error);
            }
        } else {
            updateTips(tips, data);
        }
    });
}

function send() {
    let body = $("#message_snd").val(),
        instance = $("#instance_snd option:selected").text().split(" - ")[0],
        token = $("#instance_snd option:selected").text().split(" - ")[1],
        contacts = $("#contacts_snd").val(),
        groups = $("#groups_snd").val(),
        file = $("#file_snd").prop("files")[0],
        tips = $("#send_state");
    if (body == "") {
        updateTips(tips, "Please type a message to send");
    }
    else if (contacts.length == 0 && groups.length == 0) {
        updateTips(tips, "Please select a contact or group");
    }
    else {
        if (file) {
            if (file.size <= 1048576) {
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                    const fileBase64 = reader.result;
                    if (contacts.length > 0)
                        sendMessageWithFileToContacts(instance, token, body, contacts, fileBase64, file.name);
                    if (groups.length > 0) 
                        sendMessageWithFileToGroups(instance, token, body, groups, fileBase64, file.name);
                };
                reader.onerror = function (error) {
                    updateTips(tips, error);
                };
            }
            else {
                updateTips(tips, "The file size cannot exceed 1MB");
            }
        }
        else {
            if (contacts.length > 0)
                sendMessageWithoutFileToContacts(instance, token, body, contacts);
            if (groups.length > 0)
                sendMessageWithoutFileToGroups(instance, token, body, groups);
        }
    }
}

sendMessageWithFileToContacts = (instance, token, body, contacts, fileBase64, filename) => {
    var tips = $("#contacts_file_state");
    tips.addClass("alert-light");
    tips.html("<img src='assets/img/loader.gif' />");
    var data, count = 0;
    contacts.map((phone, i) => {
        data = {
            body: fileBase64,
            filename,
            caption: body,
            phone,
            cached: true
        }
        $.post(`https://eu53.chat-api.com/instance${instance}/sendFile?token=${token}`, data, 
        (data, status) => {
            if (status == "success") {
                try {
                    const { sent, message, queueNumber } = data;
                    console.log(data)
                    if (sent) {
                        count++;
                        tips.html(`New file was send to ${count} of ${contacts.length} contact! You have ${queueNumber} to be sent!`);
                        if (count == contacts.length - 1) {
                            clear_form();
                        }
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
    });
}

sendMessageWithFileToGroups = (instance, token, body, groups, fileBase64, filename) => {
    var tips = $("#groups_file_state");
    tips.addClass("alert-light");
    tips.html("<img src='assets/img/loader.gif' />");
    var data, count = 0;
    groups.map((chatId, i) => {
        data = {
            body: fileBase64,
            filename,
            caption: body,
            chatId,
            cached: true
        }
        $.post(`https://eu53.chat-api.com/instance${instance}/sendFile?token=${token}`, data, 
        (data, status) => {
            if (status == "success") {
                try {
                    const { sent, message, queueNumber } = data;
                    console.log(data)
                    if (sent) {
                        count++;
                        tips.html(`New file was send to ${count} of ${groups.length} group! You have ${queueNumber} to be sent!`);
                        if (count == groups.length - 1) {
                            clear_form();
                        }
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
    });
}

sendMessageWithoutFileToGroups = (instance, token, body, groups) => {
    var tips = $("#groups_state");
    tips.addClass("alert-light");
    tips.html("<img src='assets/img/loader.gif' />");
    var data, count = 0;
    groups.map((chatId, i) => {
        data = {
            body,
            chatId
        }
        $.post(`https://eu53.chat-api.com/instance${instance}/sendMessage?token=${token}`, data, 
        (data, status) => {
            if (status == "success") {
                try {
                    const { sent, message, queueNumber } = data;
                    console.log(data)
                    if (sent) {
                        count++;
                        tips.html(`New message was send to ${count} of ${groups.length} group! You have ${queueNumber} to be sent!`);
                        if (count == groups.length - 1) {
                            clear_form();
                        }
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
    });
}

sendMessageWithoutFileToContacts = (instance, token, body, contacts) => {
    var tips = $("#contacts_state");
    tips.addClass("alert-light");
    tips.html("<img src='assets/img/loader.gif' />");
    var data, count = 0;
    contacts.map((phone, i) => {
        data = {
            body,
            phone
        }
        $.post(`https://eu53.chat-api.com/instance${instance}/sendMessage?token=${token}`, data, 
        (data, status) => {
            if (status == "success") {
                try {
                    const { sent, message, queueNumber } = data;
                    if (sent) {
                        count++;
                        tips.html(`New message was send to ${count} of ${contacts.length} contact! You have ${queueNumber} to be sent!`);
                        if (count == contacts.length - 1) {
                            clear_form();
                        }
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
    });
}

// Reset all input form
clear_form = () => {
    $("#message_snd").val("");
    $("#image_snd").val("");
    $("#movie_snd").val("");
    $("#audio_snd").val("");
    $("#pdf_snd").val("");
    $("#contacts_snd").val("");
    $("#groups_snd").val("");
    $("#send_state").removeClass("alert-success");
    $("#send_state").addClass("alert-light");
    $("#send_state").html("");
}
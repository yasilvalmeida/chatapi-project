$(() => {
    
    loadInstances();

    $("#message_snd").val("");
    $("#contact_snd").show();

    $('#radio_contact').click(function() {
        $("#contact_snd").show();
        $("#group_snd").hide();
    });
    
    $('#radio_group').click(function() {
        $("#contact_snd").hide();
        $("#group_snd").show();
    });
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
                let html = "";
                const contacts = JSON.parse(data);
                contacts.map((contact, i) => {
                    html += '<option value="' + contact.id + '">' + contact.name + ' - ' + contact.phone + '</option>';
                });
                $("#contact_snd").html(html);
                tips.html("")
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
                let html = "",
                    result = JSON.parse(data),
                    groups = result.data;
                groups.map((group, i) => {
                    html += '<option value="' + group.id + '">' + group.name + ' - ' + group.chat_id + '</option>';
                });
                $("#group_snd").html(html);
                tips.html("")
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
        phone = $("#contact_snd option:selected").text().split(" - ")[1],
        chatId = $("#group_snd option:selected").text().split(" - ")[1],
        file = $("#file_snd").prop("files")[0],
        tips = $("#send_state");
    if (body == "") {
        updateTips(tips, "Please type a message to send");
    }
    else {
        const isContact = $("#radio_contact").is(":checked");
        if (file) {
            if (file.size <= 1048576) {
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                    const fileBase64 = reader.result;
                    sendMessage(instance, token, body, phone, chatId, isContact, fileBase64, file.name);
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
            sendMessage(instance, token, body, phone, chatId, isContact, file);
        }
    }
}

sendMessage = (instance, token, body, phone, chatId, isContact, fileBase64, filename) => {
    $("#okModal").modal("show");
    $("#title_state").html("Send new message");
    tips = $("#content_state");
    tips.addClass("alert-light");
    tips.html("<img src='assets/img/loader.gif' />");
    var url,
        data;
    if (fileBase64) {
        url = `https://eu53.chat-api.com/instance${instance}/sendFile?token=${token}`;
        if (isContact) {
            data = {
                body: fileBase64,
                filename,
                caption: body,
                phone,
                cached: true
            }
        }
        else {
            data = {
                body: fileBase64,
                filename,
                caption: body,
                chatId,
                cached: true
            }
        }
    }
    else {
        url = `https://eu53.chat-api.com/instance${instance}/sendMessage?token=${token}`;
        if (isContact) {
            data = {
                body,
                phone
            }
        }
        else {
            data = {
                body,
                chatId
            }
        }
    }
    $.post(url, data, 
    (data, status) => {
        if (status == "success") {
            try {
                const { sent, message, queueNumber } = data;
                console.log(data)
                if (sent) {
                    if (fileBase64) {
                        if (isContact) tips.html(`New file was send to contact ${phone}! You have ${queueNumber} to be sent!`);
                        else tips.html(`New file was send to group ${chatId}!`);
                    }
                    else {
                        if (isContact) tips.html(`New message was send to contact ${phone}! You have ${queueNumber} to be sent!`);
                        else tips.html(`New message was send to group ${chatId}!`);
                    }
                    clear_form();
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
clear_form = () => {
    $("#message_snd").val("");
    $("#image_snd").val("");
    $("#movie_snd").val("");
    $("#audio_snd").val("");
    $("#pdf_snd").val("");
    $("#send_state").removeClass("alert-success");
    $("#send_state").addClass("alert-light");
    $("#send_state").html("");
}
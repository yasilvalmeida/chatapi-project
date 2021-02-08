$(() => {
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
                loadSettings();
                $("#instance_snd").on("change", (e) => {
                    loadSettings();
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

loadSettings = () => {
    var tips = $("#setting_state"),
        instance_token = $("#instance_snd").text().split(" - "),
        instance = instance_token[0],
        token = instance_token[1]; 
    tips.addClass("alert-light");
    tips.html("<img src='assets/img/loader.gif' />");
    /* $.get(`https://eu53.chat-api.com/instance${instance}/settings?token=${token}`, {}, 
    (data, status) => {
        console.log("here");
        try {
            if (status == "success") {
                try {
                    tips.html("Settings loaded")
                    console.log(data)
                    $("#ackNotificationsOn").prop('checked', data.ackNotificationsOn);
                    $("#instanceStatuses").prop('checked', data.instanceStatuses);
                    $("#webhookStatuses").prop('checked', data.webhookStatuses);
                    $("#sendDelay").val(data.sendDelay != null? data.sendDelay: 0);
                    $("#webhookUrl").val(data.webhookUrl != null? data.webhookUrl: "")
                } catch (error) {
                    updateTips(tips, error);
                }
            } else {
                updateTips(tips, data);
            }
        }
        catch(exception) {
            console.log(data, status, exception);
            updateTips(tips, exception);
            tips.html("")
        }
    }); */
    $.ajax({
        url: `https://eu53.chat-api.com/instance${instance}/settings?token=${token}`,
        data: {},
        complete: function(xhr, statusText){
            if (xhr.status == 200) {
                // Success
                console.log(xhr)
                try {
                    tips.html("Settings loaded")
                    console.log(data)
                    $("#ackNotificationsOn").prop('checked', data.ackNotificationsOn);
                    $("#instanceStatuses").prop('checked', data.instanceStatuses);
                    $("#webhookStatuses").prop('checked', data.webhookStatuses);
                    $("#sendDelay").val(data.sendDelay != null? data.sendDelay: 0);
                    $("#webhookUrl").val(data.webhookUrl != null? data.webhookUrl: "")
                } catch (error) {
                    updateTips(tips, error);
                }
            }
            else {
                // Fail
                updateTips(tips, xhr.responseJSON.error);
            }
        },
        error: function(xhr, statusText, err){
            //alert("Error:" + xhr.status); 
        }
    });
};

function saveSettings() {
    var tips = $("#setting_state"),
        instance_token = $("#instance_snd").text().split(" - "),
        instance = instance_token[0],
        token = instance_token[1],
        sendDelay = parseInt($("#sendDelay").val()),
        ackNotificationsOn = $("#ackNotificationsOn:checked").is(":checked"),
        instanceStatuses = $("#instanceStatuses:checked").is(":checked"),
        webhookStatuses = $("#webhookStatuses:checked").is(':checked');
    tips.addClass("alert-light");
    tips.html("<img src='assets/img/loader.gif' />");
    let data = {
        "sendDelay": sendDelay,
        "ackNotificationsOn": ackNotificationsOn,
        "instanceStatuses": instanceStatuses,
        "webhookStatuses": webhookStatuses
    };
    $.post(`https://eu53.chat-api.com/instance${instance}/settings?token=${token}`, data, 
    (data, status) => {
        console.log("first", data)
        if (status == "success") {
            try {
                tips.html("Settings saved")
                console.log(data)
                $("#sendDelay").val(data.sendDelay != null? data.sendDelay: 0);
            } catch (error) {
                updateTips(tips, error);
            }
        } else {
            updateTips(tips, data);
        }
    });
}

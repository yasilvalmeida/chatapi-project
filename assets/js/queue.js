let first100 = [];
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
                loadQueue();
                $("#instance_snd").on("change", (e) => {
                    loadQueue();
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

loadQueue = () => {
    var tips = $("#queue_state"),
        instance_token = $("#instance_snd").text().split(" - "),
        instance = instance_token[0],
        token = instance_token[1]; 
    tips.addClass("alert-light");
    tips.html("<img src='assets/img/loader.gif' />");
    $.get(`https://eu53.chat-api.com/instance${instance}/showMessagesQueue?token=${token}`, {}, 
    (data, status) => {
        if (status == "success") {
            try {
                $("#totalMessages").val(data.totalMessages);
                first100 = data.first100;
                var tBody = "";
                data.first100.map((msg, i) => {
                    let lastTryDate = new Date(msg.last_try).toLocaleDateString();
                    tBody += `<tr><td>${msg.id}</td><td>${msg.chatId}</td><td>${msg.type}</td><td>${lastTryDate}</td><td><div style='text-align:center'><a class="btn btn-warning" href="javascript:view(${i})" title="View message"><i class="far fa-eye"></i></a></div></td><td><div style='text-align:center'><a class="btn btn-success" href="javascript:resend(${i})" title="Resend message"><i class="far fa-paper-plane"></i></a></div></td></tr>`;
                });
                $("#bodyContent").html(tBody);
                tips.html("")
            } catch (error) {
                updateTips(tips, error);
            }
        } else {
            updateTips(tips, data);
        }
    });
};

clear = () => {
    if (first100.length > 0) {
        $("#yesNoModal").modal("show");
        $("#title_a_state").html("Alert");
        $("#content_a_state").html("<p>Are you sure that you want to clear all messages queue?</p>");
    }
    else {
        alert("There's no messages in queue");
    }
}

view = (index) => {
    let metadata = JSON.parse(first100[index].metadata);
    let htmlContent = `<table><tr><td><b>msgId</b></td><td>${metadata.msgId}</td></tr><tr><td><b>Caption</b></td><td>${metadata.caption}</td></tr><tr><td><b>Filename</b></td><td>${metadata.filename? metadata.filename: ""}</td></tr><tr><td><b>Body</b></td><td>${first100[index].body}</td></tr></table>`;
    $("#okModal").modal("show");
    $("#title_state").html("View Message");
    $("#content_state").html(htmlContent);
}

yesAction = () => {
    var tips = $("#queue_state"),
        instance_token = $("#instance_snd").text().split(" - "),
        instance = instance_token[0],
        token = instance_token[1]; 
    $("#yesNoModal").modal("hide");
    tips.addClass("alert-light");
    tips.html("<img src='assets/img/loader.gif' />");
    $.post(`https://eu53.chat-api.com/instance${instance}/clearMessagesQueue?token=${token}`, {}, 
    (data, status) => {
        if (status == "success") {
            alert(data.message);
            loadQueue();
        } else {
            updateTips(tips, data);
        }
    });
}

resend = (index) => {
    var tips = $("#queue_state"),
        instance_token = $("#instance_snd").text().split(" - "),
        instance = instance_token[0],
        token = instance_token[1],
        msgId = JSON.parse(first100[index].metadata).msgId;
    tips.addClass("alert-light");
    tips.html("<img src='assets/img/loader.gif' />");
    $.post(`https://eu53.chat-api.com/instance${instance}/repeatHook?token=${token}`, {
        "messageId": msgId
    }, 
    (data, status) => {
        if (status == "success") {
            console.log(data)
            loadQueue();
        } else {
            updateTips(tips, data);
        }
    });
}
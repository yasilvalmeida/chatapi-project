var message_data_table, instanceId;
$(() => {
    loadInstances();
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
    $.post("api/api.php?action=fetchAllInstanceSelect", { },
    (data, status) => {
        if (status == "success") {
            try {
                let html = "";
                const instances = JSON.parse(data);
                instances.map((instance, i) => {
                    html += '<option value="' + instance.id + '">' + instance.instance + ' - ' + instance.token + '</option>';
                });
                $("#instance_snd").html(html);
                instanceId = $("#instance_snd option:selected").val();
                loadMessage();
                $("#instance_snd").on("change", (e) => {
                    instanceId = e.target.value;
                    loadMessage();
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

loadMessage = () => {
    if (!message_data_table) {
        message_data_table = $("#dataTable").DataTable({
            processing: true,
            serverSide: false,
            order: [],
            ajax: {
                url: "api/api.php?action=fetchAllMessage",
                type: "POST",
                data: function(d) {
                    d.instanceId = $("#instance_snd option:selected").val();
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
    else {
        message_data_table.ajax.reload();
    } 
};

view = (message) => {
    let htmlContent = `<table><tr><td><b>Chat ID</b></td><td>${message.chatId}</td></tr><tr><td><b>Author</b></td><td>${message.author}</td></tr><tr><td><b>Sender Name</b></td><td>${message.senderName}</td></tr><tr><td><b>From Me</b></td><td><div style="text-align:left">${message.fromMe}</div></td></tr><tr><td><b>Body</b></td><td>${message.body}</td></tr><tr><td><b>Message Number</b></td><td>${message.messageNumber}</td></tr><tr><td><b>Sent At</b></td><td>${message.sentAt}</td></tr><tr><td><b>Delivered At</b></td><td>${message.deliveredAt}</td></tr><tr><td><b>Viewed At</b></td><td>${message.viewedAt}</td></tr></table>`;
    $("#okModal").modal("show");
    $("#title_state").html("View Message");
    $("#content_state").html(htmlContent);
}
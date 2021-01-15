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

        var tips = $("#id_allcontact");
        tips.html("<img src='assets/img/loader.gif' />");
        $.post("api/api.php?action=fetchAllContactSelect", {},
            (data, status) => {
                if (status == "success") {
                    try {
                        let html = '<option value="-1">Select</option>';
                        const intance = JSON.parse(data);
                        intance.map((intance, i) => {
                            html += '<option value="' + intance.id + '">' + intance.url + ';' + intance.token + '</option>';
                        });
                        $("#id_allcontact").html(html);
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
    var name_urlContact = $("#id_allcontact option:selected").text();
    var res = name_urlContact.split(";");
    var token = res[1];
    var url = res[0];
    var number = $("#id_allcontact_instance option:selected").text();


    /*
    var name_add = $("#name_add"),
        number_add = $("#number_add"),
        url_id = $("#url_add option:selected").val(),
        tips = $("#insert_state");
    tips.removeClass("alert-danger").addClass("alert-light");
    if (url_id == -1) {
        updateTips(tips, "Please select a url of token");
        url_id.focus();
    } else if (name_add.val() == "") {
        updateTips(tips, "Please fill in the name");
        name_add.focus();
    } else if (number_add.val() == "") {
        updateTips(tips, "Please fill in the number");
        number_add.focus();
    } else {
        insertAsync();
    }*/
    let msg = $("#id_message").val(),
        /* num2 = $("#number2").val(),
    msg = $("#message").val()*/
        formData = new FormData();
    if (msg == undefined || msg == "")
        alert("msg can't be empty");
    if (url == undefined || url == "")
        alert("url can't be empty");
    else {
        formData.append("token", token);
        formData.append("url", url);
        formData.append("msg", msg);
        formData.append("phone", number);
        $("#insert_state").html("<img src='api/loading.gif' />");
        $.ajax({
            type: 'POST',
            url: "api/send.php",
            data: formData,
            contentType: false,
            processData: false,
            cache: false,
            success: function(data) {

                $("#insert_state").html(data);
            }
        });
    }





}

function insertAsync() {
    var tips = $("#insert_state");
    var url = $("#url_add option:selected").val();
    if (url == undefined) {
        updateTips(tips, "Please select the url first!");
    } else {
        tips.addClass("alert-light");
        tips.html("<img src='assets/img/loader.gif' />");
        $.post("api/api.php?action=insertContact", {
                number: $("#number_add").val(),
                name: $("#name_add").val(),
                instance_id: url
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
            }
        );
    }
}

function update(contact) {
    var tips = $("#update_state");
    $("#id_upd").val(contact.id);
    $("#name_upd").val(contact.name);
    $("#number_upd").val(contact.number);
    tips.addClass("alert-light");
    $("#updModal").modal("show");
}

function updateAsync() {
    var tips = $("#update_state");
    tips.addClass("alert-light");
    tips.html("<img src='assets/img/loader.gif' />");
    $.post(
        "api/api.php?action=updateContact", {
            id: $("#id_upd").val(),
            name: $("#name_upd").val(),
            number: $("#number_upd").val(),
        },
        (data, status) => {
            if (status == "success") {
                try {
                    var r = JSON.parse(data);
                    if (parseInt(r.result) != NaN && parseInt(r.result) == 1) {
                        tips.html("I successfully altered!");
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
    $("#url_add").val("");
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

    $("#remove_state").addClass("alert-light");
    $("#remove_state").html("");
}
$("#remove_state").removeClass("alert-success");
$("#remove_state").html("");
$("#remove_state").html("");
$("#remove_state").html("");
$("#remove_state").html("");
$("#remove_state").html("");
$('#all_group').click(function() {

});
$('#radio_all_contact').click(function() {
    /* $("#contact_one").hide();*/
    $("#id_allcontact_instance").show();
    $("#id_allgroup_instance").hide();
});
$('#radio_all_group').click(function() {
    /* $("#contact_one").hide();*/
    $("#id_allcontact_instance").hide();
    $("#id_allgroup_instance").show();

});


function selectContact() {

    var tips = $("#id_allcontact_instance");
    tips.html("<img src='assets/img/loader.gif' />");
    var id_instance = $("#id_allcontact option:selected").val();

    $.post("api/api.php?action=fetchAllInstanceContact", {
            id: id_instance,
        },
        (data, status) => {
            //console.log(data)
            // return;
            if (status == "success") {
                try {
                    let html = '<option value="-1">Select Cantact</option><option value="-2">All Contact</option>';
                    const contact = JSON.parse(data);
                    contact.map((contact, i) => {
                        html += '<option value="' + contact.id + '">' + contact.number + '</option > ';
                    });
                    $("#id_allcontact_instance").html(html);
                } catch (error) {
                    updateTips(tips, error);
                }
            } else {
                updateTips(tips, data);

            }
        }
    );

    // Contat o group 
    $.post("api/api.php?action=fetchAllInstanceGroup", {
            id: id_instance,
        },
        (data, status) => {
            //console.log(data)
            //return;
            if (status == "success") {
                try {
                    let html = '<option value="-1">Select Group</option><option value="-2">All Group</option>';
                    const contact_group = JSON.parse(data);
                    contact_group.map((contact_group, i) => {
                        html += '<option value="' + contact_group.id + '">' + contact_group.name + '</option > ';
                    });
                    $("#id_allgroup_instance").html(html);
                } catch (error) {
                    updateTips(tips, error);
                }
            } else {
                updateTips(tips, data);

            }
        }
    );






}

$('#one_group').click(function() {
    $("#contact_one").hide();
    $("#group_one").show();
});
$("#contact_one").hide();
$("#group_one").show();
$("#group_one").show();
$("#group_one").show();
$("#group_one").show();
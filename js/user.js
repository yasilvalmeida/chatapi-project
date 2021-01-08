var user_data_table;
$(() => {
    user_data_table = $("#dataTable").DataTable({
        processing: true,
        serverSide: false,
        order: [],
        ajax: {
            url: "../api/login.php?action=fetchAllUser",
            type: "POST",
            data: {},
        },
        oLanguage: {
            sLengthMenu: "Show _MENU_ Lines per page",
            sZeroRecords: "No Record Found!",
            sInfo: "Show _START_ de _END_ de _TOTAL_ Lines",
            sInfoEmpty: "Showing 0 of 0 of 0 lines",
            sInfoFiltered: "(Filtro de _MAX_ total linhas)",
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

    $("#modificarDialogo").dialog({
        autoOpen: false,
        resizable: true,
        show: "clip",
        hide: "clip",
        modal: true,
        width: "400px",
        closeOnEscape: true,
        buttons: {
            "Cancelar": function() {
                $(this).dialog("close");
            },
            "Update": function() {
                up_date();
            }
        },
        close: function() {

            $("#modificarDialogo").dialog("close");

        }
    });

    $("#eliminarDialogo").dialog({
        autoOpen: false,
        resizable: true,
        show: "clip",
        hide: "clip",
        modal: true,
        width: "400px",
        closeOnEscape: true,
        buttons: {
            "Cancelar": function() {
                $(this).dialog("close");
            },
            "Delete": function() {
                removeAsync();
            }
        },
        close: function() {

            $("#modificarDialogo").dialog("close");

        }
    });






    $("#adicionarDialogo").dialog({
        autoOpen: false,
        resizable: true,
        show: "clip",
        hide: "clip",
        modal: true,
        width: "400px",
        closeOnEscape: true,
        buttons: {
            "Cancelar": function() {
                $(this).dialog("close");
            },
            "Adicionar": function() {
                insert();
            }
        },
        close: function() {

            $("#adicionar").tooltip("close");
            $("#adicionarState").html("");

        }
    });
    /* This function will update the text in the tips div the the text and the css */
    function updateTips(tips, text) {
        tips.text(text).removeClass("alert-light").addClass("alert-danger");
    }
    /* This function will check the length of the JS objects is between min and max, and will update tip div */
    function checkLength(tips, o, n, min, max) {
        if (o.val().length > max || o.val().length < min) {
            o.addClass("alert-danger");
            updateTips(
                tips,
                "A longetude de " + n + " tem de estar entre " + min + " e " + max + "."
            );
            return false;
        } else {
            return true;
        }
    }
    /* This function will check if the regular expression is true or false, and will update the tip div */
    function checkRegexp(tips, o, regexp, n) {
        if (!regexp.test(o.val())) {
            o.addClass("alert-danger");
            updateTips(tips, n);
            return false;
        } else {
            return true;
        }
    }
});

function adicionar() {
    $("#adicionarDialogo").dialog("open");
}
/* This function will update the text in the tips div the the text and the css */
function updateTips(tips, text) {
    tips.text(text).removeClass("alert-light").addClass("alert-danger");
}
/* This function will check the length of the JS objects is between min and max, and will update tip div */
function checkLength(tips, o, n, min, max) {
    if (o.val().length > max || o.val().length < min) {
        o.addClass("alert-danger");
        updateTips(
            tips,
            "A longetude de " + n + " tem de estar entre " + min + " e " + max + "."
        );
        return false;
    } else {
        return true;
    }
}
/* This function will check if the regular expression is true or false, and will update the tip div */
function checkRegexp(tips, o, regexp, n) {
    if (!regexp.test(o.val())) {
        o.addClass("alert-danger");
        updateTips(tips, n);
        return false;
    } else {
        return true;
    }
}









function insert() {
    //alert("ASDFSDFSDFD")
    var username_to_insert = $("#username_to_insert"),
        password_to_insert = $("#password_to_insert"),
        access_to_insert = $("#access_to_insert"),
        emailToInsert = $("#emai_to_insert")
    bValid = true,
        tips = $("#adicionarState");
    // tips.removeClass("alert-danger").addClass("alert-light");
    if (username_to_insert.val() == "") {
        updateTips(tips, "Por favor preencha o nome do utilizador");
        username_to_insert.focus();
    } else if (password_to_insert.val() == "") {
        updateTips(tips, "Por favor preencha o campo password ");
        password_to_insert.focus();
    } else if (username_to_insert.val() == password_to_insert.val()) {
        updateTips(
            tips,
            "O Nome do utilisador e a palavra passe não podem ser iguais"
        );
        password_to_insert.focus();
    } else if (password_to_insert.val().includes(username_to_insert.val())) {
        updateTips(tips, "A palavra passe não pode conter o nome do utilisador");
        password_to_insert.focus();
    } else {
        bValid = bValid && checkLength(tips, username_to_insert, "username", 5, 20);
        bValid =
            bValid &&
            checkRegexp(
                tips,
                username_to_insert,
                /[QWERTYUIOPASDFGHJKLZXCVBNM]([0-9qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM])+$/i,
                "The username must begin with a letter and followed by numbers or letters."
            );
        bValid = bValid && checkLength(tips, password_to_insert, "password", 6, 20);
        bValid =
            bValid &&
            checkRegexp(
                tips,
                password_to_insert,
                /[0-9]/,
                "The password must containt at least one number."
            );
        bValid =
            bValid &&
            checkRegexp(
                tips,
                password_to_insert,
                /[qwertyuiopasdfghjklzxcvbnm]/,
                "The password must contain at least one lowercase letter."
            );
        bValid =
            bValid &&
            checkRegexp(
                tips,
                password_to_insert,
                /[QWERTYUIOPASDFGHJKLZXCVBNM]/,
                "The password must contain at least one capital letter."
            );
        bValid =
            bValid &&
            checkRegexp(
                tips,
                password_to_insert,
                /[@£€#$%&*+-?!]/,
                "The password must consist of at least 1 special character, namely @, £, €, #, $, %, &, *, +, -, ? or !."
            );

        bValid = bValid && checkLength(tips, emailToInsert, "email", 6, 50);
        bValid = bValid && checkRegexp(tips, emailToInsert,
            /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,
            "exemplo. alguem@dominio.com"
        );
        bValid = bValid && checkRegexp(tips, access_to_insert, /[01]/, "The access must be 0 or 1.");
        if (bValid) {
            insertAsync();
        }
    }
}

// updtet ver


function up_date() {
    //alert("ASDFSDFSDFD")
    var username_to_insert = $("#usernameToUpdate"),
        password_to_insert = $("#passwordToUpdate"),
        access_to_insert = $("#accessToUpdate"),
        emailToInsert = $("#emailToUpdate")
    bValid = true,
        tips = $("#modificarState");
    // tips.removeClass("alert-danger").addClass("alert-light");
    if (username_to_insert.val() == "") {
        updateTips(tips, "Por favor preencha o nome do utilizador");
        username_to_insert.focus();
    } else if (password_to_insert.val() == "") {
        updateTips(tips, "Por favor preencha o campo password ");
        password_to_insert.focus();
    } else if (username_to_insert.val() == password_to_insert.val()) {
        updateTips(
            tips,
            "O Nome do utilisador e a palavra passe não podem ser iguais"
        );
        password_to_insert.focus();
    } else if (password_to_insert.val().includes(username_to_insert.val())) {
        updateTips(tips, "A palavra passe não pode conter o nome do utilisador");
        password_to_insert.focus();
    } else {
        bValid = bValid && checkLength(tips, username_to_insert, "username", 5, 20);
        bValid =
            bValid &&
            checkRegexp(
                tips,
                username_to_insert,
                /[QWERTYUIOPASDFGHJKLZXCVBNM]([0-9qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM])+$/i,
                "The username must begin with a letter and followed by numbers or letters."
            );
        bValid = bValid && checkLength(tips, password_to_insert, "password", 6, 20);
        bValid =
            bValid &&
            checkRegexp(
                tips,
                password_to_insert,
                /[0-9]/,
                "The password must containt at least one number."
            );
        bValid =
            bValid &&
            checkRegexp(
                tips,
                password_to_insert,
                /[qwertyuiopasdfghjklzxcvbnm]/,
                "The password must contain at least one lowercase letter."
            );
        bValid =
            bValid &&
            checkRegexp(
                tips,
                password_to_insert,
                /[QWERTYUIOPASDFGHJKLZXCVBNM]/,
                "The password must contain at least one capital letter."
            );
        bValid =
            bValid &&
            checkRegexp(
                tips,
                password_to_insert,
                /[@£€#$%&*+-?!]/,
                "The password must consist of at least 1 special character, namely @, £, €, #, $, %, &, *, +, -, ? or !."
            );

        bValid = bValid && checkLength(tips, emailToInsert, "email", 6, 50);
        bValid = bValid && checkRegexp(tips, emailToInsert,
            /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,
            "exemplo. alguem@dominio.com"
        );
        bValid = bValid && checkRegexp(tips, access_to_insert, /[01]/, "The access must be 0 or 1.");
        if (bValid) {
            updateAsync();
        }
    }
}













function insertAsync() {
    var tips = $("#adicionarState");
    tips.addClass("alert-light");
    tips.html("<img src='img/loader.gif' />");
    $.post("../api/login.php?action=insertUser", {
            username: $("#username_to_insert").val(),
            password: $("#password_to_insert").val(),
            email: $("#emai_to_insert").val(),
            access: $("#access_to_insert").val(),
        },
        (data, status) => {
            if (status == "success") {
                try {
                    var r = JSON.parse(data);
                    if (parseInt(r.result) != NaN && parseInt(r.result) == 1) {
                        tips.html("Registado com sucesso");
                        $("#adicionarDialogo").dialog("close");
                        clear_form();
                        user_data_table.ajax.reload();
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

function update(user) {

    var tips = $("#modificarState");
    $("#idToUpdate").val(user.id);
    $("#usernameToUpdate").val(user.username);
    $("#passwordToUpdate").val(user.password);
    $("#accessToUpdate").val(user.access);
    $("#emailToUpdate").val(user.email);
    tips.addClass("alert-light");
    $("#modificarDialogo").dialog("open");
}






function updateAsync() {
    var tips = $("#modificarState");
    tips.addClass("alert-light");
    tips.html("<img src='../img/loader.gif' />");
    $.post(
        "../api/login.php?action=updateUser", {
            id: $("#idToUpdate").val(),
            username: $("#usernameToUpdate").val(),
            password: $("#passwordToUpdate").val(),
            access: $("#accessToUpdate").val(),
            email: $("#emailToUpdate").val(),
        },
        (data, status) => {
            if (status == "success") {
                try {
                    var r = JSON.parse(data);
                    if (parseInt(r.result) != NaN && parseInt(r.result) == 1) {
                        tips.html("Alterardo com sucesso!");
                        $("#modificarDialogo").dialog("close");
                        clear_form();
                        user_data_table.ajax.reload();
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

function remove(user) {
    var tips = $("#eliminarState");
    $("#idToRemove").val(user.id);
    $("#usernameToRemove").val(user.username);
    tips.addClass("alert-light");
    $("#eliminarDialogo").dialog("open");
}

function removeAsync() {
    var tips = $("#eliminarState");
    tips.addClass("alert-light");
    tips.html("<img src='../img/loader.gif' />");
    $.post(
        "../api/login.php?action=removeUser", {
            id: $("#idToRemove").val(),
        },
        (data, status) => {
            if (status == "success") {
                try {
                    var r = JSON.parse(data);
                    if (parseInt(r.result) != NaN && parseInt(r.result) == 1) {
                        tips.html("Removido com sucesso!");
                        $("#eliminarDialogo").dialog("close");
                        clear_form();
                        user_data_table.ajax.reload();
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
    $("#username_to_insert").val("");
    $("#password_to_insert").val("");
    $("#access_to_insert").val("");
    $("#email_to_insert").val("");
    $("#insert_state").removeClass("alert-success");
    $("#insert_state").addClass("alert-light");
    $("#insert_state").html("");
    /* Update */
    $("#username_to_update").val("");
    $("#password_to_update").val("");
    $("#access_to_update").val("");
    $("#update_state").removeClass("alert-success");
    $("#update_state").addClass("alert-light");
    $("#update_state").html("");
    /* Remove */
    $("#id_to_remove").val("");
    $("#remove_state").removeClass("alert-success");
    $("#remove_state").addClass("alert-light");
    $("#remove_state").html("");
}
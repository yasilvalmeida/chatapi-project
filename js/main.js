$(() => {
    var logged_username = $("#logged_username").val(),
        logged_access = parseInt($("#logged_access").val());
    if (logged_access == 0) {
        $("#parameter_menu").html("Paramêtros");
        $("#user_menu").html("Utilizadores");
    }
    $("#username_logged_view").html(
        '<i class="fas fa-user"></i> ' + logged_username
    );
    $("#change_modal").on("shown.bs.modal", () => {
        loadMyInfo();
    });
});

$(function() {
    $.fx.speeds._default = 900;
    //Sair Dialogo
    $("#exitModal").dialog({
        autoOpen: false,
        resizable: false,
        show: "clip",
        hide: "clip",
        modal: true,
        closeOnEscape: true,
        buttons: {
            "No": function() {
                $(this).dialog("close");
            },
            "Yes": function() {
                exit();
            }
        },
        close: function() {}
    });
    $("#exit").tooltip({
        show: {
            effect: "blind",
            delay: 50
        },
        hide: {
            effect: "blind",
            delay: 150
        }
    });
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
            "The length of " + n + " must be between " + min + " and " + max + "."
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

function loadMyInfo() {
    $("#username_changed").val($("#logged_username").val());
    $("#password_changed").val($("#logged_password").val());
    $("#email_changed").val($("#logged_email").val());
}

function changeMyInfo() {
    var username_changed = $("#username_changed"),
        password_changed = $("#password_changed"),
        email_changed = $("#email_changed"),
        bValid = true,
        tips = $("#change_my_info_state");
    tips.removeClass("alert-danger").addClass("alert-light");
    if (username_changed.val() == "") {
        updateTips(tips, "Fill the username!");
        username_changed.focus();
    } else if (password_changed.val() == "") {
        updateTips(tips, "Fill the password");
        password_changed.focus();
    } else if (username_changed.val() == password_changed.val()) {
        updateTips(tips, "The username and the password match");
        password_changed.focus();
    } else if (password_changed.val().includes(username_changed.val())) {
        updateTips(tips, "The password contains the username");
        password_changed.focus();
    } else {
        bValid =
            bValid && checkLength(tips, username_changed, "username", 5, 20);
        bValid =
            bValid &&
            checkRegexp(
                tips,
                username_changed,
                /[QWERTYUIOPASDFGHJKLZXCVBNM]([0-9qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM])+$/i,
                "The username must begin with a letter and end with a number"
            );
        bValid =
            bValid && checkLength(tips, password_changed, "password", 6, 20);
        bValid =
            bValid &&
            checkRegexp(
                tips,
                password_changed,
                /[0-9]/,
                "The password must contain a number"
            );
        bValid =
            bValid &&
            checkRegexp(
                tips,
                password_changed,
                /[qwertyuiopasdfghjklzxcvbnm]/,
                "The password must contain a lowercase letter"
            );
        bValid =
            bValid &&
            checkRegexp(
                tips,
                password_changed,
                /[QWERTYUIOPASDFGHJKLZXCVBNM]/,
                "The password must contain a uppercase letter"
            );
        bValid =
            bValid &&
            checkRegexp(
                tips,
                password_changed,
                /[@£€#$%&*+-?!]/,
                "The password must contain a special chracter, like @, £, €, #, $, %, &, *, +, -, ? or !."
            );
        bValid = bValid && checkLength(tips, email_changed, "email", 6, 50);
        bValid =
            bValid &&
            checkRegexp(tips,
                email_changed,
                /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,
                "example. name@domain.com"
            );
        if (bValid) {
            changeMyInfoAsync();
        }
    }
}

function changeMyInfoAsync() {
    var tips = $("#change_my_info_state");
    tips.html("<img src='../img/loader.gif' />");
    $.post(
        "../api/inic_cms.php?action=changeLoggedUserInfo", {
            id: $("#logged_id").val(),
            username: $("#username_changed").val(),
            password: $("#password_changed").val(),
            email: $("#email_changed").val(),
        },
        (data, status) => {
            if (status == "success") {
                try {
                    var r = JSON.parse(data);
                    if (parseInt(r.result) != NaN && parseInt(r.result) == 1) {
                        tips.html("Updated successful");
                        location.reload();
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

function exit() {
    var tips = $("#sairState");
    tips.html("<img src='../img/loader.gif' />");
    $.post("../api/login.php?action=logOut", {}, (data, status) => {
        if (status == "success") {
            try {
                var r = JSON.parse(data);
                //   alert(r.result)
                if (parseInt(r.result) != NaN && parseInt(r.result) == 1) {
                    tips.html("Logout successful!");
                    location.reload();
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

function sair() {

    $("#exitModal").dialog("open");
}
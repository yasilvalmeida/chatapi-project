$(function() {
    var username = $("#username_logged"),
        password = $("#password_logged"),
        email = $("#email_logged"),
        allFields = $([]).add(username).add(password).add(email);

    $.fx.speeds._default = 900;
    //Alterar Dialogo
    $("#alterarDialogo").dialog({
        autoOpen: false,
        resizable: true,
        show: "clip",
        hide: "clip",
        width: "400px",
        modal: true,
        closeOnEscape: true,
        buttons: {
            "Cancelar": function() {
                $(this).dialog("close");
            },
            "Alterar": function() {
                var bValid = true,
                    tips = $("#alterarState");
                allFields.removeClass("ui-state-error");
                if (username.val() == "") {
                    tips.html("O nome de utilizador não deve ser em branco.");
                    username.addClass("ui-state-error");
                    username.focus();
                } else if (password.val() == "") {
                    tips.html("A palavra passe não deve ser em branco.");
                    password.addClass("uistate-error");
                    password.focus();
                } else if (username.val() == password.val()) {
                    tips.html("A palavra-passe deve ser diferente do nome do utilizador.");
                    password.addClass("ui-state-error");
                    password.focus();
                } else {
                    bValid = bValid && checkLength(username, "nome do utilizador", 3, 20, tips);
                    bValid = bValid && checkRegexp(username, /^[QWEÉÈÊẼRTYÝỲỸŶUÚÙŨÛÍÌĨÎOÓÒÕÔPAÃÂÁÀSDFGHJKLÇZXCVBNM]([0-9qweéèẽêrtyýỳỹŷiíìîĩoóòôõpaáàãâsdfghjklçzxcvbnmQWEÉÈÊẼRTYÝỲỸŶUÚÙŨÛÍÌĨÎOÓÒÕÔPAÃÂÁÀSDFGHJKLÇZXCVBNM_])+$/i, "O Nome de utilizador deve estar constituído por caractéres de a-z, 0-9, underscores, começando por uma letra.", tips);
                    bValid = bValid && checkLength(password, "palavra passe", 6, 50, tips);
                    bValid = bValid && checkRegexp(password, /[0-9]/, "A Palavra-passe deve estar constituída pelo menos 1 número.", tips);
                    bValid = bValid && checkRegexp(password, /[qweéèẽêrtyýỳỹŷiíìîĩoóòôõpaáàãâsdfghjklçzxcvbnm]/, "A Palavra-passe deve estar constituída pelo menos 1 letra minúscula.", tips);
                    bValid = bValid && checkRegexp(password, /[QWEÉÈÊẼRTYÝỲỸŶUÚÙŨÛÍÌĨÎOÓÒÕÔPAÃÂÁÀSDFGHJKLÇZXCVBNM]/, "A Palavra-passe deve estar constituída pelo menos 1 letra maiúscula.", tips);
                    bValid = bValid && checkRegexp(password, /[@#$%&*+-?!~^]/, "A Palavra-passe deve estar constituída pelo menos 1 caracter especial.", tips);
                    bValid = bValid && checkLength(email, "email", 3, 50, tips);
                    bValid = bValid && checkRegexp(email, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i, "exemplo. alguem@dominio.com", tips);
                    if (bValid) {
                        alterarAsync();
                    }
                }
            }
        },
        close: function() {
            allFields.val("").removeClass("ui-state-error");
            $("#alterar").tooltip("close");
        }
    });
    //Alterar Tooltips
    $("#alterar").tooltip({
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
$.ajaxSetup({
    cache: false
});
//Alterar functions
function alterar() {
    var username = $("#us_username_logged").val(),
        password = $("#us_password_logged").val(),
        email = $("#us_email_logged").val();
    $("#username_logged").val(username);
    $("#password_logged").val(password);
    $("#email_logged").val(email);
    $("#alterarDialogo").dialog("open");
}

function alterarAsync() {
    //  alert("#us_id_logged" + $("#us_id_logged").val());
    $("#alterarState").html("<img src='img/preloader-01.gif' />");
    $.post("ajax/alterar.php", {
            id: $("#us_id_logged").val(),
            username: $("#username_logged").val(),
            password: $("#password_logged").val(),
            email: $("#email_logged").val()
        },
        function(data) {
            var result = data.text;
            if (result > 0) {
                $("#alterarDialogo").dialog('option', 'buttons', {
                    'Fechar': function() {
                        document.location.reload(true);
                        $(this).dialog('close');
                    }
                });
                $("#alterarState").html("<p>Os seus dados foram alterados com êxito!</p>");
                setTimeout(function() {
                    document.location.reload(true);
                    $("#alterarDialogo").dialog("close");
                }, 2000);
            } else {
                $("#alterarState").addClass("ui-state-error")
                $("#alterarState").html("<p>Alteração dos dados falhada!</p>");
            }
        }, "json");
}
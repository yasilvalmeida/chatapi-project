$(function() {
    var logged_username = $("#logged_username").val(),
        logged_access = parseInt($("#logged_access").val());
    $("#username_logged_view").html("<i class='far fa-user'></i> " + logged_username);
    if (logged_access == 0){
        $("#admin_nav").html('<li class="nav-item"><a class="nav-link" href="main.php"><i class="fas fa-tachometer-alt"></i><span>Dashboard</span></a></li><li class="nav-item"><a class="nav-link" href="user.php"><i class="fas fa-user"></i><span>Users</span></a></li><li class="nav-item"><a class="nav-link" href="instance.php"><i class="fas fa-key"></i><span>Instances</span></a></li><li class="nav-item"><a class="nav-link" href="contact.php"><i class="fas fa-address-card"></i><span>Contacts</span></a></li><li class="nav-item"><a class="nav-link" href="group.php"><i class="fas fa-users"></i><span>Groups</span></a></li><li class="nav-item"><a id="report_menu" class="nav-link" href="report.php"><i class="far fa-file-alt"></i><span>Reports</span></a></li>');
    }
    else {
        $("#user_nav").html('<li class="nav-item"><a class="nav-link" href="main.php"><i class="fas fa-tachometer-alt"></i><span>Dashboard</span></a></li><li class="nav-item"><a class="nav-link" href="contact.php"><i class="fas fa-address-card"></i><span>Contacts</span></a></li><li class="nav-item"><a class="nav-link" href="group.php"><i class="fas fa-users"></i><span>Groups</span></a></li><li class="nav-item"><a class="nav-link" href="send_message.php"><i class="fas fa-sms"></i><span>Send Message</span></a></li>');
    }
    $('#userModal').on('shown.bs.modal', function () {
        load_user_info();
    });

    $.fx.speeds._default = 900;
    updateTips = (tips, t) => {
        tips.html(t).addClass("alert-danger");
        setTimeout(function () {
            tips.removeClass("alert-danger", 1500);
        }, 2000);
    };
});
updateTips = (tips, t) => {
    tips.html(t).addClass("alert-danger");
    setTimeout(function () {
      tips.removeClass("alert-danger", 1500);
    }, 2000);
  };
function checkLength(o, n, min, max, tips) {
    if (o.val().length > max || o.val().length < min) {
        o.addClass("alert-danger");
        o.focus();
        tips.addClass("alert-danger");
        tips.html("A longitude da " + n + " deve estar entre  " + min + " e " + max + ".");
        return false;
    }
    else {
        return true;
    }
}
function checkRegexp(o, regexp, n, tips) {
    if (!(regexp.test(o.val()))) {
        o.addClass("alert-danger");
        o.focus();
        tips.addClass("alert-danger");
        tips.html(n);
        return false;
    }
    else {
        return true;
    }
}
function load_user_info(){
    $("#username_changed").val($("#logged_username").val());
    $("#password_changed").val($("#logged_password").val());
    $("#email_changed").val($("#logged_email").val());
    $("#access_changed").val($("#logged_access").val());
}
function change_user() {
    var username_changed = $("#username_changed"),
        password_changed = $("#password_changed"),
        email_changed = $("#email_changed"),
        access_changed = $("#access_changed"),
        bValid = true,
        tips = $("#update_state");
    if (username_changed.val() == "") {
        tips.addClass("alert alert-danger");
        tips.html("O nome de utilizador não deve ser em branco.");
        username_changed.focus();
    }
    else if (password_changed.val() == "") {
        tips.addClass("alert alert-danger");
        tips.html("A palavra passe não deve ser em branco.");
        password_changed.focus();
    }
    else if (username_changed.val() == password_changed.val()) {
        tips.addClass("alert-danger");
        tips.html("A palavra-passe deve ser diferente do nome do usuário.");
        password_changed.focus();
    }
    else if (email_changed.val() == "") {
        tips.addClass("alert alert-danger");
        tips.html("O email não deve ser em branco.");
        email_changed.focus();
    }
    else {
        bValid = bValid && checkLength(username_changed, "nome do usuário", 3, 30, tips);
        bValid = bValid && checkRegexp(username_changed, /[QWEÉÈÊRTYUÚÙÛIÍÌÎOÓÒÔÕPAÁÀÃÂSDFGHJKLÇZXCVBNM]([0-9qweéèêrtyúùûiíìîoóòôõpaáàãâsdfghjklçzxcvbnmQWEÉÈÊRTYUÚÙÛIÍÌÎOÓÒÔÕPAÁÀÃÂSDFGHJKLÇZXCVBNM_])+$/i, "O Nome de Usuário deve estar constituído por caractéres de a-z, 0-9, underscores, começando por uma letra.", tips);
        bValid = bValid && checkLength(password_changed, "palavra passe", 6, 20, tips);
        bValid = bValid && checkRegexp(password_changed, /[0-9]/, "A Palavra-passe deve estar constituída pelo menos 1 número.", tips);
        bValid = bValid && checkRegexp(password_changed, /[qweéèêrtyúùûiíìîoóòôõpaáàãâsdfghjklçzxcvbnm]/, "A Palavra-passe deve estar constituída pelo menos 1 letra minúscula.", tips);
        bValid = bValid && checkRegexp(password_changed, /[QWEÉÈÊRTYUÚÙÛIÍÌÎOÓÒÔÕPAÁÀÃÂSDFGHJKLÇZXCVBNM]/, "A Palavra-passe deve estar constituída pelo menos 1 letra maiúscula.", tips);
        bValid = bValid && checkRegexp(password_changed, /[@£€§#$%&*+-?!~^ºª]/, "A Palavra-passe deve estar constituída pelo menos 1 caracter especial.", tips);
        bValid = bValid && checkLength(email_changed, "email", 3, 80, tips);
        bValid = bValid && checkRegexp(email_changed, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i, "exemplo. alguem@dominio.com", tips);
        if (bValid) {
            changeAsync();
        }
    }
}
function changeAsync() {
    var tips = $("#update_state");
    tips.html("<img src='assets/img/loader.gif' />");
    tips.addClass("alert-light");
    $.post(
    "api/api.php?action=changeLoggedUserInfo",
    {
        id: $("#logged_id").val(),
        username: $("#username_changed").val(),
        password: $("#password_changed").val(),
        email: $("#email_changed").val(),
        access: $("#access_changed").val()
    },
    (data, status) => {
        if (status == "success") {
        try {
            console.log(data)
            var r = JSON.parse(data);
            if (parseInt(r.result) != NaN && parseInt(r.result) == 1) {
            tips.html("Alterado com sucesso");
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
    var tips = $("#exit_state")
    tips.html("<img src='assets/img/loader.gif' />");
    tips.addClass("alert-light");
    $.post("api/api.php?action=logOut",
    { },
    (data, status) => {
      if (status == "success") {
        try {
          var r = JSON.parse(data),
            result = parseInt(r.result);
          if (result != NaN && result == 1) {
            setTimeout(() => {
              window.location.href = "main.php";
            }, 100);
          }
          else{
            tips.html(r.result);
          }
        } catch (error) {
          tips.html(error);
        }
      } else {
        updateTips(tips, data);
      }
    }
  );
    $.post("ajax/sair.php", { },
    function(data){
        var result = parseInt(data.text);
        if (result > 0) {
            setTimeout(function () {
                document.location.reload(true);
            }, 100);
        }
        else {
            updateTips(tips, data);
        }
    }, "json");
}
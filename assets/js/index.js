var email = $("#email"),
  password = $("#password");
$(() => {
  updateTips = (tips, t) => {
    tips.html(t).addClass("alert-danger");
    setTimeout(function () {
      tips.removeClass("alert-danger", 1500);
    }, 2000);
  };
  checkLength = (o, n, min, max, tips) => {
    if (o.val().length > max || o.val().length < min) {
      o.addClass("alert-danger");
      o.focus();
      updateTips(
        tips,
        "A longitude de " + n + " deve estar entre " + min + " e " + max + "."
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
  $("#email").keyup((e) => {
    var code = e.keyCode ? e.keyCode : e.which;
    if (code == 13) {
      //Enter keycode
      var bValid = true,
        tips = $("#login_state");
      if (email.val() == "") {
        tips.addClass("alert alert-danger");
        tips.html("Deves colocar o e-mail.");
        email.focus();
      } else if (password.val() == "") {
        tips.addClass("alert alert-danger");
        tips.html("Deves colocar a palavra passe.");
        password.focus();
      } else if (email.val() == password.val()) {
        tips.addClass("alert-danger");
        tips.html("O e-mail deve ser diferente da palavra passe.");
        password.focus();
      } else {
        bValid = bValid && checkLength(email, "e-mail", 8, 80, tips);
        bValid =
          bValid &&
          checkRegexp(
            email,
            /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,
            "Por favor introduza um email válido, como por exemplo: account@domain.com",
            tips
          );
        bValid = bValid && checkLength(password, "password", 6, 20, tips);
        bValid =
          bValid &&
          checkRegexp(
            password,
            /[0-9]/,
            "A palavra passe deve conter um número.",
            tips
          );
        bValid =
          bValid &&
          checkRegexp(
            password,
            /[a-z]/,
            "A palavra passe deve conter um letra minúscula.",
            tips
          );
        bValid =
          bValid &&
          checkRegexp(
            password,
            /[A-Z]/,
            "A palavra passe deve conter um letra maúscula.",
            tips
          );
        bValid =
          bValid &&
          checkRegexp(
            password,
            /[@£€§#$%&*+-?!~^ºª]/,
            "A palavra passe deve conter um caracter especial, tal como: *, &, $, @ or #.",
            tips
          );
        if (bValid) {
          loginAsync();
        }
      }
    }
  });
  $("#password").keyup((e) => {
    var code = e.keyCode ? e.keyCode : e.which;
    if (code == 13) {
      //Enter keycode
      var bValid = true,
        tips = $("#login_state");
      if (email.val() == "") {
        tips.addClass("alert alert-danger");
        tips.html("Deves colocar o e-mail.");
        email.focus();
      } else if (password.val() == "") {
        tips.addClass("alert alert-danger");
        tips.html("Deves colocar a palavra passe.");
        password.focus();
      } else if (email.val() == password.val()) {
        tips.addClass("alert-danger");
        tips.html("O e-mail deve ser diferente da palavra passe.");
        password.focus();
      } else {
        bValid = bValid && checkLength(email, "e-mail", 8, 80, tips);
        bValid =
          bValid &&
          checkRegexp(
            email,
            /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,
            "Por favor introduza um email válido, como por exemplo: account@domain.com",
            tips
          );
        bValid = bValid && checkLength(password, "password", 6, 20, tips);
        bValid =
          bValid &&
          checkRegexp(
            password,
            /[0-9]/,
            "A palavra passe deve conter um número.",
            tips
          );
        bValid =
          bValid &&
          checkRegexp(
            password,
            /[a-z]/,
            "A palavra passe deve conter um letra minúscula.",
            tips
          );
        bValid =
          bValid &&
          checkRegexp(
            password,
            /[A-Z]/,
            "A palavra passe deve conter um letra maúscula.",
            tips
          );
        bValid =
          bValid &&
          checkRegexp(
            password,
            /[@£€§#$%&*+-?!~^ºª]/,
            "A palavra passe deve conter um caracter especial, tal como: *, &, $, @ or #.",
            tips
          );
        if (bValid) {
          loginAsync();
        }
      }
    }
  });
});
updateTips = (tips, t) => {
  tips.html(t).addClass("alert-danger");
  setTimeout(function () {
    tips.removeClass("alert-danger", 1500);
  }, 2000);
};
checkLength = (o, n, min, max, tips) => {
  if (o.val().length > max || o.val().length < min) {
    o.addClass("alert-danger");
    o.focus();
    updateTips(
      tips,
      "A longitude de " + n + " deve estar entre " + min + " and " + max + "."
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
login = () => {
  var bValid = true,
    tips = $("#login_state");
  if (email.val() == "") {
    tips.addClass("alert alert-danger");
    tips.html("Deves colocar o e-mail.");
    email.focus();
  } else if (password.val() == "") {
    tips.addClass("alert alert-danger");
    tips.html("Deves colocar a palavra passe.");
    password.focus();
  } else if (email.val() == password.val()) {
    tips.addClass("alert-danger");
    tips.html("O e-mail deve ser diferente da palavra passe.");
    password.focus();
  } else {
    bValid = bValid && checkLength(email, "e-mail", 8, 80, tips);
    bValid =
      bValid &&
      checkRegexp(
        email,
        /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,
        "Por favor introduza um email válido, como por exemplo: account@domain.com",
        tips
      );
    bValid = bValid && checkLength(password, "password", 6, 20, tips);
    bValid =
      bValid &&
      checkRegexp(
        password,
        /[0-9]/,
        "A palavra passe deve conter um número.",
        tips
      );
    bValid =
      bValid &&
      checkRegexp(
        password,
        /[a-z]/,
        "A palavra passe deve conter um letra minúscula.",
        tips
      );
    bValid =
      bValid &&
      checkRegexp(
        password,
        /[A-Z]/,
        "A palavra passe deve conter um letra maúscula.",
        tips
      );
    bValid =
      bValid &&
      checkRegexp(
        password,
        /[@£€§#$%&*+-?!~^ºª]/,
        "A palavra passe deve conter um caracter especial, tal como: *, &, $, @ or #.",
        tips
      );
    if (bValid) {
      loginAsync();
    }
  }
};
loginAsync = () => {
  var email = $("#email").val(),
    password = $("#password").val(),
    tips = $("#login_state");
  tips.addClass("alert-light");
  tips.html("<img src='assets/img/loader.gif' />");
  $.post("api/api.php?action=logIn",
    {
      email: email,
      password: password,
    },
    (data, status) => {
      if (status == "success") {
        try {
          //console.log(data)
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
}
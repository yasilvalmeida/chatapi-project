var user_data_table;
$(() => {
  user_data_table = $("#dataTable").DataTable({
    processing: true,
    serverSide: false,
    order: [],
    ajax: {
      url: "api/api.php?action=fetchAllUser",
      type: "POST",
      data: {},
    },
    oLanguage: {
      sLengthMenu: "Mostrar _MENU_ Linhas por pagina",
      sZeroRecords: "Nenhum Registro Encontrado!",
      sInfo: "Mostrar _START_ de _END_ de _TOTAL_ linhas",
      sInfoEmpty: "Mostrando 0 de 0 de 0 linhas",
      sInfoFiltered: "(Filtro de _MAX_ total linhas)",
      sSearch: "Procurar <i class='fa fa-search'></i>",
      oPaginate: {
        sFirst: "Primeiro", // This is the link to the first page
        sPrevious: "<i class='fas fa-arrow-circle-left'></i> Anterior", // This is the link to the previous page
        sNext: "Proximo <i class='fas fa-arrow-circle-right'></i>", // This is the link to the next page
        sLast: "Ultimo", // This is the link to the last page
      },
    },
    columnDefs: [{ orderable: false, targets: [1, 3, 4] }],
  });
  /* This function will update the text in the tips div the the text and the css */
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
});
/* This function will update the text in the tips div the the text and the css */
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
function insert() {
  var email_add = $("#email_add"),
    username_add = $("#username_add"),
    password_add = $("#password_add"),
    access_add = $("#access_add"),
    bValid = true,
    tips = $("#insert_state");
  tips.removeClass("alert-danger").addClass("alert-light");
  if (email_add.val() == "") {
    updateTips(tips, "Por favor preencha o email");
    email_add.focus();
  } else if (username_add.val() == "") {
    updateTips(tips, "Por favor preencha o nome do utilisador");
    username_add.focus();
  } else if (password_add.val() == "") {
    updateTips(tips, "Por favor preencha password");
    password_add.focus();
  } else if (username_add.val() == password_add.val()) {
    updateTips(
      tips,
      "O Nome do utilisador e a palavra passe não podem ser iguais"
    );
    username_add.focus();
  } else if (password_add.val().includes(username_add.val())) {
    updateTips(tips, "A palavra passe não pode conter o nome do utilisador");
    username_add.focus();
  } else {
    bValid = bValid && checkLength(email_add, "e-mail", 8, 80, tips);
    bValid =
      bValid &&
      checkRegexp(
        email_add,
        /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,
        "Por favor introduza um email válido, como por exemplo: account@domain.com",
        tips
      );
    bValid = bValid && checkLength(tips, username_add, "username", 3, 30);
    bValid =
      bValid &&
      checkRegexp(
        username_add,
        /[QWERTYUIOPASDFGHJKLZXCVBNM]([0-9qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM])+$/i,
        "The username must begin with a letter and followed by numbers or letters.", tips
      );
    bValid = bValid && checkLength(tips, password_add, "password", 6, 20);
    bValid =
      bValid &&
      checkRegexp(
        password_add,
        /[0-9]/,
        "The password must containt at least one number.", tips
      );
    bValid =
      bValid &&
      checkRegexp(
        password_add,
        /[qwertyuiopasdfghjklzxcvbnm]/,
        "The password must contain at least one lowercase letter.", tips
      );
    bValid =
      bValid &&
      checkRegexp(
        password_add,
        /[QWERTYUIOPASDFGHJKLZXCVBNM]/,
        "The password must contain at least one capital letter.", tips
      );
    bValid =
      bValid &&
      checkRegexp(
        password_add,
        /[@£€#$%&*+-?!]/,
        "The password must consist of at least 1 special character, namely @, £, €, #, $, %, &, *, +, -, ? or !.", tips
      );
    bValid =
      bValid &&
      checkRegexp(access_add, /[01]/, "The access must be 0 or 1.", tips);
    if (bValid) {
      insertAsync();
    }
  }
}

function insertAsync() {
  var tips = $("#insert_state");
  tips.addClass("alert-light");
  tips.html("<img src='assets/img/loader.gif' />");
  $.post("api/api.php?action=insertUser",
    {
      email: $("#email_add").val(),
      username: $("#username_add").val(),
      password: $("#password_add").val(),
      access: $("#access_add").val(),
    },
    (data, status) => {
      if (status == "success") {
        try {
          var r = JSON.parse(data);
          if (parseInt(r.result) != NaN && parseInt(r.result) == 1) {
            tips.html("Registado com sucesso");
            $("#addModal").modal("hide");
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
  var tips = $("#update_state");
  $("#id_upd").val(user.id);
  $("#email_upd").val(user.email);
  $("#username_upd").val(user.username);
  $("#password_upd").val(user.password);
  $("#access_upd").val(user.access);
  tips.addClass("alert-light");
  $("#updModal").modal("show");
}
function updateAsync() {
  var tips = $("#update_state");
  const access = $("#access_upd").val();
  if (access < 0 || access > 1) {
      updateTips(tips, "The access must be 0 or 1!");
  }
  else {
    tips.addClass("alert-light");
    tips.html("<img src='assets/img/loader.gif' />");
    $.post(
      "api/api.php?action=updateUser",
      {
        id: $("#id_upd").val(),
        email: $("#email_upd").val(),
        username: $("#username_upd").val(),
        password: $("#password_upd").val(),
        access: $("#access_upd").val(),
      },
      (data, status) => {
        if (status == "success") {
          try {
            var r = JSON.parse(data);
            if (parseInt(r.result) != NaN && parseInt(r.result) == 1) {
              tips.html("Alterardo com sucesso!");
              $("#updModal").modal("hide");
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
}
function remove(id) {
  var tips = $("#remove_state");
  $("#delModalBody").html("<p>Deseja eliminar este registo?</p><input id='id_del' type='hidden' /><div id='remove_state' class='d-flex justify-content-center' role='alert'></div >");
  $("#id_del").val(id);
  tips.addClass("alert-light");
  $("#delModal").modal("show");
}
function removeAsync() {
  var tips = $("#remove_state");
  tips.addClass("alert-light");
  tips.html("<img src='assets/img/loader.gif' />");
  $.post(
    "api/api.php?action=removeUser",
    {
      id: $("#id_del").val(),
    },
    (data, status) => {
      if (status == "success") {
        try {
          var r = JSON.parse(data);
          if (parseInt(r.result) != NaN && parseInt(r.result) == 1) {
            tips.html("Removido com sucesso!");
            $("#delModal").modal("hide");
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
  $("#email_add").val("");
  $("#username_add").val("");
  $("#password_add").val("");
  $("#insert_state").removeClass("alert-success");
  $("#insert_state").addClass("alert-light");
  $("#insert_state").html("");
  /* Update */
  $("#email_upd").val("");
  $("#username_upd").val("");
  $("#password_upd").val("");
  $("#access_upd").val("");
  $("#update_state").removeClass("alert-success");
  $("#update_state").addClass("alert-light");
  $("#update_state").html("");
  /* Remove */
  $("#id_to_remove").val("");
  $("#remove_state").removeClass("alert-success");
  $("#remove_state").addClass("alert-light");
  $("#remove_state").html("");
}

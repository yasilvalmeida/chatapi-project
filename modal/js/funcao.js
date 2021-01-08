$(function () {
	var emailToRecover = $("#emailToRecover"),
		usernameToLogin = $("#usernameToLogin"),
		passwordToLogin = $("#passwordToLogin"),
		allFields = $([]).add(emailToRecover).add(usernameToLogin).add(passwordToLogin);

	function updateTips(t) {
		tips
			.text(t)
			.addClass("ui-state-highlight");
		setTimeout(function () {
			tips.removeClass("ui-state-highlight", 1500);
		}, 500);
	}

	function checkLength(o, n, min, max, tips) {
		if (o.val().length > max || o.val().length < min) {
			o.addClass("ui-state-error");
			tips.addClass("ui-state-error");
			tips.html("A longitude da " + n + " deve estar entre  " + min + " e " + max + ".");
			return false;
		} else {
			return true;
		}
	}

	function checkRegexp(o, regexp, n, tips) {
		if (!(regexp.test(o.val()))) {
			o.addClass("ui-state-error");
			tips.addClass("ui-state-error");
			tips.html(n);
			return false;
		} else {
			return true;
		}
	}
	$.fx.speeds._default = 900;

	$("#autenticarDialogo").dialog({
		autoOpen: false,
		resizable: false,
		show: "clip",
		hide: "clip",
		modal: true,
		closeOnEscape: true,
		buttons: {
			"Autenticar": function () {
				var bValid = true,
					tips = $("#autenticarState");
				allFields.removeClass("ui-state-error");
				if (usernameToLogin.val() == "") {
					tips.html("O nome de utilizador não deve ser em branco.");
					usernameToLogin.addClass("ui-state-error");
					usernameToLogin.focus();
				} else if (passwordToLogin.val() == "") {
					tips.html("A palavra passe não deve ser em branco.");
					passwordToLogin.addClass("uistate-error");
					passwordToLogin.focus();
				} else if (usernameToLogin.val() == passwordToLogin.val()) {
					tips.html("A palavra-passe deve ser diferente do nome do utilizador.");
					passwordToLogin.addClass("ui-state-error");
					passwordToLogin.focus();
				} else {
					bValid = bValid && checkLength(usernameToLogin, "nome do utilizador", 3, 20, tips);
					bValid = bValid && checkRegexp(usernameToLogin, /^[QWEÉÈÊẼRTYÝỲỸŶUÚÙŨÛÍÌĨÎOÓÒÕÔPAÃÂÁÀSDFGHJKLÇZXCVBNM]([0-9qweéèẽêrtyýỳỹŷiíìîĩoóòôõpaáàãâsdfghjklçzxcvbnmQWEÉÈÊẼRTYÝỲỸŶUÚÙŨÛÍÌĨÎOÓÒÕÔPAÃÂÁÀSDFGHJKLÇZXCVBNM_])+$/i, "O Nome de utilizador deve estar constituído por caractéres de a-z, 0-9, underscores, começando por uma letra.", tips);
					bValid = bValid && checkLength(passwordToLogin, "palavra passe", 6, 50, tips);
					bValid = bValid && checkRegexp(passwordToLogin, /[0-9]/, "A Palavra-passe deve estar constituída pelo menos 1 número.", tips);
					bValid = bValid && checkRegexp(passwordToLogin, /[qweéèẽêrtyýỳỹŷiíìîĩoóòôõpaáàãâsdfghjklçzxcvbnm]/, "A Palavra-passe deve estar constituída pelo menos 1 letra minúscula.", tips);
					bValid = bValid && checkRegexp(passwordToLogin, /[QWEÉÈÊẼRTYÝỲỸŶUÚÙŨÛÍÌĨÎOÓÒÕÔPAÃÂÁÀSDFGHJKLÇZXCVBNM]/, "A Palavra-passe deve estar constituída pelo menos 1 letra maiúscula.", tips);
					bValid = bValid && checkRegexp(passwordToLogin, /[@#$%&*+-?!~^]/, "A Palavra-passe deve estar constituída pelo menos 1 caracter especial.", tips);
					if (bValid) {
						autenticarAsync();
					}
				}
			}
		},
		close: function () {
			allFields.val("").removeClass("ui-state-error");
			$("#autenticar").tooltip("close");
			document.location.href = "index.php";
		}
	});
	$("#recuperarDialogo").dialog({
		autoOpen: false,
		resizable: true,
		show: "clip",
		hide: "clip",
		modal: true,
		closeOnEscape: true,
		buttons: {
			"Recuperar": function () {
				var bValid = true,
					tips = $("#recuperarState");
				allFields.removeClass("ui-state-error");
				bValid = bValid && checkLength(emailToRecover, "email", 3, 50, tips);
				bValid = bValid && checkRegexp(emailToRecover, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i, "exemplo. alguem@dominio.com", tips);
				if (bValid) {
					recuperarAsync();
				}
			}
		},
		close: function () {
			allFields.val("").removeClass("ui-state-error");
			$("#recuperar").tooltip("close");
			document.location.href = "index.php";
		}
	});
	$("#recuperar").tooltip({
		show: {
			effect: "blind",
			delay: 50
		},
		hide: {
			effect: "blind",
			delay: 150
		}
	});
	$("#autenticar").tooltip({
		show: {
			effect: "blind",
			delay: 50
		},
		hide: {
			effect: "blind",
			delay: 150
		}
	});
	$("#aquistp").tooltip({
		show: {
			effect: "blind",
			delay: 50
		},
		hide: {
			effect: "blind",
			delay: 150
		}
	});
	$("#inic").tooltip({
		show: {
			effect: "blind",
			delay: 50
		},
		hide: {
			effect: "blind",
			delay: 150
		}
	});
	$('#usernameToLogin').keyup(function (e) {
		var code = (e.keyCode ? e.keyCode : e.which);
		if (code == 13) { //Enter keycode
			var bValid = true,
				tips = $("#autenticarState");
			allFields.removeClass("ui-state-error");
			if (usernameToLogin.val() == "") {
				tips.html("O nome de utilizador não deve ser em branco.");
				usernameToLogin.addClass("ui-state-error");
				usernameToLogin.focus();
			} else if (passwordToLogin.val() == "") {
				tips.html("A palavra passe não deve ser em branco.");
				passwordToLogin.addClass("uistate-error");
				passwordToLogin.focus();
			} else if (usernameToLogin.val() == passwordToLogin.val()) {
				tips.html("A palavra-passe deve ser diferente do nome do utilizador.");
				passwordToLogin.addClass("ui-state-error");
				passwordToLogin.focus();
			} else {
				bValid = bValid && checkLength(usernameToLogin, "nome do utilizador", 3, 20, tips);
				bValid = bValid && checkRegexp(usernameToLogin, /^[QWEÉÈÊẼRTYÝỲỸŶUÚÙŨÛÍÌĨÎOÓÒÕÔPAÃÂÁÀSDFGHJKLÇZXCVBNM]([0-9qweéèẽêrtyýỳỹŷiíìîĩoóòôõpaáàãâsdfghjklçzxcvbnmQWEÉÈÊẼRTYÝỲỸŶUÚÙŨÛÍÌĨÎOÓÒÕÔPAÃÂÁÀSDFGHJKLÇZXCVBNM_])+$/i, "O Nome de utilizador deve estar constituído por caractéres de a-z, 0-9, underscores, começando por uma letra.", tips);
				bValid = bValid && checkLength(passwordToLogin, "palavra passe", 6, 50, tips);
				bValid = bValid && checkRegexp(passwordToLogin, /[0-9]/, "A Palavra-passe deve estar constituída pelo menos 1 número.", tips);
				bValid = bValid && checkRegexp(passwordToLogin, /[qweéèẽêrtyýỳỹŷiíìîĩoóòôõpaáàãâsdfghjklçzxcvbnm]/, "A Palavra-passe deve estar constituída pelo menos 1 letra minúscula.", tips);
				bValid = bValid && checkRegexp(passwordToLogin, /[QWEÉÈÊẼRTYÝỲỸŶUÚÙŨÛÍÌĨÎOÓÒÕÔPAÃÂÁÀSDFGHJKLÇZXCVBNM]/, "A Palavra-passe deve estar constituída pelo menos 1 letra maiúscula.", tips);
				bValid = bValid && checkRegexp(passwordToLogin, /[@#$%&*+-?!~^]/, "A Palavra-passe deve estar constituída pelo menos 1 caracter especial.", tips);
				if (bValid) {
					autenticarAsync();
				}
			}
		}
	});
	$('#passwordToLogin').keyup(function (e) {
		var code = (e.keyCode ? e.keyCode : e.which);
		if (code == 13) { //Enter keycode
			var bValid = true,
				tips = $("#autenticarState");
			allFields.removeClass("ui-state-error");
			if (usernameToLogin.val() == "") {
				tips.html("O nome de utilizador não deve ser em branco.");
				usernameToLogin.addClass("ui-state-error");
				usernameToLogin.focus();
			} else if (passwordToLogin.val() == "") {
				tips.html("A palavra passe não deve ser em branco.");
				passwordToLogin.addClass("uistate-error");
				passwordToLogin.focus();
			} else if (usernameToLogin.val() == passwordToLogin.val()) {
				tips.html("A palavra-passe deve ser diferente do nome do utilizador.");
				passwordToLogin.addClass("ui-state-error");
				passwordToLogin.focus();
			} else {
				bValid = bValid && checkLength(usernameToLogin, "nome do utilizador", 3, 20, tips);
				bValid = bValid && checkRegexp(usernameToLogin, /^[QWEÉÈÊẼRTYÝỲỸŶUÚÙŨÛÍÌĨÎOÓÒÕÔPAÃÂÁÀSDFGHJKLÇZXCVBNM]([0-9qweéèẽêrtyýỳỹŷiíìîĩoóòôõpaáàãâsdfghjklçzxcvbnmQWEÉÈÊẼRTYÝỲỸŶUÚÙŨÛÍÌĨÎOÓÒÕÔPAÃÂÁÀSDFGHJKLÇZXCVBNM_])+$/i, "O Nome de utilizador deve estar constituído por caractéres de a-z, 0-9, underscores, começando por uma letra.", tips);
				bValid = bValid && checkLength(passwordToLogin, "palavra passe", 6, 50, tips);
				bValid = bValid && checkRegexp(passwordToLogin, /[0-9]/, "A Palavra-passe deve estar constituída pelo menos 1 número.", tips);
				bValid = bValid && checkRegexp(passwordToLogin, /[qweéèẽêrtyýỳỹŷiíìîĩoóòôõpaáàãâsdfghjklçzxcvbnm]/, "A Palavra-passe deve estar constituída pelo menos 1 letra minúscula.", tips);
				bValid = bValid && checkRegexp(passwordToLogin, /[QWEÉÈÊẼRTYÝỲỸŶUÚÙŨÛÍÌĨÎOÓÒÕÔPAÃÂÁÀSDFGHJKLÇZXCVBNM]/, "A Palavra-passe deve estar constituída pelo menos 1 letra maiúscula.", tips);
				bValid = bValid && checkRegexp(passwordToLogin, /[@#$%&*+-?!~^]/, "A Palavra-passe deve estar constituída pelo menos 1 caracter especial.", tips);
				if (bValid) {
					autenticarAsync();
				}
			}
		}
	});
});
$.ajaxSetup({
	cache: false
});

function recuperar() {
	$("#recuperarDialogo").dialog("open");
}

function recuperarAsync() {
	var emailToSend = $("#emailToRecover").val();
	$("#recuperarState").html("<img src='images/preloader-01.gif' />");
	$.post("ajax/recovery.php", {
			email: emailToSend
		},
		function (data) {
			var result = data.text.split(":");
			if (result[0] > 0) {
				$("#recuperarDialogo").dialog('option', 'buttons', {
					'Fechar': function () {
						$(this).dialog('close');
					}
				});
				$("#recuperarState").html("<p>" + result[1] + "</p>");
				setTimeout(function () {
					document.location.href = "index.php";
				}, 2000);
			} else {
				$("#recuperarState").addClass("ui-state-error")
				$("#recuperarState").html("<p>" + result[1] + "</p>");
			}
		}, "json");
}

function autenticar() {
	$("#autenticarDialogo").dialog("open");
}

function autenticarAsync() {
	//alert($("#usernameToLogin").val() + "" + $("#passwordToLogin").val())
	$("#autenticarState").html("<img src='images/preloader-01.gif' />");
	$.post("ajax/authentication.php", {
			username: $("#usernameToLogin").val(),
			password: $("#passwordToLogin").val()
		},
		function (data) {
			var result = data.text;
			//alert(result)
			if (result == "1") {
				$("#autenticarDialogo").dialog('option', 'buttons', {
					'Fechar': function () {
						document.location.href = "inicio.php";
					}
				});
				$("#autenticarState").html("<p>Autenticação com exito!</p>");
				setTimeout(function () {
					document.location.href = "inicio.php";
				}, 2000);
			} else if (result == "2") {
				$("#autenticarState").addClass("ui-state-error")
				$("#autenticarState").html("<p>Sua conta encontra-se bloqueada, por favor contactar o Administrador!</p>");
			} else {
				$("#autenticarState").addClass("ui-state-error")
				$("#autenticarState").html("<p>Autenticação falhada!</p>");
			}
		}, "json");
}

function updateTips(t) {
	tips
		.text(t)
		.addClass("ui-state-highlight");
	setTimeout(function () {
		tips.removeClass("ui-state-highlight", 1500);
	}, 500);
}

function checkLength(o, n, min, max, tips) {
	if (o.val().length > max || o.val().length < min) {
		o.addClass("ui-state-error");
		tips.addClass("ui-state-error");
		tips.html("A longitude da " + n + " deve estar entre  " + min + " e " + max + ".");
		return false;
	} else {
		return true;
	}
}

function checkRegexp(o, regexp, n, tips) {
	if (!(regexp.test(o.val()))) {
		o.addClass("ui-state-error");
		tips.addClass("ui-state-error");
		tips.html(n);
		return false;
	} else {
		return true;
	}
}

function contains(extensions, ext) {
	var length = extensions.length;
	for (var i = 0; i < length; i++) {
		if (extensions[i].toLowerCase() == ext.toLowerCase())
			return true;
	}
	return false;
}

function showExtension(extensions) {
	var result = "";
	var length = extensions.length;
	for (var i = 0; i < length - 1; i++) {
		result += extensions[i] + ", ";
	}
	result += extensions[length - 1];
	return result;
}

function show(e) {
	path = e.value;
}

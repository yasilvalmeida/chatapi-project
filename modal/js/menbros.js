$(function () {


	var titulo = $("#idtitulo"),
		idconteudo = $("#idconteudo"),
		//nucar = $("#numerocarta"),
		//	nucar = $("#numerocarta"),
		//recibobanco = $("#nrecibo"),
		allFields = $([]).add(titulo).add(idconteudo)

	//.add(nucar).add(recibobanco);

	$("#adicionardocumento").dialog({
		autoOpen: false,
		resizable: true,
		show: "clip",
		hide: "clip",
		width: "540px",
		modal: true,
		closeOnEscape: true,
		buttons: {
			"Cancelar": function () {
				$(this).dialog("close");
			},
			"Adicionar": function () {
				//var bValid = true,
				//	tips = $("#adicionarDistritoState");
				//allFields.removeClass("ui-state-error");
				//bValid = bValid && checkLength(nameDistritoToInsert, "nome do parametro", 3, 50, tips);
				//	if (bValid) {
				//adicionarDistritoAsync();
				//	}
				adicionarAsyncnoticia();
			}
		},
		close: function () {
			allFields.val("").removeClass("ui-state-error");
			//$("#adicionar").tooltip("close");
			$("#adicionarState").html("");
			$("#adicionarState").removeClass("ui-state-error");
			$("#resultados_processados").html("<img src='img/loader.gif'/>").load("ajax/factura/view.php", "", function () {});
		}
	});

	$("#resultados").html("<img src='img/loader.gif'/>").load("ajax/factura/view.php", "", function () {});
	$("#idcategoria").html("<img src='img/preloader-01.gif' />").load("ajax/selection/option.php", "tipo=categoria&base=yes", function () {});

});

function criarabertura(id) {
	// alert(id);
	var numerocarta = $("#numerocarta").val(),
		controliid = $("#controloid").val(),
		nif = $("#" + id + "nif").val(),
		mone = $("#" + id + "nome").val(),
		apelido = $("#" + id + "apelido").val(),
		//  mumerocarta = $("#" + id + "nif").val();
		nomecom = mone + " " + apelido;
	$("#idToInsert").val(id);
	$("#nif").val(nif);
	$("#mumerocarta").val(numerocarta);
	$("#mumerocontroloid").val(controliid);
	$("#nome").val(nomecom);
	$("#facturaToInsert").html("<img src='img/loader.gif'/>").load("ajax/factura/numero.php", "", function () {});
	$("#adicionarabertura").dialog("open");

}

function adicionarAsyncnoticia() {
	//$("#adicionarState").html("<img src='img/loader.gif'/>");
	// var fac = $("#facturaToInsert").text(),
	//var fac = $("#facturaToInsert").text(),
	//nif = $("#nif").val(),
	//nomecome = $("#nome").val(),
	//valor = $("#valor").val(),
	//recibobanco = $("#nrecibo").val(),
	//	numerocarta = $("#numerocarta").val();
	// var nc = Math.floor((Math.random() * 100) + 1);
	//alert(recibobanco)
	//	(alert($("#fileimg")).val();




	//data.append('file', $('#fileimg')[0].files[0]);
	testepdf();


	//var idfoto = $("#idfoto64").val();
	//alert(idfoto)

	//var data = new FormData();
	//	var files = $("#fileimg")[0].files;
	//	alert(files[0].name);

	//var strings = files[0].name;
	// Convertendo para Base64
	//alert(strings)
	//var emBase64 = Base64.encode(strings);
	//alert(emBase64)

	//	alert($("file").files[0])
	//	$("#testeimg").html("<img src='image/jpeg;base64" + strings + "'/>")



	//alert();

	//for (var i = 0; i < files.length; i++) {
	//	alert(i)
	//	alert(files[i].name);
	//}


	//var string = 'DevPleno';

	// Convertendo para Base64
	//var emBase64 = Base64.encode(string);
	//console.log(emBase64); // Saída: "RGV2UGxlbm8="



	//allFields.removeC[lass("ui-state-error");
	//if (recibobanco == "") {
	//alert("aqui entrei");
	//tips.html("O Campo de Recibo Não Pode estar em Branco ");

	//$("#adicionarState").html("<p style='color:red'><b>O Campo de Numero de Recibo Não Pode estar em Branco<b></p>");



	/*$.post("ajax/factura/insert.php", {
			factura: fac,
			id: $("#idToInsert").val(),
			numerocarta: $("#numerocarta").val(),
			recibobanco: $("#nrecibo").val(),
			mumerocontroloid: $("#mumerocontroloid").val()
		},
		function (data) {
			var result = parseInt(data.text);
			//  alert(result)
			if (result > 0) {
				$("#adicionarState").html("<p>Os seus dados foram adicionados com êxito!</p>");
				$("#adicionarabertura").dialog('option', 'buttons', {
					'Fechar': function () {
						$("#adicionarabertura").dialog("close");
						$("#adicionarState").html("");
						$("#adicionarabertura").dialog('option', 'buttons', {
							"Cancelar": function () {
								$(this).dialog("close");
							},
							"Factura": function () {
								var bValid = true,
									tips = $("#adicionarState"),
									recibobanco = $("#nrecibo");
								allFields.removeClass("ui-state-error");

								if (recibobanco.val() == "") {
									tips.html("O Campo de Recibo Não Pode estar em Branco");
									recibobanco.addClass("ui-state-error");
									recibobanco.focus();
									bValid = false;
								}

								if (bValid) {
									adicionarAsync();
								}

							}
						});
					}
				});
				setTimeout(function () {

					$("#adicionarabertura").dialog("close");
					$("#adicionarState").html("");
					$("#adicionarState").removeClass("ui-state-error");
					$("#resultados").html("<img src='img/loader.gif'/>").load("ajax/factura/view.php", "", function () {});
					window.open("ajax/factura/print.php?idfatura=" + fac + "&nome=" +
						nomecome + "&nif=" + nif + "&nrecibo=" + recibobanco + "&nc=" + numerocarta,
						"_blank ");
					$("#adicionarabertura").dialog('option', 'buttons', {
						"Cancelar": function () {
							$(this).dialog("close");
						},
						"Factura": function () {
							var bValid = true,
								tips = $("#adicionarState"),
								recibobanco = $("#nrecibo");
							allFields.removeClass("ui-state-error");
							if (recibobanco.val() == "") {
								tips.html("O Campo de Recibo Não Pode estar em Branco");
								recibobanco.addClass("ui-state-error");
								recibobanco.focus();
								bValid = false;
							}

							if (bValid) {
								adicionarAsync();
							}
						}
					});
				}, 1000);
			} else {
				$("#adicionarState").addClass("ui-state-error");
				$("#adicionarState").html("<p>Registro dos dados falhada!</p>");
			}
		}, "json");*/
}


function canlcelarx() {
	$("#adicionarDialogo").dialog("close");
}

function adicionardocumento() {
	$("#adicionardocumento").dialog("open");
}

function testepdf() {
	var files = document.getElementById('file-doc').files;
	if (files.length > 0) {
		getBase64(files[0]);
		alert(files[0])
	}
}

function getBase64(file) {
	var reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = function () {
		console.log(reader.result);
	};
	reader.onerror = function (error) {
		console.log('Error: ', error);
	};
}

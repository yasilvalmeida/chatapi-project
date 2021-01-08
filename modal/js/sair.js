$(function() {
    $.fx.speeds._default = 900;
    //Sair Dialogo
    $("#sairDialogofff").dialog({
        autoOpen: false,
        resizable: false,
        show: "clip",
        hide: "clip",
        modal: true,
        closeOnEscape: true,
        buttons: {
            "Não": function() {
                $(this).dialog("close");
            },
            "Sim": function() {
                sairAsync();
            }
        },
        close: function() {}
    });
    $("#sair").tooltip({
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
//Sair functions
function sair() {
    alert("cheifdgfd");
    //  $("#sairDialogo").dialog("open");
}

function sairAsync() {
    alert("cheifdgfd");
    var tips = $("#sairState");
    tips.html("<img src='../img/loader.gif' />");
    $.post("../api/login.php?action=logOut", {}, (data, status) => {
        if (status == "success") {
            try {
                var r = JSON.parse(data);
                alert(r.result);
                if (parseInt(r.result) != NaN && parseInt(r.result) == 1) {
                    tips.html("Sair com sucesso, Adeus!");
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
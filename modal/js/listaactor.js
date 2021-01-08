$(function() {

    var iddistrito = $("#iddistritocominidade"),

        nomeccomunidade = $("#nomeccomunidade"),

        allFields = $([]).add(iddistrito).add(nomeccomunidade);

    //$("#iddistritoactor").html("<img src='img/preloader-01.gif' />").load("ajax/selection/option.php", "tipo=distrito&base=yes", function() {});SELECT DISTINCT  c.id_actores,nome , c.bi,c.nif,c.data_nascimento,c.habilitacao , tc.designacao  FROM t_actores c , t_cuminidade tc ,t_actividade_pecuaria p   WHERE c.idmorada=tc.idt_cuminidade AND c.id_actores=p.actor_id
    $("#iddistritocominidadeaddagricultor").html("<img src='img/preloader-01.gif' />").load("ajax/selection/option.php", "tipo=distrito&base=yes", function() {});
    $("#idespecie_0").html("<img src='img/loader.gif' />").load("ajax/selection/option.php", "tipo=especie&base=no&idespecie=0", function() {});
    //$("#culturaactor").html("<img src='img/loader.gif' />").load("ajax/selection/option.php", "tipo=cultura&base=yes&idculturatipo=0", function() {});
    $("#actividadeactor").html("<img src='img/loader.gif' />").load("ajax/selection/option.php", "tipo=tipo_atividadelistaator&base=yes", function() {});
    $("#actor_sexo").html("<img src='img/loader.gif' />").load("ajax/selection/option.php", "tipo=sexo&base=yes", function() {});
    $("#listacuminidadeactor").html("<img src='img/loader.gif' />").load("ajax/selection/option.php", "tipo=tipo_comunidaelista&base=yes", function() {});

    $("#idvermais").dialog({
        autoOpen: false,
        resizable: false,
        show: "clip",
        hide: "clip",
        width: "900",
        height: "450",
        modal: true,
        closeOnEscape: true,
        buttons: {
            "Fechar": function() {
                $(this).dialog("close");
                //  $("#noticiaContent").html("<img src='images/preloader-01.gif'/>").load("ajax/sorteio/view.php", "", function() {});
                //setTimeout(function() {
                //      id_cart_agri = $("#idcartao_agricultor").val();
                // if (id_cart_agri == "") {

                //} else {
                //  window.open("cartao.php?id=" + id_cart_agri, '_blank');
                //  }


                // }, 2000);
                // document.location.reload(true);
            }

        },
        close: function() {
            // $("#noticiaContent").html("<img src='images/preloader-01.gif' />").load("ajax/sorteio/view.php", "", function() {});
            //$(this).dialog("close");
            //$("#noticiaContent").html("<img src='images/preloader-01.gif' />").load("ajax/sorteio/view.php", "", function () {});
            //  id_cart_agri = $("#idcartao_agricultor").val();
            /*
            if (id_cart_agri == "") {

            } else {
                window.open("cartao.php?id=" + id_cart_agri, '_blank');
            }
*/
        }
    });
});


function mostarramodeactividade() {
    // alert("ola");
    var ramodeactividade = $("#actividadeactor option:selected").val();
    // alert(ramodeactividade)

    if (ramodeactividade == 1) {
        $("#lista_actorcontent").html("<img src='img/loader.gif'/>").load("ajax/cuminidade/listagem_view_agricultura.php", "", function() {});

    } else if (ramodeactividade == 2) {
        $("#lista_actorcontent").html("<img src='img/loader.gif'/>").load("ajax/cuminidade/listagem_view_pecuaria.php", "", function() {});
    } else {
        $("#lista_actorcontent").html("<img src='img/loader.gif'/>").load("ajax/cuminidade/listagem_view.php", "", function() {});
    }




}

function addicoonarvermas(id) {
    alert("id=" + id);
    //$("#id_listarvermas").html("<img src='img/loader.gif'/>").load("ajax/cuminidade/ver_mais.php", "", function() {});
    $("#id_listarvermas").html("<img src='img/loader.gif' />").load("ajax/cuminidade/ver_mais.php", "id_autor=" + id, function() {});
    $("#idvermais").dialog("open");
}

//------------------------------------------------------- Nova Sistema----------------------------------------------------------

$(function () {

            var name = $("#name"),
            design = $("#design"),
            allFields = $([]).add(name).add(design);

    function InsertInfo_web() {
        var dadosajax;
        alert("entrei");
//Validation of several atribute        
        var valid = true;
        valid = validar_campoVazio(name.val(), "Titulo");
        if (valid === false)return false;
        valid = validar_campoVazio(design.val(), "Conteudo");
        if (valid === false)return false;
        
         dadosajax = {
            'name': name.val(),
            'design': design.val()

        };
        $.post('ajax/insert_info_web.php', dadosajax, function (retorna) {
            $(".resultados").html(retorna);
            
        });

    }

    $("#b_Info_web").button().on("click", function () {
        alert();
        InsertInfo_web();

    });
    
    $("#b_publicNews").button().on("click", function () {
        AlterState(document.getElementById("PNID").value);

    });

});

   function FoundNews() {

                var pesquisa = document.getElementById("pesquisa").value;
                $(".resultados").html("<img src='./img/loding.gif'width='50' >");
                var dados = {
                    palavra: pesquisa
                };
                $.post('./ajax/FoundNews.php', dados, function (retorna) {
                    $(".resultados").html(retorna);
                });

            }
         
function ListInfo_web(name) {
         $(".resultados").html("<img src='./img/loding.gif'width='50' >");
		var dados = {
                
                'name':name
                };
				
                $.post('./ajax/ListInfo_web.php', dados, function (retorna) {
                    $(".resultados").html(retorna);
                });
			
            }
function EditInfo_web(id) {
  
                var dados1 = {
                    'id': id
                };
               
                $.post('./ajax/form-edit/EditInfo_WebtAJAX.php', dados1, function (retorna) {
                    
                    $("#span7").html(retorna);
                      
                });
                
            }
function AddFile(id) {
                var dados1 = {
                    'id': id
                };
               
                $.post('./ajax/form-edit/AddFileAJAX.php', dados1, function (retorna) {
                    $("#span7").html(retorna);
                });
                
            }
            
function AlterState(id) {
                var dados1 = {
                    'id':id
                };
                if(confirm("Tens Certeza que Desejas Efectuar Esta Operação?")){
                $.post('./ajax/AlterState.php', dados1, function (retorna) {
                    $("#span7").html(retorna);
                });
            }
            }
            
function delFyle(id) {
                var dados1 = {
                    'id':id
                };
                if(confirm("Tens Certeza que Desejas Efectuar Esta Operação?")){
                $.post('./ajax/delFyle.php', dados1, function (retorna) {
                    $("#span7").html(retorna);
                });
            }
            }
            
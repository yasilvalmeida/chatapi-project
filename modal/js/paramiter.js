


function  chamar_insert_paramet_dependent(tipo,descr){
      
        
        var  id = $("#selt").val(),
            descricao= $('#'+descr).val();

         alert('chamar_insert_paramet_dependent :'+ tipo +' '+descr+' : '+ descricao +' '+id); 
        insert_paramet_dependent(tipo,descr,id);
          
   }

function pintar_modalParamiter(tipo,descr,id){
    document.getElementById("modalP_desc").value=descr;
     document.getElementById("modalP_id").value=id;
     document.getElementById("modalP_type").value=tipo;
 }  

     
function pegarID(idd){
 
    alert(idd);
}

function teste(){
$('#input_tipe').hide();
   

var dep = $('#input_tipe').val(); 
 alert(dep);

$('#add_dep').html('<input title="" class="form-control" name="title" id="input_'+dep+'"  type="text" required="required" placeholder="Titulo" data-toggle="tooltip" data-placement="left" />'+
          '<div  class="btn-from"  id="div_OK_'+dep+'">  <button  id="OK_'+dep+'" class="btn btn-default" style="" ><span class="">OK</span>  </button>  </div>');

    $('#OK_'+dep).button().on("click", function () {
       insert_paramet_idependent(dep,'input_'+dep);
        
    });

}

  function insert_paramet_idependent(tipo,inputId) {

    alert(inputId);
        var descricao =   $('#'+inputId).val();
                   
            var dados_ajax = {
                'descricao' : descricao,
                'tipo' : tipo
            };
         

            $.post('./ajax/addParamet_idependent.php', dados_ajax, function (retorna) {
                $('#resultad').html(retorna);
            });
            alert(descricao +'  '+ tipo);
    }


function insert_paramet_dependent(tipo,inputId,dependenceID) {
       
alert('oooo');

        var descricao = $('#'+inputId).val();
         
               
            var dados_ajax = {
                'descricao' : descricao,
                'tipo' : tipo,
                'id':dependenceID
            };
            $.post('./ajax/addParamet_dependent.php', dados_ajax, function (retorna) {
                $('#'+tipo+'_tbody').html(retorna);
            });
         alert('insert_paramet_dependent :'+tipo + ' '+ descricao + ' '+ dependenceID );
          List_paramet_dependent(tipo);   
    }
    
    
    function update_paramet_idependent(tipo,inputId,id) {
        var descricao = document.getElementById(inputId).value();
               
            var dados_ajax = {
                'descricao' : descricao,
                'tipo' : tipo,
                'id':id
            };
            $.post('./ajax/updateParamet_idependent.php', dados_ajax, function (retorna) {
                $("#span7").html(retorna);
            });
            
    }
            
function update_paramet_dependent(tipo,inputId,dependenceID,id) {
        var descricao = document.getElementById(inputId).value();
        var id_dependence = document.getElementById(dependenceID).value();
               
            var dados_ajax = {
                'descricao' : descricao,
                'tipo' : tipo,
                'id_dependence' : id_dependence,
                'id':id
            };
            $.post('./ajax/updateParamet_dependent.php', dados_ajax, function (retorna) {
                $("#span7").html(retorna);
            });
            
    }






function List_paramet_dependent(tipo) {
     
            var dados_ajax = {
                'tipo' : tipo
               
            };
            $.post('./ajax/ListParamet_dependent.php', dados_ajax, function (retorna) {
                $('#'+tipo+'_tbody').html(retorna);
            });
          
                          
           
    }




    function List_paramet_inddependent(tipo) {
      
            var dados_ajax = {
                'tipo' : tipo
               
            };
            $.post('./ajax/ListParamet_idependent.php', dados_ajax, function (retorna) {
                $('#'+tipo+'_content').html(retorna);
            });
          
                          
           
    }




function get_subTipo_processo(tipo_processo) {
     tipo_processo=$("#"+tipo_processo).val();
            var dados_ajax = {
                'tipo_processo' : tipo_processo
               
            };
            $.post('./ajax/get_subTipo_processo.php', dados_ajax, function (retorna) {
                $(".subTipo_processo").html(retorna);
            });
            
    } 

function montar_formulario(subTipo_processo) {
        var formulario = {
                    'secao1' : '',
                    'secao2' : '',
                    'secao3' : '',
                    'secao4' : '',
                    'secao5' : ' ',
                    'secao6' : ' ',
                    'secao7' : ' ',
                    'secao8' : ' ',
                    'secao9' : ' ',
                    'secao10' : ' '
                   
                };
        subTipo_processo=$("#"+subTipo_processo).val();
        
        switch(subTipo_processo) {
            case '1':
            formulario = {
                'secao0' : 'cabecalho.php',
                'secao1' : 'responsavel_tratamento.php',
                'secao1.1' : 'representante.php',
                'secao1.2' : 'finalidade_tratamento.php',
                'secao3' : 'dados_tratados_em_registro.php',
                'secao4' : 'recolha_de_dados.php',
                'secao5' : 'comunicacao_dados_terceiro.php',
                'secao6' : 'interconexoes.php',
                'secao7' : 'transferencia_internacional_dados.php',
                'secao8' : 'prazo_conservacao_a_implementar.php',
                'secao9' : 'exercicio_direito_acesso.php',
                'secao10' : 'medidas_seguranca_a_implementar.php'
               
            };
                
            break;
            case '2':
                 formulario = {
                'secao1' : '1 Responsável de Tratamento',
                'secao2' : '2. Finalidade do Tratamento',
                'secao3' : '3. Dados pessoais contidos em Cada Resgisto',
                'secao4' : '4. Trabalhadores abrangidos por especial obrigação de sigilo',
                'secao5' : '5. Exercício do direito de Acess',
                'secao6' : '6. Representante dos trabalhadores ',
                'secao7' : '7. Medidas de segurança a implementar ',
                'secao8' : '8. Regulamento interno ',
                'secao9' : '',
                'secao10':''
                   
                }; 
            
            break;
                
            case '3':
            
                break;
                            
            case '4':
                 formulario = {
                'secao1' : '1 Responsável de Tratamento',
                'secao2' : '2. Finalidade do Tratamento',
                'secao3' : '3. Dados pessoais contidos em Cada Resgisto',
                'secao4' : '4. Trabalhadores abrangidos por especial obrigação de sigilo',
                'secao5' : '5. Exercício do direito de Acess',
                'secao6' : '6. Representante dos trabalhadores ',
                'secao7' : '7. Medidas de segurança a implementar ',
                'secao8' : '8. Regulamento interno ',
                'secao9' : '',
                'secao10' : ''
                   
                }; 
                
                break;
                            
            case '5':
                 formulario = {
                'secao1' : '1 Responsável de Tratamento',
                'secao2' : '2. Finalidade do Tratamento',
                'secao3' : '3. Dados pessoais contidos em Cada Resgisto',
                'secao4' : '4. Trabalhadores abrangidos por especial obrigação de sigilo',
                'secao5' : '5. Exercício do direito de Acess',
                'secao6' : '6. Representante dos trabalhadores ',
                'secao7' : '7. Medidas de segurança a implementar ',
                'secao8' : '8. Regulamento interno ',
                'secao9' : '',
                'secao10' : ''
                   
                }; 
                break;
                            
            case '6':
            
                break;
                            
            case '7':
                 formulario = {
                'secao1' : '1. Responsável de Tratamento',
                'secao2' : '2. Finalidade do Tratamento',
                'secao3' : '3. Dados pessoais contidos em cada registo',
                'secao4' : '4. Forma de armazenamento de dado biométrico',
                'secao5' : '5. Tratamento da informação ',
                'secao6' : '6. Exercício do direito de Acesso ',
                'secao7' : '7. Medidas de segurança a implementar',
                'secao8' : '8. Representante dos trabalhadores',
                'secao9' : '',
                'secao10' : ''
                   
                }; 
                break;
                            
            case '8':
                 formulario = {
                'secao1' : 'dfsdf',
                'secao2' : 'dfsdf',
                'secao3' : 'dfsdf',
                'secao4' : 'dfsdf',
                'secao5' : 'dfsdf',
                'secao6' : 'dfsdf',
                'secao7' : 'dfsdf',
                'secao8' : 'dfsdf',
                'secao9' : 'dfsdf',
                'secao10' : 'dfsdf'
               
            };
            
            break;
                            
            case '9':
            
                break;
                            
            case '10':
            
                break;
                            
            case '11':
            
                break;
                            
            case '12':
            
                break;
            
            default:
            break;  
        }
        alert(subTipo_processo);
        /* $(".resultados").html(
         formulario.secao1+'<br>'+
         formulario.secao2+'<br>'+
         formulario.secao3+'<br>'+
         formulario.secao4+'<br>'+
         formulario.secao5+'<br>'+
         formulario.secao6+'<br>'+
         formulario.secao7+'<br>'+
         formulario.secao8+'<br>'+
         formulario.secao9+'<br>'+
         formulario.secao10+'<br>'
         );*/

          $.post('./formulario/formulario.php', formulario, function (retorna) {
                $(".resultados").html(retorna);
            });
        
    }       
function List_paramet_idependent(tipo) {
     
            var dados_ajax = {
                'tipo' : tipo
               
            };
            $.post('./ajax/ListParamet_idependent.php', dados_ajax, function (retorna) {
                $(".resultados").html(retorna);
            });
            
    }
 



 
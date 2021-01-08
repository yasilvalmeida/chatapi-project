
			function enviar_menssagem(titulo, texto, foto) {
			$.gritter.add({
                        // (string | mandatory) the heading of the notification
                        title: titulo,
                        // (string | mandatory) the text inside the notification
                        text:texto,
                        // (string | optional) the image to display on the left
                        image: 'img/'+foto,
                        // (bool | optional) if you want it to fade out on its own or just sit there
                        sticky: false,
                        // (int | optional) the time you want it to be alive for before fading out
                        time: '5000'
                        });
		
			}
			function validar_campoVazio(campo,titulo){
				var r=true;
				if(campo===""){
				enviar_menssagem(titulo, "Preencha Esse Campo Por Favor", "erro.png");
				
				stop_processar();
				r=false;
				
			}
			return r;
			}
		$(document).ready(function () {
			 
             $('#dataTables-example').dataTable();
         });
		  $(function () { Notifications(); 
	  
	  });
	  function refresh() {
              
                window.location.reload();
            }
		
        function valida_seNExiste(campo,lista,value){
            try{alert("1");
                erro=campo;
                 erro=document.getElementById(lista).options.namedItem(value).label;
                  alert("2");
                }catch(e){
                   enviar_menssagem('Carro Utilizador','Esse Campo Obrigatoriamente Tem de Existir na Base de Dados','erro.png');
                   document.getElementById(erro).focus();
                   document.getElementById(erro).style.color='red'; 
                   setTimeout(function() { document.getElementById(erro).style.color='black'; }, 6000);
                   alert("Um Erro foi Encontrado Actualiza a Pagina");
                    return false;
                }
        }
        function confirmPass(a,b){
            if(a!==b){
                enviar_menssagem('Password Incorecta', 'Por Favor Redigite as Senhas', 'erro.png');
                a="";
                b="";
                return false;
            }
            else{
                return true;
            }
        }
        function activate_link(link_id){
            alert('atvando...');
            document.getElementById(link_id).class="panel active";
            alert('atvando');

        }
      
  
function _(el){
	return document.getElementById(el);
}
function uploadFile(ficheiro){
   if(document.getElementById(ficheiro).value==""){
       enviar_menssagem("Mensagem de Upload","Upload Cancelado","erro.png");
       return false;
   }
   
       
        var nome_input=ficheiro;
	var file = _(ficheiro).files[0];
        
	// alert(file.name+" | "+file.size+" | "+file.type);
       
         if(file.size>=8388608){
            enviar_menssagem("Mensagem de Upload","Arquivo muito Grande(Maior a 8KB )","erro.png");
            return false;
         }
	var formdata = new FormData();
	formdata.append(ficheiro, file);
        formdata.append("arquivo",ficheiro);
	var ajax = new XMLHttpRequest();
	ajax.upload.addEventListener("progress", progressHandler, false);
	ajax.addEventListener("load", completeHandler, false);
	ajax.addEventListener("error", errorHandler, false);
	ajax.addEventListener("abort", abortHandler, false);
	ajax.open("POST", "ajax/uploader.php");
	ajax.send(formdata);
         
}
function progressHandler(event){
	_("loaded_n_total").innerHTML = "Uploaded "+event.loaded+" bytes of "+event.total;
	var percent = (event.loaded / event.total) * 100;
	_("progressBar").value = Math.round(percent);
	_("resultados").innerHTML = Math.round(percent)+"% uploaded... please wait";
}
function completeHandler(event){
    var sms=event.target.responseText;
    enviar_menssagem("Mensagem de Upload", sms,"up.png");
	//_("resultados").innerHTML = event.target.responseText;
	//_("progressBar").value = 0;
}
function errorHandler(event){
    var sms=event.target.responseText;
	//_("resultados").innerHTML = "Upload Failed";
         enviar_menssagem("Mensagem de Upload",sms,"erro.png");
}
function abortHandler(event){
    var sms=event.target.responseText;
	//_("resultados").innerHTML = "Upload Aborted";
        enviar_menssagem("Mensagem de Upload", sms,"erro.png");
}
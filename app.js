var data;

function init(){
	$('#banque').prop("disabled", true);
	$('#banque').val("");	
	$('#bic').prop("disabled", true);
	$('#bic').val("");	
	$('#iban').prop("disabled", true);				
	$('#iban').val("");		
	$('input#matricule').val("");
	data = null;
	
	$.ajax({
		url: "http://localhost:8080/sgp/api/collaborateurs",
		type: "GET",
		contentType: 'application/json; charset=utf-8',
		success: function(dataR){
			data = dataR;
			var table = $("#tableCollaborateurs")
			table.empty();
			$.each( data, function( i, collab ) {
				var line = "<tr class=\"collaborateur\" id=\""+collab.matricule+"\"><td>"+collab.matricule+"</td><td>"+collab.nom+"</td><td>"+collab.prenom+"</td></tr>"
				$(line).appendTo(table);
				$("tr#"+collab.matricule).click(function(){
					fillForm(collab.matricule);
				})
			});
		}
	});
}

$(document).ready(function(){
	init();
});

function fillForm(matricule){
	if($('#banque').prop("disabled")){
		$('#banque').prop("disabled", false);
		$('#bic').prop("disabled", false);
		$('#iban').prop("disabled", false);
	}
	$.each(data, function(index, collab){
		if(collab.matricule == matricule){
			$("#banque").val(collab.banque);
			$("#bic").val(collab.bic);
			$("#iban").val(collab.iban);
			$("input#matricule").val(collab.matricule);
		}
	});
}

function sendValues(){
	var banque = $("#banque").val();
	var bic = $("#bic").val();
	var iban = $("#iban").val();
	var matricule = $("input#matricule").val();
	if(matricule!=""){
		var getParams = 'banque='+encodeURIComponent(banque)+'&bic='+encodeURIComponent(bic)+'&iban='+encodeURIComponent(iban);
		var urlRest = 'http://localhost:8080/sgp/api/collaborateurs/'+matricule+'/banque';
		console.log(urlRest+getParams);
		$.ajax({
			url: urlRest+"?"+getParams,
			type: 'PUT',
			success: function(){
				console.log("Modification enregistrées");
				init();
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				console.log(textStatus+" : "+errorThrown);
			}
		});
	}
}
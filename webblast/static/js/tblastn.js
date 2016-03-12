$(document).ready(function() {
	$("#runblast").click(function(){
		document.getElementById('allresult').innerHTML = '';
		document.getElementById('allresult').style.display = 'none';
		var parameters = {};
		var runjedge='false';
		var d = new Date();
		var timestr = d.getTime();
		//timestr = 'a' 
		parameters['timestr'] = timestr;
		//alert($("#ready")[0].style.display.length === 0)
		if ($("#ready")[0].style.display.length != 0){
			parameters['filename'] = timestr + '_' + document.getElementById('seqfile').value.replace(/^.*?([^\\\/]*)$/, '$1')
			startUploading('seqfile',timestr);
			runjedge = 'true';
		}else{
			if ($("#sequence").val()!=''){
				parameters['seq'] = $("#sequence").val();
				runjedge = 'true';
			};
		}

		if (runjedge == 'true' || runjedge == 'false'){
			parameters['jobtitle'] = $("#jobtitle").val();
			if ($('#DB option:selected').val()!=undefined){
				parameters['DB'] = $('#DB option:selected').val();
			}else{
				parameters['DB'] = $("#DB option[index='0']").val();
			}
			parameters['evalue'] = $("#evalue").val()
			parameters['word_size'] = $("#word_size option:selected").val()
			parameters['max_target_seqs'] = $("#max_target_sequences option:selected").val()
			parameters['gapopen'] = $("#gapopen").val()
			parameters['gapextend'] = $("#gapextend").val()
			parameters['otheroptions'] = $("#otheroptions").val()
			parameters['soft_masking'] = $("#soft_masking option:selected").val()
			parameters['lcasemasking'] = $("#lcasemasking option:selected").val()
			parameters['matrix'] = $("#matrix option:selected").val()
			parameters['comp_based_stats'] = $("#compbasedstat option:selected").val()
			//alert($('#DB option:selected').val())
			
			var json_data = JSON.stringify(parameters);
			$.ajax({type:'POST',
		        url: '/tblastn/run', // the pyramid server
		        data: json_data,
		        contentType: 'application/json; charset=utf-8',
		        beforeSend: function(){
		        	$('#loading').bPopup({
		                modalClose: false,
		                opacity: 0.6,
		                position: [400, 200],
		                positionStyle: 'fixed' //'fixed' or 'absolute'
		            });
		                 
		        },
		        success: function(blastdata){
		        	$('#loading').bPopup().close();
		        	constructContent(blastdata)

		        }	
			});
		}
	});
});
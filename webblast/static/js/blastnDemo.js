$(document).ready(function() {
	$("#runblastDemo").click(function(){
		document.getElementById('allresult').innerHTML = '';
		var parameters = {};
		var runjedge='false';
		var d = new Date();
		var timestr = d.getTime();
		timestr = 'a' 
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
			parameters['seg'] = $("#seg option:selected").val()
			parameters['soft_masking'] = $("#soft_masking option:selected").val()
			parameters['lcasemasking'] = $("#lcasemasking option:selected").val()
			//alert($('#DB option:selected').val())
			
			var json_data = JSON.stringify(parameters);
			$.ajax({type:'POST',
		        url: '/blastn/run/demo', // the pyramid server
		        data: json_data,
		        contentType: 'application/json; charset=utf-8',
		        beforeSend: function(){
		        	$('#loading').bPopup({
		                modalClose: false,
		                opacity: 0.6,
		                positionStyle: 'fixed' //'fixed' or 'absolute'
		            });
		                 
		        },
		        success: function(blastdata){
		        	$('#loading').bPopup().close();
		        	//document.getElementById('allresult').style.display = 'block';
		        	var resultdiv = $('#allresult');
		        	var error = blastdata['error'];
		        	
		        	if (error==''){
		        		document.getElementById('allresult').style.display = 'block';
			        	var xmlresult = blastdata['xmlresult'];
			        	var qlist = []
			        	//div for choose
			        	var div = $("<div></div>");
			        	
			        	var downloadtable = $("<table></table>");
			        	downloadtable.attr('id','blast_download');
			        	var firsttr = $("<tr></tr>");
			        	var firsttd = $("<td></td>");
			        	firsttd.attr('class','fth');
			        	firsttd.attr('colspan','5');
			        	var firsttddiv = $("<div></div>");
			        	firsttddiv.append('Download');
			        	firsttddiv.appendTo(firsttd);
			        	firsttd.appendTo(firsttr);
			        	firsttr.appendTo(downloadtable);
			        	
			        	var sectr = $("<tr></tr>");
			        	for (var fmt in blastdata['outfmtfileReturn']){
			        		var td = $("<td></td>");
			        		var downa = $("<a></a>");
			        		downa.append(blastdata['outfmtfileReturn'][fmt][0]);
			        		downa.attr('href',blastdata['outfmtfileReturn'][fmt][1]);
			        		downa.attr('target','_blank');
			        		downa.appendTo(td);
			        		td.appendTo(sectr);
			        	}
			        	sectr.appendTo(downloadtable);
			        	downloadtable.appendTo(div);
			        	
			        	div.append("<br><br>");
			        	div.append("Result for: ")
			        	var rselect = $("<select></select>");
			        	rselect.attr('id','rselect');
			        	for (var q in xmlresult){
			        		qlist.push(q)
			        		var option = "<option  value='"+q+"'>"+q+"</option>"
			        		$(option).appendTo(rselect);
			        	}
			        	
			        	rselect.change(function(){
			        		selectdivChange('rselect');
			        	})
			        	
			        	rselect.appendTo(div);
			        	div.appendTo(resultdiv);
			        	$("<br><br>").appendTo(resultdiv)
			        	//resultdiv.innerHTML += "<br><br>";
			        	for (var q in xmlresult){
			        		//div for each query
			        		var querydiv = $("<div></div>");
			        		querydiv.attr('id',q);
			        		if (q!=qlist[0]){
			        			querydiv.attr('class','hide');
			        		}
			        		var graphdiv = $("<div></div>");
			        		graphdiv.attr('id',q+'graph');
			        		graphdiv.appendTo(querydiv);
			        		
			        		var tablediv = $("<div></div>");
			        		tablediv.attr('id',q+'table');
			        		tablediv.appendTo(querydiv);
			        		
			        		var detaildiv = $("<div></div>");
			        		detaildiv.attr('id',q+'detail');
			        		detaildiv.appendTo(querydiv);	        		
			        		
			        		querydiv.appendTo(resultdiv);
			        	}
	
			        	for (var q in xmlresult){
			        		blastnqueryGraph(xmlresult[q], q)
			        		blastnqueryTable(xmlresult[q], q)
			        		blastnqueryDetail(xmlresult[q], q)
			        	}
			        	scroller('allresult', 800);
		        	}else{
		        		$("#Emsg").text(error);
			        	$('#error').bPopup({
			                opacity: 0.6,
			                positionStyle: 'fixed' //'fixed' or 'absolute'
			            });
		        	}
		        }	
			});
		}
	});
});
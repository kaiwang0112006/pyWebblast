function blastnqueryTable(data,q) {  
	var titlediv = $("<div><h4>Significant alignments:</h4></div>");
	titlediv.appendTo($("#"+id));
	
	var capdiv = $("<div>Select hit(s):  <a href=\"javascript:void(0)\" id=\""+q+"selall\">All</a>,  <a href=\"javascript:void(0)\" id=\""+q+"selnone\">None</a>,  <a href=\"javascript:void(0)\" id=\""+q+"downloadhits\" class=\"disable\" onclick=\"downloadhits('"+q+"')\">FASTA of <strong id=\""+q+"selnum\">0</strong> selected hit(s) to download</a> </div>");
	capdiv.appendTo($("#"+id));
	
	//onclick event on a.sel
	$("a#"+q+"selall").on('click',function(e){
		var selnum = 0
		$("."+q+"hspcheck").each(function(){
			//$(this).attr("checked",'checked')
			this.checked = true
			selnum += 1;
		});
		$("#"+q+"selnum").html(selnum);
		$("#"+q+"downloadhits").attr('class','')
	});
	$("a#"+q+"selnone").on('click',function(e){
		$("."+q+"hspcheck").each(function(){
			//$(this).removeAttr("checked")
			this.checked = false;
		});
		$("#"+q+"selnum").html(0);
		$("#"+q+"downloadhits").attr('class','disable');
	});
	
    id = q+'table';
    var table=$("<table class=\"querytable\" id=\"qtable\"></table>");
    //$("#"+id).append(table);
    
    thead = "<thead>\
                <tr><th > Number </th>\
                <th>Description</th>\
                <th > Max score </th>\
                <th > Total score </th>\
                <th > Query cover(%) </th>\
                <th > Ident(%) </th>\
                <th > E value </th>\
                <th > Length </th>\
              </tr></thead>"
    table.append(thead)
    
	for (var i=0; i<data[1].length; i++){
		var j = i + 1; 
		var hsps = data[1][i];
        var tr=$("<tr></tr>");
        tr.appendTo(table);
        var td=$("<td >"+"<input id=\"input_" + q + hsps['hit_id'] + "\" name=\"" + q + hsps['hit_id'] + "\" type=\"checkbox\" class=\""+q+"hspcheck\" value=\"" + hsps['hit_id'] + "\">"+j+"</td>"+
        		"<td ><a  href='#"+q+hsps['hit_id']+"'>"+hsps['hit_id']+"</a></td>"+
        		"<td >"+hsps['max_score']+"</td>"+
        		"<td >"+hsps['total_score']+"</td>"+
        		"<td >"+hsps['hsps'][0]['queryCoverage'].toFixed(2)+"</td>"+
        		"<td >"+hsps['hsps'][0]['identity_percent'].toFixed(2)+"</td>"+
        		"<td >"+hsps['hsps'][0]['evalue']+"</td>"+
        		"<td >"+hsps['hsps'][0]['align_lenght']+"</td>");
        td.appendTo(tr);
	}
    table.appendTo($("#"+id));

	$("."+q+"hspcheck").change(function(){
		//alert($("input:checkbox").filter(':checked').length);
		var selnum = $("."+q+"hspcheck").filter(':checked').length
		$("#"+q+"selnum").html(selnum);
		if (selnum == 0){
			$("#"+q+"downloadhits").attr('class','disable');
		}else{
			$("#"+q+"downloadhits").attr('class','')
		}
	});
}


function downloadhits(q){
	if ($('#'+q+'downloadhits').attr('class') != 'disable'){
		var parameters = {};
		if ($('#DB option:selected').val()!=undefined){
			parameters['DB'] = $('#DB option:selected').val();
		}else{
			parameters['DB'] = $("#DB option[index='0']").val();
		}
		
		var hitStr = '';
		$("."+q+"hspcheck").filter(':checked').each(function(){
			hitStr += $(this).val()+',';
		})
		parameters['hitStr'] = hitStr.substring(0,hitStr.length-1)
		var json_data = JSON.stringify(parameters);
		$.ajax({type:'POST',
	        url: '/fetchhits/json', // the pyramid server
	        data: json_data,
	        contentType: 'application/json; charset=utf-8',
	        beforeSend: function(){                 
	        },
	        success: function(data){
	        	var error = data['error'];
	        	if (error==''){
	        		save_download('hits.fa', data['fastaStr'],"text/plain") 
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
}
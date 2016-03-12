function blastnqueryDetail(data,q) {  
    id = q+'detail';
    var detaildiv = $('#'+id);
	for (var i=0; i<data[1].length; i++){
		var j = i + 1; 
		//var hspdiv = $("<div class='hsp'></div>");
		var anchor = $("<a></a>");
		anchor.attr('name',q+data[1][i]['hit_id']);
		anchor.appendTo(detaildiv);
		var hspdiv = $("<div class='hsp'></div>");
		hspdiv.append("<p>&nbsp;Hit:&nbsp;&nbsp;"+data[1][i]['hit_id']+"</p>")
		
		var hsps = data[1][i]['hsps'];
		for (var index in hsps){
			var hsp = hsps[index];

			var hitnamediv = $("<div></div>");
			//hitnamediv.append("<p>&nbsp;Hit:&nbsp;&nbsp;"+hsp['hit_name']+"</p>")
			var count = parseInt(index)+1;
			hitnamediv.append(count);
			var table = $("<table class='hspstate'></table>")
		    thead = "<thead>\
		                <tr><th >Score</th>\
		                <th>Expect</th>\
		                <th >Identities</th>\
		                <th >Gaps</th>\
		                <th >Strand</th>\
		              </tr></thead>";
		    table.append(thead);
	        var tr=$("<tr></tr>");
	        var td=$("<td >"+hsp['blast_score']+"</td>"+
	        		"<td >"+hsp['evalue']+"</td>"+
	        		"<td >"+hsp['identities']+'/'+hsp['align_lenght']+"("+hsp['identity_percent'].toFixed(2)+"%)"+"</td>"+
	        		"<td >"+hsp['gaps']+'/'+hsp['align_lenght']+"("+hsp['gaps_percent'].toFixed(2)+"%)"+"</td>"+
	        		"<td >"+hsp['strand'][0]+'/'+hsp['strand'][1]+"</td>");
	        td.appendTo(tr);
	        tr.appendTo(table);
		    table.appendTo(hitnamediv);
		    $("<br>").appendTo(hitnamediv);
		    
		    seqaligndiv = $("<div></div>");
		    seqaligndiv.attr('class','seqaglign');
		    seqaligndiv.append(hsp['matchstr']);
		    seqaligndiv.appendTo(hitnamediv);
            
		    hitnamediv.appendTo(hspdiv)
		    hspdiv.append("<br><br>")
		    
		}
		hspdiv.appendTo(detaildiv);
		detaildiv.append("<br><br>");
    }
}
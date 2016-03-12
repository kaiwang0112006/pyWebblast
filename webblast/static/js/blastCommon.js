function constructContent(blastdata){

	var resultdiv = $('#allresult');
	var error = blastdata['error'];
	
	if (error==''){
		document.getElementById('allresult').style.display = 'block';
    	var xmlresult = blastdata['xmlresult'];
    	var qlist = []
    	//div for choose
    	var div = $("<div></div>");
    	
    	//generate download table
    	var downloadtable = $("<table></table>");
    	downloadtable.attr('id','blast_download');

    	//the second line first, so it will decide how many column the table has.
    	var sectr = $("<tr></tr>");
    	var colspan = 0

    	if (blastdata['outfmtfileReturn'] == 'none'){
    		var td = $("<td>No file available</td>");
    		td.appendTo(sectr); 
    	}else{
        	for (var fmt in blastdata['outfmtfileReturn']){
        		if (blastdata['outfmtfileReturn'][fmt][1] != ''){ //only show available link
            		var td = $("<td></td>");
            		var downa = $("<a></a>");
            		downa.append(blastdata['outfmtfileReturn'][fmt][0]);
            		downa.attr('href',blastdata['outfmtfileReturn'][fmt][1]);
            		downa.attr('target','_blank');
            		downa.appendTo(td);
            		td.appendTo(sectr);   	
            		
            		colspan += 1;
        		}
        	}  		
    	}

        //first line
    	var firsttr = $("<tr></tr>");
    	var firsttd = $("<td></td>");
    	firsttd.attr('class','fth');
    	firsttd.attr('colspan',colspan);
    	var firsttddiv = $("<div></div>");
    	firsttddiv.append('Download');
    	firsttddiv.appendTo(firsttd);
    	firsttd.appendTo(firsttr);
    	firsttr.appendTo(downloadtable);
    	//now second line
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
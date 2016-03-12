function changeDisplay(did) {
	if ($("#"+did)[0].style.display == 'none'){
		$("#"+did).css('display','block'); 
	}else{
		$("#"+did).css('display','none'); 
	}
}

function isNum(obj) {  
     //检查是否是非数字值  
     if (isNaN(obj.value)) {
         obj.value = "";  
     }  
}

function selectdivChange(id){
	var selectval = $("#"+id+" option:selected").val();
	$("#"+id+" option").each(function(){
		if ($(this).val() == selectval){
			$("div#"+$(this).val()).attr('class','');
		}else{
			$("div#"+$(this).val()).attr('class','hide');
		}
	});
	//scroller('allresult', 800);
}
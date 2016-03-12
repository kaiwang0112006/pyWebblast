function blastnqueryGraph(data,q) {  
    id = q+'graph';
    var tipdiv = $("<div class='tips hsptips hide' id='"+q+"hspsShow'></div>");
    tipdiv.append("<p id='"+q+"hitid'></p><p id='"+q+"hitevalue'></p>");
    $("#"+id).append(tipdiv);
    
	var margin = {top: 40, right: 80, bottom: 80, left: 80},
    width = 1000,
    height = 100 + 20*data[1].length;
    var verticalSpc = 20;
    var rectHeight = 5;
	var axisdown = 40;
	var svg = d3.select("#"+id).append("svg")
                    .attr("width", width)
                    .attr("height", height);
	// Scales and axes.
	var xScale = d3.scale.linear()
				 .domain([0, data[0]])
				 .range([margin.left, width-margin.right]);

	var xLable = d3.scale.ordinal()
	               .domain(d3.range(data[1].length))
	               .rangeRoundBands([0, width], 0.05);

	
	var xAxis = d3.svg.axis()
	              .scale(xScale)
	              .ticks(10, "s")
	              .tickSize(6, 2); //6 for postion, 2 for line weight
	//Add the text attributes
	svg.append("text")
	   .attr("class", "qtitle")
	   .attr("x", 0)
	   .attr("y", 15)
	   .text(q);
	
	// Add the x-axis. from chrom start to chrom end
	svg.append("g")
	   .attr("class", "axis")
	   .attr("color", "red")
	   .attr("transform", "translate(" + 0 + "," + axisdown + ")")
	   .call(xAxis)
	   .attr("fill","red");
	var trackheight = 70+ axisdown;
	
	var hspslist = data[1];

	var baseline =svg.selectAll("lines")
					    .data(hspslist)
					    .enter()
						.append("line")
						.attr("x1",function(d) {
					   		return xScale(d['qstart']);
						 })
						.attr("x2",function(d) {
					   		return xScale(d['qend']);
						 })
						.attr("y1",function(d,i) {
					   		return trackheight + verticalSpc*(i);
						 })
						.attr("y2",function(d,i) {
							return trackheight + verticalSpc*(i);
						 })
						.attr("stroke-width", 2)
						.attr("stroke", "black");
//	var linetext = svg.selectAll("textes")
//					    .data(hspslist)
//					    .enter()
//					    .append("text")
//						.attr("x", function(d) {
//						   		return xScale(d['qstart']);
//					     })
//						 .attr("y",function(d,i) {
//								return trackheight + verticalSpc*(i);
//					     })
//						 .text(function(d,i) {
//					   		return d['hit_id'];
//						 }); 
	
	for (var i=0; i<hspslist.length; i++){
	    var rectangle = svg.selectAll("hsprect")
	                       .data(hspslist[i]['hsps'])
	                       .enter()
	                       .append('a')
	                       .attr("xlink:href", function(d) {
						   		return '#'+q+d['hit_id'];
						    })
	                       .append("rect")
						   .attr("x", function(d) {
							   		return xScale(d['query_start']);
						    })
							.attr("y",function(d) {
									return trackheight + verticalSpc*(i)-rectHeight/2;
						    })
							.attr("width",function(d) {
									return Math.abs(xScale(d['query_stop'])-xScale(d['query_start']));
						    })
						   .attr("height", rectHeight)
						   .attr("fill", "#005aff")
						   .on("mouseover", function(d) {				       
								   d3.select("#"+q+"hspsShow")					
								     .select("#"+q+"hitid")
								     .text(d['hit_id']);
								   d3.select("#"+q+"hspsShow")
								     .select("#"+q+"hitevalue")
								     .text("evalue:"+d['evalue']);							   
								   //Show the tooltip
								   d3.select("#"+q+"hspsShow").classed("hide", false);
								   $(document).bind('mousemove', function(e){
									    $("#"+q+"hspsShow").css({
									       left:  e.pageX - 40,
									       top:   e.pageY + 20
									    });
									});
						    })
						    .on("mouseout", function(){
        				           d3.select("#"+q+"hspsShow").classed("hide", true);	
				            })
	}

}
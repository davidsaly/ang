app.directive("chartDirective", function($parse, $window) {
    return {
        //template : "<h1> This is a Directive </h1> "
        // template: "<svg width='850' height='200'></svg>",
        templateUrl: 'd3ChartDir.html',
        link: function(scope, elem, attrs){
          
           var exp = attrs.chartData; //$parse(attrs.chartData);
           var perfData=exp; //(scope);
           var padding = 10;
           var pathClass="path";
           var xScale, yScale, xAxisGen, yAxisGen, lineFunction;

           var d3 = $window.d3;
           var rawSvg=elem.find('svg');
           var svg = d3.select(rawSvg[0]);

           scope.$watchCollection(exp, function(newVal, oldVal){
               perfData=newVal;
               redrawLineChart();
           });

           function setChartParameters(){

           	   var minDate = new Date(perfData[0].Date);
      			   var maxDate = new Date(perfData[perfData.length-1].Date);

      			   console.log(minDate);
      			   console.log(maxDate);

               xScale = d3.time.scale()

                   .domain([minDate, maxDate])
                   .range([padding + 5, rawSvg.attr("width") - padding]);

                   // console.log(xScale[1]);

               yScale = d3.scale.linear()
                   .domain([0, d3.round(d3.max(perfData, function (d) {
                       return d.Close;
                   }),0)])
                   .range([rawSvg.attr("height") - padding, 0]);

                   // console.log(rawSvg.attr("height"));
                   // console.log(d3.round(d3.max(perfData, function (d) {return d.Close;}),0));

               // Axes
               xAxisGen = d3.svg.axis()
                   .scale(xScale)
                   .orient("bottom")
                   .ticks(10)
                   .tickFormat(d3.time.format("%Y-%m-%d"));

               yAxisGen = d3.svg.axis()
                   .scale(yScale)
                   .orient("left")
                   .ticks(5)

               // Function which creates the the d3 friendly data
               lineFunction = d3.svg.line()
                   .x(function (d) {
                   	   console.log("date" + xScale(new Date(d['Date'])));
                       return xScale(new Date(d['Date']));
                   })
                   .y(function (d) {
                       // console.log("price" + yScale(d.Close));
                       return yScale(d.Close);
                   })
                   .interpolate("basis");
           }
         
         function drawLineChart() {

               setChartParameters();

               svg.append("svg:g")
                   .attr("class", "x axis")
                   .attr("transform", "translate(0,180)")
                   // .attr("transform", "translate(0," + rawSvg.attr("height") + ")")
                   .call(xAxisGen);

               svg.append("svg:g")
                   .attr("class", "y axis")
                   .attr("transform", "translate(20,0)")
                   .call(yAxisGen);

               svg.append("svg:path")
                   .attr({
                       d: lineFunction(perfData),
                       "stroke": "blue",
                       "stroke-width": 2,
                       "fill": "none",
                       "class": pathClass
                   });
           }

           function redrawLineChart() {

               setChartParameters();

               svg.selectAll("g.y.axis").call(yAxisGen);

               svg.selectAll("g.x.axis").call(xAxisGen);

               svg.selectAll("." + pathClass)
                   .attr({
                       d: lineFunction(perfData)
                   });
           }

           drawLineChart();

    	}
    };
});

// code for plotting a chart with performances in D3


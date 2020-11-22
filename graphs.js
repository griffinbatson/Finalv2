
//Scatter

initGraph = function(unemployment){
    
    var margin = {top: 70, right: 30, bottom: 50, left: 90},
    width = 455 - margin.left - margin.right,
    height = 480 - margin.top - margin.bottom;


var svg = d3.select("#scatterPlot")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .classed("scatter", true)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
    
    
      var x = d3.scaleLinear()
    .domain([2000,2019])
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  var y = d3.scaleLinear()
    .domain([4, 10])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));
    
      svg.append('g')
    .selectAll("circle")
    .data(unemployment)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(d.Years); } )
      .attr("cy", function (d) { return y(d.Nmet); } )
      .attr("r", 5)
      .style("fill", "lime")
      .style("opacity", 1)
      .style("stroke", "black")
.on("mouseenter", function(unemployment){
          
          var xPos = d3.event.pageX
          var yPos = d3.event.pageY
          
          d3.select("#tooltip")
          .classed("hidden", false)
          .style("top", yPos+"px")
          .style("left", xPos+"px")
          
          d3.select("#unemployment1")
          .text("NonMetro Unemployment AVG:"+unemployment.Nmet);
          
          d3.select("#year")
          .text("Year:"+unemployment.Years);
          
      })
    .on("mouseleave", function(){
          d3.select("#tooltip") 
          .classed("hidden", true);
          
    })
    
    svg.append('g')
    .selectAll("circle")
    .data(unemployment)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(d.Years); } )
      .attr("cy", function (d) { return y(d.met); } )
      .attr("r", 5)
      .style("fill", "coral")
      .style("opacity", 1)
      .style("stroke", "black")
      
    
    
.on("mouseenter", function(unemployment){
          
          var xPos = d3.event.pageX
          var yPos = d3.event.pageY
          
          d3.select("#tooltip")
          .classed("hidden", false)
          .style("top", yPos+"px")
          .style("left", xPos+"px")
          
          d3.select("#unemployment1")
          .text("Metro Unemployment AVG:"+unemployment.met);
          
          d3.select("#year")
          .text("Year:"+unemployment.Years);
          
      })
    .on("mouseleave", function(){
          d3.select("#tooltip") 
          .classed("hidden", true);
          
    })
    
    
    
var labels = d3.select("#scatterPlot svg")
    .append("g")
    .classed("labels", true);
    
    labels.append("text")
    .text("Unemployment Trends in Metro and NonMetro Areas")
    .classed("title", true)
    .attr("text-anchor", "middle")
    .attr("x", margin.left+width/2)
    .attr("y", margin.top-15)
    
    labels.append("text")
    .text("Year")
    .classed("label", true)
    .attr("text-anchor", "middle")
    .attr("x", margin.left+width/2)
    .attr("y", height+(margin.bottom+margin.top-5))
    
    labels.append("g")
    .attr("transform", "translate(20,"+(margin.top+(height/2))+")")
    .append("text")
    .text("% Unemployment")
    .classed("label", true)
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(90)")

}



var success=function(unemployment)
{
    console.table("data", unemployment);
    initGraph(unemployment);
};

var failure= function(error)
{
    
    console.log("Something is wrong", error);
};

var unemploymentPromise=d3.csv("LineGraph.csv");
unemploymentPromise.then(success,failure);


//BarChart

initGraph2 = function(incomes){
    
    var margin = {top: 70, right: 30, bottom: 50, left: 90},
    width = 465 - margin.left - margin.right,
    height = 480 - margin.top - margin.bottom;


var svg = d3.select("#barChart")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
    
    
    var xScale=d3.scaleBand()
            .domain([1,12])
            .range([0, width])
  
    
    var yScale=d3.scaleLinear()
            .domain([35000,75000])
            .range([0,height])
    
    
    
    var x = d3.scaleBand()
            .domain(incomes.map(function(d){return d.UIcode}))
            .range([ 0, width ]);
  
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  var y = d3.scaleLinear()
    .domain([35000, 75000])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));
    
      svg.append('g')
    .selectAll("rect")
    .data(incomes)
    .enter()
    .append("rect")
    .attr("fill", "lime")
    .attr("opacity", .5)
   .attr("width", function(d) {return 26})
    .attr("height", function (d) {return yScale(parseInt(d.income));})
    .attr("x", function (d,i) { return i*29; } )
    .attr("y", function (d){return (height - parseInt(yScale(d.income)))})
      
    
.on("mouseenter", function(incomes){
          
          var xPos = d3.event.pageX
          var yPos = d3.event.pageY
          
          d3.select("#tooltip2")
          .classed("hidden1", false)
          .style("top", yPos+"px")
          .style("left", xPos+"px")
          
          d3.select("#incomes1")
          .text("Median Income 2018: "+incomes.income);
          
          d3.select("#code1")
          .text("Urban Influence Code: "+incomes.UIcode);
          
      })
    .on("mouseleave", function(){
          d3.select("#tooltip2") 
          .classed("hidden1", true);
          
      })
    
var labels = d3.select("#barChart svg")
    .append("g")
    .classed("label", true);
    
    labels.append("text")
    .text("Urban Influence on Median Income 2018")
    .classed("title", true)
    .attr("text-anchor", "middle")
    .attr("x", margin.left+width/2)
    .attr("y", margin.top-15)
    
    labels.append("text")
    .text("Urban Influence Code")
    .classed("label", true)
    .attr("text-anchor", "middle")
    .attr("x", margin.left+width/2)
    .attr("y", height+(margin.bottom+margin.top-5))
    
    labels.append("g")
    .attr("transform", "translate(20,"+(margin.top+(height/2))+")")
    .append("text")
    .text("Median Income (USD)")
    .classed("label", true)
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(90)")
      }



var success=function(incomes)
{
    console.table("data", incomes);
    initGraph2(incomes);
};

var failure= function(error)
{
    
    console.log("Something is wrong", error);
};

var incomePromise=d3.csv("incomes.csv");
incomePromise.then(success,failure);


//Bar Chart 2

initGraph3 = function(ruralUnemp){
    
    var margin = {top: 70, right: 30, bottom: 50, left: 90};
    var width = 485 - margin.left - margin.right;
    var height = 480 - margin.top - margin.bottom;


var svg = d3.select("#barChart2")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
    
    
    var xScale=d3.scaleBand()
            .domain([1,9])
            .range([0, width])
  
    
    var yScale=d3.scaleLinear()
            .domain([38,44])
            .range([0,height])
    
    
    
    var x = d3.scaleBand()
            .domain(ruralUnemp.map(function(d){return d.RUcode}))
            .range([ 0, width ]);
  
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  var y = d3.scaleLinear()
    .domain([38, 44])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));
    
      svg.append('g')
    .selectAll("rect")
    .data(ruralUnemp)
    .enter()
    .append("rect")
    .attr("fill", "coral")
    .attr("opacity",.5)
    .attr("width", function(d) {return 38})
    .attr("height", function (d) {return yScale(parseInt(d.unemp));})
    .attr("x", function (d,i) { return i*41; } )
    .attr("y", function (d){return (height - parseInt(yScale(d.unemp)))})
      
    
.on("mouseenter", function(ruralUnemp){
          
          var xPos = d3.event.pageX
          var yPos = d3.event.pageY
          
          d3.select("#tooltip3")
          .classed("hidden2", false)
          .style("top", yPos+"px")
          .style("left", xPos+"px")
          
          d3.select("#unemployment2")
          .text("2019 Unemployment AVG: "+ruralUnemp.unemp);
          
          d3.select("#code2")
          .text("Rural Urban Continuum Code: "+ruralUnemp.RUcode);
          
      })
    .on("mouseleave", function(){
          d3.select("#tooltip3") 
          .classed("hidden2", true);
          
      })
    
var labels = d3.select("#barChart2 svg")
    .append("g")
    .classed("label", true);
    
    labels.append("text")
    .text("Urban Influence on Unemployment 2019")
    .classed("title", true)
    .attr("text-anchor", "middle")
    .attr("x", margin.left+width/2)
    .attr("y", margin.top-15)
    
    labels.append("text")
    .text("Rural-urban Continuum Code")
    .classed("label", true)
    .attr("text-anchor", "middle")
    .attr("x", margin.left+width/2)
    .attr("y", height+(margin.bottom+margin.top-5))
    
    labels.append("g")
    .attr("transform", "translate(20,"+(margin.top+(height/2))+")")
    .append("text")
    .text("Average Unemployment (%*10)")
    .classed("label", true)
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(90)")
      }



var success=function(ruralUnemp)
{
    console.table("data", ruralUnemp);
    initGraph3(ruralUnemp);
};

var failure= function(error)
{
    
    console.log("Something is wrong", error);
};

var ruralUnempPromise=d3.csv("ruralUnemp.csv");
ruralUnempPromise.then(success,failure);
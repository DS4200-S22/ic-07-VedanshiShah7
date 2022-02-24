/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your bar charts in this file 


// Set dimensions and margins for plots 
const width = 900; 
const height = 450; 
const margin = {left:50, right:50, bottom:50, top:50}; 
const yTooltipOffset = 15; 


// Add an svg to build within using dimensions set above
const svg2 = d3 
  .select("#csv-bar")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

const data2 = d3.csv("data/barchart.csv")

/*

  Axes

*/ 

// Find the max Y
let maxY2 = d3.max(data2, function(d) { return d.score; });

// sets up a scaling function for data value to pixel value
let yScale2 = d3.scaleLinear()
            .domain([0,maxY2])
            .range([height-margin.bottom,margin.top]);

// sets up a scaling function for data value to pixel value
let xScale2 = d3.scaleBand()
            .domain(d3.range(data2.length)) 
            .range([margin.left, width - margin.right])
            .padding(0.1); 

// Add y axis to the svg
svg2.append("g")
   .attr("transform", `translate(${margin.left}, 0)`)
   .call(d3.axisLeft(yScale2))
   .attr("font-size", '20px'); 

// Add x axis to the svg
svg2.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(xScale2)
            .tickFormat(i => data2[i].name))
    .attr("font-size", '20px');

/* 

  Tooltip Set-up  

*/

// Adds a tooltip with the information
const tooltip2 = d3.select("#hard-coded-bar") 
                .append("div") 
                .attr('id', "tooltip2") 
                .style("opacity", 0) 
                .attr("class", "tooltip"); 

// Mouseover event handler
const mouseover2 = function(event, d) {
  tooltip2.html("Name: " + d.name + "<br> Score: " + d.score + "<br>")
          .style("opacity", 1); 
}

// Mouse moving event handler
const mousemove2 = function(event, d) {
  tooltip2.style("left", (event.x)+"px") 
          .style("top", (event.y + yTooltipOffset) +"px");
}

// Mouseout event handler
const mouseleave2 = function(event, d) { 
  tooltip2.style("opacity", 0); 
}

/* 

  Bars 

*/

// Adds multiple bar shapes to the data binded
svg2.selectAll(".bar") 
   .data(data2) 
   .enter() 
   .append("rect") 
     .attr("class", "bar") 
     .attr("x", (d,i) => xScale2(i)) 
     .attr("y", (d) => yScale2(d.score)) 
     .attr("height", (d) => (height - margin.bottom) - yScale2(d.score))
     .attr("width", xScale2.bandwidth()) 
     .on("mouseover", mouseover2) 
     .on("mousemove", mousemove2)
     .on("mouseleave", mouseleave2);









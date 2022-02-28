/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your scatterplot in this file 

/*

  CSV data loaded - scatterplot

*/

// Add an svg to build within using dimensions set above
const svg3 = d3 
  .select("#csv-scatter")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

d3.csv("data/scatter.csv").then((data3) => {
  
    /*

    Axes

    */ 

    // find max x
    let maxX3 = d3.max(data3, (d) => { return d.day; }); 

    // find max Y 
    let maxY3 = d3.max(data3, (d) => { return d.score; }); 

    // sets up a scaling function for data value to pixel value
    let xScale3 = d3.scaleLinear()
                    .domain([0, maxX3])
                    .range([margin.left, width - margin.right]); 

    // sets up a scaling function for the data value to pixel value on the y scale    
    let yScale3 = d3.scaleLinear()
                .domain([0, maxY3])
                .range([height - margin.bottom, margin.top]); 

    // Add y axis to the svg
    svg3.append("g")
        .attr("transform", `translate(${margin.left}, 0)`) 
        .call(d3.axisLeft(yScale3))
        .attr("font-size", '20px');
    

    // Add x axis to the svg
    svg3.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`) 
        .call(d3.axisBottom(xScale3))
            .attr("font-size", '20px');

    /* 

    Tooltip Set-up  

    */

    // Adds a tooltip with the information
    let tooltip3 = d3.select("#csv-scatter") 
                    .append("div3") 
                    .attr('id', "tooltip3") 
                    .style("opacity", 0) 
                    .attr("class", "tooltip");

    // Mouseover event handler
    let mouseover3 = function(event, d) {
    tooltip3.html("Name: " + d.day + "<br> Score: " + d.score + "<br>")
            .style("opacity", 1);
    };

    // Mouse moving event handler
    let mousemove3 = function(event, d) {
    tooltip3.style("left", (event.pageX)+"px") 
            .style("top", (event.pageY + yTooltipOffset) +"px");
    };

    // Mouseout event handler
    let mouseleave3 = function(event, d) { 
    tooltip3.style("opacity", 0);
    };

    svg3.selectAll(".circle") 
        .data(data3)
        .enter()  
        .append("circle")
            .attr("class", "circle")
            .attr("cx", (d,i) => xScale3(d.day))
            .attr("cy", (d) => yScale3(d.score))
            .attr("r", 10)
            .attr("height", (d) => (height - margin.bottom) - yScale3(d.score))
            .attr("width", (d) => (height - margin.bottom) - xScale3(d.day))
            .on("mouseover", mouseover3) 
            .on("mousemove", mousemove3)
            .on("mouseleave", mouseleave3);
    });
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
const svg1 = d3 // giving d3 value to the svg
  .select("#hard-coded-bar") // selecting the div id 
  .append("svg") // adds an svg in the div
  // adding the dimensions to the svg:
  .attr("width", width-margin.left-margin.right) // giving the svg a width
  .attr("height", height - margin.top - margin.bottom) // giving the svg a height
  .attr("viewBox", [0, 0, width, height]); //setting up a viewbox to create how much the svg is visible in

// Hardcoded barchart data
const data1 = [
  {name: 'A', score: 92},
  {name: 'B', score: 15},
  {name: 'C', score: 67},
  {name: 'D', score: 89},
  {name: 'E', score: 53},
  {name: 'F', score: 91},
  {name: 'G', score: 18}
];

/*

  Axes

*/ 

// Find the max Y
let maxY1 = d3.max(data1, function(d) { return d.score; });

// The scale function is define to map our data values to our pixel values
// sets up a scaling function for data value to pixel value
let yScale1 = d3.scaleLinear() // linear scale because we have linear data
            .domain([0,maxY1]) // inputs for the function
            .range([height-margin.bottom,margin.top]); // outputs for the function

// The scale function is to define to map our data values to our pixel values on the x scale
// sets up a scaling function for data value to pixel value
let xScale1 = d3.scaleBand()
            .domain(d3.range(data1.length)) // inputs for the function, max X is data length in this case
            .range([margin.left, width - margin.right]) // outputs for the function
            .padding(0.1); // adds space between values next to each other

// Add y axis to the svg
svg1.append("g") // g is a "placeholder" svg
   .attr("transform", `translate(${margin.left}, 0)`) // moves the axis to the left of svg, inside of left margin
   .call(d3.axisLeft(yScale1)) // built in function for bottom axis given a scale function
   .attr("font-size", '20px'); // set font size

// Add x axis to the svg
svg1.append("g") // g is a "placeholder" svg
    .attr("transform", `translate(0,${height - margin.bottom})`) // moves the axis to the bottom
    .call(d3.axisBottom(xScale1) // built in function for bottom axis given a scale function
            .tickFormat(i => data1[i].name)) // adds the ticks in the graphs
    .attr("font-size", '20px'); // set the font size

/* 

  Tooltip Set-up  

*/

// Adds a tooltip with the information
// it is a discrete piece of information that will pop into view when the mouse hovers over somewhere specific. 
const tooltip1 = d3.select("#hard-coded-bar") // selects the id 
                .append("div") // adds a div to it
                .attr('id', "tooltip1") // gives the div the id "tooltip1"
                .style("opacity", 0) // sets its opacity as 0 to it
                .attr("class", "tooltip"); // adds to the class "tooltip"

// Mouseover event handler
const mouseover1 = function(event, d) {
  // the code below adds the name, and the score to the tooltip
  tooltip1.html("Name: " + d.name + "<br> Score: " + d.score + "<br>") // given the event that is input - select element that this event is happening with or to.
          .style("opacity", 1); // sets its opacity as 1
}

// Mouse moving event handler
const mousemove1 = function(event, d) {
  tooltip1.style("left", (event.x)+"px") // sets and shows location of mouse in the div from the left and the top
          .style("top", (event.y + yTooltipOffset) +"px"); // top location in px
}

// Mouseout event handler
const mouseleave1 = function(event, d) { 
  tooltip1.style("opacity", 0); // sets the opacity of the tooltip back to 0 as the mouse leaves
}

/* 

  Bars 

*/

// Adds multiple bar shapes to the data binded
svg1.selectAll(".bar") // take element svg and select all bar classes inside the element
   .data(data1) // pass select to the data - data will join the selection with the data
   .enter() // pass enter to create a placeholder for the elements for all the data not yet associated with an svg
   .append("rect") // placeholders get passed here to the rectangle, all the rectangles (bars) are now appended that are associated with our data
     .attr("class", "bar") // sets the class as bar
     .attr("x", (d,i) => xScale1(i)) // sets the x size (value) of the rectangle (bar)
     .attr("y", (d) => yScale1(d.score)) // sets the y size (value) of the rectangle (bar
     .attr("height", (d) => (height - margin.bottom) - yScale1(d.score)) // sets the height of the object placement
     .attr("width", xScale1.bandwidth()) // sets the width of the object placement
     .on("mouseover", mouseover1) // adds the event handler for mouse going over the data
     .on("mousemove", mousemove1) // adds the event handler for when the mouse mouses
     .on("mouseleave", mouseleave1); // adds the event handler for when the mouse leaves









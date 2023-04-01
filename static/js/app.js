// Set up a variable for the url
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";


// Sets up the dropdown box with each individual ID
function dropdownSetup(data) {
  var selectTag = d3.select("#selDataset");
  var options = selectTag.selectAll("option").data(data.metadata);
  options.enter().append('option')
    .text(d => d.id)
    .attr('value', d => d.id)
}

// Formats the data required for the plots
function formatData(data, ID) {

  // Filter the data to get only selected sample
  const selectedSample = data.samples.filter(d => d.id == ID)[0];

  // Create a new empty list
  let formatted = []

  // Iterate through the length of one of the lists and push in data
  for (let x = 0; x < selectedSample.otu_ids.length; x++) {
    formatted.push({
      otu_id: `OTU ${selectedSample.otu_ids[x]}`,
      otu_id_num: selectedSample.otu_ids[x],
      sample_value: selectedSample.sample_values[x],
      otu_label: selectedSample.otu_labels[x]
    });
  }

  // Sort dictionaries by sample values into descending order for bar graph, slices them, and reverses the order for graphing
  let sorted_bar = [...formatted].sort((a, b) => b.sample_value - a.sample_value).slice(0, 10).reverse()

  // Sort dictionaries by OTU ID into ascending order for bubble graph
  let sorted_bubble = [...formatted].sort((a, b) => a.otu_id_num - b.otu_id_num)

  // Returns the resulting sorted data
  return { sorted_bar, sorted_bubble }
}

// Function to initialize the page with default plots, metadata, and dropdown menu
function init(data) {

  // Formats the data for the default plots
  let sorted = formatData(data, "940");

  // Sets up the bar chart
  let bar = [{
    x: sorted.sorted_bar.map(dataPoint => dataPoint.sample_value),
    y: sorted.sorted_bar.map(dataPoint => dataPoint.otu_id), 
    text: sorted.sorted_bar.map(dataPoint => dataPoint.otu_label),
    type: 'bar',
    orientation: "h" }];

  // Plots the bar chart in the 'bar' wrapper
  Plotly.newPlot("bar", bar);

  // Sets up the bubble chart
  let bubble = [{
    x: sorted.sorted_bubble.map(dataPoint => dataPoint.otu_id_num),
    y: sorted.sorted_bubble.map(dataPoint => dataPoint.sample_value),
    text: sorted.sorted_bubble.map(dataPoint => dataPoint.otu_label),
    mode: 'markers', 
    marker: {
      size: sorted.sorted_bubble.map(dataPoint => dataPoint.sample_value),
      color: sorted.sorted_bubble.map(dataPoint => dataPoint.otu_id_num),
      sizeref: 1.75
    }
  }];

  // Plots the bubble chart
  Plotly.newPlot("bubble", bubble);

  // Gathers initial metadata
  let selectedMetaData = data.metadata.filter(dataSet => dataSet.id == 940)

  // Writes metadata elements to the html
  var selectTag = d3.select("#sample-metadata");
  var paragraphs = selectTag.selectAll("p").data(selectedMetaData).enter();
  
  paragraphs.append('p').attr('id', 'id').text(d => `id: ${d.id}`)
  paragraphs.append('p').attr('id', 'ethnicity').text(d => `ethnicity: ${d.ethnicity}`)
  paragraphs.append('p').attr('id', 'gender').text(d => `gender: ${d.gender}`)
  paragraphs.append('p').attr('id', 'age').text(d => `age: ${d.age}`)
  paragraphs.append('p').attr('id', 'location').text(d => `location: ${d.location}`)
  paragraphs.append('p').attr('id', 'bbtype').text(d => `bbtype: ${d.bbtype}`)
  paragraphs.append('p').attr('id', 'wfreq').text(d => `wfreq: ${d.wfreq}`)

  // Sets up the dropdown menu
  dropdownSetup(data)
}

// Sets up the function to call when the dropdown value is changed to change the graphs and metadata
function optionChanged(selection) {
  // Calls the url again to get the data, and defines the full function to change everything
  d3.json(url).then(function(data) {
  
  // Get and format data for bar and bubble plots
  let sorted = formatData(data, selection)
  
  // Prepares data for the bar chart
  let barData = {
    x: sorted.sorted_bar.map(dataPoint => dataPoint.sample_value),
    y: sorted.sorted_bar.map(dataPoint => dataPoint.otu_id), 
    text: sorted.sorted_bar.map(dataPoint => dataPoint.otu_label)
  };

  let bubbleData = {
    x: sorted.sorted_bubble.map(dataPoint => dataPoint.otu_id_num),
    y: sorted.sorted_bubble.map(dataPoint => dataPoint.sample_value),
    text: sorted.sorted_bubble.map(dataPoint => dataPoint.otu_label),
    marker: {
      size: sorted.sorted_bubble.map(dataPoint => dataPoint.sample_value),
      color: sorted.sorted_bubble.map(dataPoint => dataPoint.otu_id_num)
    }
  };
    
  // Restyle both bar plot
  Plotly.restyle("bar", "x", [barData.x]);
  Plotly.restyle("bar", "y", [barData.y]);
  Plotly.restyle("bar", "text", [barData.text]);

  // Restyle bubble chart
  Plotly.restyle("bubble", "x", [bubbleData.x]);
  Plotly.restyle("bubble", "y", [bubbleData.y]);
  Plotly.restyle("bubble", "text", [bubbleData.text]);
  Plotly.restyle("bubble", "marker.size", [bubbleData.marker.size]);
  Plotly.restyle("bubble", "marker.color", [bubbleData.marker.color]);

  // Gather metadata to show
  let selectedMetaData = data.metadata.filter(dataSet => dataSet.id == parseInt(selection))[0];
  console.log(selectedMetaData)
  // Write metadata to webpage
  d3.select("#id").text(`id: ${selectedMetaData.id}`);
  d3.select("#ethnicity").text(`ethnicity: ${selectedMetaData.ethnicity}`);
  d3.select("#gender").text(`gender: ${selectedMetaData.gender}`);
  d3.select("#age").text(`age: ${selectedMetaData.age}`);
  d3.select("#location").text(`location: ${selectedMetaData.location}`);
  d3.select("#bbtype").text(`bbtype: ${selectedMetaData.bbtype}`);
  d3.select("#wfreq").text(`wfreq: ${selectedMetaData.wfreq}`);

})}

// Fetch the data and performs the full function
d3.json(url).then(init)
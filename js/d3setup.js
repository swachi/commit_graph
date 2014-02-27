
  var width = 1410;
  var height = 700;

  var widthPad = 20;

  var svg = d3.select("body").append("svg")
              .attr("width", width)
              .attr("height", height);
  
svg.append("svg:defs").selectAll("marker")
    .data(["end"])      // Different link/path types can be defined here
  .enter().append("svg:marker")    // This section adds in the arrows
    .attr("id", String)
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 15)
    .attr("refY", -1.5)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("orient", "auto")
  .append("svg:path")
    .attr("d", "M0,-5L10,0L0,5");


  // constructs a new ordinal scale of range of ten categorical colors.
  var fill = d3.scale.category20(); 

  var graph = {nodes:[], links:[]}
  var somedata = null

  var link = null
  var node = null
  var path = null

  var x_scale = d3.scale.linear().range([0+widthPad,width-widthPad]);


var alldates = []

var force = d3.layout.force()
              .size([width, height])
              .charge(-50)
              .linkDistance(10)
              .on("tick", tick)
              .on("start", function(d) {})
              .on("end", function(d) {})


var force_layout = function() {
     force.nodes(graph.nodes)
          .links(graph.links)
          .start();
  }

// var sha2key = d3.map()

function tick(d) {
  graph_update(0);
}

/////////////////////////////

///layout functions


function line_cat_layout() {

  force.stop();

  graph.nodes.forEach(function(d, i) {
    d.y = height/2 + d.cat*20;

    d.x = d.idx*5;
  })

  graph_update(500);
}

function line_cat_layout_idx() {

  force.stop();

  graph.nodes.forEach(function(d, i) {
    d.y = height/2 + d.cat*20;

    x_scale.domain([0,graph.nodes.length])

    d.x = x_scale (d.idx);
  })

  graph_update(500);
}

function line_cat_layout_time() {

  force.stop();

  graph.nodes.forEach(function(d, i) {
    d.y = height/2 + d.cat*20;

     x_scale.domain([d3.min(alldates),d3.max(alldates)])
     // console.log(d.dateString+ ":" + d.date + ":" +x_scale(d.date))
    d.x = x_scale(d.date);
  })

  graph_update(500);
}


function category_size() {
  d3.selectAll("circle").transition().duration(500).attr("r", function(d) { return Math.sqrt((d.cat+1)*10); });
}

function category_color() {
  d3.selectAll("circle").transition().duration(500).style("fill", function(d) { return fill(d.cat); });
}

function author_color() {
  d3.selectAll("circle").transition().duration(500).style("fill", function(d) { return fill(d.user); });
}

function getFieldList(someArray, fieldname){
  return someArray.map(function(x){
    return x[fieldname];
  })
}


function graph_update(delay) {
  path.transition().duration(delay)
      .attr("x1", function(d) { return d.target.x; })
      .attr("y1", function(d) { return d.target.y; })
      .attr("x2", function(d) { return d.source.x; })
      .attr("y2", function(d) { return d.source.y; });

  link.transition().duration(delay)
      .attr("x1", function(d) { return d.target.x; })
      .attr("y1", function(d) { return d.target.y; })
      .attr("x2", function(d) { return d.source.x; })
      .attr("y2", function(d) { return d.source.y; });

  node.transition().duration(delay)
      .attr("transform", function(d) { 
        return "translate("+d.x+","+d.y+")"; 
      });
}

//////////////////////////////////////////////////////////////
// utilities

//////////////////////////////////////////////////////////////////////////////////
/// retrieves multiple urls
var dataFetcher = function(urls, callbackfunc){
  var answer = d3.map()

  // fill with nulls
  d3.map(urls).forEach(function(i, myurl){
    answer.set(myurl, "undefined")
  })

  console.log(answer)

  // determine if the datafetcher collected everything
  var isAllCollected = function(someAnswer){
    return someAnswer.values()
                     .filter(function(x){return x === "undefined";}).length == 0
  }

  d3.map(urls).forEach(function(i, myurl){
    // console.log(myurl);
    d3.json(myurl, function(respData){
      answer.set(myurl,respData)
      console.log("got one!")
      if (isAllCollected(answer)) {
        console.log("finished!")
        callbackfunc(answer);
      }
    });
  });
}
//////////////////////////////////////////////////////////////////////////////////





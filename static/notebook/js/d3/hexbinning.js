/**
 * Created by tiroshan on 1/21/15.
 */

//var datalenght = 2000



function hexBinningCreateGrapgh() {

    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 850 - margin.left - margin.right,
        height = 350 - margin.top - margin.bottom;


    d3.csv("somout.csv", function (data) {

        var x = data.map(function (d) {
            return d.x
        });
        var y = data.map(function (d) {
            return d.y
        });
        var colorlabel = data.map(function (d) {
            return d.c
        });

        var points = new Array(data.length);

        for (i = 0; i < data.length; i++) {
            points[i] = new Array(x[i], y[i])
        }
        console.log(points);

        x = d3.scale.identity()
            .domain([0, width]);

        y = d3.scale.linear()
            .domain([0, height])
            .range([height, 0]);

        var MapColumns = 30,
            MapRows = 20;

        var hexRadius = d3.min([width/((MapColumns + 0.5) * Math.sqrt(3)),
            height/((MapRows + 1/3) * 1.5)]);

        //Calculate the center positions of each hexagon
        var points = [];
        for (var i = 0; i < MapRows; i++) {
            for (var j = 0; j < MapColumns; j++) {
                points.push([hexRadius * j * 1.75, hexRadius * i * 1.5]);
            }//for j
        }//f


        var hexbin = d3.hexbin()
            //.size([width, height])
            .radius(hexRadius);


        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom")
            .tickSize(6, -height);

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .tickSize(6, -width);

        var svg = d3.select("#visualization-area").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        svg.append("clipPath")
            .attr("id", "clip")
            .append("rect")
            .attr("class", "mesh")
            .attr("width", width)
            .attr("height", height);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);


        svg.append("g")
            .attr("clip-path", "url(#clip)")
            .selectAll(".hexagon")
            .data(hexbin(points))
            .enter().append("path")
            .attr("class", "hexagon")
            .attr("d", hexbin.hexagon())
            //.attr("d", function (d) {  return "M" + d.x + "," + d.y + hexbin.hexagon(); })
            //.attr("transform", function (d) {  return "translate(" + d.x + "," + d.y + ")";  })
            .attr("stroke", "white")
            .attr("stroke-width", "1px")
            .style("fill", "teal")
            .style("fill", function(d,i) { if(colorlabel[i]=="g"){ return "#A1EBA1"} else if(colorlabel[i]=="r"){return "#FF85AD"} else{ return "#99CCFF"} });
            //.style("fill", function (d, i) {
            //    console.log(colorlabel[i]);
            //    return colorlabel[i];
            //});

    });


//        var color = d3.scale.linear()
//                        .domain([0, 20]);
////                        .range(["white", "red"])
////                        .interpolate(d3.interpolateLab);
//
//        function setColour(colorlabel){
//            color = d3.range(["white", colorlabel]);
//            console.log(colorlabel)
//        }



}
/**
 * Created by lakmal on 1/11/15.
 */

var margin = {top: 10, right: 50, bottom: 20, left: 50},
    width = 120 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var min = Infinity,
    max = -Infinity;

var chart = d3.box()
    .whiskers(iqr(1.5))
    .width(width)
    .height(height);

function boxPlotSelectGrapgh(selection){
    d3.csv("a.csv", function(data) {
        var len = Object.keys(data[0]).length;
        var object_properties = new Array(len)
        object_properties = Object.getOwnPropertyNames(data[0]);
        var data_array = new Array();
        var element;

        var select_property = selection;
        for (j = 0; j < data.length; j++) {
            var object = data[j];
            var property = object_properties[select_property];

            element = parseInt(object[property]);
            data_array.push(element);
            if (element>max) max = element;
            if (element<min) min = element;
        }
        console.log(data_array);
        chart.domain([min, max]);
        if (isNaN(data_array[0])){
            console.log("NAN")
        }
        else{
            crateGraph([data_array]);
        }
    });

}

function crateGraph(data){
    var svg = d3.select("#flpvisdiv").selectAll("svg")
        .data(data)
        .enter().append("svg")
        .attr("class", "box")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.bottom + margin.top)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(chart);

//                  setInterval(function() {
//                    svg.datum(randomize).call(chart.duration(1000));
//                  }, 2000);
}

function randomize(d) {
    if (!d.randomizer) d.randomizer = randomizer(d);
    return d.map(d.randomizer);
}

function randomizer(d) {
    var k = d3.max(d) * .02;
    return function(d) {
        return Math.max(min, Math.min(max, d + k * (Math.random() - .5)));
    };
}

// Returns a function to compute the interquartile range.
function iqr(k) {
    return function(d, i) {
        var q1 = d.quartiles[0],
            q3 = d.quartiles[2],
            iqr = (q3 - q1) * k,
            i = -1,
            j = d.length;
        while (d[++i] < q1 - iqr);
        while (d[--j] > q3 + iqr);
        return [i, j];
    };
}
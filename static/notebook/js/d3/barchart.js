/**
 * Created by tiroshan on 1/21/15.
 */

var values;

function barChartSelectGrapgh(file,selection){
    d3.csv(file, function(data) {
        //console.log(file);
        var len = Object.keys(data[0]).length;
        var object_properties = new Array(len)
        object_properties = Object.getOwnPropertyNames(data[0]);
        var data_array = new Array(data.length);

        //console.log(object_properties);
        //var select_property = selection;

        for (j = 0; j < data.length; j++) {
            var object = data[j];
            //var property = object_properties[select_property];
            //console.log(object);
            data_array[j] = parseInt(object[selection]);
            console.log(data_array[j]);
        }
        //console.log(data_array);
        if (isNaN(data_array[0])){
            console.log("NAN")
        }
        else{
            cratebarChar(data_array,selection);
        }
    });
}

function cratebarChar(values,column){
    var max_margin = maxMargin(values),
        min_margin = minMargin(values);

    // A formatter for counts.
    var formatCount = d3.format(",.0f");
    var formatPercent = d3.format(".0%");

    var margin = {top: 10, right: 30, bottom: 30, left: 30},
        width = 250 ,//- margin.left - margin.right,
        height = 150,// - margin.top - margin.bottom,
        ticks = ((max_margin - min_margin)/width);

//                console.log(ticks);

    var x = d3.scale.linear()
        .domain([min_margin, max_margin])
        .range([0, width]);

    var data = d3.layout.histogram()
        .bins(x.ticks(100))
    (values);

    var y = d3.scale.linear()
        .domain([0, d3.max(data, function(d) { return d.y; })])
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");
        //.tickFormat(formatPercent);

    var svg = d3.select("#visualization-area").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
            return "<strong>Frequency:</strong> <span style='color:red'>" + formatCount(d.y) + "</span>";
        })

    svg.call(tip);

    var bar = svg.selectAll(".bar")
        .data(data)
        .enter().append("g")
        .attr("class", "bar")
        .attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);

    //console.log("data x "+x(data[1].dx));

    bar.append("rect")
        .attr("x", 1)
        .attr("width",function(){ if(x(data[0].dx)-1<0){return 1;}else{return x(data[0].dx)-1;}})
        .attr("height", function(d) { return height - y(d.y); });

    //bar.append("text")
    //    .attr("dy", ".75em")
    //    .attr("y", 6)
    //    .attr("x", x(data[0].dx) / 2)
    //    .attr("text-anchor", "middle")
    //    .text(function(d) { return formatCount(d.y); });

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", 30)
        .style("text-anchor", "end")
        .text(column);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", -30)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Frequency");

    svg.append("text")
        .attr("x", width / 2 )
        .attr("y", 0)
        .style("text-anchor", "middle")
        .text("Frequency of "+column);

    d3.select("input").on("change", change);

    function change() {
        console.log("selected")
    }

}



function maxMargin(data_array){
    var slots_max = data_array[0];
    for (var s = 0; s < data_array.length; s++) //finding maximum value of slots array
    {
        if (data_array[s] > slots_max) {
            slots_max = data_array[s];
        }
    }
    return(slots_max);
}

function minMargin(data_array){
    var slots_min = data_array[0];
    for (var s = 0; s < data_array.length; s++) //finding maximum value of slots array
    {
        if (data_array[s] < slots_min) {
            slots_min = data_array[s];
        }
    }
    return(slots_min);
}

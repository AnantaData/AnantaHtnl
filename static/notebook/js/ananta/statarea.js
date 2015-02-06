
function populate_eval(){

    d3.csv("stat.csv",function(data){
        dataset = data.map(function(d) { return [ +d["het"], +d["hom"] ]; });
        console.log(dataset)
        var columns = ['het','hom'];
        var table = d3.select("#eval_table");
        var thead = table.append('thead');
        var tbody = table.append('tbody')
        thead.append("tr")
            .selectAll("th")
            .data(columns)
            .enter()
            .append("th")
            .text(function(column) { return column; });

        var rows = tbody.selectAll("tr")
            .data(data)
            .enter()
            .append("tr");
        var cells = rows.selectAll("td")
            .data(function(row) {
                return columns.map(function(column) {
                    return {column: column, value: row[column]};
                });
            })
            .enter()
            .append("td")
            .text(function(d) { return d.value; });
    });

}

function tabulate(){
    d3.csv("stat.csv", function(data) {
        // the columns you'd like to display
        var columns = ["Field","Count","Mean","St.Dev","Min","Q1","Median","Q3","Max"];

        var table = d3.select("#stat_table");
                //.append("table"),
            //thead = d3.select("#statictic_thead"),
            //tbody = d3.select("#statictic_tbody");
        var thead = table.select("thead");
        var tbody = table.select("tbody");
        //thead.style("fixedHeader");

        // append the header row
        thead.select("tr")
            .selectAll("th")
            .data(columns)
            .enter()
            .append("th")
            .text(function(column) { return column; });

        // create a row for each object in the data
        var rows = tbody.selectAll("tr")
            .data(data)
            .enter()
            .append("tr");

        // create a cell in each row for each column
        var cells = rows.selectAll("td")
            .data(function(row) {
                return columns.map(function(column) {
                    return {column: column, value: row[column]};
                });
            })
            .enter()
            .append("td")
            .text(function(d) { return d.value; });
    });

}

function tabulate_2(stattableid){
    var table_id = "#"+stattableid;
    d3.csv("stat.csv", function(data) {
        // the columns you'd like to display
        var columns = ["Check","Field","Count","Mean","St.Dev","Min","Q1","Median","Q3","Max"];

        var table = d3.select(table_id);
        //.append("table"),
        //thead = d3.select("#statictic_thead"),
        //tbody = d3.select("#statictic_tbody");
        var thead = table.select("thead");
        var tbody = table.select("tbody");
        //thead.style("fixedHeader");

        // append the header row
        thead.select("tr")
            .selectAll("th")
            .data(columns)
            .enter()
            .append("th")
            .text(function(column) { return column; });

        // create a row for each object in the data
        var rows = tbody.selectAll("tr")
            .data(data)
            .enter()
            .append("tr");



        // create a cell in each row for each column
        var cells = rows.selectAll("td")
            .data(function(row) {
                return columns.map(function(column) {
                    return {column: column, value: row[column]};
                });
            })
            .enter()
            .append("td")
            .html(function(d) {
                //console.log(d.column);
                if (d.column === "Check") {
                    return '<input type="checkbox" />';
                }

                else {
                    return d.value;
                }
            });


    });

}

function tabulate_3(stattableid,checked){
    var table_id = "#"+stattableid;
    d3.csv("stat.csv", function(data) {
        // the columns you'd like to display
        var columns = ["Check","Field","Count","Mean","St.Dev","Min","Q1","Median","Q3","Max"];

        var table = d3.select(table_id);
        //.append("table"),
        //thead = d3.select("#statictic_thead"),
        //tbody = d3.select("#statictic_tbody");
        var thead = table.select("thead");
        var tbody = table.select("tbody");
        //thead.style("fixedHeader");

        // append the header row
        thead.select("tr")
            .selectAll("th")
            .data(columns)
            .enter()
            .append("th")
            .text(function(column) { return column; });

        // create a row for each object in the data
        var rows = tbody.selectAll("tr")
            .data(data)
            .enter()
            .append("tr");



        // create a cell in each row for each column
        var cells = rows.selectAll("td")
            .data(function(row,i) {
                return columns.map(function(column) {
                    return {row:i, column: column, value: row[column]};
                });
            })
            .enter()
            .append("td")
            .html(function(d) {
                console.log(d);
                console.log(d.column);

                if (d.column === "Check") {
                    if(checked[d.row]) {
                        return '<input type="checkbox" checked="true"/>';
                    }else{
                        return '<input type="checkbox" />';
                    }
                }

                else {
                    return d.value;
                }
            });


    });

}

function getFields(){
    var fields = [];
    $.ajax({
        type: "GET",
        url: "types.csv",
        dataType: "text",
        async:false
    }).success(function (csvd) {
        var field_list = csvd.split('\n');
        var field_data;
        for(var i=0;i<field_list.length;i++){
            field_data = field_list[i].split(',');
            fields.push({name:field_data[0],type:field_data[1]})
        }
    }).done(function() {
        alert( "success" );
    }).fail(function() {
        alert( "error" );
    }).always(function() {
        alert( "complete" );
    });
    return fields;
}
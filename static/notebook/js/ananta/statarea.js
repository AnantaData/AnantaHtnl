
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

function tabulate_2(stattableid, callback){
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

    /*var table = $(table_id)[0];
    var rows = $(table_id)[0].children[1].children;

    for (var i =0;i< rows.length;i++){
        var cell = rows[i].children[0];
        var cell2 = rows[i].children[1];
        cell.innerHTML ='<input type="checkbox" value="'+rows[i].children[1].innerText+'">';
        var x = document.createElement("input");
        x.setAttribute("type", "checkbox");
        table.children[1].children[i].children[0].appendChild(x);
        //var fcell = $('#stat_table_2')[0].children[1].children[i].children[0];
    }*/
    //var tt = $('#dialog_stat_table');
    //tt.append(table);

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
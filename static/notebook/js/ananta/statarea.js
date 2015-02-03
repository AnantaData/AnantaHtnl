

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

function tabulate_2(){
    d3.csv("stat.csv", function(data) {
        // the columns you'd like to display
        var columns = ["Check","Field","Count","Mean","St.Dev","Min","Q1","Median","Q3","Max"];

        var table = d3.select("#stat_table_2");
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
            .text(function(d) {/*
                if(d.value == null || d.value==""){
                    return '<input type="checkbox">';
                }else {*/
                    return d.value;
                /*}*/
            });
/*
        for (var i =0;i< rows.length;i++){
            var cell = rows[i].children[0];
            var cell2 = rows[i].children[1];
            cell.innerHTML ='<input type="checkbox" value="'+rows[i].children[1].innerText+'">';
            table[0].children[1].children[i].children[0].innerHTML ='<input type="checkbox" value="'+rows[i].children[1].innerText+'">';
        }*/
    });

    var table = $('#stat_table_2');
    var rows = $('#stat_table_2')[0].children[1].children;
    /*var cell;s = table.rows;
    var cell;*/
    for (var i =0;i< rows.length;i++){
        var cell = rows[i].children[0];
        var cell2 = rows[i].children[1];
        cell.innerHTML ='<input type="checkbox" value="'+rows[i].children[1].innerText+'">';
        $('#stat_table_2')[0].children[1].children[i].children[0].innerHTML ='<input type="checkbox" value="'+rows[i].children[1].innerText+'">';
    }
/*
    $("#stat_table_2 td:first-child").each(function() {
        $(this).prepend('<input type="checkbox" class="basic-kpi-row"/>');
    });*/
    var td = $('#stat_table_2').find('td');

    $('#stat_table_2').find('td').each(function(i,obj){
        $(obj).replaceWith('<td><input type="checkbox" id="checkbox'+i+'" name="checkbox'+i+'"></td>');
    });


}
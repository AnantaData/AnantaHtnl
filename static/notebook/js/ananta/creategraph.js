/**
 * Created by tiroshan on 2/7/15.
 */

function ReadJson(JsonArray){


    var graph_src = JsonArray.datafile;
    var stat_src = JsonArray.statfile;

    var graph_count = JsonArray.graphs.length;

    for(i=0;i<graph_count;i++){


        if(JsonArray.graphs[i].graphtype == "scatter"){
            console.log("scatter");
            //for(f=0;f<JsonArray.graphs[i].fileds.length;f++){
            //    console.log(JsonArray.graphs[i].fileds[f]);
                //var column_x = JsonArray.graphs[i].fileds[f];
                //var column_y = JsonArray.graphs[i].fileds[f+1];

            //$("#visualization-area").append('The scatter plot for node in Self Organizing Map');

                scatterplotCreateGrapgh(stat_src);

            //}

            //scatterplotCreateGrapgh();
        }

        else if(JsonArray.graphs[i].graphtype == "bar"){
            console.log("bar");
            for(f=0;f<JsonArray.graphs[i].fileds.length;f++){
                var column = JsonArray.graphs[i].fileds[f];
                console.log(JsonArray.graphs[i].fileds[f]);
                //$("#visualization-area").append('The bar chart for filed in '+column);
                barChartSelectGrapgh(graph_src,column);
            }

        }

        else if(JsonArray.graphs[i].graphtype == "boxplot"){
            console.log("boxplot");
            for(f=0;f<JsonArray.graphs[i].fileds.length;f++){
                var column = JsonArray.graphs[i].fileds[f];
                console.log(JsonArray.graphs[i].fileds[f]);
                //$("#visualization-area").append('The box plot for filed in '+column);
                boxPlotSelectGrapgh(graph_src,column);

            }
        }

        else if(JsonArray.graphs[i].graphtype == "hexbinning"){
            //$("#visualization-area").append('The scatter plot for node in Self Organizing Map');
            hexBinningCreateGrapgh(stat_src);
        }
        //barChartSelectGrapgh(graph_src,"vendorid");
    }
}
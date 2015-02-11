/**
 * Created by tiroshan on 2/7/15.
 */

function visualize(visuData){

    $('#visualization-area').empty();
    var graph_src = visuData.datafile;
    //var graph_src = "a.csv"
    var stat_src = visuData.statfile;

    var graph_count = visuData.graphs.length;

    for(i=0;i<graph_count;i++){


        if(visuData.graphs[i].graph_type == "scatter"){
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

        else if(visuData.graphs[i].graph_type == "barChrt"){
            console.log("bar");
            for(f=0;f<visuData.graphs[i].fields.length;f++){
                var column = visuData.graphs[i].fields[f];
                console.log(visuData.graphs[i].fields[f]);
                //$("#visualization-area").append('The bar chart for filed in '+column);
                barChartSelectGrapgh(graph_src,column);
            }

        }

        else if(visuData.graphs[i].graph_type == "boxplot"){
            console.log("boxplot");
            for(f=0;f<visuData.graphs[i].fields.length;f++){
                var column = visuData.graphs[i].fields[f];
                console.log(visuData.graphs[i].fields[f]);
                //$("#visualization-area").append('The box plot for filed in '+column);
                boxPlotSelectGrapgh(graph_src,column);

            }
        }

        else if(visuData.graphs[i].graph_type == "hexbinning"){
            //$("#visualization-area").append('The scatter plot for node in Self Organizing Map');
            hexBinningCreateGrapgh();
        }
        //barChartSelectGrapgh(graph_src,"vendorid");
    }
}
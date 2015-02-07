

var IPython = (function (IPython) {

    var DTProfile = function (kernel, options) {

        IPython.Profile.apply(this,[options]);

        this.gui_type = 'dtp';
        this.fileName = "";
        this.fileType ="";
        this.fileLoc = "";
        this.flpdialog = new IPython.DtpDialog();

    };


    DTProfile.prototype = new IPython.Profile();


    DTProfile.prototype.create_element = function () {
        IPython.Profile.prototype.create_element.apply(this, arguments);


        var get_flp_code= function(nb,fileType,fileName) {
            var code = 'from ananta_base.base import *' +
                '\nfrom ananta_base.data_cleaning_pan import DataCleaningProfile, UseGlobalConstantStep, IgnoreTupleStep' +
                '\nfrom ananta_base.data_io import FileLoadingProfile, FileLoadStep' +
                '\nfrom ananta_base.data_preparing import DataPreparingProfile, DataSortStep, DataSelectStep' +
                '\nfrom ananta_base.data_set import TrainingSet' +
                '\nfrom ananta_base.data_transformation import DataTransformationProfile, EncodingStep' +
                '\nprojects = TrainingSet()' +
                '\nflp1 = FileLoadingProfile()' +
                '\ns1 = FileLoadStep("' + fileType + '", "' + fileName + '")' +
                '\nflp1.addStep(s1)' +
                '\nflp1.execute(projects)' +
                //'\ndf = projects.data.describe()' +
                '\ndf = projects.data' +
                '\nprint df' +
                '\ndf.to_csv("a.csv", sep=",", encoding="utf-8")' +
                '';
            nb.set_text(code);

        }


        get_flp_code(this, this.fileType,this.fileName);

        var nb = this;
        this.b1.click(function(e){
            e.preventDefault();
            nb.flpdialog.show_dialog(nb,get_flp_code);
        });
        this.b2.click(function(e){
            e.preventDefault();
            IPython.notebook.execute_cell();
        });
        this.b3.click(function(e){
            e.preventDefault();
            //selectGrapgh(2);

            //-----tiro ------ just create a json for test purpose, call ReadJson(Jarrray)

            var Jarrray = {
                "datafile":"data.csv",
                "statfile":"stat.csv",
                "graphs":[
                    {
                        "graphtype":"bar",
                        "fileds":["vendorid", "item_unit_price","item_quantity"]
                    },
                    {
                        "graphtype":"boxplot",
                        "fileds":["vendorid", "item_unit_price","item_quantity"]
                    },
                    {
                        "graphtype":"scatter",
                        "fileds":["name", "legs","hands"]
                    },
                    {
                        "graphtype":"hexbinning",
                        "fileds":["name", "legs","hands"]
                    }
                ]
            };
            ReadJson(Jarrray);
        });


        this.profileheading.text('Data Transformation Profile');
    };


    DTProfile.prototype.fromJSON = function (data) {
        if(data.gui_type ==='dtp'){
            IPython.CodeCell.prototype.fromJSON.apply(this, arguments);

            /*this.fileName = data.fileName;
            this.fileType = data.fileType;
            this.fileLoc = data.fileLoc;*/
        }
    };


    DTProfile.prototype.toJSON = function () {
        var data = IPython.CodeCell.prototype.toJSON.apply(this);

        data.gui_type = this.gui_type;
        /*data.fileName = this.fileName;
        data.fileType = this.fileType;
        data.fileLoc = this.fileLoc;*/
        return data;
    };


    IPython.DTProfile = DTProfile;

    return IPython;
}(IPython));

///
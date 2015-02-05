

var IPython = (function (IPython) {

    var FLProfile = function (kernel, options) {

        IPython.Profile.apply(this, [kernel,options]);

        this.gui_type = 'flp';
        this.profileData= {
            fileName :"",
            fileType :"",
            fileLoc : ""
        };
        this.flpdialog = new IPython.FlpDialog(this.cell_id);
        /*this.visudialog = new IPython.VisuDialog();

        this.boxplotdialog = new IPython.BoxPlotDialog();
        this.barchartdialog = new IPython.BarChartDialog();
        this.hexbinningdialog = new IPython.HexBinningDialog();
        this.scatterplotdialog = new IPython.ScatterPlotDialog();
        this.semanticdialog = new IPython.SemanticDialog();*/

    };


    FLProfile.prototype = new IPython.Profile();


    FLProfile.prototype.create_element = function () {
        IPython.Profile.prototype.create_element.apply(this, arguments);


        var get_flp_code= function(nb,fileType,fileName) {
            var code = 'from ananta_base.base import *' +
                '\nfrom ananta_base.data_cleaning_pan import DataCleaningProfile, UseGlobalConstantStep, IgnoreTupleStep' +
                '\nfrom ananta_base.data_io import FileLoadingProfile, FileLoadStep' +
                '\nfrom ananta_base.data_preparing import DataPreparingProfile, DataSortStep, DataSelectStep' +
                '\nfrom ananta_base.data_set import TrainingSet' +
                '\nfrom ananta_base.data_transformation import DataTransformationProfile, EncodingStep' +
                '\nimport ananta_base.data_stat as stat' +
                '\nprojects = TrainingSet()' +
                '\nflp1 = FileLoadingProfile()' +
                '\ns1 = FileLoadStep("' + fileType + '", "' + fileName + '")' +
                '\nflp1.addStep(s1)' +
                '\nflp1.execute(projects)' +
                '\nstat.getStatistics(projects)' +
                '\nprint "Profile Successfully Executed"' ;


            nb.set_text(code);

        }


        get_flp_code(this, this.fileType,this.fileName);

        var profile = this;
        this.b1.click(function(e){
            e.preventDefault();
            profile.flpdialog.show_dialog(profile,get_flp_code);
        });
        this.b2.click(function(e){
            e.preventDefault();
            profile.set_text(profile.setCode(profile.profileData));
            //get_flp_code(profile,profile.profileData.fileType,profile.profileData.fileName);
            //IPython.notebook.execute_cell();

        });
        this.b3.click(function(e){
            e.preventDefault();
            //boxPlotSelectGrapgh(2);
            //nb.visudialog.show_dialog(nb,get_flp_code);
            //nb.boxplotdialog.show_dialog(nb,2,"x");
            //nb.barchartdialog.show_dialog(nb,2,"x");
            //nb.hexbinningdialog.show_dialog(nb);
            nb.scatterplotdialog.show_dialog();
            //nb.semanticdialog.show_dialog(nb,1,2);

        });
        this.b4.click(function(e){
            e.preventDefault();
            tabulate();

        });

        this.profileheading.text('File Loading Profile');
    };

    FLProfile.prototype.setCode = function(profileData){
        var code = 'from ananta_base.base import *' +
            '\nfrom ananta_base.data_cleaning_pan import DataCleaningProfile, UseGlobalConstantStep, IgnoreTupleStep' +
            '\nfrom ananta_base.data_io import FileLoadingProfile, FileLoadStep' +
            '\nfrom ananta_base.data_preparing import DataPreparingProfile, DataSortStep, DataSelectStep' +
            '\nfrom ananta_base.data_set import TrainingSet' +
            '\nfrom ananta_base.data_transformation import DataTransformationProfile, EncodingStep' +
            '\nimport ananta_base.data_stat as stat' +
            '\nprojects = TrainingSet()' +
            '\nflp1 = FileLoadingProfile()' +
            '\ns1 = FileLoadStep("' + profileData.fileType + '", "' + profileData.fileLoc+profileData.fileName + '")' +
            '\nflp1.addStep(s1)' +
            '\nflp1.execute(projects)' +
            '\nstat.getStatistics(projects)' +
            '\nprint "Profile Successfully Executed"' ;

        return code;
        //nb.set_text(code);
    }


    FLProfile.prototype.fromJSON = function (data) {
        if(data.gui_type ==='flp'){
            IPython.CodeCell.prototype.fromJSON.apply(this, arguments);

            this.profileData = data.profileData;
            /*this.profileData.fileType = data.fileType;
            this.profileData.fileLoc = data.fileLoc;*/
        }
    };


    FLProfile.prototype.toJSON = function () {
        var data = IPython.CodeCell.prototype.toJSON.apply(this);

        data.gui_type = this.gui_type;
        /*data.fileName = this.fileName;
        data.fileType = this.fileType;*/
        data.profileData = this.profileData;
        return data;
    };


    IPython.FLProfile = FLProfile;

    return IPython;
}(IPython));

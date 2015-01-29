

var IPython = (function (IPython) {

    var FLProfile = function (kernel, options) {

        IPython.Profile.apply(this, kernel, [options]);

        this.gui_type = 'flp';
        this.fileName = "";
        this.fileType ="";
        this.fileLoc = "";
        this.flpdialog = new IPython.FlpDialog();

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
                '\nprojects = TrainingSet()' +
                '\nflp1 = FileLoadingProfile()' +
                '\ns1 = FileLoadStep("' + fileType + '", "' + fileName + '")' +
                '\nflp1.addStep(s1)' +
                '\nflp1.execute(projects)' +
                '\nprint(projects.data.describe())' +
                '\ndf = projects.data' +
                //'\ndf.to_csv("a.csv", sep=",", encoding="utf-8")' +
                '\ntypes_list = df.dtypes' +
                '\ntypes_list.to_csv("types.csv", sep=",", encoding="utf-8")' +
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
            selectGrapgh(2);
        });

        this.profileheading.text('File Loading Profile');
    };


    FLProfile.prototype.fromJSON = function (data) {
        if(data.gui_type ==='flp'){
            IPython.CodeCell.prototype.fromJSON.apply(this, arguments);

            this.fileName = data.fileName;
            this.fileType = data.fileType;
            this.fileLoc = data.fileLoc;
        }
    };


    FLProfile.prototype.toJSON = function () {
        var data = IPython.CodeCell.prototype.toJSON.apply(this);

        data.gui_type = this.gui_type;
        data.fileName = this.fileName;
        data.fileType = this.fileType;
        data.fileLoc = this.fileLoc;
        return data;
    };


    IPython.FLProfile = FLProfile;

    return IPython;
}(IPython));



var IPython = (function (IPython) {

    var DCProfile = function (kernel, options) {

        IPython.Profile.apply(this,[options]);

        this.gui_type = 'dcp';
        /*this.fileName = "";
        this.fileType ="";
        this.fileLoc = "";*/
        this.fields = "";
        this.dcpdialog = new IPython.DcpDialog();

    };


    DCProfile.prototype = new IPython.Profile();


    DCProfile.prototype.create_element = function () {
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
            if(nb.fields ==""){
                nb.fields = nb.getFields();
            }
            nb.dcpdialog.show_dialog(nb,get_flp_code);
        });
        this.b2.click(function(e){
            e.preventDefault();
            IPython.notebook.execute_cell();
        });
        this.b3.click(function(e){
            e.preventDefault();
            selectGrapgh(2);
        });
        this.b4.click(function() {

        });

        this.profileheading.text('Data Cleaning Profile');
    };

    DCProfile.prototype.getFields= function(){
        var fields = [];
        $.ajax({
            type: "GET",
            url: "types.csv",
            dataType: "text"
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
    };


    DCProfile.prototype.fromJSON = function (data) {
        if(data.gui_type ==='dcp'){
            IPython.CodeCell.prototype.fromJSON.apply(this, arguments);

            /*this.fileName = data.fileName;
            this.fileType = data.fileType;
            this.fileLoc = data.fileLoc;*/
        }
    };


    DCProfile.prototype.toJSON = function () {
        var data = IPython.CodeCell.prototype.toJSON.apply(this);

        data.gui_type = this.gui_type;
        /*data.fileName = this.fileName;
        data.fileType = this.fileType;
        data.fileLoc = this.fileLoc;*/
        return data;
    };


    IPython.DCProfile = DCProfile;

    return IPython;
}(IPython));

////
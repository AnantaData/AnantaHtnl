

var IPython = (function (IPython) {

    var FLProfile = function (kernel, options) {

        //Inherit from Profile class
        IPython.Profile.apply(this, [kernel,options]);

        //FLProfile specific data
        this.gui_type = 'flp';
        this.profileData = {
            fileName :"",
            fileType :"",
            fileLoc : "",
            fileNamePrefix:this.cell_id,
            visuData:{
                datafile:"",
                statfile:"",
                graphs:[]
            }
        };
        this.profileData.visuData.datafile = this.profileData.fileNamePrefix+"data.csv"
        this.profileData.visuData.statfile = this.profileData.fileNamePrefix+"stat.csv"
        //Dialog for profile settings
        this.settingsdialog = new IPython.FlpDialog(this.cell_id);

        //set the input code according to the profile data
        this.set_text(this.setCode(this.profileData));

    };


    FLProfile.prototype = new IPython.Profile();


    FLProfile.prototype.create_element = function () {
        IPython.Profile.prototype.create_element.apply(this, arguments);

        this.profileheading.text('File Loading Profile');
        this.profileheading[0].style.color="#B404AE";

    };

    FLProfile.prototype.setCode = function(profileData){
        var code = 'from ananta_base.base import *' +
            '\nfrom ananta_base.data_cleaning_pan import DataCleaningProfile, UseGlobalConstantStep, IgnoreTupleStep' +
            '\nfrom ananta_base.data_io import FileLoadingProfile, FileLoadStep' +
            '\nfrom ananta_base.data_preparing import DataPreparingProfile, DataSortStep, DataSelectStep' +
            '\nfrom ananta_base.data_set import TrainingSet' +
            '\nfrom ananta_base.data_transformation import DataTransformationProfile, BitmapEncodingStep, LabelEncodingStep, BinningStep' +
            '\nimport ananta_base.data_stat as stat' +
            '\nprojects = TrainingSet()' +
            '\nflp1 = FileLoadingProfile()' +
            '\ns1 = FileLoadStep("' + profileData.fileType + '", "' + profileData.fileLoc+profileData.fileName + '")' +
            '\nflp1.addStep(s1)' +
            '\nflp1.execute(projects)' +
            '\nstat.getStatistics(projects,"'+profileData.fileNamePrefix+'")' +
            '\nprint "Profile Successfully Executed"' ;

        return code;
    }


    IPython.FLProfile = FLProfile;

    return IPython;
}(IPython));

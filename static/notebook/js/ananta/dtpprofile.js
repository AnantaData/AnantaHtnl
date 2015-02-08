

var IPython = (function (IPython) {

    var DTProfile = function (kernel, options) {

        IPython.Profile.apply(this,[kernel,options]);

        this.gui_type = 'dtp';
        this.profileData = {
            steps :[]
        };
        this.fields = "";

        //Dialog for profile settings
        this.settingsdialog = new IPython.DtpDialog(this.cell_id);

        //set the input code according to the profile data
        this.set_text(this.setCode(this.profileData));

    };


    DTProfile.prototype = new IPython.Profile();


    DTProfile.prototype.create_element = function () {
        IPython.Profile.prototype.create_element.apply(this, arguments);

        this.profileheading.text('Data Transformation Profile');
        this.profileheading[0].style.color="#610B4B";
    };


    DTProfile.prototype.setCode = function(profileData) {
        var code = 'from ananta_base.base import *' +
            '\nfrom ananta_base.data_transformation import DataTransformationProfile, LabelEncodingStep, BinningStep' +
            '\nfrom ananta_base.data_io import FileLoadingProfile, FileLoadStep' +
            '\nfrom ananta_base.data_preparing import DataPreparingProfile, DataSortStep, DataSelectStep' +
            '\nfrom ananta_base.data_set import TrainingSet' +
            '\nimport ananta_base.data_stat as stat' +

            '\ndtp = DataTransformationProfile()';
        var stepCode = "";
        for(var i=0;i<profileData.steps.length;i++){
            stepCode+=this.addStepCode(profileData.steps[i]);
        }
        var endcode =
            '\ndtp.execute(projects)' +
            '\nstat.getStatistics(projects)' +
            '\nprint "Profile Successfully Executed"' ;

        code  = code+stepCode+endcode;
        return code;
    };

    DTProfile.prototype.addStepCode = function(stepData){
        var stepType;
        if(stepData.step_type == 'labelEn'){
            stepType = 'LabelEncodingStep';
            var stepName = 'step'+stepData.step_no;
            var fields = '[';
            for(var i=0;i<stepData.fields.length;i++){
                if(i!=0){
                    fields +=','
                }
                fields += '"'+stepData.fields[i]+'"';

            }
            fields +="]";
            var code =
                '\n'+stepName+' = '+stepType+'('+fields+')' +
                '\ndcp.addStep('+stepName+')';
        }
        if(stepData.step_type == 'binning'){
            stepType = 'BinningStep';
            var stepName = 'step'+stepData.step_no;
            var fields = '[';
            for(var i=0;i<stepData.fields.length;i++){
                if(i!=0){
                    fields +=','
                }
                fields += '"'+stepData.fields[i]+'"';

            }
            fields +="]";
            var code =
                '\n'+stepName+' = '+stepType+'('+fields+')' +
                '\ndcp.addStep('+stepName+')';
        }

        return code;
    };

    IPython.DTProfile = DTProfile;

    return IPython;
}(IPython));

///


var IPython = (function (IPython) {

    var DCProfile = function (kernel, options) {

        IPython.Profile.apply(this,[options]);

        this.gui_type = 'dcp';
        this.profileData = {
            steps :[]
        };
        this.fields = "";

        //Dialog for profile settings
        this.settingsdialog = new IPython.DcpDialog(this.cell_id);

        //set the input code according to the profile data
        this.set_text(this.setCode(this.profileData));

    };


    DCProfile.prototype = new IPython.Profile();


    DCProfile.prototype.create_element = function () {
        IPython.Profile.prototype.create_element.apply(this, arguments);

        this.profileheading.text('Data Cleaning Profile');
        this.profileheading[0].style.color="#610B4B";

    };

    DCProfile.prototype.setCode = function(profileData){
        var code = 'from ananta_base.base import *' +
            '\nfrom ananta_base.data_cleaning_pan import DataCleaningProfile, UseGlobalConstantStep, IgnoreTupleStep' +
            '\nfrom ananta_base.data_io import FileLoadingProfile, FileLoadStep' +
            '\nfrom ananta_base.data_preparing import DataPreparingProfile, DataSortStep, DataSelectStep' +
            '\nfrom ananta_base.data_set import TrainingSet' +
            '\nfrom ananta_base.data_transformation import DataTransformationProfile, EncodingStep' +
            '\nimport ananta_base.data_stat as stat' +

            '\ndcp = DataCleaningProfile()';
        var stepCode = "";
        for(var i=0;i<profileData.steps.length;i++){
            stepCode+=this.addStepCode(profileData.steps[i]);
        }
        var endcode =
            '\ndcp.execute(projects)' +
            '\nstat.getStatistics(projects)' +
            '\nprint "Profile Successfully Executed"' ;

        code  = code+stepCode+endcode;
        return code;
    };

    DCProfile.prototype.addStepCode = function(stepData){
        var stepType;
        if(stepData.step_type == 'ignTupl'){
            stepType = 'IgnoreTupleStep';
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
        if(stepData.step_type == 'gblCnst'){
            stepType = 'UseGlobalConstantStep';
            var stepName = 'step'+stepData.step_no;
            var fields = '[';
            var consts = '[';
            for(var i=0;i<stepData.fields.length;i++){
                if(i!=0){
                    fields +=','
                    consts +=','
                }
                fields += '"'+stepData.fields[i]+'"';
                consts += stepData.global_const;
            }
            fields +="]";
            consts +="]";
            var code =
                '\n'+stepName+' = '+stepType+'('+consts+','+fields+')' +
                '\ndcp.addStep('+stepName+')';
        }

        return code;
    };

    IPython.DCProfile = DCProfile;

    return IPython;
}(IPython));

////
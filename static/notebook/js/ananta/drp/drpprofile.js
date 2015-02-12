

var IPython = (function (IPython) {

    /**
     *
     * @param kernel
     * @param options
     * @constructor
     */

    var DRProfile = function (kernel, options) {

        IPython.Profile.apply(this,[kernel,options]);

        this.gui_type = 'drp';
        this.profileData = {
            steps :[],
            fileNamePrefix:this.cell_id,
            visuData:{
                datafile:"",
                statfile:"",
                graphs:[]
            }
        };
        this.fields = "";
        this.profileData.visuData.datafile = this.profileData.fileNamePrefix+"data.csv"
        this.profileData.visuData.statfile = this.profileData.fileNamePrefix+"stat.csv"

        //Dialog for profile settings
        this.settingsdialog = new IPython.DrpDialog(this.cell_id);

        //set the input code according to the profile data
        this.set_text(this.setCode(this.profileData));

    };

    /**
     *
     * @type {IPython.Profile}
     */
    DRProfile.prototype = new IPython.Profile();


    DRProfile.prototype.create_element = function () {
        IPython.Profile.prototype.create_element.apply(this, arguments);

        this.profileheading.text('Data Reduction Profile');
        this.profileheading[0].style.color="#610B4B";

    };

    DRProfile.prototype.setCode = function(profileData){
        var code = 'from ananta_base.base import *' +
            '\nfrom ananta_base.data_cleaning_pan import DataCleaningProfile, UseGlobalConstantStep, IgnoreTupleStep, UseAttributeMeanStep, UseAttributeModeStep, UseAttributeMedianStep' +
            '\nfrom ananta_base.data_io import FileLoadingProfile, FileLoadStep' +
            '\nfrom ananta_base.data_preparing import DataPreparingProfile, DataSortStep, DataSelectStep' +
            '\nfrom ananta_base.data_set import TrainingSet' +
            '\nfrom ananta_base.data_reduction import DataReductionProfile, VarianceThresholdStep,DropColumnsByNameStep, SelectKBestStep' +
            '\nimport ananta_base.data_stat as stat' +

            '\ndrp = DataReductionProfile()';
        var stepCode = "";
        for(var i=0;i<profileData.steps.length;i++){
            stepCode+=this.addStepCode(profileData.steps[i]);
        }
        var endcode =
            '\ndrp.execute(projects)' +
            '\nstat.getStatistics(projects,"'+profileData.fileNamePrefix+'")' +
            '\nprint "Profile Successfully Executed"' ;

        code  = code+stepCode+endcode;
        return code;
    };

    DRProfile.prototype.addStepCode = function(stepData){
        var stepType;
        if(stepData.step_type == 'removeCol'){
            stepType = 'DropColumnsByNameStep';
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
                '\ndrp.addStep('+stepName+')';
        }
        if(stepData.step_type == 'varThresh'){
            stepType = 'VarianceThresholdStep';
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
        //this is only for supervised mining
        if(stepData.step_type == 'kBest'){
            stepType = 'SelectKBestStep';
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

        //for principal component analysis in Supervised learning
        if(stepData.step_type == 'prinCom'){

        }
        return code;
    };

    IPython.DRProfile = DRProfile;

    return IPython;
}(IPython));

////
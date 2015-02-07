

var IPython = (function (IPython) {

    var SMProfile = function (kernel, options) {

        IPython.Profile.apply(this, [kernel,options]);

        this.gui_type = 'smp';
        this.profileData = {
            algorithm: "",
            response_var:"churn"

        };

        //Dialog for profile settings
        this.settingsdialog = new IPython.SmpDialog(this.cell_id);

        //set the input code according to the profile data
        this.set_text(this.setCode(this.profileData));

    };


    SMProfile.prototype = new IPython.Profile();

    SMProfile.prototype.create_element = function () {
        IPython.Profile.prototype.create_element.apply(this, arguments);

        this.profileheading.text('Supervised Mining Profile');
        this.profileheading[0].style.color="#04B486";

    };

    SMProfile.prototype.setCode = function (profileData) {


        var alg = "";
        algorithm = profileData.algorithm;
        alert(profileData.algorithm)
        if (algorithm == 'logit') {
            alg = 'TrainLogitStep()';
        }
        else if (algorithm == 'ranfor') {
            alg = 'TrainRanforStep()';
        }
        else if (algorithm == 'svm') {
            alg = 'TrainSVMStep()';
        }
        var code ='print "hello world"'; /*'from ananta_base.base import *' +
            '\nfrom ananta_base.mining import supervised_mining as sm' +
            //'\nfrom sklearn.metrics import roc_auc_score' +
            '\nprint "imports done"'+
            '\nsmp1 = sm.SupervisedMiningProfile("'+profileData.response_var+'")' +
            '\nprint "mining profile created" '+
            '\ns1= sm.' + alg + '' +
            '\ns2=sm.PredictStep()' +
            '\nsmp1.addStep(s1)' +
            '\nsmp1.addStep(s2)' +
            '\nsmp1.execute(projects)' +
                //'\ndf = projects.data.describe()' +
            '\ndf = projects.pred_y' +
            '\nprint df' +
            '\ndf.tofile("a.csv", sep=",")' +
            '\nprint projects.roc_auc_score'+
            '';*/
        return code;

    }

    IPython.SMProfile = SMProfile;

    return IPython;
}(IPython));

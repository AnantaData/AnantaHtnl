

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
        var code ='from ananta_base.mining import supervised_mining as sm' +
            '\nfrom sklearn.metrics import r2_score' +
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
            '\nprojects.r2= r2_score(df, projects.train_Y)'+
            '\nif projects.r2<0.5:'+
            '\n\tprint("r2 : \\x1b[31m"+str(projects.r2)+"\\x1b[0m")'+
            '\nelif projects.r2<0.75:'+
            '\n\tprint("r2 : \\x1b[33m"+str(projects.r2)+"\\x1b[0m")'+
            '\nelse:'+
            '\n\tprint("r2 : \\x1b[32m"+str(projects.r2)+"\\x1b[0m")'+
            '\ndf.tofile("a.csv", sep=",")' +
            '';
        return code;

    }

    IPython.SMProfile = SMProfile;

    return IPython;
}(IPython));

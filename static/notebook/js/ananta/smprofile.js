var IPython = (function (IPython) {

    var SMProfile = function (kernel, options) {

        IPython.Profile.apply(this, [options]);

        this.gui_type = 'smp';
        this.profileData = {
            algorithm: ""

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
        var code = 'from ananta_base.base import *' +
            '\nfrom ananta_base.mining import supervised_mining as sm' +
            '\nfrom sklearn.metrics import roc_auc_score' +
            '\nsmp1 = sm.SupervisedMiningProfile()' +
            '\ns1= sm.' + alg + '' +
            '\ns2=sm.PredictStep()' +
            '\nsmp1.addStep(s1)' +
            '\nsmp1.addStep(s2)' +
            '\nsmp1.execute(projects)' +
                //'\ndf = projects.data.describe()' +
            '\ndf = projects.pred_y' +
            '\nprint df' +
            '\ndf.tofile("a.csv", sep=",")' +
            '\nif projects.Test_Y != None:' +
            '\n\tprojects.roc_auc_score = roc_auc_score(Test_Y,pred_y)' +
            '\nprint projects.roc_auc_score'+
            '';
        return code;

    }

    IPython.SMProfile = SMProfile;

    return IPython;
}(IPython));

/* var get_smp_code= function(nb,algorithm) {
 var alg="";
 alert(algorithm)
 if (algorithm=='logit'){
 alg='TrainLogitStep()';
 }
 else if(algorithm == 'ranfor') {
 alg='TrainRanforStep()';
 }
 else if(algorithm=='svm'){
 alg='TrainSVMStep()';
 }
 var code = 'from ananta_base.base import *' +
 '\nfrom ananta_base.mining import supervised_mining as sm'+
 '\nsmp1 = sm.SupervisedMiningProfile()' +
 '\ns1= sm.'+alg+''+
 '\ns2=sm.PredictStep()'+
 '\nump1.addStep(s1)' +
 '\nump1.addStep(s2)'+
 '\nump1.execute(projects)' +
 //'\ndf = projects.data.describe()' +
 '\ndf = projects.data' +
 '\nprint df' +
 '\ndf.tofile("a.csv", sep=",")' +
 '';
 nb.set_text(code);

 }


 get_smp_code(this, this.algorithm);

 var nb = this;
 this.b1.click(function(e){
 e.preventDefault();
 nb.settingsdialog.show_dialog(nb,get_smp_code);
 });
 this.b2.click(function(e){
 e.preventDefault();
 IPython.notebook.execute_cell();
 });
 this.b3.click(function(e){
 e.preventDefault();
 selectGrapgh(2);
 });

 this.b4.click(function(e){
 e.preventDefault();
 populate_eval();
 });

 this.profileheading.text('Supervised Mining Profile');
 };


 /* SMProfile.prototype.fromJSON = function (data) {
 if(data.gui_type ==='smp'){
 IPython.CodeCell.prototype.fromJSON.apply(this, arguments);

 this.fileName = data.fileName;
 this.fileType = data.fileType;
 this.fileLoc = data.fileLoc;
 }
 }; */

/*
 SMProfile.prototype.toJSON = function () {
 var data = IPython.CodeCell.prototype.toJSON.apply(this);

 data.gui_type = this.gui_type;
 /*data.fileName = this.fileName;
 data.fileType = this.fileType;
 data.fileLoc = this.fileLoc;
 return data;
 };


 IPython.SMProfile = SMProfile;

 return IPython;
 }(IPython));*/

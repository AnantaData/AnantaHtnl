var IPython = (function (IPython) {

    var UMProfile = function (kernel, options) {

        IPython.Profile.apply(this, [options]);

        this.gui_type = 'ump';
        this.profileData = {
            algorithm: ""

        };

        //Dialog for profile settings
        this.settingsdialog = new IPython.UmpDialog(this.cell_id);

        //set the input code according to the profile data
        this.set_text(this.setCode(this.profileData));

    };


    UMProfile.prototype = new IPython.Profile();

    UMProfile.prototype.create_element = function () {
        IPython.Profile.prototype.create_element.apply(this, arguments);
        this.profileheading.text('Unsupervised Mining Profile');
        this.profileheading[0].style.color="#0B615E";
    };

    UMProfile.prototype.setCode = function (profileData) {


        var alg = "";
        var scheme="MapEvalStep()";
        algorithm = profileData.algorithm;
        alert(profileData.algorithm)
        if (algorithm == 'kgsom') {
            alg = 'TrainLogitStep()';
        }
        else if (algorithm == 'gsom') {
            alg = 'TrainRanforStep()';
        }
        else if (algorithm == 'kmeans') {
            alg = 'KmeanStep('+profileData.kv+')';
            scheme='KMeanEvalStep()'
        }
        var code = 'from ananta_base.base import *' +
            '\nfrom ananta_base.mining import unsupervised_mining as um' +
            '\nump1 = um.UnupervisedMiningProfile()' +
            '\ns1= um.' + alg + '' +
            '\ns2=um.'+scheme +
            '\nsmp1.addStep(s1)' +
            '\nsmp1.addStep(s2)' +
            '\nsmp1.execute(projects)' +
                //'\ndf = projects.data.describe()' +
            '\ndf = projects.data' +
            '\nprint df' +
            '\ndf.tofile("a.csv", sep=",")' +
            '';
        return code;

    }

    IPython.UMProfile = UMProfile;

    return IPython;
}(IPython));


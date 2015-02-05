

var IPython = (function (IPython) {

    var DMProfile = function (kernel, options) {

        IPython.Profile.apply(this,[options]);

        this.gui_type = 'dmp';
        this.fileName = "";
        this.fileType ="";
        this.fileLoc = "";
        this.dmpdialog = new IPython.DmpDialog();

    };


    DMProfile.prototype = new IPython.Profile();


    DMProfile.prototype.create_element = function () {
        IPython.Profile.prototype.create_element.apply(this, arguments);


        var get_dmp_code= function(nb,algorithm,kv) {
            var alg="";
            alert(algorithm)
            if (algorithm=='gsom'){
                alg='GSOMStep(projects.data.shape[1])';
            }
            else if(algorithm == 'kgsom') {
                alg='KGSOMStep(projects.data.shape[1])';
            }
            else if(algorithm=='kmeans'){
                alg='KmeanStep('+kv+')';
            }
            var code = 'from ananta_base.base import *' +
                '\nfrom ananta_base.mining import unsupervised_mining as um'+
                '\nump1 = um.UnsupervisedMiningProfile()' +
                '\ns1= um.'+alg+''+
                '\nme=um.MapEvalStep()'+
                '\nump1.addStep(s1)' +
                '\nump1.addStep(me)'+
                '\nump1.execute(projects)' +
                //'\ndf = projects.data.describe()' +
                '\ndf = projects.data' +
                '\nprint df' +
                '\ndf.tofile("a.csv", sep=",")' +
                '';
            nb.set_text(code);

        }


        get_dmp_code(this, this.algorithm);

        var nb = this;
        this.b1.click(function(e){
            e.preventDefault();
            nb.dmpdialog.show_dialog(nb,get_dmp_code);
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

        this.profileheading.text('Unsupervised Mining Profile');
    };


    DMProfile.prototype.fromJSON = function (data) {
        if(data.gui_type ==='dmp'){
            IPython.CodeCell.prototype.fromJSON.apply(this, arguments);

            /*this.fileName = data.fileName;
            this.fileType = data.fileType;
            this.fileLoc = data.fileLoc;*/
        }
    };


    DMProfile.prototype.toJSON = function () {
        var data = IPython.CodeCell.prototype.toJSON.apply(this);

        data.gui_type = this.gui_type;
        /*data.fileName = this.fileName;
        data.fileType = this.fileType;
        data.fileLoc = this.fileLoc;*/
        return data;
    };


    IPython.DMProfile = DMProfile;

    return IPython;
}(IPython));

///
var IPython = (function (IPython) {
    "use strict";

    var platform = IPython.utils.platform;

    var SmpDialog = function (cell_id) {
        IPython.ProfileDialog.apply(this, [cell_id]);
    };

    SmpDialog.prototype = new IPython.ProfileDialog();

    SmpDialog.prototype.show_dialog = function (profile) {

        var element = IPython.ProfileDialog.prototype.show_dialog.apply(this, []);
        if(!element){return;}
        var form_div = this.build_elements(profile);
        element.append(form_div);

        var this_dialog = this;
        this.shortcut_dialog = IPython.dialog.modal({
            title : "Supervised Mining Profile",
            body : element,
            destroy : false,
            buttons : {
                Close : {},
                Ok :{class : "btn-primary",
                    click: function(e) {
                        this_dialog.get_values(profile, e);
                    }
                }
            }
        });
        this.shortcut_dialog.addClass("modal_stretch");

        this.retrive_elements();
        this.set_dynamic_ui();
        this.set_values(profile);
        this.setInstruction();

        $([IPython.events]).on('rebuild.QuickHelp', function() { that.force_rebuild = true;});


    };


    SmpDialog.prototype.setInstruction = function(){
        this.documentation.text('Please enter the algorithm you wish to run on this predictive analysis.');
    };



    SmpDialog.prototype.build_elements = function (profile) {
        var div = $('<div/>');

        this.alg_inp_id = this.dialog_id+"algorithm";

        var algLbl = $('<label for="algorithm">Model</label>');
        var algInp = $('<select name="algorithm"  >' +
        '<option selected="selected" value=""></option>' +
        '<option  value="logit" >Logistic Regression</option>' +
        '<option  value="ranfor" >Random Forest Regression</option>'+
        '<option  value="svm" >Support Vector Classifier</option>'+
        '</select>');


        algInp.attr('id',this.alg_inp_id);

        div.append(algLbl).append(algInp);
        return div;
    };

    SmpDialog.prototype.retrive_elements = function(){
        this.algInp  = $('#'+this.alg_inp_id);
        this.errDoc = $('#'+this.errorDoc_id);
        this.documentation = $('#'+this.documentation_id);
    };

    SmpDialog.prototype.get_values = function(profile, e){

        this.errDoc.hide();
        if(!profile.settingsdialog.algInp.val()){
            profile.profileData.algorithm = profile.settingsdialog.algInp[0].algorithm[0].name;
        }
        else {
            profile.profileData.algorithm = profile.settingsdialog.algInp.val();
        }
        if(this.alg_inp_id[0].selectedIndex ==0) {
            e.preventDefault();
            profile.settingsdialog.errDoc.text("Algorithm Not Selected");
            profile.settingsdialog.errDoc.show();
        }else{
            profile.set_text(profile.setCode(profile.profileData));
            //get_flp_code(profile.profileData,profile.profileData.fileType,profile.profileData.fileLoc+profile.profileData.fileName);
            return true;
        }
        return false;
    };

    SmpDialog.prototype.set_values =function(profile){
        $('#'+this.alg_inp_id+' option[value="' + profile.profileData.algorithm + '"]').prop('selected', true);

    };

    SmpDialog.prototype.set_dynamic_ui =function(){
        var this_dialog = this;
        this.algInp.change(function(){
            //this_dialog.fileNameTxt.val(this_dialog.fileNameInp[0].files[0].name);
            console.log('selected');
        });
    };

    IPython.SmpDialog = SmpDialog;

    return IPython;

}(IPython));

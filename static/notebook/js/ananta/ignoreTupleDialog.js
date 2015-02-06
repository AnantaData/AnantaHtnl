/**
 * Created by lakmal on 2/3/15.
 */


var IPython = (function (IPython) {
    "use strict";

    var platform = IPython.utils.platform;

    var IgnTuplDialog = function (cell_id,step_no ) {
        IPython.ProfileDialog.apply(this, [cell_id]);
        this.cell_id = cell_id;
        this.step_type = "igntupl";
        this.step_show_name = "Ignore Tuple";
        this.dialog_id = cell_id+"_"+this.step_type+"_"+step_no+"_";
        this.step_no = step_no;
    };

    IgnTuplDialog.prototype = new IPython.ProfileDialog();


    IgnTuplDialog.prototype.show_dialog = function (profile) {

        var element = IPython.ProfileDialog.prototype.show_dialog.apply(this, []);
        if(!element){return;}
        var form_div = this.build_elements(profile);
        element.append(form_div);

        var this_dialog = this;
        this.shortcut_dialog = IPython.minidialog.modal({
            title : "Ignore Tuple Step",
            body : element,
            destroy : false,
            buttons : {
                Close : {},
                Ok :{class : "btn-primary",
                    click: function(e) {
                        this_dialog.get_values(profile,e);
                        profile.settingsdialog.update_step_list(profile);
                    }
                }
            }
        });
        this.shortcut_dialog.addClass("modal_stretch modal_stretch-mini");

        this.retrive_elements();
        this.set_dynamic_ui();
        this.set_values(profile);
        this.setInstruction();

        $([IPython.events]).on('rebuild.QuickHelp', function() { that.force_rebuild = true;});

    };

    IgnTuplDialog.prototype.setInstruction = function(){
        this.documentation.text('TGive the names of the fields where unfilled data tuples should be removed'+
        '.')
    };

    IgnTuplDialog.prototype.build_elements = function (profile) {


        var div = $('<div/>');

        this.stepNameInp_id = this.dialog_id+"stepname";

        var stepNameLbl = $('<label for="stepname">Step Name:</label>');
        var stepNameInp = $('<input type="text" name="stepname"  readonly>');

        stepNameInp.attr('id',this.stepNameInp_id);

        div.append(stepNameInp);
        return div;
    };

    IgnTuplDialog.prototype.retrive_elements = function(){
        this.stepNameInp = $('#'+this.stepNameInp_id);
        this.errDoc = $('#'+this.errorDoc_id);
        this.documentation = $('#'+this.documentation_id);
    };

    IgnTuplDialog.prototype.get_values = function(profile, e){

        this.errDoc.hide();
        var stepData = {
            step_no : this.step_no,
            step_type : this.step_type,
            step_show_name : this.step_show_name,
            step_label : this.step_no+"-"+this.step_show_name,
            step_name : this.step_no+"_"+this.step_type,
            fields : []
        };
        profile.profileData.steps[this.step_no] = stepData;
    };

    IgnTuplDialog.prototype.set_values =function(profile){
        /*$('#'+this.fileTypeInp_id+' option[value="' + profile.profileData.fileType + '"]').prop('selected', true);
        this.fileLoctInp.val(profile.profileData.fileLoc);
        this.fileNameTxt.val(profile.profileData.fileName);*/
        var stepData = {
            step_no : this.step_no,
            step_type : this.step_type,
            step_show_name : this.step_show_name,
            step_label : this.step_no+"-"+this.step_show_name,
            step_name : this.step_no+"_"+this.step_type,
            fields : []
        };
        if(profile.profileData.steps[this.step_no]){
            stepData = profile.profileData.steps[this.step_no];
        }
        this.stepNameInp.val(stepData.step_label);

    };

    IgnTuplDialog.prototype.set_dynamic_ui =function(){
        /*var this_dialog = this;
        this.fileNameInp.change(function(){
            this_dialog.fileNameTxt.val(this_dialog.fileNameInp[0].files[0].name);
        });*/
    };

    /*IgnTuplDialog.prototype.build_elements = function (nb) {
        var div = $('<div id="dialog_stat_table" class="checkboxlist"/>');
        var html_str = "";
        for(var i=0;i<nb.fields.length;i++){
            html_str+='<input type="checkbox" name="'+nb.fields[i].name+'" value="'+nb.fields[i].name+'" /> '
            +nb.fields[i].name+'<br/>';
        }
        var frm = $(html_str);
        div.append(frm);

        return div;
    };*/

    IPython.IgnTuplDialog = IgnTuplDialog;

    return IPython;

}(IPython));


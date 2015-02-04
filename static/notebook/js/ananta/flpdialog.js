// Copyright (c) IPython Development Team.
// Distributed under the terms of the Modified BSD License.

//============================================================================
// QuickHelp button
//============================================================================

var IPython = (function (IPython) {
    "use strict";

    var platform = IPython.utils.platform;

    var FlpDialog = function (cell_id) {
        this.cell_id = cell_id;
        this.dialog_id = cell_id+"_set_";
    };


    FlpDialog.prototype.show_dialog = function (profile,get_flp_code) {
        // toggles display of keyboard shortcut dialog
        /*var prof = nb;
        var that = this;*/
        if ( this.force_rebuild ) {
            this.shortcut_dialog.remove();
            delete(this.shortcut_dialog);
            this.force_rebuild = false;
        }
        if ( this.shortcut_dialog ){
            // if dialog is already shown, close it
            $(this.shortcut_dialog).modal("toggle");
            return;
        }


        var element = $('<div/>');
        var doc = this.build_documentation();
        var err_doc = this.build_error_doc()
        var form_div = this.build_elements(profile);
        element.append(doc).append(err_doc).append(form_div);

        var this_dialog = this;
        this.shortcut_dialog = IPython.dialog.modal({
            title : "File Loading Profile",
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

        $([IPython.events]).on('rebuild.QuickHelp', function() { that.force_rebuild = true;});


        /*$('#filetype option[value="' + nb.fileType + '"]').prop('selected', true);
        $('#fileloc').val(nb.fileLoc);
        $('#filenametxt').val(nb.fileName);*/

    };

    FlpDialog.prototype.build_documentation = function(){
        var doc = $('<div/>').addClass('alert');
        doc.append(
            $('<button/>').addClass('close').attr('data-dismiss','alert').html('&times;')
        ).append(
            'The File Loading Profile Should be given two inputs. <b>File Type</b> '+
            'which can be csv, txt, json etc.'+
            'and <b>File Name</b> which is the location of file and its name'+
            '.'
        );
        return doc;
    }

    FlpDialog.prototype.build_error_doc = function(){
        this.errorDoc_id = this.dialog_id+"errordoc";
        var err_doc = $('<div/>').addClass('alert-error');
        err_doc.append(
            $('<button/>').addClass('close').attr('data-dismiss','alert').html('&times;')
        ).append('');
        err_doc.hide();
        err_doc.attr('id',this.errorDoc_id);
        return err_doc;
    }

    FlpDialog.prototype.build_elements = function (profile) {
        var div = $('<div/>');
        /*var frm = $('<form method="post" action="demoform.asp">' +
        '<div class="ui-field-contain">' +
        '<label for="filetype">File Type:</label>' +
        '<select name="title" id="filetype"  >' +
        '<option selected="selected" value="'+ nb.fileType+'"></option>' +
        '<option  value="csv" id="type_1">CSV</option>' +
        '<option  value="xls" id="type_2">Excel</option>'+
        '<option  value="json" id="type_3">JSON</option>'+
        '<option  value="xml" id="type_3">XML</option>'+
        '</select>' +
        '<label for="fileloc">File Location:</label>' +
        '<input type="text" name="fileloc" id="fileloc" value="">' +
        '<label for="filename">File Name:</label>' +
        '<input type="file" name="filename" id="filename" >' +
        '<input type="text" name="filenametxt" id="filenametxt" readonly>' +
        '</div>' +
        '</form>');*/

        this.fileTypeInp_id = this.dialog_id+"filetype";
        this.fileLoctInp_id = this.dialog_id+"fileloc";
        this.fileNameInp_id = this.dialog_id+"filename";
        this.fileNameTxt_id = this.dialog_id+"filenametxt"

        var fileTypeLbl = $('<label for="filetype">File Type:</label>');
        var fileTypeInp = $('<select name="filetype"  >' +
                                '<option selected="selected" value=""></option>' +
                                '<option  value="csv" >CSV</option>' +
                                '<option  value="xls" >Excel</option>'+
                                '<option  value="json" >JSON</option>'+
                                '<option  value="xml" >XML</option>'+
                            '</select>');
        var fileLoctLbl = $('<label for="fileloc">File Location:</label>');
        var fileLoctInp = $('<input type="text" name="fileloc" >');
        var fileNameLbl = $('<label for="filename">File Name:</label>');
        var fileNameInp = $('<input type="file" name="filename"  >');
        var fileNameTxt = $('<input type="text" name="filenametxt"  readonly>');

        fileTypeInp.attr('id',this.fileTypeInp_id);
        fileLoctInp.attr('id',this.fileLoctInp_id);
        fileNameInp.attr('id',this.fileNameInp_id);
        fileNameTxt.attr('id',this.fileNameTxt_id);

        div.append(fileTypeLbl).append(fileTypeInp)
            .append(fileLoctLbl).append(fileLoctInp)
            .append(fileNameLbl).append(fileNameInp).append(fileNameTxt);
        return div;
    };

    FlpDialog.prototype.retrive_elements = function(){
        this.fileTypeInp = $('#'+this.fileTypeInp_id);
        this.fileLoctInp = $('#'+this.fileLoctInp_id);
        this.fileNameInp = $('#'+this.fileNameInp_id);
        this.fileNameTxt = $('#'+this.fileNameTxt_id);
        this.errDoc = $('#'+this.errorDoc_id);
    };

    FlpDialog.prototype.get_values = function(profile, e){

        this.errDoc.hide();
        profile.profileData.fileName = profile.flpdialog.fileNameInp.val();
        profile.profileData.fileLoc = profile.flpdialog.fileLoctInp.val();
        profile.profileData.fileType = profile.flpdialog.fileTypeInp.val();

        if(this.fileTypeInp[0].selectedIndex ==0) {
            e.preventDefault();
            profile.flpdialog.errDoc.text("File Type not selected");
            profile.flpdialog.errDoc.show();
        }else if(!profile.profileData.fileName) {
            e.preventDefault();
            profile.flpdialog.errDoc.text("File Name is not given");
            profile.flpdialog.errDoc.show();
        }else if(!profile.profileData.fileLoc) {
            e.preventDefault();
            profile.flpdialog.errDoc.text("File Location is not given");
            profile.flpdialog.errDoc.show();
        }else{
            //get_flp_code(profile.profileData,profile.profileData.fileType,profile.profileData.fileLoc+profile.profileData.fileName);
            return true;
        }
        return false;
    };

    FlpDialog.prototype.set_values =function(profile){
        $('#'+this.fileTypeInp_id+' option[value="' + profile.profileData.fileType + '"]').prop('selected', true);
        this.fileLoctInp.val(profile.profileData.fileLoc);
        this.fileNameTxt.val(profile.profileData.fileName);
    };

    FlpDialog.prototype.set_dynamic_ui =function(){
        var this_dialog = this;
        this.fileNameInp.change(function(){
            this_dialog.fileNameTxt.val(this_dialog.fileNameInp[0].files[0].name);
        });
    };

    IPython.FlpDialog = FlpDialog;

    return IPython;

}(IPython));

// Copyright (c) IPython Development Team.
// Distributed under the terms of the Modified BSD License.

//============================================================================
// QuickHelp button
//============================================================================

var IPython = (function (IPython) {
    "use strict";

    var platform = IPython.utils.platform;

    var DcpDialog = function (selector) {
        this.minidialog = null;
    };


    DcpDialog.prototype.show_dialog = function (nb,get_flp_code) {
        // toggles display of keyboard shortcut dialog
        var prof = nb;
        var that = this;
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
        /*var command_shortcuts = IPython.keyboard_manager.command_shortcuts.help();
        var edit_shortcuts = IPython.keyboard_manager.edit_shortcuts.help();
        var help, shortcut;
        var i, half, n;*/
        var element = $('<div/>');

        // The documentation
        var doc = $('<div/>').addClass('alert');
        doc.append(
            $('<button/>').addClass('close').attr('data-dismiss','alert').html('&times;')
        ).append(
            'The File Loading Profile Should be given two inputs. <b>File Type</b> '+
            'which can be csv, txt, json etc.'+
            'and <b>File Name</b> which is the location of file and its name'+
            '.'
        );

        var err_doc = $('<div id="dcp_error_doc"/>').addClass('alert-error');
        err_doc.append(
            $('<button/>').addClass('close').attr('data-dismiss','alert').html('&times;')
        ).append(
            ''
        );
        err_doc.hide();
        element.append(doc).append(err_doc);

        var form_div = this.build_flp_form(nb);
        element.append(form_div);


        this.shortcut_dialog = IPython.dialog.modal({
            title : "Data Cleaning Profile",
            body : element,
            destroy : false,
            buttons : {
                Close : {},
                Ok :{class : "btn-primary",
                    //id:"dcpok",
                    click: function(e) {
                        var filetype = $('#filetype');
                        var filename = $('#filenametxt');
                        var fileloc = $('#fileloc');
                        var err_doc = $('#dcp_error_doc');
                        err_doc.hide();
                        var f = filetype[0];
                        var error = 0;
                        nb.fileName = filename.val();
                        nb.fileLoc = fileloc.val();
                        nb.fileType = filetype.val();

                        if(f.selectedIndex ==0) {
                            e.preventDefault();
                            err_doc.text("File Type not selected");
                            err_doc.show();
                        }else if(!nb.fileName) {
                            e.preventDefault();
                            err_doc.text("File Name is not given");
                            err_doc.show();
                        }else if(!nb.fileLoc) {
                            e.preventDefault();
                            err_doc.text("File Location is not given");
                            err_doc.show();
                        }else{
                            get_flp_code(nb,nb.fileType,nb.fileLoc+nb.fileName);
                            return true;
                        }
                        return false;

                    }
                }
            }
        });
        this.shortcut_dialog.addClass("modal_stretch");

        var that =this;
        $("#addButton").click(function(){
            var selected = $('#steptype').val();
            window.alert(selected);
            var stepInput = $('#stepInput');
            if(selected == 'ignTupl'){
                that.minidialog = new IPython.IgnTuplDialog();
                that.minidialog.show_dialog(nb, get_flp_code);
                //that.minidialog.focus();
            }else if (selected == 'gblCnst'){

            }else if(selected == 'atrMean'){

            }else if(selected == 'atrMode'){

            }else if(selected == 'atrMedn'){

            }
        });

        $("#testdialog").click(function(){
            window.alert("clicked");
        });
        
        $([IPython.events]).on('rebuild.QuickHelp', function() { that.force_rebuild = true;});


        $('#filetype option[value="' + nb.fileType + '"]').prop('selected', true);
        $('#fileloc').val(nb.fileLoc);
        $('#filenametxt').val(nb.fileName);

    };

    DcpDialog.prototype.build_flp_form = function (nb) {
        var div = $('<div/>');
        var frm = $(
        '<div class="stepinputui">' +
        '<div class="stepinputui-left">' +
        '<label for="filetype">Step Type:</label>' +
        '<select  name="title" id="steptype"  size="6" >' +
        '<option  value="ignTupl" id="type_1">Ignore Tuples</option>' +
        '<option  value="gblCnst" id="type_2">Global Constatnt Filling</option>'+
        '<option  value="atrMean" id="type_3">Attribute Mean Filling</option>'+
        '<option  value="atrMode" id="type_3">Attribute Mode Filling</option>'+
        '<option  value="atrMedn" id="type_3">Attribute Median Filling</option>'+
        '</select>'+
        '<button id="addButton">Add Step</button>' +
        '</div>' +
        '<div class="stepinputui-right">' +
        '<textarea style="resize:none" name="steps" cols="10" rows="6"></textarea>' +
        '<button id="editButton">Edit Step</button>' +
        '<button id="deleteButton">Delete Step</button>' +
        '</div>' +
        '</div>' );
        div.append(frm);
        //div.append($('<button id="testdialog">Test</button>'));
        return div;
    };

    IPython.DcpDialog = DcpDialog;

    return IPython;

}(IPython));

///
/**
 * Created by lakmal on 2/3/15.
 */

// Copyright (c) IPython Development Team.
// Distributed under the terms of the Modified BSD License.

//============================================================================
// QuickHelp button
//============================================================================

var IPython = (function (IPython) {
    "use strict";

    var platform = IPython.utils.platform;

    var IgnTuplDialog = function (selector) {

    };


    IgnTuplDialog.prototype.show_dialog = function (nb,get_flp_code) {
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

        var err_doc = $('<div id="error_doc"/>').addClass('alert-error');
        err_doc.append(
            $('<button/>').addClass('close').attr('data-dismiss','alert').html('&times;')
        ).append(
            ''
        );
        err_doc.hide();
        element.append(doc).append(err_doc);

        var form_div = this.build_flp_form(nb);
        element.append(form_div);


        this.shortcut_dialog = IPython.minidialog.modal({
            title : "Ignore Tuple Step",
            body : element,
            destroy : false,
            buttons : {
                Close : {},
                Ok :{class : "btn-primary",
                    click: function(e) {
                        var filetype = $('#filetype');
                        var filename = $('#filenametxt');
                        var fileloc = $('#fileloc');
                        var err_doc = $('#error_doc');
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
        this.shortcut_dialog.addClass("modal_stretch modal_stretch-mini");

        $("#filename").change(function(){
            window.alert("chosen");
            $('#filenametxt').val($('#filename')[0].files[0].name);
        });

        $([IPython.events]).on('rebuild.QuickHelp', function() { that.force_rebuild = true;});




        $('#filetype option[value="' + nb.fileType + '"]').prop('selected', true);
        $('#fileloc').val(nb.fileLoc);
        $('#filenametxt').val(nb.fileName);

        tabulate_2();
        var table = $('#stat_table_2')[0];
        var rows = $('#stat_table_2')[0].children[1].children;

        for (var i =0;i< rows.length;i++){
            var cell = rows[i].children[0];
            var cell2 = rows[i].children[1];
            cell.innerHTML ='<input type="checkbox" value="'+rows[i].children[1].innerText+'">';
            var x = document.createElement("input");
            x.setAttribute("type", "checkbox");
            table.children[1].children[i].children[0].appendChild(x);
            //var fcell = $('#stat_table_2')[0].children[1].children[i].children[0];
        }
    };

    IgnTuplDialog.prototype.build_flp_form = function (nb) {
        var div = $('<div id="dialog_stat_table" class="checkboxlist"/>');
        var html_str = "";
        for(var i=0;i<nb.fields.length;i++){
            html_str+='<input type="checkbox" name="'+nb.fields[i].name+'" value="'+nb.fields[i].name+'" /> '
            +nb.fields[i].name+'<br/>';
        }
        var frm = $(html_str);
        /*var frm =$('<table id="stat_table_2" class="scrollTable" border="0" cellpadding="0" cellspacing="0" width="100%">' +
        '<thead id="statistic_thead" class="fixedHeader">' +
        '<tr class="alternateRow">' +
        '<th><a href="#">Check</a></th>' +
        '<th><a href="#">Field</a></th>' +
        '<th><a href="#">Count</a></th>' +
        '<th><a href="#">Mean</a></th>' +
        '<th><a href="#">St.Dev</a></th>' +
        '<th><a href="#">Min</a></th>' +
        '<th><a href="#">Q1</a></th>' +
        '<th><a href="#">Median</a></th>' +
        '<th><a href="#">Q3</a></th>' +
        '<th><a href="#">Max</a></th>' +
        '</tr>' +
        '</thead>' +
        '<tbody id="statistic_tbody" class="scrollContent">' +
        '</table>');*/
        div.append(frm);

        return div;
    };

    IPython.IgnTuplDialog = IgnTuplDialog;

    return IPython;

}(IPython));


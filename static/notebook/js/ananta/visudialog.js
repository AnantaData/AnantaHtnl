/**
 * Created by tiroshan on 1/18/15.
 */

// Copyright (c) IPython Development Team.
// Distributed under the terms of the Modified BSD License.

//============================================================================
// QuickHelp button
//============================================================================

var IPython = (function (IPython) {
    "use strict";

    var platform = IPython.utils.platform;

    var VisuDialog = function (selector) {
    };

    VisuDialog.prototype.show_dialog = function (nb,get_dcp_code) {
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


        var diaglog  = this;

        d3.csv("a.csv", function(data) {
            var len = Object.keys(data[0]).length;
            var object_properties = new Array(len)
            object_properties = Object.getOwnPropertyNames(data[0]);
            //var code = this.inject_attributes_form(nb,object_properties);

            var inject_code = '';
            for(var i=0;i<object_properties.length;i++){
                inject_code=inject_code+"\n"+'<label for="label_'+i+'">'+object_properties[i]+':</label>'+
                                        "\n"+'<button id= "btn_box_'+i+'" type="button" class="btn btn-default">BoxPlot</button>'
                                        +" "+'<button id= "btn_bar_'+i+'" type="button" class="btn btn-default">Bar Chart</button>'
                                        +" "+'<button id= "btn_sem_'+i+'" type="button" class="btn btn-default">Semantic</button>';

            }



            var btn_array = new Array(len);

            for (var j=0;j<len;j++){
                    var btn_selection = ['#btn_box_'+j,'#btn_bar_'+j,'#btn_sem_'+j];
                    btn_array[j]= btn_selection;
            }

            for (var k=0;k<len;k++){
                var btn_set = btn_array[k];
                console.log($(btn_set[0]));
                $(btn_set[0]).click(function(e){
                    e.preventDefault();
                    //nb.flpdialog.show_dialog(nb,get_flp_code);
                    console.log(k);
                });

            }

            //console.log(btn_array);

            //console.log(inject_code);
            var form_div = diaglog.build_visu_form(nb,inject_code);
            element.append(form_div);

        });






        window.alert("jquery problem");
        /*
         // Command mode
         var cmd_div = this.build_command_help();
         element.append(cmd_div);

         // Edit mode
         var edit_div = this.build_edit_help(cm_shortcuts);
         element.append(edit_div);*/


        this.shortcut_dialog = IPython.dialog.modal({
            title : "File Loading Profile",
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
                            get_dcp_code(nb,nb.fileType,nb.fileLoc+nb.fileName);
                            //window.alert(fileloc.val() + filename[0].files[0].name);
                            return true;
                        }
                        return false;

                    }
                }
            }
        });
        this.shortcut_dialog.addClass("modal_stretch");

        $("#filename").change(function(){
            window.alert("chosen");
            $('#filenametxt').val($('#filename')[0].files[0].name);
        });

        $("#btn_box_0").click(function(){
            window.alert("chosen");
        });

        $([IPython.events]).on('rebuild.QuickHelp', function() { that.force_rebuild = true;});


        $('#filetype option[value="' + nb.fileType + '"]').prop('selected', true);
        $('#fileloc').val(nb.fileLoc);
        $('#filenametxt').val(nb.fileName);



    };


    VisuDialog.prototype.inject_attributes_form = function (nb,object_array) {
        var inject_code = '';

        for(var i=0;i<object_array.length;i++){

            inject_code=inject_code+'<label for="label">File Type:</label>'

        }
        return inject_code
    };


    VisuDialog.prototype.build_visu_form = function (nb,inject_code) {

        var div = $('<div/>');
        var frm = $('<form method="post" action="demoform.asp">' +
        '<div class="ui-field-contain">' + inject_code+'</div>' +
        '</form>');
        div.append(frm);
        return div;
    };


    // Set module variables
    IPython.VisuDialog = VisuDialog;

    return IPython;

}(IPython));


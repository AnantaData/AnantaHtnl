/**
 * Created by lakmal on 2/5/15.
 */

var IPython = (function (IPython) {
    "use strict";

    var platform = IPython.utils.platform;

    var ProfileDialog = function (cell_id) {
        this.cell_id = cell_id;
        this.dialog_id = cell_id+"_set_";
    };


    ProfileDialog.prototype.show_dialog = function () {

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
        element.append(doc).append(err_doc);

        return element;

    };

    ProfileDialog.prototype.build_documentation = function(){
        this.documentation_id = this.dialog_id+"documentation";
        var doc = $('<div/>').addClass('alert');
        doc.append(
            $('<button/>').addClass('close').attr('data-dismiss','alert').html('&times;')
        ).append(
            ''
        );
        doc.attr('id',this.documentation_id);
        return doc;
    }

    ProfileDialog.prototype.build_error_doc = function(){
        this.errorDoc_id = this.dialog_id+"errordoc";
        var err_doc = $('<div/>').addClass('alert-error');
        err_doc.append(
            $('<button/>').addClass('close').attr('data-dismiss','alert').html('&times;')
        ).append('');
        err_doc.hide();
        err_doc.attr('id',this.errorDoc_id);
        return err_doc;
    }

    IPython.ProfileDialog = ProfileDialog;

    return IPython;

}(IPython));
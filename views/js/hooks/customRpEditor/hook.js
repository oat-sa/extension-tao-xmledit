/*
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; under version 2
 * of the License (non-upgradable).
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 *
 * Copyright (c) 2015 (original work) Open Assessment Technologies SA ;
 *
 */
define([
    'lodash',
    'jquery',
    'xmlEdit/editor',
    'tpl!xmlEdit/hooks/customRpEditor/trigger',
    'tpl!xmlEdit/hooks/customRpEditor/dialog',
    'taoQtiItem/qtiCreator/helper/xmlRenderer',
    'ui/dialog'
], function(_, $, xmlEditor, buttonTpl, dialogTpl, xmlRenderer, dialog){

    'use strict';

    var _ns = '.customRpEditor';

    function customResponseFormLoaded(config, callback){
        $('#item-editor-scope').on('initResponseForm' + _ns, function(){
            var item = config.dom.getEditorScope().data('item');
            if(item.responseProcessing.processingType === 'custom'){
                callback(item);
            }
        });
    }

    /**
     * init the apip creator debugger hook
     * 
     */
    function init(config){

        customResponseFormLoaded(config, function(item){

            var $creatorScope = config.dom.getEditorScope();

            //add button and click events
            var $button = $(buttonTpl()).click(function(){

                var xml = xmlRenderer.render(item.responseProcessing);
                var modal = dialog({
                    autoDestroy : true,
                    content : dialogTpl(),
                    renderTo : $creatorScope,
                    width : 900
                });

                modal.on('opened.modal', function(){

                    var editor = xmlEditor.init(modal.getDom().find('.custom-rp-editor'), {
                        hidden : true,
                        width : '100%',
                        height : 460,
                        zIndex : 301,
                        readonly : false
                    });
                        
                    editor.setValue(xml);
                    editor.show();

                }).render();

            });

            $creatorScope.find('#item-editor-response-property-bar').find('select[name=template]').parent('.panel').after($button);
        });

    }

    /**
     * The format required by the hook, please do not rename the returned function init.
     */
    return {
        init : init
    };
});


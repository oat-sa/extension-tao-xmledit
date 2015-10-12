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
    'tpl!xmlEdit/hooks/qtiCreatorDebugger/trigger',
    'taoQtiItem/qtiCreator/helper/xmlRenderer'
], function(_, $, xmlEditor, buttonTpl, xmlRenderer){
    
    'use strict';
    
    var _ns = '.qtiCreatorDebugger';
    
    /**
     * The list of events to listen to know when the item has been modified
     * @type object
     */
    var eventList = [
        'keyup',
        'click'
    ];
    
    
    function itemWidgetLoaded(config, callback) {
        var $editor = config.dom.getEditorScope();
        if ($editor.data('widget')) {
            callback($editor.data('widget'));
        }
        else {
            $(document).one('widgetloaded.qticreator', function (e, item) {
                callback(item);
            });
        }
    }
    
    /**
     * init the apip creator debugger hook
     * 
     */
    function init(config){
        
        itemWidgetLoaded(config, function(itemWidget){
            
            var $creatorScope = $('#item-editor-scope');
            //create the editor container and add it to the dom
            var $editor = $('<div>').appendTo($creatorScope);
            var editor = xmlEditor.init($editor, {
                hidden : true,
                top : 101,
                width : '100%',
                height : 960,
                zIndex : 301,
                readonly : true
            });

            //add button and click events
            var $button = $(buttonTpl());
            $creatorScope.find('#item-editor-panel').find('.item-editor-menu').append($button);
            
            $button.on('click', function(){
                if($button.hasClass('active')){
                    $button.removeClass('active');
                    editor.hide();
                }else{
                    $button.addClass('active');
                    editor.show();
                }
            });

            //define editor content update
            var updateValue = _.throttle(function updateValue(){
                var xml = xmlRenderer.render(itemWidget.element);
                editor.setValue(xml);
            }, 600);

            //init debugger content
            _.defer(updateValue);

            //update debugger content on change
            $creatorScope.off(_ns).on('click'+_ns+' '+'keyup'+_ns, updateValue);
        });
        
    }
    
    /**
     * The format required by the hook, please do not rename the returned function init.
     */
    return {
        init : init
    };
});


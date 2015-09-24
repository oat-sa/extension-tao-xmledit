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
define(['lodash', 'jquery', 'xmlEdit/editor', 'tpl!xmlEdit/hooks/apipCreatorDebugger/trigger'], function(_, $, xmlEditor, buttonTpl){
    
    'use strict';
    
    /**
     * init the apip creator debugger hook
     * 
     * @param {object} apipCreator - the apipCreator object
     */
    function init(apipCreator){
        
        var $apipCreatorScope = $('#apip-creator-scope');
        //create the editor container and add it to the dom
        var $editor = $('<div>').appendTo($apipCreatorScope);
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
        $apipCreatorScope.find('.item-editor-menu').append($button);
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
            var xml = apipCreator.apipItem.toXML();
            editor.setValue(xml);
        }, 600);
        
        //init debugger content
        _.defer(updateValue);
        
        //update debugger content on change
        apipCreator.$container.on('change.apip-form destroy.apip-form formready.form-builder', updateValue);
    }
    
    return {
        init : init
    };
});
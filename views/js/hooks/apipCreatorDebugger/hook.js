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
define(['jquery', 'xmlEdit/editor', 'tpl!xmlEdit/hooks/apipCreatorDebugger/trigger'], function($, xmlEditor, buttonTpl){
    
    'use strict';
    
    function init(config){
        
        var $apipCreatorScope = $('#apip-creator-scope');
        var $editor = $('<div>').appendTo($apipCreatorScope.find('#item-editor-scroll-outer'));
        var editor = xmlEditor.init($editor, {
            hidden : true,
            top : 34,
            width : '100%',
            height : 900
        });
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
    }
    
    return {
        init : init
    };
});
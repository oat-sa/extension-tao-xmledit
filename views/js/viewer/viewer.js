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
//require.config({paths : {ace : "//cdnjs.cloudflare.com/ajax/libs/ace/1.2.0/"}});
define(['ace/ace', 'xmlEdit/lib/vkBeautify'], function(ace, vkBeautify){
    
    'use strict';
    
    function formatXml(xml){
        return vkBeautify.xml(xml, '\t');
    }
    
    function init($container){
        
        var editor = ace.edit($container[0]);
        editor.setTheme("ace/theme/monokai");
        editor.getSession().setMode("ace/mode/xml");
        editor.setReadOnly(true);
        editor.setShowPrintMargin(false);
        
        function updateXml(xml){
            xml = formatXml(xml);
            editor.getSession().setValue(xml);
        }
    
        return {
            updateXml : updateXml
        };
    }

    return {
        init : init
    };
});
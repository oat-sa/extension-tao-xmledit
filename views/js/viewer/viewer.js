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
require.config({paths : {ace : "../../../xmlEdit/views/js/lib/ace-builds-1.2.0/src-min/"}});
define(['lodash', 'jquery', 'ace/ace', 'xmlEdit/lib/vkBeautify'], function(_, $, ace, vkBeautify){

    'use strict';

    var _defaults = {
        top : 0,
        left : 0,
        width : '800px',
        height : '500px'
    };

    /**
     * Beautify the xml string
     * @private
     * @param {string} xml
     * @returns {string}
     */
    function formatXml(xml){
        return vkBeautify.xml(xml, '\t');
    }

    /**
     * Init the previewer on a container and returns an api to control it
     * 
     * @param {jQuery} $container
     * @param {object} options
     * @returns {object}
     */
    function init($container, options){

        var $editor = $('<div>', {'class' : 'tao-ace-editor'}).appendTo($container);
        var editor = ace.edit($editor[0]);

        options = _.defaults(options, _defaults);
        
        editor.setTheme("ace/theme/monokai");
        editor.getSession().setMode("ace/mode/xml");
        editor.setReadOnly(true);
        editor.setShowPrintMargin(false);
        editor.on('input', function(){
            $container.trigger('change.xml-editor', [editor.getValue()]);
        });

        //set editor style options
        $container
            .addClass('viewer')
            .css({
                top : options.top,
                left : options.left,
                width : options.width,
                height : options.height
            });

        /**
         * Set the editor content
         * @param {string} xml
         */
        function setContent(xml){
            xml = formatXml(xml);
            editor.getSession().setValue(xml);
        }

        return {
            setContent : setContent
        };
    }

    return {
        init : init
    };
});
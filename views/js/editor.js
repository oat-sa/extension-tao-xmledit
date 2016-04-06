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
    'xmlEdit/lib/vkBeautify',
    'ace/ace',
    'css!xmlEditCss/editor'
], function(_, $, vkBeautify){

    'use strict';
    
    var _ns = '.xml-editor';
    
    var _defaults = {
        readonly : false,
        hidden :false,
        top : 0,
        left : 0,
        width : '800px',
        height : '500px',
        zIndex : 1
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
     * Compress the xml string into a single line
     * @private
     * @param {string} xml
     * @returns {string}
     */
    function compressXml(xml){
        return xml.replace(/[ \r\n\t]{1,}xmlns/g, ' xmlns').replace(/>\s{0,}</g,"><"); 
    }
    /**
     * Init the previewer on a container and returns an api to control it
     * 
     * @param {jQuery} $container
     * @param {object} options
     * @param {boolean} [options.readonly] - not editable
     * @param {boolean} [options.hidden] - initially hidden or not
     * @param {number|string} [options.top] - position top absolute to the parent
     * @param {number|string} [options.left] - position left absolute to the parent
     * @param {number|string} [options.width] - width of the editor
     * @param {number|string} [options.height] - height of the editor
     * @param {number} [options.zIndex] - z-index of the editor
     * @fires change.xml-editor
     * @returns {object}
     */
    function init($container, options){

        var $editor = $('<div>', {'class' : 'tao-ace-editor'}).appendTo($container);
        var editor = ace.edit($editor[0]);

        options = _.defaults(options || {}, _defaults);
        
        editor.$blockScrolling = Infinity;//add this fix as suggested by ace to prevent message in console
        editor.setTheme("ace/theme/chrome");
        editor.getSession().setMode("ace/mode/xml");
        editor.setReadOnly(options.readonly);
        editor.setShowPrintMargin(false);
        editor.on('input', _.throttle(function(){
            var annotations = editor.getSession().getAnnotations();
            $container.trigger('change'+_ns, [getValue(), annotations]);
        }, 600));

        //set editor style options
        $container
            .addClass('tao-xml-editor')
            .css({
                top : options.top,
                left : options.left,
                width : options.width,
                height : options.height,
                zIndex : options.zIndex
            });
        
        if(options.hidden){
            $container.hide();
        }
        
        /**
         * Set the editor content
         * @param {string} xml
         */
        function setValue(xml){
            xml = formatXml(xml);
            editor.getSession().setValue(xml);
        }
        
        /**
         * Get the editor content
         *  
         * @returns {string}
         */
        function getValue(){
            return compressXml(editor.getValue());
        }
        
        /**
         * Destroy the editor
         */
        function destroy(){
            
            editor.destroy();
            $container
                .off(_ns)
                .removeClass('tao-xml-editor')
                .removeAttr('style')
                .children('.tao-ace-editor').remove();
        }
        
        return {
            setValue : setValue,
            getValue : getValue,
            destroy : destroy,
            show : function show(){
                $container.show().trigger('show'+_ns);
                setValue(getValue());//ensure that the rendering is updated
            },
            hide : function hide(){
                $container.hide().trigger('hide'+_ns);
            }
        };
    }

    return {
        init : init
    };
});
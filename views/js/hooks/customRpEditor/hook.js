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
    'i18n',
    'jquery',
    'helpers',
    'xmlEdit/editor',
    'tpl!xmlEdit/hooks/customRpEditor/trigger',
    'tpl!xmlEdit/hooks/customRpEditor/dialog',
    'tpl!xmlEdit/hooks/customRpEditor/notification',
    'taoQtiItem/qtiCreator/helper/xmlRenderer',
    'core/validator/Validator',
    'ui/dialog'
], function(_, __, $, helpers, xmlEditor, buttonTpl, dialogTpl, notificationTpl, xmlRenderer, Validator, dialog){

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

                var rpXml = xmlRenderer.render(item.responseProcessing);
                var modal = dialog({
                    autoDestroy : true,
                    content : dialogTpl(),
                    renderTo : $creatorScope,
                    width : 900
                });

                modal.on('opened.modal', function(){

                    var $editorContainer = modal.getDom().find('.custom-rp-editor');
                    var editor = xmlEditor.init($editorContainer, {
                        hidden : true,
                        width : '100%',
                        height : 460,
                        zIndex : 301,
                        readonly : false
                    });

                    editor.setValue(rpXml);
                    editor.show();

                    $editorContainer.on('change.xml-editor', function(e, newRpXml, annotations){

                        validateXml2(item,  newRpXml, annotations, function(){
                            item.responseProcessing.xml = newRpXml;
                        });
                        
                        return;
                        
                        //validate rp
                        validateXml(item, newRpXml, function(){
                            //valid, save to model
                            
                        }, function(errors){
                            //invalid, display error
                            console.log(errors);
                        });

                    });
                }).render();

            });

            $creatorScope.find('#item-editor-response-property-bar').find('select[name=template]').parent('.panel').after($button);
        });

    }

    function validateXml(item, xml, successCb, failureCb){

        variablesExist(item, xml);

        $.ajax({
            url : helpers._url('validate', 'CustomRpEditor', 'xmlEdit'),
            dataType : 'json',
            type : 'GET',
            data : {
                xml : xml
            }
        }).done(function(r){
            if(r.success){
                successCb(xml);
            }else{
                failureCb(xml, r.errors);
            }
        });
    }

    function validateXml2(item, xml, annotations, successCallback){
        
        var messages = [];
        var validator = new Validator([
            {
                name : 'annotations',
                message : __('wrong xml'),
                options : {
                    annotations : annotations
                },
                validate : function(value, callback){
                    var valid = (!annotations || !annotations.length);
                    if(!valid){
                        messages.push('The xml is not valid, please check annotations for errors.');
                    }
                    callback(valid);
                }
            },
            {
                name : 'variables',
                message : __('variable missing'),
                options : {
                    item : item
                },
                validate : function(value, callback){
                    var r = variablesExist(item, xml);
                    var valid = !r.missing.length;
                    if(!valid){
                        _.each(r.missing, function(m){
                            messages.push(__('The variable %s does not exist.', m));
                        });
                    }
                    callback(!r.missing.length);
                }
            },
            {
                name : 'xsd',
                message : __('invalid qti xml'),
                options : {
                    item : item
                },
                validate : function(value, callback){
                    $.ajax({
                        url : helpers._url('validate', 'CustomRpEditor', 'xmlEdit'),
                        dataType : 'json',
                        type : 'GET',
                        data : {
                            xml : xml
                        }
                    }).done(function(r){
                        var valid = r.success;
                        if(!valid){
                            _.each(r.missing, function(m){
                                messages.push(__('Invalid QTI xml %s', m));
                            });
                        }
                        callback(r.success);
                    });
                }
            }
        ]);
        
        validator.validate(xml, function(){
            
            var $notificationContainer = $('.custom-rp-notification');
            
            //clear messages
            $notificationContainer.empty();
            
            console.log(messages);
            
            
            if(messages.length){
                //show notification
                $notificationContainer.append(notificationTpl({messages : messages}));
                
                //disable done
                
            }else if(_.isFunction(successCallback)){
                successCallback(item, xml);
            }
            
        });

    }
    
    function variablesExist(item, rpXml){
        var report = {
            itemVariables : [],
            rpVariables : [],
            missing : []
        };
        var $rp = $(rpXml);
        report.itemVariables = [].concat(_.map(item.responses, function(v){
            return v.id();
        }), _.map(item.outcomes, function(v){
            return v.id();
        }));


        $rp.find('variable,setOutcomeValue').each(function(){
            var id = $(this).attr('identifier');
            report.rpVariables.push(id);
            if(_.indexOf(report.itemVariables, id) === -1){
                report.missing.push(id);
            }
        });

        return report;
    }

    /**
     * The format required by the hook, please do not rename the returned function init.
     */
    return {
        init : init
    };
});


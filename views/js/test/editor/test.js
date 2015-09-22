define([
    'lodash',
    'jquery',
    'xmlEdit/editor'
], function(_, $, xmlEditor){

    'use strict';

    QUnit.test('api', function(assert){
        
        var editor; 
        var $editor = $('#editor');
        
        assert.ok(_.isPlainObject(xmlEditor), 'init xmlEditor');
        assert.ok(_.isFunction(xmlEditor.init), 'has init function');

        editor = xmlEditor.init($editor);

        assert.ok(_.isPlainObject(editor), 'init returns an object');
        assert.ok(_.isFunction(editor.setValue), 'has setValue() fonction');
        assert.ok(_.isFunction(editor.getValue), 'has getValue() fonction');
        assert.ok(_.isFunction(editor.destroy), 'has destroy() fonction');
        assert.ok(_.isFunction(editor.show), 'has show() fonction');
        assert.ok(_.isFunction(editor.hide), 'has hide() fonction');
    });

    QUnit.asyncTest('get/setValue', 4, function(assert){
        
        var editor; 
        var $editor = $('#editor');
        var xml = '<?xml version="1.0" encoding="UTF-8"?><assessmentItem xmlns="http://www.imsglobal.org/xsd/imsqti_v2p1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.imsglobal.org/xsd/imsqti_v2p1  http://www.imsglobal.org/xsd/qti/qtiv2p1/imsqti_v2p1.xsd"    identifier="match-single-cardinality" title="Associate Things" adaptive="false" timeDependent="false" label="" xml:lang="en-US" toolName="TAO" toolVersion="3.1.0-sprint05"><responseDeclaration identifier="RESPONSE" cardinality="single" baseType="directedPair"><correctResponse><value><![CDATA[M C]]></value></correctResponse></responseDeclaration><outcomeDeclaration identifier="SCORE" cardinality="single" baseType="float" /><itemBody><matchInteraction responseIdentifier="RESPONSE" shuffle="true" maxAssociations="1" minAssociations="1"><prompt>Please mark the unique valid association below:</prompt><simpleMatchSet><simpleAssociableChoice identifier="M" fixed="false" matchMax="1" matchMin="0" showHide="show">Mouse</simpleAssociableChoice><simpleAssociableChoice identifier="S" fixed="false" matchMax="1" matchMin="0" showHide="show">Soda</simpleAssociableChoice><simpleAssociableChoice identifier="W" fixed="false" matchMax="1" matchMin="0" showHide="show">Wheel</simpleAssociableChoice><simpleAssociableChoice identifier="D" fixed="false" matchMax="1" matchMin="0" showHide="show">Darth Vader</simpleAssociableChoice></simpleMatchSet><simpleMatchSet><simpleAssociableChoice identifier="A" fixed="false" matchMax="1" matchMin="0" showHide="show">Astronaut</simpleAssociableChoice><simpleAssociableChoice identifier="C" fixed="false" matchMax="1" matchMin="0" showHide="show">Computer</simpleAssociableChoice><simpleAssociableChoice identifier="P" fixed="false" matchMax="1" matchMin="0" showHide="show">Plane</simpleAssociableChoice><simpleAssociableChoice identifier="N" fixed="false" matchMax="1" matchMin="0" showHide="show">Number</simpleAssociableChoice></simpleMatchSet></matchInteraction></itemBody><responseProcessing template="http://www.imsglobal.org/question/qti_v2p1/rptemplates/match_correct"/></assessmentItem>';

        $editor.on('change.xml-editor', function(e, value){
            assert.equal(value, xml, 'xml set');
            QUnit.start();
        });

        editor = xmlEditor.init($editor);
        assert.ok($editor.hasClass('tao-xml-editor'), 'xml editor container class added');
        assert.equal($editor.find('.tao-ace-editor').length, 1, 'ace editor found');
        
        editor.setValue(xml);
        assert.equal(editor.getValue(), xml, 'xml set');
    });
    
    QUnit.test('destroy', function(assert){
        
        var $editor = $('#editor');
        var editor = xmlEditor.init($editor);
        
        assert.ok($editor.hasClass('tao-xml-editor'), 'xml editor container class added');
        assert.equal($editor.find('.tao-ace-editor').length, 1, 'ace editor found');
        
        editor.destroy();
        assert.ok(!$editor.hasClass('tao-xml-editor'), 'xml editor container class restored');
        assert.equal($editor.find('.tao-ace-editor').length, 0, 'ace editor removed');
    });

    QUnit.test('visual test', 0, function(assert){
        var xml = '<?xml version="1.0" encoding="UTF-8"?><assessmentItem xmlns="http://www.imsglobal.org/xsd/imsqti_v2p1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.imsglobal.org/xsd/imsqti_v2p1  http://www.imsglobal.org/xsd/qti/qtiv2p1/imsqti_v2p1.xsd"    identifier="match-single-cardinality" title="Associate Things" adaptive="false" timeDependent="false" label="" xml:lang="en-US" toolName="TAO" toolVersion="3.1.0-sprint05"><responseDeclaration identifier="RESPONSE" cardinality="single" baseType="directedPair"><correctResponse><value><![CDATA[M C]]></value></correctResponse></responseDeclaration><outcomeDeclaration identifier="SCORE" cardinality="single" baseType="float" /><itemBody><matchInteraction responseIdentifier="RESPONSE" shuffle="true" maxAssociations="1" minAssociations="1"><prompt>Please mark the unique valid association below:</prompt><simpleMatchSet><simpleAssociableChoice identifier="M" fixed="false" matchMax="1" matchMin="0" showHide="show">Mouse</simpleAssociableChoice><simpleAssociableChoice identifier="S" fixed="false" matchMax="1" matchMin="0" showHide="show">Soda</simpleAssociableChoice><simpleAssociableChoice identifier="W" fixed="false" matchMax="1" matchMin="0" showHide="show">Wheel</simpleAssociableChoice><simpleAssociableChoice identifier="D" fixed="false" matchMax="1" matchMin="0" showHide="show">Darth Vader</simpleAssociableChoice></simpleMatchSet><simpleMatchSet><simpleAssociableChoice identifier="A" fixed="false" matchMax="1" matchMin="0" showHide="show">Astronaut</simpleAssociableChoice><simpleAssociableChoice identifier="C" fixed="false" matchMax="1" matchMin="0" showHide="show">Computer</simpleAssociableChoice><simpleAssociableChoice identifier="P" fixed="false" matchMax="1" matchMin="0" showHide="show">Plane</simpleAssociableChoice><simpleAssociableChoice identifier="N" fixed="false" matchMax="1" matchMin="0" showHide="show">Number</simpleAssociableChoice></simpleMatchSet></matchInteraction></itemBody><responseProcessing template="http://www.imsglobal.org/question/qti_v2p1/rptemplates/match_correct"/></assessmentItem>';
        xmlEditor.init($('#editor-visual'), {
            top : '320px',
            left : '20px',
            readonly : false
        }).setValue(xml);
    });
});
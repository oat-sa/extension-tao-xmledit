define([
    'lodash',
    'jquery',
    'xmlEdit/viewer/viewer',
    'core/errorHandler'
], function(_, $, viewer, errorHandler){

    'use strict';
    
    var xml = '<?xml version="1.0" encoding="UTF-8"?><assessmentItem xmlns="http://www.imsglobal.org/xsd/imsqti_v2p1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.imsglobal.org/xsd/imsqti_v2p1  http://www.imsglobal.org/xsd/qti/qtiv2p1/imsqti_v2p1.xsd"    identifier="match-single-cardinality" title="Associate Things" adaptive="false" timeDependent="false" label="" xml:lang="en-US" toolName="TAO" toolVersion="3.1.0-sprint05" >        <responseDeclaration identifier="RESPONSE" cardinality="single" baseType="directedPair" >    <correctResponse>        <value><![CDATA[M C]]></value>    </correctResponse>        </responseDeclaration>        <outcomeDeclaration identifier="SCORE" cardinality="single" baseType="float" />        <itemBody>                        <matchInteraction responseIdentifier="RESPONSE" shuffle="true" maxAssociations="1" minAssociations="1" ><prompt >Please mark the unique valid association below:</prompt>    <simpleMatchSet>        <simpleAssociableChoice identifier="M" fixed="false" matchMax="1" matchMin="0" showHide="show" >Mouse</simpleAssociableChoice><simpleAssociableChoice identifier="S" fixed="false" matchMax="1" matchMin="0" showHide="show" >Soda</simpleAssociableChoice><simpleAssociableChoice identifier="W" fixed="false" matchMax="1" matchMin="0" showHide="show" >Wheel</simpleAssociableChoice><simpleAssociableChoice identifier="D" fixed="false" matchMax="1" matchMin="0" showHide="show" >Darth Vader</simpleAssociableChoice>    </simpleMatchSet>    <simpleMatchSet>        <simpleAssociableChoice identifier="A" fixed="false" matchMax="1" matchMin="0" showHide="show" >Astronaut</simpleAssociableChoice><simpleAssociableChoice identifier="C" fixed="false" matchMax="1" matchMin="0" showHide="show" >Computer</simpleAssociableChoice><simpleAssociableChoice identifier="P" fixed="false" matchMax="1" matchMin="0" showHide="show" >Plane</simpleAssociableChoice><simpleAssociableChoice identifier="N" fixed="false" matchMax="1" matchMin="0" showHide="show" >Number</simpleAssociableChoice>    </simpleMatchSet></matchInteraction>              </itemBody>        <responseProcessing template="http://www.imsglobal.org/question/qti_v2p1/rptemplates/match_correct"/></assessmentItem>';
    var _sectionModel = {
        'qti-type' : 'assessmentSection',
        sectionParts : [
            {
                'qti-type' : 'assessmentItemRef',
                categories : ['A', 'B']
            },
            {
                'qti-type' : 'assessmentItemRef',
                categories : ['A', 'B']
            },
            {
                'qti-type' : 'assessmentItemRef',
                categories : ['A', 'B', 'C', 'D']
            },
            {
                'qti-type' : 'assessmentItemRef',
                categories : ['A', 'B', 'D', 'E', 'F']
            }
        ]
    };

    QUnit.test('viewer', function(assert){
        assert.ok(_.isPlainObject(viewer));
        var editor = viewer.init($('#editor .viewer'));
        editor.updateXml(xml);
    });

});
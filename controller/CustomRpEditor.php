<?php
/**
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
 * Copyright (c) 2016 (original work) Open Assessment Technologies SA;
 *
 *
 */

namespace oat\xmlEdit\controller;

/**
 * Simple controller for customRpEditor services
 *
 * @author Open Assessment Technologies SA
 * @package xmlEdit
 * @license GPL-2.0
 *
 */
class CustomRpEditor extends \tao_actions_CommonModule
{

    /**
     * initialize the services
     */
    public function __construct()
    {
        parent::__construct();
    }

    public function validate()
    {

        $success = false;
        $errors  = [];
        $xml = file_get_contents('php://input');
        $xml     = preg_replace('/^<responseProcessing[^>]*>(.*)<\/responseProcessing>$/ms', '$1', $xml, -1, $count);
        
        if ($count) {
            $xml           = '<?xml version="1.0" encoding="UTF-8"?><responseProcessing xmlns="http://www.imsglobal.org/xsd/imsqti_v2p1">'.$xml.'</responseProcessing>';
            $taoQtiItemDir = \common_ext_ExtensionsManager::singleton()->getExtensionById('taoQtiItem')->getDir();
            $xsd           = $taoQtiItemDir.'model/qti/data/qtiv2p1/imsqti_v2p1.xsd';
            $parser        = new \tao_models_classes_Parser($xml);
            if ($parser->validate($xsd)) {
                $success = true;
            } else {
                $xmlErrors = $parser->getErrors();
                foreach ($xmlErrors as $err) {
                    $errors[] = [
                        'line' => $err['line'],
                        'message' => $err['message']
                    ];
                }
            }
        } else {
            $errors[] = __('Missing root node <responseProcessing>');
        }

        $this->returnJson([
            'success' => $success,
            'errors' => $errors
        ]);
    }
    
}
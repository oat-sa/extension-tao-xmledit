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
 * Copyright (c) 2015 (original work) Open Assessment Technologies SA;
 *
 */
namespace oat\xmlEdit\scripts\update;
use \common_ext_ExtensionUpdater;
use oat\tao\model\ClientLibRegistry;
use oat\tao\model\ClientLibConfigRegistry;

/**
 *
 * @author Sam <sam@taotesting.com>
 */
class Updater extends common_ext_ExtensionUpdater
{

    /**
     *
     * @param string $initialVersion
     * @return string $versionUpdatedTo
     */
    public function update($initialVersion)
    {

        $currentVersion = $initialVersion;

        if ($currentVersion === '0.1') {
            ClientLibRegistry::getRegistry()->register('ace', ROOT_URL.'xmlEdit/views/js/lib/ace-1.2.0/');
            ClientLibConfigRegistry::getRegistry()->register(
                'taoQtiItem/controller/apip-creator/main',
                array('hooks' => array('xmlEdit/hooks/apipCreatorDebugger/hook'))
            );
            ClientLibConfigRegistry::getRegistry()->register(
                'taoQtiItem/controller/creator/main',
                array('hooks' => array('xmlEdit/hooks/qtiCreatorDebugger/hook'))
            );

            $currentVersion = '0.2.0';
        }

        $this->setVersion($currentVersion);

        $this->skip('0.2.0', '3.1.0');

        if ($this->isBetween('3.1.0', '3.2.0')) {
            ClientLibRegistry::getRegistry()->register('ace', ROOT_URL.'xmlEdit/views/js/lib/ace-1.4.5/');

            $this->setVersion('3.2.1');
        }

        $this->skip('3.2.1', '3.2.1.1');
    }
}

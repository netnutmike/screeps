var roleHarvester = require('role.harvester');
var roleRemoteHarvester = require('role.remoteHarvester');
var roleUpgrader = require('role.upgrader');
var roleRemoteUpgrader = require('role.remoteUpgrader');
var roleldUpgrader = require('role.ldupgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleEmergencyRepairer = require('role.emergencyRepairer');
var roleWallRepairer = require('role.wallRepairer');
var roleRampartRepairer = require('role.rampartRepairer');
var roleGuard = require('role.guard');
var roleAttacker = require('role.attacker');
var roleClaimer = require('role.claim');
var roleNewUpgrader = require('role.newUpgrader');
var towerRepair = require('role.towerRepair');
var roleStorage = require('role.storage');
var roleRemoteStorage = require('role.remoteStorage');
var roleTransferer = require('role.transferer');
var roleEMiner = require('role.eminer');
var roleSpawnMaint = require('role.spawnMaintainer');

var rolesController = {
    
    run: function()
    {
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            
            switch (creep.memory.role) {
            	case 'harvester':
            		roleHarvester.run(creep);
            		break;
            	case 'remoteHarvester':
            	case 'remoteHarvester2':
            	case 'remoteHarvester3':
            		roleRemoteHarvester.run(creep);
            		break;
            	case 'upgrader':
            		roleUpgrader.run(creep);
            		break;
            	case 'newUpgrader':
            		roleNewUpgrader.run(creep);
            		break;
            	case 'remoteUpgrader':
            		roleRemoteUpgrader.run(creep);
            		break;
            	case 'ldupgrader':
            		roleldUpgrader.run(creep);
            		break;
            	case 'builder':
            	case 'builder2':
            	case 'builder3':
            		roleBuilder.run(creep);
            		break;
            	case 'guard':
            		roleGuard.run(creep);
            		break;
            	case 'attacker':
            	case 'attackers':
            	case 'attacekr':
            		roleAttacker.run(creep);
            		roleAttacker.attack(creep);
            		break;
            	case 'repairer':
            	case 'repairer2':
            	case 'repairer3':
            		roleRepairer.run(creep);
            		break;
            	case 'emergencyRepairer':
            	case 'EmergencyRepairer':
            		roleEmergencyRepairer.run(creep);
            		break;
            	case 'wallRepairer':
            		roleWallRepairer.run(creep);
            		break;
            	case 'rampartRepairer':
            		roleRampartRepairer.run(creep);
            		break;
            	case 'claimer':
            		roleClaimer.run(creep);
            		break;
            	case 'towerRepair':
            		towerRepair.run(creep);
            		break;
            	case 'storage':
            		roleStorage.run(creep);
            		break;
            	case 'remoteStorage':
            		roleRemoteStorage.run(creep);
            		break;
            	case 'transfer':
            		roleTransferer.run(creep);
            		break;
            	case 'eminer':
            	case 'eminer2':
            		roleEMiner.run(creep);
            		break;
            	case 'spawnMaint':
            		roleSpawnMaint.run(creep);
            		break;
            }
        }
    }
};

module.exports = rolesController;
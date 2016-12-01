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
            		roleRemoteHarvester.run(creep);
            		break;
            	case 'upgrader':
            		roleUpgrader.run(creep);
            		break;
            	case 'remoteUpgrader':
            		roleRemoteUpgrader.run(creep);
            		break;
            	case 'ldupgrader':
            		roleldUpgrader.run(creep);
            		break;
            	case 'builder':
            		roleBuilder.run(creep);
            		break;
            	case 'guard':
            		roleGuard.run(creep);
            		break;
            	case 'repairer':
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
            		
            }
        }
    }
};

module.exports = rolesController;
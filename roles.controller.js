var roleHarvester = require('role.harvester');
var roleRemoteHarvester = require('role.remoteHarvester');
var roleUpgrader = require('role.upgrader');
var roleRemoteUpgrader = require('role.remoteUpgrader');
var roleldUpgrader = require('role.ldupgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleWallRepairer = require('role.wallRepairer');
var roleGuard = require('role.guard');

var rolesController = {
    
    run: function()
    {
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            
            if(creep.memory.role == 'harvester') {
                roleHarvester.run(creep);
            }
            if(creep.memory.role == 'remoteHarvester') {
                roleRemoteHarvester.run(creep);
            }
            if(creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep);
            }
            if(creep.memory.role == 'remoteUpgrader') {
                roleRemoteUpgrader.run(creep);
            }
            if(creep.memory.role == 'ldupgrader') {
                roleldUpgrader.run(creep);
            }
            if(creep.memory.role == 'builder') {
                roleBuilder.run(creep);
            }
            if(creep.memory.role == 'guard') {
                roleGuard.run(creep);
            }
            if(creep.memory.role == 'repairer') {
                roleRepairer.run(creep);
            }
            if(creep.memory.role == 'wallRepairer') {
                roleWallRepairer.run(creep);
            }
            
        }
    }
};

module.exports = rolesController;
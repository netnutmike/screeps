var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleldUpgrader = require('role.ldupgrader');
var roleBuilder = require('role.builder');
var roleGuard = require('role.guard');

var rolesController = {
    
    run: function()
    {
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            
            if(creep.memory.role == 'harvester') {
                roleHarvester.run(creep);
            }
            if(creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep);
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
        }
    }
};

module.exports = rolesController;
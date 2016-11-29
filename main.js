//TODOs:
//   Only build workers if needed
//   Worker mode to make builder even if not needed (global option)
//   Have harvesters fill up if there is no work but they are already at an energy source
//   Find nearest energy source (implemented for builders)
//   Make builders repairers too - done I think, need something to repair to test
//   Create emergency mode in the event we are low on harvesters and energy
//   Modify creeps.manager to use an if then else format for creation
//   Redesign roles.controller to use select format

//var roleHarvester = require('role.harvester');
//var roleUpgrader = require('role.upgrader');
//var roleBuilder = require('role.builder');
var roleDefender = require('role.defender');
var creepsManager = require('creeps.manager');
var rolesController = require('roles.controller');
var roomsManager = require('roomsManager');

var gobalMode = 1;


module.exports.loop = function () {

    roomsManager.setMode('E68N14',3);
    roomsManager.setBuilderMode('E68N14',1);
    
    creepsManager.run('E68N14');

    rolesController.run();
    roleDefender.run('E68N14');
}
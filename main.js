//TODOs:

//   Worker mode to make builder even if not needed (global option)
//   Have harvesters fill up if there is no work but they are already at an energy source
//   Find nearest energy source (implemented for builders)
//   Create emergency mode in the event we are low on harvesters and energy
//   Create auto suicide if a creep is injured
//   Create option to define remote rooms for remote harvest and remote upgrade.  The number 
//      is set in the rooms manager routines but being able to just setup options in the options 
//      file is needed.  This would have to be for multiple rooms too
//   Create option to define a long distance upgrader (in the same room) that specifies an energy source


require('settings');
var roleDefender = require('role.defender');
var creepsManager = require('creeps.manager');
var rolesController = require('roles.controller');
var roomsManager = require('roomsManager');
var tenTicksTimer = require('timer.10ticks');
var twentyTicksTimer = require('timer.20ticks');
var oneHundredTicksTimer = require('timer.100ticks');




module.exports.loop = function () {

    roomsManager.setMode(home,3);
    roomsManager.setBuilderMode(home,1);
    
    creepsManager.run(home);

    rolesController.run();
    roleDefender.run(home);
    
    //Fire all timers to look for work.
    tenTicksTimer.run();
    twentyTicksTimer.run();
    oneHundredTicksTimer.run();
    
}
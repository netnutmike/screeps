//TODOs:

//   Have harvesters fill up if there is no work but they are already at an energy source
//   Find nearest energy source (implemented for builders)
//   Create emergency mode in the event we are low on harvesters and energy
//   Create auto suicide if a creep is injured
//   Build a tracking system into the remote harvest and remote upgrade roles that determines based on trip times
//      if the role for remote makes sense.  Like does it cost more to have the creep work or is it gaining more
//      energy than it is expended.
//   Add room reservation capability
//   Since going to multi-room the large wall repairer is spawned even when there are builders.


require('settings');
var roleDefender = require('role.defender');
var creepsManager = require('creeps.manager');
var rolesController = require('roles.controller');
var roomsManager = require('roomsManager');
var tenTicksTimer = require('timer.10ticks');
var twentyTicksTimer = require('timer.20ticks');
var oneHundredTicksTimer = require('timer.100ticks');




module.exports.loop = function () {

    //roomsManager.setMode(home,BUILD);
    //roomsManager.setBuilderMode(home,AUTOMODE);
    //roomsManager.setMode(room2,GROW);
    //roomsManager.setBuilderMode(room2,AUTOMODE);
    
    // check all rooms
    //for(var room_it in Game.rooms) {
    //    var room = Game.rooms[room_it]
    //    var spawn = room.find(FIND_MY_SPAWNS)[0]; 
    creepsManager.run(home);
    creepsManager.run(room2);

    rolesController.run(); 
    
    
    //Fire all timers to look for work.
    tenTicksTimer.run();
    twentyTicksTimer.run();
    oneHundredTicksTimer.run();
    
    
    
}
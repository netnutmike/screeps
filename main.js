//TODOs:

//   Create emergency mode in the event we are low on harvesters and energy
//   Create auto suicide if a creep is injured
//   Build a tracking system into the remote harvest and remote upgrade roles that determines based on trip times
//      if the role for remote makes sense.  Like does it cost more to have the creep work or is it gaining more
//      energy than it is expended.
//   Add room reservation capability
//   Do not spawn remotes if there is a hostile in that room.
//   NEw creeps for using storage or links as sources
//   Complete the attack role
//   Create option to send attackers to a remote room if there are hostiles
//   create room defense mode (ONDEMAND, ATTHEREADY,FULLCREW)
//   Create method to change the build priority based on level and mode as well as room override
//   Create loop in main for each owned room
//   Create room array in settings in place of variables
//   Review code for better efficiencies


require('settings');
var roleDefender = require('role.defender');
var creepsManager = require('creeps.manager');
var rolesController = require('roles.controller');
var roomsManager = require('roomsManager');
var tenTicksTimer = require('timer.10ticks');
var twentyTicksTimer = require('timer.20ticks');
var oneHundredTicksTimer = require('timer.100ticks');




module.exports.loop = function () {

	
    // check all rooms
    //for(var room_it in Game.rooms) {
    //    var room = Game.rooms[room_it]
    //    var spawn = room.find(FIND_MY_SPAWNS)[0]; 
	
	//Only run every 5 game ticks to save CPU.
	if (Game.time % 5 === 0) {
	    creepsManager.run(home);
	    creepsManager.run(room2);
	    creepsManager.run(room3);
	    creepsManager.run(room4);
	    //creepsManager.run(room5);
	}

	roleDefender.run(home);
	roleDefender.run(room2);
	roleDefender.run(room3);
	roleDefender.run(room4);
    rolesController.run(); 
    
    
    //Fire all timers to look for work.
    tenTicksTimer.run();
    twentyTicksTimer.run();
    oneHundredTicksTimer.run();
    
    
    
}
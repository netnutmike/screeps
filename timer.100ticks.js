var roomsManager = require('roomsManager');
var alerts = require('alerts');

stats = require('stats');

var timer100Ticks = {
    
    run: function()
    {
    	// Initialize if it has never been setup before

        if (Memory.hundredTicks == undefined)
        	Memory.hundredTicks = 0;
        
        if (Memory.hundredTicks <= Game.time)
        	{
        	Memory.hundredTicks = Game.time + 100;
        	//console.log("100 tick timer just fired");
        	
        	//put code below here
        	// check all rooms for room mode changes
            for(var room_it in Game.rooms) {
                var room = Game.rooms[room_it];
                if (room.memory.lastLevel == undefined)
                	room.memory.lastLevel = room.controller.level;
                else
                	{
                	if (room.memory.lastLevel < room.controller.level) {
                		//the room as gone to a new level, set th emode to NEWROOM and send an email
                		roomsManager.setMode(room.name,NEWROOM);
                		room.memory.lastLevel = room.controller.level;
                		alerts.newAlert(1,"(SL)(TX) Room " + room.name + " was upgraded to level " + room.controller.level + ". It is in NEWROOM mode and waiting" +
                				" for new construction to be placed, it will then go into build mode within 100 ticks.  Please place new construction now.")
                		
                	} else {
                		switch (room.memory.mode) {
                     	case NEWROOM:
                     		// check for construction sites, if there are any move to BUILD mode
                     		var targets =room.find(FIND_CONSTRUCTION_SITES);
                     		if (targets.length) {
                     			roomsManager.setMode(room.name,BUILD);
                     			alerts.newAlert(1, "(SL) Room " + room.name + " has construction sites and has been moved into the BUILD mode.");
                     		}
                     		
                     		break;
                     		
                     	case BUILD:
                     		// check for construction sites, if there are not any more move to GROW mode
                     		var targets = room.find(FIND_CONSTRUCTION_SITES);
                     		//console.log(targets);
                     		if (!targets.length) {
                     			roomsManager.setMode(room.name,GROW);
                     			alerts.newAlert(1, "(SL) Room " + room.name + " has finished construction and has been moved into the GROW mode.");
                     		}
                     		
                     		break;
                     		
                     	case GROW:
                     		break;
                		}
                	}
                	}
            }
            
            
            // Check to see if it is time to send the twice daily stats
            if (Game.time > Memory.nextStatSend) {
            	stats.run();
            	Memory.nextStatSend = Game.time + 9000;
            }
            
            var d = new Date();
            
            if ((d.getHours() == 13 || d.getHours() == 1) && d.getMinutes() >= 0 && getMinutes() <= 16) {
            	stats.run();
            }
        }
    }
};

module.exports = timer100Ticks;
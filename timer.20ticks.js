var roleEmergencyRepairer = require('role.emergencyRepairer');
var alerts = require('alerts');

var timer20Ticks = {
    
    run: function()
    {
    	// Initialize if it has never been setup before
        if (Memory.twentyTicks == undefined)
        	Memory.twentyTicks = 0;
        
        if (Memory.twentyTicks <= Game.time)
        	{
        	Memory.twentyTicks = Game.time + 20;
        	
        	// everythng that follows gets executed
        	
        	//Emergency Mode Check
        	for(var room_it in Game.rooms) {
                var room = Game.rooms[room_it];
                //console.log("==== " + room.name + " ====");
	        	var goToEmergencyRepairMode = roleEmergencyRepairer.amINeeded(room.name);
	        	if (goToEmergencyRepairMode) {
	        		if (room.memory.emergencyRepairMode == 999 || room.memory.emergencyRepairMode == undefined) {
	        			room.memory.emergencyRepairMode = 10;
	        			alerts.newAlert(1, "(SL) Room " + room.name + " Entered into Emergency Repair Mode");
	        		}
	        		//Memory.emergencyRepairMode = 10;
	        	} else {
	        		if (room.memory.emergencyRepairMode != 999) {
	        			var amIStillNeeded = roleEmergencyRepairer.amIStillNeeded(room.name);
	        			//console.log("Am I Still Needed in room "+ room.name + ": " + amIStillNeeded);
	        			if (!amIStillNeeded) {
	        				room.memory.emergencyRepairMode = 999;
	        				alerts.newAlert(1, "(SL) Room " + room.name + " Exited from Emergency Repair Mode");
	        			}
	        		}
	        	}
	        	//console.log("Start Emergency Repair Mode in room " + room.name + ": " + goToEmergencyRepairMode);
	        	//console.log("Current running emergency repair mode in room " + room.name + ": " + room.memory.emergencyRepairMode);
        	}

        }
    }
};

module.exports = timer20Ticks;
var alerts = require('alerts');

var stats = {
    
    run: function()
    {
    	var msg = "(SL)=== Current Game Stats: ===\n\r";
    	msg += " == GCL ==\n";
    	msg += "   GCL: " + Game.gcl.level + "\n";
    	msg += "   progress to next level: " + Game.gcl.progress + " / " + Game.gcl.progressTotal + "  " + Math.floor(((Game.gcl.progress/Game.gcl.progressTotal) * 100)) + "%\r\n";
    	
    	msg += "\n == Overall Stats ==\n";
    	var count = 0;
    	for ( property in Game.rooms ) count++;
    	msg += "   Rooms: " + Object.keys(Game.rooms).length + "\n";
    	msg += "   Creeps: " + Object.keys(Game.creeps).length + "\n";
    	msg += "   Spawns: " + Object.keys(Game.spawns).length + "\n";
    	msg += "   Structures: " + Object.keys(Game.structures).length + "\n";
    	msg += "   Construction Sites: " + Object.keys(Game.constructionSites).length + "\n";
    	msg += "   Time: " + Game.time + "\n\r";
    	
    	alerts.newAlert(1, msg);
    	
    	msg += " == Rooms ==\n";
    	
    	for(var room_it in Game.rooms) {
            var room = Game.rooms[room_it];
            
            
            if (room.energyCapacityAvailable > 0) {
            	msg = "(SL) == Rooms ==\n";
            	msg += "   = " + room.name + " =\n";
            	msg += "    ** CONTROLLED";
            	msg += "     Energy: " + room.energyAvailable + " / " + room.energyCapacityAvailable + "   " + Math.floor(((room.energyAvailable / room.energyCapacityAvailable) * 100)) + " %\n";
            	msg += "     Current Level: " + room.controller.level + "\n";
            	msg += "     Next Level Progress: " + room.controller.progress + " / " + room.controller.progressTotal + "   " + Math.floor(((room.controller.progress / room.controller.progressTotal) * 100)) + " %\n";
            	msg += "     Safemode Countdown: ";
            	if (room.controller.safeMode != undefined)
            		msg += room.controller.safeMode + " ticks\n";
            	else
            		msg += "* Not in SafeMode *\n";
            	msg += "     Safemodes Available: " + room.controller.safeModeAvailable + "\n";
            	msg += "     Safemode Cooldown Countdown: ";
            	if (room.controller.safeMode != undefined)
            		msg += room.controller.safeMode + " ticks\n";
            	else
            		msg += "* No Cool Down *\n";
            	msg += "     Ticks till Downgrade: " + room.controller.ticksToDowngrade + "\n";
            	
            	msg += "\n     Memory:\n";
            	msg += "       Mode: " + room.memory.mode + "\n";
            	msg += "       builderMode: " + room.memory.builderMode + "\n";
            	msg += "       lastLevel: " + room.memory.lastLevel + "\n";
            	msg += "       rampartRepairValue: " + room.memory.rampartRepairValue + "\n";
            	msg += "       emergencyRepairMode: " + room.memory.emergencyRepairMode + "\n";
            	msg += "       wallRepairValue: " + room.memory.wallRepairValue + "\n";
            	
            	alerts.newAlert(1, msg);
            	
            	msg = "(SL) == Rooms ==\n";
            	msg += "   = " + room.name + " Stats =\n";
            	
            	var ticksSinceLast = Game.time - room.memory.lastStatReport;
            	var totalWaitTime = (room.memory.noEnergyCount + room.memory.busyCount + room.memory.otherReasonCount);
            	
            	msg += "       Ticks since last report: " + ticksSinceLast + "\n";
            	msg += "       Ticks waiting to build creeps: " + totalWaitTime + 
            	"   which is " + Math.floor(((totalWaitTime / ticksSinceLast) * 100 )) + "% of total ticks\n";
            	msg += "       Waiting breakdown:\n";
            	msg += "          Busy     : " + Math.floor((room.memory.busyCount / totalWaitTime) * 100) + "%  (" + room.memory.busyCount + " ticks)\n";
            	msg += "          No Energy: " + Math.floor((room.memory.noEnergyCount / totalWaitTime) * 100) + "%  (" + room.memory.noEnergyCount + " ticks)\n";
            	msg += "          Other    : " + Math.floor((room.memory.otherReasonCount / totalWaitTime) * 100) + "%  (" + room.memory.otherReasonCount + " ticks)\n";
	            
            	alerts.newAlert(1, msg);
            	
            	room.memory.lastStatReport = Game.time;
            	room.memory.noEnergyCount = 0;
            	room.memory.busyCount = 0;
            	room.memory.otherReasonCount = 0;
            	
            	msg = "(SL)\n     Creeps in " + room.name + ":\n";
	            var creepJobs = {};
	            for (var myCreep in Game.creeps) {
	            	
	            	if (Game.creeps[myCreep].memory.home == room.name)
	            		
	            		if (creepJobs[Game.creeps[myCreep].memory.role] == undefined)
	            			creepJobs[Game.creeps[myCreep].memory.role] = 1;
	            		else
	            			++creepJobs[Game.creeps[myCreep].memory.role];
	            }
	            
	            for (key in creepJobs) {
	            	msg += "       " + key + ": " + creepJobs[key] + "\n";
	            }
	            
	            msg += "\n\n";
	            alerts.newAlert(1, msg);
            }
            
            
    	}
    	
    	
    }
};

module.exports = stats;
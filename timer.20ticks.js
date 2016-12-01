var roleEmergencyRepairer = require('role.emergencyRepairer');

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
        	var goToEmergencyRepairMode = roleEmergencyRepairer.amINeeded("E68N14");
        	if (goToEmergencyRepairMode) {
        		if (Memory.emergencyRepairMode == 999 || Memory.emergencyRepairMode == undefined) {
        			Memory.emergencyRepairMode = 10;
        			Game.notify(`Entered into Emergency Repair Mode`);
        			console.log(`Entered into Emergency Repair Mode`);
        		}
        	} else {
        		if (Memory.emergencyRepairMode != 999) {
        			var amIStillNeeded = roleEmergencyRepairer.amIStillNeeded("E68N14");
        			//console.log("Am I Still Needed: " + amIStillNeeded);
        			if (!amIStillNeeded) {
        				Memory.emergencyRepairMode = 999
        				Game.notify(`Exited from Emergency Repair Mode`);
        				console.log(`Exited from Emergency Repair Mode`);
        			}
        		}
        	}
        	//console.log("Start Emergency Repair Mode: " + goToEmergencyRepairMode);
        	//console.log("Current running emergency repair mode: " + Memory.emergencyRepairMode);

        }
    }
};

module.exports = timer20Ticks;
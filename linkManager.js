var roomsManager = require('roomsManager');

var linkManager = {

    /** @param {Creep} creep **/
    run: function(creep) {
	   
    	for(var room_it in Game.rooms) {
    		var targets = Game.rooms[room_it].find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_LINK);
                }
    		});
        
	        if(targets.length > 0) {
	        	for(var linkStructure in targets) {
	        		linkManager.workLink(linkStructure, targets, Game.rooms[room_it]);
	        	}
	        }
    	}
    		
	},
	workLink: function(linkNo, linkObjects, room) {
		
		// look to see if it has more energy than it is supposed to maintain, if it does, send it to the TO address
		// if it is set to maintain energy, see if there is a from and pull energy in the amount to keep it at that level
		
		var toVar = roomsManager.getLinkTo(room.name, linkNo);
		var maintainValue = roomsManager.getLinkMaintain(room.name, linkNo);
		var fromVar = roomsManager.getLinkFrom(room.name, linkNo);
		
		if (toVar == -1)
			return;
		
		if (toVar <= 10) {
			linkO = linkObjects[toVar];
		} else {
			linkO = Game.getObjectById(toVar);
		}
		
		if (linkObjects[linkNo].energy > maintainValue) {
			var transferAmount = linkObjects[linkNo].energy - maintainValue;
			if (linkObjects[linkNo].cooldown == 0)
				linkObjects[linkNo].transferEnergy(linkO, transferAmount);
		} else if (linkObjects[linkNo].energy < maintainValue && fromVar != NONE) {
			var transferAmount = maintainValue - linkObjects[linkNo].energy;
			
			linkObjects[linkNo].transferEnergy(linkO, transferAmount);
		}
		
	},
	handleLink: function(link, tolink) {
		link.transferEnergy(tolink);
	}
};

module.exports = linkManager;
var roleNewUprader = {

    //var testvar = "test";
    
    /** @param {Creep} creep **/
    run: function(creep) {

    	 if(creep.memory.upgrading && creep.carry.energy == 0) {
             creep.memory.upgrading = false;
             creep.say('harvesting');
 	    }
 	    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
 	        creep.memory.upgrading = true;
 	        creep.say('upgrading');
 	    }

	    if(creep.memory.upgrading) {
			
	    	// Check to make sure we are in the correct room first
	    	if (creep.pos.roomName == creep.memory.home) {
	    		if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
	                creep.moveTo(creep.room.controller);
	            }
            } else {
                var exit = creep.room.findExitTo(creep.memory.home);
                creep.moveTo(creep.pos.findClosestByRange(exit));
            }

	        
	    }
	    else {
	    	
	    	if (creep.pos.roomName == creep.memory.remote) {
	    		var sources = creep.pos.findClosestByPath(FIND_SOURCES);
                if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources);
                }
	    	} else {
	    		var exit = creep.room.findExitTo(creep.memory.home);
                creep.moveTo(creep.pos.findClosestByRange(exit));
	    	}
	    }
	}
};

module.exports = roleNewUprader;
var roleclaim = {

    //var testvar = "test";
    
    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = true;
            creep.say('harvesting');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('building');
	    }
	    
	    creep.memory.building = true;

	    if(creep.memory.building) {
			
	    	// Check to make sure we are in the correct room first
	    	if (creep.room.name == creep.memory.home) {
	    		console.log("in right room");
	    		if(creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
	                creep.moveTo(creep.room.controller);
	                console.log("moving to controller");
	            }
            } else {
                var exit = creep.room.findExitTo(creep.memory.home);
                creep.moveTo(creep.pos.findClosestByRange(exit));
            }

	        
	    }
	    else {
	    	console.log("in else");
	    	if (creep.room.name == creep.memory.home) {
	        console.log("in right room");
		        var sources = creep.room.find(FIND_SOURCES);
	            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
	                creep.moveTo(sources[0]);
	            }
	            
    	        //var sources = creep.room.find(FIND_SOURCES);
    	        //var sources = creep.pos.findClosestByPath(FIND_SOURCES);
                //if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                  //  creep.moveTo(sources);
                
	            //}
	    	} else {
	    		var exit = creep.room.findExitTo(creep.memory.home);
                creep.moveTo(creep.pos.findClosestByRange(exit));
                console.log("in wrong room");
	    	}
	    }
	},
	
	workToDo: function(creep)
	{
		
	    var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if(targets.length)
			return true;
        else
	        return false;
	}
};

module.exports = roleclaim;
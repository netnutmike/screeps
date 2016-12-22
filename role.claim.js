var roleclaim = {

    //var testvar = "test";
    
    /** @param {Creep} creep **/
    run: function(creep) {

	   
	    
	    creep.memory.building = true;

	    if(creep.memory.building) {
			
	    	// Check to make sure we are in the correct room first
	    	if (creep.room.name == creep.memory.remote) {
	    		//console.log("in right room");
	    		//console.log(creep.claimController(creep.room.controller));
	    		
	    		if(creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
	                creep.moveTo(creep.room.controller);
	               // console.log("moving to controller");
	            } //else {
	              //  creep.moveTo(creep.room.controller);
	            //}
            } else {
                var exit = creep.room.findExitTo(creep.memory.remote);
                creep.moveTo(creep.pos.findClosestByRange(exit));
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
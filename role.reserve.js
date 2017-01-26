var rolereserve = {

    //var testvar = "test";
    
    /** @param {Creep} creep **/
    run: function(creep) {

	   
	    
	    creep.memory.building = true;

	    if(creep.memory.building) {
			
	    	// Check to make sure we are in the correct room first
	    	if (creep.room.name == creep.memory.remote) {
	    		
	    		if(creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
	                creep.moveTo(creep.room.controller);
	               
	            } 
            } else {
            	if (creep.memory.via != undefined && creep.memory.via != "" && creep.memory.via != null) {
          		  	if (creep.room.name == creep.memory.via) {
          		  		creep.memory.via = null;
          		  	} else {
          		  		var exit = creep.room.findExitTo(creep.memory.via);
          		  		creep.moveTo(creep.pos.findClosestByPath(exit));
          		  		//console.log( creep.name + "   Looking for exit to via in " + creep.room.name + " to " + creep.memory.remote + " via " + creep.memory.via);

          		  	}
            	} else {
          		  	var exit = creep.room.findExitTo(creep.memory.remote);
          		  	creep.moveTo(creep.pos.findClosestByPath(exit));          		  	
          		  	//console.log( creep.name + "   Looking for exit to final destination in " + creep.room.name + " to " + creep.memory.remote + " via " + creep.memory.via);
          		  	
            	}  	// end of via or non via path
            }		// end of in room or not        
	    }	   		// end of building or not 
	}				// end of function
};

module.exports = rolereserve;
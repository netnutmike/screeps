var roleRepairer = {

    //var testvar = "test";
    
    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvesting');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.memory.source = "";
	        creep.say('Repairing' + Memory.standardRepairCount);
	    }
	    
	    var repairPercentage = startRepairingAt;

        //TODO once this is converted to classes this can be removed and use the actual function defined below
        var halfBroken = creep.room.find(FIND_STRUCTURES);
        var thereAreFixes = false;
        var thereIsNonWalls = false;
        
		for(var index in halfBroken)
		{
		    //console.log("Structure: " + halfBroken[index].name + " hits:" + halfBroken[index].hits + "   total:" + halfBroken[index].hitsMax);
			if(((halfBroken[index].hits / halfBroken[index].hitsMax) < repairPercentage) && halfBroken[index].structureType != 'constructedWall' && halfBroken[index].structureType != 'rampart')
				thereAreFixes = true;
        }
        
        var toRepair = [ ];
        
	    if(creep.memory.building && thereAreFixes) {
	        // look for things that need to be repaired first
	        // we look for things that are at 50% of health.  no reason to drop what we are building for something that is at 99% which apparently happens
	        // when you just walk on a road
	        
	        if (creep.memory.currentRepair == "") {
	        	var halfBroken = creep.room.find(FIND_STRUCTURES);
				
				//console.log("halfbroken count: " + halfBroken.length);
			
				for(var index in halfBroken)
				{
			    	//console.log("Structure: " + halfBroken[index].name + " hits:" + halfBroken[index].hits + "   total:" + halfBroken[index].hitsMax);
					if (((halfBroken[index].hits / halfBroken[index].hitsMax) < repairPercentage) && halfBroken[index].structureType != 'constructedWall' && halfBroken[index].structureType != 'rampart')
				    	toRepair.push(halfBroken[index]);
            	}

            	Memory.standardRepairCount = toRepair.length;
            } else {
	        	toRepair.push(Game.getObjectById(creep.memory.currentRepair));
	        }

            
			if(toRepair.length)
			{
				var structure = toRepair[0];

				creep.moveTo(structure);
				var repairStatus = creep.repair(structure);
				
				if (repairStatus == OK && structure.hits != structure.hitsMax)  
				    creep.memory.currentRepair = structure.id;
				else 
				    creep.memory.currentRepair = "";

			}
			
	    }
	    else {
	    	
	    	if (creep.room.name == creep.memory.remote) {
		         //TODO once this is converted to classes this can be removed and use the actual function defined below
	            var halfBroken = creep.room.find(FIND_STRUCTURES);
	            var thereAreFixes = false;
	            
	    		for(var index in halfBroken)
	    		{
	    		    //console.log("Structure: " + halfBroken[index].name + " hits:" + halfBroken[index].hits + "   total:" + halfBroken[index].hitsMax);
	    			if((halfBroken[index].hits / halfBroken[index].hitsMax) < repairPercentage)
	    				thereAreFixes = true;
	            }
	            
	            if(thereAreFixes) {
	    	        //var sources = creep.room.find(FIND_SOURCES);
	            	if (creep.memory.source == undefined || creep.memory.source == "") {
                		source = creep.pos.findClosestByPath(FIND_SOURCES);
                		if (source != null)
                			creep.memory.source = source.id;
                	}
	    	        
	            	if (creep.memory.source != undefined && creep.memory.source != "")
	                    if(creep.harvest(Game.getObjectById(creep.memory.source)) == ERR_NOT_IN_RANGE) 
	                        creep.moveTo(Game.getObjectById(creep.memory.source));
	                
	            }
	    	} else {
	    		var exit = creep.room.findExitTo(creep.memory.remote);
                creep.moveTo(creep.pos.findClosestByRange(exit));
	    	}
	    }
	},
	
	workToDo: function(creep)
	{
	    var halfBroken = creep.room.find(FIND_STRUCTURES);
		console.log("halfbroken count: " + halfBroken.length);
		for(var index in halfBroken)
		{
		    //console.log("Structure: " + halfBroken[index].name + " hits:" + halfBroken[index].hits + "   total:" + halfBroken[index].hitsMax);
			if((halfBroken[index].hits / halfBroken[index].hitsMax) < repairPercentage)
				return true;
        }

        return false;
	}
};

module.exports = roleRepairer;
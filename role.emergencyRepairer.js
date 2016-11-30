var roleEmergencyRepairer = {

    //var testvar = "test";
    
    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvesting');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('Repairing');
	    }
	    
	    var repairPercentage = 0.5;

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
            } else {
	        	toRepair.push(Game.getObjectById(creep.memory.currentRepair));
	        }

            //console.log("to repair count: " + toRepair.length);
			if(toRepair.length)
			{
			    if (toRepair.length > 2)
				    var structure = toRepair[2];
				else if (toRepair.length > 1)
				    var structure = toRepair[1];
				else
				    var structure = toRepair[0];

				creep.moveTo(structure);
				var repairStatus = creep.repair(structure);
				
				//console.log(creep.name + ":   hits: " + structure.hits + "  hitsMax: " + structure.hitsMax)
				if (repairStatus == OK && structure.hits != structure.hitsMax)  
				    creep.memory.currentRepair = structure.id;
				else 
				    creep.memory.currentRepair = "";

			}
			
	    }
	    else {
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
    	        var sources = creep.pos.findClosestByPath(FIND_SOURCES);
                if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources);
                }
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

module.exports = roleEmergencyRepairer;
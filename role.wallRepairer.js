var roleWallRepairer = {

    //var testvar = "test";
    
    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvesting');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('Repairing Wall');
	    }

        //TODO once this is converted to classes this can be removed and use the actual function defined below
        var halfBroken = creep.room.find(FIND_STRUCTURES);
        var thereAreFixes = false;
        var thereAreRampartFixes = false;
        var thereIsNonWalls = false;
        var needsRepairValue = 0.00002;
        
		for(var index in halfBroken)
		{
		    //console.log("Structure: " + halfBroken[index].name + " hits:" + halfBroken[index].hits + "   total:" + halfBroken[index].hitsMax);
			if(((halfBroken[index].hits / halfBroken[index].hitsMax) < needsRepairValue) && halfBroken[index].structureType == 'constructedWall')
				thereAreFixes = true;
			
        }
        
        for(var index in halfBroken)
		{
		    //console.log("Structure: " + halfBroken[index].name + " hits:" + halfBroken[index].hits + "   total:" + halfBroken[index].hitsMax);
			if(((halfBroken[index].hits / halfBroken[index].hitsMax) < needsRepairValue) && halfBroken[index].structureType == 'rampart')
				thereAreRampartFixes = true;
			
        }
        
	    if(creep.memory.building && (thereAreFixes || thereAreRampartFixes)) {
	        // look for things that need to be repaired first
	        // we look for things that are at 50% of health.  no reason to drop what we are building for something that is at 99% which apparently happens
	        // when you just walk on a road
	        var halfBroken = creep.room.find(FIND_STRUCTURES);
			var toRepair = [ ];
			//console.log("halfbroken count: " + halfBroken.length);
			
			for(var index in halfBroken)
			{
			    //console.log("Structure: " + halfBroken[index].name + " hits:" + halfBroken[index].hits + "   total:" + halfBroken[index].hitsMax);
				if ((((halfBroken[index].hits / halfBroken[index].hitsMax) < needsRepairValue) && halfBroken[index].structureType == 'rampart'))
			        toRepair.push(halfBroken[index]);
            }
            
            if (!toRepair.length) {
			    for(var index in halfBroken)
    			{
    			    //console.log("Structure: " + halfBroken[index].name + " hits:" + halfBroken[index].hits + "   total:" + halfBroken[index].hitsMax);
    				if ((((halfBroken[index].hits / halfBroken[index].hitsMax) < needsRepairValue) && halfBroken[index].structureType == 'constructedWall'))
    			        toRepair.push(halfBroken[index]);
                }
            }

            //console.log("to repair count: " + toRepair.length);
			if(toRepair.length)
			{
				var structure = toRepair[0];
				//console.log("Reparing: " + structure.name + " type: " + structure.structureType);
				creep.moveTo(structure);
				creep.repair(structure);

			}
			
	    }
	    else {
	         //TODO once this is converted to classes this can be removed and use the actual function defined below
            var halfBroken = creep.room.find(FIND_STRUCTURES);
            var thereAreFixes = false;
            
    		for(var index in halfBroken)
    		{
    		    //console.log("Structure: " + halfBroken[index].name + " hits:" + halfBroken[index].hits + "   total:" + halfBroken[index].hitsMax);
    			if((halfBroken[index].hits / halfBroken[index].hitsMax) < 0.5)
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
			if((halfBroken[index].hits / halfBroken[index].hitsMax) < 0.5)
				return true;
        }

        return false;
	}
};

module.exports = roleWallRepairer;
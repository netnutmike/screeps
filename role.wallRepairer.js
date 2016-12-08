var alerts = require('alerts');

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
        var needsRepairBaseValue = 0.00002;
        var needsRepairIncreaseAmount = 0.00001;
        //Memory.wallRepairValue = needsRepairBaseValue;
        
        if (creep.room.memory.wallRepairValue > needsRepairBaseValue) {
        	var needsRepairValue = creep.room.memory.wallRepairValue;
        	//console.log("using memory " + needsRepairValue);
        } else {
        	var needsRepairValue = needsRepairBaseValue;
        }
        //var needsRepairValue = 0.00002;
        
		for(var index in halfBroken)
		{
		    //console.log("Structure: " + halfBroken[index].name + " hits:" + halfBroken[index].hits + "   total:" + halfBroken[index].hitsMax);
			if(((halfBroken[index].hits / halfBroken[index].hitsMax) < needsRepairValue) && halfBroken[index].structureType == 'constructedWall')
				thereAreFixes = true;
			
        }
        
//        for(var index in halfBroken)
//		{
//		    //console.log("Structure: " + halfBroken[index].name + " hits:" + halfBroken[index].hits + "   total:" + halfBroken[index].hitsMax);
//			if(((halfBroken[index].hits / halfBroken[index].hitsMax) < 0.001) && halfBroken[index].structureType == 'rampart')
//				thereAreRampartFixes = true;
//			
//        }
        
        var toRepair = [ ];
        
	    if(creep.memory.building) {
	        // look for things that need to be repaired first
	        // we look for things that are at 50% of health.  no reason to drop what we are building for something that is at 99% which apparently happens
	        // when you just walk on a road
	        var halfBroken = creep.room.find(FIND_STRUCTURES);
			
            

		    for(var index in halfBroken)
   				{
   			    //console.log("Structure: " + halfBroken[index].name + " hits:" + halfBroken[index].hits + "   total:" + halfBroken[index].hitsMax);
   				if ((((halfBroken[index].hits / halfBroken[index].hitsMax) < needsRepairValue) && halfBroken[index].structureType == 'constructedWall'))
   			        toRepair.push(halfBroken[index]);
               }


            //console.log("to repair wall count: " + toRepair.length);
			if(toRepair.length)
			{
				var structure = toRepair[0];
				//console.log("Reparing: " + structure.name + " type: " + structure.structureType);
				creep.moveTo(structure);
				creep.repair(structure);
				
				creep.room.memory.wallRepairWaitCounter = 0;

			} else {
				//nothing to repair, wait for 10 ticks to make sure, then increment the base fix level in memory by increase amount
				creep.room.memory.wallRepairWaitCounter = creep.room.memory.wallRepairWaitCounter + 1;
			//	console.log("+1");
				if (creep.room.memory.wallRepairWaitCounter >= 10) {
					creep.room.memory.wallRepairValue = creep.room.memory.wallRepairValue + needsRepairIncreaseAmount;
					alerts.newAlert(4,"(SL) Increasing the base wall repair value in room " + creep.room.name + " by " + needsRepairIncreaseAmount + " making it " + creep.room.memory.wallRepairValue);
					creep.room.memory.wallRepairWaitCounter = 0;
				}
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
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
	        creep.say('Repairing Rampart');
	    }

        //TODO once this is converted to classes this can be removed and use the actual function defined below
        var halfBroken = creep.room.find(FIND_STRUCTURES);
        var thereAreFixes = false;
        var thereAreRampartFixes = false;
        var thereIsNonWalls = false;
        var needsRepairBaseValue = 0.001;
        var needsRepairIncreaseAmount = 0.001;
        //Memory.rampartRepairValue = needsRepairBaseValue;
        
        if (Memory.rampartRepairValue > needsRepairBaseValue) {
        	var repairValue = Memory.rampartRepairValue;
        } else {
        	var repairValue = needsRepairBaseValue;
        }
        	
        if (creep.memory.currentRepair == "") {
        	for(var index in halfBroken)
			{
		    	//console.log("Structure: " + halfBroken[index].name + " hits:" + halfBroken[index].hits + "   total:" + halfBroken[index].hitsMax);
				if(((halfBroken[index].hits / halfBroken[index].hitsMax) < repairValue) && halfBroken[index].structureType == 'rampart')
					thereAreRampartFixes = true;
        	}
        }
        
        var toRepair = [ ];
        
	    if(creep.memory.building ) { //&& (thereAreFixes || thereAreRampartFixes) || creep.memory.currentRepair != "") {
	        // look for things that need to be repaired first
	        // we look for things that are at 50% of health.  no reason to drop what we are building for something that is at 99% which apparently happens
	        // when you just walk on a road
	        
	        if (creep.memory.currentRepair == "") {
	            
	        
    	        var halfBroken = creep.room.find(FIND_STRUCTURES);
    			
    			//console.log("halfbroken count: " + halfBroken.length);
    			
    			
    			for(var index in halfBroken)
    			{
    			    //console.log("Structure: " + halfBroken[index].name + " hits:" + halfBroken[index].hits + "   total:" + halfBroken[index].hitsMax);
    				if ((((halfBroken[index].hits / halfBroken[index].hitsMax) < repairValue) && halfBroken[index].structureType == 'rampart'))
    			        toRepair.push(halfBroken[index]);
                }
	        } else {
	        	toRepair.push(Game.getObjectById(creep.memory.currentRepair));
	        }


            //console.log("to repair count: " + toRepair.length);
			if(toRepair.length)// || creep.memory.currentRepair != "")
			{

			    var structure = toRepair[0];

				creep.moveTo(structure);
				var repairStatus = creep.repair(structure)

				if (repairStatus == OK)  
				    creep.memory.currentRepair = structure.id;
				else 
				    creep.memory.currentRepair = "";

				Memory.rampartRepairWaitCounter = 0;

			} else {
				//nothing to repair, wait for 10 ticks to make sure, then increment the base fix level in memory by increase amount
				Memory.rampartRepairWaitCounter = Memory.rampartRepairWaitCounter + 1;
				//console.log("+1");
				if (Memory.rampartRepairWaitCounter >= 10) {
					Memory.rampartRepairValue = Memory.rampartRepairValue + needsRepairIncreaseAmount;
					Game.notify("Increasing the base rampart repair value by " + needsRepairIncreaseAmount + " making it " + Memory.rampartRepairValue);
					console.log("*** Increasing the base rampart repair value by " + needsRepairIncreaseAmount + " making it " + Memory.rampartRepairValue);
					Memory.rampartRepairWaitCounter = 0;
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
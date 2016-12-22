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
        //creep.room.memory.wallRepairValue = needsRepairBaseValue;
        
        if (creep.room.memory.wallRepairValue == undefined)
        	creep.room.memory.wallRepairValue = needsRepairBaseValue;
        
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
            	var targets = roleWallRepairer.findTargetsByType(creep, creep.memory.esource);
	    		var sourceType = creep.memory.esource;
	    		
	    		if (targets.length == null || targets.length == 0) {
	    			//console.log("looking to source #2");
	    			var sourceType = creep.memory.esource2;
	    			var targets = roleWallRepairer.findTargetsByType(creep, creep.memory.esource2);
	    		}
        		source = creep.pos.findClosestByPath(targets);
        		if (source != null)
        			creep.memory.source = source.id;
        		
        		if (creep.memory.source != undefined && creep.memory.source != "") {
            		switch(sourceType) {
		    			case STORAGE:
		    			case LINK:
		    			case CONTAINER:
		    			case STOREDANDLINKS:
		    			case STORED:
		    			case LINKSTORAGE:
		    				//console.log("storage or link");
		    				var successcode = creep.withdraw(Game.getObjectById(creep.memory.source), RESOURCE_ENERGY);
		    				break;
		    				
		    			default:
		    				//console.log("default");
		    				var successcode = creep.harvest(Game.getObjectById(creep.memory.source));
		    				break;
		    		}
		    		
					//console.log("success code: " + successcode);
					if(successcode == ERR_NOT_IN_RANGE) {
		            	//console.log(creep.name + ": L4");
		                creep.moveTo(Game.getObjectById(creep.memory.source));
		            } else if (successcode == ERR_INVALID_TARGET) {
		            	//console.log(creep.name + ": L5");
		            	creep.memory.source = "";
		            }
            	}
                
            }
	    }
	    
	    if (creep.getActiveBodyparts(WORK)<1 || creep.getActiveBodyparts(MOVE)<1 || creep.getActiveBodyparts(CARRY)<1) {
        	creep.say('Goodbye|Cruel|World');
        	creep.memory.role="Suicide";
        }
	},
	
	findTargetsByType: function(creep, type)
	{
		switch (type) {
			case STORAGE:
				var source = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_STORAGE )
                    }
        		});
				break;
				
			case LINK:
				var source = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_LINK && structure.energy < structure.energyCapacity)
                    }
        		});
				break;
				
			case LINKSTORAGE:
				var source = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ((structure.structureType == STRUCTURE_LINK || structure.structureType == STRUCTURE_STORAGE)
                        		&& structure.store[RESOURCE_ENERGY] > 0 )
                    }
        		});
				break;
				
			case STORED:
				var source = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ((structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE)
                        		&& structure.store[RESOURCE_ENERGY] > 0 )
                    }
        		});
				break;
				
			case CONTAINER:
				var source = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER 
                        		&& structure.store[RESOURCE_ENERGY] > 0 )
                    }
        		});
				break;
				
			case STOREDANDLINKS:
				var source = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ((structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE || 
                        		structure.structureType == STRUCTURE_LINK) && structure.store[RESOURCE_ENERGY] > 0 )
                    }
        		});
				break;
				
			case ENERGY:
			default:
				source = creep.room.find(FIND_SOURCES);
				break;
		}
		
		return source;
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
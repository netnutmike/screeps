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
	        creep.say('ERepairing ' + Memory.emergencyRepairCount);
	    }
	    
	    if (Memory.emergencyRepairMode == 999)
	    	var repairPercentage = fixWhenIdlePercentage;
	    else
	    	var repairPercentage = (Memory.emergencyRepairMode / 100);
	    
	    
	    //console.log("Repair percentage: " + repairPercentage);

        //TODO once this is converted to classes this can be removed and use the actual function defined below
        //var halfBroken = creep.room.find(FIND_STRUCTURES);
        //var thereAreFixes = false;
        //var thereIsNonWalls = false;
        
		//for(var index in halfBroken)
		//{
		//    //console.log("Structure: " + halfBroken[index].name + " hits:" + halfBroken[index].hits + "   total:" + halfBroken[index].hitsMax);
		//	if(((halfBroken[index].hits / halfBroken[index].hitsMax) < repairPercentage) && halfBroken[index].structureType != 'constructedWall' && halfBroken[index].structureType != 'rampart')
		//		thereAreFixes = true;
        //}
        
        var toRepair = [ ];
        
	    if(creep.memory.building) {
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
            	
            	Memory.emergencyRepairCount = toRepair.length;
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

				Memory.emergencyRepairWaitCounter = 0;
			} else {
				//nothing to repair, wait for 10 ticks to make sure, then increment the base fix level in memory by increase amount
				Memory.emergencyRepairWaitCounter = Memory.emergencyRepairWaitCounter + 1;
				//console.log("+1");
				if (Memory.emergencyRepairWaitCounter >= 4) {
					Memory.emergencyRepairMode = Memory.emergencyRepairMode + 10;
					Game.notify("Increasing the Emergency repair value by 10 making it " + Memory.emergencyRepairMode);
					console.log("*** Increasing the Emergency repair value by 10 making it " + Memory.emergencyRepairMode);
					Memory.emergencyRepairWaitCounter = 0;
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
	
	amINeeded: function(roomname)
	{
		// This fucntion will determine if the emergency Repairer is needed.  The following parameters used to determine the threashold
		// minimumEmergencyRepairPercentage
		// maximumInRepair
		// percentageForMaximum
		
		var minimumEmergencyRepairPercentage = .10;
		var maximumInRepair = 50;
		var percentageForMaximum = .50;
		var repairCount = 0;
		
	    var halfBroken = Game.rooms[roomname].find(FIND_STRUCTURES);
		//console.log("halfbroken count: " + halfBroken.length);
	    
	    
		for(var index in halfBroken)
		{
		    //console.log("Structure: " + halfBroken[index].name + " hits:" + halfBroken[index].hits + "   total:" + halfBroken[index].hitsMax + "  " + ((halfBroken[index].hits/halfBroken[index].hitsMax) * 100) + "%");
			if((halfBroken[index].hits / halfBroken[index].hitsMax) < minimumEmergencyRepairPercentage && halfBroken[index].structureType != 'constructedWall' && halfBroken[index].structureType != 'rampart') {
				//console.log("returning because of low percentage");
				return true;
			}
			
			if((halfBroken[index].hits / halfBroken[index].hitsMax) <= percentageForMaximum && halfBroken[index].structureType != 'constructedWall' && halfBroken[index].structureType != 'rampart')
				++repairCount;
        }

		//console.log("RepairCount at or below " + percentageForMaximum + "% is " + repairCount);
		if (repairCount >= maximumInRepair)
			return true;
		else
			return false;
	},
	
	amIStillNeeded: function(roomname)
	{
		// This fucntion will determine if the emergency Repairer is needed.  The following parameters used to determine the threashold
		// minimumEmergencyRepairPercentage
		// maximumInRepair
		// percentageForMaximum
		
		var minimumEmergencyRepairPercentage = .10;
		var maximumInRepairToRelease = 10;
		var percentageForMaximum = .50;
		var repairCount = 0;
		
		if (Memory.emergencyRepairMode <= (percentageForMaximum * 100))
			return true;
		
	    var halfBroken = Game.rooms[roomname].find(FIND_STRUCTURES);
		console.log("halfbroken count: " + halfBroken.length);
	    
	    
		for(var index in halfBroken)	
			if((halfBroken[index].hits / halfBroken[index].hitsMax) <= percentageForMaximum && halfBroken[index].structureType != 'constructedWall' && halfBroken[index].structureType != 'rampart')
				++repairCount;
        

		console.log("RepairCount at or below " + percentageForMaximum + "% is " + repairCount);
		if (repairCount >= maximumInRepairToRelease)
			return true;
		else
			return false;
	}
};

module.exports = roleEmergencyRepairer;
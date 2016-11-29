var roleBuilder = {

    //var testvar = "test";
    
    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvesting');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('building');
	    }

	    if(creep.memory.building) {
	        // look for things that need to be repaired first
	        // we look for things that are at 50% of health.  no reason to drop what we are building for something that is at 99% which apparently happens
	        // when you just walk on a road
//	        var halfBroken = creep.room.find(FIND_STRUCTURES);
//			var toRepair = [ ];
//			console.log("halfbroken count: " + halfBroken.length);
//			for(var index in halfBroken)
//			{
//			    //console.log("Structure: " + halfBroken[index].name + " hits:" + halfBroken[index].hits + "   total:" + halfBroken[index].hitsMax);
//				if((halfBroken[index].hits / halfBroken[index].hitsMax) < 0.5)
//					toRepair.push(halfBroken[index]);
//            }

//            console.log("to repair count: " + toRepair.length);
//			if(toRepair.length)
//			{
//				var structure = toRepair[0];
//				console.log("Reparing: " + structure.name + " type: " + structure.structureType +  " owner: " + structure.owner);
//				creep.moveTo(structure);
//				creep.repair(structure);

//				return;
//			}
			
			//if we get here nothing needed to be repaired right now.
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
	    }
	    else {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
    	        //var sources = creep.room.find(FIND_SOURCES);
    	        var sources = creep.pos.findClosestByPath(FIND_SOURCES);
                if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources);
                }
            }
	    }
	}
};

module.exports = roleBuilder;
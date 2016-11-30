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

module.exports = roleBuilder;
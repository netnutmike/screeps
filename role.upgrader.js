var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('harvesting');
	    }
	    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.upgrading = true;
	        creep.memory.source = "";
	        creep.say('upgrading');
	    }

	    if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
        else {
        	if (creep.memory.source == undefined || creep.memory.source == "") {
        		source = creep.pos.findClosestByPath(FIND_SOURCES);
        		if (source != null)
        			creep.memory.source = source.id;
        	}
	        
        	if (creep.memory.source != undefined && creep.memory.source != "")
                if(creep.harvest(Game.getObjectById(creep.memory.source)) == ERR_NOT_IN_RANGE) 
                    creep.moveTo(Game.getObjectById(creep.memory.source));
            
        }
	}
};

module.exports = roleUpgrader;
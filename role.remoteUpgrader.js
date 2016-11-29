var roleRemoteUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            //Game.notify('Creep ' + creep.name + ' who is a ' + creep.memory.role + ' started going to collect energy at ' + Game.time);
            creep.say('Remote harvesting');
	    }
	    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.upgrading = true;
	       // Game.notify('Creep ' + creep.name + ' who is a ' + creep.memory.role + ' started going to upgrade controller at ' + Game.time);
	        creep.say('upgrading');
	    }

	    if(creep.memory.upgrading) {
	         if (creep.pos.roomName == creep.memory.home) {
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
	         } else {
	            var exit = creep.room.findExitTo(creep.memory.home);
                creep.moveTo(creep.pos.findClosestByRange(exit));
	         }
        }
        else {
            if (creep.pos.roomName == creep.memory.remote) {
                var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0]);
                }
            } else {
                var exit = creep.room.findExitTo(creep.memory.remote);
                creep.moveTo(creep.pos.findClosestByRange(exit));
            }
        }
	}
};

module.exports = roleRemoteUpgrader;
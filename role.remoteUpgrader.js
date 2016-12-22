var alerts = require('alerts');

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
	        creep.memory.source = "";
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
            	if (creep.memory.source == undefined || creep.memory.source == "") {
            		source = creep.pos.findClosestByPath(FIND_SOURCES);
            		if (source != null)
            			creep.memory.source = source.id;
            	}
            	if (creep.memory.source != undefined && creep.memory.source != "")
	                if(creep.harvest(Game.getObjectById(creep.memory.source)) == ERR_NOT_IN_RANGE) {
	                    creep.moveTo(Game.getObjectById(creep.memory.source));
	                }
            } else {
                var exit = creep.room.findExitTo(creep.memory.remote);
                creep.moveTo(creep.pos.findClosestByRange(exit));
            }
        }
	    
	    if (creep.getActiveBodyparts(WORK)<1 || creep.getActiveBodyparts(MOVE)<1 || creep.getActiveBodyparts(CARRY)<1) {
	    	alerts.newAlert(2,"Creep " + creep.name + " in room " + creep.room.name + " who was a " + creep.memory.role + " committed suicide");
        	creep.say('Goodbye|Cruel|World');
        	creep.memory.role="Suicide";
        }
	}
};

module.exports = roleRemoteUpgrader;
var alerts = require('alerts');

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
	        creep.memory.source = "";
	        creep.say('building');
	    }

	    if(creep.memory.building) {
			
	    	// Check to make sure we are in the correct room first
	    	if (creep.room.name == creep.memory.remote) {
	    		var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
	            if(targets.length) {
	                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
	                    creep.moveTo(targets[0]);
	                }
	            }
            } else {
                var exit = creep.room.findExitTo(creep.memory.remote);
                creep.moveTo(creep.pos.findClosestByRange(exit));
            }

	        
	    }
	    else {
	    	
	    	if (creep.room.name == creep.memory.remote) {
		        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
	            if(targets.length) {
	    	        //var sources = creep.room.find(FIND_SOURCES);
	            	if (creep.memory.source == undefined || creep.memory.source == "") {
                		source = creep.pos.findClosestByPath(FIND_SOURCES);
                		if (source != null)
                			creep.memory.source = source.id;
                	}
	            	if (creep.memory.source != undefined && creep.memory.source != "")
		                if(creep.harvest(Game.getObjectById(creep.memory.source)) == ERR_NOT_IN_RANGE) {
		                    creep.moveTo(Game.getObjectById(creep.memory.source));
		                }
	            }
	    	} else {
	    		var exit = creep.room.findExitTo(creep.memory.remote);
                creep.moveTo(creep.pos.findClosestByRange(exit));
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
	},
	
	workToDoInRoom: function(roomName)
	{
		alerts.newAlert(6,"room for construction: " + roomName);
		//return true;
		if (Game.rooms[roomName] == undefined )
	    	return false;
		
	    var targets = Game.rooms[roomName].find(FIND_CONSTRUCTION_SITES);
	    
	    
	    alerts.newAlert(6,"workToDoInRoom:  roomname: " + roomName + "  construction sites: " + targets.length);
        if(targets.length)
			return true;
        else
	        return false;
	}
};

module.exports = roleBuilder;
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
	                dest = creep.pos.findClosestByPath(targets);
	                if(creep.build(dest) == ERR_NOT_IN_RANGE) {
	                    creep.moveTo(dest);
	                }
	            }
            } else {
                var exit = creep.room.findExitTo(creep.memory.remote);
                creep.moveTo(creep.pos.findClosestByRange(exit));
            }

	        
	    }
	    else {
	    	
	    	if (creep.room.name == creep.memory.remote) {
		        //var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
	    		
	    		var targets = roleBuilder.findTargetsByType(creep, creep.memory.esource);
	    		var sourceType = creep.memory.esource;
	    		
	    		if (targets.length == null || targets.length == 0) {
	    			//console.log("looking to source #2");
	    			var sourceType = creep.memory.esource2;
	    			var targets = roleBuilder.findTargetsByType(creep, creep.memory.esource2);
	    		}
	    		
	            if (targets.length) {
	    	        //var sources = creep.room.find(FIND_SOURCES);
	            	if (creep.memory.source == undefined || creep.memory.source == "") {
                		source = creep.pos.findClosestByPath(targets);
                		if (source != null)
                			creep.memory.source = source.id;
                	}
	            	
	            	//console.log(creep.name + " closest energy is " + Game.getObjectById(creep.memory.source).store[RESOURCE_ENERGY]);
	            	
	            	if (creep.memory.source != undefined && creep.memory.source != "") {
	            		//console.log(creep.name + " - " + sourceType);
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
	            		
	        			//console.log(creep.name + " success code: " + successcode);
	        			if(successcode == ERR_NOT_IN_RANGE) {
	                    	//console.log(creep.name + ": L4");
	                        creep.moveTo(Game.getObjectById(creep.memory.source));
	                    } else if (successcode == ERR_INVALID_TARGET || successcode == -6) {
	                    	//console.log(creep.name + ": L5");
	                    	creep.memory.source = "";
	                    }
	            	}
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
                        		&& structure.store[RESOURCE_ENERGY] > 0)
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
				//console.log(source.length);
				//console.log(source[0].store[RESOURCE_ENERGY]);
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
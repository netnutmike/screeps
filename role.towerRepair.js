var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	   
        var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_TOWER) &&
                        structure.energy < structure.energyCapacity;
                }
        });
        
        if (targets.length == 0) {
        	var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) &&
                        structure.energy < structure.energyCapacity;
                }
        	});
        }
        
        if(targets.length > 0) {
            //console.log('Creep ' + creep.name + ' delivering:' + creep.memory.delivering + ' on board:' + creep.carry.energy);
            
            if(creep.memory.delivering != true) {
            	if (creep.memory.source == undefined || creep.memory.source == "") {
            		var targets = roleHarvester.findTargetsByType(creep, creep.memory.esource);
    	    		var sourceType = creep.memory.esource;
    	    		
    	    		if (targets.length == null || targets.length == 0) {
    	    			//console.log("looking to source #2");
    	    			var sourceType = creep.memory.esource2;
    	    			var targets = roleHarvester.findTargetsByType(creep, creep.memory.esource2);
    	    		}
            		source = creep.pos.findClosestByPath(targets);
            		if (source != null)
            			creep.memory.source = source.id;
            	}
    	        
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
            
                
                if(creep.carry.energy == creep.carryCapacity) {
                    creep.memory.delivering = true;
                    creep.memory.source = "";
                }
            }
            else {
            	
            	
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
                
                if(creep.carry.energy == 0) {
                    creep.memory.delivering = false;
                }
            }
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
	}
};

module.exports = roleHarvester;
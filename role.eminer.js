var roleEMiner = {

    /** @param {Creep} creep **/
    run: function(creep) {
	   
        var targets = roleEMiner.findTargetsByType(creep, creep.memory.dest);
		var destType = creep.memory.dest;
		
		if (targets.length == null || targets.length == 0) {
			//console.log("looking to source #2");
			var destType = creep.memory.dest2;
			//console.log(destType);
			var targets = roleEMiner.findTargetsByType(creep, creep.memory.dest2);
		}
       
        
        if(targets.length > 0) {
            //console.log('Creep ' + creep.name + ' delivering:' + creep.memory.delivering + ' on board:' + creep.carry.energy);
            
            if(creep.memory.delivering != true) {
            	if (creep.memory.source == undefined || creep.memory.source == "") {
            		source = creep.pos.findClosestByPath(FIND_SOURCES);
            		if (source != null)
            			creep.memory.source = source.id;
            	}
    	        
            	if (creep.memory.source != undefined && creep.memory.source != "")
                    if(creep.harvest(Game.getObjectById(creep.memory.source)) == ERR_NOT_IN_RANGE) 
                        creep.moveTo(Game.getObjectById(creep.memory.source));
                
                if(creep.carry.energy == creep.carryCapacity) {
                    creep.memory.delivering = true;
                    creep.memory.source = "";
                    creep.memory.destination = "";
                }
            }
            else {
            	
            	if (creep.memory.destination == undefined || creep.memory.destination == "") {
            		target = creep.pos.findClosestByPath(targets);
            		if (target != null)
            			creep.memory.destination = target.id;
            	}
            	
            	switch(destType) {
            		case CONTAINER:
            			//console.log("in container");
            			if (Game.getObjectById(creep.memory.destination) != undefined && Game.getObjectById(creep.memory.destination) != null &&(Game.getObjectById(creep.memory.destination).hits / Game.getObjectById(creep.memory.destination).hitsMax) < containerRepairPercentage) {
            				var successcode = creep.repair(Game.getObjectById(creep.memory.destination));
            				creep.say("Repairing");
            				break;
            			}
            			
            		case STORAGE:
	    			case LINK:
	    			case STOREDANDLINKS:
	    			case STORED:
	    			case LINKSTORAGE:
	    				
	    			default:
	    				//console.log("default");
	    				var successcode = creep.transfer(Game.getObjectById(creep.memory.destination), RESOURCE_ENERGY);
	    				break;
            	}
                
            	//console.log(successcode);
            	if(successcode == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.getObjectById(creep.memory.destination));
                } else if(successcode == ERR_INVALID_TARGET || successcode == ERR_FULL) {
                	creep.memory.destination = "";
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
                        return (structure.structureType == STRUCTURE_LINK )
                    }
        		});
				break;
				
			case CONTAINER:
				var source = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER && (_.sum(structure.store) < structure.storeCapacity))
                    }
        		});
				//console.log("looking for containers " + source.length + " " + _.sum(source[0].store) + "/" + source[0].storeCapacity);
				break;
				
			case LINKSTORAGE:
				var source = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ((structure.structureType == STRUCTURE_LINK || structure.structureType == STRUCTURE_STORAGE)
                        		&& (_.sum(structure.store) < structure.storeCapacity) )
                    }
        		});
				break;
				
			case STORED:
				var source = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ((structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE)
                        		&& (_.sum(structure.store) < structure.storeCapacity) )
                    }
        		});
				break;
				
			case STOREDANDLINKS:
				var source = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ((structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE || 
                        		structure.structureType == STRUCTURE_LINK) && (_.sum(structure.store) < structure.storeCapacity) )
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

module.exports = roleEMiner;
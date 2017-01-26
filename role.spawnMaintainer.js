var roleSpawnMaintainer = {

    /** @param {Creep} creep **/
    run: function(creep) {
	   
        var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN ) &&
                        structure.energy < structure.energyCapacity;
                }
        });
        
        if(targets.length > 0) {
            //console.log('Creep ' + creep.name + ' delivering:' + creep.memory.delivering + ' on board:' + creep.carry.energy);
            
            if(creep.memory.delivering != true) {
            	if (creep.memory.source == undefined || creep.memory.source == "") {
            		//console.log("1");
            		var source = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_STORAGE )
                        }
            		});
            		source = creep.pos.findClosestByRange(source);
            		if (source != null)
            			creep.memory.source = source.id;
            	}
    	        
            	//console.log("2");
            	if (creep.memory.source != undefined && creep.memory.source != "") {
            		var statuscode = creep.withdraw(Game.getObjectById(creep.memory.source), RESOURCE_ENERGY);
            		//console.log(statuscode);
                    if(statuscode == ERR_NOT_IN_RANGE) 
                        creep.moveTo(Game.getObjectById(creep.memory.source));
                    
            	}
                
                if(creep.carry.energy == creep.carryCapacity) {
                    creep.memory.delivering = true;
                    creep.memory.source = "";
                }
            }
            else {
            	if (creep.memory.destid == undefined || creep.memory.destid == "") {
            	    //console.log(targets.length);
            		dest = creep.pos.findClosestByRange(targets);
            		if (dest == null)
            		    dest = creep.pos.findClosestByRange(targets);
            		//console.log(dest);
            		creep.memory.destid = dest.id; 
            	}
            	
                if(creep.transfer(Game.getObjectById(creep.memory.destid), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.getObjectById(creep.memory.destid));
                }
                
                if (Game.getObjectById(creep.memory.destid).energy == Game.getObjectById(creep.memory.destid).energyCapacity)
                	creep.memory.destid = "";
                
                if(creep.carry.energy == 0) {
                    creep.memory.delivering = false;
                    creep.memory.destid = "";
                }
            }
        }
	}
};

module.exports = roleSpawnMaintainer;
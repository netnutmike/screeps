var roleTransferer = {

    /** @param {Creep} creep **/
    run: function(creep) {
	   
        var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_STORAGE ) 
                }
        });
        
        if(targets.length > 0) {
            //console.log('Creep ' + creep.name + ' delivering:' + creep.memory.delivering + ' on board:' + creep.carry.energy);
            
            if(creep.memory.delivering != true) {
            	
            	if (creep.memory.source == undefined || creep.memory.source == "") {
            		var targets = creep.room.find(FIND_STRUCTURES, {
    	                filter: (structure) => {
    	                    return (structure.structureType == STRUCTURE_LINK) 
    	                }
    	        	});
            		
            		//console.log("targets: " + targets.length);
            		source = creep.pos.findClosestByPath(targets);

            		if (source != null)
            			creep.memory.source = source.id;
            	}
    	        
            	if (creep.memory.source != undefined && creep.memory.source != "") {
            		statuscode = creep.withdraw(Game.getObjectById(creep.memory.source),RESOURCE_ENERGY);
            		//console.log(statuscode);
                    if(statuscode == ERR_NOT_IN_RANGE) 
                        creep.moveTo(Game.getObjectById(creep.memory.source));
                    if(statuscode == ERR_INVALID_TARGET) 
                    	creep.memory.source = "";
            	}
                
                if(creep.carry.energy == creep.carryCapacity || (Game.getObjectById(creep.memory.source).energy == 0 && creep.carry.energy > 0)) {
                    creep.memory.delivering = true;
                    creep.memory.source = "";
                }
            }
            else {
            	statuscode = creep.transfer(targets[0], RESOURCE_ENERGY);
            	//console.log("status code " + statuscode);
                if(statuscode == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
                
                if(creep.carry.energy == 0) {
                    creep.memory.delivering = false;
                }
            }
        }
	}
};

module.exports = roleTransferer;
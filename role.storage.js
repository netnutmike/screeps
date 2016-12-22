var roleStorage = {

    /** @param {Creep} creep **/
    run: function(creep) {
	   
        var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_STORAGE ) //&&
                        //structure.energy < structure.energyCapacity;
                }
        });
        //console.log(targets.length);
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
	}
};

module.exports = roleStorage;
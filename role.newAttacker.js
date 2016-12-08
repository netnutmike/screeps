var rolenewAttacker = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
	   
        var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) &&
                        structure.energy < structure.energyCapacity;
                }
        });
        
        //if(targets.length > 0) {
            //console.log('Creep ' + creep.name + ' delivering:' + creep.memory.delivering + ' on board:' + creep.carry.energy);
            
            if(creep.memory.delivering != true) {
                //console.log("I am in room: " + creep.pos.roomName + " but looking for " + creep.memory.remote);
                if (creep.pos.roomName == creep.memory.remote) {
                    //console.log("I think I am in the right room");
                    var sources = creep.room.find(FIND_SOURCES);
                    if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[1]);
                    }
                    
                    if(creep.carry.energy == creep.carryCapacity) {
                        creep.memory.delivering = true;
                  //      Game.notify('Creep ' + creep.name + ' who is a ' + creep.memory.role + ' started heading to deliver energy at ' + Game.time);
                    }
                } else {
                    var exit = creep.room.findExitTo(creep.memory.remote);
                    creep.moveTo(creep.pos.findClosestByRange(exit));
                    //console.log("Moving to exit");
                }
            }
            else {
                
                if (creep.room.name == creep.memory.home) {
                    if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0]);
                    }
                    
                    if(creep.carry.energy == 0) {
                        creep.memory.delivering = false;
                    //    Game.notify('Creep ' + creep.name + ' who is a ' + creep.memory.role + ' started going to collect energy at ' + Game.time);
                    }
                } else {
                    var exit = creep.room.findExitTo(creep.memory.home);
                    creep.moveTo(creep.pos.findClosestByRange(exit));
                }
            }
        //}
	}
};

module.exports = rolenewAttacker;
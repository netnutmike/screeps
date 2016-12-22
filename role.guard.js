var roleGuard = {

    /** @param {Creep} creep **/
    run: function(creep) {
	   
        var targets = creep.room.find(FIND_HOSTILE_CREEPS);
        
        if(targets.length > 0) {
            //console.log('Creep ' + creep.name + ' delivering:' + creep.memory.delivering + ' on board:' + creep.carry.energy);
            
           creep.moveTo(targets[0]);
           creep.attack(targets[0]);
           creep.rangedAttack(targets[0]);
        }
	}
};

module.exports = roleGuard;
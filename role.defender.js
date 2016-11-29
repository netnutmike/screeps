var roleDefender = {

    /** @param {Creep} creep **/
    run: function defendRoom(roomName) {
    
        var hostiles = Game.rooms[roomName].find(FIND_HOSTILE_CREEPS);
            
        if(hostiles.length > 0) {
            
            var username = hostiles[0].owner.username;
            console.log("see hostiles: " + username);
            Game.notify(`User ${username} spotted in room ${roomName}`);
            var towers = Game.rooms[roomName].find(
                FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
            //console.log("towers: " + towers.length);
            towers.forEach(tower => tower.attack(hostiles[0]));
        } else {
            var halfBroken = Game.rooms[roomName].find(FIND_STRUCTURES);
			var toRepair = [ ];
			for(var index in halfBroken)
				if((((halfBroken[index].hits / halfBroken[index].hitsMax) < 0.5) && halfBroken[index].structureType != 'constructedWall' && halfBroken[index].structureType != 'road' && halfBroken[index].structureType != 'rampart') ||
				(((halfBroken[index].hits / halfBroken[index].hitsMax) < 0.00001) && halfBroken[index].structureType == 'rampart') )
					toRepair.push(halfBroken[index]);
					
			var towers = Game.rooms[roomName].find(
                FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});

			if(toRepair.length)
			{
				var structure = toRepair[0];
				console.log(structure.structureType);
				towers.forEach(tower => tower.repair(structure));
			}
        }
    },
    
    enemiesInRoom: function(roomName) {
        var hostiles = Game.rooms[roomName].find(FIND_HOSTILE_CREEPS);
        
        if(hostiles.length > 0) {
            return true;
        } else {
            return false;
        }
    }
}

module.exports = roleDefender;
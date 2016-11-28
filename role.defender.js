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
            console.log("towers: " + towers.length);
            towers.forEach(tower => tower.attack(hostiles[0]));
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
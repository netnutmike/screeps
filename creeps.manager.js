var roleDefender = require('role.defender');
var roomsManager = require('roomsManager');
var roleBuilder = require('role.builder');
var alerts = require('alerts');

var creepsManager = {
    
    run: function(roomName)
    {
        
        
        //clear old entries
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
            	alerts.newAlert(3,"Clearing non-existing creep memory:" + name + " who was a " + Memory.creeps[name].role) + " based in room " + Memory.creeps[name].home;
                delete Memory.creeps[name];
                
            }
        }
        
        roleDefender.run(roomName);
        
        //console.log(roomName);
        // lookup how many of each type of screep we have
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.memory.home == roomName);
        var remoteHarvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteHarvester' && creep.memory.home == roomName);
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.memory.home == roomName);
        var newUpgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'newUpgrader' && creep.memory.home == roomName);
        var remoteUpgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteUpgrader' && creep.memory.home == roomName);
        var ldupgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'ldupgrader' && creep.memory.home == roomName);
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.memory.home == roomName);
        var builders2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder2' && creep.memory.home == roomName);
        var builders3 = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder3' && creep.memory.home == roomName);
        var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer' && creep.memory.home == roomName);
        var repairers2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer2' && creep.memory.home == roomName);
        var repairers3 = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer3' && creep.memory.home == roomName);
        var emergencyRepairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'emergencyRepairer' && creep.memory.home == roomName);
        var wallRepairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'wallRepairer' && creep.memory.home == roomName);
        var rampartRepairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'rampartRepairer' && creep.memory.home == roomName);
        var guards = _.filter(Game.creeps, (creep) => creep.memory.role == 'guard' && creep.memory.home == roomName);
        var attackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer' && creep.memory.home == roomName);
        var claimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer' && creep.memory.home == roomName);
        //var remoteHarvesters = Game.rooms[roomName].find(FIND_CREEPS, {filter: function(object) {return object.memory.role == 'remoteHarvester'}});
        //var upgraders = Game.rooms[roomName].find(FIND_CREEPS, {filter: function(object) {return object.memory.role == 'upgrader'}});
        //var newUpgraders = Game.rooms[roomName].find(FIND_CREEPS, {filter: function(object) {return object.memory.role == 'newUpgrader'}});
        //var remoteUpgraders = Game.rooms[roomName].find(FIND_CREEPS, {filter: function(object) {return object.memory.role == 'remoteUpgrader'}});
        //var ldupgraders = Game.rooms[roomName].find(FIND_CREEPS, {filter: function(object) {return object.memory.role == 'ldupgrader'}});
        //var builders = Game.rooms[roomName].find(FIND_CREEPS, {filter: function(object) {return object.memory.role == 'builder'}});
        //var repairers = Game.rooms[roomName].find(FIND_CREEPS, {filter: function(object) {return object.memory.role == 'repairer'}});
        //var emergencyRepairers = Game.rooms[roomName].find(FIND_CREEPS, {filter: function(object) {return object.memory.role == 'emergencyRepairer'}});
        //var wallRepairers = Game.rooms[roomName].find(FIND_CREEPS, {filter: function(object) {return object.memory.role == 'wallRepairer'}});
        //var rampartRepairers = Game.rooms[roomName].find(FIND_CREEPS, {filter: function(object) {return object.memory.role == 'rampartRepairer'}});
        //var guards = Game.rooms[roomName].find(FIND_CREEPS, {filter: function(object) {return object.memory.role == 'guard'}});
        //var attackers = Game.rooms[roomName].find(FIND_CREEPS, {filter: function(object) {return object.memory.role == 'attacker'}});
        //var claimers = Game.rooms[roomName].find(FIND_CREEPS, {filter: function(object) {return object.memory.role == 'claimer'}});
        var ramparts = Game.rooms[roomName].find(FIND_STRUCTURES, {filter: function(object) {return object.structureType == 'rampart'}});
        var walls = Game.rooms[roomName].find(FIND_STRUCTURES, {filter: function(object) {return object.structureType == 'constructedWall'}});
        //console.log("ramparts: " + ramparts.length + "  room: " + roomName);
        
        var spawns = Game.rooms[roomName].find(FIND_MY_SPAWNS);
        var spawn = spawns[0].name;

        // if then else tree to create screeps in priority order.  harvesters always take priority
        //console.log("remote harvesters in room " + roomName + ": " + remoteHarvesters.length);
        //if (remoteHarvesters.length > 0) {
        //	console.log(remoteHarvesters[0].name);
        //}
        
        //harvester
        //console.log(roomName + "  " + harvesters.length + "  " + upgraders.length + "-" + roomsManager.getBuildCount(roomName, 'upgrader') + "  " + roomsManager.getBuildString(roomName, 'upgrader'));
         
        if (harvesters.length < roomsManager.getBuildCount(roomName, 'harvester')) {
            
        	var newName = Game.spawns[spawn].createCreep(roomsManager.getBuildString(roomName, 'harvester'), undefined, 
            		roomsManager.getMemorySettings(roomName, 'harvester'));
        	
        	//var newName = Game.spawns[spawn].createCreep([WORK,CARRY,MOVE], undefined, {role: 'harvester'}); 

            
            if (newName != -6 && newName != -4) { console.log('Spawning new harvester in room ' + roomName + ': ' + newName); }
 
        
        
        //remoteHarvester
        } else if (remoteHarvesters.length < roomsManager.getBuildCount(roomName, 'remoteHarvester')) {
            var newName = Game.spawns[spawn].createCreep(roomsManager.getBuildString(roomName, 'remoteHarvester'), undefined, 
            		roomsManager.getMemorySettings(roomName, 'remoteHarvester'));
            
            if (newName != -6 && newName != -4) { console.log('Spawning new remote harvester in room ' + roomName + ': ' + newName); }
 
        
        //guard
        } else if (roleDefender.enemiesInRoom(roomName) && roomsManager.getBuildCount(roomName, 'guard') > 0) {
            if(guards.length < roomsManager.getBuildCount(roomName, 'guard')) {
                var newName = Game.spawns[spawn].createCreep(roomsManager.getBuildString(roomName, 'guard'), undefined, 
                		roomsManager.getMemorySettings(roomName, 'guard'));
                if (newName != -6 && newName != -4) { console.log('Spawning new guard in room ' + roomName + ': ' + newName); }
            }
 
        
        //attackers
        } else if(attackers.length < roomsManager.getBuildCount(roomName, 'attackers')) {
                var newName = Game.spawns[spawn].createCreep(roomsManager.getBuildString(roomName, 'attacker'), undefined, 
                		roomsManager.getMemorySettings(roomName, 'attackers'));
                if (newName != -6 && newName != -4) { console.log('Spawning new attacker in room ' + roomName + ': ' + newName); }
            
                
        //claimer
        } else if(claimers.length < roomsManager.getBuildCount(roomName, 'claimer')) {
            var newName = Game.spawns[spawn].createCreep(roomsManager.getBuildString(roomName, 'claimer'), undefined, 
            		roomsManager.getMemorySettings(roomName, 'claimer'));
            if (newName != -6 && newName != -4) { console.log('Spawning new claimer in room ' + roomName + ': ' + newName); }

            
            
        //repairer
        } else if (repairers.length < roomsManager.getBuildCount(roomName, 'repairer')) {
            

                var newName = Game.spawns[spawn].createCreep(roomsManager.getBuildString(roomName, 'repairer'), undefined, 
                		roomsManager.getMemorySettings(roomName, 'repairer'));
                if (newName != -6 && newName != -4) { console.log('Spawning new repairer in room ' + roomName + ': ' + newName); }

                
        //repairer2        
        } else if (repairers2.length < roomsManager.getBuildCount(roomName, 'repairer2')) {
            

            var newName = Game.spawns[spawn].createCreep(roomsManager.getBuildString(roomName, 'repairer2'), undefined, 
            		roomsManager.getMemorySettings(roomName, 'repairer2'));
            if (newName != -6 && newName != -4) { console.log('Spawning new repairer2 in room ' + roomName + ': ' + newName); }

            
        //repairer3
        } else if (repairers3.length < roomsManager.getBuildCount(roomName, 'repairer3')) {
            

            var newName = Game.spawns[spawn].createCreep(roomsManager.getBuildString(roomName, 'repairer3'), undefined, 
            		roomsManager.getMemorySettings(roomName, 'repairer3'));
            if (newName != -6 && newName != -4) { console.log('Spawning new repairer3 in room ' + roomName + ': ' + newName); }

            
        //emergencyRepairer        
        } else if (emergencyRepairers.length < roomsManager.getBuildCount(roomName, 'emergencyRepairer')  && Game.rooms[roomName].memory.emergencyRepairMode != 999) {
            
                var newName = Game.spawns[spawn].createCreep(roomsManager.getBuildString(roomName, 'emergencyRepairer'), undefined, 
                		roomsManager.getMemorySettings(roomName, 'emergencyRepairer'));
                if (newName != -6 && newName != -4) { console.log('Spawning new emergency repairer in room ' + roomName + ': ' + newName); }

                
                
        //rampartRepairer        
        } else if (rampartRepairers.length < roomsManager.getBuildCount(roomName, 'rampartRepairer') && ramparts.length > 0) {

                var newName = Game.spawns[spawn].createCreep(roomsManager.getBuildString(roomName, 'rampartRepairer'), undefined,  
                		roomsManager.getMemorySettings(roomName, 'rampartRepairer'));
                if (newName != -6 && newName != -4) { console.log('Spawning new rampart repairer in room ' + roomName + ': ' + newName) };

                    
        //upgrader
        } else if (upgraders.length < roomsManager.getBuildCount(roomName, 'upgrader')) {
            var newName = Game.spawns[spawn].createCreep(roomsManager.getBuildString(roomName, 'upgrader'), undefined, 
            		roomsManager.getMemorySettings(roomName, 'upgrader'));
            if (newName != -6 && newName != -4) { console.log('Spawning new upgrader in room ' + roomName + ': ' + newName); }

        
        //newUpgrader
    //    } else if (newUpgraders.length < newUpgradersToBuild) {
    //        var newName = Game.spawns[spawn].createCreep(roomsManager.getBuildString(roomName, 'newUpgrader'), undefined, {
    //            role: 'newUpgrader', 
    //            home: 'E69N14', 
    //            remote: 'E69N14'});
            //    //var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'upgrader'});
            //    var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'upgrader'});
    //            if (newName != -6 && newName != -4) { console.log('Spawning new newUpgrader in room ' + roomName + ': ' + newName); }

        
        //remoteUpgrader
        } else if (remoteUpgraders.length < roomsManager.getBuildCount(roomName, 'remoteUpgrader')) {
            var newName = Game.spawns[spawn].createCreep(roomsManager.getBuildString(roomName, 'remoteUpgrader'), undefined, 
            		roomsManager.getMemorySettings(roomName, 'remoteUpgrader'));
            if (newName != -6 && newName != -4) { console.log('Spawning new remote upgrader in room ' + roomName + ': ' + newName); }

        
        
        //ldupgrader
        } else if (ldupgraders.length < roomsManager.getBuildCount(roomName, 'ldupgrader')) {
            var newName = Game.spawns[spawn].createCreep(roomsManager.getBuildString(roomName, 'ldupgrader'), undefined, 
            		roomsManager.getMemorySettings(roomName, 'ldupgrader'));
            if (newName != -6 && newName != -4) { console.log('Spawning new ldupgrader in room ' + roomName + ': ' + newName); }

        
        
       
        //wallRepairer        
        } else if (wallRepairers.length < roomsManager.getBuildCount(roomName, 'wallRepairer') && walls.length > 0) {
            
                if (builders.length == 0) {
                	var newName = Game.spawns[spawn].createCreep(roomsManager.getBuildString(roomName, 'wallRepairer2'), undefined,  
                    		roomsManager.getMemorySettings(roomName, 'wallRepairer'));
                	if (newName != -6 && newName != -4) { console.log('Spawning new LARGE wall repairer in room ' + roomName + ': ' + newName) };
                } else {
                	var newName = Game.spawns[spawn].createCreep(roomsManager.getBuildString(roomName, 'wallRepairer'), undefined,  
                    		roomsManager.getMemorySettings(roomName, 'wallRepairer'));
                	if (newName != -6 && newName != -4) { console.log('Spawning new NORMAL wall repairer in room ' + roomName + ': ' + newName) };
                }

                
        //builder
        } else if (builders.length < roomsManager.getBuildCount(roomName, 'builder') && (roleBuilder.workToDoInRoom(roomName) || Game.rooms[roomName].memory.builderMode == BUILD)) {

                var newName = Game.spawns[spawn].createCreep(roomsManager.getBuildString(roomName, 'builder'), undefined,  
                		roomsManager.getMemorySettings(roomName, 'builder'));
                if (newName != -6 && newName != -4) { console.log('Spawning new builder in room ' + roomName + ': ' + newName); }

                
        //builder2
        } else if (builders2.length < roomsManager.getBuildCount(roomName, 'builder2') && (roleBuilder.workToDoInRoom(roomsManager.getRemoteRoom(roomName, 'builder2')) )) {

                var newName = Game.spawns[spawn].createCreep(roomsManager.getBuildString(roomName, 'builder2'), undefined,  
                		roomsManager.getMemorySettings(roomName, 'builder2'));
                if (newName != -6 && newName != -4) { console.log('Spawning new builder2 in room ' + roomName + ': ' + newName); }

                
        //builder3
        } else if (builders3.length < roomsManager.getBuildCount(roomName, 'builder3') ) {      //}&& (roleBuilder.workToDoInRoom(roomsManager.getRemoteRoom(roomName, 'builder3')) )) {

                var newName = Game.spawns[spawn].createCreep(roomsManager.getBuildString(roomName, 'builder3'), undefined,  
                		roomsManager.getMemorySettings(roomName, 'builder3'));
                if (newName != -6 && newName != -4) { console.log('Spawning new builder3 in room ' + roomName + ': ' + newName); }
 
        }

    }
}
module.exports = creepsManager;
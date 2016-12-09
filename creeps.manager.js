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
            	alerts.newAlert(3,"Mourning the loss of: " + name + " who was a " + Memory.creeps[name].role) + " based in room " + Memory.creeps[name].home;
                delete Memory.creeps[name];
                
            }
        }
        
        roleDefender.run(roomName);
        
        //console.log(roomName);
        // lookup how many of each type of screep we have
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.memory.home == roomName);
        var towerRepairer = _.filter(Game.creeps, (creep) => creep.memory.role == 'towerRepair' && creep.memory.home == roomName);
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
        var ramparts = Game.rooms[roomName].find(FIND_STRUCTURES, {filter: function(object) {return object.structureType == 'rampart'}});
        var walls = Game.rooms[roomName].find(FIND_STRUCTURES, {filter: function(object) {return object.structureType == 'constructedWall'}});

        
        var spawns = Game.rooms[roomName].find(FIND_MY_SPAWNS);
        var spawn = spawns[0].name;
        
        var towerTargets = Game.rooms[roomName].find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_TOWER) &&
                    structure.energy < structure.energyCapacity;
            }
        });

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
        	var jobTitle = "harvester";
 
        
        //guard
        } else if (roleDefender.enemiesInRoom(roomName) && roomsManager.getBuildCount(roomName, 'guard') > 0) {
            if(guards.length < roomsManager.getBuildCount(roomName, 'guard')) {
                var newName = Game.spawns[spawn].createCreep(roomsManager.getBuildString(roomName, 'guard'), undefined, 
                		roomsManager.getMemorySettings(roomName, 'guard'));
                var jobTitle = "guard";
            }
 
 
        //towerRepair
        } else if (towerTargets.length > 0 && (towerRepairer.length < roomsManager.getBuildCount(roomName, 'towerRepair'))) {
            
                var newName = Game.spawns[spawn].createCreep(roomsManager.getBuildString(roomName, 'towerRepair'), undefined, 
                		roomsManager.getMemorySettings(roomName, 'towerRepair'));
                var jobTitle = "towerRepair";
 

        //attackers
        } else if(attackers.length < roomsManager.getBuildCount(roomName, 'attackers')) {
                var newName = Game.spawns[spawn].createCreep(roomsManager.getBuildString(roomName, 'attacker'), undefined, 
                		roomsManager.getMemorySettings(roomName, 'attackers'));
                var jobTitle = "attackers";
            
                
        //claimer
        } else if(claimers.length < roomsManager.getBuildCount(roomName, 'claimer')) {
            var newName = Game.spawns[spawn].createCreep(roomsManager.getBuildString(roomName, 'claimer'), undefined, 
            		roomsManager.getMemorySettings(roomName, 'claimer'));
            var jobTitle = "claimer";

            
        //repairer
        } else if (repairers.length < roomsManager.getBuildCount(roomName, 'repairer')) {
            

                var newName = Game.spawns[spawn].createCreep(roomsManager.getBuildString(roomName, 'repairer'), undefined, 
                		roomsManager.getMemorySettings(roomName, 'repairer'));
                var jobTitle = "repairer";
       
                  
        //upgrader
        } else if (upgraders.length < roomsManager.getBuildCount(roomName, 'upgrader')) {
            var newName = Game.spawns[spawn].createCreep(roomsManager.getBuildString(roomName, 'upgrader'), undefined, 
            		roomsManager.getMemorySettings(roomName, 'upgrader'));
            var jobTitle = "upgrader";

        
        //emergencyRepairer        
        } else if (emergencyRepairers.length < roomsManager.getBuildCount(roomName, 'emergencyRepairer')  && Game.rooms[roomName].memory.emergencyRepairMode != 999) {
            
                var newName = Game.spawns[spawn].createCreep(roomsManager.getBuildString(roomName, 'emergencyRepairer'), undefined, 
                		roomsManager.getMemorySettings(roomName, 'emergencyRepairer'));
                var jobTitle = "emergencyRepairer";

        
        //rampartRepairer        
        } else if (rampartRepairers.length < roomsManager.getBuildCount(roomName, 'rampartRepairer') && ramparts.length > 0) {

                var newName = Game.spawns[spawn].createCreep(roomsManager.getBuildString(roomName, 'rampartRepairer'), undefined,  
                		roomsManager.getMemorySettings(roomName, 'rampartRepairer'));
                var jobTitle = "rampartRepairer";

  
        //newUpgrader
    //    } else if (newUpgraders.length < newUpgradersToBuild) {
    //        var newName = Game.spawns[spawn].createCreep(roomsManager.getBuildString(roomName, 'newUpgrader'), undefined, {
    //            role: 'newUpgrader', 
    //            home: 'E69N14', 
    //            remote: 'E69N14'});
            //    //var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'upgrader'});
            //    var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'upgrader'});
    //            if (newName != -6 && newName != -4) { console.log('Spawning new newUpgrader in room ' + roomName + ': ' + newName); }

        
       
        
       
        //wallRepairer        
        } else if (wallRepairers.length < roomsManager.getBuildCount(roomName, 'wallRepairer') && walls.length > 0) {
            
                if (builders.length == 0) {
                	var newName = Game.spawns[spawn].createCreep(roomsManager.getBuildString(roomName, 'wallRepairer2'), undefined,  
                    		roomsManager.getMemorySettings(roomName, 'wallRepairer'));
                	var jobTitle = "LARGE wallRepairer";

                } else {
                	var newName = Game.spawns[spawn].createCreep(roomsManager.getBuildString(roomName, 'wallRepairer'), undefined,  
                    		roomsManager.getMemorySettings(roomName, 'wallRepairer'));
                	var jobTitle = "NORMAL wallRepairer";
                }

                
        //builder
        } else if (builders.length < roomsManager.getBuildCount(roomName, 'builder') && (roleBuilder.workToDoInRoom(roomName) || Game.rooms[roomName].memory.builderMode == BUILD)) {

                var newName = Game.spawns[spawn].createCreep(roomsManager.getBuildString(roomName, 'builder'), undefined,  
                		roomsManager.getMemorySettings(roomName, 'builder'));
                var jobTitle = "builder";

                
        //remoteHarvester
        } else if (remoteHarvesters.length < roomsManager.getBuildCount(roomName, 'remoteHarvester') && !roleDefender.enemiesInRoom(roomName)) {
            var newName = Game.spawns[spawn].createCreep(roomsManager.getBuildString(roomName, 'remoteHarvester'), undefined, 
            		roomsManager.getMemorySettings(roomName, 'remoteHarvester'));
            var jobTitle = "remoteHarvester";
 
            
        //remoteUpgrader
        } else if (remoteUpgraders.length < roomsManager.getBuildCount(roomName, 'remoteUpgrader') && !roleDefender.enemiesInRoom(roomName)) {
            var newName = Game.spawns[spawn].createCreep(roomsManager.getBuildString(roomName, 'remoteUpgrader'), undefined, 
            		roomsManager.getMemorySettings(roomName, 'remoteUpgrader'));
            var jobTitle = "remoteUpgrader";
        
        
        //ldupgrader
        } else if (ldupgraders.length < roomsManager.getBuildCount(roomName, 'ldupgrader')) {
            var newName = Game.spawns[spawn].createCreep(roomsManager.getBuildString(roomName, 'ldupgrader'), undefined, 
            		roomsManager.getMemorySettings(roomName, 'ldupgrader'));
            var jobTitle = "ldupgrader";

            
        //repairer2        
        } else if (repairers2.length < roomsManager.getBuildCount(roomName, 'repairer2') && !roleDefender.enemiesInRoom(roomName)) {
            

            var newName = Game.spawns[spawn].createCreep(roomsManager.getBuildString(roomName, 'repairer2'), undefined, 
            		roomsManager.getMemorySettings(roomName, 'repairer2'));
            var jobTitle = "repairer2";

            
        //repairer3
        } else if (repairers3.length < roomsManager.getBuildCount(roomName, 'repairer3') && !roleDefender.enemiesInRoom(roomName)) {
            

            var newName = Game.spawns[spawn].createCreep(roomsManager.getBuildString(roomName, 'repairer3'), undefined, 
            		roomsManager.getMemorySettings(roomName, 'repairer3'));
            var jobTitle = "repairer3";
       
            
        //builder2
        } else if (builders2.length < roomsManager.getBuildCount(roomName, 'builder2') && (roleBuilder.workToDoInRoom(roomsManager.getRemoteRoom(roomName, 'builder2') && !roleDefender.enemiesInRoom(roomName)) )) {

                var newName = Game.spawns[spawn].createCreep(roomsManager.getBuildString(roomName, 'builder2'), undefined,  
                		roomsManager.getMemorySettings(roomName, 'builder2'));
                var jobTitle = "builder2";

                
        //builder3
        } else if (builders3.length < roomsManager.getBuildCount(roomName, 'builder3') && !roleDefender.enemiesInRoom(roomName) && (roleBuilder.workToDoInRoom(roomsManager.getRemoteRoom(roomName, 'builder3'))) ) {      //} )) {

                var newName = Game.spawns[spawn].createCreep(roomsManager.getBuildString(roomName, 'builder3'), undefined,  
                		roomsManager.getMemorySettings(roomName, 'builder3'));
                var jobTitle = "builder3";
 
        }
        
        if (newName != -6 && newName != -4 && newName != undefined) { 
        	msg = 'Spawning new ' + jobTitle + ' in room ' + roomName + ': ' + newName;
        	alerts.newAlert(2, msg);
        	 
        } else if (newName != undefined){
        	switch (newName) {
        		case -6:
        			var reason = "Not Enough Energy";
        			if (Game.rooms[roomName].memory.noEnergyCount == undefined)
        				Game.rooms[roomName].memory.noEnergyCount = 1;
        			else
        				++Game.rooms[roomName].memory.noEnergyCount;
        			break;
        		case -4:
        			var reason = "Busy";
        			if (Game.rooms[roomName].memory.busyCount == undefined)
        				Game.rooms[roomName].memory.busyCount = 1;
        			else
        				++Game.rooms[roomName].memory.busyCount;
        			break;
        		default:
        			if (Game.rooms[roomName].memory.otherReasonCount == undefined)
        				Game.rooms[roomName].memory.otherReasonCount = 1;
        			else
        				++Game.rooms[roomName].memory.otherReasonCount;
        			var reason = newName;
        	}
        	alerts.newAlert(4, "Waiting to build " + jobTitle + " in room " + roomName + "  reason: " + reason);
        }

    }
}
module.exports = creepsManager;
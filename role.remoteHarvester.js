var alerts = require('alerts');

var roleRemoteHarvester = {

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
            	

                if (creep.pos.roomName == creep.memory.remote) {
                	
                	if (creep.memory.source == undefined || creep.memory.source == "") {
                		source = creep.pos.findClosestByPath(FIND_SOURCES);
                		if (source != null)
                			creep.memory.source = source.id;
                	}
                	
                	if (creep.memory.source != undefined && creep.memory.source != "")
	                    if(creep.harvest(Game.getObjectById(creep.memory.source)) == ERR_NOT_IN_RANGE) 
	                        creep.moveTo(Game.getObjectById(creep.memory.source));
	                    else if (creep.memory.timeArrivedAtSource == undefined || creep.memory.timeArrivedAtSource == "")
	                    	creep.memory.timeArrivedAtSource = Game.time;
	                    
                    
                    if(creep.carry.energy == creep.carryCapacity) {
                        creep.memory.delivering = true;
                        creep.memory.timeStartedDelivery = Game.time;
                        creep.memory.source = "";
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
                        
                        if (creep.memory.timeStartedDelivery != undefined && creep.memory.timeStartedDelivery != "" &&
                    			creep.memory.timeStartedToResource != undefined && creep.memory.timeStartedToResource != "") {
                    		creep.memory.timeCompleted = Game.time;
                    		roleRemoteHarvester.calculateStats(creep);
                    		
                    	}
                        creep.memory.timeStartedToResource = Game.time;
                    //    Game.notify('Creep ' + creep.name + ' who is a ' + creep.memory.role + ' started going to collect energy at ' + Game.time);
                    }
                } else {
                    var exit = creep.room.findExitTo(creep.memory.home);
                    creep.moveTo(creep.pos.findClosestByRange(exit));
                }
            }
        //}
	},
	
	calculateStats: function(creep) {
		var totalTicksPerTrip = creep.memory.timeCompleted - creep.memory.timeStartedToResource;
		var tripsPerLife = Math.floor(1500 / totalTicksPerTrip);
		var totalCarryEnergyPerLife = Math.floor(creep.carryCapacity * tripsPerLife);
		
		cost = 0;
		for (var bp in creep.body) {
			cost += BODYPART_COST[creep.body[bp].type];
		}
		
		//console.log("Cost: " + cost);
		if (totalCarryEnergyPerLife < cost) {
			msg = "(SL) Remote Harvester " + creep.name + " based out of room " + creep.memory.home + " doing " + creep.memory.role +
			"is costing more than it is making\n\nCost: " + cost + "\nLifetime Energy Transport: " + totalCarryEnergyPerLife + "\n\nTrip Details:\n  From Start to Energy: " +
			(creep.memory.timeArrivedAtSource - creep.memory.timeStartedToResource);
			
			//alerts.newAlert(1,msg);
			
			creep.memory.timeArrivedAtSource = "";
			creep.memory.timeCompleted = "";
			creep.memory.timeStartedToResource = "";
			creep.memory.timeStartedDelivery = "";
		}
			
		
	}
};

module.exports = roleRemoteHarvester;
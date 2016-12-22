var alerts = require('alerts');
var linkMaint = require('linkManager');

var roleRemoteHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
            
        if(creep.memory.delivering != true) {				//harvesting
        	
        	
            if (creep.pos.roomName == creep.memory.remote) {
            	
            	if (creep.memory.source == undefined || creep.memory.source == "") {
            		//console.log("2");
            		source = creep.pos.findClosestByPath(FIND_SOURCES);
            		if (source != null)
            			creep.memory.source = source.id;
            	}
            	
            	if (creep.memory.source != undefined && creep.memory.source != "")
            		//console.log("3");
            		var successcode = creep.harvest(Game.getObjectById(creep.memory.source));
            		//console.log(successcode);
                    if(successcode == ERR_NOT_IN_RANGE) {
                    	//console.log("4");
                        creep.moveTo(Game.getObjectById(creep.memory.source));
                    } else if (successcode == ERR_INVALID_TARGET) {
                    	//console.log("5");
                    	creep.memory.source = "";
                    } else if (creep.memory.timeArrivedAtSource == undefined || creep.memory.timeArrivedAtSource == "")
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
        else {			//delivering
            
        	// we know our type and destination now
            if (creep.room.name == creep.memory.home) {
	        	if (creep.memory.dest == undefined || creep.memory.dest == SPAWN) {
		        	var targets = creep.room.find(FIND_STRUCTURES, {
		                filter: (structure) => {
		                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
		                        structure.energy < structure.energyCapacity;
		                }
		        	});
		        	creep.memory.destinationType = SPAWN;
		        	
		        	
	        	} else if (creep.memory.dest == LINKSTORAGE) {
	        		var targets = creep.room.find(FIND_STRUCTURES, {
		                filter: (structure) => {
		                    return (structure.structureType == STRUCTURE_LINK || structure.structureType == STRUCTURE_STORAGE) &&
		                        structure.energy < structure.energyCapacity;
		                }
		        	});
	        		creep.memory.destinationType = LINKSTORAGE;
	        		creep.memory.destination = creep.room.links[0];
	        		
	        		
	        	} else if (creep.memory.dest == LINK) {
	        		//console.log(creep.name + " finding link");
	        		var targets = creep.room.find(FIND_STRUCTURES, {
		                filter: (structure) => {
		                    return (structure.structureType == STRUCTURE_LINK) 
		                }
		        	});
	        		creep.memory.destinationType = LINK;
	        		source = creep.pos.findClosestByPath(targets);
	        		creep.memory.destination = source;
	        		creep.memory.energyDestination = targets[0];
	        		
	        	} else if (creep.memory.dest == STORAGE) {
	        		var targets = creep.room.find(FIND_STRUCTURES, {
		                filter: (structure) => {
		                    return (structure.structureType == STRUCTURE_STORAGE) &&
		                        structure.energy < structure.energyCapacity;
		                }
		        	});
	        		creep.memory.destinationType = STORAGE;
	        	} else if (creep.memory.dest == "LINK:") {
	        		creep.memory.destinationType = LINK;
	        	}
        	
        	
        	
        	
            	if (creep.memory.destinationType == undefined || creep.memory.destinationType == SPAWN || creep.memory.destinationType == STORAGE) {
            		//console.log(creep.name + " in regular move to");
	                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
	                    creep.moveTo(targets[0]);
	                } 
            	} else if (creep.memory.destinationType == LINK) {
            		//console.log(creep.name + " in link move to");
            		var successcode = creep.transfer(creep.memory.destination, RESOURCE_ENERGY);
            		//console.log(successcode);
            		if(successcode == ERR_NOT_IN_RANGE) {
	                    creep.moveTo(creep.memory.destination);
	                }
            		linkMaint.run();
            	}
                
                
                
                if(creep.carry.energy == 0) {
                    creep.memory.delivering = false;
                    creep.memory.destination = "";
                    
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
        
        if (creep.getActiveBodyparts(WORK)<1 || creep.getActiveBodyparts(MOVE)<1 || creep.getActiveBodyparts(CARRY)<1) {
        	alerts.newAlert(2,"Creep " + creep.name + " in room " + creep.room.name + " who was a " + creep.memory.role + " committed suicide");
        	creep.say('Goodbye|Cruel|World');
        	creep.memory.role="Suicide";
        }

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
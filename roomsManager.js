// Room Modes
//  1 - Maintain (one low level builder on standby, 3 harvesters and 7 upgraders all depends on levels)
//  2 - Builder 3 lower level upgraders, 4 higher level builders all depending on level)
//  3 - Upgrade - like mode 1 but after a new build so larger creeps
//  9 - Manual Mode



var roomsManager = {
    
    setMode: function(roomID, modeCode)
    {
        Game.rooms[roomID].memory.mode = modeCode;
    },
    
    setBuilderMode: function(roomID, modeCode)
    {
        Game.rooms[roomID].memory.builderMode = modeCode;
    },
    
    getBuilderMode: function(roomID)
    {
        return Game.rooms[roomID].memory.builderMode;
    },
    
    setManualOptions: function(roomID, jobName, buildString, creepCount)
    {
        Game.rooms[roomID].memory.buildString = buildString;
        //.buildString = buildString;
        //Game.rooms[roomID].memory.jobName.creepCount = creepCount;
    },
    
    
    // This function will return a count for a particular role based on the room level and the current room mode
    // This was designed around a 3 mode room, the new room or new level, a build mode which typically happens
    // right after a level increase and then a grow phase to get to the next level.  This is also based on a 
    // room with 2 energy sources.
    
    getBuildCount: function(roomID, roleName)
    {
        var buildStrings = {
            '1' : {									// Room Level 1 (New Room)
                '1' : {								// Room Mode = NEWROOM
                    'harvester' : '2', 
                    'builder' : '0',
                    'builder2' : '0',
                    'builder3' : '0',
                    'upgrader' : '2', 
                    'guard' : '0', 
                    'remoteUpgrader' : '0',
                    'remoteHarvester' : '0',
                    'ldupgrader' : '0', 
                    'repairer' : '0', 
                    'repairer2' : '0',
                    'repairer3' : '0',
                    'emergencyRepairer' : '0',
                    'rampartRepairer' : '0',
                    'wallRepairer' : '0',
                    'wallRepairer2' : '0',
                    'claimers' : '0',
                    'attackers' : '0',
                    'towerRepair' : '0',
                    'storage' : '0',
                    'remoteStorage' : '0',
                    'transfer' : '0',
                    'eminer' : '0',
                    'eminer2' : '0',
                    'spawnMaint' : '0'
                }
            },
            '2' : {									// Room Level 2 (quick from lvl1)
                '1' : {								// Room Mode = NEWROOM
                    'harvester' : '2', 
                    'builder' : '1', 
                    'builder2' : '0',
                    'builder3' : '0',
                    'upgrader' : '2', 
                    'guard' : '0', 
                    'remoteUpgrader' : '0', 
                    'remoteHarvester' : '0',
                    'ldupgrader' : '0', 
                    'repairer' : '0', 
                    'repairer2' : '0',
                    'repairer3' : '0',
                    'emergencyRepairer' : '0',
                    'rampartRepairer' : '0',
                    'wallRepairer' : '0',
                    'wallRepairer2' : '0',
                    'claimers' : '0',
                    'attackers' : '0',
                    'towerRepair' : '0',
                    'storage' : '0',
                    'remoteStorage' : '0',
                    'transfer' : '0',
                    'eminer' : '0',
                    'eminer2' : '0',
                    'spawnMaint' : '0'
                },
                
                '2' : {								// Room Level 2
                    'harvester' : '3', 				// Room Mode = BUILD
                    'builder' : '4',
                    'builder2' : '0',
                    'builder3' : '0',
                    'upgrader' : '2', 
                    'guard' : '0', 
                    'remoteUpgrader' : '0', 
                    'remoteHarvester' : '0',
                    'ldupgrader' : '0', 
                    'repairer' : '0', 
                    'repairer2' : '0',
                    'repairer3' : '0',
                    'emergencyRepairer' : '0',
                    'rampartRepairer' : '0',
                    'wallRepairer' : '0',
                    'claimers' : '0',
                    'attackers' : '0',
                    'towerRepair' : '0',
                    'storage' : '0',
                    'remoteStorage' : '0',
                    'transfer' : '0',
                    'eminer' : '0',
                    'eminer2' : '0',
                    'spawnMaint' : '0'
                },
                
                '3' : {								// Room Level 2
                   'harvester' : '3', 				// Room Mode = GROW
                   'builder' : '1', 
                   'builder2' : '0',
                   'builder3' : '0',
                   'upgrader' : '4', 
                   'guard' : '0', 
                   'remoteUpgrader' : '1', 
                   'remoteHarvester' : '0',
                   'ldupgrader' : '0', 
                   'repairer' : '1', 
                   'repairer2' : '0',
                   'repairer3' : '0',
                   'emergencyRepairer' : '1',
                   'rampartRepairer' : '1',
                   'wallRepairer' : '1',
                   'claimers' : '0',
                   'attackers' : '0',
                   'towerRepair' : '0',
                   'storage' : '0',
                   'remoteStorage' : '0',
                   'transfer' : '0',
                   'eminer' : '0',
                   'eminer2' : '0',
                   'spawnMaint' : '0'
                }
            },
            '3' : {									// Room Level 3
                '1' : {								// Room Mode = NEWROOM
                    'harvester' : '3', 
                    'builder' : '1', 
                    'builder2' : '0',
                    'builder3' : '0',
                    'upgrader' : '4', 
                    'guard' : '1', 
                    'remoteUpgrader' : '2',
                    'remoteHarvester' : '2',
                    'ldupgrader' : '0', 
                    'repairer' : '1', 
                    'repairer2' : '0',
                    'repairer3' : '0',
                    'emergencyRepairer' : '1',
                    'rampartRepairer' : '1',
                    'wallRepairer' : '1',
                    'claimers' : '0',
                    'attackers' : '0',
                    'towerRepair' : '0',
                    'storage' : '0',
                    'remoteStorage' : '0',
                    'transfer' : '0',
                    'eminer' : '0',
                    'eminer2' : '0',
                    'spawnMaint' : '0'
                },
                
                '2' : {								// Room Level 3
                    'harvester' : '3', 				// Room Mode = BUILD
                    'builder' : '4', 
                    'builder2' : '0',
                    'builder3' : '0',
                    'upgrader' : '2', 
                    'guard' : '0', 
                    'remoteUpgrader' : '0', 
                    'remoteHarvester' : '1',
                    'ldupgrader' : '0', 
                    'repairer' : '1', 
                    'repairer2' : '0',
                    'repairer3' : '0',
                    'emergencyRepairer' : '1',
                    'rampartRepairer' : '0',
                    'wallRepairer' : '0',
                    'claimers' : '0',
                    'attackers' : '0',
                    'towerRepair' : '0',
                    'storage' : '0',
                    'remoteStorage' : '0',
                    'transfer' : '0',
                    'eminer' : '0',
                    'eminer2' : '0',
                    'spawnMaint' : '0'
                },
                
                '3' : {								// Room Level 3
                    'harvester' : '3', 				// Room Mode = GROW
                    'builder' : '1', 
                    'builder2' : '0',
                    'builder3' : '0',
                    'upgrader' : '4',
                    'guard' : '1', 
                    'remoteUpgrader' : '2', 
                    'remoteHarvester' : '2',
                    'ldupgrader' : '0', 
                    'repairer' : '1', 
                    'repairer2' : '0',
                    'repairer3' : '0',
                    'emergencyRepairer' : '1',
                    'rampartRepairer' : '1',
                    'wallRepairer' : '1',
                    'claimers' : '0',
                    'attackers' : '0',
                    'towerRepair' : '1',
                    'storage' : '0',
                    'remoteStorage' : '0',
                    'transfer' : '0',
                    'eminer' : '0',
                    'eminer2' : '0',
                    'spawnMaint' : '0'
                }
            },
            '4' : {									// Room Level 4
                '1' : {								// Room Mode = NEWROOM
                    'harvester' : '3', 
                    'builder' : '1', 
                    'builder2' : '0',
                    'builder3' : '0',
                    'upgrader' : '7',
                    'guard' : '2', 
                    'remoteUpgrader' : '3', 
                    'remoteHarvester' : '3',
                    'ldupgrader' : '0', 
                    'repairer' : '1', 
                    'repairer2' : '0',
                    'repairer3' : '0',
                    'emergencyRepairer' : '1',
                    'rampartRepairer' : '1',
                    'wallRepairer' : '1',
                    'claimers' : '0',
                    'attackers' : '0',
                    'towerRepair' : '1',
                    'storage' : '0',
                    'remoteStorage' : '0',
                    'transfer' : '0',
                    'eminer' : '0',
                    'eminer2' : '0',
                    'spawnMaint' : '0'
                },
                
                '2' : {								// Room Level 4
                   'harvester' : '3', 				// Room Mode = BUILD
                   'builder' : '4', 
                   'builder2' : '0',
                   'builder3' : '0',
                   'upgrader' : '3',
                   'guard' : '2', 
                   'remoteUpgrader' : '0', 
                   'remoteHarvester' : '1',
                   'ldupgrader' : '0', 
                   'repairer' : '1', 
                   'repairer2' : '0',
                   'repairer3' : '0',
                   'emergencyRepairer' : '1',
                   'rampartRepairer' : '1',
                   'wallRepairer' : '0',
                   'claimers' : '0',
                   'attackers' : '0',
                   'towerRepair' : '1',
                   'storage' : '0',
                   'remoteStorage' : '0',
                   'transfer' : '0',
                   'eminer' : '0',
                   'eminer2' : '0',
                   'spawnMaint' : '0'
                },
                
                '3' : {								// Room Level 4
                    'harvester' : '3', 				// Room Mode = GROW
                    'builder' : '1', 
                    'builder2' : '0',
                    'builder3' : '0',
                    'upgrader' : '5',
                    'guard' : '2', 
                    'remoteUpgrader' : '4', 
                    'remoteHarvester' : '3',
                    'ldupgrader' : '0', 
                    'repairer' : '1', 
                    'repairer2' : '0',
                    'repairer3' : '0',
                    'emergencyRepairer' : '1',
                    'rampartRepairer' : '1',
                    'wallRepairer' : '1',
                    'claimers' : '0',
                    'attackers' : '0',
                    'towerRepair' : '1',
                    'storage' : '1',
                    'remoteStorage' : '0',
                    'transfer' : '0',
                    'eminer' : '0',
                    'eminer2' : '0',
                    'spawnMaint' : '0'
                }
            },
            '5' : {									// Room Level 5
                '1' : {								// Room Mode = NEWROOM
                    'harvester' : '3', 
                    'builder' : '1', 
                    'builder2' : '0',
                    'builder3' : '0',
                    'upgrader' : '5',
                    'guard' : '2', 
                    'remoteUpgrader' : '3', 
                    'remoteHarvester' : '3',
                    'ldupgrader' : '0', 
                    'repairer' : '1', 
                    'repairer2' : '0',
                    'repairer3' : '0',
                    'emergencyRepairer' : '1',
                    'rampartRepairer' : '1',
                    'wallRepairer' : '1',
                    'claimers' : '0',
                    'attackers' : '0',
                    'towerRepair' : '1',
                    'storage' : '1',
                    'remoteStorage' : '0',
                    'transfer' : '0',
                    'eminer' : '0',
                    'eminer2' : '0',
                    'spawnMaint' : '0'
                },
                
                '2' : {								// Room Level 5
                   'harvester' : '3', 				// Room Mode = BUILD
                   'builder' : '4', 
                   'builder2' : '0',
                   'builder3' : '0',
                   'upgrader' : '3',
                   'guard' : '2', 
                   'remoteUpgrader' : '2', 
                   'remoteHarvester' : '3',
                   'ldupgrader' : '0', 
                   'repairer' : '1', 
                   'repairer2' : '0',
                   'repairer3' : '0',
                   'emergencyRepairer' : '1',
                   'rampartRepairer' : '1',
                   'wallRepairer' : '1',
                   'claimers' : '0',
                   'attackers' : '0',
                   'towerRepair' : '1',
                   'storage' : '1',
                   'remoteStorage' : '0',
                   'transfer' : '0',
                   'eminer' : '0',
                   'eminer2' : '0',
                   'spawnMaint' : '0'
                },
                
                '3' : {								// Room Level 5
                    'harvester' : '3', 				// Room Mode = GROW
                    'builder' : '1', 
                    'builder2' : '0',
                    'builder3' : '0',
                    'upgrader' : '7',
                    'guard' : '2', 
                    'remoteUpgrader' : '3', 
                    'remoteHarvester' : '3',
                    'ldupgrader' : '0', 
                    'repairer' : '1', 
                    'repairer2' : '0',
                    'repairer3' : '0',
                    'emergencyRepairer' : '1',
                    'rampartRepairer' : '1',
                    'wallRepairer' : '1',
                    'claimers' : '0',
                    'attackers' : '0',
                    'towerRepair' : '1',
                    'storage' : '2',
                    'remoteStorage' : '0',
                    'transfer' : '0',
                    'eminer' : '0',
                    'eminer2' : '0',
                    'spawnMaint' : '0'
                }
            },
            '6' : {									// Room Level 5
                '1' : {								// Room Mode = NEWROOM
                    'harvester' : '3', 
                    'builder' : '1', 
                    'builder2' : '0',
                    'builder3' : '0',
                    'upgrader' : '7',
                    'guard' : '2', 
                    'remoteUpgrader' : '3', 
                    'remoteHarvester' : '3',
                    'ldupgrader' : '0', 
                    'repairer' : '1', 
                    'repairer2' : '0',
                    'repairer3' : '0',
                    'emergencyRepairer' : '1',
                    'rampartRepairer' : '1',
                    'wallRepairer' : '1',
                    'claimers' : '0',
                    'attackers' : '0',
                    'towerRepair' : '1',
                    'storage' : '2',
                    'remoteStorage' : '0',
                    'transfer' : '0',
                    'eminer' : '0',
                    'eminer2' : '0',
                    'spawnMaint' : '0'
                },
                
                '2' : {								// Room Level 5
                   'harvester' : '3', 				// Room Mode = BUILD
                   'builder' : '4', 
                   'builder2' : '0',
                   'builder3' : '0',
                   'upgrader' : '3',
                   'guard' : '2', 
                   'remoteUpgrader' : '2', 
                   'remoteHarvester' : '3',
                   'ldupgrader' : '0', 
                   'repairer' : '1', 
                   'repairer2' : '0',
                   'repairer3' : '0',
                   'emergencyRepairer' : '1',
                   'rampartRepairer' : '1',
                   'wallRepairer' : '1',
                   'claimers' : '0',
                   'attackers' : '0',
                   'towerRepair' : '1',
                   'storage' : '2',
                   'remoteStorage' : '0',
                   'transfer' : '0',
                   'eminer' : '0',
                   'eminer2' : '0',
                   'spawnMaint' : '0'
                },
                
                '3' : {								// Room Level 5
                    'harvester' : '3', 				// Room Mode = GROW
                    'builder' : '1', 
                    'builder2' : '0',
                    'builder3' : '0',
                    'upgrader' : '7',
                    'guard' : '3', 
                    'remoteUpgrader' : '2', 
                    'remoteHarvester' : '4',
                    'ldupgrader' : '0', 
                    'repairer' : '1', 
                    'repairer2' : '0',
                    'repairer3' : '0',
                    'emergencyRepairer' : '1',
                    'rampartRepairer' : '1',
                    'wallRepairer' : '1',
                    'claimers' : '0',
                    'attackers' : '0',
                    'towerRepair' : '1',
                    'storage' : '3',
                    'remoteStorage' : '0',
                    'transfer' : '0',
                    'eminer' : '0',
                    'eminer2' : '0',
                    'spawnMaint' : '0'
                },
            '7' : {									// Room Level 5
                '1' : {								// Room Mode = NEWROOM
                    'harvester' : '3', 
                    'builder' : '1', 
                    'builder2' : '0',
                    'builder3' : '0',
                    'upgrader' : '7',
                    'guard' : '2', 
                    'remoteUpgrader' : '3', 
                    'remoteHarvester' : '4',
                    'ldupgrader' : '0', 
                    'repairer' : '1', 
                    'repairer2' : '0',
                    'repairer3' : '0',
                    'emergencyRepairer' : '1',
                    'rampartRepairer' : '1',
                    'wallRepairer' : '1',
                    'claimers' : '0',
                    'attackers' : '0',
                    'towerRepair' : '1',
                    'storage' : '3',
                    'remoteStorage' : '0',
                    'transfer' : '0',
                    'eminer' : '0',
                    'eminer2' : '0',
                    'spawnMaint' : '0'
                },
                
                '2' : {								// Room Level 5
                   'harvester' : '3', 				// Room Mode = BUILD
                   'builder' : '4', 
                   'builder2' : '0',
                   'builder3' : '0',
                   'upgrader' : '3',
                   'guard' : '2', 
                   'remoteUpgrader' : '2', 
                   'remoteHarvester' : '3',
                   'ldupgrader' : '0', 
                   'repairer' : '1', 
                   'repairer2' : '0',
                   'repairer3' : '0',
                   'emergencyRepairer' : '1',
                   'rampartRepairer' : '1',
                   'wallRepairer' : '1',
                   'claimers' : '0',
                   'attackers' : '0',
                   'towerRepair' : '1',
                   'storage' : '3',
                   'remoteStorage' : '0',
                   'transfer' : '0',
                   'eminer' : '0',
                   'eminer2' : '0',
                   'spawnMaint' : '0'
                },
                
                '3' : {								// Room Level 5
                    'harvester' : '3', 				// Room Mode = GROW
                    'builder' : '1', 
                    'builder2' : '0',
                    'builder3' : '0',
                    'upgrader' : '7',
                    'guard' : '2', 
                    'remoteUpgrader' : '2', 
                    'remoteHarvester' : '4',
                    'ldupgrader' : '0', 
                    'repairer' : '1', 
                    'repairer2' : '0',
                    'repairer3' : '0',
                    'emergencyRepairer' : '1',
                    'rampartRepairer' : '1',
                    'wallRepairer' : '1',
                    'claimers' : '0',
                    'attackers' : '0',
                    'towerRepair' : '1',
                    'storage' : '4',
                    'remoteStorage' : '0',
                    'transfer' : '0',
                    'eminer' : '0',
                    'eminer2' : '0',
                    'spawnMaint' : '0'
                }
            }
        }
        
    };
        
        //console.log(roomID + "   " + roleName + "  " + Game.rooms[roomID].memory.mode + "  " + Game.rooms[roomID].controller.level);
        if (rooms[roomID][roleName]['build'] == AUTOMODE)
        	return buildStrings[Game.rooms[roomID].controller.level][Game.rooms[roomID].memory.mode][roleName];
        else
        	return rooms[roomID][roleName]['build'];
    },
    
    // This function will return the body parts recommended based on the role, room level and room mode
    // This is still a work in progress and is based on a room with 2 energy sources.  Every room is
    // different and this may need to be tweaked.
    getBuildString: function(roomID, roleName)
    {
        var buildStrings = {
            '1' : {
                '1' : {
                    'harvester' : [WORK,CARRY,MOVE],
                    'builder' : [WORK,CARRY,MOVE],
                    'builder2' : [WORK,CARRY,MOVE],
                    'builder3' : [WORK,CARRY,MOVE],
                    'upgrader' : [WORK,CARRY,MOVE],
                    'guard' : [WORK,CARRY,MOVE],
                    'remoteUpgrader' : [WORK,CARRY,MOVE],
                    'remoteHarvester' : [WORK,CARRY,MOVE],
                    'remoteHarvester2' : [WORK,CARRY,MOVE],
                    'remoteHarvester3' : [WORK,CARRY,MOVE],
                    'ldupgrader' : [WORK,CARRY,MOVE],
                    'repairer' : [WORK,CARRY,MOVE],
                    'repairer2' : [WORK,CARRY,MOVE],
                    'repairer3' : [WORK,CARRY,MOVE],
                    'emergencyRepairer' : [WORK,CARRY,MOVE],
                    'rampartRepairer' : [WORK,CARRY,MOVE],
                    'wallRepairer' : [WORK,CARRY,MOVE],
                    'wallRepairer2' : [WORK,CARRY,MOVE],
                    'towerRepair' : [WORK,CARRY,MOVE],
                    'storage' : [WORK,CARRY,MOVE],
                    'remoteStorage' : [WORK,CARRY,MOVE],
                    'transfer' : [WORK,CARRY,MOVE],
                    'eminer' : [WORK,CARRY,MOVE],
                    'eminer2' : [WORK,CARRY,MOVE],
                    'spawnMaint' : [WORK,CARRY,MOVE],
                    'attackers' : [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE]
                }
            },
            '2' : {
                '1' : {
                    'harvester' : [WORK,CARRY,MOVE],
                    'builder' : [WORK,CARRY,MOVE],
                    'builder2' : [WORK,CARRY,MOVE],
                    'builder3' : [WORK,CARRY,MOVE],
                    'upgrader' : [WORK,CARRY,MOVE],
                    'guard' : [TOUGH,MOVE,ATTACK],
                    'remoteUpgrader' : [WORK,CARRY,CARRY,MOVE,MOVE],
                    'remoteHarvester' : [WORK,CARRY,MOVE],
                    'remoteHarvester2' : [WORK,CARRY,MOVE],
                    'remoteHarvester3' : [WORK,CARRY,MOVE],
                    'ldupgrader' : [WORK,CARRY,CARRY,MOVE],
                    'repairer' : [WORK,CARRY,MOVE],
                    'repairer2' : [WORK,CARRY,MOVE],
                    'repairer3' : [WORK,CARRY,MOVE],
                    'emergencyRepairer' : [WORK,CARRY,MOVE],
                    'rampartRepairer' : [WORK,CARRY,MOVE],
                    'wallRepairer' : [WORK,CARRY,MOVE],
                    'wallRepairer2' : [WORK,CARRY,MOVE],
                    'towerRepair' : [WORK,CARRY,MOVE],
                    'storage' : [WORK,CARRY,MOVE],
                    'remoteStorage' : [WORK,CARRY,MOVE],
                    'transfer' : [WORK,CARRY,MOVE],
                    'eminer' : [WORK,CARRY,MOVE],
                    'eminer2' : [WORK,CARRY,MOVE],
                    'spawnMaint' : [WORK,CARRY,MOVE]
                },
                
                '2' : {
                    'harvester' : [WORK,CARRY,MOVE],
                    'builder' : [WORK,CARRY,MOVE],
                    'builder2' : [WORK,CARRY,MOVE],
                    'builder3' : [WORK,CARRY,MOVE],
                    'upgrader' : [WORK,CARRY,MOVE],
                    'guard' : [TOUGH,MOVE,ATTACK],
                    'remoteUpgrader' : [WORK,CARRY,CARRY,CARRY,MOVE],
                    'remoteHarvester' : [WORK,CARRY,MOVE],
                    'remoteHarvester2' : [WORK,CARRY,MOVE],
                    'remoteHarvester3' : [WORK,CARRY,MOVE],
                    'ldupgrader' : [WORK,CARRY,CARRY,MOVE],
                    'repairer' : [WORK,CARRY,MOVE],
                    'repairer2' : [WORK,CARRY,MOVE],
                    'repairer3' : [WORK,CARRY,MOVE],
                    'emergencyRepairer' : [WORK,CARRY,MOVE],
                    'rampartRepairer' : [WORK,CARRY,MOVE],
                    'wallRepairer' : [WORK,CARRY,MOVE],
                    'wallRepairer2' : [WORK,CARRY,MOVE],
                    'towerRepair' : [WORK,CARRY,MOVE],
                    'storage' : [WORK,CARRY,MOVE],
                    'remoteStorage' : [WORK,CARRY,MOVE],
                    'transfer' : [WORK,CARRY,MOVE],
                    'eminer' : [WORK,CARRY,MOVE],
                    'eminer2' : [WORK,CARRY,MOVE],
                    'spawnMaint' : [WORK,CARRY,MOVE]
                },
                
                '3' : {
                    'harvester' : [WORK,CARRY,MOVE],
                    'builder' : [WORK,CARRY,MOVE],
                    'builder2' : [WORK,CARRY,MOVE],
                    'builder3' : [WORK,CARRY,MOVE],
                    'upgrader' : [WORK,CARRY,CARRY,CARRY,MOVE,MOVE],
                    'guard' : [TOUGH,MOVE,ATTACK],
                    'remoteUpgrader' : [WORK,CARRY,CARRY,MOVE,MOVE],
                    'remoteHarvester' : [WORK,CARRY,MOVE],
                    'remoteHarvester2' : [WORK,CARRY,MOVE],
                    'remoteHarvester3' : [WORK,CARRY,MOVE],
                    'ldupgrader' : [WORK,CARRY,CARRY,MOVE],
                    'repairer' : [WORK,CARRY,MOVE],
                    'repairer2' : [WORK,CARRY,MOVE],
                    'repairer3' : [WORK,CARRY,MOVE],
                    'emergencyRepairer' : [WORK,CARRY,MOVE],
                    'rampartRepairer' : [WORK,CARRY,MOVE],
                    'wallRepairer' : [WORK,CARRY,MOVE],
                    'wallRepairer2' : [WORK,CARRY,MOVE],
                    'towerRepair' : [WORK,CARRY,MOVE],
                    'storage' : [WORK,CARRY,MOVE],
                    'remoteStorage' : [WORK,CARRY,MOVE],
                    'transfer' : [WORK,CARRY,MOVE],
                    'eminer' : [WORK,CARRY,MOVE],
                    'eminer2' : [WORK,CARRY,MOVE],
                    'spawnMaint' : [WORK,CARRY,MOVE]
                }
            },
            '3' : {
                '1' : {
                    'harvester' : [WORK,CARRY,CARRY,MOVE,MOVE],
                    'builder' : [WORK,CARRY,MOVE],
                    'builder2' : [WORK,CARRY,MOVE],
                    'builder3' : [WORK,CARRY,MOVE],
                    'upgrader' : [WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE],
                    'guard' : [TOUGH,TOUGH,MOVE,ATTACK],
                    'remoteUpgrader' : [WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE],
                    'remoteHarvester' : [WORK,CARRY,MOVE],
                    'remoteHarvester2' : [WORK,CARRY,MOVE],
                    'remoteHarvester3' : [WORK,CARRY,MOVE],
                    'ldupgrader' : [WORK,CARRY,CARRY,CARRY,MOVE,MOVE],
                    'repairer' : [WORK,CARRY,MOVE],
                    'repairer2' : [WORK,CARRY,MOVE],
                    'repairer3' : [WORK,CARRY,MOVE],
                    'emergencyRepairer' : [WORK,CARRY,MOVE],
                    'rampartRepairer' : [WORK,CARRY,MOVE],
                    'wallRepairer' : [WORK,CARRY,MOVE],
                    'wallRepairer2' : [WORK,CARRY,MOVE],
                    'towerRepair' : [WORK,CARRY,MOVE],
                    'storage' : [WORK,CARRY,MOVE],
                    'remoteStorage' : [WORK,CARRY,MOVE],
                    'transfer' : [WORK,CARRY,MOVE],
                    'eminer' : [WORK,CARRY,MOVE],
                    'eminer2' : [WORK,CARRY,MOVE],
                    'spawnMaint' : [WORK,CARRY,MOVE]
                },
                
                '2' : {
                    'harvester' : [WORK,CARRY,CARRY,MOVE,MOVE],
                    'builder' : [WORK,WORK,CARRY,CARRY,MOVE,MOVE],
                    'builder2' : [WORK,WORK,CARRY,CARRY,MOVE,MOVE],
                    'builder3' : [WORK,WORK,CARRY,CARRY,MOVE,MOVE],
                    'upgrader' : [WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE],
                    'guard' : [TOUGH,TOUGH,MOVE,ATTACK],
                    'remoteUpgrader' : [WORK,CARRY,CARRY,CARRY,MOVE,MOVE],
                    'remoteHarvester' : [WORK,CARRY,MOVE],
                    'remoteHarvester2' : [WORK,CARRY,MOVE],
                    'remoteHarvester3' : [WORK,CARRY,MOVE],
                    'ldupgrader' : [WORK,CARRY,CARRY,MOVE],
                    'repairer' : [WORK,CARRY,MOVE],
                    'repairer2' : [WORK,CARRY,MOVE],
                    'repairer3' : [WORK,CARRY,MOVE],
                    'emergencyRepairer' : [WORK,CARRY,MOVE],
                    'rampartRepairer' : [WORK,CARRY,MOVE],
                    'wallRepairer' : [WORK,CARRY,MOVE],
                    'wallRepairer2' : [WORK,CARRY,MOVE],
                    'towerRepair' : [WORK,CARRY,MOVE],
                    'storage' : [WORK,CARRY,MOVE],
                    'remoteStorage' : [WORK,CARRY,MOVE],
                    'transfer' : [WORK,CARRY,MOVE],
                    'eminer' : [WORK,CARRY,MOVE],
                    'eminer2' : [WORK,CARRY,MOVE],
                    'spawnMaint' : [WORK,CARRY,MOVE]
                },
                
                '3' : {
                    'harvester' : [WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE],
                    'builder' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
                    'builder2' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
                    'builder3' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
                    'upgrader' : [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE],
                    'guard' : [TOUGH,TOUGH,MOVE,ATTACK],
                    'remoteUpgrader' : [WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
                    'remoteHarvester' : [WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE],
                    'remoteHarvester2' : [WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE],
                    'remoteHarvester3' : [WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE],
                    'ldupgrader' : [WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
                    'repairer' : [WORK,CARRY,MOVE],
                    'repairer2' : [WORK,CARRY,MOVE],
                    'repairer3' : [WORK,CARRY,MOVE],
                    'emergencyRepairer' : [WORK,CARRY,MOVE],
                    'rampartRepairer' : [WORK,CARRY,MOVE],
                    'wallRepairer' : [WORK,CARRY,MOVE],
                    'wallRepairer2' : [WORK,CARRY,CARRY,CARRY,MOVE,MOVE],
                    'towerRepair' : [WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE],
                    'storage' : [WORK,CARRY,MOVE],
                    'remoteStorage' : [WORK,CARRY,MOVE],
                    'transfer' : [WORK,CARRY,MOVE],
                    'eminer' : [WORK,CARRY,MOVE],
                    'eminer2' : [WORK,CARRY,MOVE],
                    'spawnMaint' : [WORK,CARRY,MOVE]
                }
            },
            '4' : {
                '1' : {
                    'harvester' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE],
                    'builder' : [WORK,CARRY,MOVE],
                    'builder2' : [WORK,CARRY,MOVE],
            		'builder3' : [WORK,CARRY,MOVE],
                    'upgrader' : [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE],
                    'guard' : [TOUGH,TOUGH,MOVE,ATTACK,ATTACK],
                    'remoteUpgrader' : [WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE],
                    'remoteHarvester' : [WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE],
                    'remoteHarvester2' : [WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE],
                    'remoteHarvester3' : [WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE],
                    'ldupgrader' : [WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
                    'repairer' : [WORK,CARRY,MOVE],
                    'repairer2' : [WORK,CARRY,MOVE],
                    'repairer3' : [WORK,CARRY,MOVE],
                    'emergencyRepairer' : [WORK,CARRY,MOVE],
                    'rampartRepairer' : [WORK,CARRY,MOVE],
                    'wallRepairer' : [WORK,CARRY,MOVE],
                    'wallRepairer2' : [WORK,CARRY,CARRY,CARRY,MOVE,MOVE],
                    'towerRepair' : [WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE],
                    'storage' : [WORK,CARRY,MOVE],
                    'remoteStorage' : [WORK,CARRY,MOVE],
                    'transfer' : [WORK,CARRY,MOVE],
                    'eminer' : [WORK,CARRY,MOVE],
                    'eminer2' : [WORK,CARRY,MOVE],
                    'spawnMaint' : [WORK,CARRY,MOVE]
                },
                
                '2' : {
                    'harvester' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE],
                    'builder' : [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
                    'builder2' : [WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE],
                    'builder3' : [WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE],
                    'upgrader' : [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE],
                    'guard' : [TOUGH,TOUGH,MOVE,ATTACK,ATTACK],
                    'remoteUpgrader' : [WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE],
                    'remoteHarvester' : [WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
                    'remoteHarvester2' : [WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
                    'remoteHarvester3' : [WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
                    'ldupgrader' : [WORK,CARRY,CARRY,CARRY,CARRY,MOVE],
                    'repairer' : [WORK,CARRY,MOVE],
                    'repairer2' : [WORK,CARRY,MOVE],
                    'repairer3' : [WORK,CARRY,MOVE],
                    'emergencyRepairer' : [WORK,CARRY,MOVE],
                    'rampartRepairer' : [WORK,CARRY,MOVE],
                    'wallRepairer' : [WORK,CARRY,MOVE],
                    'wallRepairer2' : [WORK,CARRY,MOVE],
                    'towerRepair' : [WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE],
                    'storage' : [WORK,CARRY,MOVE],
                    'remoteStorage' : [WORK,CARRY,MOVE],
                    'transfer' : [WORK,CARRY,MOVE],
                    'eminer' : [WORK,CARRY,MOVE],
                    'eminer2' : [WORK,CARRY,MOVE],
                    'spawnMaint' : [WORK,CARRY,MOVE]
                },
                
                '3' : {
                    'harvester' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE],
                    'builder' : [WORK,CARRY,MOVE],
                    'builder2' : [WORK,CARRY,MOVE],
                    'builder3' : [WORK,CARRY,MOVE],
                    'upgrader' : [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE],
                    'guard' : [TOUGH,TOUGH,MOVE,ATTACK,ATTACK],
                    'remoteUpgrader' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
                    'remoteHarvester' : [WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
                    'remoteHarvester2' : [WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
                    'remoteHarvester3' : [WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
                    'ldupgrader' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
                    'repairer' : [WORK,CARRY,MOVE],
                    'repairer2' : [WORK,CARRY,MOVE],
                    'repairer3' : [WORK,CARRY,MOVE],
                    'emergencyRepairer' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
                    'rampartRepairer' : [WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE],
                    'wallRepairer' : [WORK,CARRY,CARRY,CARRY,MOVE],
                    'wallRepairer2' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
                    'towerRepair' : [WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
                    'storage' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE],
                    'remoteStorage' : [WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
                    'transfer' : [WORK,CARRY,MOVE],
                    'eminer' : [WORK,CARRY,MOVE],
                    'eminer2' : [WORK,CARRY,MOVE],
                    'spawnMaint' : [WORK,CARRY,MOVE]
                }
            },
            '5' : {
                '1' : {
                    'harvester' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
                    'builder' : [WORK,CARRY,MOVE],
                    'builder2' : [WORK,CARRY,MOVE],
                    'builder3' : [WORK,CARRY,MOVE],
                    'upgrader' : [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE],
                    'guard' : [TOUGH,TOUGH,TOUGH,MOVE,MOVE,ATTACK,ATTACK,ATTACK],
                    'remoteUpgrader' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE],
                    'remoteHarvester' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
                    'remoteHarvester2' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
                    'remoteHarvester3' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
                    'ldupgrader' : [WORK,CARRY,MOVE],
                    'repairer' : [WORK,CARRY,MOVE],
                    'repairer2' : [WORK,CARRY,MOVE],
                    'repairer3' : [WORK,CARRY,MOVE],
                    'emergencyRepairer' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
                    'rampartRepairer' : [WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE],
                    'wallRepairer' : [WORK,CARRY,CARRY,CARRY,MOVE,MOVE],
                    'wallRepairer2' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
                    'towerRepair' : [WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
                    'storage' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
                    'remoteStorage' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
                    'transfer' : [WORK,CARRY,MOVE],
                    'eminer' : [WORK,CARRY,MOVE],
                    'eminer2' : [WORK,CARRY,MOVE],
                    'spawnMaint' : [WORK,CARRY,MOVE]
                },
                
                '2' : {
                    'harvester' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
                    'builder' : [WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE],
                    'builder2' : [WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE],
                    'builder3' : [WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE],
                    'upgrader' : [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE],
                    'guard' : [TOUGH,TOUGH,TOUGH,MOVE,MOVE,ATTACK,ATTACK,ATTACK],
                    'remoteUpgrader' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
                    'remoteHarvester' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
                    'remoteHarvester2' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
                    'remoteHarvester3' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
                    'ldupgrader' : [WORK,CARRY,MOVE],
                    'repairer' : [WORK,CARRY,MOVE],
                    'repairer2' : [WORK,CARRY,MOVE],
                    'repairer3' : [WORK,CARRY,MOVE],
                    'emergencyRepairer' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
                    'rampartRepairer' : [WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE],
                    'wallRepairer' : [WORK,CARRY,MOVE],
                    'wallRepairer2' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
                    'towerRepair' : [WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
                    'storage' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
                    'remoteStorage' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
                    'transfer' : [WORK,CARRY,MOVE],
                    'eminer' : [WORK,CARRY,MOVE],
                    'eminer2' : [WORK,CARRY,MOVE],
                    'spawnMaint' : [WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE]
                },
                
                '3' : {
                    'harvester' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
                    'builder' : [WORK,CARRY,MOVE],
                    'builder2' : [WORK,CARRY,MOVE],
                    'builder3' : [WORK,CARRY,MOVE],
                    'upgrader' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
                    'guard' : [TOUGH,TOUGH,TOUGH,MOVE,MOVE,ATTACK,ATTACK,ATTACK],
                    'remoteUpgrader' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
                    'remoteHarvester' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
                    'remoteHarvester2' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
                    'remoteHarvester3' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
                    'ldupgrader' : [WORK,CARRY,MOVE],
                    'repairer' : [WORK,CARRY,MOVE],
                    'repairer2' : [WORK,CARRY,MOVE],
                    'repairer3' : [WORK,CARRY,MOVE],
                    'emergencyRepairer' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
                    'rampartRepairer' : [WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE],
                    'wallRepairer' : [WORK,CARRY,MOVE],
                    'wallRepairer2' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
                    'towerRepair' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
                    'storage' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
                    'remoteStorage' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
                    'transfer' : [WORK,CARRY,MOVE],
                    'eminer' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
                    'eminer2' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
                    'spawnMaint' : [WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE]
                }
            },
            '6' : {
                '1' : {
                    'harvester' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
                    'builder' : [WORK,CARRY,MOVE],
                    'builder2' : [WORK,CARRY,MOVE],
                    'builder3' : [WORK,CARRY,MOVE],
                    'upgrader' : [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE],
                    'guard' : [TOUGH,TOUGH,TOUGH,MOVE,MOVE,ATTACK,ATTACK,ATTACK],
                    'remoteUpgrader' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE],
                    'remoteHarvester' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
                    'remoteHarvester2' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
                    'remoteHarvester3' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
                    'ldupgrader' : [WORK,CARRY,MOVE],
                    'repairer' : [WORK,CARRY,MOVE],
                    'repairer2' : [WORK,CARRY,MOVE],
                    'repairer3' : [WORK,CARRY,MOVE],
                    'emergencyRepairer' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
                    'rampartRepairer' : [WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE],
                    'wallRepairer' : [WORK,CARRY,MOVE],
                    'wallRepairer2' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
                    'towerRepair' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
                    'storage' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
                    'remoteStorage' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
                    'transfer' : [WORK,CARRY,MOVE],
                    'eminer' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
                    'eminer2' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
                    'spawnMaint' : [WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE]
                },
                
                '2' : {
                    'harvester' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
                    'builder' : [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE],
                    'builder2' : [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
                    'builder3' : [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
                    'upgrader' : [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE],
                    'guard' : [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK],
                    'remoteUpgrader' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
                    'remoteHarvester' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
                    'remoteHarvester2' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
                    'remoteHarvester3' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
                    'ldupgrader' : [WORK,CARRY,MOVE],
                    'repairer' : [WORK,CARRY,MOVE],
                    'repairer2' : [WORK,CARRY,MOVE],
                    'repairer3' : [WORK,CARRY,MOVE],
                    'emergencyRepairer' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
                    'rampartRepairer' : [WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE],
                    'wallRepairer' : [WORK,CARRY,MOVE],
                    'wallRepairer2' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
                    'towerRepair' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
                    'storage' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
                    'remoteStorage' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
                    'transfer' : [WORK,CARRY,MOVE],
                    'eminer' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
                    'eminer2' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
                    'spawnMaint' : [WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE]
                },
                
                '3' : {
                    'harvester' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
                    'builder' : [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
                    'builder2' : [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
                    'builder3' : [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
                    'upgrader' : [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
                    'guard' : [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK],
                    'remoteUpgrader' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
                    'remoteHarvester' : [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
                    'remoteHarvester2' : [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
                    'remoteHarvester3' : [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
                    'ldupgrader' : [WORK,CARRY,MOVE],
                    'repairer' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
                    'repairer2' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
                    'repairer3' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
                    'emergencyRepairer' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
                    'rampartRepairer' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE],
                    'wallRepairer' : [WORK,CARRY,MOVE],
                    'wallRepairer2' : [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE],
                    'towerRepair' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
                    'claimer' : [CLAIM,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
                    'storage' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE],
                    'remoteStorage' : [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
                    'transfer' : [WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE],
                    'eminer' : [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE],
                    'eminer2' : [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE],
                    'spawnMaint' : [WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE],
                    'attackers' : [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE]
                }
            },
            '7' : {
                '1' : {
                    'harvester' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
                    'builder' : [WORK,CARRY,MOVE],
                    'builder2' : [WORK,CARRY,MOVE],
                    'builder3' : [WORK,CARRY,MOVE],
                    'upgrader' : [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE],
                    'guard' : [TOUGH,TOUGH,TOUGH,MOVE,MOVE,ATTACK,ATTACK,ATTACK],
                    'remoteUpgrader' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE],
                    'remoteHarvester' : [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
                    'remoteHarvester2' : [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
                    'remoteHarvester3' : [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
                    'ldupgrader' : [WORK,CARRY,MOVE],
                    'repairer' : [WORK,CARRY,MOVE],
                    'repairer2' : [WORK,CARRY,MOVE],
                    'repairer3' : [WORK,CARRY,MOVE],
                    'emergencyRepairer' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
                    'rampartRepairer' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE],
                    'wallRepairer' : [WORK,CARRY,MOVE],
                    'wallRepairer2' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
                    'towerRepair' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
                    'storage' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
                    'remoteStorage' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
                    'transfer' : [WORK,CARRY,MOVE],
                    'eminer' : [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE],
                    'eminer2' : [WORK,CARRY,MOVE],
                    'spawnMaint' : [WORK,CARRY,MOVE]
                },
                
                '2' : {
                    'harvester' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
                    'builder' : [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE],
                    'builder2' : [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
                    'builder3' : [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
                    'upgrader' : [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE],
                    'guard' : [TOUGH,TOUGH,TOUGH,MOVE,MOVE,ATTACK,ATTACK,ATTACK],
                    'remoteUpgrader' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
                    'remoteHarvester' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
                    'remoteHarvester2' : [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
                    'remoteHarvester3' : [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
                    'ldupgrader' : [WORK,CARRY,MOVE],
                    'repairer' : [WORK,CARRY,MOVE],
                    'repairer2' : [WORK,CARRY,MOVE],
                    'repairer3' : [WORK,CARRY,MOVE],
                    'emergencyRepairer' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
                    'rampartRepairer' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE],
                    'wallRepairer' : [WORK,CARRY,MOVE],
                    'wallRepairer2' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
                    'towerRepair' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
                    'storage' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
                    'remoteStorage' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
                    'transfer' : [WORK,CARRY,MOVE],
                    'eminer' : [WORK,CARRY,MOVE],
                    'eminer2' : [WORK,CARRY,MOVE],
                    'spawnMaint' : [WORK,CARRY,MOVE]
                },
                
                '3' : {
                    'harvester' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
                    'builder' : [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
                    'builder2' : [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
                    'builder3' : [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
                    'upgrader' : [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
                    'guard' : [TOUGH,TOUGH,TOUGH,MOVE,MOVE,ATTACK,RANGED_ATTACK,ATTACK,RANGED_ATTACK,ATTACK],
                    'remoteUpgrader' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
                    'remoteHarvester' : [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
                    'remoteHarvester2' : [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
                    'remoteHarvester3' : [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
                    'ldupgrader' : [WORK,CARRY,MOVE],
                    'repairer' : [WORK,CARRY,CARRY,CARRY,MOVE,MOVE],
                    'repairer2' : [WORK,CARRY,CARRY,CARRY,MOVE,MOVE],
                    'repairer3' : [WORK,CARRY,MOVE],
                    'emergencyRepairer' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
                    'rampartRepairer' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE],
                    'wallRepairer' : [WORK,CARRY,MOVE],
                    'wallRepairer2' : [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE],
                    'towerRepair' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
                    'storage' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
                    'remoteStorage' : [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
                    'transfer' : [WORK,CARRY,MOVE],
                    'eminer' : [WORK,CARRY,MOVE],
                    'eminer2' : [WORK,CARRY,MOVE],
                    'spawnMaint' : [WORK,CARRY,MOVE]
                }
            }
        };
        
        if (rooms[roomID][roleName]['body'] == AUTOMODE)
        	return buildStrings[Game.rooms[roomID].controller.level][Game.rooms[roomID].memory.mode][roleName];
        else
        	return rooms[roomID][roleName]['body'];
    },				//getBuildString
    
    getMemorySettings: function(roomID, roleName) {
    	
    	if (rooms[roomID][roleName]['home'] == -1)
    		homeroom = roomID;
    	else
    		homeroom = rooms[roomID][roleName]['home'];
    	
    	if (rooms[roomID][roleName]['remote'] == -1)
    		remoteroom = roomID;
    	else
    		remoteroom = rooms[roomID][roleName]['remote'];
    	
    	if (rooms[roomID][roleName]['source'] == undefined || rooms[roomID][roleName]['source'] == -1) 
    		energySource = rooms[roomID]['roomOptions']['source'];
    	else
    		energySource = rooms[roomID][roleName]['source'];
    	
    	if (rooms[roomID][roleName]['source2'] == undefined || rooms[roomID][roleName]['source2'] == -1) 
    		energySource2 = rooms[roomID]['roomOptions']['source2'];
    	else
    		energySource2 = rooms[roomID][roleName]['source2'];
    		
		if (rooms[roomID][roleName]['dest'] == undefined || rooms[roomID][roleName]['dest'] == -1) 
			energyDestination = rooms[roomID]['roomOptions']['dest'];
    	else
    		energyDestination = rooms[roomID][roleName]['dest'];
		
		if (rooms[roomID][roleName]['dest2'] == undefined || rooms[roomID][roleName]['dest2'] == -1) 
			energyDestination2 = rooms[roomID]['roomOptions']['dest2'];
    	else
    		energyDestination2 = rooms[roomID][roleName]['dest2'];
    	
    	var memstr = 	{ 	role: roleName,
    						home: homeroom,
    						remote: remoteroom,
    						esource: energySource,
    						esource2: energySource2,
    						dest: energyDestination,
    						dest2: energyDestination2
    					};
    	
    	return memstr;
    },				//getBuildString
    
    getRemoteRoom: function(roomID, roleName) {
    	
    	if (rooms[roomID][roleName]['remote'] == -1)
    		return roomID
    	else
    		return rooms[roomID][roleName]['remote'];
    	
    },				//getRemoteRoom
    
    getHomeRoom: function(roomID, roleName) {
    	
    	if (rooms[roomID][roleName]['home'] == -1)
    		return roomID
    	else
    		return rooms[roomID][roleName]['home'];
    	
    },				//getHomeRoom
    
    getLinkTo: function(roomID, linkNumber) {
    	return rooms[roomID]['linkOptions'][linkNumber]['to'];
    	
    },				//getLinkTo
    
    getLinkMaintain: function(roomID, linkNumber) {
    	return rooms[roomID]['linkOptions'][linkNumber]['maintain'];
    	
    },				//getLinkMaintain
    
    getLinkFrom: function(roomID, linkNumber) {
    	return rooms[roomID]['linkOptions'][linkNumber]['from'];
    	
    }
}       

module.exports = roomsManager;

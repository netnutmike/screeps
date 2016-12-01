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
                    'upgrader' : '2', 
                    'guard' : '0', 
                    'remoteUpgrader' : '0',
                    'remoteHarvester' : '0',
                    'ldupgrader' : '0', 
                    'repairer' : '0', 
                    'emergencyRepairer' : '0',
                    'rampartRepairer' : '0',
                    'wallRepairer' : '0',
                    'wallRepairer2' : '0'
                }
            },
            '2' : {									// Room Level 2 (quick from lvl1)
                '1' : {								// Room Mode = NEWROOM
                    'harvester' : '2', 
                    'builder' : '1', 
                    'upgrader' : '2', 
                    'guard' : '0', 
                    'remoteUpgrader' : '1', 
                    'remoteHarvester' : '1',
                    'ldupgrader' : '0', 
                    'repairer' : '0', 
                    'emergencyRepairer' : '0',
                    'rampartRepairer' : '0',
                    'wallRepairer' : '0',
                    'wallRepairer2' : '0'
                },
                
                '2' : {								// Room Level 2
                    'harvester' : '3', 				// Room Mode = BUILD
                    'builder' : '4', 
                    'upgrader' : '2', 
                    'guard' : '0', 
                    'remoteUpgrader' : '1', 
                    'remoteHarvester' : '1',
                    'ldupgrader' : '0', 
                    'repairer' : '0', 
                    'emergencyRepairer' : '0',
                    'rampartRepairer' : '0',
                    'wallRepairer' : '0'
                },
                
                '3' : {								// Room Level 2
                   'harvester' : '3', 				// Room Mode = GROW
                   'builder' : '1', 
                   'upgrader' : '4', 
                   'guard' : '0', 
                   'remoteUpgrader' : '1', 
                   'remoteHarvester' : '1',
                   'ldupgrader' : '0', 
                   'repairer' : '1', 
                   'emergencyRepairer' : '1',
                   'rampartRepairer' : '1',
                   'wallRepairer' : '1'
                }
            },
            '3' : {									// Room Level 3
                '1' : {								// Room Mode = NEWROOM
                    'harvester' : '3', 
                    'builder' : '1', 
                    'upgrader' : '4', 
                    'guard' : '1', 
                    'remoteUpgrader' : '2',
                    'remoteHarvester' : '2',
                    'ldupgrader' : '0', 
                    'repairer' : '1', 
                    'emergencyRepairer' : '1',
                    'rampartRepairer' : '0',
                    'wallRepairer' : '0'
                },
                
                '2' : {								// Room Level 3
                    'harvester' : '3', 				// Room Mode = BUILD
                    'builder' : '4', 
                    'upgrader' : '3', 
                    'guard' : '0', 
                    'remoteUpgrader' : '2', 
                    'remoteHarvester' : '2',
                    'ldupgrader' : '0', 
                    'repairer' : '1', 
                    'emergencyRepairer' : '1',
                    'rampartRepairer' : '0',
                    'wallRepairer' : '0'
                },
                
                '3' : {								// Room Level 3
                    'harvester' : '3', 				// Room Mode = GROW
                    'builder' : '1', 
                    'upgrader' : '7',
                    'guard' : '1', 
                    'remoteUpgrader' : '2', 
                    'remoteHarvester' : '2',
                    'ldupgrader' : '0', 
                    'repairer' : '1', 
                    'emergencyRepairer' : '1',
                    'rampartRepairer' : '1',
                    'wallRepairer' : '1'
                }
            },
            '4' : {									// Room Level 4
                '1' : {								// Room Mode = NEWROOM
                    'harvester' : '3', 
                    'builder' : '1', 
                    'upgrader' : '7',
                    'guard' : '2', 
                    'remoteUpgrader' : '3', 
                    'remoteHarvester' : '3',
                    'ldupgrader' : '0', 
                    'repairer' : '1', 
                    'emergencyRepairer' : '1',
                    'rampartRepairer' : '1',
                    'wallRepairer' : '1'
                },
                
                '2' : {								// Room Level 4
                   'harvester' : '3', 				// Room Mode = BUILD
                   'builder' : '4', 
                   'upgrader' : '3',
                   'guard' : '2', 
                   'remoteUpgrader' : '2', 
                   'remoteHarvester' : '3',
                   'ldupgrader' : '0', 
                   'repairer' : '1', 
                   'emergencyRepairer' : '1',
                   'rampartRepairer' : '1',
                   'wallRepairer' : '1'
                },
                
                '3' : {								// Room Level 4
                    'harvester' : '3', 				// Room Mode = GROW
                    'builder' : '1', 
                    'upgrader' : '7',
                    'guard' : '2', 
                    'remoteUpgrader' : '3', 
                    'remoteHarvester' : '3',
                    'ldupgrader' : '0', 
                    'repairer' : '1', 
                    'emergencyRepairer' : '1',
                    'rampartRepairer' : '1',
                    'wallRepairer' : '1'
                }
            },
            '5' : {									// Room Level 5
                '1' : {								// Room Mode = NEWROOM
                    'harvester' : '3', 
                    'builder' : '1', 
                    'upgrader' : '7',
                    'guard' : '2', 
                    'remoteUpgrader' : '3', 
                    'remoteHarvester' : '3',
                    'ldupgrader' : '1', 
                    'repairer' : '1', 
                    'emergencyRepairer' : '1',
                    'rampartRepairer' : '1',
                    'wallRepairer' : '1'
                },
                
                '2' : {								// Room Level 5
                   'harvester' : '3', 				// Room Mode = BUILD
                   'builder' : '4', 
                   'upgrader' : '3',
                   'guard' : '2', 
                   'remoteUpgrader' : '2', 
                   'remoteHarvester' : '3',
                   'ldupgrader' : '0', 
                   'repairer' : '1', 
                   'emergencyRepairer' : '1',
                   'rampartRepairer' : '1',
                   'wallRepairer' : '1'
                },
                
                '3' : {								// Room Level 5
                    'harvester' : '3', 				// Room Mode = GROW
                    'builder' : '1', 
                    'upgrader' : '7',
                    'guard' : '2', 
                    'remoteUpgrader' : '3', 
                    'remoteHarvester' : '3',
                    'ldupgrader' : '1', 
                    'repairer' : '1', 
                    'emergencyRepairer' : '1',
                    'rampartRepairer' : '1',
                    'wallRepairer' : '1'
                }
            }
            
        };
        
        
        return buildStrings[Game.rooms[roomID].controller.level][Game.rooms[roomID].memory.mode][roleName];
    },
    
    // This function will return the body parts recommended based on the role, room level and room mode
    // This is still a work in progress and is based on a room with 2 energy sources.  Every room is
    // different and this may need to be tweaked.
    getBuildString: function(roomID, roleName)
    {
        var buildStrings = {
            '1' : {
                '1' : {
                    'harvester' : '[WORK,CARRY,MOVE]',
                    'builder' : '[WORK,CARRY,MOVE]',
                    'upgrader' : '[WORK,CARRY,MOVE]',
                    'guard' : '[WORK,CARRY,MOVE]',
                    'remoteUpgrader' : '[WORK,CARRY,MOVE]',
                    'remoteHarvester' : '[WORK,CARRY,MOVE]',
                    'ldupgrader' : '[WORK,CARRY,MOVE]',
                    'repairer' : '[WORK,CARRY,MOVE]',
                    'emergencyRepairer' : '[WORK,CARRY,MOVE]',
                    'rampartRepairer' : '[WORK,CARRY,MOVE]',
                    'wallRepairer' : '[WORK,CARRY,MOVE]',
                    'wallRepairer2' : '[WORK,CARRY,MOVE]'
                }
            },
            '2' : {
                '1' : {
                    'harvester' : '[WORK,CARRY,MOVE]',
                    'builder' : '[WORK,CARRY,MOVE]',
                    'upgrader' : '[WORK,CARRY,MOVE]',
                    'guard' : '[TOUGH,MOVE,ATTACK]',
                    'remoteUpgrader' : '[WORK,CARRY,CARRY,MOVE,MOVE]',
                    'remoteHarvester' : '[WORK,CARRY,MOVE]',
                    'ldupgrader' : '[WORK,CARRY,CARRY,MOVE]',
                    'repairer' : '[WORK,CARRY,MOVE]',
                    'emergencyRepairer' : '[WORK,CARRY,MOVE]',
                    'rampartRepairer' : '[WORK,CARRY,MOVE]',
                    'wallRepairer' : '[WORK,CARRY,MOVE]',
                    'wallRepairer2' : '[WORK,CARRY,MOVE]'
                },
                
                '2' : {
                    'harvester' : '[WORK,CARRY,MOVE]',
                    'builder' : '[WORK,CARRY,MOVE]',
                    'upgrader' : '[WORK,CARRY,MOVE]',
                    'guard' : '[TOUGH,MOVE,ATTACK]',
                    'remoteUpgrader' : '[WORK,CARRY,CARRY,CARRY,MOVE]',
                    'remoteHarvester' : '[WORK,CARRY,MOVE]',
                    'ldupgrader' : '[WORK,CARRY,CARRY,MOVE]',
                    'repairer' : '[WORK,CARRY,MOVE]',
                    'emergencyRepairer' : '[WORK,CARRY,MOVE]',
                    'rampartRepairer' : '[WORK,CARRY,MOVE]',
                    'wallRepairer' : '[WORK,CARRY,MOVE]',
                    'wallRepairer2' : '[WORK,CARRY,MOVE]'
                },
                
                '3' : {
                    'harvester' : '[WORK,CARRY,MOVE]',
                    'builder' : '[WORK,CARRY,MOVE]',
                    'upgrader' : '[WORK,CARRY,MOVE]',
                    'guard' : '[TOUGH,MOVE,ATTACK]',
                    'remoteUpgrader' : '[WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE]',
                    'remoteHarvester' : '[WORK,CARRY,MOVE]',
                    'ldupgrader' : '[WORK,CARRY,CARRY,MOVE]',
                    'repairer' : '[WORK,CARRY,MOVE]',
                    'emergencyRepairer' : '[WORK,CARRY,MOVE]',
                    'rampartRepairer' : '[WORK,CARRY,MOVE]',
                    'wallRepairer' : '[WORK,CARRY,MOVE]',
                    'wallRepairer2' : '[WORK,CARRY,MOVE]'
                }
            },
            '3' : {
                '1' : {
                    'harvester' : '[WORK,CARRY,CARRY,MOVE,MOVE]',
                    'builder' : '[WORK,CARRY,MOVE]',
                    'upgrader' : '[WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE]',
                    'guard' : '[TOUGH,TOUGH,MOVE,ATTACK]',
                    'remoteUpgrader' : '[WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE]',
                    'remoteHarvester' : '[WORK,CARRY,MOVE]',
                    'ldupgrader' : '[WORK,CARRY,CARRY,CARRY,MOVE,MOVE]',
                    'repairer' : '[WORK,CARRY,MOVE]',
                    'emergencyRepairer' : '[WORK,CARRY,MOVE]',
                    'rampartRepairer' : '[WORK,CARRY,MOVE]',
                    'wallRepairer' : '[WORK,CARRY,MOVE]',
                    'wallRepairer2' : '[WORK,CARRY,MOVE]'
                },
                
                '2' : {
                    'harvester' : '[WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE]',
                    'builder' : '[WORK,WORK,CARRY,CARRY,MOVE,MOVE]',
                    'upgrader' : '[WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE]',
                    'guard' : '[TOUGH,TOUGH,MOVE,ATTACK]',
                    'remoteUpgrader' : '[WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE]',
                    'remoteHarvester' : '[WORK,CARRY,MOVE]',
                    'ldupgrader' : '[WORK,CARRY,CARRY,MOVE]',
                    'repairer' : '[WORK,CARRY,MOVE]',
                    'emergencyRepairer' : '[WORK,CARRY,MOVE]',
                    'rampartRepairer' : '[WORK,CARRY,MOVE]',
                    'wallRepairer' : '[WORK,CARRY,MOVE]',
                    'wallRepairer2' : '[WORK,CARRY,MOVE]'
                },
                
                '3' : {
                    'harvester' : '[WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE]',
                    'builder' : '[WORK,CARRY,MOVE]',
                    'upgrader' : '[WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE]',
                    'guard' : '[TOUGH,TOUGH,MOVE,ATTACK]',
                    'remoteUpgrader' : '[WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE]',
                    'remoteHarvester' : '[WORK,CARRY,MOVE]',
                    'ldupgrader' : '[WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE]',
                    'repairer' : '[WORK,CARRY,MOVE]',
                    'emergencyRepairer' : '[WORK,CARRY,MOVE]',
                    'rampartRepairer' : '[WORK,CARRY,MOVE]',
                    'wallRepairer' : '[WORK,CARRY,MOVE]',
                    'wallRepairer2' : '[WORK,CARRY,MOVE]'
                }
            },
            '4' : {
                '1' : {
                    'harvester' : '[WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE]',
                    'builder' : '[WORK,CARRY,MOVE]',
                    'upgrader' : '[WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE]',
                    'guard' : '[TOUGH,TOUGH,MOVE,ATTACK,ATTACK]',
                    'remoteUpgrader' : '[WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE]',
                    'remoteHarvester' : '[WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE]',
                    'ldupgrader' : '[WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE]',
                    'repairer' : '[WORK,CARRY,MOVE]',
                    'emergencyRepairer' : '[WORK,CARRY,MOVE]',
                    'rampartRepairer' : '[WORK,CARRY,MOVE]',
                    'wallRepairer' : '[WORK,CARRY,MOVE]',
                    'wallRepairer2' : '[WORK,CARRY,MOVE]'
                },
                
                '2' : {
                    'harvester' : '[WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE]',
                    'builder' : '[WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE]',
                    'upgrader' : '[WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE]',
                    'guard' : '[TOUGH,TOUGH,MOVE,ATTACK,ATTACK]',
                    'remoteUpgrader' : '[WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE]',
                    'remoteHarvester' : '[WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]',
                    'ldupgrader' : 'WORK,CARRY,CARRY,CARRY,CARRY,MOVE',
                    'repairer' : '[WORK,CARRY,MOVE]',
                    'emergencyRepairer' : '[WORK,CARRY,MOVE]',
                    'rampartRepairer' : '[WORK,CARRY,MOVE]',
                    'wallRepairer' : '[WORK,CARRY,MOVE]',
                    'wallRepairer2' : '[WORK,CARRY,MOVE]'
                },
                
                '3' : {
                    'harvester' : '[WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE]',
                    'builder' : '[WORK,CARRY,MOVE]',
                    'upgrader' : '[WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE]',
                    'guard' : '[TOUGH,TOUGH,MOVE,ATTACK,ATTACK]',
                    'remoteUpgrader' : '[WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE]',
                    'remoteHarvester' : '[WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]',
                    'ldupgrader' : 'WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE',
                    'repairer' : '[WORK,CARRY,MOVE]',
                    'emergencyRepairer' : '[WORK,CARRY,MOVE]',
                    'rampartRepairer' : '[WORK,CARRY,MOVE]',
                    'wallRepairer' : '[WORK,CARRY,MOVE]',
                    'wallRepairer2' : '[WORK,CARRY,MOVE]'
                }
            },
            '5' : {
                '1' : {
                    'harvester' : '[WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE]',
                    'builder' : '[WORK,CARRY,MOVE]',
                    'upgrader' : '[WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE]',
                    'guard' : '[TOUGH,TOUGH,TOUGH,MOVE,MOVE,ATTACK,ATTACK,ATTACK]',
                    'remoteUpgrader' : '[WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE]',
                    'remoteHarvester' : '[WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]',
                    'ldupgrader' : '[WORK,CARRY,MOVE]',
                    'repairer' : '[WORK,CARRY,MOVE]',
                    'emergencyRepairer' : '[WORK,CARRY,MOVE]',
                    'rampartRepairer' : '[WORK,CARRY,MOVE]',
                    'wallRepairer' : '[WORK,CARRY,MOVE]',
                    'wallRepairer2' : '[WORK,CARRY,MOVE]'
                },
                
                '2' : {
                    'harvester' : '[WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE]',
                    'builder' : '[WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE]',
                    'upgrader' : '[WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE]',
                    'guard' : '[TOUGH,TOUGH,TOUGH,MOVE,MOVE,ATTACK,ATTACK,ATTACK]',
                    'remoteUpgrader' : '[WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]',
                    'remoteHarvester' : 'WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE',
                    'ldupgrader' : '[WORK,CARRY,MOVE]',
                    'repairer' : '[WORK,CARRY,MOVE]',
                    'emergencyRepairer' : '[WORK,CARRY,MOVE]',
                    'rampartRepairer' : '[WORK,CARRY,MOVE]',
                    'wallRepairer' : '[WORK,CARRY,MOVE]',
                    'wallRepairer2' : '[WORK,CARRY,MOVE]'
                },
                
                '3' : {
                    'harvester' : '[WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE]',
                    'builder' : '[WORK,CARRY,MOVE]',
                    'upgrader' : '[WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE]',
                    'guard' : '[TOUGH,TOUGH,TOUGH,MOVE,MOVE,ATTACK,ATTACK,ATTACK]',
                    'remoteUpgrader' : '[WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]',
                    'remoteHarvester' : '[WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]',
                    'ldupgrader' : '[WORK,CARRY,MOVE]',
                    'repairer' : '[WORK,CARRY,MOVE]',
                    'emergencyRepairer' : '[WORK,CARRY,MOVE]',
                    'rampartRepairer' : '[WORK,CARRY,MOVE]',
                    'wallRepairer' : '[WORK,CARRY,MOVE]',
                    'wallRepairer2' : '[WORK,CARRY,MOVE]'
                }
            }
        };
        
        return buildStrings[Game.rooms[roomID].controller.level][Game.rooms[roomID].memory.mode][roleName];
    }
}       //getBuildString

module.exports = roomsManager;

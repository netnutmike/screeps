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
    
    getBuildCount: function(roomID, roleName)
    {
        var buildStrings = {
            '1' : {
                '1' : {
                    'harvester' : '2', 'builder' : '0', 'upgrader' : '2'
                }
            },
            '2' : {
                '1' : {
                    'harvester' : '2', 'builder' : '1', 'upgrader' : '2'
                },
                
                '2' : {
                    'harvester' : '3', 'builder' : '4', 'upgrader' : '2'
                },
                
                '3' : {
                   'harvester' : '3', 'builder' : '1', 'upgrader' : '4'
                }
            },
            '3' : {
                '1' : {
                    'harvester' : '3', 'builder' : '1', 'upgrader' : '4'
                },
                
                '2' : {
                    'harvester' : '3', 'builder' : '4', 'upgrader' : '3'
                },
                
                '3' : {
                    'harvester' : '3', 'builder' : '1', 'upgrader' : '7'
                }
            },
            '4' : {
                '1' : {
                    'harvester' : '3', 'builder' : '1', 'upgrader' : '7'
                },
                
                '2' : {
                   'harvester' : '3', 'builder' : '1', 'upgrader' : '7'
                },
                
                '3' : {
                    'harvester' : '3', 'builder' : '1', 'upgrader' : '7'
                }
            }
            
        };
        
        
        return buildStrings[Game.rooms[roomID].controller.level][Game.rooms[roomID].memory.mode][roleName];
    },
    
    getBuildString: function(roomID, roleName)
    {
        var buildStrings = {
            '1' : {
                '1' : {
                    'harvester' : '[WORK,CARRY,MOVE]',
                    'builder' : '[WORK,CARRY,MOVE]',
                    'upgrader' : '[WORK,CARRY,MOVE]'
                }
            },
            '2' : {
                '1' : {
                    'harvester' : '[WORK,CARRY,MOVE]',
                    'builder' : '[WORK,CARRY,MOVE]',
                    'upgrader' : '[WORK,CARRY,MOVE]'
                },
                
                '2' : {
                    'harvester' : '[WORK,CARRY,MOVE]',
                    'builder' : '[WORK,CARRY,MOVE]',
                    'upgrader' : '[WORK,CARRY,MOVE]'
                },
                
                '3' : {
                    'harvester' : '[WORK,CARRY,MOVE]',
                    'builder' : '[WORK,CARRY,MOVE]',
                    'upgrader' : '[WORK,CARRY,MOVE]'
                }
            },
            '3' : {
                '1' : {
                    'harvester' : '[WORK,CARRY,CARRY,MOVE,MOVE]',
                    'builder' : '[WORK,CARRY,MOVE]',
                    'upgrader' : '[WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE]'
                },
                
                '2' : {
                    'harvester' : '[WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE]',
                    'builder' : '[WORK,WORK,CARRY,CARRY,MOVE,MOVE]',
                    'upgrader' : '[WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE]'
                },
                
                '3' : {
                    'harvester' : '[WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE]',
                    'builder' : '[WORK,CARRY,MOVE]',
                    'upgrader' : '[WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE]'
                }
            },
            '4' : {
                '1' : {
                    'harvester' : '[WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE]',
                    'builder' : '[WORK,CARRY,MOVE]',
                    'upgrader' : '[WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE]'
                },
                
                '2' : {
                    'harvester' : '[WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE]',
                    'builder' : '[WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE]',
                    'upgrader' : '[WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE]'
                },
                
                '3' : {
                    'harvester' : '[WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE]',
                    'builder' : '[WORK,CARRY,MOVE]',
                    'upgrader' : '[WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE]'
                }
            }
        };
        
        return buildStrings[Game.rooms[roomID].controller.level][Game.rooms[roomID].memory.mode][roleName];
    }
}       //getBuildString

module.exports = roomsManager;

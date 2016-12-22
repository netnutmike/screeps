// Include Constants
require('constants');

// Global Options
global.gobalMode = AUTOMATIC;

// Alert Level Settings  
//   levels: 1 - game changers (level upgrades, mode changes, emergency repair modes)
//           2 - Game activity (new creeps)
//           3 - More Activity (clearing Creeps)
//           4 - Details (rampart repair level changes)
//           5 - Debugging
//           6 - Debugging (in the weeds)
global.consoleLogLevel = 2;					// outputs to the console
global.alertLevel = 1;						// send game alert in email

// Statistics Reports - These are sent between the top of the hour and 16 minutes after the hours in the array below, 
// you can have as many as you want but more than 24 (one for each hour only generates a duplicate report
// Hours are in UTC time so you will have to figure that out for your time zone.
reportRunHours = [1,13];


// Tower Modes  (They always defend)
global.rampartRepair = .0003			// To disable place a 0 in this option
global.wallRepair = 0;					// To disable place a 0 in this option
global.roadRepair = 0;					// To disable place a 0 in this option
global.containerRepair = 0				// To disable place a 0 in this option

// Rooms
global.home = "E68N14";
global.room2 = "E69N14";
global.room3 = "E67N15";
global.roomsNames = ["E68N14", "E69N14", "E67N15"];

global.containerRepairPercentage = .8;

//Room options
global.rooms = {
        'E68N14' : {	
        	'roomOptions' : {
        		'source'      : ENERGY,
        		'source2'     : ENERGY,
        		'dest'        : SPAWN,
        		'dest2'       : SPAWN,
        		'defenseMode' : ONDEMAND,
        		'energyMode'  : ENERGY
        	},
        	'linkOptions' : {
        		0 : {
        			'to'       : NONE,
        			'maintain' : 0,
        			'from'     : NONE
        		},
        		1 : {
        			'to'       : 0,
        			'maintain' : 0,
        			'from'     : NONE
        		},
        		2 : {
        			'to'       : 0,
        			'maintain' : 0,
        			'from'     : NONE
        		}
        	},
            'harvester' : {	
            	'build'  : AUTOMODE,
            	'home'   : AUTOMODE,
            	'remote' : AUTOMODE,
            	'body'   : AUTOMODE,
            	'dest'   : AUTOMODE
            },
            'builder' : {
            	'build'  : 2,
            	'home'   : AUTOMODE,
            	'remote' : AUTOMODE,
            	'body'   : AUTOMODE,
            	'source' : STORED,
            	'source2': AUTOMODE 
            },
            'builder2' : {
            	'build'  : 1,
            	'home'   : AUTOMODE,
            	'remote' : 'E67N14',
            	'body'   : AUTOMODE ,
            	'source' : AUTOMODE,
            	'source2': AUTOMODE
            },
            'builder3' : {
            	'build'  : 1,
            	'home'   : AUTOMODE,
            	'remote' : 'E68N15',
            	'body'   : AUTOMODE ,
            	'source' : AUTOMODE,
            	'source2': AUTOMODE
            },
            'upgrader' : {
            	'build'  : 4,   //4,
            	'home'   : AUTOMODE,
            	'remote' : AUTOMODE,
            	'body'   : AUTOMODE,
            	'source' : STORED,
            	'source2': ENERGY
            },
            'guard' : {
            	'build'  : AUTOMODE,
            	'home'   : AUTOMODE,
            	'remote' : AUTOMODE,
            	'body'   : AUTOMODE 
            },
            'remoteUpgrader' : {
            	'build'  : 0,
            	'home'   : 'E67N15',
            	'remote' : 'E67N14',
            	'body'   : AUTOMODE
            },
            'remoteHarvester' : {
            	'build'  : 4,
            	'home'   : AUTOMODE,
            	'remote' : 'E68N15',
            	'body'   : AUTOMODE,
            	'dest'   : LINK
            },
            'remoteHarvester2' : {
            	'build'  : 4,
            	'home'   : AUTOMODE,
            	'remote' : 'E67N14',
            	'body'   : AUTOMODE,
            	'dest'   : LINK
            },
            'remoteHarvester3' : {
            	'build'  : 0,
            	'home'   : 'E67N15',
            	'remote' : 'E67N14',
            	'body'   : AUTOMODE,
            	'dest'   : AUTOMODE
            },
            'ldupgrader' : {
            	'build'  : 0,
            	'home'   : AUTOMODE,
            	'remote' : AUTOMODE,
            	'body'   : AUTOMODE 
            },
            'repairer' : {
            	'build'  : AUTOMODE,
            	'home'   : AUTOMODE,
            	'remote' : AUTOMODE,
            	'body'   : AUTOMODE,
            	'source' : STORED,
            	'source2': AUTOMODE
            },
            'repairer2' : {
            	'build'  : 1,   //1,
            	'home'   : AUTOMODE,
            	'remote' : 'E67N14',
            	'body'   : AUTOMODE,
            	'source' : AUTOMODE,
            	'source2': AUTOMODE
            },
            'repairer3' : {
            	'build'  : 1,   //1,
            	'home'   : AUTOMODE,
            	'remote' : 'E68N15',
            	'body'   : AUTOMODE,
            	'source' : AUTOMODE,
            	'source2': AUTOMODE
            },
            'emergencyRepairer' : {
            	'build'  : AUTOMODE,
            	'home'   : AUTOMODE,
            	'remote' : AUTOMODE,
            	'body'   : AUTOMODE,
            	'source' : AUTOMODE,
            	'source2': AUTOMODE
            },
            'rampartRepairer' : {
            	'build'  : AUTOMODE,
            	'home'   : AUTOMODE,
            	'remote' : AUTOMODE,
            	'body'   : AUTOMODE,
            	'source' : STORED,
            	'source2': AUTOMODE
            },
            'wallRepairer' : {
            	'build'  : AUTOMODE,
            	'home'   : AUTOMODE,
            	'remote' : AUTOMODE,
            	'body'   : AUTOMODE,
            	'source' : STORED,
            	'source2': AUTOMODE
            },
            'wallRepairer2' : {
            	'build'  : AUTOMODE,
            	'home'   : AUTOMODE,
            	'remote' : AUTOMODE,
            	'body'   : AUTOMODE,
            	'source' : STORED,
            	'source2': AUTOMODE
            },
            'claimer' : {
            	'build'  : AUTOMODE,
            	'home'   : AUTOMODE,
            	'remote' : AUTOMODE,
            	'body'   : AUTOMODE
            },
            'attackers' : {
            	'build'  : 0,
            	'home'   : AUTOMODE,
            	'remote' : 'E68N15',
            	'body'   : [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE]
            },
            'towerRepair' : {
            	'build'  : AUTOMODE,
            	'home'   : AUTOMODE,
            	'remote' : AUTOMODE,
            	'body'   : AUTOMODE,
            	'source' : AUTOMODE,
            	'source2': AUTOMODE
            },
            'storage' : {
            	'build'  : 2,
            	'home'   : AUTOMODE,
            	'remote' : AUTOMODE,
            	'body'   : AUTOMODE
            },
            'remoteStorage' : {
            	'build'  : 0,
            	'home'   : AUTOMODE,
            	'remote' : 'E68N15',
            	'body'   : AUTOMODE
            },
            'transfer' : {
            	'build'  : 1,
            	'home'   : AUTOMODE,
            	'remote' : AUTOMODE,
            	'body'   : AUTOMODE,
            	'source' : AUTOMODE,
            	'dest'   : AUTOMODE
            },
            'eminer' : {
            	'build'  : 3,
            	'home'   : AUTOMODE,
            	'remote' : AUTOMODE,
            	'body'   : AUTOMODE,
            	'source' : AUTOMODE,
            	'dest'   : CONTAINER,
            	'dest2'  : STORAGE
            },
            'eminer2' : {
            	'build'  : 0,
            	'home'   : AUTOMODE,
            	'remote' : AUTOMODE,
            	'body'   : AUTOMODE,
            	'source' : AUTOMODE,
            	'dest'   : AUTOMODE,
            	'dest2'  : AUTOMODE
            },
            'spawnMaint' : {
            	'build'  : 3,
            	'home'   : AUTOMODE,
            	'remote' : AUTOMODE,
            	'body'   : AUTOMODE,
            	'source' : AUTOMODE,
            	'source2': AUTOMODE
            }
        },
        'E69N14' : {	
        	'roomOptions' : {
        		'source'      : ENERGY,
        		'source2'     : ENERGY,
        		'dest'        : SPAWN,
        		'dest2'       : SPAWN,
        		'defenseMode' : ONDEMAND,
        		'energyMode'  : ENERGY
        	},
        	'linkOptions' : {
        		0 : {
        			'to'       : NONE,
        			'maintain' : 0,
        			'from'     : NONE
        		},
        		1 : {
        			'to'       : 0,
        			'maintain' : 0,
        			'from'     : NONE
        		},
        		2 : {
        			'to'       : 0,
        			'maintain' : 0,
        			'from'     : NONE
        		}
        	},									
            'harvester' :  {	
            	'build'  : AUTOMODE,
            	'home'   : AUTOMODE,
            	'remote' : AUTOMODE,
            	'body'   : AUTOMODE,
            	'dest2'  : AUTOMODE
            },
            'builder' : {
            	'build'  : AUTOMODE,
            	'home'   : AUTOMODE,
            	'remote' : AUTOMODE,
            	'body'   : AUTOMODE,
            	'source' : STORED,
            	'source2': AUTOMODE
            },
            'builder2' : {
            	'build'  : 1,
            	'home'   : AUTOMODE,
            	'remote' : 'E69N15',
            	'body'   : AUTOMODE,
            	'source' : AUTOMODE,
            	'source2': AUTOMODE 
            },
            'builder3' : {
            	'build'  : 2,
            	'home'   : AUTOMODE,
            	'remote' : 'E69N13',
            	'body'   : AUTOMODE,
            	'source' : AUTOMODE,
            	'source2': AUTOMODE 
            },
            'upgrader' : {
            	'build'  : 7,
            	'home'   : AUTOMODE,
            	'remote' : AUTOMODE,
            	'body'   : AUTOMODE,
            	'source' : ENERGY,
            	'source2': ENERGY
            },
            'guard' : {
            	'build'  : AUTOMODE,
            	'home'   : AUTOMODE,
            	'remote' : AUTOMODE,
            	'body'   : AUTOMODE 
            },
            'remoteUpgrader' : {
            	'build'  : 0,
            	'home'   : AUTOMODE,
            	'remote' : 'E69N13',
            	'body'   : AUTOMODE
            },
            'remoteHarvester' : {
            	'build'  : 2,
            	'home'   : AUTOMODE,
            	'remote' : 'E69N15',
            	'body'   : AUTOMODE,
            	'dest'   : LINK
            },
            'remoteHarvester2' : {
            	'build'  : 4,
            	'home'   : AUTOMODE,
            	'remote' : 'E69N13',
            	'body'   : AUTOMODE,
            	'dest'   : LINK
            },
            'remoteHarvester3' : {
            	'build'  : AUTOMODE,
            	'home'   : AUTOMODE,
            	'remote' : 'E69N15',
            	'body'   : AUTOMODE,
            	'dest'   : AUTOMODE
            },
            'ldupgrader' : {
            	'build'  : AUTOMODE,
            	'home'   : AUTOMODE,
            	'remote' : AUTOMODE,
            	'body'   : AUTOMODE 
            },
            'repairer' : {
            	'build'  : AUTOMODE,
            	'home'   : AUTOMODE,
            	'remote' : AUTOMODE,
            	'body'   : AUTOMODE,
            	'source' : STORED,
            	'source2': AUTOMODE
            },
            'repairer2'  : {
            	'build'  : 1,
            	'home'   : AUTOMODE,
            	'remote' : 'E69N13',
            	'body'   : AUTOMODE,
            	'source' : AUTOMODE,
            	'source2': AUTOMODE
            },
            'repairer3'  : {
            	'build'  : 1,
            	'home'   : AUTOMODE,
            	'remote' : 'E69N15',
            	'body'   : AUTOMODE,
            	'source' : AUTOMODE,
            	'source2': AUTOMODE
            },
            'emergencyRepairer' : {
            	'build'  : 3,
            	'home'   : AUTOMODE,
            	'remote' : AUTOMODE,
            	'body'   : AUTOMODE,
            	'source' : AUTOMODE,
            	'source2': AUTOMODE
            },
            'rampartRepairer' : {
            	'build'  : 1,
            	'home'   : AUTOMODE,
            	'remote' : AUTOMODE,
            	'body'   : AUTOMODE,
            	'source' : STORED,
            	'source2': AUTOMODE
            },
            'wallRepairer' : {
            	'build'  : AUTOMODE,
            	'home'   : AUTOMODE,
            	'remote' : AUTOMODE,
            	'body'   : AUTOMODE,
            	'source' : STORED,
            	'source2': AUTOMODE
            },
            'wallRepairer2' : {
            	'build'  : AUTOMODE,
            	'home'   : AUTOMODE,
            	'remote' : AUTOMODE,
            	'body'   : AUTOMODE,
            	'source' : STORED,
            	'source2': AUTOMODE
            },
            'claimer' : {
            	'build'  : AUTOMODE,
            	'home'   : AUTOMODE,
            	'remote' : AUTOMODE,
            	'body'   : AUTOMODE
            },
            'attackers' : {
            	'build'  : AUTOMODE,
            	'home'   : AUTOMODE,
            	'remote' : AUTOMODE,
            	'body'   : AUTOMODE
            },
            'towerRepair' : {
            	'build'  : AUTOMODE,
            	'home'   : AUTOMODE,
            	'remote' : AUTOMODE,
            	'body'   : AUTOMODE,
            	'source' : AUTOMODE,
            	'source2': AUTOMODE
            },
            'storage' : {
            	'build'  : AUTOMODE,
            	'home'   : AUTOMODE,
            	'remote' : AUTOMODE,
            	'body'   : AUTOMODE
            },
            'remoteStorage' : {
            	'build'  : 0,
            	'home'   : AUTOMODE,
            	'remote' : 'E69N15',
            	'body'   : AUTOMODE
            },
            'transfer' : {
            	'build'  : 1,
            	'home'   : AUTOMODE,
            	'remote' : AUTOMODE,
            	'body'   : AUTOMODE,
            	'source' : AUTOMODE,
            	'dest'   : AUTOMODE
            },
            'eminer' : {
            	'build'  : 3,
            	'home'   : AUTOMODE,
            	'remote' : AUTOMODE,
            	'body'   : AUTOMODE,
            	'source' : AUTOMODE,
            	'dest'   : CONTAINER,
            	'dest2'  : STORAGE
            },
            'eminer2' : {
            	'build'  : 0,
            	'home'   : AUTOMODE,
            	'remote' : AUTOMODE,
            	'body'   : AUTOMODE,
            	'source' : AUTOMODE,
            	'dest'   : AUTOMODE
            },
            'spawnMaint' : {
            	'build'  : 2,
            	'home'   : AUTOMODE,
            	'remote' : AUTOMODE,
            	'body'   : AUTOMODE
            }
        },
        'E67N15' : {	
        	'roomOptions' : {
        		'source'      : ENERGY,
        		'source2'     : ENERGY,
        		'dest'        : SPAWN,
        		'dest2'       : SPAWN,
        		'defenseMode' : ONDEMAND,
        		'energyMode'  : ENERGY
        	},
        	'linkOptions' : {
        		0 : {
        			'to'       : NONE,
        			'maintain' : 0,
        			'from'     : NONE
        		},
        		1 : {
        			'to'       : 0,
        			'maintain' : 0,
        			'from'     : NONE
        		},
        		2 : {
        			'to'       : 0,
        			'maintain' : 0,
        			'from'     : NONE
        		}
        	},									
            'harvester' : {	
            	'build'  : AUTOMODE,
            	'home'   : AUTOMODE,
            	'remote' : AUTOMODE,
            	'body'   : AUTOMODE,
            	'dest2'  : AUTOMODE
            },
            'builder' : {
            	'build'  : AUTOMODE,
            	'home'   : AUTOMODE,
            	'remote' : AUTOMODE,
            	'body'   : AUTOMODE,
            	'source' : STORED,
            	'source2': AUTOMODE
            },
            'builder2' : {
            	'build'  : AUTOMODE,
            	'home'   : AUTOMODE,
            	'remote' : AUTOMODE,
            	'body'   : AUTOMODE,
            	'source' : AUTOMODE,
            	'source2': AUTOMODE 
            },
            'builder3' : {
            	'build'  : AUTOMODE,
            	'home'   : AUTOMODE,
            	'remote' : AUTOMODE,
            	'body'   : AUTOMODE,
            	'source' : AUTOMODE,
            	'source2': AUTOMODE 
            },
            'upgrader' : {
            	'build'  : 7,
            	'home'   : AUTOMODE,
            	'remote' : AUTOMODE,
            	'body'   : AUTOMODE,
            	'source' : STORED,
            	'source2': AUTOMODE
            },
            'guard' : {
            	'build'  : AUTOMODE,
            	'home'   : AUTOMODE,
            	'remote' : AUTOMODE,
            	'body'   : AUTOMODE 
            },
            'remoteUpgrader' : {
            	'build'  : 0,
            	'home'   : AUTOMODE,
            	'remote' : 'E67N14',
            	'body'   : AUTOMODE
            },
            'remoteHarvester' : {
            	'build'  : 0,
            	'home'   : AUTOMODE,
            	'remote' : 'E68N15',
            	'body'   : AUTOMODE,
            	'dest'   : AUTOMODE
            },
            'remoteHarvester2' : {
            	'build'  : AUTOMODE,
            	'home'   : AUTOMODE,
            	'remote' : 'E69N15',
            	'body'   : AUTOMODE,
            	'dest'   : AUTOMODE
            },
            'remoteHarvester3' : {
            	'build'  : AUTOMODE,
            	'home'   : AUTOMODE,
            	'remote' : 'E69N15',
            	'body'   : AUTOMODE,
            	'dest'   : AUTOMODE
            },
            'ldupgrader' : {
            	'build'  : AUTOMODE,
            	'home'   : AUTOMODE,
            	'remote' : AUTOMODE,
            	'body'   : AUTOMODE 
            },
            'repairer' : {
            	'build'  : AUTOMODE,
            	'home'   : AUTOMODE,
            	'remote' : AUTOMODE,
            	'body'   : AUTOMODE,
            	'source' : STORED,
            	'source2 ':AUTOMODE
            },
            'repairer2' : {
            	'build'  : AUTOMODE,
            	'home'   : AUTOMODE,
            	'remote' : AUTOMODE,
            	'body'   : AUTOMODE,
            	'source' : AUTOMODE,
            	'source2': AUTOMODE
            },
            'repairer3' : {
            	'build'  : AUTOMODE,
            	'home'   : AUTOMODE,
            	'remote' : AUTOMODE,
            	'body'   : AUTOMODE,
            	'source' : AUTOMODE,
            	'source2': AUTOMODE
            },
            'emergencyRepairer' : {
            	'build'  : AUTOMODE,
            	'home'   : AUTOMODE,
            	'remote' : AUTOMODE,
            	'body'   : AUTOMODE,
            	'source' : AUTOMODE,
            	'source2':AUTOMODE
            },
            'rampartRepairer' : {
            	'build'  : AUTOMODE,
            	'home'   : AUTOMODE,
            	'remote' : AUTOMODE,
            	'body'   : AUTOMODE,
            	'source' : STORED,
            	'source2': AUTOMODE
            },
            'wallRepairer' : {
            	'build'  : AUTOMODE,
            	'home'   : AUTOMODE,
            	'remote' : AUTOMODE,
            	'body'   : AUTOMODE,
            	'source' : STORED,
            	'source2': AUTOMODE
            },
            'wallRepairer2' : {
            	'build'  : AUTOMODE,
            	'home'   : AUTOMODE,
            	'remote' : AUTOMODE,
            	'body'   : AUTOMODE,
            	'source' : STORED,
            	'source2': AUTOMODE
            },
            'claimer' : {
            	'build'  : AUTOMODE,
            	'home'   : AUTOMODE,
            	'remote' : AUTOMODE,
            	'body'   : AUTOMODE
            },
            'attackers' : {
            	'build'  : AUTOMODE,
            	'home'   : AUTOMODE,
            	'remote' : AUTOMODE,
            	'body'   : AUTOMODE
            },
            'towerRepair' : {
            	'build'  : AUTOMODE,
            	'home'   : AUTOMODE,
            	'remote' : AUTOMODE,
            	'body'   : AUTOMODE,
            	'source' : STORED,
            	'source2': AUTOMODE
            },
            'storage' : {
            	'build'  : 0,
            	'home'   : AUTOMODE,
            	'remote' : AUTOMODE,
            	'body'   : AUTOMODE
            },
            'remoteStorage' : {
            	'build'  : AUTOMODE,
            	'home'   : AUTOMODE,
            	'remote' : AUTOMODE,
            	'body'   : AUTOMODE
            },
            'transfer' : {
            	'build'  : 1,
            	'home'   : AUTOMODE,
            	'remote' : AUTOMODE,
            	'body'   : AUTOMODE,
            	'source' : AUTOMODE,
            	'dest'   : AUTOMODE
            },
            'eminer' : {
            	'build'  : 4,
            	'home'   : AUTOMODE,
            	'remote' : AUTOMODE,
            	'body'   : AUTOMODE,
            	'source' : AUTOMODE,
            	'dest'   : LINK
            },
            'eminer2' : {
            	'build'  : 0,
            	'home'   : AUTOMODE,
            	'remote' : AUTOMODE,
            	'body'   : AUTOMODE,
            	'source' : AUTOMODE,
            	'dest'   : AUTOMODE
            },
            'spawnMaint' : {
            	'build'  : AUTOMODE,
            	'home'   : AUTOMODE,
            	'remote' : AUTOMODE,
            	'body'   : AUTOMODE,
            	'source' : AUTOMODE,
            	'dest'   : AUTOMODE
            }
        }
};


// Define the number of each type of screeps that are needed
// Setting a value other than AUTOMODE here overrises the automatic
// method of determining number of creeps per job based
// on room level and operating mode.

global.buildersToBuild = 4;
global.emergencyRepairersToBuild = 1;
global.guardsToBuild = 2;
global.harvestersToBuild = 3;
global.ldUpgradersToBuild = 0;
global.rampartRepairersToBuild = 1;
global.remoteHarvestersToBuild = 2;
global.remoteUpgradersToBuild = 2;
global.repairersToBuild = 1;
global.upgradersToBuild = 3;
global.newUpgradersToBuild = 3;
global.wallRepairersToBuild = 1;
global.attackersToBuild = 0;
global.claimersToBuild = 0;


// Repairer Settings
global.startRepairingAt = 0.6;					// This is the percentage (in decimal form) that when a structure get below this the repairer goes to work

// Emergency Repairer Settings
global.minimumEmergencyRepairPercentage = .10;		// If any structure reaches this level or below, Emergency Repair mode starts
global.maximumInRepair = 50;						// If there are this percentage or more of the total structures at the % defined below, go into emergency repair mode
global.percentageForMaximum = .50;					// Works with the one above, this is the percentage of health to use with the # of structures
global.maximumInRepairToRelease = 10;				// Exit emergency repair mode once there are this many or less left at the above % of health
global.fixWhenIdlePercentage = .90;					// When emergency repair mode is, while the creep is alive, fix anything below this percentage

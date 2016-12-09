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
global.consoleLogLevel = 4;					// outputs to the console
global.alertLevel = 1;						// send game alert in email

// Statistics Reports - These are sent between the top of the hour and 16 minutes after the hours in the array below, 
// you can have as many as you want but more than 24 (one for each hour only generates a duplicate report
// Hours are in UTC time so you will have to figure that out for your time zone.
reportRunHours = [0,1,13,17,23];

// Rooms
global.home = "E68N14";
global.room2 = "E69N14";

//Room options
global.rooms = {
        'E68N14' : {									
            'harvester' : {	
            	'build' : AUTOMODE,
            	'home'  : AUTOMODE,
            	'remote': AUTOMODE,
            	'body'  : AUTOMODE
            },
            'builder' : {
            	'build' : AUTOMODE,
            	'home'  : AUTOMODE,
            	'remote': AUTOMODE,
            	'body'  : AUTOMODE 
            },
            'builder2' : {
            	'build' : 1,
            	'home'  : AUTOMODE,
            	'remote': 'E67N14',
            	'body'  : AUTOMODE 
            },
            'builder3' : {
            	'build' : AUTOMODE,
            	'home'  : AUTOMODE,
            	'remote': 'E68N15',
            	'body'  : AUTOMODE 
            },
            'upgrader' : {
            	'build' : 6,
            	'home'  : AUTOMODE,
            	'remote': AUTOMODE,
            	'body'  : AUTOMODE
            },
            'guard' : {
            	'build' : AUTOMODE,
            	'home'  : AUTOMODE,
            	'remote': AUTOMODE,
            	'body'  : AUTOMODE 
            },
            'remoteUpgrader' : {
            	'build' : 3,
            	'home'  : AUTOMODE,
            	'remote': 'E67N14',
            	'body'  : AUTOMODE
            },
            'remoteHarvester' : {
            	'build' : 5,
            	'home'  : AUTOMODE,
            	'remote': 'E68N15',
            	'body'  : AUTOMODE
            },
            'ldupgrader' : {
            	'build' : 0,
            	'home'  : AUTOMODE,
            	'remote': AUTOMODE,
            	'body'  : AUTOMODE 
            },
            'repairer' : {
            	'build' : AUTOMODE,
            	'home'  : AUTOMODE,
            	'remote': AUTOMODE,
            	'body'  : AUTOMODE
            },
            'repairer2' : {
            	'build' : 1,
            	'home'  : AUTOMODE,
            	'remote': 'E67N14',
            	'body'  : AUTOMODE
            },
            'repairer3' : {
            	'build' : 1,
            	'home'  : AUTOMODE,
            	'remote': 'E68N15',
            	'body'  : AUTOMODE
            },
            'emergencyRepairer' : {
            	'build' : 1,
            	'home'  : AUTOMODE,
            	'remote': AUTOMODE,
            	'body'  : AUTOMODE
            },
            'rampartRepairer' : {
            	'build' : AUTOMODE,
            	'home'  : AUTOMODE,
            	'remote': AUTOMODE,
            	'body'  : AUTOMODE
            },
            'wallRepairer' : {
            	'build' : AUTOMODE,
            	'home'  : AUTOMODE,
            	'remote': AUTOMODE,
            	'body'  : AUTOMODE
            },
            'wallRepairer2' : {
            	'build' : AUTOMODE,
            	'home'  : AUTOMODE,
            	'remote': AUTOMODE,
            	'body'  : AUTOMODE
            },
            'claimer' : {
            	'build' : AUTOMODE,
            	'home'  : AUTOMODE,
            	'remote': AUTOMODE,
            	'body'  : AUTOMODE
            },
            'attackers' : {
            	'build' : AUTOMODE,
            	'home'  : AUTOMODE,
            	'remote': AUTOMODE,
            	'body'  : AUTOMODE
            },
            'towerRepair' : {
            	'build' : AUTOMODE,
            	'home'  : AUTOMODE,
            	'remote': AUTOMODE,
            	'body'  : AUTOMODE
            }
        },
        'E69N14' : {									
            'harvester' : {	
            	'build' : AUTOMODE,
            	'home'  : AUTOMODE,
            	'remote': AUTOMODE,
            	'body'  : AUTOMODE
            },
            'builder' : {
            	'build' : AUTOMODE,
            	'home'  : AUTOMODE,
            	'remote': AUTOMODE,
            	'body'  : AUTOMODE 
            },
            'builder2' : {
            	'build' : 1,
            	'home'  : AUTOMODE,
            	'remote': 'E69N13',
            	'body'  : AUTOMODE 
            },
            'builder3' : {
            	'build' : 1,
            	'home'  : AUTOMODE,
            	'remote': 'E69N15',
            	'body'  : AUTOMODE 
            },
            'upgrader' : {
            	'build' : AUTOMODE,
            	'home'  : AUTOMODE,
            	'remote': AUTOMODE,
            	'body'  : AUTOMODE
            },
            'guard' : {
            	'build' : AUTOMODE,
            	'home'  : AUTOMODE,
            	'remote': AUTOMODE,
            	'body'  : AUTOMODE 
            },
            'remoteUpgrader' : {
            	'build' : AUTOMODE,
            	'home'  : AUTOMODE,
            	'remote': 'E69N13',
            	'body'  : AUTOMODE
            },
            'remoteHarvester' : {
            	'build' : 2,
            	'home'  : AUTOMODE,
            	'remote': 'E69N15',
            	'body'  : AUTOMODE
            },
            'ldupgrader' : {
            	'build' : AUTOMODE,
            	'home'  : AUTOMODE,
            	'remote': AUTOMODE,
            	'body'  : AUTOMODE 
            },
            'repairer' : {
            	'build' : AUTOMODE,
            	'home'  : AUTOMODE,
            	'remote': AUTOMODE,
            	'body'  : AUTOMODE
            },
            'repairer2' : {
            	'build' : 1,
            	'home'  : AUTOMODE,
            	'remote': 'E69N13',
            	'body'  : AUTOMODE
            },
            'repairer3' : {
            	'build' : 1,
            	'home'  : AUTOMODE,
            	'remote': 'E69N15',
            	'body'  : AUTOMODE
            },
            'emergencyRepairer' : {
            	'build' : AUTOMODE,
            	'home'  : AUTOMODE,
            	'remote': AUTOMODE,
            	'body'  : AUTOMODE
            },
            'rampartRepairer' : {
            	'build' : AUTOMODE,
            	'home'  : AUTOMODE,
            	'remote': AUTOMODE,
            	'body'  : AUTOMODE
            },
            'wallRepairer' : {
            	'build' : AUTOMODE,
            	'home'  : AUTOMODE,
            	'remote': AUTOMODE,
            	'body'  : AUTOMODE
            },
            'wallRepairer2' : {
            	'build' : AUTOMODE,
            	'home'  : AUTOMODE,
            	'remote': AUTOMODE,
            	'body'  : AUTOMODE
            },
            'claimer' : {
            	'build' : AUTOMODE,
            	'home'  : AUTOMODE,
            	'remote': AUTOMODE,
            	'body'  : AUTOMODE
            },
            'attackers' : {
            	'build' : AUTOMODE,
            	'home'  : AUTOMODE,
            	'remote': AUTOMODE,
            	'body'  : AUTOMODE
            },
            'towerRepair' : {
            	'build' : AUTOMODE,
            	'home'  : AUTOMODE,
            	'remote': AUTOMODE,
            	'body'  : AUTOMODE
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

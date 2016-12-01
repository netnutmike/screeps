// Include Constants
require('constants');

// Global Options
global.gobalMode = AUTOMATIC;

// Rooms
global.home = "E68N14";


// Define the number of each type of screeps that are needed
// Setting a value other than AUTOMODE here overrises the automatic
// method of determining number of creeps per job based
// on room level and operating mode.

global.buildersToBuild = 1;
global.emergencyRepairersToBuild = 1;
global.guardsToBuild = 2;
global.harvestersToBuild = 3;
global.ldUpgradersToBuild = 1;
global.rampartRepairersToBuild = 1;
global.remoteHarvestersToBuild = AUTOMODE;
global.remoteUpgradersToBuild = AUTOMODE;
global.repairersToBuild = 1;
global.upgradersToBuild = 7;
global.wallRepairersToBuild = 1;


// Repairer Settings
global.startRepairingAt = 0.6;					// This is the percentage (in decimal form) that when a structure get below this the repairer goes to work

// Emergency Repairer Settings
global.minimumEmergencyRepairPercentage = .10;		// If any structure reaches this level or below, Emergency Repair mode starts
global.maximumInRepair = 50;						// If there are this percentage or more of the total structures at the % defined below, go into emergency repair mode
global.percentageForMaximum = .50;					// Works with the one above, this is the percentage of health to use with the # of structures
global.maximumInRepairToRelease = 10;				// Exit emergency repair mode once there are this many or less left at the above % of health
global.fixWhenIdlePercentage = .90;					// When emergency repair mode is, while the creep is alive, fix anything below this percentage

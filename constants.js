// This file will define constants that are used throughout the scripts

// Global Game Mode

global.MANUAL = 1;
global.AUTOMATIC = 2;


// Room Modes

global.NEWROOM = 1;
global.BUILD = 2;
global.GROW = 3;

// Builder Modes
// Automode and BUILD



// Creep Options Constants
global.AUTOMODE = -1;

global.NONE = -1;


// Destination and Source constants
//  AUTOMODE uses default
global.SPAWN = 1;						// This goes to spawn or Extentions
global.LINKSTORAGE = 2;					// This goes to either a link or storage whichever is closest
global.STORAGE = 3;						// This goes only to the Storage Structure
global.LINK = 4;						// This goes only to the Link Structure
global.ENERGY = 5;
global.STORED = 6;						// Any Stored Energy
global.STOREDANDLINKS = 7;				// Any stored energy and lnks
global.CONTAINER = 8;					// Containers

//Defense Modes
global.ONDEMAND = 1;
global.ATTHEREADY = 2;
global.DEFENSEPOSTURE = 3;
//var tasks = require('tasks');
var roleAttacker = {
attack: function(creep) {
  var controller = creep.pos.findClosestByPath(FIND_STRUCTURES,{ignoreCreeps:true,filter: (structure) => {return (structure.structureType == STRUCTURE_CONTROLLER)}});
  var targetHostile = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS,{filter: function(c) { return (c.getActiveBodyparts(ATTACK)+c.getActiveBodyparts(RANGED_ATTACK)+c.getActiveBodyparts(HEAL)>0)}});

  if (targetHostile) {
	  //console.log(creep.pos.getRangeTo(targetHostile));
	  creep.rangedAttack(targetHostile);
	  creep.attack(targetHostile);
	  creep.moveTo(targetHostile);
	  //console.log("A");
	  if(creep.attack(targetHostile) == ERR_NOT_IN_RANGE) {
		  creep.moveTo(targetHostile);
		  //console.log("Moving");
		  
	  }
  } else {
	  //console.log("B");
	  //console.log("1");
//    if (controller) {
    	//console.log("2");
      //Attack base, tower first
//      var targetTower = creep.pos.findClosestByPath(FIND_STRUCTURES,{filter: (structure) => {return (structure.structureType == STRUCTURE_TOWER)}});
//      var targetStructure = creep.pos.findClosestByPath(FIND_STRUCTURES,{filter: (structure) => {return (structure.structureType != STRUCTURE_CONTROLLER && structure.structureType != STRUCTURE_STORAGE && structure.structureType != STRUCTURE_CONTAINER && structure.structureType != STRUCTURE_ROAD&& structure.structureType != STRUCTURE_RAMPART&& structure.structureType != STRUCTURE_WALL)}});
//      var targetStructureAll = creep.pos.findClosestByPath(FIND_STRUCTURES,{filter: (structure) => {return (structure.structureType != STRUCTURE_CONTROLLER &&structure.structureType != STRUCTURE_STORAGE && structure.structureType != STRUCTURE_CONTAINER && structure.structureType != STRUCTURE_ROAD&& structure.structureType != STRUCTURE_WALL)}});
//      var targetConstructionsites = creep.pos.findClosestByPath(FIND_HOSTILE_CONSTRUCTION_SITES);
//      var targetCreeps = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
//      if (targetTower) {
//        if(creep.attack(targetTower) == ERR_NOT_IN_RANGE) {
//          creep.moveTo(targetTower)
//        }
//      } else if (targetStructure) {
//        if(creep.attack(targetStructure) == ERR_NOT_IN_RANGE) {
//          creep.moveTo(targetStructure)
//        }
//      } else if (targetConstructionsites) {
//        creep.moveTo(targetConstructionsites);
//      } else if (targetCreeps) {
//        if(creep.attack(targetCreeps) == ERR_NOT_IN_RANGE) {
//          creep.moveTo(targetCreeps)
//        }
//      } else if (targetStructureAll) {
//        if(creep.attack(targetStructureAll) == ERR_NOT_IN_RANGE) {
//          creep.moveTo(targetStructureAll)
//        }
//      } else return false;
//    } else {
      //Siege wall!!
      //creep.say('siege')
      var targetStructure = creep.pos.findClosestByPath(FIND_STRUCTURES,{filter: (structure) => {return (structure.hits<10000000 &&(structure.structureType == STRUCTURE_WALL || structure.structureType == STRUCTURE_RAMPART))}});
      if (targetStructure) {
    	  //console.log("....1");
        if(creep.attack(targetStructure) == ERR_NOT_IN_RANGE) {
        	//console.log("Moving to target");
          creep.moveTo(targetStructure)
        }
      } else if (controller) {
    	  //console.log(".....2");
    	  var targetTower = creep.pos.findClosestByPath(FIND_STRUCTURES,{filter: (structure) => {return (structure.structureType == STRUCTURE_TOWER)}});
          var targetStructure = creep.pos.findClosestByPath(FIND_STRUCTURES,{filter: (structure) => {return (structure.structureType != STRUCTURE_CONTROLLER && structure.structureType != STRUCTURE_STORAGE && structure.structureType != STRUCTURE_CONTAINER && structure.structureType != STRUCTURE_ROAD&& structure.structureType != STRUCTURE_RAMPART&& structure.structureType != STRUCTURE_WALL)}});
          var targetStructureAll = creep.pos.findClosestByPath(FIND_STRUCTURES,{filter: (structure) => {return (structure.structureType != STRUCTURE_CONTROLLER &&structure.structureType != STRUCTURE_STORAGE && structure.structureType != STRUCTURE_CONTAINER && structure.structureType != STRUCTURE_ROAD&& structure.structureType != STRUCTURE_WALL)}});
          var targetConstructionsites = creep.pos.findClosestByPath(FIND_HOSTILE_CONSTRUCTION_SITES);
          var targetCreeps = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
          
          if (targetTower) {
        	  //console.log("1");
            if(creep.attack(targetTower) == ERR_NOT_IN_RANGE) {
              creep.moveTo(targetTower)
            }
          } else if (targetStructure) {
        	  //console.log("2");
            if(creep.attack(targetStructure) == ERR_NOT_IN_RANGE) {
              creep.moveTo(targetStructure)
            }
          } else if (targetConstructionsites) {
        	  //console.log("3");
            creep.moveTo(targetConstructionsites);
          } else if (controller) {
        	  //console.log("4");
        	  if(creep.attack(controller) == ERR_NOT_IN_RANGE) {
                  creep.moveTo(controller)
                }
          }
    	  
    	  
      } else return false;
      
//    }
  }
  
  
  
  return true;

},
heal: function(creep) {
  var target = creep.pos.findClosestByRange(FIND_MY_CREEPS, {maxRooms:1,filter: function(object) {return object.hits < object.hitsMax}});
  var leader = creep.pos.findClosestByRange(FIND_MY_CREEPS, {maxRooms:1,filter: function(object) {return (object.getActiveBodyparts(ATTACK)>0)}});
  if(target) {
      creep.moveTo(target,{maxRooms:1});
      if(creep.pos.isNearTo(target)) {
          creep.heal(target);
      }
      else {
          creep.rangedHeal(target);
      }
      return true;
  } else if (leader) {
    creep.moveTo(leader);
    return true;
  } else {return false;}
  /*
  var findCloseFriends = creep.pos.findInRange(FIND_MY_CREEPS,5,{ filter: function(c) { return c.hits < c.hitsMax; }});
  findCloseFriends=_.sortBy(findCloseFriends, creep => (creep.hits/creep.hitsMax));
  if (findCloseFriends.length) {
    creep.say(findCloseFriends);
    if(creep.heal(findCloseFriends[0]) == ERR_NOT_IN_RANGE) {
      creep.moveTo(findCloseFriends[0]);
    }
    return true;
  } else {
    return false;
  }
  */
},

run: function(creep) {
  if (creep.room.name == creep.memory.remote) {
    //creep.moveTo(Game.flags[creep.memory.flag]);
	roleAttacker.attack(creep);
  } else {
	  //console.log("moving to exit");  
	  if (creep.memory.via != undefined && creep.memory.via != "" && creep.memory.via != null) {
		  if (creep.room.name == creep.memory.via) {
			  creep.memory.via = null;
		  } else {
			  var exit = creep.room.findExitTo(creep.memory.via);
			  creep.moveTo(creep.pos.findClosestByPath(exit));
		  }
	  } else {
		  var exit = creep.room.findExitTo(creep.memory.remote);
		  creep.moveTo(creep.pos.findClosestByPath(exit));
	  }
    
  } 
  
  if ((creep.getActiveBodyparts(RANGED_ATTACK)>0 || creep.getActiveBodyparts(MOVE)>0) && creep.getActiveBodyparts(HEAL)>0 ) {
	  creep.heal(creep);
	  //console.log("healing");
  }
  
}
};
module.exports = roleAttacker;
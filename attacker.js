var tasks = require('tasks');
var roleAttacker = {
attack: function(creep) {
  var controller = creep.pos.findClosestByPath(FIND_STRUCTURES,{ignoreCreeps:true,filter: (structure) => {return (structure.structureType == STRUCTURE_CONTROLLER)}});
  var targetHostile = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS,{filter: function(c) { return (c.getActiveBodyparts(ATTACK)+c.getActiveBodyparts(RANGED_ATTACK)>0)}});

  if (targetHostile && creep.pos.getRangeTo(targetHostile)<10) {
    if(creep.attack(targetHostile) == ERR_NOT_IN_RANGE) {
      creep.moveTo(targetHostile)
    }
  } else {
    if (controller) {
      //Attack base, tower first
      var targetTower = creep.pos.findClosestByPath(FIND_STRUCTURES,{filter: (structure) => {return (structure.structureType == STRUCTURE_TOWER)}});
      var targetStructure = creep.pos.findClosestByPath(FIND_STRUCTURES,{filter: (structure) => {return (structure.structureType != STRUCTURE_CONTROLLER && structure.structureType != STRUCTURE_STORAGE && structure.structureType != STRUCTURE_CONTAINER && structure.structureType != STRUCTURE_ROAD&& structure.structureType != STRUCTURE_RAMPART&& structure.structureType != STRUCTURE_WALL)}});
      var targetStructureAll = creep.pos.findClosestByPath(FIND_STRUCTURES,{filter: (structure) => {return (structure.structureType != STRUCTURE_CONTROLLER &&structure.structureType != STRUCTURE_STORAGE && structure.structureType != STRUCTURE_CONTAINER && structure.structureType != STRUCTURE_ROAD&& structure.structureType != STRUCTURE_WALL)}});
      var targetConstructionsites = creep.pos.findClosestByPath(FIND_HOSTILE_CONSTRUCTION_SITES);
      var targetCreeps = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
      if (targetTower) {
        if(creep.attack(targetTower) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targetTower)
        }
      } else if (targetStructure) {
        if(creep.attack(targetStructure) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targetStructure)
        }
      } else if (targetConstructionsites) {
        creep.moveTo(targetConstructionsites);
      } else if (targetCreeps) {
        if(creep.attack(targetCreeps) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targetCreeps)
        }
      } else if (targetStructureAll) {
        if(creep.attack(targetStructureAll) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targetStructureAll)
        }
      } else return false;
    } else {
      //Siege wall!!
      //creep.say('siege')
      var targetStructure = creep.pos.findClosestByRange(FIND_STRUCTURES,{filter: (structure) => {return (structure.hits<10000000 &&(structure.structureType == STRUCTURE_WALL || structure.structureType == STRUCTURE_RAMPART))}});
      if (targetStructure) {
        if(creep.attack(targetStructure) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targetStructure)
        }
      } else return false;
    }
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
  if (creep.pos.roomName == creep.memory.remote) {
    creep.moveTo(Game.flags[creep.memory.flag]);
  } else if( creep.room.name != creep.memory.remote) {
    var exitDir = Game.map.findExit(creep.room, creep.memory.remote);
    var exit = creep.pos.findClosestByRange(exitDir);
    creep.moveTo(exit);
  } else {


    if (creep.getActiveBodyparts(HEAL)>0 && roleAttacker.heal(creep)) {
    } else if (creep.getActiveBodyparts(ATTACK)>0 && roleAttacker.attack(creep)) {
    } else if (creep.memory.fleeAfter==true) {
      creep.say('suicide')
      creep.memory.role='suicide'
    } else if (creep.memory.flag){
      creep.moveTo(Game.flags[creep.memory.flag]);
    } else {
      creep.moveTo(creep.room.controller);
    }
     creep.sing('HoHoho|christmas is|comming|but only|coals for|YOU!');
  }
}
};
module.exports = roleAttacker;
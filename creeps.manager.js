var roleDefender = require('role.defender');

var creepsManager = {
    
    run: function(roomName)
    {
        // Define the number of each type of screeps that are needed
        var buildersToBuild = 0;
        var emergencyRepairersToBuild = 0;
        var guardsToBuild = 2;
        var harvestersToBuild = 3;
        var rampartRepairersToBuild = 1;
        var remoteHarvestersToBuild = 0;
        var remoteUpgradersToBuild = 0;
        var repairersToBuild = 1;
        var upgradersToBuild = 3;
        var wallRepairersToBuild = 1;
        
        //clear old entries
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                console.log('Clearing non-existing creep memory:' + name + ' who was a ' + Memory.creeps[name].role);
                delete Memory.creeps[name];
                
            }
        }
    
        // lookup how many of each type of screep we have
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        var remoteHarvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteHarvester');
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        var remoteUpgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteUpgrader');
        var ldupgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'ldupgrader');
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
        var emergencyRepairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'emergencyRepairer');
        var wallRepairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'wallRepairer');
        var rampartRepairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'rampartRepairer');
        var guards = _.filter(Game.creeps, (creep) => creep.memory.role == 'guard');
        

        // if then else tree to create screeps in priority order.  harvesters always take priority
        if (harvesters.length < harvestersToBuild) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, {role: 'harvester'});
            //var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'harvester'});
            if (newName != -6 && newName != -4) { console.log('Spawning new harvester: ' + newName); }
        } else if (remoteHarvesters.length < remoteHarvestersToBuild) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined, {
                role: 'remoteHarvester', 
                home: 'E68N14', 
                remote: 'E67N14'});
            if (newName != -6 && newName != -4) { console.log('Spawning new remote harvester: ' + newName); }
        } else if (roleDefender.enemiesInRoom(roomName)) {
            if(guards.length < guardsToBuild) {
                var newName = Game.spawns['Spawn1'].createCreep([TOUGH,TOUGH,TOUGH,MOVE,ATTACK,ATTACK,ATTACK], undefined, {role: 'guard'});
                if (newName != -6 && newName != -4) { console.log('Spawning new guard: ' + newName); }
            }
        } else if (upgraders.length < upgradersToBuild) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, {role: 'upgrader'});
        //    //var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'upgrader'});
        //    var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'upgrader'});
            if (newName != -6 && newName != -4) { console.log('Spawning new upgrader: ' + newName); }
        } else if (remoteUpgraders.length < remoteUpgradersToBuild) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, {
                role: 'remoteUpgrader', 
                home: 'E68N14', 
                remote: 'E67N14'});
            if (newName != -6 && newName != -4) { console.log('Spawning new remote upgrader: ' + newName); }
        //} else if (ldupgraders.length < 1) {
        //    var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, {role: 'ldupgrader'});
        //    //var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'upgrader'});
        //    var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'upgrader'});
        //    console.log('Spawning new ldupgrader: ' + newName);
        } else if (repairers.length < repairersToBuild) {
            
            //    var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'repairer'});
            //    var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'builder'});
                var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'repairer', currentRepair: ""});
                if (newName != -6 && newName != -4) { console.log('Spawning new repairer: ' + newName); }

        } else if (emergencyRepairers.length < emergencyRepairersToBuild) {
            
            //    var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'repairer'});
            //    var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'builder'});
                var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, {role: 'emergencyRepairer', currentRepair: ""});
                if (newName != -6 && newName != -4) { console.log('Spawning new emergency repairer: ' + newName); }

        } else if (rampartRepairers.length < rampartRepairersToBuild) {
            //    var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'repairer'});
            //    var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'builder'});
                var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,CARRY,MOVE], undefined, {role: 'rampartRepairer', currentRepair: ""});
                if (newName != -6 && newName != -4) { console.log('Spawning new rampart repairer: ' + newName) };

        } else if (wallRepairers.length < wallRepairersToBuild) {
            
            //    var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'repairer'});
            //    var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'builder'});
                var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'wallRepairer'});
                if (newName != -6 && newName != -4) { console.log('Spawning new wall repairer: ' + newName) };

        } else if (builders.length < buildersToBuild) {
            //var targets = Game.find(FIND_CONSTRUCTION_SITES);
            //console.log('construction sites: ' + targets);
            //if(targets.length || Game.rooms['E68N14'].memory.builderMode == 2)
            //{
                var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'builder'});
            //    var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'builder'});
            //    var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'builder'});
                if (newName != -6 && newName != -4) { console.log('Spawning new builder: ' + newName); }
            //}
        }

    }
}
module.exports = creepsManager;
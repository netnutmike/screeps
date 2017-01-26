# Walkthrough
## Overview
The purpose of this is to provide a step by step process to implementing these scripts in a new screeps account and room.  I am not 
going to detail how to create a screeps account so you need to have already setup your account with Steam and have purchased the 
screeps.game.

## Getting started
There are a few things that you need to do when getting started.  When you download the scripts from github, you are getting my latest active configuration and you need to sanitize the entries and adjust them for your new room before pasting them into screeps. 

The scripts will start working immediately once you paste them in so it best to adjust them first, otherwise you will start to get errors on the console right away.

First, you need to download the scripts from github.  If you are comfortable with a unix command line and have git installed you can also do a:
```
git clone https://github.com/netnutmike/screeps.git
```

Once you have the scripts, using a text editor open the settings.js file.  You will need to change the rooms variable with the name of your room.  My active config has more than one room and more than one room options setting as well.  It does not hurt to have more definitions for rooms than you have, but you do need to have at least the one you are controlling.

Now that you have the file opened, we need to go into screeps and get you a room.  I am going to leave this up to you.  There are many different opinions on what makes a good room and this is not the place to get into that, so go ahead and go into screeps and pick a room that you like.

Now that you have the room, you will need the room name for the next couple of steps.  In the settings.js file, change the first room name to your room.  The following is an example of what you need to change:
```
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
```

You need to change E68N14 to your room name.  Also, I would recommend that the room options be setup just like the example above.

Next, we need to make sure that the room options are all set to AUTOMODE.  For the first 2 levels AUTOMODE is the best option, by the end of the 2nd level you will have a feel for your room and can start overriding the AUTOMODE if you feel it is needed.  So now look for things like:
```
'builder' : {
            	'build'  : 2,
            	'home'   : AUTOMODE,
            	'remote' : AUTOMODE,
            	'body'   : AUTOMODE,
            	'source' : STORED,
            	'source2': AUTOMODE 
            }
```
And make them look like this:
```
'builder' : {
            	'build'  : AUTOMODE,
            	'home'   : AUTOMODE,
            	'remote' : AUTOMODE,
            	'body'   : AUTOMODE,
            	'source' : AUTOMODE,
            	'source2': AUTOMODE 
            }
```

Once that is complete, save the file.  Highlight and copy all of the files in the directory where you placed the scripts.  In screeps go to the script tab and click the Open local folder option.  You should now have a new window with the contents of the current scripts which should be empty or maybe main.  Paste in the scripts you just copied.

## Level 1

Immediately your spawn should build a harvester, it will continue to build 3 harvesters and then upgraders.  The first level is only 200 energies to get to level 2.  It is generally very quick.  

## Level 2
Once the room enters level 2, you should get an email and notice in the console that the room has entered new room mode.  At this point, you need to build the 5 available containers.

Be selective where you put these, most people put them close to the spawn or in between the spawn and energy source.  Within 100 game ticks of placing the first extention, the mode will change to build mode.  This will spawn additional builders but will also lower the count of upgraders.

Once construction is complete, the room will move into grow mode.  In this mode you have one builder (if needed) and more upgraders.  If the goal is to grow quick then, do not construct roads until the room has moved into grow mode.

If you construct roads or walls at the same time you construct the extentions, the room will stay in build mode until all construction has completed.  That is fine if that is how you would like to do it.  I sometimes will build roads through swamps during the build mode so that the workers can get relief quicker.

NOTE: If you are building roads through a swamp, it is best to build the road closest to the energy source first.  That way the creep will be able to get to build the road quicker than if you started on the other side and it has to walk through the swamp to get to the construction site.

Once the room enters grow mode, complete any construction you have left.  It will build slower but you will be a while for the next level anyways.  One thing you do not want to build yet is ramparts.  You can build them but it is hard to keep them safe because they age and go away very quickly.  Sometimes faster than you can build a rampart repairer.  In the next level we will be buildig a tower which will help solve this problem.  At this level you should still be in safe mode anyways.

In level 2 grow mode, I recommend that you build walls across every gateway to another room.  At this point you have no reason to be leaving the room, walls are cheap and very easily can be removed to build a rampart later.  This is just an extra step to keep you safe until you get stronger.

In all levels and modes, builders are only built if needed.  The same is true with rampart repairers, wall repairers, etc.  If they are not needed there is no need to waste the energy to build them.  This is good to know because it can help you decide if you want to build something now after the building is done or wait until your next build mode.

At this point to sit back and wait until the next level.  

## Level 3

Once you reach level 3 the room will go into new room mode and will be waiting for you to place construction.  Once you place construction the room will enter into build mode.  You want to place the 5 new extentions and the tower.  Tower placement is important.  It can reach the entire room but losing energy the further it goes.  I typically try to place the tower in the middle somewhere.  After your first room you will have a better idea where to place it for your next room.  You are constantly learning with this game.

As mentioned above, you can place more roads now or wait until the grow mode.  The more work there is to do for the build the longer it will take to get into grow mode.

Once the tower is built a new creep will be spawned to maintain the tower which keeps the energy in the tower up.  Once you see yellow in the tower, we can start to build the ramparts.  They build very quickly but you have to be careful how fast you build them.  To need to provide time for the rampart repairer to get them out of danger.  I typically build the rirst one and wait until the rampart repairer gets to it to build the 2nd one.

The tower will keep it safe but that is expensive for the tower to keep doing that.  So I let it keep one or two safe until the rampart repairer gets there and gets the rampart out of danger and then move on to the next.  Once the rampart repairer gets there it should be safe.  

One note on ramparts, use a few as possible, do not build an entire wall of them, they are very expensive to keep safe.  I used to use just one for each wall.  But if the path is going to be busy I do build 2 so that 2 creeps can go through.  When the rampart repairer is repairing and there is only one rampart, it blocks anything from going through it.

If you blocked in your room as suggested above, to place a rampart, click on the wall where you want to place it, on the right panel you will see CONSTRUCTED WALL, click on destry this structure at the bottom and confirm it.  Then constrcut your rampart where the wall was.

Each level takes more energy to advance to the next level, so sit back and be patient.  By this time you may start having ideas on how to improve performance over the default AUTOMODE, go experiment with changing settings.  Maybe you think you can handle another upgrader, increase the number is settings by changing the AUTOMODE to the number you want to spawn.

One thing to note, this game moves very slow.  Making a change in settings may take 1500 game ticks to be totally realized.  IF you decrease the number of upgraders for example because you are not getting enough energy, the number of upgraders does not change until they expire and go away which could be 1500 ticks if they were just spawned.  So make small changes and keep an eye on it.

The AUTOMODE numbers are conservative so that everthing builds safely.  And those numbers are being adjust frequenctly as I build a new set of rooms.

## Level 4

Once the room enters level 4, it again will go into new room mode.  Place the extentions first, then place the Storage.  Placement of this is strategic.  This can (and should) be used in future levels to feed the spawns, extentions, tower repair and other workers including upgraders.  There is probably not a perfect spot to handle all of that.  And in the next level we will be building links to cover the ones that we cannot.  Pick a place where you think it will work best.  This is one of those items that you will learn as you go.

Again, you can perform any other construction you want at this point or wait until it enters grow mode.

One the room enters grow mode, complete any construction.  If you have not created ramparts now is the time to do that as well.  Once you have ramparts or have open access to neighboring rooms, examine those rooms to see if they are good for harvesting energy from.  First, make sure they are not already occupied by another player.  If they are not, make sure they are not occupied by keeperlairs.

If everything looks good, there are a couple of options we can employ here.  We have the option to deploy remote upgraders and remote harvesters.  Remote upgraders will go to these other rooms that you specify and will harvest energy and come back and perform the upgrade on the room controller like the other upgraders.  

Remote harvesters will go to other rooms and harvest energy, they can bring it back and either deliver the energy like the regular harvester, deliver it to storage, links or containers.  To start out I would recommend delivering it to spawns or extentions, that is the default (or should be if the options were adjusted early in the process).  To setup a remote upgrader you need to setup the number you want to build (AUTOMODE is always 0 for this role) and the name of the remote room.  The same goes for the remote harvester.  Below are examples of 1 each going to 2 different rooms:
```
'remoteUpgrader' : {
            	'build'  : 1,
            	'home'   : AUTOMODE,
            	'remote' : 'E67N14',
            	'body'   : AUTOMODE
            },
            'remoteHarvester' : {
            	'build'  : 1,
            	'home'   : AUTOMODE,
            	'remote' : 'E68N15',
            	'body'   : AUTOMODE,
            	'dest'   : AUTOMODE
            }
```

You will have to play with how many you want to build.  It all depends on how many energy sources and positions each room has.  Plus there is the cost of building the creep for the position as well.

We will be using the remote harvester more and more as we progress through the levels.

Once your Storage construction is complete, you should also set the storage role to at least one to be build so that the storage can start to be filled up.  Storage can hold up to 1 million energies, it takes a long time to fill it, most of the time mone are never full.  Here is how to set it up for one creep:
```
'storage' : {
            	'build'  : 1,
            	'home'   : AUTOMODE,
            	'remote' : AUTOMODE,
            	'body'   : AUTOMODE
            }
```

If you are finding that you really do not need the remote harvester or you have another room you can use remote harvester 2 for, you can assign it to deliver it's energy to the storage by using the settings below (example uses the 2nd remote harvester role:
```
'remoteHarvester2' : {
            	'build'  : 1,
            	'home'   : AUTOMODE,
            	'remote' : 'E67N14',
            	'body'   : AUTOMODE,
            	'dest'   : STORAGE
            }
```

## Level 5


# screeps
I am new to screeps but want to put my code in case it helps anyone else.

This code started at level 4.  It is interesting to look through how far the code has advanced since the first upload.

There is still much automation yet to create, more than I even know of.

This code is very very ugly, once I get it all figured out I want to re-write it in Classes or at a minimum restructure and make it pretty.

The ultimate goal is to be able to create a room, drop this code and let the room grow on it's own with you only needing to put construction items when and where needed.

# TODO List
For the latest to do list look at the top of the main.js file.  That is where I am adding things as I think about them.  You will also find TODO: in the code.

# Walkthrough
I am going to start working on a step by step walkthough of starting from a new account and new room using these scripts.  I will e writing it as I start new on a private server so it will take some time.  It will be called walkthrough.md and will be part of the package you get from github.

# Wiki
I am going to start creating a wiki in my spare time that details all of the roles, functions, etc.  I do not have much spare time so it will take a while but will be good for me too as this is getting more and more complicated.

# Changelog
I am going to start putting details about my changes I upload here instead of in the commit messages.  This will also be like a diary as to what I was thinking so in the future I can look and see why did some of the stupid things I did.

## 1-25-2017
It has been a long time since I put an update out.  So long I am not sure I can remember everything that has changed.

* There are 3 new roles called reserve, reserve2 and reserve3.  They all will go to a room and reserve the controller of a room.  All the roles are exactly the same, that way you can be reserving 3 rooms per one of your rooms.
* role.attacker has been changed.  It does more now than before.  It looks for dangerous creeps first, then buildings, controllers, etc.  Then the innocent creeps.
* I can now be building 2 creeps at the same time in one room.  It will build on every available spawn in a room now.
* I removed the defender role from creeps.manager.  This is beacause of the next change and wanting to do the defender role to run with every clock tick.
* I have setup the main routine to call the creeps.manager process once every 5 game ticks.  I started to get excessive CPU errors and investigating what was doing it, the creeps manager doing all of the searches is what was causing the spikes.  Now the CPU bucket can build up for 4 of the game ticks.
* Attackers can now heal temselves if the have the healing body parts.

## 12-22-2016
It has been a while since I pushed an update out, and this one is LOADED with new stuff.  I have been playing with Storage, Containers and links and most of the changes in this update are related to that.  There are a few other things as well.

* I modified the remote harvester role so that the energy collected can be delivered to different destinations.  There is more detail down the change log that describes how to change the destination of the harvested energy.
* 2 new roles that are duplicates of remote harvester were created, they are named remoteHarvester2 and RemoteHarvester3.  They use the same module.  They are truly duplicates.  This was done so that you can remote harvest from more than one remote room.  If you want to harvest the energy from multiple rooms and place it in storage you need multiple remote harvesters.
* A new role called transferer was created, it's sole purpose is to transfer energy from a link to the storage container.  In my case I build the link and storage with one square between them, this creep sits in between and picks up energy from the link and deposits it into the container.  In the future this creep will also do the opposite and take energy from the storage and send it to another link.  
* A new role was created that is the same as the harvester but delivers the energy to the storage container.  This is to help build up the storage container.  This role will be modified in the future to deliver the energy to links and containers as well.  This was just a quick and dirty way to get energy into the storage as I was learning.
* A new role was created called spawnMaintainer that works similar to the harvester where it adds energy to the spawns and extentions.  However, the source of energy is the Storage container.  Since I have created and implemented this, the reports are showing that the wait is not for energy but for busy.  You have to be careful to make sure the energy spend from the Storage container is less than or equal to the energy that you are putting in.  I am running both the harvesters and the spawnmaintainers.  I do not recommend that you not run the harvesters as they are how the room would recover if the site got attacked and the creeps wiped out.
* I have modifed the harvesters to look for the STRUCTURE_STORAGE in the event that the Spawns and extentions are all full.  This means that they help to fill up the Storage container when there is nothing to fill up with energy.  In the future I will probably make the second destination configurable.
* I created a new role called Remote Storage which is like the name says, the same as the storage but pulls the energy from other rooms just like the remote upgrader and remote harvesters do.  This role will be decommissioned because the remote harvester has the ability to deliver energy to multiple destination types including the Storage containers that this role does.  This was created before the remote harvester was modified.
* I created a new role called eminer (energy miner) that is basically a harvester that can deliver the energy to a set of flexible destinations.  This role also has the ability to repair Containers that have an aging function to them.  This role can replace the original Storage role as it can deliver to Links, Containers and Storage.
* I created a new role called eminer2 which is an exact duplicate of the eminer role mentioned above.  This allows another eminer to have different delivery settings.
* I am not sure if I mentioned this is a previous change log or not, I cannot find it if I did.  There is a new role called claim.  This role simply goes to a room and claims the controller.
* I added a large list of constants to the constants.js file.  Most of them are around the new options for the rooms and roles that I have not yet listed.  There are a few that are important for changes that are listed further down the change log:
```
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
```

* I created a new process to manage the links.  As I found out, the links themselves have no logic.  This new process that is in the linkManager.js file is called by the timer.10ticks process and also by roles like remoteHarvester when they deliver energy to a link.  It basically looks at the settings file to determine what to do.  This is the process than manages the transfer of energy.  There is more to come with this but so far it is working good.
* In the settings.js file there is a new section for setting up how the links work.  It is setup on a per room basis.  The options are "to" which is a number of the index of the link you want to send energy to (if any), "maintain" which is the amount of energy that you want this link to hold (if any) and "from" which is the link you want to pull energy from if the maintain amount is greater than what is available.  I am currently using the index which goes by the order the link was created.  There may be a better way in the future.  It looks like this:
```
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
        	}
```
* There is a room options setting now for each room.  These are the defaults for the room.  Source and source2 are the default for roles that have a setting for where they get there energy from.  If the role is set to AUTOMODE then this is the value it will use.  Similarly the dest and dest2 are where the role delivers the enrgy to.  Again, these are only used if the dest or dest2 for the role is set to AUTOMODE.  Defensemode is the defense posture for the room.  This is still being implemented but will allow you to set the defense posture for a room.  Like defenseMode, energyMode is still being implemented.  The idea is to allow you to switch an entire room from harvesting energy to do things to using stored energy and putting all of the harvested energy into storage.
```
'roomOptions' : {
        		'source'      : ENERGY,
        		'source2'     : ENERGY,
        		'dest'        : SPAWN,
        		'dest2'       : SPAWN,
        		'defenseMode' : ONDEMAND,
        		'energyMode'  : ENERGY
        	},
```
* Certain roles now have the ability to set the source of energy and/or the destination of energy.  In those roles there are new options, there are 2 examples below.  For the builder, it is set to first try to pull energy from any stored energy, which is a Storage structure, a Container structure or link.  If it cannot find energy in any of those (or they do not exist) then it will look to see what the room default setting is for source2, which by the example in the previous item above is ENERGY, so it will go start to harvest energy.  For the eminer, it's source is set to the default which again is ENERGY but it also has a dest and dest2.  The first destination it will look for is CONTAINER, if it cannot find any or they are all full then it will look for STORAGE to deliver it's energy to.  If a role has the source or destination options and they are not set (undefined) then the room default it used.
```
'builder' : {
            	'build'  : 2,
            	'home'   : AUTOMODE,
            	'remote' : AUTOMODE,
            	'body'   : AUTOMODE,
            	'source' : STORED,
            	'source2': AUTOMODE
            },
'eminer' : {
            	'build'  : 3,
            	'home'   : AUTOMODE,
            	'remote' : AUTOMODE,
            	'body'   : AUTOMODE,
            	'source' : AUTOMODE,
            	'dest'   : CONTAINER,
            	'dest2'  : STORAGE
            }
```
* Towers can now repair ramparts, roads and walls.  Previously the towers could repair ramparts but it was at a fixed percentage.  This is because ramparts age quickly.  I was looking at other rooms and seeing how others are doing things and I saw some rooms that had a storage and tower right next to each other.  They were using the tower to make road, rampart and wall repairs.  That could be more efficient than having a creep go do all of that.  So I modified the tower to repair these 3 items.  I have not experimented yet to compare the efficiency.  There are options in the settings for this now.  Below is an example.  In this example ramparts will be repaired up to .03%.  I have walls, roads and containers set to not repair at all.  This may eventually get moved to a room by room setting.
```
// Tower Modes  (They always defend)
global.rampartRepair = .0003			// To disable place a 0 in this option
global.wallRepair = 0;					// To disable place a 0 in this option
global.roadRepair = 0;					// To disable place a 0 in this option
global.containerRepair = 0				// To disable place a 0 in this option
```
* I created an self suicide routine.  So far it is only applied to roles that either leave the room or are frequently on the edge of the room where they can get attacked.  There is still more to come with this.  For now, it changes the role to suicide so that it is considered dead.  But if it is under attack, is it better to let it stay around so the hostile creep has something to target?  Still thinking this one out.
* When new rooms were created, the default room mode was not set, this caused errors.  This became very obvious when I setup a local server to test on and the first room was created.  To solve the problem, the creeps.manager now checks to see if there is a mode set and if not, puts it into newroom mode.
* A few new functions were added to the roomsManager to accomodate the new options for links, these new functions are getLinkTo, getLinkMaintain and getLinkFrom.
* The getMemorySettings functions in roomsManager has been modified to add the new source and dest options.
* Minor modifications to the stats report that is emailed.  There will be some more modifications coming up soon as well.


## 12-09-2016
Today's changelog starts out with the anatomy of an attack and a short story.  These will explain the changes in the change log for today.

I have been very focussed on automating the process of getting to the next level, building and growing.  And in the last change list I made some adjustments to the priorities of what creep get's built first.  For example, primary is the local havesters so they get energy and you can build more, then I had the remote havesters to get even more energy faster.  Because of some previous repair issues, repairers are next, then upgraders and then remote upgraders and then finally builders.

I started to get attacked by the RPC with 2 invaders while I was sleeping, when I got up and saw in my email that my room had been under attack for almost 3 hours I went immediately to the computer.  They had not broken through the walls but had destroyed a few roads outside the wall.  But my tower was empty of energy and there was very little energy and hardly any creeps.  I watched for a while to see what was happening and in a few minutes took what might be considered the cheaters way out and put the room into safe mode.  I have never used a safe mode after the initial one that you get when you create the room.

I determined the following problems.  First, I have been relying on my regular harvesters to keep the tower energy filled.  It is just one of the things they find and since it was built in level 3, after the spawn and the fist 10 exentions are full they go fill it up until it is full then go to extention number 11 and keep going.  This is a flaw because during that attack it emptied quickly because there were 2 invaders.  My defenders require energy from about 13 of the extentions.  So exentions 11 - 13 were never getting filled.  On top of that, I was sending remote harvesters to their death because the invaders would take them out as soon as they got close.  I was stuck in a constant loop of building remote harvesters and trying to keep the tower powered up.  When the harvesters would catch up enough for the remote havesters they would put a little energy into the tower and it would fight back for a litle bit and run out again.  The one invader was basically dead and the other one was injured pretty good so I think eventually it would have worked itself out, but not ideal.

Here are the changes that have been made to hopefully make the situation better during the next attack:

* I changed the build priory in creeps.manager.  Now, all creeps that work within the room have priority over any creep that leaves the room to do it's work.  That means that the room shoud stabilize faster exspecially when there is an attack situation.  It might take longer to get the remote stuff working and the energy will grow slower but while in an attack, operations inside the room will continue.
* For all of the creeps that are built and sent to another room, before I spawn a new creep, I first check to see if there are hostiles in the room, if there are then the creep is not spawned because I could be sending them to their death witch is a waste of energy and time.
* I created a new role called towerRepair.  This creep will only spawn if the tower is not at 100% capacity.  The build priority is just after teh defenders and they are just after the harvesters so it is high on the list.  If this creep finishes getting the tower to 100%, it will revert back to tehjob of a regular havester, might as well not waste them if they get done quickly.
* Because of the new role above, the harvesters have been modified to only provide energy to spawns and extentions.
* I changed how creeps.manager outputs new builds of creeps.  It used to be a console.log for every creep type in the if then else.  I now have added jobTitle and created one alert after all of the if statements.  It is using the new alert routine so output can be adjust to the console and email.  I also setup an alert that is just one level short of debugging that will output when it wants to spawn something but cannot.  My long term goal is to eventually keep stats on an unable to build situation.  That can help make changes to accomodate the number of different roles.  For example, if you are frequently short on energy you can make adjustments to build less expensive creeps, fewer of them or maybe add a remote harvester.
* I added to the outputs section mentioned above, counters so that when the stats report runs it can provide details about how much wait time there is to build and the reason for the wait time.  This can be useful to make adjustments to the game setings for that room.  I have not yet modifed the stat emails to do the calculations.
* I modifed the stats report to provide stats about the wait time as mentioned above.  The stats are per room so you can reivew how your rooms are working.
* When I first created the stat reports I had them sending out twice a day at 8 am and 8pm.  That is 1am and 1pm UTC.  These values were hard coded into the timer routine.  Now there is an option in the settings file that allows you to add as many hours to an array that you want the report to run.  If you want it once, great.  Want it every hour you are awake, fine too.  The hours are still UTC as that is the clock that the screeps server is set to.
* Here is an example of what one of the stat reports looks like for my 2 rooms:
```
(SL)=== Current Game Stats: ===

 == GCL ==
   GCL: 2
   progress to next level: 2691186 / 4278031.643091577  62%

 == Overall Stats ==
   Rooms: 6
   Creeps: 49
   Spawns: 2
   Structures: 88
   Construction Sites: 61
   Time: 15895854
   
(SL) == Rooms ==
   = E68N14 =
    ** CONTROLLED     Energy: 700 / 2300   30 %
     Current Level: 6
     Next Level Progress: 1022724 / 3645000   28 %
     Safemode Countdown: * Not in SafeMode *
     Safemodes Available: 3
     Safemode Cooldown Countdown: * No Cool Down *
     Ticks till Downgrade: 60000

     Memory:
       Mode: 3
       builderMode: -1
       lastLevel: 6
       rampartRepairValue: 0.04600000000000003
       emergencyRepairMode: 10
       wallRepairValue: 0.000360000000000
       
(SL) == Rooms ==
   = E68N14 Stats =
       Ticks since last report: 100
       Ticks waiting to build creeps: 0   which is 0% of total ticks
       Waiting breakdown:
          Busy     : NaN%  (0 ticks)
          No Energy: NaN%  (0 ticks)
          Other    : NaN%  (0 ticks)
          
 (SL)
     Creeps in E68N14:
       upgrader: 6
       harvester: 3
       remoteUpgrader: 3
       wallRepairer: 1
       builder: 1
       emergencyRepairer: 1
       remoteHarvester: 5
       repairer: 1
       rampartRepairer: 1
       repairer2: 1
       repairer3: 1
       
(SL) == Rooms ==
   = E69N14 =
    ** CONTROLLED     Energy: 657 / 1800   36 %
     Current Level: 5
     Next Level Progress: 145360 / 1215000   11 %
     Safemode Countdown: * Not in SafeMode *
     Safemodes Available: 2
     Safemode Cooldown Countdown: * No Cool Down *
     Ticks till Downgrade: 40000

     Memory:
       Mode: 3
       builderMode: -1
       lastLevel: 5
       rampartRepairValue: 0.054000000000000034
       emergencyRepairMode: 10
       wallRepairValue: 0.000450000000000
       
(SL) == Rooms ==
   = E69N14 Stats =
       Ticks since last report: 100
       Ticks waiting to build creeps: 15   which is 15% of total ticks
       Waiting breakdown:
          Busy     : 40%  (6 ticks)
          No Energy: 60%  (9 ticks)
          Other    : 0%  (0 ticks)
          
 (SL)
     Creeps in E69N14:
       upgrader: 7
       wallRepairer: 1
       builder: 1
       remoteUpgrader: 3
       builder3: 1
       repairer2: 1
       emergencyRepairer: 1
       remoteHarvester: 2
       harvester: 3
       repairer: 1
       rampartRepairer: 1
       repairer3: 1
       guard: 1
       towerRepair: 1                                   
```


## 12-07-2016
* Created a stats.js file that when run will generate and email out game details like levels, progress to next level, room stats about level, memory settings, resources, creeps and their jobs, etc.  I setup a Date check function in the 100 ticks routine to check for when it is between 8 am or pm and 8:16.  If it is, the stats are run and emailed out.
* I modified all of the roles that look for a source of energy.  It used to be that every clock tick they would try to find the closest energy.  The findclosestbypath is a very expensive CPU operation.  Now, when they go looking for n energy source they run the findClosestByPath and remember the structure.  On the next clock tick they head towards that source without calculating the path, saving CPU time.  There is one negative side affect to this.  If while enroute to an energy source, all of the positions get full or the source runs out of energy, it will keep heading to that source.  The old way, it would change its course to the next closest source.  I can probably write some code that can check the source on each clock tick and if that happens, re-run the findClosestByPath process and keep going.  I have not done that yet.
* I have been tweaking values in the roomsManager values for each level.  I have a new room coming up through the levels and am adjusting as it progresses.
* I have started marking some messages with (SL) and (TX).  Any message that goes to my gmail from screeps with a (SL) will get posted to my screeps slack channel.  Any message that has (TX) will go to my slack channel and get texted over SMS.  This allows me to determine what additional notification I want to receive other than email.  I am doing by 2 applets in IFTTT.
* I am still modifying some of the old console.log and Game.notify code as I am finding it.
* I modified the defender.js to use the tower to repair ramparts that are close to going away.  Ramparts start out with a very low health and decay quickly.  If there is not a repairer there within 200 ticks it goes away.  If my builder is moving quickly, I might not get a repairer there that fast.  I do not spawn any rampart repairers unelss there are ramparts.  In the fast build process sometimes that repairer is a lower priory and may take a little bit to get spawned and then has to mine energy before it can sart the repair.  This just helps keep them alive long enough for a repairer to get there.
* I started on the stats calculation that will be used in remoteHarvesters and remoteUpgraders.  It will look at how long it takes it's trips and calculate if it costs more to build the creep than the energy that it harvests.  I am writing it currently on remoteHarvesters and will port it to remoteUpgraders once I get it working reliably.  If it thinks it is not efficent it will send a game notification with the details about each leg of it's trip.  There may be some adjustments that can be made.  I can see taking this a little further later to help tune even roles that are bringing in more energy than they cost.
* I changed the order of the statements in creeps.manager so that certain repairers have a higher priority.  The new room was so busy creating things that it did not create the rampart upgrader for while right after they were built and they got dangerously close to being destroyed.  This would normally not be a big deal after they have been established for a while but when the room is young it can make a big difference.  The rampart repairer is more important than spawning another upgrader.

## 12-06-2016
* Added body option to settings so that they can be overriden if needed on a per room per role basis.  If set to AUTOMODE then the same body parts are returned just like before.
* Modified builder role to look at the remote for the room to go build in.  Home should still be set to the room where it was spawned.  This is so that the active count routine can determine how many of this role it actually has based on the home memory setting and not the number in the current room.
* Modified repairer to work like builder mentioned above.  It now understands both home and remote and will go repair in whatever room is set in remote.
* created a routine in builder to look for work in the room where it is to go to.  This is used in screeps manager to see if a builder is needed in the remote room or the home room based on options in settings.
* created a builder2 and builder3 roles.  The actual work code is still role.builder, but now you can have 3 different builders doing different rooms, etc.  In every level, the default is 0 of builder 2 and builder3.  To activate them you have to override in the options.  This is how I am sending builders to other rooms to do work without affecting my home room builders.
* Created a repairer2 and a repairer3 role.  It uses the exact same code module as the regular repairer role.  In the work role.controller it has all 3 role names in the case for role.repairer.  This was done so that I can send repairers to other rooms without affecting my home room.  By default every level is set to 0 of both new roles.  To activate the roles you need to override the default and change from AUTOMODE to a number to spawn for each room.
* I moved the roleDefender call from the main loop to the creeps.manager.  In the main loop it was only calling the home room.  I could have added another for the 2nd room but since creeps.manager is called for ever room it seemed more logical to just place it in screeps.manager.
* I added a new function in a new file called alerts.  Instead of doing a console.log or Game.notify, you now call this function with a alerts level and the message.  The lower the number the more important.  For example, Attacked and level changes are level 1, new creeps are level 2, old creeps memory erasing is level 3, more details like rampart repair levels increasing are level 4, level 5 is the first debugging and 6 is the insane debugging level.  In the settings.js file you can set what level you want to write to the console and the level that you want to get an email for.  I am still going through code converting to this new function.
* In roomsManager I added 2 new functions: getRemoteRoom and getHomeRoom.You pass in the room name and the role and you get back either the remote room or the home room name.  This is used when looking for work in a room as mentioned above in the a prior change today.

## 12-05-2016
* Modified screepsManager to not create rampart repairers if there are no ramparts.
* Modified screepsManager to not create wall repairers if there are no walls.
* Modified the emergencyRepairMode to look at each room independantly so that the entire game does not go into emergency repair mode.  This was mosly a change in the 20 second timer to loop rooms.

## 12-04-2016

Today's updates were not really planned to be this fast.  I thought I had a few days before I would be going to multiple rooms but my neighbor who was on both my west and east side respawned to start over.  He said he was not coming back to them so I setup shop in the room to my east and started harvesting from the west as well.  The following changes were made in real haste but so far seem to be working.  There are a few things that you will see in the main.js files at the top that are notes of things that are not working.

* Finished the roomsManager code.  Added some more code to return the memory objects as well.  There were a lot of little changes to this file.  There are some new roles that needed added, etc.
* In the screeps manager there are lots of changes.  The first was to change the filters to look for number of creeps per role per room.  This still needs some more work because if you set a creep out on a remote job, it lowers the count when it leaves the room.
* In Screeps manager, now every creation looks to roomsManager to get the correct body parts and the correct memory settings based on the level of the room, and the current mode of the room.
* In screeps manager, the number of creeps per role is determined based on the current level of the room and the mode of the room.
* In screeps manager, it now uses the room name that is passed in to detemrine what needs to be done for that room.
* In main.js there is a second line to handle the new room, I started working on a loop togo through all rooms but never got around to completing it.
* In settings there is not a structure to define the options for each room.  If in AUTO mode everything is based on the level and mode of the room.  Things can be overriden here.  This is where I changed a couple of parameters to get the upgraders and builders over to the new room until the spawn was built.
* I wrote an attacker role because my neighbor had walls up that I needed to get through in both rooms.  This was my first attempt at this and it needs to be completely re-written.
* I modified both the wallRepairer and rampartRepairer to store the current repair value in the room and not the game level memory where it was.  There is still more to chnage in there if my little test works which I suspect it will but did not want to break anything before I went to bed.
* I started working on a new upgrade role that I hope to use as the single upgrader code for both in room and out of room uprading.  For now due to the time crunch I was under I wrote something just to keep upgraders working on the new room controller until I could get it to level 2 where I could build a spawn.  These are no longer in use but it is a good base to build a flexible module.
* I put my first attempt at automating the room into the 100 tick timer.  Every 100 ticks it will look to see if the level has changed.  If it has it will put it into NEWROOM mode (which for now is the same settings as it was at the previous level) and send an email.  The email states that constructions sites need to be created.  Once they are and the timer fires, it will move into BUILD mode until all consutruction has been completed, once it sees that construction is complete it will move in the GROW mode which.  In every mode a builder is created if there is a need for a builder but non will spawn if there are no construction sites.  But in BUILD mode more of them spawn.


## 11-30-2016

* Added 3 timers, one that fires every 10 game ticks, one that fires every 20 game ticks and one that fires every 100 game ticks.  I am going to put some automation stuff in these timers becuase some things do not need to be checked every game tick.  I am already startig to see CPU spikes so the more work I can defer if it is not needed the better.
* I setup the builders to not spawn if there are no construction sites.  Why build a builder if they are not needed.  As soon as a construction site pops up, it will spawn whatever the builder count is for this level.
* I setup the wall repairer so that if there are no builders, to spawn twice the size of the regular wall repairer.  This was in an effort to speed up the wall repairs.  My current room has A LOT of walls.  Plus I did not know better and I made them double width.  Hopefully they will get more work done faster when there is no construction going on.
* I created a new automatic mode that I mentioned yesterday.  Using the timers mentioned above, every 20 ticks I check to see if there is a need for an emergency repairer.  I based that on some variables that are easily adjusted.  My initial try that is running now is that if any structure gets to 10% or below or there are more than 50 structures at 50% or below then there is a need to enable the emergency repairer mode.  The emergency repairer will stay until there are less than 10 in need of repair at 50%.  When it starts, it looks for any structure that is below 10% and fixes them first, then goes to 20, then 30 then 40 and then on to 50.  That way the structures that are in the worst shape are tended to first.  Once it is less than 10 at 50% it will exit the emergency repair mode and there will be no more spawns of the emergency repairer until it is needed again.  In the future I will adjust the different chagne points for number of things needed to be repaired to a percentage.  50 works good for my current room but I have a lot of roads.  With less roads that number would not make sense.
* I created a new file called settings where I am defining options for how the scripts run.  This will be the one file where adjustments can be made.  This saves going through all of the code to make changes in multiple files.  This is pretty small at the moment but it will grow quickly, especially when I have to start settings options for multiple rooms.
* I created a constants file, similar to the settings file above so that constants for commonly used items can be created for ease of readability, consistency, etc.
* I converted the long list of if then statements that were used in every loop for every creep to send it to the correct job.  I converted it to a case statement.  If the first it statement matched, every one below it would check too.  That is inefficient, with the case, once it finds it it drops out.  Plus it looks much neater now.
* I modified the emergency repairer a little more, once the criteria for exiting the mode the emergency repair creep stopped working.  I modified it so if it is done in emergency mode, it will keep working until it dies fixing anything that is less than 90% health.  That can help the regular repair creep get some more work done before it is time.
* I added some more to the rooms manager, getting closer to getting back all of the details based on room level and room mode.  I need to figure out to handle multiple rooms when I do this so I do not have to come back and re-write that.  I am getting much closer to multiple rooms now.  I have some stuff already but need to make it easy to configure.

## 11-29-2016

* Change the repairer role to deliver all of the energy the repairer has or until the structure being repaired is 100% fixed.  This was causing a problem.  It was repairing a structure when it got below 50%.  But it would only repair to just over 50% so it was going back to that same structure frequently and not visiting other structures.  Because I am just looping by the structure ID it always starts at the same place.  I figured this out when I started seeing my roads disapear.  This prompted me to create a new role called emegencyRepairer (See next change).
* I created a new role called emergencyRepairer as mentioned above.  This creep is larger than the repairer creep and instead of looking at the first thing it finds that needs help it looks at the 3rd one if there is one or the second one if there are only 2 and it will fallback to the first one if there is only one.  The reason was so that the workload can be spread out easier.  This will not be a regular creep, I plan on making an emergency repair mode that is automatic so if something like happened to me where the repairer would stop working or get really behind, this creep would spawn and help out until things are caught up.  More on this later as I have not written all of the logic yet.
* I changed how the creepManager decides what needs to spawn.  It was done as an independant set of if statements to see what needed a spawn.  The problem was, some things would not spawn because there was not enough energy but a smaller creep would spawn and use the energy.  This was happening to my harvesters.  So now, I am using if then else statements and the creeps needs are looked at in order of priority.  So if a harvester is needed, it has top priority, nothing else will spawn until that need is met.  This seemed to fix my running out of harvesters issue, however I still want to create the emergency recovery mode, just in case you are attacked and wiped out.
* I created a new role for repairing ramparts called rampartsRepairer.  I had this grouped into the regular repairer role first.  However, because of the previous discussion on the problem I had with the repairer I broke it out.  And it is better this way.  I now have a dedicated repairer for the ramparts.  Since they are created with very little hit points left and decay quickly I did some things a little different.  Instead of going to one and sticking with until it is 50% or more healthy (at 10 millions hit points and starting out at 100 hit points, that would take one repairer days) I started a search for a rampart that is less than .01% healthy, I then go to each of them and use up the entire energy store in my creep to repair as far as I can.  Once that rampart is now more than .01% healthy I go the next one and do the same thing.  Once all ramparts are healthy above .01% I increase to .02% automatically and do it all over again.  This will slowly walk up the health of all of the ramparts.
* Similarly to the ramparts repairer, I did the same thing with the walls.  When they are built, paper walls would be stronger, they are created red (which I did not know what that meant originally).  With a total health of 300 million and a starting health of 10 I think, it could take months for a single creep to repair just one piece of wall.  I took the approach I did with ramparts, I start looking for .0001% health and repair them to above that.  Once they are all above .0001% I increase that to .0002% automatically and start all over and it just keeps going.  It is not fast but it is consistent.  I am thinking of creating a special version of the creep when there are no builders building stuff.  Look for that later.
* I created a remoteHarvester role that will go to a different room to harvest energy and bring it back and deliver it like a regular harvester.  This was an experiment and I tried all kinds of different body part configurations to see which one worked the best.  The room I was harvesting from was to my west and my neighbor to the east wanted to take over that room so I had to shut these down.  More to come on these later when I get another room.
* I created a remoteUpgrader role that like the remoteHarvestor role above goes to another room to harvest energy and brings it back to upgrade the room controller.
* I modified the builders to look for the closest source for energy.  They were originally hard coded to go to a specific energy source.
* I modified the harvesters to look for the closest source for energy.  They were originally hard coded to go to a specific energy source.
* I cleaned up the console log output so it is less busy when a creeps is needed to spawn or one does.  I also added an output when one expires to you can see what type of creep expired.
* In the creeps manager I put at the top constants for the number of each type of creep so that it is no longer needed to go scrolling through a bunch if if then else statements looking for the right thing.  Once the room manager is complete, this would be how to override the automation process.

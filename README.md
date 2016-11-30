# screeps
I am new to screeps but want to put my code in case it helps anyone else.

This code is as of level 4.  I have looked at others code and adopted it.  This is very much still a work in progress.  I have not yet written any code to advance and take over other rooms.

I just finished a basic defense system with a tower and also defense creeps will be created if a hostile creep enters my room.

There is still much automation yet to create, more than I even know of.

This code is very very ugly, once I get it all figured out I want to re-write it in Classes or at a minimum restructure and make it pretty.

The ultimate goal is to be able to create a room, drop this code and let the room grow on it's with you only needed to put construction items when and where needed.

# TODO List
For the latest to list look at the top of the main.js file.  That is where I am adding things as I think about them.  You will also find TODO: in the code.

# Changelog
I am going to start putting details about my changes I upload here instead of in the commit messages.  This will also be like a diary as to what I was thinking so in the future I can look and see why did some of the stupid things I did.

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

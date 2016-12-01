
var timer100Ticks = {
    
    run: function()
    {
    	// Initialize if it has never been setup before

        if (Memory.hundredTicks == undefined)
        	Memory.hundredTicks = 0;
        
        if (Memory.hundredTicks <= Game.time)
        	{
        	Memory.hundredTicks = Game.time + 100;
        	//console.log("100 tick timer just fired");
        	}
    }
};

module.exports = timer100Ticks;
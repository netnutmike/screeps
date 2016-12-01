
var timer10Ticks = {
    
    run: function()
    {
    	// Initialize if it has never been setup before
        if (Memory.tenTicks == undefined)
        	Memory.tenTicks = 0;
        
        if (Memory.tenTicks <= Game.time)
        	{
        	Memory.tenTicks = Game.time + 10;
        	//console.log("10 tick timer just fired");
        	}
    }
};

module.exports = timer10Ticks;
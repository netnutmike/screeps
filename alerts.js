
var alerts = {
    
    newAlert: function(level,message)
    {
    	if (level <= consoleLogLevel)
    		console.log(message);
    	
    	if (level <= alertLevel)
    		Game.notify(message);
    }
};

module.exports = alerts;
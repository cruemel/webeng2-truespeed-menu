Ext.define('Truespeed.view.Start', {
    extend: 'Ext.Container',
    xtype: 'startView',
    id: 'startScreen',
	
    requires: [
        'Truespeed.view.Home', 'Truespeed.view.Chart', 'Truespeed.view.Text'
    ],
    
    config: {
    
    	layout: {
        	type: 'card'
        },
    	
    	items: [		
        	{
            	xtype: 'homeView'
        	},
            {
            	xtype: 'chartView'
            },
           	{ 
    			xtype: 'textView'
            },
    	]
    }
});
							
							
							
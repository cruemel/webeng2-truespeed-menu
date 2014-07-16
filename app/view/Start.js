Ext.define('Truespeed.view.Start', {
    extend: 'Ext.Carousel',
    xtype: 'startView',
    id: 'startScreen',
    
    requires: [
        'Truespeed.view.Home', 'Truespeed.view.Chart', 'Truespeed.view.Text'
    ],
    
    config: {
    
    	layout: {
            type: 'card'
        },
        
    	// direction: 'horizontal',
        
        items: [ 
            {
                xtype: 'homeView'
            },
            {
                xtype: 'chartView'
            },
            {
                xtype: 'textView'
            }
        ]
    
    }
    
});

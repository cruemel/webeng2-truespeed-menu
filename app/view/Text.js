Ext.define('Truespeed.view.Text', {
    extend: 'Ext.Container',
    xtype: 'textView',
    id: 'textScreen',
    
    requires: [
        'Ext.Button'
    ],
      
    config: {
    	
        layout: {
            type: 'vbox'
        },
        
        styleHtmlContent: true,
        scrollable: true,
        
        items: [
        	{
        		xtype: 'panel',
				id: 'summary',
				cls: 'textview',
				html: "<p>Sorry, but no data yet.</p>"   
            },
            {
               	xtype: 'button',
               	id: 'enterBtn',
                text: 'Get your speed',
                margin: '2% 10%',
            	ui: 'confirm'				
            }
        ]
        
    },
    
    initialize: function() {
		this.callParent(arguments);
    	this.on("activate", function() {
			Truespeed.controller.Functions.calculate();
            	
            var mapButton = Ext.getCmp('mapBtn');
            mapButton.hide();
        		
        	var users = Truespeed.controller.Functions.getUsers();
        	if (users.name != "Mario") {
				var button = Ext.getCmp('enterBtn');	
				button.hide();		
            }
		});
	}
	
});

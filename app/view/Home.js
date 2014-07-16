Ext.define('Truespeed.view.Home', {
    extend: 'Ext.Container',
    xtype: 'homeView',
    id: 'homeScreen',
    
    requires: [
        'Ext.Img'
    ],
      
    config: {
    	
    	layout: {
            type: 'vbox'  
        },
        
        styleHtmlContent: true,
           	
        items: [ 
            {
            	xtype: 'panel',
            	id: 'tagline',
            	flex: 1,
            	cls: 'textview',
            	html: '<p>Mario has a speed of ? km/h.</p>'
            },
            {
            	xtype: 'image',
            	id: 'vehicleImg',
            	flex: 6,
            	src: 'resources/images/car.png',
            	width: '100%',
            	height: 'auto'
        	},
        	{
        		xtype: 'panel',
            	id: 'vehileCap',
            	flex: 1,
            	html: [
					"<p>(Click on the vehicle, to compare the speed.)</p>"
				].join(""),
				style: {
					color: 'gray',
					fontSize: '0.9em',
					textAlign: 'center'
				}	
			}
    	]
    	
    },
    
    initialize: function() {
		this.callParent(arguments);
		
		this.on("activate", function() {
			Truespeed.controller.Functions.updateTagline();
			Truespeed.controller.Functions.updateImage();
            var mapButton = Ext.getCmp('mapBtn');
            mapButton.hide();
		});
	}
    
});

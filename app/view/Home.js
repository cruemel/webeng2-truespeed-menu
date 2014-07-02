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
        scrollable: true,
           	
        items: [ 
            {
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
            	height: 'auto',
            	listeners: {
    				tap: function() {
        				var mainView = Ext.getCmp('mainScreen');
            			mainView.setActiveItem(Ext.getCmp('chartScreen'));
            		}
   				}
        	},
        	{
            	id: 'vehileCap',
            	flex: 1,
            	html: [
					"<p>(Click on the vehicle, to see a speed comparison)</p>"
				].join(""),
				style: {
					color: 'gray',
					fontSize: '0.9em',
					textAlign: 'center'
				}	
			}
    	],
    	
    	listeners: {
            painted: function() {
        		Truespeed.controller.Functions.updateTagline();
        		Truespeed.controller.Functions.updateImage();
        		var backButton = Ext.getCmp('backBtn');
            	backButton.hide();
        		var mapButton = Ext.getCmp('mapBtn');
            	mapButton.hide();
            }
        }
    }
    
});

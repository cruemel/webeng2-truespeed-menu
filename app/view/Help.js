Ext.define('Truespeed.view.Help', {
    extend: 'Ext.Container',
    xtype: 'helpView',
    id: 'helpScreen',
      
    config: {
    	
        layout: {
            type: 'card'
        },
        
        styleHtmlContent: true,
        scrollable: true,
       
        items: [
    		{
				id: 'help',
				cls: 'textview',
				html: [
						"<h3>Help</h3>",
						"<p><strong>About entering your own values:</strong></p>",
						"<p>- All parameters with a star need to have a value greater than 0</p>",
						"<p>- The app assumes, that the distance for the different vehicles is all the same, but not the time.</p>", 
						"<p>- To get the distance, you can also use a map.</p>",
						"<p>Privacy: there will be no data stored, eg. your data is lost, if you close the window."
					].join(""),   
            }
    	],
    	
    	listeners: {
        	painted: function() {
        		Truespeed.controller.Functions.calculate();
        		var backButton = Ext.getCmp('backBtn');
            	backButton.hide();
        		var mapButton = Ext.getCmp('mapBtn');
            	mapButton.hide();
            }
        }
    }
});

Ext.define('Truespeed.view.Help', {
    extend: 'Ext.Container',
    xtype: 'helpView',
    id: 'helpScreen',
      
    config: {
    	
        layout: {
            type: 'vbox'
        },
        
        styleHtmlContent: true,
        scrollable: true,
       
        items: [
    		{
				id: 'help',
				cls: 'textview',
				html: [
						"<p><strong>Enter your own values and compare them!</strong></p>",
						"<p>Parameters with a star need to have a value greater than 0</p>",
						"<p>The app assumes, that the distance for the different vehicles is all the same, but not the time.</p>", 
						"<p>To get the distance to your workplace, you can also use a map.</p>",
						"Privacy: there will be no data stored, eg. your data is lost, if you close the window."
					].join(""),   
            },
            {
                xtype: 'button',
                id: 'nextBtn',
                text: 'Next',
                margin: '2% 25%',
                ui: 'confirm'
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

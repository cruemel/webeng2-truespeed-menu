Ext.define('Truespeed.view.Text', {
    extend: 'Ext.Container',
    xtype: 'textView',
    id: 'textScreen',
      
    config: {
    	
        layout: {
            type: 'card',   
        },
        
        styleHtmlContent: true,
        scrollable: true,
       
        items: [
    		{
				id: 'summary',
				cls: 'textview',
				html: "<p>Sorry, but no data.</p>"        
            } 
    	],
    	
    	listeners: {
        	painted: function() {
        		Truespeed.controller.Functions.calculate();
        		var backButton = Ext.getCmp('backBtn');
            	backButton.show();
        		var mapButton = Ext.getCmp('mapBtn');
            	mapButton.hide();
            }
        }
    }
});

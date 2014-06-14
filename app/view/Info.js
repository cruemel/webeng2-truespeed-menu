Ext.define('Truespeed.view.Info', {
    extend: 'Ext.form.Panel',
    xtype: 'infoView',
    id: 'infoScreen',
    
    requires: [
        'Ext.TitleBar'
    ],
      
    config: {
    	
    	title: 'Info',
       	
         layout: {
            type: 'vbox'
        },
        
        styleHtmlContent: true,
        scrollable: true,
       
        items: [
			{
				id: 'about',
				cls: 'textview',
				html: [
					"<h3>About</h3>",
					"<p>Truespeed is an application to compare different vehicles in reference of speed. The calculation is based on the approach, that speed is not only a result of the way divided through time you need to drive that way, but also the time you need to pay for the vehicle.</p>",
					"<h3>Idea</h3>",
					"<p>This app is based on an idea by Loris Tissino.</p>",
					"<h3>Contact</h3>",
					"<p>Christopher Moehlenhof,<br>",
					"Berlin</p>",
"<p>&#99;&#111;&#110;t&#97;&#99;&#116;&#64;&#109;&#111;&#101;&#104;&#108;&#101;&#110;&#104;&#111;&#102;&#46;&#110;&#101;&#116;</p>",
"<p>&copy; moehlenhof.net, 2014. All rights reserved.</p>"
				].join("")        
            }
    	]
    },
    
    listeners: {
        painted: function() {
        	var backButton = Ext.getCmp('backBtn');
            backButton.hide();
            var mapButton = Ext.getCmp('mapBtn');
            mapButton.hide();
        }
    }   
});

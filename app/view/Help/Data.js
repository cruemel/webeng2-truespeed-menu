Ext.define('Truespeed.view.Help.Data', {
    extend: 'Ext.Panel',
    xtype: "DataHelp",
    
     requires: [
        'Ext.TitleBar',
        'Ext.Button'
    ],

    config: {
       	top: '10%',
       	left: '5%',
        width: '90%',
        height: '80%',
        styleHtmlContent: true,
        scrollable: true,
        hidden: true,
        items: [
        	{ 
        		xtype: 'titlebar',
                docked: 'top',
                style: {
    				background: '#ffffff',
    				border: 0
				},
            	items: [
        			{
                		xtype: 'button',
                		id: 'closeData',
                		iconCls: 'close',
                		align: 'right'
            		}
            	] 
            },    
        	{
            	cls: "textview",
            	html: [
					"<p><strong>How to calculate your own speed</strong></p>",
					"<p>- Start by selecting a vehicle</p>",
					"<p>- Than alter its costs, the way and your time.</p>",
					"<p>- Not all parameters need a value (ex. fuel price).",
					"<p>- Only parameters with a star need to have a value greater than 0.</p>",
					"<p>Privacy: there will be no data stored (on the server), eg. your data is lost, if you close the app.</p>"
				].join("") 
			}
		]
    },

    initialize: function() {
        this.element.on({
            tap: {
                fn: function() {
                    this.hide();
                    Ext.Viewport.setMasked(false);
                },
                single: true,
                scope: this
            }
        })
    }
});
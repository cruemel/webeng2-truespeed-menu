Ext.define('Truespeed.view.MapHelp', {
    extend: 'Ext.Panel',
    xtype: "MapHelp",
    
     requires: [
        'Ext.TitleBar',
        'Ext.Button'
    ],

    config: {
       	top: '10%',
       	left: '10%',
        width: '80%',
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
                		id: 'closeMap',
                		iconCls: 'close',
                		align: 'right'
            		}
            	] 
            },    
        	{
            	cls: "textview",
            	html: [
					"<p><strong>How to estimate your locations</strong></p>",
					"<p>- To choose a place, click in its formfield</p>",
					"<p>- To determinate its position, click on the map.</p>"
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
Ext.define('Truespeed.view.Data', {
    extend: 'Ext.Container',
    xtype: 'dataView',
    id: 'dataScreen',
    
    requires: [
        'Ext.TitleBar',
        'Ext.Button',
        'Ext.SegmentedButton',
        'Truespeed.view.Vehicle',
        'Truespeed.view.Way',
        'Truespeed.view.Time'
    ],

	config: {
    	
        layout: 'card',
        
        items: [
        	{
        		xtype: 'toolbar',
                docked: 'top',
                style: {
    				background: '#f2eee3',
    				border: 0,
    				margin: '2% 0'
				},
            	items: [
                    {
            			xtype: 'segmentedbutton',
            			id: 'inputBtn',
            			defaults: {
               	 			width: 80
            			},
            			// pressedCls: 'inputSelected',
            			 items: [
            			 	{
                                text: 'Vehicle',
                                pressed: true,
                                handler: function () {
                                	var mainScreen = Ext.getCmp('dataScreen');
            						mainScreen.setActiveItem(Ext.getCmp('vehicleScreen'));
                                }
                            },
                            {
                                text: 'Way',
                                handler: function () {
                                	var mainScreen = Ext.getCmp('dataScreen');
            						mainScreen.setActiveItem(Ext.getCmp('wayForm'));
        						}
                            },
                            {
                                text: 'Time',
                                handler: function () {
                                	var mainScreen = Ext.getCmp('dataScreen');
            						mainScreen.setActiveItem(Ext.getCmp('timeScreen'));
                                }
                            }    
                        ]
            		}
    			]
    		},
    		{
    			xtype: 'vehicleView'
    		},
    		{
    			xtype: 'wayView'
    		},
    		{
    			xtype: 'timeView'
    		}
    	]
   	}
});


							
							
							
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
        'Truespeed.view.Time',
        'Truespeed.view.Help'
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
            			// pressedCls: 'inputSelected',
            			 items: [
            			 	 {
                               	iconCls: 'help',
                               	width: 60,
                               	pressed: true,
                                handler: function () {
                                	var mainScreen = Ext.getCmp('dataScreen');
            						mainScreen.setActiveItem(Ext.getCmp('helpScreen'));
                                }
                            },
            			 	{
                                text: 'Vehicle',
                                width: 90,
                                handler: function () {
                                	var mainScreen = Ext.getCmp('dataScreen');
            						mainScreen.setActiveItem(Ext.getCmp('vehicleScreen'));
                                }
                            },
                            {
                                text: 'Way',
                                width: 90,
                                handler: function () {
                                	var mainScreen = Ext.getCmp('dataScreen');
            						mainScreen.setActiveItem(Ext.getCmp('wayForm'));
        						}
                            },
                            {
                                text: 'Time',
                                width: 90,
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
    			xtype: 'helpView'
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


							
							
							
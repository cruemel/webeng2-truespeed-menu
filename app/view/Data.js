Ext.define('Truespeed.view.Data', {
    extend: 'Ext.Container',
    xtype: 'dataView',
    id: 'dataScreen',
    
    requires: [
        'Ext.TitleBar',
        'Ext.Button',
        'Ext.SegmentedButton',
        'Ext.Panel',
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
        		id: 'databar',
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
                                text: 'Costs',
                                width: 100,
                                pressed: true,
                                handler: function () {
                                	var mainScreen = Ext.getCmp('dataScreen');
            						mainScreen.setActiveItem(Ext.getCmp('vehicleScreen'));
                                }
                            },
                            {
                                text: 'Way',
                                width: 100,
                                handler: function () {
                                	var mainScreen = Ext.getCmp('dataScreen');
            						mainScreen.setActiveItem(Ext.getCmp('wayForm'));
        						}
                            },
                            {
                                text: 'Time',
                                width: 100,
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


							
							
							
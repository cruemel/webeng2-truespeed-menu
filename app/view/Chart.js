Ext.define('Truespeed.view.Chart', {
    extend: 'Ext.Panel',
    xtype: 'chartView',
    id: "chartScreen",

    requires: [
        'Ext.chart.Chart',
        'Ext.chart.series.Bar',
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Category',
        'Ext.chart.interactions.ItemInfo',
        'Ext.chart.interactions.ItemHighlight',
        'Ext.data.Store',
        'Ext.XTemplate'
    ],

    config: {
    	
        layout: {
            type: 'vbox'
        },
        
        styleHtmlContent: true,
        
        items: [
            {
            	xtype: 'chart',
            	id: "barChart",
            	laylout: 'fit',
            	flex: 6,
            	
               	store: 'Chart',
                
                flipXY: true,
				
				axes: [
                    {
                        type: 'category',
                        position: 'left',
                        fields: 'transport',
                        
                        label: {
                            fontSize: '1.2em',
                            fontFamily: 'Andale Mono, monospace'    
                        }
                    }
                ],
                
                series: [
                    {
                        type: 'bar',
                        xField: 'transport',
                        yField: 'speed',
						
                        style: {
                            maxBarWidth: 50
                        },
                        
                        label: {
                            field: 'speed',
                            display: 'insideStart',
                            color: 'black',
                            fontSize: '1em',
                            fontFamily: 'Andale Mono, monospace',
                            renderer: function (text) {
                            	var units = Truespeed.controller.Functions.getOptions();
                            	var unit = 'km/h';
                            	if (units.distance == 'mi') {
                            		unit = 'mph';
                            	}
         						return  text + ' ' + unit;
     						}
                        },
                        
                        listeners:{
                        	itemtap: function(me, item, event) {	
								var number = item.record.data.id;
								var users = Ext.data.StoreManager.get('Users');
								users.getData().get(0).set('vehicle',number);
								
								var mainScreen = Ext.getCmp('startScreen');
    							mainScreen.setActiveItem(Ext.getCmp('textScreen'));
							}
				        },
        				
                        renderer: function (sprite, config, rendererData, index) {
                            if (index == 1) {
                            	 // bike
                            	return {
                                	fill: '#75A48B'
                                };
                    		}
                        	else if (index == 2) {
                                // car
                                return {
                                    fill: '#CC9933'
                                };
                            }

                            // transport
                            return {
                                fill: '#CC6633'
                            };
                        }
                        
                    }
                ]
                
                 /* interactions: [{
                      
    				type: 'iteminfo',
    				listeners: {
    					
        				show: function(me, item, panel) {
        					
            				var tables = Ext.data.StoreManager.get('Users');
							tables.getData().getAt(0).set('vehicle', item.record.data.id);
							
							/*
							var data = item.record.data;
							var tpl = new Ext.XTemplate(
								'<table>',
    							'<tr><td>Way</td><td><strong>{waytotal} {distance}</strong></td></tr>',
    							'<tr><td>Time</td><td>{timeway} h</td></tr>',
    							'<tr><td>Vehicle</td><td>{timework} h</td></tr>',
   								'<tr><td>&nbsp;</td><td><strong>{timetotal} h</strong></td></tr>',
    							'<tr><td>Speed</td><td>',
    							'<strong>{speed} ',
    							'<tpl if="this.isMiles()">',
    							'mph ',
    							'<tpl else>',
    							'km/h ',
    							'</tpl>',
    							'</strong></td></tr>',
							'</table>', {
							isMiles: function() {
								var isMiles = false;
									if (data.distance == 'mi') {
										isMiles = true;
									}
									return isMiles;
								}
    						});
    						
    						panel.setHtml(tpl.apply(data));
    						var toolbar = Ext.ComponentQuery.query('toolbar')[1];
    						toolbar.setTitle('Details');
            				
    						var mainScreen = Ext.getCmp('mainScreen');
    						var nextScreen = Ext.getCmp('textScreen');
    						mainScreen.setActiveItem(nextScreen);
       					 }

				}] */
            },
                
            {
            	xtype: 'panel',
            	id: 'chart_caption',
            	width: '100%',
            	flex: 1,
            	html: [
					"<p>(Click on a bar, to see the calculation details.)</p>"
				].join(""),
				style: {
					color: 'gray',
					fontSize: '0.9em',
					textAlign: 'center'
				}	
			}
        ]
    },
    
    initialize: function() {
		// this.callParent(arguments);
    	this.on("activate", function() {
    		Truespeed.controller.Functions.compare();
            var mapButton = Ext.getCmp('mapBtn');
            mapButton.hide();      		
		});
	}
});
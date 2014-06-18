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
    
    	title: 'Chart',
    	
        layout: {
            type: 'vbox',
            align: 'stretch'   
        },
        
        styleHtmlContent: true,
        scrollable: true,
    	
        items: [
            {
            	xtype: 'chart',
            	id: "barChart",
            	flex: 5,
            	
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
                            fontSize: '1.2em',
                            fontFamily: 'Andale Mono, monospace',
                            renderer: function (text) {
                            	var records = Truespeed.controller.Functions.getUnits();
                            	var distance = records.distance;
                            	var unit = 'km/h';
                            	if (distance == 'mi') {
                            		unit = 'mph';
                            	}
         						return  text + ' ' + unit;
     						}
                        },
                        
                        listeners:{
                        	itemtap: function(me, item, event) {	
								// console.log(item.record.data.id);
								var tables = Ext.data.StoreManager.get('Users');
								tables.getData().getAt(0).set('vehicle', item.record.data.id);
								var mainScreen = Ext.getCmp('mainScreen');
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
            	id: 'chart_caption',
            	flex: 1,
            	html: [
					"<p>(Click on a bar, to see the calculation details)</p>"
				].join(""),
				style: {
					color: 'gray',
					fontSize: '0.9em',
					textAlign: 'center'
				}	
			}
        ],
        
         listeners: {
        	painted: function() {
        		Truespeed.controller.Functions.compare();
        		var backButton = Ext.getCmp('backBtn');
            	backButton.show();
        		var mapButton = Ext.getCmp('mapBtn');
            	mapButton.hide();
            }
        }   
    }
});
Ext.define('Truespeed.view.Vehicle', {
    extend: 'Ext.form.Panel',
    xtype: 'vehicleView',
    id: 'vehicleScreen',
    
    requires: [
        'Ext.form.FieldSet',
        'Ext.field.Number',
        'Ext.field.Select'
    ],
    
    config: {
    	
    	layout: 'card',
    	
        items: [
        	 {
                xtype: 'formpanel',
                id: 'vehiclePanel',
                
                items: [
                	{
                		xtype: 'fieldset',
                		margin: '0 2%',
                		defaults: {
                            labelWidth: '70%'
                        },
                		items: [
                    		{
                        		xtype: 'selectfield',
                        		label: 'Vehicle',
                        		name: 'name',
                        		options: [
                            		{ text: 'Car', value: 'car'},
                            		{ text: 'Bike', value: 'bike'},
                            		{ text: 'Public Transport', value: 'public'}   
                        		],
                        		listeners: {
                        			change: function (field, newValue) {
                        				setTimeout(function() {
                        					Truespeed.controller.Functions.setRecord('vehicle',newValue);
											Truespeed.controller.Functions.updateVehicle();
										 }, 300);
                        			}		
                        		}
                    		}
                    	]
                    },
                    {
                    	xtype: 'fieldset',
                		margin: '2%',
                		defaults: {
                            labelWidth: '70%'
                        },
                        instructions: '(Please enter your own values and compare them - at the chart. Parameters with a star need to have a value greater than 0)',
                		items: [
                   			{
                        		xtype: 'numberfield',
                        		label: 'Price',
                        		name: 'price',
                        		minValue: 0,
                        		stepValue: 50
                    		},
                    		{
                        		xtype: 'numberfield',
                        		label: 'Consumption',
                        		name: 'consumption',
                        		minValue: 0,
                        		stepValue: 0.1,
                        		maxValue: 100
                    		},
                  			{
                        		xtype: 'numberfield',
                        		label: 'Fuel price',
                        		name: 'fuel',
                        		minValue: 0,
                        		stepValue: 0.1,
                        		maxValue: 100
                    		},
                    		{
                        		xtype: 'numberfield',
                        		label: 'Insurance (per year)',
                        		name: 'insurance',
                        		minValue: 0,
                        		stepValue: 10
                    		},
                   			{
                        		xtype: 'numberfield',
                        		label: 'Tax (per year)',
                        		name: 'tax',
                        		minValue: 0,
                        		stepValue: 10
                    		},
                    		{
                        		xtype: 'numberfield',
                        		label: 'Maintenance (per year)',
                        		name: 'maintenance',
                        		minValue: 0,
                        		stepValue: 10
                    		},
                     		{
                        		xtype: 'numberfield',
                        		label: 'Other (per year)',
                        		name: 'other',
                        		minValue: 0,
                        		stepValue: 10
                    		},
                    		{
                        		xtype: 'numberfield',
                        		label: 'Use (in years)',
                        		name: 'years',
                        		required: true,
                        		minValue: 1,
                        		maxValue: 100
                    		},
                    		{
                        		xtype: 'numberfield',
                        		label: 'Private usage (in %)',
                        		name: 'usage',
                        		minValue: 0,
                        		stepValue: 5,
                        		maxValue: 100
                    		}
                		]
            		
            		} ,
            		{
                		xtype: 'button',
                		id: 'vehicleBtn',
                		text: 'Save',
                		margin: '0 25%',
                		ui: 'confirm'
            		}     		
            	]
            }      
    	],
    	
    	listeners: {
        	painted: function() {
        		Truespeed.controller.Functions.updateVehicle();
        		var backButton = Ext.getCmp('backBtn');
            	backButton.hide();
            	var mapButton = Ext.getCmp('mapBtn');
            	mapButton.hide();
        	}
        }
    }
    
    
});

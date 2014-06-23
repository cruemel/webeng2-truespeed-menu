Ext.define('Truespeed.view.Way', {
    extend: 'Ext.form.Panel',
    xtype: 'wayView',
    id: 'wayForm',
    
    requires: [
        'Ext.form.FieldSet',
        'Ext.field.Number',
        'Ext.field.Select'
    ],
    
    config: {
    
    	layout: {
            type: 'card'
        },
    	
        items: [
        
        	 {
                xtype: 'formpanel',
                id: 'wayPanel',
                
                items: [
                	{
                		xtype: 'fieldset',
                		margin: '0 1%',
                		defaults: {
                            labelWidth: '70%'
                        },
                		items: [
                    		{
                        		xtype: 'selectfield',
                        		label: 'Vehicle',
                        		name: 'name',
                        		disabled: true,
                        		options: [
                            		{ text: 'Car', value: 'car'},
                            		{ text: 'Bike', value: 'bike'},
                            		{ text: 'Public Transport', value: 'public'}   
                        		]
                    		}
                    	]
                    },
        			{
                		xtype: 'fieldset',
                		margin: '3% 1%',
                		defaults: {
                            labelWidth: '70%'
                        },  
                		items: [
                    		{
                        		xtype: 'numberfield',
                        		label: 'Route to work',
                        		name: 'route',
                        		required: true,
                        		minValue: 1,
                        		stepValue: 0.1
                    		},	
                   			{
                        		xtype: 'numberfield',
                        		label: 'Duration (in minutes)',
                        		name: 'duration',
                        		required: true,
                        		minValue: 1
                    		},
                    		{
                        		xtype: 'numberfield',
                        		label: 'Times (per day)',
                        		name: 'times',
                        		required: true,
                        		minValue: 1
                    		}
                		]
            		},
            		{
                		xtype: 'button',
                		id: 'wayBtn',
                		text: 'Save',
                		margin: '2% 25%',
                		ui: 'confirm'
            		}     	
            	]
            }     
    	],
    	listeners: {
        	painted: function() {
        		Truespeed.controller.Functions.updateWay();
        		var backButton = Ext.getCmp('backBtn');
            	backButton.hide();
        		var mapButton = Ext.getCmp('mapBtn');
            	mapButton.show();
        	}
        }
    }
        
});

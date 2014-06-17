Ext.define('Truespeed.view.Time', {
    extend: 'Ext.form.Panel',
    xtype: 'timeView',
    id: 'timeScreen',
    
    requires: [
        'Ext.form.FieldSet',
        'Ext.field.Number',
        'Ext.field.Select',
        'Ext.Button'
    ],
    
    config: {
    	
    	layout: 'card',
    	
        items: [
        
        	 {
                xtype: 'formpanel',
                id: 'timePanel',
                
                items: [
                	{
                		xtype: 'fieldset',
                		margin: '0 2%',
                		defaults: {
                            labelWidth: '75%'
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
                		margin: '2%',
                		defaults: {
                            labelWidth: '75%'
                        },
                        instructions: '(Privacy: there will be no data stored, eg. your data is lost, if you close the window.)',
                		items: [
                    		{
                        		xtype: 'numberfield',
                        		label: 'Work hours (per day)',
                        		name: 'hours',
                        		required: true,
                        		minValue: 1,
                        		maxValue: 24
                    		},
                   			{
                        		xtype: 'numberfield',
                        		label: 'Work days (per year)',
                        		name: 'days',
                        		required: true,
                        		minValue: 1,
                        		maxValue: 365
                    		},
                    		{
                        		xtype: 'numberfield',
                        		label: 'Salary (per year)',
                        		name: 'salary',
                        		required: true,
                        		minValue: 1000,
                        		stepValue: 1000
                    		}
                		]
            		},
            		{
                		xtype: 'button',
                		id: 'timeBtn',
                		text: 'Save',
                		margin: '0 25%',
                		ui: 'confirm'
            		}
            	]
            }      
    	],
    	
    	listeners: {
        	painted: function() {
        		Truespeed.controller.Functions.updateTime();
        		var backButton = Ext.getCmp('backBtn');
            	backButton.hide();
            	var mapButton = Ext.getCmp('mapBtn');
            	mapButton.hide();
        	}
        }
    }   
    
});

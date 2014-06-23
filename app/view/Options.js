Ext.define('Truespeed.view.Options', {
    extend: 'Ext.form.Panel',
    xtype: 'optionsView',
    id: 'optionsScreen',

    requires: [
        'Ext.form.FieldSet',
        'Ext.field.Select',
        'Ext.Button'
    ],
   
    config: {
    	
    	layout: {
            type: 'card'
        },
        
        items: [
        	 {
                xtype: 'formpanel',
                id: 'optionsPanel',
                items: [
        	 		{
        
                xtype: 'fieldset',
                title: 'Units',
                defaults: {
                    labelWidth: '50%'
                },
                margin: '2%',
                instructions: 'In case you are not living in "the old europe" ...',
    			
                items: [
                    {
                        xtype: 'selectfield',
                        id: 'selectCapacity',
                        label: 'Capacity',
                        name: 'capacity',
                       	options: [
                            { text: 'Liter', value: 'ltr' },
                            { text: 'Gallon (US)', value: 'gal' }
                        ]
                    },
                    {
                        xtype: 'selectfield',
                        id: 'selectCurrency',
                        label: 'Currency',
                        name: 'currency',
                        options: [
                        	{ text: 'Euro', value: 'EUR'},
                            { text: 'Dollar', value: 'USD'}
                        ]
                    },
                    {
                        xtype: 'selectfield',
                        id: 'selectDistance',
                        label: 'Distance',
                        name: 'distance',
                        options: [
                   			{ text: 'Kilometer', value: 'km' },
                    		{ text: 'Miles', value: 'mi' }
                    	]
                    }
                ]
            },
            		{
               			xtype: 'button',
               	 		id: 'changeBtn',
                		text: 'Change',
                		action: 'refresh',
                		margin: '0 25%',
                		ui: 'confirm'					
            		}		
            	]
            }
        ],
        
        listeners: {
        	painted: function() {
        		var backButton = Ext.getCmp('backBtn');
            	backButton.hide();
            	var mapButton = Ext.getCmp('mapBtn');
            	mapButton.hide();
        	}
    	}   
    }
});

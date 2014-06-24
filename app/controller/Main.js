Ext.define('Truespeed.controller.Main', {
    extend: 'Ext.app.Controller',
    
    config: {
    	stores: ['Settings', 'Users', 'Ways', 'Vehicles', 'Times', 'Chart'],
        control: {
        	'#backBtn': {
                tap: 'onBackTap'
            },
        	'#changeBtn': {
                tap: 'onChangeTap'
            },
            '#nextBtn': {
                tap: 'onNextTap'
            },
        	'#mapBtn': {
                tap: 'onMapTap'
            },
            '#timeBtn': {
                tap: 'onTimeTap'
            },
            '#vehicleBtn': {
                tap: 'onVehicleTap'
            },
            '#wayBtn': {
                tap: 'onWayTap'
            }
        }
    },
    
    init: function() {
    	var users = {
			name: 'Mario',
    		vehicle: 1,
    		way: 1,
    		time: 1
		}
		Truespeed.controller.Functions.setTables(users);
		var units = {
			distance: "km",
    		capacity: "ltr",
    		currency: "EUR"	
		}
       	Truespeed.controller.Functions.setUnits(units);
	},
	
	onBackTap: function() {
		var mainScreen = Ext.getCmp('mainScreen');
		
		if (mainScreen.getActiveItem() == Ext.getCmp('textScreen')) {
			mainScreen.setActiveItem(Ext.getCmp('chartScreen'));
        } 
        else {
        	mainScreen.setActiveItem(Ext.getCmp('homeScreen'));
        }
    },

     onChangeTap: function() {
     	var formPanel = Ext.getCmp('optionsPanel');
        var units = formPanel.getValues();
     	Truespeed.controller.Functions.setUnits(units);
       	var mainScreen = Ext.getCmp('mainScreen');
    	mainScreen.setActiveItem(Ext.getCmp('homeScreen'));
    },
    
    onMapTap: function() {
		var mainScreen = Ext.getCmp('mainScreen');
		
		if (mainScreen.getActiveItem() == Ext.getCmp('wayMap')) {
			mainScreen.setActiveItem(Ext.getCmp('dataScreen'));
        } 
        else {
        	mainScreen.setActiveItem(Ext.getCmp('wayMap'));
        }
    },
    
    onVehicleTap: function() {
    	
		 setTimeout(function() {
        	Truespeed.controller.Functions.saveVehicle();
        }, 300);
        
        var mario = Truespeed.controller.Functions.getTables();
        
        var you = {
			name: 'You',
    		vehicle: mario.vehicle,
    		way: mario.way,
    		time: mario.time
		}
		
		Truespeed.controller.Functions.setTables(you);
		
		var buttons = Ext.getCmp('inputBtn');
        buttons.setPressedButtons(1);
        
        var mainScreen = Ext.getCmp('dataScreen');
        mainScreen.setActiveItem(Ext.getCmp('wayForm'));
    },
    
    onWayTap: function() {
        
		 setTimeout(function() {
        	Truespeed.controller.Functions.saveWay();
        }, 300);
        
        var buttons = Ext.getCmp('inputBtn');
        buttons.setPressedButtons(2);
        
        var mainScreen = Ext.getCmp('dataScreen');
    	mainScreen.setActiveItem(Ext.getCmp('timeScreen'));
    },
    
     onTimeTap: function() {
    	
        setTimeout(function() {
        	Truespeed.controller.Functions.saveTime();
        }, 300);
        
        var mainScreen = Ext.getCmp('mainScreen');
    	mainScreen.setActiveItem(Ext.getCmp('homeScreen'));
    	
    	var mapButton = Ext.getCmp('mapBtn');
        mapButton.hide();
		
    }

});

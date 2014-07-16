Ext.define('Truespeed.controller.Main', {
    extend: 'Ext.app.Controller',
    
    config: {
    	stores: ['Options', 'Users', 'Ways', 'Vehicles', 'Times', 'Chart'],
        control: {
        	'#vehicleImg': {
                tap: 'onImgTap'
            },
        	'#changeBtn': {
                tap: 'onChangeTap'
            },
            '#enterBtn': {
                tap: 'onEnterTap'
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
		
		var units = {
			distance: "km",
    		capacity: "ltr",
    		currency: "EUR"	
		};
		
       	Truespeed.controller.Functions.setOptions(units);
       	
       	var mario = {
			name: 'Mario',
    		vehicle: 1,
    		way: 1,
    		time: 1
		};
		
		Truespeed.controller.Functions.setUsers(mario);
	},
	
	onImgTap: function() {
        var startScreen = Ext.getCmp('startScreen');
       	startScreen.setActiveItem(Ext.getCmp('chartScreen'));
    },
	
	/*
	onBackTap: function() {
		var mainScreen = Ext.getCmp('startScreen');
		
		if (mainScreen.getActiveItem() == Ext.getCmp('textScreen')) {
			mainScreen.setActiveItem(Ext.getCmp('chartScreen'));
        } 
        else {
        	mainScreen.setActiveItem(Ext.getCmp('homeScreen'));
        }
    },
    */

     onChangeTap: function() {
     	var formPanel = Ext.getCmp('optionsPanel');
        var units = formPanel.getValues();
     	Truespeed.controller.Functions.setOptions(units);
       	var mainScreen = Ext.getCmp('mainScreen');
    	mainScreen.setActiveItem(Ext.getCmp('startScreen'));
    },
    
    onEnterTap: function() {
        var mainScreen = Ext.getCmp('mainScreen');
        mainScreen.setActiveItem(Ext.getCmp('dataScreen'));
        var users = Truespeed.controller.Functions.getUsers();
        if (users.name != "You") {
        	var overlay = Ext.create('Truespeed.view.Help.Data');
            Ext.Viewport.setMasked({});
            Ext.Viewport.add(overlay);
            overlay.show();		
        };		
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
		
		var mario = Truespeed.controller.Functions.getUsers();
		
		var you = {
			name: 'You',
			vehicle: mario.vehicle,
    		way: mario.way,
    		time: mario.time
		};
		
		Truespeed.controller.Functions.setUsers(you);
        
        var startScreen = Ext.getCmp('startScreen');
    	startScreen.setActiveItem(Ext.getCmp('homeScreen'));
    	
    	var mainScreen = Ext.getCmp('mainScreen');
    	mainScreen.setActiveItem(startScreen);
		
    }

});

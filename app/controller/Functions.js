Ext.define('Truespeed.controller.Functions', {
  	singleton: true,
  	
  	requires: [
  		'Truespeed.model.Users',
        'Truespeed.model.Settings'
    ],
	
	updateTagline: function() {
		
		var records = Truespeed.controller.Functions.getTables();
		
		var vehicle = records.vehicle;
		var way = records.way;
		
		var data = Truespeed.controller.Functions.compute(records,vehicle,way);
		
		var velocity;
		var unit;
		
		if (isNaN(data.speed)) {
			velocity = "?";
		}
		else {
			velocity = data.speed;
		}
		
		if (data.distance == 'mi') {
			unit = "mph";
		}
		else {
			unit = "km/h";
		}
    	
    	var speedline = '<p>Mario has a speed of ' + velocity + ' ' + unit + '.</p>';
		
		var panel = Ext.getCmp("tagline");
		panel.setHtml(speedline);
	},
	
	updateImage: function() {
	
		var records = Truespeed.controller.Functions.getTables();
		
		var image = Ext.getCmp('image');
		
        if (records.vehicle == 3) {
            image.setSrc('resources/images/public.png');
        }
        else if (records.vehicle == 2) {
            image.setSrc('resources/images/bike.png');
        }
        else {
            image.setSrc('resources/images/car.png');
        }
		
	},
	
	calculate: function() {
		
		var records = Truespeed.controller.Functions.getTables();
		
		var vehicle = records.vehicle;
		var way = records.way;
		var data = Truespeed.controller.Functions.compute(records,vehicle,way);
		
		console.log("Distance: ", data.distance);
    	
    	var tpl = new Ext.XTemplate(
    		'<p>Mario ',
			'<tpl if="this.isNOTPublic()">',	
    		'uses the {transport} ',
    		'<tpl else>',
    		'uses the {transport} transport ',
    		'</tpl>',
    		'to get to work.</p>',
    		'<p>In one year he gives <strong> {currency} {vehicletotal} </strong> for the vehicle.</p>',
			'<p>But what does money has to do with the speed?<br>',
			'Isn&apos;t it all about way and time?</p>',
			'<p>His way to the workplace is <strong> {waytotal} {distance} </strong> per year.<br>',
			'However, it is not only the time he spends on driving: <strong> {timeway} hours</strong>,<br>',
			'but also the time he has to work to afford the vehicle: <strong> {timework} hours</strong>.<br>',
			'In total, it is <strong> {timetotal} hours </strong>.</p>',
			'<p>Mario&apos;s velocity is:<br>',
			'<strong>{waytotal} {distance} / {timetotal} h, ie. ',
			'<tpl if="this.isMiles()">',
			'{speed} mph',
			'<tpl else>',
			'{speed} km/h',
			'</tpl>',
			'</strong></p>',
			{ 
				isCar: function() {
					var isCar = false;
					if (data.spendings > 0) {
						isCar = true;
					}
					return isCar;
				},
				isNOTPublic: function() {
					var isNOTPublic = false;
					if (data.transport != 'public') {
						isNOTPublic = true;
					}
					return isNOTPublic;
				},
				isMiles: function() {
					var isMiles = false;
					if (data.distance == 'mi') {
						isMiles = true;
					}
					return isMiles;
				}
			}
		);
		
		var panel = Ext.get("summary");
		tpl.overwrite(panel, data);

	},
	
	compare: function() {
		
		var records = Truespeed.controller.Functions.getTables();
		var way = records.way;
		
		var transport = Truespeed.controller.Functions.compute(records,3,way);
		var bike = Truespeed.controller.Functions.compute(records,2,way);
		var car = Truespeed.controller.Functions.compute(records,1,way);
		
		// console.log('transport: ', transport);
	
	},
	
	compute: function(records,vehicle,way) {
	
		var compare;
		
		if (vehicle != way) {
			compare = vehicle;
		}
		else {
			compare = 0;
		}
		
		records.vehicle = vehicle;
		
		var record = Truespeed.controller.Functions.getValues(records,compare);
		var units = Truespeed.controller.Functions.getUnits();
		
		// console.log('tables: ',  records.name, ', ', records.way, ', ',  records.vehicle, ', ', records.time );	
		// console.log('units: ',  units.capacity, ', ', units.currency, ', ',  units.distance );	
		
		/* meter zu kilometer (zu meilen) */
		if (units.distance == 'mi') {
			record.route = record.route / 1.609344;
        	record.consumption = record.consumption * 1.609344;
		}
		
		var waytotal = Math.floor(record.route * record.times * record.days);
		
		// console.log('way: ', waytotal, '(', record.route, '*', record.times, '*', record.days, ')');
		
		var costs;
		if (record.price > 0) {
			costs = Math.floor((record.price / record.years) * (100 - record.usage) / 100);
		}
		else {
			costs = 0;
		}
		
		var spendings = Math.floor(waytotal * record.consumption / 100 * record.fuel);
		
		var upkeeping =  Math.floor((record.insurance  + record.tax + record.maintenance + record.other) * (100 - record.usage) / 100);
		var vehicletotal = costs + spendings + upkeeping;
		
		// console.log('vehicle: ', vehicletotal, '(', costs, '+', spendings, '+', upkeeping, ')');
		
		var timeway = Math.floor((record.duration / 60) * record.times * record.days);
		var timework = Math.floor(vehicletotal / (record.salary / (record.days * record.hours)));
		var timetotal = timeway + timework;
		
		// console.log('time: ', timetotal, '(', timeway, '+', timework, ')');
		
		var speed = parseFloat((waytotal / timetotal).toFixed(2)); 
		
		var values = {
  			transport: record.name,
  			costs: costs,
  			spendings: spendings,
  			upkeeping: upkeeping,
  			vehicletotal: vehicletotal,
  			waytotal: waytotal,
  			timeway: timeway,
  			timework: timework,
  			timetotal: timetotal,
			speed: speed,
			distance: units.distance,
			capacity: units.capacity,
			currency: units.currency		
  		};
  		
  		Truespeed.controller.Functions.setChart(vehicle,values);
        
		return values;
	},
    
    getTables: function() {
	
		var users = {};
	
		var userStore = Ext.getStore('Users');
		
		if (userStore.getData().length > 0) {
			users.name = userStore.getData().getAt(0).get('name');
			users.vehicle = userStore.getData().getAt(0).get('vehicle');
			users.way = userStore.getData().getAt(0).get('way');
			users.time = userStore.getData().getAt(0).get('time');
		}
		else{
			console.log("can not get current tables");
		}
		
		return users;
	},
	
	getUnits: function() {
	
		var units = {};
		var unitStore = Ext.getStore('Settings');
		
		if (unitStore.getData().length > 0) {
			units.capacity = unitStore.getData().get(0).get('capacity');
			units.currency = unitStore.getData().get(0).get('currency');
			units.distance = unitStore.getData().get(0).get('distance');
		}
		else{
			console.log("can not get current units");
		}
		
		return units;
	},
	
	getValues: function(records,compare,record) {
	
		var values = {};
		
		var wayrecord = records.way;
        var vehiclerecord = records.vehicle;
        var timerecord = records.time;
        
        if (!record) {
        	record = 'all';
        }
        
        if ((record != 'way') || (record != 'time')) {	
			var vehicleStore = Ext.getStore('Vehicles');
			if (vehicleStore.getData().length > 0) {
				values.name = vehicleStore.getData().get(vehiclerecord).get('name');
				values.price = vehicleStore.getData().get(vehiclerecord).get('price');
				values.years = vehicleStore.getData().get(vehiclerecord).get('years');
				values.usage = vehicleStore.getData().get(vehiclerecord).get('usage');
				values.consumption = vehicleStore.getData().get(vehiclerecord).get('consumption');
				values.fuel = vehicleStore.getData().get(vehiclerecord).get('fuel');
				values.insurance = vehicleStore.getData().get(vehiclerecord).get('insurance');
				values.tax = vehicleStore.getData().get(vehiclerecord).get('tax');
				values.maintenance = vehicleStore.getData().get(vehiclerecord).get('maintenance');
				values.other = vehicleStore.getData().get(vehiclerecord).get('other');
			}
		}
        
        if ((record != 'vehicle') || (record != 'time')) {		
			var wayStore = Ext.getStore('Ways');
			if (wayStore.getData().length > 0) {
				values.route = wayStore.getData().get(wayrecord).get('route');
				if (compare > 0) {
					var refway = wayStore.getData().get(vehiclerecord).get('route');
					var reftime = wayStore.getData().get(vehiclerecord).get('duration');
   					var refspeed = refway / reftime;
					values.duration = Math.floor(values.route / refspeed);		
				}
				else {
					values.duration = wayStore.getData().get(wayrecord).get('duration');
				}
				values.times = wayStore.getData().get(wayrecord).get('times');	
			}
		}

		 if ((record != 'vehicle') || (record != 'way')) {	
			var timeStore = Ext.getStore('Times');
			if (timeStore.getData().length > 0) {
				values.days = timeStore.getData().get(timerecord).get('days');
				values.hours = timeStore.getData().get(timerecord).get('hours');
				values.salary = timeStore.getData().get(timerecord).get('salary');
			}
		}
		
		return values;
	},
	
	setTables: function(values) {
		var userStore = Ext.getStore('Users');
		
		userStore.removeAll();
        userStore.sync();
        
        var userModel = Ext.create('Truespeed.model.Users', {});
        userModel.set('name',values.name);
        userModel.set('vehicle',values.vehicle);
        userModel.set('way',values.vehicle);
        userModel.set('time',values.way);
		
		userStore.add(userModel.getData());
        userStore.sync();
        
        // console.log("tables set.");
	},
	
	setUnits: function(values) {
	
		var unitStore = Ext.getStore('Settings');
		
		unitStore.removeAll();
        unitStore.sync();
        
        var unitModel = Ext.create('Truespeed.model.Settings', {});
        unitModel.set('capacity',values.capacity);
        unitModel.set('currency',values.currency);
        unitModel.set('distance',values.distance);
		
		unitStore.add(unitModel.getData());
        unitStore.sync();
		
		// console.log("units set.");
	},
	
	setChart: function(record,values) {
		var chartStore = Ext.getStore('Chart');
		
		if (chartStore.getData().length > 0) {
        	chartStore.getData().get(record).set('transport',values.transport);
  			chartStore.getData().get(record).set('costs',values.costs);
  			chartStore.getData().get(record).set('spendings',values.spendings);
  			chartStore.getData().get(record).set('upkeeping',values.upkeeping);
  			chartStore.getData().get(record).set('vehicletotal',values.vehicletotal);
  			chartStore.getData().get(record).set('waytotal',values.waytotal);
  			chartStore.getData().get(record).set('timeway',values.timeway);
  			chartStore.getData().get(record).set('timework',values.timework);
  			chartStore.getData().get(record).set('timetotal',values.timetotal);
  			chartStore.getData().get(record).set('speed',values.speed);
  			chartStore.getData().get(record).set('distance',values.distance);
  			chartStore.getData().get(record).set('capacity',values.capacity);
  			chartStore.getData().get(record).set('currency',values.currency);
  		}
	},
	
	setVehicle: function(record,values) {
		
		var units = Truespeed.controller.Functions.getUnits();
		
		if (units.distance == 'mi') {
        	values.consumption = values.consumption / 1.609344;
		}
		
		/*
		if (units.capacity == 'gal') {
        	values.consumption = values.consumption * 3.785411784;
		}
		*/
		
		values.consumption = values.consumption.toFixed(1);	
		values.fuel = values.fuel.toFixed(1);
		
		var vehicleStore = Ext.getStore('Vehicles');
		
		vehicleStore.getData().get(record).set('name',values.name);
		vehicleStore.getData().get(record).set('price',values.price);
		vehicleStore.getData().get(record).set('consumption',values.consumption);
		vehicleStore.getData().get(record).set('fuel',values.fuel);
		vehicleStore.getData().get(record).set('insurance',values.insurance);
		vehicleStore.getData().get(record).set('tax',values.tax);
		vehicleStore.getData().get(record).set('maintenance',values.maintenance);
		vehicleStore.getData().get(record).set('other',values.other);
		vehicleStore.getData().get(record).set('years',values.years);
		vehicleStore.getData().get(record).set('usage',values.usage);
	},
	
	setWay: function(record,values) {
        
        var units = Truespeed.controller.Functions.getUnits();
        
        if (units.distance == 'mi') {
			values.route = values.route * 1.609344;
		}
		
		values.route = values.route.toFixed(1);
		
		var wayStore = Ext.getStore('Ways');
		
		wayStore.getData().get(record).set('route',values.route);
		wayStore.getData().get(record).set('duration',values.duration);
		wayStore.getData().get(record).set('times',values.times);
	},
	
	setTime: function(record,values) {
		var timeStore = Ext.getStore('Times');
		
		timeStore.getData().get(record).set('days',values.days);
		timeStore.getData().get(record).set('hours',values.hours);
		timeStore.getData().get(record).set('salary',values.salary);
	},
	
	updateVehicle: function() {
	
		var records = Truespeed.controller.Functions.getTables();
		var compare = 0;
		
		var values = Truespeed.controller.Functions.getValues(records,compare,'vehicle');
		
		var data = Truespeed.controller.Functions.getUnits();
		
		if (data.distance == 'mi') {
        	values.consumption = values.consumption * 1.609344;
		}
		
		/*
		if (data.capacity == 'gal') {
        	values.consumption = values.consumption / 3.785411784;
		}
		*/
		
		values.consumption = values.consumption.toFixed(1);	
		values.fuel = values.fuel.toFixed(1);
   				
		Ext.ComponentQuery.query('vehicleView selectfield[name=name]')[0].setValue(values.name);
   		Ext.ComponentQuery.query('vehicleView numberfield[name=price]')[0].setValue(values.price);
   		Ext.ComponentQuery.query('vehicleView numberfield[name=fuel]')[0].setValue(values.fuel);
   		Ext.ComponentQuery.query('vehicleView numberfield[name=consumption]')[0].setValue(values.consumption);
   		Ext.ComponentQuery.query('vehicleView numberfield[name=insurance]')[0].setValue(values.insurance);
   		Ext.ComponentQuery.query('vehicleView numberfield[name=tax]')[0].setValue(values.tax);
   		Ext.ComponentQuery.query('vehicleView numberfield[name=maintenance]')[0].setValue(values.maintenance);
   		Ext.ComponentQuery.query('vehicleView numberfield[name=other]')[0].setValue(values.other);
   		Ext.ComponentQuery.query('vehicleView numberfield[name=years]')[0].setValue(values.years);
   		Ext.ComponentQuery.query('vehicleView numberfield[name=usage]')[0].setValue(values.usage);
   		
		var tpl = new Ext.Template('<span>Price (in {currency})</span>');
		var comp = Ext.ComponentQuery.query('vehicleView numberfield[name=price]')[0].label;
  		tpl.overwrite(comp, data);
  				
		tpl = new Ext.Template('<span>Fuel price (for 1 {capacity})</span>');
		comp = Ext.ComponentQuery.query('vehicleView numberfield[name=fuel]')[0].label;
  		tpl.overwrite(comp, data);
  				
		tpl = new Ext.Template('<span>Consumption (per 100 {distance})</span>');
		comp = Ext.ComponentQuery.query('vehicleView numberfield[name=consumption]')[0].label;
  		tpl.overwrite(comp, data);
	
	},
	
	updateWay: function() {
	
		var records = Truespeed.controller.Functions.getTables();
			
		var vehicleRecord = records.vehicle;
		var wayRecord = records.way;
		
		if (vehicleRecord == wayRecord) {
			compare = 0;
		}
		else {
			compare = wayRecord;
		}
	
		var values = Truespeed.controller.Functions.getValues(records,compare,'way');
		
		var data = Truespeed.controller.Functions.getUnits();
       
        if (data.distance == 'mi') {
			values.route = values.route / 1.609344;
		}
		
		values.route = values.route.toFixed(1);
		
		Ext.ComponentQuery.query('wayView selectfield[name=name]')[0].setValue(values.name);
   		
   		Ext.ComponentQuery.query('wayView numberfield[name=route]')[0].setValue(values.route);
   		Ext.ComponentQuery.query('wayView numberfield[name=duration]')[0].setValue(values.duration);
   		Ext.ComponentQuery.query('wayView numberfield[name=times]')[0].setValue(values.times);
   		
		var tpl = new Ext.Template('<span>Route to work (in {distance})</span>');
		var comp = Ext.ComponentQuery.query('wayView numberfield[name=route]')[0].label;
  		tpl.overwrite(comp, data);
	
	},
	
	updateTime: function() {
	
		var records = Truespeed.controller.Functions.getTables();
		
		var compare = 0;
		
		var values = Truespeed.controller.Functions.getValues(records,compare,'time');
		
		Ext.ComponentQuery.query('timeView selectfield[name=name]')[0].setValue(values.name);
   				
		Ext.ComponentQuery.query('timeView numberfield[name=hours]')[0].setValue(values.hours);
   		Ext.ComponentQuery.query('timeView numberfield[name=days]')[0].setValue(values.days);
   		Ext.ComponentQuery.query('timeView numberfield[name=salary]')[0].setValue(values.salary);
	
	},
	
	updateSettings: function() {
	
		var units = Truespeed.controller.Functions.getUnits();
		
		Ext.ComponentQuery.query('optionsView selectfield[name=distance]')[0].setValue(units.distance);
   		Ext.ComponentQuery.query('optionsView selectfield[name=capacity]')[0].setValue(units.capacity);
   		Ext.ComponentQuery.query('optionsView selectfield[name=currency]')[0].setValue(units.currency);
	
	},
	
	saveVehicle: function(vehicle) {
    	
    	var formPanel = Ext.getCmp('vehiclePanel');
        var values = formPanel.getValues();
        
        if (!vehicle) {
    		vehicle = values.name;
    	}
       	
       	var record = Truespeed.controller.Functions.getRecord(vehicle);
                    		
        Truespeed.controller.Functions.setVehicle(record,values);
    },
	
	saveWay: function(vehicle) {
    	
    	var formPanel = Ext.getCmp('wayPanel');
    	var values = formPanel.getValues();
    	
    	if (!vehicle) {
    		vehicle = values.name;
    	}
        
        var record = Truespeed.controller.Functions.getRecord(vehicle);
                    		
        Truespeed.controller.Functions.setWay(record,values);
    },
    
    saveTime: function() {
    	
    	var formPanel = Ext.getCmp('timePanel');
        var values = formPanel.getValues();
                    		
        var record = 1;
                    		
        Truespeed.controller.Functions.setTime(record,values);
     },
     
     saveSettings: function() {
    	
    	var formPanel = Ext.getCmp('optionsPanel');
    	var values = formPanel.getValues();
                    		
        Truespeed.controller.Functions.setUnits(values);
    },
     
    getRecord: function(vehicle) {
    	var record;
        if (vehicle == "car") {
            record = 1;
        }
        else if (vehicle == "bike") {
            record = 2;
        }
        else {
            record = 3;
        }
        return record;
    },
    
    setRecord: function(key,name) {
    	var number = Truespeed.controller.Functions.getRecord(name);
    	var records = Ext.data.StoreManager.get('Users');
		records.getData().get(0).set(key,number);
    }
    
    /* 
    
    calcDistance: function() {
    	
    	var formPanel = Ext.getCmp('routePanel');
    	var values = formPanel.getValues();
    	
    	var home = values.home;
    	var work = values.work;
    	
    	var coords1 = home.split(",");
    	var lat1 = coords1[0];
    	var lng1 = coords1[1];
    	
    	var coords2 = work.split(",");
    	var lat2 = coords2[0];
    	var lng2 = coords2[1];
    	
    	// console.log(lat1);
    	
    	var rd;
    	var units = Truespeed.controller.Functions.getUnits();
    	if (units.distance == 'miles' ) {
    		rd = 3959;
    	}
    	else {
    		rd = 6371; 
    	}
    
    	var dLat = (lat2-lat1) * Math.PI / 180;
    	var dLon = (lng2-lng1) * Math.PI / 180;
    	
    	lat1 = lat1 * Math.PI / 180;
    	lat2 = lat2 * Math.PI / 180;
    	
    	var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    	
    	var distance = (rd * c).toFixed(1);;
    	// console.log(distance);
    	return(distance);  	
    }
    
    */
    
});
    
	
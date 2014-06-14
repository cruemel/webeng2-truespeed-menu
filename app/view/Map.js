Ext.define('Truespeed.view.Map', {
   	extend: 'Ext.Panel',
	xtype: 'mapView',
    id: 'wayMap',
    
    requires: [
        'Ext.Map',
        'Ext.Button'
    ],

    config: {
    	 
    	layout: {
            type: 'vbox',
            align: 'stretch'       
        },
        
        control: {
            '#distanceBtn': {
                tap: 'onDistanceTap'
            }
        },
        
        items: [ 
        	{
                xtype: 'map',
                id: 'mapBox',
                flex: 3,
                listeners: {
                	maprender: function(comp, map) {
                		var me = Ext.getCmp('wayMap');
                		me.initMap(comp);
                		me.paintMap(map);
        			}
            	}
            },
            {
            	xtype: 'formpanel',
                id: 'routePanel',
                flex: 3,
            	items: [
        			{
                		xtype: 'fieldset',
                		id: 'routeSet',
                		defaults: {
                            labelWidth: '50%'
    					},
                        margin: '2%',
                        instructions: '(To select a place, click in the fields above. To determinate its location, click on the map.)', 
                		items: [
                    		{
                        		xtype: 'textfield',
                        		cls: 'gray',
                        		label: 'Apartment',
                        		name: 'home',
                        		value: 'Latitude, Longitude',
                        		required: true,
                        		listeners: {
                        			focus: function (field,event,options) {
                        				var fieldset = Ext.getCmp('routeSet');
                        				fieldset.setActiveItem(field);
                        			}
                        		}
                    		},	
                   			{
                        		xtype: 'textfield',
                        		cls: 'gray',
                        		label: 'Workplace',
                        		name: 'work',
                        		value: 'Latitude, Longitude',
                        		required: true,
                        		listeners: {
                        			focus: function (field,event,options) {
                        				var fieldset = Ext.getCmp('routeSet');
                        				fieldset.setActiveItem(field);		
                        			}
                        		}
                    		}
                		]
            		},
            		{
                		xtype: 'button',
                		id: 'distanceBtn',
                		text: 'Distance',
                		margin: '0 25%',
                		ui: 'confirm'
            		}     	
            	]     	
        	}
        ]
    },
    
    initMap: function(comp) {
    	var mapOptions = {
            center: new google.maps.LatLng(52.759900, 12.867736), // linum
            zoom: 10,
            zoomControl: true,
            panControl: false,
            rotateControl: false,
            scaleControl: true,
            streetViewControl: false,
            mapTypeControl: false    
    	}
        comp.setMapOptions(mapOptions);
    },
    
    paintMap: function(map) {
    	var fieldset = Ext.getCmp('routeSet');
            			
        var green = new google.maps.MarkerImage(
        	'resources/images/home.png',
            new google.maps.Size(32, 32),
            new google.maps.Point(0, 0),
            new google.maps.Point(16, 32)
        );
            			
  		var red = new google.maps.MarkerImage(
            'resources/images/work.png',
            new google.maps.Size(32, 32),
        	new google.maps.Point(0, 0),
            new google.maps.Point(16, 32)
        );

  		var icon;
  		var title;
  		var location;
  		var value;
  		var fieldname;
  		var greens = [];
  		var reds = [];
  						
  		google.maps.event.addListener(map, 'click', function(event) {
  						
        	location = event.latLng;
            value = location.toString().replace(/\(|\)/g, "");
            				
            // console.log(location);
            				
            fieldname = fieldset.getActiveItem().getName();
            				
            if (fieldname == "home") {
  				title = 'Home';
  				icon = green;
  								
  				Ext.ComponentQuery.query('mapView textfield[name=home]')[0].setValue(value);	
  				Ext.ComponentQuery.query('mapView textfield[name=home]')[0].setCls('home');
  				if (greens.length > 0) {
  					deleteMarkers(greens);
  				}
  				placeMarker(greens);
  			}
  			else {
  				title = 'Work';
  				icon = red;
  				Ext.ComponentQuery.query('mapView textfield[name=work]')[0].setValue(value);
  				Ext.ComponentQuery.query('mapView textfield[name=work]')[0].setCls('work');
  				if (reds.length > 0) {
  					deleteMarkers(reds);
  				}
  				placeMarker(reds);
  			}
  							
  			function placeMarker(markers) {
				var marker = new google.maps.Marker({
      				position: location,
      				map: map,
      				title: title,
      				icon: icon
  				});
  							
  				markers.push(marker);
  			}
						
			function deleteMarkers(markers) {
  				for (var i = 0; i < markers.length; i++) {
    				markers[i].setMap(null);
  				}
  								
  				markers = [];
			}
			
		});
    },
    
    onDistanceTap: function() {
    	
    	var formPanel = Ext.getCmp('routePanel');
    	
    	formPanel.setMasked({
            xtype: 'loadmask',
             indicator: true,
            message: 'calculating ...'
        });
        
    		var values = formPanel.getValues();
    		var home = [values.home];
    		var work = [values.work];
    	
    		var system = google.maps.UnitSystem.METRIC;
    		var mode = google.maps.TravelMode.DRIVING;
    
    		var distanceService = new google.maps.DistanceMatrixService();
			distanceService.getDistanceMatrix(
  				{
    				origins: home,
    				destinations: work,
    				travelMode: mode,
    				unitSystem: system
  				}, 
  				callback
  			);
  		
		formPanel.setMasked(false);

		function callback(response, status) {
			var distance;
			var duration;
			var results;
			var element;
  			if (status == google.maps.DistanceMatrixStatus.OK) {
  				results = response.rows[0].elements;
    			for (var i = 0; i < results.length; i++) {
        			element = results[i];
        			distance = (element.distance.value / 1000).toFixed(1);
        			duration = parseInt(element.duration.value / 60);
    			}
    			
    			var userStore = Ext.getStore('Users');
    			var way = userStore.getData().getAt(0).get('way');
				var wayStore = Ext.getStore('Ways');
				wayStore.getData().get(way).set('route',distance);
				wayStore.getData().get(way).set('duration',duration);
				Truespeed.controller.Functions.updateWay();
    			var mainScreen = Ext.getCmp('mainScreen');
				mainScreen.setActiveItem(Ext.getCmp('startScreen'));
            }
            else {
            	 console.log("Sorry, but something went wrong.");
            }
		}
    }
    
    /*
    getDirections: function(map) {    
        
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
        
        var startPosition = new google.maps.LatLng(lat1,lng1);
        var endPosition = new google.maps.LatLng(lat2,lng2);
        
        var directionsService = new google.maps.DirectionsService();
        
		var directionRequest = {
            origin: startPosition,
            destination: endPosition,
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.METRIC
        }

        directionsService.route(directionRequest, function (result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                console.log(result);
            }
        });
    }
    */
});






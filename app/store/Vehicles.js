Ext.define('Truespeed.store.Vehicles', {
	extend: 'Ext.data.Store',
	requires: ['Truespeed.model.Vehicles'],
    config: {
    	model: 'Truespeed.model.Vehicles',
    	autoLoad: true
	}
});
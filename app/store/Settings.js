Ext.define('Truespeed.store.Settings', {
	extend: 'Ext.data.Store',
	requires: ['Truespeed.model.Settings'],
    config: {
    	model: 'Truespeed.model.Settings',
    	autoLoad: true
	}
});
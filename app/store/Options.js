Ext.define('Truespeed.store.Options', {
	extend: 'Ext.data.Store',
	requires: ['Truespeed.model.Options'],
    config: {
    	model: 'Truespeed.model.Options',
    	autoLoad: true
	}
});
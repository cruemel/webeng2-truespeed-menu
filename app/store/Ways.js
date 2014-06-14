Ext.define('Truespeed.store.Ways', {
	extend: 'Ext.data.Store',
	requires: ['Truespeed.model.Ways'],
    config: {
    	model: 'Truespeed.model.Ways',
    	autoLoad: true
	}
});
Ext.define('Truespeed.store.Times', {
	extend: 'Ext.data.Store',
	requires: ['Truespeed.model.Times'],
    config: {
    	model: 'Truespeed.model.Times',
    	autoLoad: true
	}
});
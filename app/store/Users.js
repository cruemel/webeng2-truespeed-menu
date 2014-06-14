Ext.define('Truespeed.store.Users', {
	extend: 'Ext.data.Store',
	requires: ['Truespeed.model.Users'],
    config: {
    	model: 'Truespeed.model.Users',
    	autoload: true
	}
});
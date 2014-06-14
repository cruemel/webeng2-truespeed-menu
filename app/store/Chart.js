Ext.define('Truespeed.store.Chart', {
    alias: 'store.Chart',
    extend: 'Ext.data.Store',
    requires: ['Truespeed.model.Chart'],
    config: {
    	model: 'Truespeed.model.Chart',
    	proxy: {
            type: 'ajax',
            url : 'resources/data/chart.json',
            reader: 'json'
        },
        autoLoad: true
    }
});
Ext.define('Truespeed.model.Settings', {
    extend: 'Ext.data.Model',
    requires: ['Ext.data.identifier.Uuid'],
    config: {
    	idProperty: 'id',
        identifier: 'uuid',
        fields: [
        	{ name: 'id', type: 'auto' },
            { name: 'distance', type: 'string' },
            { name: 'capacity', type: 'string' },
            { name: 'currency', type: 'string' }
		],
		proxy: {
            type: 'localstorage',
            id: 'unitsettings'
        }
    }
});
Ext.define('Truespeed.model.Users', {
    extend: 'Ext.data.Model',
    requires: ['Ext.data.identifier.Uuid'],
    config: {
    	idProperty: 'id',
        identifier: 'uuid',
    	fields: [
    		{ name: 'id', type: 'auto' },
            { name: 'name', type: 'string' },
            { name: 'vehicle', type: 'int' },
            { name: 'way', type: 'int' },
            { name: 'time', type: 'int' }
		],
        proxy: {
            type: 'localstorage',
            id: 'usersettings'
        }
    }
});


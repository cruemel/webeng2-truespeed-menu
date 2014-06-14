Ext.define('Truespeed.model.Ways', {
    extend: 'Ext.data.Model',
   	config: {
    	idProperty: 'id',
    	fields: [
             { name: 'id', type: 'auto' },
             { name: 'route', type: 'float' },
             { name: 'duration', type: 'int' },
             { name: 'times', type: 'int' }
		],
		validations: [
			{ type: 'presence',  field: 'route' },
            { type: 'presence',  field: 'duration' },
            { type: 'presence',  field: 'times' }
        ],
		proxy: {
            type: 'ajax',
            url : 'resources/data/ways.json',
            reader: 'json'
        }
    }
});


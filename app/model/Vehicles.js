Ext.define('Truespeed.model.Vehicles', {
    extend: 'Ext.data.Model',
   	
    config: {
        fields: [
        	{ name: 'id', type: 'auto' },
        	{ name: 'name', type: 'string' },
            { name: 'price', type: 'int' },
            { name: 'consumption', type: 'float' },
            { name: 'fuel', type: 'float' },
            { name: 'insurance', type: 'int' },
            { name: 'tax', type: 'int' },
            { name: 'maintenance', type: 'int' },
            { name: 'other', type: 'int' },
            { name: 'years', type: 'int' },
            { name: 'usage', type: 'int' }
		],
		validations: [
            { type: 'presence',  field: 'name' },
			{ type: 'presence',  field: 'price' },
            { type: 'presence',  field: 'consumption' },
            { type: 'presence',  field: 'fuel' },
            { type: 'presence',  field: 'insurance' },
            { type: 'presence',  field: 'tax' },
            { type: 'presence',  field: 'maintenance' },
            { type: 'presence',  field: 'other' },
            { type: 'presence',  
            	field: 'years',
            	message: "Please provide the use in years." 
            },
            { type: 'presence',  field: 'usage' }
        ],
		proxy: {
            type: 'ajax',
            url : 'resources/data/vehicles.json',
            reader: 'json'
        }
    }
});


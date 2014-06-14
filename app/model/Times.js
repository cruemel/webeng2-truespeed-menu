Ext.define('Truespeed.model.Times', {
    extend: 'Ext.data.Model',
   	
    config: {
        fields: [
             { name: 'id', type: 'auto' },
             { name: 'days', type: 'int' },
             { name: 'hours', type: 'int' },
             { name: 'salary', type: 'int' }
		],
		validations: [
			{ type: 'presence',  field: 'days' },
            { type: 'presence',  field: 'hours' },
            { type: 'presence',  field: 'salary' }
        ],
		proxy: {
            type: 'ajax',
            url : 'resources/data/times.json',
            reader: 'json'
        }
    }
});


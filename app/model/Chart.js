Ext.define('Truespeed.model.Chart', {
    extend: 'Ext.data.Model',
    config: {
        fields: ['id','transport','costs','spendings','upkeeping','vehicletotal','waytotal','timeway','timework','timetotal','speed','distance','capacity','currency']
    }
});
/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

Ext.application({
    name: 'Truespeed',

	requires: ['Ext.MessageBox','Truespeed.controller.Functions'],
	
	controllers: ['Main'],

    views: ['Main'],
	
	icon: {
		'32': 'favicon.ico',
        '57': 'apple-touch-icon-precomposed.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,
    
    launch: function() {
    
    	Ext.fly('splash-screen').destroy();
		
        Ext.Viewport.add(
        	Ext.create('Truespeed.view.Main')
        );

    }
});

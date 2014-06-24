Ext.define('Truespeed.view.Main', {
    extend: 'Ext.Container',
    xtype: 'mainView',
    id: 'mainScreen',
    
    requires: [
        'Ext.TitleBar', 'Ext.Button', 'Ext.Menu', 'Truespeed.view.Home', 'Truespeed.view.Chart', 'Truespeed.view.Text','Truespeed.view.Options', 'Truespeed.view.Data', 'Truespeed.view.Info', 'Truespeed.view.Map'
    ],
    
    config: {
        
        fullscreen: true,
        layout: {
        	type: 'card'
        },
        
        items: [ 
            {
                xtype: 'titlebar',
                id: 'titlebar',   
                docked: 'top',
                title: 'truespeed',
                
                items: [
                	 {
                        xtype: 'button',
                        id: 'backBtn',
                        iconCls: 'arrow_left'
                    },
                    {
                        xtype: 'button',
                        id: 'mapBtn',
                        iconCls: 'maps',
                        align: 'left',
                        hidden: true
                    },      
                    {
                        xtype: 'button',
                        id: 'menuBtn',
                        iconCls: 'list',
                        align: 'right',
                		handler: function() {
                    		Ext.Viewport.toggleMenu('right');
                		}
                    }        
                ]
            },
            {
                xtype: 'homeView',
            },
             {
                xtype: 'chartView',
            },
            {
                xtype: 'textView',
            },
             {
                xtype: 'optionsView'
            },
             {
                xtype: 'dataView'
            },
            /*
             {
                xtype: 'helpView',
            },
            */
             {
                xtype: 'infoView'
            },
            {
                xtype: 'mapView'
            }              
        ]
    },
    
     doSetHidden: function(hidden) {
        this.callParent(arguments);

        if (hidden) {
            Ext.Viewport.removeMenu('right');
        } 
        else {
            Ext.Viewport.setMenu(this.menuForSide('right'), {
                side: 'right',
                cover: true
            });
        }
    },

    menuForSide: function(side) {
		var mainScreen = Ext.getCmp('mainScreen');
        var items = [
            {
                text: 'Options',
                iconCls: 'settings',
                scope: this,
                handler: function() {
                    Ext.Viewport.hideMenu(side);
                    mainScreen.setActiveItem(Ext.getCmp('optionsScreen'));
                }
            },
             {
                text: 'Data',
                iconCls: 'data',
                scope: this,
                handler: function() {
                    Ext.Viewport.hideMenu(side);
                    mainScreen.setActiveItem(Ext.getCmp('dataScreen'));
                }
            },
            /*
            {
                text: 'Help',
                iconCls: 'help',
                scope: this,
                handler: function() {
                    Ext.Viewport.hideMenu(side);
                    mainScreen.setActiveItem(Ext.getCmp('helpScreen'));
                }
            },
            */
            {
                text: 'About',
                iconCls: 'info',
                scope: this,
                handler: function() {
                    Ext.Viewport.hideMenu(side);
                    mainScreen.setActiveItem(Ext.getCmp('infoScreen'));
                }
            },
            {
            	text: 'Home',
                iconCls: 'home',
                docked: 'bottom',
                scope: this,
                handler: function() {
                    Ext.Viewport.hideMenu(side);
                    mainScreen.setActiveItem(Ext.getCmp('homeScreen'));
                }
            }
        ];

        var className = 'Ext.Menu';
        if (Ext.theme.name == "Blackberry") {
        	if (['top', 'bottom'].indexOf(side) != -1) {
    	       	className = 'Ext.ux.ApplicationMenu';
	        } else {
	        	className = 'Ext.ux.ContextMenu';
	        }
        }

        return Ext.create(className, {
            items: items
        });
    }
});

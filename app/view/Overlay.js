Ext.define('Truespeed.view.Overlay', {
    extend: 'Ext.Panel',
    xtype: "main",

    config: {
        cls: "textview",
       	top: '15%',
       	left: '15%',
        width: '70%',
        height: '70%',
        styleHtmlContent: true,
        scrollable: true,
        html: [
			"<p><strong>How to calculate your own speed</strong></p>",
			"<p>- You can edit all values per vehicle.</p>",
			"<p>- Start by selecting a vehicle and than alter the costs, way and time.</p>",
			"<p>- Not all parameters need a value (ex. fuel price).",
			"<p>- Only parameters with a star need to have a value greater than 0.</p>",
			"<p>- To get the distance, you can also use a map.</p>",
			"<p>Privacy: there will be no data stored, eg. your data is lost, if you close the window."
		].join(""), 
        hidden: true
    },

    initialize: function() {
        this.element.on({
            tap: {
                fn: function() {
                    this.hide();
                },
                single: true,
                scope: this
            }
        })
    }
});
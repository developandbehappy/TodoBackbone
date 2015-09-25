var app = app || {};
var Backbone = Backbone || {};

app.Router = Backbone.Router.extend({
	routes: {
		'' : 'home',
	},
	home: function () {
		new app.View({
			state: 'active'
		});
	}
});


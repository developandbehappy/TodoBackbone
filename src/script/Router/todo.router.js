var app = app || {};
var Backbone = Backbone || {};

app.Router = Backbone.Router.extend({
	initialize: function() {
		app.view = new app.View();
	},
	routes: {
		'' : 'home',
		'active' : 'active',
		'done' : 'done',
		'remove' : 'remove',
	},
	home: function () {
		return true;
	},
	active: function () {
		app.view.blockRend('act');

	},
	done: function () {
		app.view.blockRend('done');
		
	},
	remove: function () {
		app.view.blockRend('remove');
		
	}
});


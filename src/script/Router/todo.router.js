var app = app || {};
var Backbone=Backbone || {};

app.Router = Backbone.Router.extend({
	routes: {
		':hash' : 'action'
	},
	action: function (hash) {
		new app.View({
			state:hash
		});
	}
});


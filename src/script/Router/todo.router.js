var app = app || {};
var Backbone = Backbone || {};

app.Router = Backbone.Router.extend({
	routes: {
		':hash' : 'home',
	},
	home: function (hash) {
		new app.View({
			state: hash
		});
		console.log(hash)
	}
});


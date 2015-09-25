var app = app || {};

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

(function(){
	new app.Router();
	Backbone.history.start();
});

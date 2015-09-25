var app = app || {};

(function(){
	app.Router = Backbone.Router.extend({
		routes: {
			':hash' : 'action'
		},
		action: function (hash) {
			console.log(hash + ' hello world');
		}
	});
	new app.Router();
	Backbone.history.start();
})();

var app = app || {};
var Backbone = Backbone || {};

$(function () {
	new app.Router();
	Backbone.history.start();
});

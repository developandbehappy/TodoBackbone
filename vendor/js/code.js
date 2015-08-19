var app = app || {};
var dataText = $('#text');
var button = $('#add');


$(function () {
	app.toDo = Backbone.Model.extend({

	});
});



button.on('click', function () {
	console.log(dataText.val());
});
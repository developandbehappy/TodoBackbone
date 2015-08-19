var app = app || {};
var dataText = $('#text');
var button = $('#add');


$(function () {
	app.toDo = Backbone.Model.extend({
		sendDateToLS: function() {

		},
		sendItemToLS: function() {
			
		},
		getDataFromLS: function() {
			
		}
	});
});



button.on('click', function () {
	console.log(dataText.val());
});
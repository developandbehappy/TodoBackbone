var app = app || {};
var Backbone = Backbone || {};

app.Model = Backbone.Model.extend({
	defaults: {
		title: '',
		status: 'act',
		check: '',
		ico: 'fa-times'
	},
	initialize: function () {
		this.on('error', function(model,error) {
			console.log(error);
		});
	},
	validate: function (attrs, options) {
		validate = true;
		if (attrs.title.length < 0 || attrs.title.length > 40) {
			return 'Неверная длина задачи!';
		} 
		if (attrs.status !== 'act' || attrs.status !== 'done' || attrs.status !== 'remove') {
			return 'статус не может быть ' + attrs.status;
		} 
		if (attrs.check !== '' || attrs.check !== 'checked') {
			return 'атрибут чек не может иметь это значение!';
		}
	}
});

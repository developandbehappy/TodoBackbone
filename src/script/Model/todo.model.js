var app = app || {};
var Backbone = Backbone || {};

app.Model = Backbone.Model.extend({
	initialize: function () {
		this.validate();
	},
	defaults: {
		title: '',
		status: 'act',
		check: '',
		ico: 'fa-times'
	},
	validate: function () {
		var modJS = this.toJSON();
		var checkJSON = modJS.check;
		var titleJSON = modJS.title;
		var statJSON = modJS.status;
		if (checkJSON !== '' && checkJSON !== 'checked') {
			console.log('check не может быть -> ' + checkJSON);
			return false;
		} else if (titleJSON.length > 40) {
			console.log('Длина title не может быть > 40 ');
			return false;
		} else if (statJSON !== 'act' && statJSON !== 'done' && statJSON !== 'remove') {
			console.log('status задания не может быть ' + statJSON);
			return false;
		} else {
			console.log('Ваши данные валидны!');
			return true;
		}
	}
});

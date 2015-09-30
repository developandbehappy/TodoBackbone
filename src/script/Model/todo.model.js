var app = app || {};
var Backbone = Backbone || {};

app.Model = Backbone.Model.extend({
  defaults: {
    title: '',
    status: 'act',
    check: '',
    ico: 'fa-times'
  },
  validate: function(val, text) {
    if (val.title.length >= 40) {
      return 'Вы не можете добавить задание больше 40 символов!';
    } else if (val.title.length <= 0) {
      return 'Вы не можете добавить пустое задание';
    } else {
      console.log('Ваши данные валидны!');
    }
  }
});

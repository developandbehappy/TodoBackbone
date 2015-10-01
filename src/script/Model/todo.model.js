var app = app || {};
var Backbone = Backbone || {};

app.Model = Backbone.Model.extend({
  defaults: {
    title: '',
    status: 'active',
    check: '',
    ico: 'fa-times'
  },
  validate: function (val) {
    if (val.title.length >= 40) {
      return 'Вы не можете добавить задание больше 40 символов!';
    } else if (val.title.length <= 0) {
      return 'Вы не можете добавить пустое задание';
    }
    console.log('Добавленно новое задание -> ' + val.title);
  }
});

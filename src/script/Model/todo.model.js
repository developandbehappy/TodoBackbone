var app = app || {};
var Backbone = Backbone || {};

app.Model = Backbone.Model.extend({
  initialize: function() {
    this.on('invalid', function(model, error) {
      $.notify(error);
    });
  },
  defaults: {
    title: '',
    status: 'act',
    check: '',
    ico: 'fa-times'
  },
  validate: function (text) {
    if (text.length >= 40) {
      return 'Вы не можете добавить задание больше 40 символов!';
    } else if (text.length <= 0) {
      return 'Вы не можете добавить пустое задание';
    } else {
      console.log('Ваши данные валидны!');
      this.add({
        title: text,
        id: StorageHelper.get('todo').length || 0
      });
      this.sync();
    }
  }
});

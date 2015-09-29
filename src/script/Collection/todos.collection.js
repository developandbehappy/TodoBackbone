var app = app || {};
var Backbone = Backbone || {};
var StorageHelper = StorageHelper || {};

app.COLLECTION = Backbone.Collection.extend({
  model: app.Model,
  sync: function (type) {
    var todo = StorageHelper.get('todo');
    if (type === 'read') {
      console.log('Получил все данные со стореджа->', todo);
    } else {
      StorageHelper.setObject('todo', this.toJSON());
    }
    return todo;
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



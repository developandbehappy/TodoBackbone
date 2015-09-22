var app = app || {};
var Backbone = Backbone || {};
var StorageHelper = StorageHelper || {};

$(function () {
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
    }
  });
});

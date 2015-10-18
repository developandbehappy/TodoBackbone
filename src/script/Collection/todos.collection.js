var app = app || {};
var Backbone = Backbone || {};
var StorageHelper = StorageHelper || {};

app.Collection = Backbone.Collection.extend({
  model: app.Model,
  initialize: function () {
    console.log('[collection] initialize');
  },
  sync: function (type) {
    var todo = StorageHelper.get('todo');
    console.log('[collection] sync', type);
    if (type === 'read') {
      this.push(todo);
      console.log('Получил все данные со стореджа->', todo);
    } else {
      StorageHelper.setObject('todo', this.toJSON());
    }
    return todo;
  },
  isValidModel: function (obj) {
    var model = new app.Model(obj, {parse: true});
    console.log('[collection] isValidModel', obj);
    return {
      status: model.isValid(),
      error: model.validationError
    };
  }
});

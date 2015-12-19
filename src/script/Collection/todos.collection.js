var app = app || {};
var Backbone = Backbone || {};
var StorageHelper = StorageHelper || {};

app.Collection = Backbone.Collection.extend({
  initialize: function () {
    console.log('[collection] initialize');
  },
  sync: function (type) {
    console.log('[collection] sync', type);
    if (type === 'read') {
      var todo = StorageHelper.get('todo');
      this.push(todo);
      console.log('Получил все данные со стореджа->', todo);
    } else {
      console.log('Save all data in storage', this.toJSON());
      StorageHelper.setObject('todo', this.toJSON());
    }
  },
  isValidModel: function (obj) {
    var model = new app.Model(obj, {parse: true});
    console.log('[collection] isValidModel', obj);
    return {
      status: model.isValid(),
      error: model.validationError
    };
  },
  removeModel: function (index) {
    this.remove(index);
  },
  getListByStatus: function (status) {
    if (status === 'all') {
      return this.models;
    }
    return this.models.filter(function (item) {
      return item.get('status') === status;
    });
  },
  getSize: function () {
    return this.models.length;
  }
});

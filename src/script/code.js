var app = app || {};
var StorageHelper = StorageHelper || {};
var Backbone = Backbone || {};
var _ = _ || {};
var collection = collection || undefined;
var view = view || undefined;
var todo = todo || undefined;

$(function () {
  app.Model = Backbone.Model.extend({
    defaults: {
      title: '',
      status: 'act',
      check: '',
      ico: 'fa-times'
    }
  });
  // Модел данных которые будем отправлять в сторедж!
  app.COLLECTION = Backbone.Collection.extend({
    model: app.Model,
    sync: function(type) {
      var todo = StorageHelper.get('todo');
      if(type === 'read') {
        console.log('Получил все данные со стореджа->', todo);
        return todo;
      } else {
        StorageHelper.setObject('todo',this.toJSON());
      }
    }
  });

  app.VIEW = Backbone.View.extend({
    events: {
      'click #add': 'addData'
    },
    initialize: function() {
      this.render();
    },
    addData: function() {
      collection.add({
        title: $('#text').val()
      });
      collection.sync();
      $('#text').val('')
    },
    render: function() {
      this.collection.push(
        collection.sync('read')
      );
    }
  });

  collection = new app.COLLECTION();

  view = new app.VIEW({el: 'body', collection: collection});
});


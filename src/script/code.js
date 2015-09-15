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
      ico: 'fa-times',
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
      this.addCollection();
      this.render();
    },
    addData: function() {
      collection.add({
        title: $('#text').val(),
        id: StorageHelper.get('todo').length || 0
      });
      collection.sync();
      $('#text').val('');
      $('li').remove();
      this.render();
    },
    addCollection: function() {
      this.collection.push(
        collection.sync('read')
      );
    },
    template: _.template($('#template').html()),
    render: function() {
       collection.sync('read').forEach(function (data) {
        this.$('#ul').append(this.template(data));
      }, this);
    }
  });

  collection = new app.COLLECTION();

  view = new app.VIEW({el: 'body', collection: collection});
});


var app = app || {};
var StorageHelper = StorageHelper || {};
var Backbone = Backbone || {};
var _ = _ || {};
var collection = collection || undefined;
var view = view || undefined;
var todo = todo || undefined;
var val = val || undefined;
var valLength = valLength || undefined;

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
      todo = StorageHelper.get('todo');
      if (type === 'read') {
        console.log('Получил все данные со стореджа->', todo);
      } else {
        StorageHelper.setObject('todo', this.toJSON());
      }
      return todo;
    }
  });

  app.VIEW = Backbone.View.extend({
    events: {
      'click #add': 'addData',
      'click li input': 'checkData',
      'click #active': 'activeBlock',
      'click #done': 'doneBlock',
      'click #remove': 'removeBlock',
      'click .fa-times': 'deleteImg',
      'click .fa-history': 'returnLabel'
    },
    initialize: function() {
      this.addCollection();
      this.render();
      this.renderTodo();
    },
    addData: function() {
      val = $.trim($('#text').val());
      valLength = val.length;
      if (valLength > 0 && valLength <= 40) {
        collection.add({
          title: val,
          id: StorageHelper.get('todo').length || 0
        });
        $('#ul li').remove();
        this.renderTodo();
        collection.sync();
      } else if (valLength <= 0) {
        $.notify('Вы не можете добавить пустое задание');
      } else if (valLength >= 40) {
        $.notify('Вы не можете добавить задание больше 40 символов!');
      } else {
        $.notify('Вы не можете добавить это задание, возникла ошибка!');
      }
      $('#text').val('');
    },
    addCollection: function() {
      this.collection.push(
        collection.sync('read')
      );
    },
    template: _.template($('#template').html()),
    render: function() {
      collection.forEach(function (data) {
        this.$('#ul').append(this.template(data.toJSON()));
      }, this);
    },
    renderTodo: function() {
      var hash = window.location.hash;
      if (hash === '#active') {
        this.activeBlock();
      } else if (hash === '#done') {
        this.doneBlock();
      } else if (hash === '#remove') {
        this.removeBlock();
      }
    },
    checkData: function(e) {
      var id = e.toElement.id;
      if (collection._byId[id].get('check') === 'checked') {
        collection._byId[id].set({
          check: '',
          status: 'act'
        });
      } else {
        collection._byId[id].set({
          check: 'checked',
          status: 'done'
        });
      }
      collection.sync();
      this.renderTodo();
    },
    activeBlock: function() {
      $('#ul li').remove();
      collection.forEach(function (data) {
        if (data.get('status') === 'act') {
          this.$('#ul').append(this.template(data.toJSON()));
        }
      }, this);
    },
    doneBlock: function() {
      $('#ul li').remove();
      collection.forEach(function (data) {
        if (data.get('status') === 'done') {
          this.$('#ul').append(this.template(data.toJSON()));
        }
      }, this);
    },
    removeBlock: function() {
      $('#ul li').remove();
      collection.forEach(function (data) {
        if (data.get('status') === 'remove') {
          this.$('#ul').append(this.template(data.toJSON()));
        }
      }, this);
      $('#ul li input').css({'display': 'none'});
      $('#ul li label').removeClass('clickLabel');
    },
    deleteImg: function(e) {
      var elId = e.toElement.parentElement.children[0].id;
      this.collection.at(elId).set('status', 'remove');
      this.collection.at(elId).set('ico', 'fa-history');
      this.collection.at(elId).set('check', '');
      this.renderTodo();
      collection.sync();
      console.log('Было удаленно задание! -> ' + this.collection.at(elId).get('title'));
    },
    returnLabel: function (e) {
      var elId = e.toElement.parentElement.children[0].id;
      this.collection.at(elId).set('status', 'act');
      this.collection.at(elId).set('ico', 'fa-times');
      this.renderTodo();
      collection.sync();
      console.log('Было возвращенно задание -> ' + this.collection.at(elId).get('title'));
    }
  });

  collection = new app.COLLECTION();

  view = new app.VIEW({el: 'body', collection: collection});
});


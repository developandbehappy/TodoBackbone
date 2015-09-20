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
    sync: function (type) {
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
      'click #active': function () {
        this.blockRend('act');
      },
      'click #done': function () {
        this.blockRend('done');
      },
      'click #remove': function () {
        this.blockRend('remove');
        $('#ul li label').removeClass('clickLabel');
      },
      'click .fa-times': 'deleteImg',
      'click .fa-history': 'returnLabel'
    },
    initialize: function () {
      this.addCollection();
      this.render();
      this.renderTodo();
    },
    addData: function () {
      val = $.trim($('#text').val()).replace(/<[^>]+>/g, '');
      valLength = val.length;
      if (valLength > 0 && valLength <= 40) {
        collection.add({
          title: val,
          id: StorageHelper.get('todo').length || 0
        });
        this.removeTags();
        this.render();
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
    addCollection: function () {
      this.collection.push(
        collection.sync('read')
      );
    },
    template: _.template($('#template').html()),
    render: function () {
      collection.forEach(function (data) {
        this.$('#ul').append(this.template(data.toJSON()));
      }, this);
      $('#ul.remove label').removeAttr('id', 'clickLabel');
    },
    renderTodo: function (e) {
      var hash = location.hash;
      if (hash === '#active' && !e) {
        this.blockRend('act');
      } else if (hash === '#done' && !e) {
        this.blockRend('done');
      } else if (hash === '#remove' && !e) {
        this.blockRend('remove');
      } else if (e) {
        return true;
      }
    },
    checkData: function (e) {
      var id = e.toElement.id;
      var checkCol = collection._byId[id].get('check');
      var statusCol = collection._byId[id].get('status');
      var titleCol = collection._byId[id].get('title');
      if (checkCol === 'checked' && statusCol !== 'remove') {
        collection._byId[id].set({
          check: '',
          status: 'act'
        });
        $.notify('[' + titleCol + '] -> was unchecked!');
        console.log('[ ' + titleCol + ' ] was unchecked');
      } else {
        if (!status === 'remove' || statusCol === 'act') {
          collection._byId[id].set({
            check: 'checked',
            status: 'done'
          });
          $.notify('[' + titleCol + '] -> was checked!', 'success');
          console.log('[ ' + titleCol + ' ] was checked');
        }
      }
      this.removeTags();
      collection.sync();
      this.render();
      this.renderTodo();
    },
    blockRend: function (status) {
      this.removeTags();
      if (status) {
        collection.forEach(function (data) {
          if (data.get('status') === status) {
            this.$('#ul').append(this.template(data.toJSON()));
          }
        }, this);
      }
    },
    deleteImg: function (e) {
      var elId = e.toElement.parentElement.children[0].id;
      this.collection.at(elId).set('status', 'remove');
      this.collection.at(elId).set('ico', 'fa-history');
      this.collection.at(elId).set('check', '');
      this.renderTodo();
      collection.sync();
      console.log('Было удаленно задание! -> ' + this.collection.at(elId).get('title'));
      this.removeTags();
      this.render();
      this.renderTodo();
    },
    returnLabel: function (e) {
      var elId = e.toElement.parentElement.children[0].id;
      this.collection.at(elId).set('status', 'act');
      this.collection.at(elId).set('ico', 'fa-times');
      this.renderTodo();
      collection.sync();
      console.log('Было возвращенно задание -> ' + this.collection.at(elId).get('title'));
      this.removeTags();
      this.render();
      this.renderTodo();
    },
    removeTags: function () {
      return $('#ul li').remove();
    }
  });

  collection = new app.COLLECTION();

  view = new app.VIEW({el: 'body', collection: collection});
});

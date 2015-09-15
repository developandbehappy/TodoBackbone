var app = app || {};
var StorageHelper = StorageHelper || {};
var Backbone = Backbone || {};
var _ = _ || {};
var collection = collection || undefined;
var view = view || undefined;

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
      console.log('type is '+ type);
      if(type === 'read') {
        var todo = StorageHelper.get('todo');
        console.log('todo-->', todo);
      } else {
        StorageHelper.setObject('todo',this.toJSON());
      }
    }
  });

  app.VIEW = Backbone.View.extend({
    events: {
      'click #add': 'addItem',
      'click label': 'clickLabel',
      'click #active': 'activeBlock',
      'click #done': 'doneBlock',
      'click #remove': 'removeBlock',
      'click #act': 'deleteLabel',
      'click #delete': 'returnLabel'
    },
    template: _.template($('#template').html()),
    initialize: function () {
      this.setCollect();
      this.renderTodo();
      this.render();
    },
    render: function () {
      if (window.location.hash === '#active') {
        this.activeBlock();
      } else if (window.location.hash === '#done') {
        this.doneBlock();
      } else if (window.location.hash === '#remove') {
        this.removeBlock();
      } else {
        return true;
      }
    },
    renderTodo: function () {
      if (localStorage.getItem('todo') === null || localStorage.getItem('todo').length === 0) {
        localStorage.setItem('todo', '[]');
      } else {
        $('#ul li').remove();
        this.getStorage().forEach(function (data) {
          this.$('#ul').append(this.template(data));
        }, this);
        console.log('Получил все данные со стореджа!');
        console.log(this.getStorage());
      }
    },
    addItem: function () {
      var $text = $('#text');
      var textVal = $text.val();
      var textLength = textVal.length;
      var todo = StorageHelper.get('todo') || false;
      var id = this.collection.length;
      if (textLength > 0 && textLength < 40) {
        if (!todo) {
          localStorage.setItem('todo', '[]');
        }
        this.collection.add({
          title: textVal,
          id: id
        }, this);
        $.notify('\'' + textVal + '\'' + ' Добавлено', 'success');
        console.log('[ ' + textVal + ' ] успешно добавлено');
        $text.val('');
        this.addStorage();
        this.renderTodo();
        window.location.hash = '#all';
      } else {
        if (textLength > 40) {
          $.notify('Вы не можете добавить задание больше 40 символов!');
        } else {
          $.notify('Вы не можете добавить пустое задание');
        }
      }
    },
    addStorage: function () {
      if (!StorageHelper.get('todo')) {
        this.setCollect();
        StorageHelper.setObject('todo', collection);
      } else {
        StorageHelper.setObject('todo', collection);
      }
    },
    getStorage: function () {
      return StorageHelper.get('todo');
    },
    setCollect: function () {
      return collection.add(StorageHelper.get('todo')) || false;
    },
    clickLabel: function (e) {
      var elId = e.toElement.control.id;
      if (this.collection.at(elId).get('check') !== 'checked') {
        this.collection.at(elId).set('check', 'checked');
        e.toElement.style.color = '#000';
        e.toElement.style.textDecoration = 'line-through';
      } else {
        this.collection.at(elId).set('check', '');
        e.toElement.style.color = '#fff';
        e.toElement.style.textDecoration = 'none';
      }
      this.addStorage();
      this.initialize();
      // console.log(e);
    },
    activeBlock: function () {
      console.log('active!');
      $('#ul li').remove();
      this.collection.each(function (col) {
        if (col.get('check') !== 'checked' && col.get('status') !== 'delete') {
          this.$('#ul').append(this.template(col.toJSON()));
        }
      }, this);
    },
    doneBlock: function () {
      console.log('done!');
      $('#ul li').remove();
      this.collection.each(function (col) {
        if (col.get('check') === 'checked' && col.get('status') !== 'delete') {
          this.$('#ul').append(this.template(col.toJSON()));
        }
      }, this);
      $('ul li label').css({'color': '#000'});
      $('ul li label').css({'text-decoration': 'line-through'});
    },
    removeBlock: function () {
      console.log('remove!');
      $('#ul li').remove();
      this.collection.each(function (col) {
        if (col.get('status') === 'delete') {
          this.$('#ul').append(this.template(col.toJSON()));
        }
      }, this);
      $('#ul li input').css({'display': 'none'});
      $('#ul li label').removeClass('clickLabel');
    },
    deleteLabel: function (e) {
      var elId = e.toElement.parentElement.children[0].id;
      this.collection.at(elId).set('status', 'delete');
      this.collection.at(elId).set('ico', 'fa-history');
      this.collection.at(elId).set('check', '');
      this.addStorage();
      this.initialize();
      console.log('Было удаленно задание! -> ' + this.collection.at(elId).get('title'));
    },
    returnLabel: function (e) {
      var elId = e.toElement.parentElement.children[0].id;
      this.collection.at(elId).set('status', 'act');
      this.collection.at(elId).set('ico', 'fa-times');
      this.addStorage();
      this.initialize();
      console.log('Было возвращенно задание -> ' + this.collection.at(elId).get('title'));
    }
  });

  collection = new app.COLLECTION();

  view = new app.VIEW({el: 'body', collection: collection});
});


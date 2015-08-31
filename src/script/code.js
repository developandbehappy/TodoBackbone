var app = app || {};
var StorageHelper = StorageHelper || {};

$(function() {
  app.Model = Backbone.Model.extend({
    defaults: {
      title: '',
      status: 'active',
      check: ''
    }
  });
  // Модел данных которые будем отправлять в сторедж!
  app.COLLECTION = Backbone.Collection.extend({model: app.Model});

  app.VIEW = Backbone.View.extend({
    events: {
        "click #add": "addItem",
        "click label": "clickLabel",
        "click #active": "activeBlock",
        "click #done": "doneBlock",
        "click #remove": "removeBlock"
    },
    template: _.template( $('#template').html() ),
    initialize: function() {
      this.setCollect();
      this.renderTodo();
      this.render();

    },
    render: function() {
      if(window.location.hash === '#active') {
       this.activeBlock();
      }
      else if(window.location.hash === '#done') {
       this.doneBlock();
      }
      else if(window.location.hash === '#remove') {
       this.removeBlock();
      } else {
        return true
      }
    },
    renderTodo: function() {
      if(localStorage.getItem('todo') === null || localStorage.getItem('todo').length === 0 ) {
          localStorage.setItem('todo','[]');
      } else {
        $('#ul li').remove();
        this.getStorage().forEach(function(data) {
          this.$('#ul').append(this.template(data));
        },this);
        console.log('Получил все данные со стореджа! Вот они');
        console.log(this.getStorage());
      }
    },
    addItem: function() {
      var $text = $('#text');
      var textVal = $text.val();
      var textLength = textVal.length;
      var todo = JSON.parse(localStorage.getItem('todo')) || false;
      var todoLenght = todo.length;
      var id = this.collection.length;
      if(textLength > 0 && textLength < 40) {
        if(!todo) {
          localStorage.setItem('todo','[]');
        }
        this.collection.add({
          title: textVal,
          id: id
        },this);
        $.notify('\'' + textVal + '\'' + ' Добавлено', 'success');
        console.log('[ ' + textVal + ' ] успешно добавлено');
        $text.val('');
        this.addStorage();
        this.renderTodo();
        window.location.hash = '#all'
      } else {
          if(textLength > 40) {
            $.notify('Вы не можете добавить задание больше 40 символов!');
          } else {
          $.notify('Вы не можете добавить пустое задание');
        }
      }
    },
    addStorage: function() {
      if(JSON.parse(localStorage.getItem('todo')).length > 0) {
        this.setCollect();
        StorageHelper.setObject('todo',collection)
      } else {
        StorageHelper.setObject('todo',collection)
      }
    },
    getStorage: function() {
      return JSON.parse(localStorage.getItem('todo')) || false
    },
    setCollect: function() {
      return collection.add(JSON.parse(localStorage.getItem('todo'))) || false
    },
    clickLabel: function(e) {
      var elId = e.toElement.control.id;
      if(this.collection.at(elId).get('check') != 'checked') {
        this.collection.at(elId).set('check','checked');
      } else {
        this.collection.at(elId).set('check','');
      }
      this.addStorage();
      console.log(this);
      // console.log(e);
    },
    activeBlock: function() {
      console.log('active!');
      $('#ul li').remove();
      this.collection.each(function(col) {
        if(col.get('check') !== 'checked') {
          this.$('#ul').append(this.template(col.toJSON()));
        }
      },this);
    },
    doneBlock: function() {
      console.log('done!');
      $('#ul li').remove();
      this.collection.each(function(col) {
        if(col.get('check') === 'checked') {
          this.$('#ul').append(this.template(col.toJSON()));
        }
      },this);
    },
    removeBlock: function() {
      console.log('remove!')
    }
  });

  collection = new app.COLLECTION();

  view = new app.VIEW({el: 'body',collection: collection});
});


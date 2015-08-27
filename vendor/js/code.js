var app = app || {};


$(function() {
  app.Model = Backbone.Model.extend({
    defaults: {
      title: '',
      status: 'active',
      check: false
    }
  });
  // Модел данных которые будем отправлять в сторедж!
  app.COLLECTION = Backbone.Collection.extend({model: app.Model});

  app.VIEW = Backbone.View.extend({
    template: _.template( $('#template').html() ),
    initialize: function() {
      this.render();
      this.renderTodo();
    },
    events: {
        "click ": "doSearch"  
    },
    render: function() {
      $('#ul li').remove();
      this.collection.each(function(col) {
        this.$el.append(this.template(col.toJSON()))
      },this);
    },
    renderTodo: function() {
      this.getStorage().forEach(function(data) {
        this.$el.append(this.template(data));
      },this);
    },
    addItem: function() {
      if($('#text').val().length > 0) {
        this.collection.add({ 
          title: $('#text').val(),
          id: this.collection.length
        },this);
        $.notify('\'' + $('#text').val() + '\'' + ' Добавлено', 'success');
        console.log('[ ' + $('#text').val() + ' ] успешно добавлено');
        $('#text').val('');
        this.addStorage();
        this.getStorage();
      } else {
        $.notify('Вы не можете добавить пустое задание');
      }
    },
    addStorage: function() {
      localStorage.setItem('todo',JSON.stringify(collection));
    },
    getStorage: function() {
      return JSON.parse(localStorage.getItem('todo')) || false
    },
    doSearch: function( event ) {
      console.log('hi');
    }
  });

  collection = new app.COLLECTION();

  view = new app.VIEW({el: '#ul',collection: collection});


  // $('#add').click(function() {
  //   view.addItem();
  //   view.render();
  // });

});


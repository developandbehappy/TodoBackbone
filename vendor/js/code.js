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
      this.getStorage();
    },
    render: function() {
      $('#ul li').remove();
      this.collection.each(function(col) {
        this.$el.append(this.template(col.toJSON()))
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
      } else {
        $.notify('Вы не можете добавить пустое задание');
      }
    },
    addStorage: function() {
      localStorage.setItem('todo',JSON.stringify(collection));
    },
    getStorage: function() {
      localStorage.getItem('todo');
      JSON.parse(localStorage.getItem('todo')).forEach(function(e) {
        this.$el.append(this.template(e));
      },this);
    }
  });

  collection = new app.COLLECTION();

  view = new app.VIEW({el: '#ul',collection: collection});


  $('#add').click(function() {
    view.addItem();
    view.render();
  });

});


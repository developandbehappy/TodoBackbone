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
        cid: this.collection.length
      },this);
      $('#text').val('');
      console.log(collection);
    } else {
      $.notify('Вы не можете добавить пустое задание');
    }
  }
});

collection = new app.COLLECTION();

view = new app.VIEW({el: '#ul',collection: collection});


$('#add').click(function() {
  view.addItem();
  view.render();
});
});


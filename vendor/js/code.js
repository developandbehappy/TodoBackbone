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
  initialize: function() {
    console.log('connect!');
  }
});

collection = new app.COLLECTION({
  title: 'hello i\'m work!'
});

view = new app.VIEW();


});


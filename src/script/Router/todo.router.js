var app = app || {};
var Backbone = Backbone || {};

app.Router = Backbone.Router.extend({
  initialize: function () {
    app.view = new app.View();
  },
  routes: {
    'active': 'active',
    'done': 'done',
    'remove': 'remove'
  },
  active: function () {
    app.view.blockRend('active');
  },
  done: function () {
    app.view.blockRend('done');
  },
  remove: function () {
    app.view.blockRend('remove');
  }
});

var app = app || {};
var Backbone = Backbone || {};

app.Router = Backbone.Router.extend({
  initialize: function () {
    app.view = new app.View();
    this.on('route', function (route) {
      console.log('[router]: ', route);
    });
  },
  routes: {
    '': 'empty',
    'active': 'active',
    'done': 'done',
    'all': 'all'
  },
  active: function () {
    app.view.blockRend('active');
  },
  done: function () {
    app.view.blockRend('done');
  },
  all: function () {
    app.view.blockRend('all');
  },
  empty: function () {
    app.view.blockRend();
  }
});
